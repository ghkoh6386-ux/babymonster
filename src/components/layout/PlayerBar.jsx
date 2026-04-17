import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Icon from '../Icon';
import {
  closeCollectionPanel,
  clearSeekTarget,
  cycleRepeatMode,
  seekPlayerTo,
  selectActiveCollectionPanel,
  selectCurrentFeatureCard,
  selectNowPlayingOpen,
  selectPlaybackDuration,
  selectPlaybackTime,
  selectPlayerPlaying,
  selectPlayerVolume,
  selectPlaylistCards,
  selectPlaylistPanelOpen,
  selectRepeatMode,
  setCurrentFeatureCardId,
  setNowPlayingOpen,
  setPlaybackDuration,
  setPlaybackTime,
  setPlayerPlaying,
  setPlayerVolume,
  setPlaylistPanelOpen,
} from '../../features/feature/featureSlice';
import styles from './PlayerBar.module.scss';

export default function PlayerBar() {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const currentItem = useSelector(selectCurrentFeatureCard);
  const playlistCards = useSelector(selectPlaylistCards);
  const isPlaying = useSelector(selectPlayerPlaying);
  const repeatMode = useSelector(selectRepeatMode);
  const isNowPlayingOpen = useSelector(selectNowPlayingOpen);
  const isPlaylistPanelOpen = useSelector(selectPlaylistPanelOpen);
  const activeCollectionPanel = useSelector(selectActiveCollectionPanel);
  const currentTime = useSelector(selectPlaybackTime);
  const duration = useSelector(selectPlaybackDuration);
  const volume = useSelector(selectPlayerVolume);
  const seekTarget = useSelector((state) => state.feature.seekTarget);

  const playlistTrackIndex = useMemo(
    () => playlistCards.findIndex((card) => card.id === currentItem?.id),
    [playlistCards, currentItem]
  );

  const repeatModeMeta = useMemo(() => {
    if (repeatMode === 'playlist') {
      return {
        label: '플레이리스트 반복',
        icon: 'repeat',
        accent: false,
      };
    }

    if (repeatMode === 'track') {
      return {
        label: '현재 곡 반복',
        icon: 'repeat_one',
        accent: true,
      };
    }

    return {
      label: '순차 재생',
      icon: 'trending_flat',
      accent: false,
    };
  }, [repeatMode]);

  const activeQueue = playlistCards;
  const activeTrackIndex = playlistTrackIndex;
  const hasQueue = activeQueue.length > 0;
  const hasActiveTrack = Boolean(currentItem?.audio) && activeTrackIndex >= 0;
  const previewItem = hasActiveTrack ? currentItem : activeQueue[0] ?? null;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !hasActiveTrack || !currentItem?.audio) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      dispatch(setPlayerPlaying(false));
      dispatch(setPlaybackTime(0));
      dispatch(setPlaybackDuration(0));
      return;
    }

    audio.load();
    dispatch(setPlaybackTime(0));
  }, [currentItem, dispatch, hasActiveTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentItem?.audio) {
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => {
        dispatch(setPlayerPlaying(false));
      });
      return;
    }

    audio.pause();
  }, [currentItem, dispatch, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || seekTarget === null || !Number.isFinite(seekTarget)) {
      return;
    }

    audio.currentTime = seekTarget;
    dispatch(setPlaybackTime(seekTarget));
    dispatch(clearSeekTarget());
  }, [dispatch, seekTarget]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return undefined;
    }

    const handleLoadedMetadata = () => {
      dispatch(setPlaybackDuration(audio.duration || 0));
    };

    const handleTimeUpdate = () => {
      dispatch(setPlaybackTime(audio.currentTime || 0));
    };

    const handleEnded = () => {
      if (repeatMode === 'track') {
        audio.currentTime = 0;
        dispatch(setPlaybackTime(0));
        audio.play().catch(() => {
          dispatch(setPlayerPlaying(false));
        });
        return;
      }

      if (activeTrackIndex >= 0 && activeTrackIndex < activeQueue.length - 1) {
        dispatch(setCurrentFeatureCardId(activeQueue[activeTrackIndex + 1].id));
        dispatch(setPlayerPlaying(true));
        return;
      }

      if (repeatMode === 'playlist' && activeQueue.length > 0) {
        dispatch(setCurrentFeatureCardId(activeQueue[0].id));
        dispatch(setPlayerPlaying(true));
        return;
      }

      dispatch(setPlayerPlaying(false));
      dispatch(setPlaybackTime(audio.duration || audio.currentTime || 0));
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [activeQueue, activeTrackIndex, dispatch, repeatMode]);

  const progressRatio = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (time) => {
    if (!Number.isFinite(time) || time <= 0) {
      return '0:00';
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (!hasQueue) {
      return;
    }

    if (!hasActiveTrack && activeQueue[0]?.id) {
      dispatch(setCurrentFeatureCardId(activeQueue[0].id));
      dispatch(setPlayerPlaying(true));
      return;
    }

    dispatch(setPlayerPlaying(!isPlaying));
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

  const handleStepTrack = (direction) => {
    if (activeTrackIndex < 0) {
      return;
    }

    const nextIndex = activeTrackIndex + direction;
    const nextCard = activeQueue[nextIndex];

    if (!nextCard) {
      return;
    }

    dispatch(setCurrentFeatureCardId(nextCard.id));
    dispatch(setPlayerPlaying(true));
  };

  const handleToggleNowPlaying = () => {
    if (isNowPlayingOpen) {
      dispatch(setNowPlayingOpen(false));
      return;
    }

    if (isPlaylistPanelOpen) {
      dispatch(setPlaylistPanelOpen(false));
    }

    if (activeCollectionPanel) {
      dispatch(closeCollectionPanel());
    }

    dispatch(setNowPlayingOpen(true));
  };

  return (
    <footer className={styles.playerBar}>
      <audio ref={audioRef} preload="metadata">
        {hasActiveTrack ? <source src={currentItem.audio} type="audio/mpeg" /> : null}
      </audio>

      {previewItem ? (
        <Link to={`/detail/${previewItem.id}`} className={styles.trackMeta}>
          <div className={styles.artwork}>
            <img
              src={previewItem.footerArtwork ?? previewItem.image}
              alt="Current track artwork"
            />
          </div>
          <div className={styles.trackText}>
            <div className={styles.eyebrow}>{hasActiveTrack ? 'CURRENT ALBUM' : 'UP NEXT'}</div>
            <div className={styles.filename}>{previewItem.title}.ALBUM</div>
          </div>
        </Link>
      ) : (
        <div className={`${styles.trackMeta} ${styles.trackMetaEmpty}`} aria-hidden="true">
          <div className={`${styles.artwork} ${styles.artworkEmpty}`}>
            <span className="material-symbols-outlined" aria-hidden="true">
              music_note
            </span>
          </div>
          <div className={styles.trackText}>
            <div className={styles.eyebrow}>&nbsp;</div>
            <div className={styles.filename}>&nbsp;</div>
          </div>
        </div>
      )}

      <div className={styles.center}>
        <div className={styles.controls}>
          <button
            type="button"
            aria-label={`Repeat mode: ${repeatModeMeta.label}`}
            title={repeatModeMeta.label}
            onClick={() => dispatch(cycleRepeatMode())}
            className={`${styles.controlButton} ${styles.repeatButton} ${styles.repeatButtonActive}${repeatModeMeta.accent ? ` ${styles.repeatButtonAccent}` : ''}`}
            disabled={!hasQueue}
          >
            <Icon name={repeatModeMeta.icon} className={styles.controlIcon} />
          </button>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => handleStepTrack(-1)}
            disabled={!hasActiveTrack || activeTrackIndex <= 0}
            className={styles.controlButton}
          >
            <Icon name="skip_previous" className={styles.controlIcon} />
          </button>
          <button
            type="button"
            aria-label={!hasQueue ? 'Play' : isPlaying ? 'Pause' : 'Play'}
            className={styles.playButton}
            onClick={handleTogglePlay}
            disabled={!hasQueue}
          >
            <Icon
              name={isPlaying ? 'pause' : 'play_arrow'}
              filled
              className={styles.playIcon}
            />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => handleStepTrack(1)}
            disabled={!hasActiveTrack || activeTrackIndex >= activeQueue.length - 1}
            className={styles.controlButton}
          >
            <Icon name="skip_next" className={styles.controlIcon} />
          </button>
        </div>

        <div className={styles.progressMeta}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className={styles.progressHitbox}>
          <div
            className={styles.progressTrack}
            onClick={hasActiveTrack ? handleSeek : undefined}
            role="progressbar"
            aria-label="Playback progress"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration || 0)}
            aria-valuenow={Math.round(currentTime)}
          >
            <div className={styles.progressFill} style={{ width: `${progressRatio}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.volume}>
          <Icon name="volume_up" className={styles.volumeIcon} />
          <div className={styles.volumeHitbox}>
            <div className={styles.volumeTrack} onClick={hasQueue ? handleVolumeChange : undefined}>
              <div className={styles.volumeFill} style={{ width: `${volume * 100}%` }} />
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label={isNowPlayingOpen ? 'Close now playing' : 'Open now playing'}
          className={`${styles.expandButton}${isNowPlayingOpen ? ` ${styles.expandButtonActive}` : ''}`}
          onClick={handleToggleNowPlaying}
          disabled={!hasQueue}
        >
          <Icon
            name={isNowPlayingOpen ? 'close_fullscreen' : 'open_in_full'}
            className={styles.expandIcon}
          />
        </button>
      </div>
    </footer>
  );
}
