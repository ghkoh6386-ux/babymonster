import React from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  clearPlaylist,
  removePlaylistCardAtIndex,
  selectCurrentFeatureCard,
  selectPlayerPlaying,
  selectPlaylistCards,
  setCurrentFeatureCardId,
  setPlayerPlaying,
} from '../features/feature/featureSlice';
import './SidebarCollectionPage.scss';

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
  const currentItem = useSelector(selectCurrentFeatureCard);
  const isPlaying = useSelector(selectPlayerPlaying);

  const isPlaylistPage = kind === 'playlists' || location.pathname.startsWith('/playlists');

  const handleClosePanel = () => {
    if (onClose) {
      onClose();
      return;
    }

    navigate('/');
  };

  const panel = (
    <section
      className={`sidebar-collection-page${overlay ? ' sidebar-collection-page--overlay' : ''}${
        closing ? ' sidebar-collection-page--closing' : ''
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
                {isPlaylistPage ? 'PLAYLIST VIEW' : 'SIDE COLLECTION'}
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
          ) : (
            <div className="sidebar-collection-page__placeholder">
              <span className="sidebar-collection-page__eyebrow">CURATED PAGE</span>
              <strong>{title}</strong>
              <p>{description}</p>
            </div>
          )}
        </div>
      </aside>
    </section>
  );

  if (overlay && typeof document !== 'undefined') {
    return createPortal(panel, document.body);
  }

  return panel;
}
