import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  addPlaylistCard,
  selectFavoriteMusicIds,
  selectFeatureCardById,
  selectFeatureCards,
  selectPlaylistIds,
  setCurrentFeatureCardId,
  setPlayerPlaying,
  toggleFavoriteMusicId,
} from '../features/feature/featureSlice';

export default function MusicDetailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [videoOpen, setVideoOpen] = useState(false);

  const cards = useSelector(selectFeatureCards);
  const detailItem = useSelector(selectFeatureCardById(id));
  const playlistIds = useSelector(selectPlaylistIds);
  const favoriteMusicIds = useSelector(selectFavoriteMusicIds);

  useEffect(() => {
    if (!videoOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setVideoOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoOpen]);

  if (!detailItem) {
    return (
      <div className="music-detail-page">
        <main className="music-detail-main">
          <section className="music-detail-hero">
            <div className="music-detail-hero__back-wrap">
              <button
                type="button"
                className="music-detail-hero__back"
                onClick={() => navigate('/browse')}
              >
                둘러보기로 가기
              </button>
            </div>

            <div className="music-detail-hero__content">
              <span className="music-detail-hero__eyebrow">파일 없음</span>
              <p>콘텐츠 없음</p>
              <h1>NOT FOUND</h1>
              <h2 className="music-detail-hero__subtitle">
                요청한 파일을 현재 아카이브에서 찾지 못했습니다.
              </h2>
              <div className="music-detail-hero__actions">
                <Link
                  to="/browse"
                  className="music-detail-hero__action music-detail-hero__action--primary"
                >
                  둘러보기로 이동
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const isFavorited = favoriteMusicIds.some((itemId) => String(itemId) === String(detailItem.id));

  const stats = detailItem.stats ?? [
    ['9.4k', '반응 수치'],
    ['0:07', '전개 구간'],
    ['12.1', '집중 지점'],
    ['inf', '잔향 길이'],
  ];

  const keyFacts = detailItem.keyFacts ?? [
    ['보관 묶음', detailItem.collection ?? 'BABYMONSTER // Core Archive 01'],
    ['형식', detailItem.format ?? 'Main stage cut / Performance master'],
    ['무드', detailItem.mood ?? 'Bold / Glossy / Stage-first'],
  ];

  const notes = detailItem.notes ?? [
    [
      '퍼포먼스 포인트',
      '이 페이지는 무대 파일이 왜 강하게 느껴지는지까지 보여줘야 합니다.',
    ],
    [
      '감상 포인트',
      '다시 보기와 세부 확인에 어울리는 방식으로 구성했습니다.',
    ],
    [
      '아카이브 연결',
      'BABYMONSTER 전체 흐름과 자연스럽게 이어지는 파일입니다.',
    ],
  ];

  const relatedItems = cards
    .filter(
      (item) =>
        String(item.id) !== String(detailItem.id) &&
        Boolean(item.audio) &&
        Boolean(item.video)
    )
    .slice(0, 3);

  const handlePlayMusic = () => {
    const hasInPlaylist = playlistIds.some((itemId) => String(itemId) === String(detailItem.id));

    if (!hasInPlaylist) {
      dispatch(addPlaylistCard(detailItem.id));
    }

    dispatch(setCurrentFeatureCardId(detailItem.id));
    dispatch(setPlayerPlaying(true));
  };

  const handleOpenVideo = () => {
    if (!detailItem.video) {
      return;
    }

    dispatch(setPlayerPlaying(false));
    setVideoOpen(true);
  };

  return (
    <div className="music-detail-page">
      <main className="music-detail-main">
        <section className="music-detail-hero">
          <img
            src={detailItem.heroImage ?? detailItem.image}
            alt={detailItem.title}
          />

          <div className="music-detail-hero__overlay" />

          <div className="music-detail-hero__content">
            <p>{detailItem.author ?? '아티스트 정보 없음'}</p>

            <h1>{detailItem.title}</h1>

            <h2 className="music-detail-hero__subtitle">
              {detailItem.description ?? detailItem.subtitle ?? '설명이 준비되지 않았습니다.'}
            </h2>

            <div className="music-detail-hero__actions">
              <button
                type="button"
                className={`music-detail-hero__action music-detail-hero__action--primary${
                  isFavorited ? ' music-detail-hero__action--active' : ''
                }`}
                onClick={() => {
                  if (detailItem.audio) {
                    dispatch(toggleFavoriteMusicId(detailItem.id));
                  }
                }}
              >
                {isFavorited ? 'LIKED' : 'LIKE'}
              </button>
              <button type="button" className="music-detail-hero__action">
                SHARE
              </button>
            </div>
          </div>

          <div className="music-detail-hero__facts">
            {keyFacts.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="music-detail-story">
          <div className="music-detail-story__images">
            <div className="music-detail-story__primary">
              <img
                src={detailItem.storyImagePrimary ?? detailItem.image}
                alt={`${detailItem.title} primary`}
              />
            </div>
            <div className="music-detail-story__secondary">
              <img
                src={detailItem.storyImageSecondary ?? detailItem.image}
                alt={`${detailItem.title} secondary`}
              />
            </div>
          </div>

          <div className="music-detail-story__text">
            <span className="music-detail-story__eyebrow">
              {detailItem.storyEyebrow ?? '아카이브 노트'}
            </span>
            <h2>{detailItem.storyTitle ?? '무대의 흐름'}</h2>
            <p>{detailItem.storyText ?? detailItem.description ?? detailItem.subtitle}</p>

            <p className="music-detail-story__meta">
              기록: {detailItem.recorded ?? 'Berlin, Winter 2023'}
              <br />
              마스터링: {detailItem.mastered ?? 'Obsidian Audio Lab'}
            </p>

            <div className="music-detail-story__aside">
              <span>{detailItem.asideTitle ?? '보조 메모'}</span>
              <p>
                {detailItem.asideText ??
                  '짧은 캡션보다 한 단계 더 깊게 읽을 수 있는 설명이 들어가는 영역입니다.'}
              </p>
            </div>

            <div className="music-detail-story__actions">
              <button
                type="button"
                className="music-detail-story__action music-detail-story__action--primary"
                onClick={handlePlayMusic}
              >
                MUSIC
              </button>
              <button
                type="button"
                className="music-detail-story__action"
                onClick={handleOpenVideo}
                disabled={!detailItem.video}
              >
                VIDEO
              </button>
            </div>
          </div>
        </section>

        <section className="music-detail-notes">
          <div className="music-detail-notes__intro">
            <span>무대 뒤 기록</span>
            <h3>시기별 노트</h3>
          </div>

          <div className="music-detail-notes__grid">
            {notes.map(([title, body]) => (
              <article key={title} className="music-detail-notes__card">
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="music-detail-tech">
          <div className="music-detail-tech__intro">
            <h3>퍼포먼스 분석</h3>
            <p>
              {detailItem.techDescription ??
                '리듬과 질감이 어떻게 무대의 밀도를 만드는지 보여주는 설명 영역입니다.'}
            </p>
            <p className="music-detail-tech__support">
              {detailItem.techSupport ??
                '단순한 정보 나열보다 왜 이 트랙이 이렇게 느껴지는지 설명하는 문장에 가깝습니다.'}
            </p>
          </div>

          <div className="music-detail-tech__grid">
            {stats.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="music-detail-related">
          <div className="music-detail-related__intro">
            <span>다음 흐름</span>
            <h3>More Releases</h3>
            <p>
              관련 트랙을 열거나 연결된 비주얼을 보고, 다음 무대로 자연스럽게 이동할 수 있습니다.
            </p>
          </div>

          <div className="music-detail-related__grid">
            {relatedItems.map((item) => (
              <Link
                key={item.id}
                to={`/detail/${item.id}`}
                className="music-detail-related__card"
              >
                <div className="music-detail-related__card-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="music-detail-related__card-copy">
                  <span>{item.collection ?? 'ALBUM FILE'}</span>
                  <strong>{item.title}</strong>
                  <p>{item.description ?? item.subtitle}</p>
                  <em>{item.subtitle}</em>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="music-detail-pagination">
          <Link to="/library" className="music-detail-pagination__link">
            BACK TO LIBRARY
          </Link>
        </section>
      </main>

      {videoOpen && detailItem.video ? (
        <div
          className="music-detail-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${detailItem.title} 영상 재생`}
          onClick={() => setVideoOpen(false)}
        >
          <div className="music-detail-video-modal__panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="music-detail-video-modal__close"
              onClick={() => setVideoOpen(false)}
              aria-label="영상 닫기"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                close
              </span>
            </button>

            <div className="music-detail-video-modal__copy">
              <span>{detailItem.collection ?? 'VIDEO FILE'}</span>
              <strong>{detailItem.title}</strong>
              <p>{detailItem.description ?? detailItem.subtitle}</p>
            </div>

            <video
              className="music-detail-video-modal__player"
              src={detailItem.video}
              poster={detailItem.image}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
