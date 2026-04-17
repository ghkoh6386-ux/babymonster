import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { images } from '../assets/media';
import {
  addPlaylistCard,
  clearPlaylist,
  removePlaylistCardAtIndex,
  selectCurrentFeatureCard,
  selectFavoriteMusicCards,
  selectFavoriteVideoCards,
  selectPlayerPlaying,
  selectPlaylistCards,
  setCurrentFeatureCardId,
  setPlayerPlaying,
  toggleFavoriteMusicId,
  toggleFavoriteVideoId,
} from '../features/feature/featureSlice';
import './SidebarCollectionPage.scss';

const visualCutItems = [
  {
    id: 'visual-about',
    title: 'ABOUT ERA',
    subtitle: '단체 이미지 무드 보드',
    image: images.aboutHero,
    tone: 'wide',
  },
  {
    id: 'visual-stage',
    title: 'STAGE GLOW',
    subtitle: '무대 위 에너지 컷',
    image: images.stageHero,
    tone: 'tall',
  },
  {
    id: 'visual-ruka',
    title: 'RUKA FRAME',
    subtitle: '퍼포먼스 표정 집중 컷',
    image: images.luka,
    tone: 'square',
  },
  {
    id: 'visual-pharita',
    title: 'PHARITA LIGHT',
    subtitle: '부드러운 톤의 비주얼 컷',
    image: images.pharita,
    tone: 'square',
  },
  {
    id: 'visual-asa',
    title: 'ASA EDGE',
    subtitle: '스타일 라인이 살아있는 컷',
    image: images.asa,
    tone: 'tall',
  },
  {
    id: 'visual-ahyeon',
    title: 'AHYEON VOICE',
    subtitle: '강한 존재감이 보이는 포트레이트',
    image: images.ahyeonPortrait ?? images.ahyeon,
    tone: 'wide',
  },
  {
    id: 'visual-rami',
    title: 'RAMI NOTE',
    subtitle: '차분하게 밀도 있는 이미지',
    image: images.rami,
    tone: 'square',
  },
  {
    id: 'visual-rora',
    title: 'RORA AIR',
    subtitle: '맑은 분위기의 클로즈업 컷',
    image: images.rora,
    tone: 'square',
  },
  {
    id: 'visual-chiquita',
    title: 'CHIQUITA SPARK',
    subtitle: '활기 있는 무드 포인트',
    image: images.chiquita,
    tone: 'wide',
  },
  {
    id: 'visual-drip',
    title: 'DRIP MOOD',
    subtitle: '앨범 비주얼 중심 레이어',
    image: images.dripHero,
    tone: 'wide',
  },
];

function PanelVideoModal({ item, onClose }) {
  if (!item?.video) {
    return null;
  }

  return createPortal(
    <div
      className="sidebar-collection-page__modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} video`}
      onClick={onClose}
    >
      <div className="sidebar-collection-page__modal-panel" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="sidebar-collection-page__modal-close"
          onClick={onClose}
          aria-label="영상 닫기"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            close
          </span>
        </button>

        <div className="sidebar-collection-page__modal-copy">
          <span>VIDEO ARCHIVE</span>
          <strong>{item.title}</strong>
          <p>{item.description ?? item.subtitle}</p>
        </div>

        <video
          className="sidebar-collection-page__modal-player"
          src={item.video}
          poster={item.image}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>,
    document.body
  );
}

function PanelImageModal({ item, onClose }) {
  if (!item?.image) {
    return null;
  }

  return createPortal(
    <div
      className="sidebar-collection-page__modal sidebar-collection-page__modal--image"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} visual`}
      onClick={onClose}
    >
      <div className="sidebar-collection-page__image-panel" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="sidebar-collection-page__modal-close"
          onClick={onClose}
          aria-label="이미지 닫기"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            close
          </span>
        </button>

        <img src={item.image} alt={item.title} className="sidebar-collection-page__image-modal-asset" />
        <div className="sidebar-collection-page__image-panel-copy">
          <span>VISUAL CUT</span>
          <strong>{item.title}</strong>
          <p>{item.subtitle}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function SidebarCollectionPage({
  title,
  description,
  kind = 'generic',
  overlay = false,
  closing = false,
  onClose,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const playlistCards = useSelector(selectPlaylistCards);
  const favoriteMusicCards = useSelector(selectFavoriteMusicCards);
  const favoriteVideoCards = useSelector(selectFavoriteVideoCards);
  const currentItem = useSelector(selectCurrentFeatureCard);
  const isPlaying = useSelector(selectPlayerPlaying);
  const [activeVideoItem, setActiveVideoItem] = useState(null);
  const [activeVisualCut, setActiveVisualCut] = useState(null);

  const isPlaylistPage = kind === 'playlists' || location.pathname.startsWith('/playlists');
  const isFavoritesPage = kind === 'favorites';
  const isVisualCutsPage = kind === 'visual-cuts';
  const isWidePanel = isFavoritesPage || isVisualCutsPage;

  const favoriteStats = useMemo(() => {
    const musicCount = favoriteMusicCards.length;
    const videoCount = favoriteVideoCards.length;
    const totalCount = musicCount + videoCount;

    return { musicCount, totalCount, videoCount };
  }, [favoriteMusicCards, favoriteVideoCards]);

  useEffect(() => {
    if (!activeVideoItem && !activeVisualCut) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveVideoItem(null);
        setActiveVisualCut(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoItem, activeVisualCut]);

  const handleClosePanel = () => {
    if (onClose) {
      onClose();
      return;
    }

    navigate('/');
  };

  const handlePlayItem = (item) => {
    const hasInPlaylist = playlistCards.some((playlistItem) => String(playlistItem.id) === String(item.id));

    if (!hasInPlaylist) {
      dispatch(addPlaylistCard(item.id));
    }

    dispatch(setCurrentFeatureCardId(item.id));
    dispatch(setPlayerPlaying(true));
  };

  const handleOpenVideoItem = (item) => {
    dispatch(setPlayerPlaying(false));
    setActiveVideoItem({
      ...item,
      image: item.image ?? item.poster,
      video: item.video ?? item.src,
    });
  };

  const panel = (
    <>
      <section
        className={`sidebar-collection-page${overlay ? ' sidebar-collection-page--overlay' : ''}${
          closing ? ' sidebar-collection-page--closing' : ''
        }${isWidePanel ? ' sidebar-collection-page--wide' : ''}${
          isFavoritesPage ? ' sidebar-collection-page--favorites' : ''
        }${
          isVisualCutsPage ? ' sidebar-collection-page--visual-cuts' : ''
        }`}
        aria-label={`${title} 패널`}
      >
        <button
          type="button"
          className="sidebar-collection-page__backdrop"
          aria-label="패널 닫기"
          onClick={handleClosePanel}
        />

        <aside className="sidebar-collection-page__panel">
          <div className="sidebar-collection-page__panel-inner">
            <header className="sidebar-collection-page__header">
              <div>
                <span className="sidebar-collection-page__eyebrow">
                  {isPlaylistPage
                    ? 'PLAYLIST VIEW'
                    : isFavoritesPage
                    ? 'PERSONAL COLLECTION'
                    : isVisualCutsPage
                    ? 'IMAGE ARCHIVE'
                    : 'SIDE COLLECTION'}
                </span>
                <h1>{title}</h1>
                {description ? <p>{description}</p> : null}
              </div>

              <button
                type="button"
                className="sidebar-collection-page__close"
                onClick={handleClosePanel}
                aria-label="패널 닫기"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  close
                </span>
              </button>
            </header>

            {isPlaylistPage ? (
              <>
                <div className="sidebar-collection-page__stats">
                  <div>
                    <span>Playlist Tracks</span>
                    <strong>{playlistCards.length}</strong>
                  </div>
                  <div>
                    <span>Now Playing</span>
                    <strong>{currentItem?.title ?? 'Empty'}</strong>
                  </div>
                  <button
                    type="button"
                    className="sidebar-collection-page__clear"
                    onClick={() => dispatch(clearPlaylist())}
                    disabled={!playlistCards.length}
                  >
                    CLEAR
                  </button>
                </div>

                {playlistCards.length ? (
                  <div className="sidebar-collection-page__list">
                    {playlistCards.map((item, index) => {
                      const isCurrent = currentItem?.id === item.id;

                      return (
                        <article
                          key={`${item.id}-${index}`}
                          className={`sidebar-collection-page__item${
                            isCurrent ? ' sidebar-collection-page__item--active' : ''
                          }`}
                        >
                          <div className="sidebar-collection-page__item-order">
                            {String(index + 1).padStart(2, '0')}
                          </div>

                          <div className="sidebar-collection-page__item-copy">
                            <div className="sidebar-collection-page__item-line">
                              <strong>{item.title}</strong>
                              {isCurrent ? (
                                <span className="sidebar-collection-page__item-state">
                                  {isPlaying ? '재생 중' : '대기 중'}
                                </span>
                              ) : null}
                            </div>
                            <p>{item.subtitle ?? item.format ?? 'Album Track'}</p>
                          </div>

                          <div className="sidebar-collection-page__item-actions">
                            <button
                              type="button"
                              aria-label={`${item.title} 재생`}
                              onClick={() => {
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
                              aria-label={`${item.title} 제거`}
                              onClick={() => dispatch(removePlaylistCardAtIndex(index))}
                            >
                              <span className="material-symbols-outlined" aria-hidden="true">
                                close
                              </span>
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="sidebar-collection-page__empty">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      queue_music
                    </span>
                    <strong>아직 추가된 곡이 없습니다.</strong>
                    <p>트랙 아카이브에서 + 버튼으로 끝에 쌓고, 재생 버튼으로는 지금 듣는 순서에 바로 넣을 수 있습니다.</p>
                  </div>
                )}
              </>
            ) : null}

            {isFavoritesPage ? (
              <>
                <div className="sidebar-collection-page__stats sidebar-collection-page__stats--wide">
                  <div>
                    <span>LIKED Files</span>
                    <strong>{favoriteStats.totalCount}</strong>
                  </div>
                  <div>
                    <span>Music</span>
                    <strong>{favoriteStats.musicCount}</strong>
                  </div>
                  <div>
                    <span>Video</span>
                    <strong>{favoriteStats.videoCount}</strong>
                  </div>
                </div>

                {favoriteStats.totalCount ? (
                  <div className="sidebar-collection-page__favorites-stack">
                    <section className="sidebar-collection-page__favorites-section">
                      <div className="sidebar-collection-page__favorites-heading">
                        <span>MUSIC FAVORITES</span>
                      </div>

                      {favoriteMusicCards.length ? (
                        <div className="sidebar-collection-page__favorites-grid">
                          {favoriteMusicCards.map((item) => (
                            <article key={item.id} className="sidebar-collection-page__favorite-card">
                              <button
                                type="button"
                                className="sidebar-collection-page__favorite-media"
                                onClick={() => handlePlayItem(item)}
                                aria-label={`${item.title} 재생`}
                              >
                                <img src={item.image} alt={item.title} />
                                <span className="sidebar-collection-page__favorite-overlay">PLAY MUSIC</span>
                              </button>

                              <div className="sidebar-collection-page__favorite-copy">
                                <div>
                                  <span>{item.collection ?? 'FAVORITE TRACK'}</span>
                                  <strong>{item.title}</strong>
                                  <p>{item.description ?? item.subtitle}</p>
                                </div>

                                <div className="sidebar-collection-page__favorite-tags">
                                  <em>MUSIC</em>
                                  <em>{item.duration ?? 'ARCHIVE'}</em>
                                </div>
                              </div>

                              <div className="sidebar-collection-page__favorite-actions sidebar-collection-page__favorite-actions--music">
                                <button type="button" onClick={() => handlePlayItem(item)}>
                                  PLAY
                                </button>
                                <button
                                  type="button"
                                  className="sidebar-collection-page__favorite-like"
                                  onClick={() => dispatch(toggleFavoriteMusicId(item.id))}
                                >
                                  REMOVE
                                </button>
                              </div>
                            </article>
                          ))}
                        </div>
                      ) : (
                        <div className="sidebar-collection-page__empty sidebar-collection-page__empty--section">
                          <strong>좋아요한 음악이 아직 없습니다.</strong>
                        </div>
                      )}
                    </section>

                    <section className="sidebar-collection-page__favorites-section">
                      <div className="sidebar-collection-page__favorites-heading">
                        <span>VIDEO FAVORITES</span>
                      </div>

                      {favoriteVideoCards.length ? (
                        <div className="sidebar-collection-page__favorites-grid">
                          {favoriteVideoCards.map((item) => (
                            <article key={item.id} className="sidebar-collection-page__favorite-card">
                              <button
                                type="button"
                                className="sidebar-collection-page__favorite-media"
                                onClick={() => handleOpenVideoItem(item)}
                                aria-label={`${item.title} 영상 열기`}
                              >
                                <img src={item.poster} alt={item.title} />
                                <span className="sidebar-collection-page__favorite-overlay">PLAY VIDEO</span>
                              </button>

                              <div className="sidebar-collection-page__favorite-copy">
                                <div>
                                  <span>{item.accent ?? 'FAVORITE VIDEO'}</span>
                                  <strong>{item.title}</strong>
                                  <p>{item.description ?? item.subtitle}</p>
                                </div>

                                <div className="sidebar-collection-page__favorite-tags">
                                  <em>VIDEO</em>
                                  <em>{item.duration}</em>
                                </div>
                              </div>

                              <div className="sidebar-collection-page__favorite-actions sidebar-collection-page__favorite-actions--music">
                                <button type="button" onClick={() => handleOpenVideoItem(item)}>
                                  PLAY
                                </button>
                                <button
                                  type="button"
                                  className="sidebar-collection-page__favorite-like"
                                  onClick={() => dispatch(toggleFavoriteVideoId(item.id))}
                                >
                                  REMOVE
                                </button>
                              </div>
                            </article>
                          ))}
                        </div>
                      ) : (
                        <div className="sidebar-collection-page__empty sidebar-collection-page__empty--section">
                          <strong>좋아요한 동영상이 아직 없습니다.</strong>
                        </div>
                      )}
                    </section>
                  </div>
                ) : (
                  <div className="sidebar-collection-page__empty sidebar-collection-page__empty--wide">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      favorite
                    </span>
                    <strong>좋아요한 파일이 아직 없습니다.</strong>
                    <p>디테일 페이지의 LIKE 버튼으로 음악과 비디오를 모아두면 여기서 한 번에 다시 꺼내볼 수 있습니다.</p>
                  </div>
                )}
              </>
            ) : null}

            {isVisualCutsPage ? (
              <>
                <div className="sidebar-collection-page__stats sidebar-collection-page__stats--wide sidebar-collection-page__stats--visual">
                  <div>
                    <span>Total Frames</span>
                    <strong>{visualCutItems.length}</strong>
                  </div>
                  <div>
                    <span>Main Focus</span>
                    <strong>PHOTO</strong>
                  </div>
                  <div>
                    <span>Archive Tone</span>
                    <strong>ACTIVE</strong>
                  </div>
                </div>

                <div className="sidebar-collection-page__visual-grid">
                  {visualCutItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`sidebar-collection-page__visual-card sidebar-collection-page__visual-card--${item.tone}`}
                      onClick={() => setActiveVisualCut(item)}
                    >
                      <img src={item.image} alt={item.title} />
                      <span className="sidebar-collection-page__visual-shade" />
                      <div className="sidebar-collection-page__visual-copy">
                        <strong>{item.title}</strong>
                        <p>{item.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {!isPlaylistPage && !isFavoritesPage && !isVisualCutsPage ? (
              <div className="sidebar-collection-page__placeholder">
                <span className="sidebar-collection-page__eyebrow">CURATED PAGE</span>
                <strong>{title}</strong>
                <p>{description}</p>
                <Link to="/" className="sidebar-collection-page__placeholder-link">
                  HOME
                </Link>
              </div>
            ) : null}
          </div>
        </aside>
      </section>

      <PanelVideoModal item={activeVideoItem} onClose={() => setActiveVideoItem(null)} />
      <PanelImageModal item={activeVisualCut} onClose={() => setActiveVisualCut(null)} />
    </>
  );

  if (overlay && typeof document !== 'undefined') {
    return createPortal(panel, document.body);
  }

  return panel;
}
