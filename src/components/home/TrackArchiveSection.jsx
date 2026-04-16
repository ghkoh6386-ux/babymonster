import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addPlaylistCard,
  insertPlaylistCardNext,
  selectCurrentFeatureCardId,
  selectFeatureCards,
  selectPlaylistIds,
  setPlayerPlaying,
  setCurrentFeatureCardId,
} from '../../features/feature/featureSlice';
import '../../styles/home/track-archive.scss';

export default function TrackArchiveSection() {
  const dispatch = useDispatch();
  const cards = useSelector(selectFeatureCards);
  const currentCardId = useSelector(selectCurrentFeatureCardId);
  const playlistIds = useSelector(selectPlaylistIds);
  const [currentSlide, setCurrentSlide] = useState(0);

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
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              west
            </span>
          </button>

          <div className="home-track-archive__viewport">
            <div
              className="home-track-archive__track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slideItems, slideIndex) => (
                <div className="home-track-archive__slide" key={`slide-${slideIndex}`}>
                  {slideItems.map((item, index) => {
                    const globalIndex = slideIndex * 3 + index;
                    const isActive = currentCardId === item.id;
                    const isQueued = playlistIds.includes(item.id);

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
                            {item.date ?? '2024'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="home-track-archive__nav"
            aria-label="다음 슬라이드"
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide >= slides.length - 1}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              east
            </span>
          </button>
        </div>

        <div className="home-track-archive__pagination">
          {slides.map((_, index) => (
            <button
              key={`slide-dot-${index}`}
              type="button"
              className={`home-track-archive__dot${index === currentSlide ? ' home-track-archive__dot--active' : ''}`}
              aria-label={`${index + 1}번 슬라이드로 이동`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
