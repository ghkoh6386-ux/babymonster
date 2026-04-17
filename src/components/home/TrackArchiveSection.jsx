import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addPlaylistCard,
  insertPlaylistCardNext,
  selectCurrentFeatureCardId,
  selectFavoriteMusicIds,
  selectFeatureCards,
  selectPlaylistIds,
  setPlayerPlaying,
  setCurrentFeatureCardId,
  toggleFavoriteMusicId,
} from '../../features/feature/featureSlice';
import '../../styles/home/track-archive.scss';

export default function TrackArchiveSection() {
  const dispatch = useDispatch();
  const cards = useSelector(selectFeatureCards);
  const currentCardId = useSelector(selectCurrentFeatureCardId);
  const playlistIds = useSelector(selectPlaylistIds);
  const favoriteMusicIds = useSelector(selectFavoriteMusicIds);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCompactCarousel, setIsCompactCarousel] = useState(false);
  const [slideMotionDirection, setSlideMotionDirection] = useState('next');
  const [viewportHeight, setViewportHeight] = useState(null);
  const touchStartXRef = useRef(null);
  const slideRefs = useRef([]);

  const archiveItems = ['batter-up', 'sheesh', 'drip', 'forever', 'we-go-up']
    .map((id) => cards.find((card) => card.id === id))
    .filter(Boolean);

  const slides = useMemo(() => {
    const chunked = [];

    for (let index = 0; index < archiveItems.length; index += 3) {
      chunked.push(archiveItems.slice(index, index + 3));
    }

    return chunked;
  }, [archiveItems]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 1080px)');
    const syncCompactCarousel = (event) => {
      setIsCompactCarousel(event.matches);
    };

    syncCompactCarousel(mediaQuery);
    mediaQuery.addEventListener('change', syncCompactCarousel);

    return () => {
      mediaQuery.removeEventListener('change', syncCompactCarousel);
    };
  }, []);

  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
  }, [slides.length]);

  const moveToSlide = (nextIndex) => {
    setCurrentSlide((prev) => {
      const clampedIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
      setSlideMotionDirection(clampedIndex >= prev ? 'next' : 'prev');
      return clampedIndex;
    });
  };

  useEffect(() => {
    const updateViewportHeight = () => {
      const activeNode = slideRefs.current[currentSlide];

      if (!activeNode) {
        setViewportHeight(null);
        return;
      }

      setViewportHeight(activeNode.scrollHeight);
    };

    const frameId = window.requestAnimationFrame(() => {
      updateViewportHeight();
    });
    const activeNode = slideRefs.current[currentSlide];
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
  }, [currentSlide, slides]);

  if (archiveItems.length < 3) {
    return null;
  }

  return (
    <section className="home-track-archive" aria-label="앨범 아카이브">
      <div className="home-track-archive__header">
        <div>
          <span className="home-track-archive__eyebrow">ALBUM LIST</span>
          <h3 className="home-track-archive__title">뮤직</h3>
          <p className="home-track-archive__intro">베이비몬스터 플레이 리스트</p>
        </div>
        <div className="home-track-archive__edition">
          {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>

      <div className="home-track-archive__carousel">
        <div className="home-track-archive__frame">
          <button
            type="button"
            className="home-track-archive__nav"
            aria-label="이전 슬라이드"
            onClick={() => moveToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              west
            </span>
          </button>

          <div
            className="home-track-archive__viewport"
            style={!isCompactCarousel && viewportHeight ? { height: `${viewportHeight}px` } : undefined}
            onTouchStart={(event) => {
              touchStartXRef.current = event.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              if (touchStartXRef.current === null) {
                return;
              }

              const touchEndX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
              const deltaX = touchStartXRef.current - touchEndX;

              if (Math.abs(deltaX) > 40) {
                moveToSlide(currentSlide + (deltaX > 0 ? 1 : -1));
              }

              touchStartXRef.current = null;
            }}
          >
            {isCompactCarousel ? (
              (() => {
                const slideItems = slides[currentSlide] ?? [];
                return (
                  <div
                    className={`home-track-archive__slide home-track-archive__slide--compact home-track-archive__slide--${slideMotionDirection}`}
                    ref={(node) => {
                      slideRefs.current[currentSlide] = node;
                    }}
                    key={`compact-slide-${currentSlide}`}
                  >
                    {slideItems.map((item, index) => {
                      const globalIndex = currentSlide * 3 + index;
                      const isActive = playlistIds.length > 0 && currentCardId === item.id;
                      const isQueued = playlistIds.includes(item.id);
                      const isFavorited = favoriteMusicIds.includes(item.id);

                      return (
                        <div
                          role="button"
                          tabIndex={0}
                          key={item.id}
                          className={`home-track-archive__row${isActive ? ' home-track-archive__row--active' : ''}`}
                          onClick={() => dispatch(setCurrentFeatureCardId(item.id))}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              dispatch(setCurrentFeatureCardId(item.id));
                            }
                          }}
                        >
                          {isActive ? <span className="home-track-archive__active-bar" /> : null}
                          <div className="home-track-archive__number">{String(globalIndex + 1).padStart(2, '0')}</div>
                          <div className="home-track-archive__main">
                            <div className="home-track-archive__title-line">
                              <h4>{item.title}</h4>
                              {isActive ? <span className="home-track-archive__badge">now</span> : null}
                              {isQueued ? (
                                <span className="home-track-archive__badge home-track-archive__badge--queued">queued</span>
                              ) : null}
                            </div>
                            <p>{item.format ?? item.collection ?? 'Album Release'}</p>
                          </div>
                          <div className="home-track-archive__actions">
                            <button
                              type="button"
                              className="home-track-archive__action-button home-track-archive__action-button--play"
                              aria-label={`${item.title} 바로 재생`}
                              onClick={(event) => {
                                event.stopPropagation();
                                dispatch(insertPlaylistCardNext({ id: item.id, afterId: currentCardId }));
                                dispatch(setCurrentFeatureCardId(item.id));
                                dispatch(setPlayerPlaying(true));
                              }}
                            >
                              <span className="material-symbols-outlined" aria-hidden="true">
                                play_arrow
                              </span>
                            </button>

                            <button
                              type="button"
                              className="home-track-archive__action-button"
                              aria-label={`${item.title} 플레이리스트에 추가`}
                              onClick={(event) => {
                                event.stopPropagation();
                                dispatch(addPlaylistCard(item.id));
                              }}
                            >
                              <span className="material-symbols-outlined" aria-hidden="true">
                                add
                              </span>
                            </button>
                            <button
                              type="button"
                              className={`home-track-archive__action-button${
                                isFavorited ? ' home-track-archive__action-button--favorite' : ''
                              }`}
                              aria-label={`${item.title} 좋아요`}
                              onClick={(event) => {
                                event.stopPropagation();
                                dispatch(toggleFavoriteMusicId(item.id));
                              }}
                            >
                              <span className="material-symbols-outlined" aria-hidden="true">
                                favorite
                              </span>
                            </button>
                          </div>
                          <div className="home-track-archive__meta">
                            <span
                              className={`home-track-archive__meta-icon${isActive ? ' home-track-archive__meta-icon--active' : ''} material-symbols-outlined`}
                            >
                              {isActive ? 'equalizer' : 'album'}
                            </span>
                            <span
                              className={`home-track-archive__duration${isActive ? ' home-track-archive__duration--active' : ''}`}
                            >
                              {item.duration ?? '2024'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()
            ) : (
              <div
                className="home-track-archive__track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slideItems, slideIndex) => {
                const filledItems = [
                  ...slideItems,
                  ...Array.from({ length: Math.max(0, 3 - slideItems.length) }, (_, index) => ({
                    id: `placeholder-${slideIndex}-${index}`,
                    isPlaceholder: true,
                  })),
                ];

                return (
                  <div
                    className="home-track-archive__slide"
                    key={`slide-${slideIndex}`}
                    ref={(node) => {
                      slideRefs.current[slideIndex] = node;
                    }}
                  >
                    {filledItems.map((item, index) => {
                      if (item.isPlaceholder) {
                        return (
                          <div
                            key={item.id}
                            className="home-track-archive__row home-track-archive__row--placeholder"
                            aria-hidden="true"
                          />
                        );
                      }

                      const globalIndex = slideIndex * 3 + index;
                      const isActive = playlistIds.length > 0 && currentCardId === item.id;
                      const isQueued = playlistIds.includes(item.id);
                      const isFavorited = favoriteMusicIds.includes(item.id);

                      return (
                        <div
                          role="button"
                          tabIndex={0}
                          key={item.id}
                          className={`home-track-archive__row${isActive ? ' home-track-archive__row--active' : ''}`}
                          onClick={() => dispatch(setCurrentFeatureCardId(item.id))}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              dispatch(setCurrentFeatureCardId(item.id));
                            }
                          }}
                        >
                          {isActive ? <span className="home-track-archive__active-bar" /> : null}
                          <div className="home-track-archive__number">{String(globalIndex + 1).padStart(2, '0')}</div>
                          <div className="home-track-archive__main">
                            <div className="home-track-archive__title-line">
                              <h4>{item.title}</h4>
                              {isActive ? <span className="home-track-archive__badge">now</span> : null}
                              {isQueued ? (
                                <span className="home-track-archive__badge home-track-archive__badge--queued">queued</span>
                              ) : null}
                            </div>
                            <p>{item.format ?? item.collection ?? 'Album Release'}</p>
                          </div>
                          <div className="home-track-archive__actions">
                            <button
                              type="button"
                              className="home-track-archive__action-button home-track-archive__action-button--play"
                              aria-label={`${item.title} 바로 재생`}
                              onClick={(event) => {
                                event.stopPropagation();
                                dispatch(insertPlaylistCardNext({ id: item.id, afterId: currentCardId }));
                                dispatch(setCurrentFeatureCardId(item.id));
                                dispatch(setPlayerPlaying(true));
                              }}
                            >
                              <span className="material-symbols-outlined" aria-hidden="true">
                                play_arrow
                              </span>
                            </button>

                            <button
                              type="button"
                              className="home-track-archive__action-button"
                              aria-label={`${item.title} 플레이리스트에 추가`}
                              onClick={(event) => {
                                event.stopPropagation();
                                dispatch(addPlaylistCard(item.id));
                              }}
                            >
                              <span className="material-symbols-outlined" aria-hidden="true">
                                add
                              </span>
                            </button>
                            <button
                              type="button"
                              className={`home-track-archive__action-button${
                                isFavorited ? ' home-track-archive__action-button--favorite' : ''
                              }`}
                              aria-label={`${item.title} 좋아요`}
                              onClick={(event) => {
                                event.stopPropagation();
                                dispatch(toggleFavoriteMusicId(item.id));
                              }}
                            >
                              <span className="material-symbols-outlined" aria-hidden="true">
                                favorite
                              </span>
                            </button>
                          </div>
                          <div className="home-track-archive__meta">
                            <span
                              className={`home-track-archive__meta-icon${isActive ? ' home-track-archive__meta-icon--active' : ''} material-symbols-outlined`}
                            >
                              {isActive ? 'equalizer' : 'album'}
                            </span>
                            <span
                              className={`home-track-archive__duration${isActive ? ' home-track-archive__duration--active' : ''}`}
                            >
                              {item.duration ?? '2024'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            className="home-track-archive__nav"
            aria-label="다음 슬라이드"
            onClick={() => moveToSlide(currentSlide + 1)}
            disabled={currentSlide >= slides.length - 1}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              east
            </span>
          </button>
        </div>

        <div className="home-track-archive__footer">
          <button
            type="button"
            className="home-track-archive__footer-nav"
            aria-label="이전 슬라이드"
            onClick={() => moveToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              west
            </span>
          </button>

          <div className="home-track-archive__pagination">
            {slides.map((_, index) => (
              <button
                key={`slide-dot-${index}`}
                type="button"
                className={`home-track-archive__dot${index === currentSlide ? ' home-track-archive__dot--active' : ''}`}
                aria-label={`${index + 1}번 슬라이드로 이동`}
                onClick={() => moveToSlide(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="home-track-archive__footer-nav"
            aria-label="다음 슬라이드"
            onClick={() => moveToSlide(currentSlide + 1)}
            disabled={currentSlide >= slides.length - 1}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              east
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
