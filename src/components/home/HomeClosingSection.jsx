import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import videoLibrary from '../../data/videoLibrary';
import {
  selectFavoriteVideoIds,
  setPlayerPlaying,
  toggleFavoriteVideoId,
} from '../../features/feature/featureSlice';
import '../../styles/home/home-closing.scss';

export default function HomeClosingSection() {
  const dispatch = useDispatch();
  const favoriteVideoIds = useSelector(selectFavoriteVideoIds);
  const [activeVideo, setActiveVideo] = useState(null);
  const closingVideos = useMemo(
    () => videoLibrary.filter((item) => ['sheesh-main', 'drip-main', 'forever-film'].includes(item.id)),
    []
  );

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

  const openVideo = (item) => {
    dispatch(setPlayerPlaying(false));
    setActiveVideo(item);
  };

  return (
    <>
      <section className="home-closing" aria-label="홈 비디오 카드">
        <div className="home-closing__header">
          <span className="home-closing__eyebrow">VIDEO CUTS</span>
          <Link to="/browse" className="home-closing__more">
            MORE
          </Link>
        </div>

        <div className="home-closing__grid">
          {closingVideos.map((item) => {
            const isFavorited = favoriteVideoIds.includes(item.id);

            return (
              <article
                key={item.id}
                className="home-closing__card home-closing__card--video"
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
                <img src={item.poster} alt={`${item.title} poster`} className="home-closing__poster" />
                <div className="home-closing__overlay" />

                <button
                  type="button"
                  className={`home-closing__favorite${isFavorited ? ' is-active' : ''}`}
                  aria-label={`${item.title} 좋아요`}
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(toggleFavoriteVideoId(item.id));
                  }}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    favorite
                  </span>
                </button>

                <div className="home-closing__play" aria-hidden="true">
                  <span className="material-symbols-outlined">play_arrow</span>
                </div>

                <div className="home-closing__card-copy">
                  <span className="home-closing__card-label">{item.subtitle}</span>
                  <strong className="home-closing__card-title">{item.title}</strong>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {activeVideo ? (
        <div
          className="home-closing__modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.title} 영상 재생`}
          onClick={() => setActiveVideo(null)}
        >
          <div className="home-closing__modal-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="home-closing__modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="영상 닫기"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>

            <div className="home-closing__modal-copy">
              <span>{activeVideo.subtitle}</span>
              <strong>{activeVideo.title}</strong>
            </div>

            <video
              className="home-closing__modal-video"
              src={activeVideo.src}
              poster={activeVideo.poster}
              controls
              autoPlay
              playsInline
              onPlay={() => dispatch(setPlayerPlaying(false))}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
