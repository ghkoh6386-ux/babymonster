import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { images } from '../assets/media';
import videoLibrary from '../data/videoLibrary';
import {
  selectFavoriteVideoIds,
  setPlayerPlaying,
  toggleFavoriteVideoId,
} from '../features/feature/featureSlice';
import './DiscoverPage.scss';

const sortOptions = [
  { id: 'latest', label: '최신순' },
  { id: 'popular', label: '인기순' },
  { id: 'oldest', label: '오래된순' },
];

export default function DiscoverPage() {
  const dispatch = useDispatch();
  const favoriteVideoIds = useSelector(selectFavoriteVideoIds);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isCompactCarousel, setIsCompactCarousel] = useState(false);
  const [slideMotionDirection, setSlideMotionDirection] = useState('next');
  const slideRefs = useRef([]);
  const touchStartXRef = useRef(null);
  const [viewportMinHeight, setViewportMinHeight] = useState(null);

  useEffect(() => {
    if (!activeVideo) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 760px)');
    const syncCompactCarousel = (event) => {
      setIsCompactCarousel(event.matches);
    };

    syncCompactCarousel(mediaQuery);
    mediaQuery.addEventListener('change', syncCompactCarousel);

    return () => {
      mediaQuery.removeEventListener('change', syncCompactCarousel);
    };
  }, []);

  const filteredVideos = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    const nextVideos = keyword
      ? videoLibrary.filter((item) => {
          const searchTarget = [item.title, item.subtitle, item.description, item.accent, ...item.tags]
            .join(' ')
            .toLowerCase();

          return searchTarget.includes(keyword);
        })
      : [...videoLibrary];

    nextVideos.sort((a, b) => {
      if (sortBy === 'popular') {
        return b.popularity - a.popularity;
      }

      if (sortBy === 'oldest') {
        return new Date(a.releasedAt).getTime() - new Date(b.releasedAt).getTime();
      }

      return new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime();
    });

    return nextVideos;
  }, [query, sortBy]);
  const itemsPerSlide = isCompactCarousel ? 3 : 4;
  const visibleVideos = useMemo(() => {
    if (!isCompactCarousel) {
      return filteredVideos;
    }

    const hiddenItemCount = filteredVideos.length % itemsPerSlide;

    if (!hiddenItemCount || filteredVideos.length <= itemsPerSlide) {
      return filteredVideos;
    }

    return filteredVideos.slice(0, filteredVideos.length - hiddenItemCount);
  }, [filteredVideos, isCompactCarousel, itemsPerSlide]);

  const slides = useMemo(() => {
    const nextSlides = [];

    for (let index = 0; index < visibleVideos.length; index += itemsPerSlide) {
      nextSlides.push(visibleVideos.slice(index, index + itemsPerSlide));
    }

    return nextSlides;
  }, [visibleVideos, itemsPerSlide]);

  const featuredPopularVideos = useMemo(
    () => [...videoLibrary].sort((a, b) => b.popularity - a.popularity).slice(0, 4),
    []
  );

  useEffect(() => {
    if (activeSlide > slides.length - 1) {
      setActiveSlide(0);
    }
  }, [activeSlide, slides.length]);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
  }, [slides.length]);

  useEffect(() => {
    const updateViewportHeight = () => {
      const activeNode = slideRefs.current[activeSlide];
      const measuredHeights = slideRefs.current
        .filter(Boolean)
        .map((node) => Math.ceil(node.getBoundingClientRect().height));

      if (!activeNode) {
        setViewportMinHeight(null);
        return;
      }

      setViewportMinHeight(measuredHeights.length ? Math.max(...measuredHeights) : null);
    };

    const frameId = window.requestAnimationFrame(() => {
      updateViewportHeight();
    });
    const activeNode = slideRefs.current[activeSlide];
    const resizeObserver =
      activeNode && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            updateViewportHeight();
          })
        : null;

    if (resizeObserver && activeNode) {
      resizeObserver.observe(activeNode);
    }

    window.addEventListener('resize', updateViewportHeight);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateViewportHeight);
    };
  }, [activeSlide, slides]);

  const currentSortLabel = sortOptions.find((item) => item.id === sortBy)?.label ?? '최신순';
  const moveToSlide = (nextIndex) => {
    setActiveSlide((prev) => {
      const clampedIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
      setSlideMotionDirection(clampedIndex >= prev ? 'next' : 'prev');
      return clampedIndex;
    });
  };

  const openVideo = (item) => {
    dispatch(setPlayerPlaying(false));
    setSortMenuOpen(false);
    setActiveVideo(item);
  };

  const toggleVideoFavorite = (event, id) => {
    event.stopPropagation();
    dispatch(toggleFavoriteVideoId(id));
  };

  const renderSlideItems = (slideItems, slideIndex) =>
    [...slideItems, ...Array.from({ length: Math.max(0, itemsPerSlide - slideItems.length) }, (_, index) => ({
      id: `placeholder-${slideIndex}-${index}`,
      isPlaceholder: true,
    }))].map((item) => {
      if (item.isPlaceholder) {
        return (
          <div
            key={item.id}
            className="browse-video-card browse-video-card--placeholder"
            aria-hidden="true"
          />
        );
      }

      const isFavorited = favoriteVideoIds.includes(item.id);

      return (
        <article
          key={item.id}
          className="browse-video-card"
          onClick={() => openVideo(item)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openVideo(item);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`${item.title} 영상 재생`}
        >
          <div className="browse-video-card__media">
            <img src={item.poster} alt={`${item.title} poster`} />
            <button
              type="button"
              className={`browse-card-favorite${isFavorited ? ' is-active' : ''}`}
              aria-label={`${item.title} 좋아요`}
              onClick={(event) => toggleVideoFavorite(event, item.id)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                favorite
              </span>
            </button>
          </div>
          <div className="browse-video-card__body">
            <span>{item.accent}</span>
            <h3>{item.title}</h3>
            <strong>{item.subtitle}</strong>
            <p>{item.description}</p>
            <div className="browse-video-card__meta">
              <em>{item.duration}</em>
              <em>{item.popularity} POINTS</em>
            </div>
          </div>
        </article>
      );
    });

  return (
    <>
      <div className="discover-page">
        <main className="discover-main discover-main--cinematic">
          <section className="browse-hero">
            <div className="browse-hero__media">
              <img src={images.stageHero} alt="BABYMONSTER stage hero" />
              <div className="browse-hero__overlay" />
            </div>

            <div className="browse-hero__copy">
              <span className="browse-hero__eyebrow">BROWSE STAGE</span>
              <h1>STAGE FILES</h1>
              <p className="browse-hero__kicker">무대 위, 가장 강렬한 순간들을 한 화면에서 빠르게 만나보고 바로 감상해보세요.</p>
            </div>

            <div className="browse-hero__note browse-hero__note--left">
              <strong>LIVE FOCUS</strong>
              <p>분위기를 먼저 느끼고, 원하는 퍼포먼스를 직접 골라 지금 바로 이어서 즐겨보세요.</p>
            </div>

            <div className="browse-hero__note browse-hero__note--right">
              <strong>CLICK TO PLAY</strong>
              <p>지금, 베이비몬스터의 무대를 끊김 없이 이어서 감상하며 몰입을 이어가보세요.</p>
            </div>
            <div className="browse-hero__metrics">
              <div>
                <span>DEFAULT SORT</span>
                <strong>NEWEST</strong>
              </div>
              <div>
                <span>MAIN MOOD</span>
                <strong>PERFORM</strong>
              </div>
            </div>
          </section>

          <section className="browse-popular" aria-label="인기 영상">
            <div className="browse-section-heading">
              <div>
                <span>POPULAR VIDEOS</span>
                <h2>HOT PICKS</h2>
              </div>

            </div>

            <div className="browse-popular__grid">
              {featuredPopularVideos.map((item, index) => {
                const isFavorited = favoriteVideoIds.includes(item.id);

                return (
                  <article
                    key={item.id}
                    className="browse-popular-card"
                    onClick={() => openVideo(item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openVideo(item);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.title} 인기 영상 재생`}
                  >
                    <div className="browse-popular-card__media">
                      <img src={item.poster} alt={`${item.title} poster`} />
                      <div className="browse-popular-card__rank">0{index + 1}</div>
                      <button
                        type="button"
                        className={`browse-card-favorite${isFavorited ? ' is-active' : ''}`}
                        aria-label={`${item.title} 좋아요`}
                        onClick={(event) => toggleVideoFavorite(event, item.id)}
                      >
                        <span className="material-symbols-outlined" aria-hidden="true">
                          favorite
                        </span>
                      </button>
                    </div>
                    <div className="browse-popular-card__body">
                      <span>{item.accent}</span>
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                      <strong>{item.duration} </strong>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="browse-search" aria-label="브라우저 검색 및 정렬">
            <div className="browse-search__intro">
              <span>BROWSE CONTROL</span>
              <h2>SEARCH THE CUT</h2>
              <p>제목, 무드, 태그 기준으로 영상을 빠르게 찾고 정렬 순서도 바로 바꿀 수 있습니다.</p>
            </div>

            <div className="browse-search__bar">
              <label className="browse-search__field" htmlFor="browse-video-search">
                <span className="material-symbols-outlined" aria-hidden="true">
                  search
                </span>
                <input
                  id="browse-video-search"
                  type="search"
                  placeholder="Search stage, title, mood"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <div className="browse-search__sort">
                <button
                  type="button"
                  className={`browse-search__sort-button${sortMenuOpen ? ' is-open' : ''}`}
                  onClick={() => setSortMenuOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={sortMenuOpen}
                >
                  <strong>{currentSortLabel}</strong>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    expand_more
                  </span>
                </button>

                {sortMenuOpen ? (
                  <div className="browse-search__sort-menu" role="listbox" aria-label="정렬 선택">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`browse-search__sort-option${sortBy === option.id ? ' is-active' : ''}`}
                        onClick={() => {
                          setSortBy(option.id);
                          setSortMenuOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="browse-search__status">
              <p>
                
              </p>
              
            </div>
          </section>

          <section className="browse-carousel" aria-label="영상 리스트">
            

            {slides.length ? (
              <>
                <div className="browse-carousel__frame">
                  <button
                    type="button"
                    className="browse-carousel__nav"
                    onClick={() => moveToSlide(activeSlide - 1)}
                    disabled={activeSlide === 0}
                    aria-label="이전 슬라이드"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      west
                    </span>
                  </button>

                  <div
                    className="browse-carousel__viewport"
                    style={
                      viewportMinHeight
                        ? {
                            minHeight: `${viewportMinHeight}px`,
                          }
                        : undefined
                    }
                    onTouchStart={(event) => {
                      touchStartXRef.current = event.touches[0]?.clientX ?? null;
                    }}
                    onTouchEnd={(event) => {
                      if (touchStartXRef.current === null || slides.length <= 1) {
                        touchStartXRef.current = null;
                        return;
                      }

                      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
                      const deltaX = touchStartXRef.current - touchEndX;

                      if (Math.abs(deltaX) > 40) {
                        moveToSlide(activeSlide + (deltaX > 0 ? 1 : -1));
                      }

                      touchStartXRef.current = null;
                    }}
                  >
                    {isCompactCarousel ? (
                      <div
                        className={`browse-carousel__grid browse-carousel__grid--compact browse-carousel__grid--${slideMotionDirection}`}
                        ref={(node) => {
                          slideRefs.current[activeSlide] = node;
                        }}
                        key={`compact-slide-${activeSlide}`}
                      >
                        {renderSlideItems(slides[activeSlide] ?? [], activeSlide)}
                      </div>
                    ) : (
                      <div
                        className="browse-carousel__track"
                        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                      >
                        {slides.map((slideItems, slideIndex) => (
                          <div
                            key={`slide-panel-${slideIndex}`}
                            className="browse-carousel__grid"
                            ref={(node) => {
                              slideRefs.current[slideIndex] = node;
                            }}
                          >
                            {renderSlideItems(slideItems, slideIndex)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="browse-carousel__nav"
                    onClick={() => moveToSlide(activeSlide + 1)}
                    disabled={activeSlide >= slides.length - 1}
                    aria-label="다음 슬라이드"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      east
                    </span>
                  </button>
                </div>

                <div className="browse-carousel__footer">
                  <button
                    type="button"
                    className="browse-carousel__footer-nav"
                    onClick={() => moveToSlide(activeSlide - 1)}
                    disabled={activeSlide === 0}
                    aria-label="이전 슬라이드"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      west
                    </span>
                  </button>

                  <div className="browse-carousel__dots" aria-label="슬라이드 페이지네이션">
                    {slides.map((_, index) => (
                      <button
                        key={`slide-${index}`}
                        type="button"
                        className={`browse-carousel__dot${index === activeSlide ? ' is-active' : ''}`}
                        onClick={() => moveToSlide(index)}
                        aria-label={`${index + 1}번 슬라이드`}
                      />
                    ))}
                  </div>

                  <span>
                    {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    className="browse-carousel__footer-nav"
                    onClick={() => moveToSlide(activeSlide + 1)}
                    disabled={activeSlide >= slides.length - 1}
                    aria-label="다음 슬라이드"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      east
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div className="browse-empty">
                <span className="material-symbols-outlined" aria-hidden="true">
                  video_library
                </span>
                <strong>검색 결과가 없습니다</strong>
                <p>다른 키워드를 입력하거나 정렬 기준을 바꿔서 다시 찾아보세요.</p>
              </div>
            )}
          </section>
        </main>
      </div>

      {activeVideo ? (
        <div
          className="browse-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.title} 영상 재생`}
          onClick={() => setActiveVideo(null)}
        >
          <div className="browse-video-modal__panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="browse-video-modal__close"
              onClick={() => setActiveVideo(null)}
              aria-label="영상 닫기"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>

            <div className="browse-video-modal__copy">
              <strong>{activeVideo.title}</strong>
              <span>{activeVideo.accent}</span>
              <p>
                {activeVideo.subtitle} · {activeVideo.description}
              </p>
            </div>

            <video
              className="browse-video-modal__player"
              src={activeVideo.src}
              poster={activeVideo.poster}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      ) : null}
    </>
  );
}


