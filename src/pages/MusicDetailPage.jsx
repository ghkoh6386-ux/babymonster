import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  selectFeatureCardById,
  selectFeatureCards,
} from '../features/feature/featureSlice';

export default function MusicDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const canGoBack = Boolean(location.key && location.key !== 'default');

  const cards = useSelector(selectFeatureCards);
  const detailItem = useSelector(selectFeatureCardById(id));

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
    .filter((item) => String(item.id) !== String(detailItem.id))
    .slice(0, 3);

  const currentIndex = cards.findIndex(
    (item) => String(item.id) === String(detailItem.id)
  );

  const prevItem = currentIndex > 0 ? cards[currentIndex - 1] : null;
  const nextItem = currentIndex < cards.length - 1 ? cards[currentIndex + 1] : null;

  return (
    <div className="music-detail-page">
      <main className="music-detail-main">
        <section className="music-detail-hero">
          <div className="music-detail-hero__back-wrap">
            <button
              type="button"
              className="music-detail-hero__back"
              onClick={() => {
                if (canGoBack) {
                  navigate(-1);
                  return;
                }
                navigate('/browse');
              }}
            >
              이전 페이지
            </button>
          </div>

          <img
            src={detailItem.heroImage ?? detailItem.image}
            alt={detailItem.title}
          />

          <div className="music-detail-hero__overlay" />

          <div className="music-detail-hero__content">
            <span className="music-detail-hero__eyebrow">
              {detailItem.eyebrow ?? '대표 트랙 상세'}
            </span>

            <p>{detailItem.author ?? '아티스트 정보 없음'}</p>

            <h1>{detailItem.title}</h1>

            <h2 className="music-detail-hero__subtitle">
              {detailItem.description ?? detailItem.subtitle ?? '설명이 준비되지 않았습니다.'}
            </h2>

            <div className="music-detail-hero__actions">
              <button
                type="button"
                className="music-detail-hero__action music-detail-hero__action--primary"
              >
                저장하기
              </button>
              <button type="button" className="music-detail-hero__action">
                공유
              </button>
              <button type="button" className="music-detail-hero__action">
                다음 재생
              </button>
            </div>
          </div>

          <div className="music-detail-hero__stats">
            <div>
              <span>속도</span>
              <strong>{detailItem.tempo ?? '64 BPM'}</strong>
            </div>
            <div>
              <span>조성</span>
              <strong>{detailItem.harmonic ?? 'D minor'}</strong>
            </div>
            <div>
              <span>주파수</span>
              <strong>{detailItem.frequency ?? '432 Hz'}</strong>
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
              <Link
                to="/library"
                className="music-detail-story__action music-detail-story__action--primary"
              >
                저장 파일 보기
              </Link>
              <Link to="/search" className="music-detail-story__action">
                관련 결과 보기
              </Link>
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
            <h3>이어 볼 파일</h3>
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
                <strong>{item.title}</strong>
                <p>{item.subtitle}</p>
                <span>자세히 보기</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="music-detail-pagination">
          {prevItem ? (
            <Link to={`/detail/${prevItem.id}`} className="music-detail-pagination__card">
              <span>이전 콘텐츠</span>
              <strong>{prevItem.title}</strong>
              <p>{prevItem.subtitle}</p>
            </Link>
          ) : (
            <div className="music-detail-pagination__card is-disabled">
              <span>이전 콘텐츠</span>
              <strong>아카이브 시작점</strong>
              <p>이전으로 이동할 항목이 없습니다.</p>
            </div>
          )}

          {nextItem ? (
            <Link to={`/detail/${nextItem.id}`} className="music-detail-pagination__card">
              <span>다음 콘텐츠</span>
              <strong>{nextItem.title}</strong>
              <p>{nextItem.subtitle}</p>
            </Link>
          ) : (
            <div className="music-detail-pagination__card is-disabled">
              <span>다음 콘텐츠</span>
              <strong>아카이브 끝</strong>
              <p>더 이동할 항목이 없습니다.</p>
            </div>
          )}
        </section>
      </main>

    </div>
  );
}
