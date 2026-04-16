import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const recentEchoes = [
  {
    title: 'SHEESH',
    meta: '트랙 / 130 BPM',
    to: '/detail/sheesh-command',
  },
  {
    title: 'DRIP',
    meta: '퍼포먼스 / 122 BPM',
    to: '/detail/drip-floor-cut',
  },
  {
    title: 'FOREVER // RED ROOM',
    meta: '필름 컷 / 96 BPM',
    to: '/detail/forever-red-room',
  },
];

const sonicMoods = [
  { icon: 'flash_on', label: '강한 무대감', to: '/browse' },
  { icon: 'styler', label: '블랙 글로시', to: '/browse' },
  { icon: 'mood', label: '멤버 포커스', to: '/browse' },
  { icon: 'flare', label: '부드러운 긴장감', to: '/browse' },
];

const trendingTopics = ['SHEESH', 'DRIP', 'RUKA 비주얼', 'FOREVER 필름 컷'];
const quickSuggestions = ['트랙: SHEESH', '유형: 무대', '멤버: RUKA'];

export default function SearchPage() {
  return (
    <div className="search-page">
      <main className="search-main">
        <section className="search-hero">
          <span className="search-hero__eyebrow">아카이브 검색</span>
          <h1>검색</h1>
          <p className="search-hero__description">
            트랙, 무대, 비주얼을 빠르게 찾는 검색 화면.
          </p>

          <label className="search-hero__field" htmlFor="search-query">
            <input id="search-query" type="text" placeholder="트랙, 멤버, 무대 키워드 검색" />
            <Icon name="search" className="search-hero__field-icon" />
          </label>

          <div className="search-hero__status" aria-label="검색 미리보기 상태">
            <span>미리보기 / 정적 화면</span>
            <strong>"SHEESH 무대" 결과 3개</strong>
          </div>

          <div className="search-hero__tokens" aria-label="추천 검색 주제">
            <span>SHEESH 무대</span>
            <span>RUKA 비주얼</span>
            <span>투어 필름 컷</span>
          </div>

          <p className="search-hero__support">
            곡명, 멤버명, 무드 키워드로 바로 찾을 수 있게 구성했습니다.
          </p>

          <div className="search-hero__aux">
            <div className="search-hero__group">
              <span className="search-hero__group-label">빠른 제안</span>
              <div className="search-hero__chips">
                {quickSuggestions.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="search-hero__group">
              <span className="search-hero__group-label">지금 많이 찾는 항목</span>
              <div className="search-hero__chips">
                {trendingTopics.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="search-body">
          <div className="search-column">
            <section className="search-panel">
              <div className="search-panel__heading">
                <h2>최근 검색</h2>
                <p>방금 본 검색어.</p>
              </div>

              <ul className="search-echoes">
                {recentEchoes.map((item) => (
                  <li key={item.title}>
                    <Link to={item.to} className="search-echoes__item">
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.meta}</span>
                      </div>
                      <Icon name="north_east" className="size-sm" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="search-panel">
              <div className="search-panel__heading">
                <h2>무드별 탐색</h2>
                <p>정확한 제목이 없어도 분위기로 찾기.</p>
              </div>

              <div className="search-moods">
                {sonicMoods.map((mood, index) => (
                  <Link
                    key={mood.label}
                    to={mood.to}
                    className={`search-moods__card ${index % 2 === 1 ? 'search-moods__card--offset' : ''}`}
                  >
                    <Icon name={mood.icon} className="size-md" />
                    <span>{mood.label}</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="search-panel search-panel--alternate">
              <div className="search-panel__heading">
                <h2>결과 없음</h2>
                <p>결과가 없으면 더 넓은 카테고리로 이동.</p>
              </div>

              <div className="search-empty-state">
                <strong>아카이브나 보관함으로 넓게 보기.</strong>
                <p>태그, 저장 파일, 멤버별 묶음을 여기서 제안합니다.</p>
                <Link to="/browse" className="search-empty-state__link">
                  아카이브 열기
                </Link>
              </div>
            </section>
          </div>

          <section className="search-results" aria-label="추천 검색 결과">
            <div className="search-results__heading">
              <div>
                <h2>검색 결과</h2>
                <p>바로 들어갈 수 있는 추천 결과.</p>
              </div>
              <span>결과 3개 / 그룹 1개 / 트랙 1개</span>
            </div>

            <div className="search-results__grid">
              <article className="search-result search-result--artist">
                <div className="search-result__media">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-aDoyykuAbdA-jzDywUEWdLZrmt3SqvDp10WGSAm4mjFjZIyaeT8vTscwMsjbLTgDXqGcQ9C8XPt2VHIzuon5vVasO_1HlPp9TvdbL_aNcmQy7Vj-tH7mZ1fMEPUxBZ0KOdV5-VLeIvQ62JnpFbPVtfkIJxVLW6A2bO6ON8XqVoRSCx6BLGYX5dvEFWkJKwTB0vGclphgPTPoxtLfkudro88OumwirXycnsFFf90HbQo3OA23dxSCaOaxB10E3fNnx07PhGdu7iZb" alt="Featured BABYMONSTER visual result" />
                </div>
                <div className="search-result__content">
                  <span className="search-result__label">대표 항목</span>
                  <h3>BABYMONSTER</h3>
                  <p>메인 아카이브 / 컴백 시기</p>
                  <Link to="/detail/sheesh-command" className="search-result__cta">
                    타이틀 보기
                  </Link>
                </div>
              </article>

              <article className="search-result search-result--track">
                <div className="search-result__media">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpR9qMqm7DyNoAvWhDrtG4sekRx5S0NorkRL8041iwDX96oYDRUtpdYXkBnjNKUNj8tM1vkuqujKyVFdwfcx0m0yETR0p90ckzjWJDjrxfLEgDOfLGz4EO6blKxdPkpEsWFpKm3GR0gA7-75d5jbjMu7fnewo7HxeshKvZD2Rw4Jahyo6ancTEhRjgi7DyFStTVzpwUxjbz5ejcX3x2DQITQh2zbltE4xQ31CUTxDGUE3RQoxEzQ8_71Cp4uh3SSELaLkcR1YrU7Ni" alt="Artwork for DRIP" />
                </div>
                <div className="search-result__content search-result__content--compact">
                  <div>
                    <h3>DRIP</h3>
                    <p>투어 퍼포먼스 컷</p>
                  </div>
                  <Link to="/detail/drip-floor-cut" className="search-result__play" aria-label="Open DRIP detail">
                    <Icon name="play_arrow" filled />
                  </Link>
                </div>
              </article>

              <article className="search-result search-result--collection">
                <div className="search-result__media">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR8zDq289yH_1WgQErpdJ7FBXi0XhYjlMKaQj-Ie49fxw06ZymBapH3-FM6OC5OCVo3ayoD7qeH6TEnk_bwWaRVuWFCcqiko6EJJiDSIQ2khgoT4pPOq6YGE-NRL1yxJ3rbdNZUY2oyCg3-WAJ7_oagSvtJWysLy1PjB4LfKKNtVHc_-nQwbVl6-7Tb4kw9dupPAnDfdrow7BTSkO-VmXBM69rLGAsAiTESkl5rv2bNBoox5ql6q6SNZWhRf_MB5j1pEOSNr7FT5aR" alt="Artwork for BABYMONSTER archive collection" />
                </div>
                <div className="search-result__content">
                  <span className="search-result__label">보관함</span>
                  <h3>BABYMONSTER 보관 파일</h3>
                  <p>저장한 비주얼과 무대 파일 모음.</p>
                  <Link to="/library" className="search-result__cta">
                    저장 파일 보기
                  </Link>
                </div>
              </article>
            </div>
          </section>
        </section>
      </main>

    </div>
  );
}
