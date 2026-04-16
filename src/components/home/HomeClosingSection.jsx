import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { images, videos } from '../../assets/media';
import { setPlayerPlaying } from '../../features/feature/featureSlice';
import '../../styles/home/home-closing.scss';

const closingVideos = [
  {
    id: 'sheesh-video',
    title: 'SHEESH',
    label: 'Title Video',
    poster: images.sheesh,
    src: videos.sheesh,
  },
  {
    id: 'drip-video',
    title: 'DRIP',
    label: 'Performance Film',
    poster: images.drip,
    src: videos.drip,
  },
  {
    id: 'forever-video',
    title: 'FOREVER',
    label: 'Mood Visual',
    poster: images.forever,
    src: videos.forever,
  },
];

export default function HomeClosingSection() {
  const dispatch = useDispatch();
  const [activeVideo, setActiveVideo] = useState(null);

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

  return (
    <>
      <section className="home-closing" aria-label="Ȩ �ϴ� ���� ����">
        <div className="home-closing__header">
          <span className="home-closing__eyebrow">VIDEO CUTS</span>
        </div>

        <div className="home-closing__grid">
          {closingVideos.map((item) => (
            <button
              key={item.id}
              type="button"
              className="home-closing__card home-closing__card--video"
              onClick={() => setActiveVideo(item)}
              aria-label={`${item.title} ���� ����`}
            >
              <img src={item.poster} alt={`${item.title} �����`} className="home-closing__poster" />
              <div className="home-closing__overlay" />

              <div className="home-closing__play" aria-hidden="true">
                <span className="material-symbols-outlined">play_arrow</span>
              </div>

              <div className="home-closing__card-copy">
                <span className="home-closing__card-label">{item.label}</span>
                <strong className="home-closing__card-title">{item.title}</strong>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeVideo ? (
        <div
          className="home-closing__modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.title} ���� ���`}
          onClick={() => setActiveVideo(null)}
        >
          <div className="home-closing__modal-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="home-closing__modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="���� �ݱ�"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>

            <div className="home-closing__modal-copy">
              <span>{activeVideo.label}</span>
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
