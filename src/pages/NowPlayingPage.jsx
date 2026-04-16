import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '../components/Icon';
import {
  cycleRepeatMode,
  seekPlayerTo,
  selectCurrentFeatureCard,
  selectPlaybackDuration,
  selectPlaybackTime,
  selectPlayerPlaying,
  selectPlayerVolume,
  selectPlaylistCards,
  selectRepeatMode,
  setCurrentFeatureCardId,
  setPlayerPlaying,
  setPlayerVolume,
} from '../features/feature/featureSlice';

export default function NowPlayingPage({ overlay = false, closing = false, onClose }) {
  const dispatch = useDispatch();
  const playlistCards = useSelector(selectPlaylistCards);
  const currentItem = useSelector(selectCurrentFeatureCard);
  const isPlaying = useSelector(selectPlayerPlaying);
  const repeatMode = useSelector(selectRepeatMode);
  const currentTime = useSelector(selectPlaybackTime);
  const duration = useSelector(selectPlaybackDuration);
  const volume = useSelector(selectPlayerVolume);

  const currentIndex = useMemo(
    () => playlistCards.findIndex((item) => String(item.id) === String(currentItem?.id)),
    [playlistCards, currentItem]
  );

  const repeatModeMeta = useMemo(() => {
    if (repeatMode === 'playlist') {
      return {
        label: '플레이리스트 반복',
        icon: 'repeat',
      };
    }

    if (repeatMode === 'track') {
      return {
        label: '현재 곡 반복',
        icon: 'repeat_one',
      };
    }

    return {
      label: '순차 재생',
      icon: 'trending_flat',
    };
  }, [repeatMode]);

  if (!currentItem?.audio || !playlistCards.length || currentIndex < 0) {
    return null;
  }

  const prevItem = playlistCards[currentIndex - 1] ?? null;
  const nextItem = playlistCards[currentIndex + 1] ?? null;
  const progressRatio = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time) => {
    if (!Number.isFinite(time) || time <= 0) {
      return '0:00';
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSeek = (event) => {
    if (!duration) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const nextTime = Math.min(duration, Math.max(0, ratio * duration));

    dispatch(seekPlayerTo(nextTime));
  };

  const handleVolumeChange = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    dispatch(setPlayerVolume(Math.min(1, Math.max(0, ratio))));
  };

  const panel = (
    <section
      className={`now-playing-page${overlay ? ' now-playing-page--overlay' : ''}${closing ? ' now-playing-page--closing' : ''}`}
      aria-label="Now playing panel"
    >
      {overlay ? (
        <button
          type="button"
          className="now-playing-page__backdrop"
          aria-label="Close now playing"
          onClick={onClose}
        />
      ) : null}

      <main className="now-playing-main">
        {overlay ? (
          <button
            type="button"
            className="now-playing-main__close"
            aria-label="Close now playing"
            onClick={onClose}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        ) : null}

        <div className="now-playing-main__bg">
          <img
            src={currentItem.heroImage ?? currentItem.image}
            alt={currentItem.title}
          />
        </div>
        <div className="now-playing-main__shade" />

        <section className="now-playing-main__content">
          <div className="now-playing-art">
            <div className="now-playing-art__frame" />
            <div className="now-playing-art__image">
              <img
                src={currentItem.footerArtwork ?? currentItem.image}
                alt={currentItem.title}
              />
            </div>
            <div className="now-playing-art__tag">
              {currentItem.category ?? 'Performance'} / {currentItem.date ?? '2024'}
            </div>
          </div>

          <div className="now-playing-copy">
            <div className="now-playing-copy__eyebrow">
              <span />
              <p>Now Playing</p>
            </div>

            <h1>{currentItem.title}</h1>

            <div className="now-playing-copy__meta">
              <h2>{currentItem.author ?? 'BABYMONSTER'}</h2>
              <p>{currentItem.storyText ?? currentItem.description ?? currentItem.subtitle}</p>
            </div>

            <div className="now-playing-data">
              <div>
                <span>Playlist</span>
                <strong>{String(currentIndex + 1).padStart(2, '0')} / {String(playlistCards.length).padStart(2, '0')}</strong>
              </div>
              
              <div>
                <span>Volume</span>
                <strong>{Math.round(volume * 100)}%</strong>
              </div>
            </div>

            <div className="now-playing-progress">
              <div
                className="now-playing-progress__bar"
                onClick={handleSeek}
                role="progressbar"
                aria-label="Now playing progress"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration || 0)}
                aria-valuenow={Math.round(currentTime)}
              >
                <span style={{ width: `${progressRatio}%` }} />
              </div>
              <div className="now-playing-progress__time">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="now-playing-controls">
              <button
                type="button"
                aria-label={repeatModeMeta.label}
                className="now-playing-controls__mode"
                onClick={() => dispatch(cycleRepeatMode())}
              >
                <Icon name={repeatModeMeta.icon} className="size-lg" />
              </button>

              <button
                type="button"
                aria-label={prevItem ? `Play previous: ${prevItem.title}` : 'No previous track'}
                onClick={() => {
                  if (!prevItem) return;
                  dispatch(setCurrentFeatureCardId(prevItem.id));
                  dispatch(setPlayerPlaying(true));
                }}
                disabled={!prevItem}
              >
                <Icon name="skip_previous" className="size-lg" />
              </button>

              <button
                type="button"
                className="now-playing-controls__main"
                aria-label={isPlaying ? 'Pause current track' : 'Play current track'}
                onClick={() => dispatch(setPlayerPlaying(!isPlaying))}
              >
                <Icon name={isPlaying ? 'pause' : 'play_arrow'} className="size-xl" filled />
              </button>

              <button
                type="button"
                aria-label={nextItem ? `Play next: ${nextItem.title}` : 'No next track'}
                onClick={() => {
                  if (!nextItem) return;
                  dispatch(setCurrentFeatureCardId(nextItem.id));
                  dispatch(setPlayerPlaying(true));
                }}
                disabled={!nextItem}
              >
                <Icon name="skip_next" className="size-lg" />
              </button>

              <div className="now-playing-controls__extra">
                <div className="now-playing-controls__volume">
                  <Icon name="volume_up" />
                  <div className="now-playing-controls__volume-track" onClick={handleVolumeChange}>
                    <span style={{ width: `${volume * 100}%` }} />
                  </div>
                </div>
                <Link
                  to={`/detail/${currentItem.id}`}
                  aria-label={`Open detail for ${currentItem.title}`}
                  onClick={() => {
                    if (onClose) {
                      onClose();
                    }
                  }}
                >
                  <Icon name="lyrics" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="now-playing-ghost">
          {currentItem.category?.toUpperCase() ?? 'BABYMONSTER'}
        </div>
      </main>
    </section>
  );

  if (overlay && typeof document !== 'undefined') {
    return createPortal(panel, document.body);
  }

  return panel;
}
