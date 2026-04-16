import React from 'react';
import { Link } from 'react-router-dom';


const collections = [
  [
    '01',
    'SHEESH // 메인 무대 컷',
    'BABYMONSTER / 타이틀곡 중심 / 대표 파일',
    '/detail/sheesh-command',
  ],
  [
    '02',
    'DRIP // 플로어 캠 컷',
    'BABYMONSTER 퍼포먼스 팀 / 무대 아카이브 / 퍼포먼스 필름',
    '/detail/drip-floor-cut',
  ],
  [
    '03',
    'RUKA // 미드나이트 런웨이',
    'BABYMONSTER 비주얼 유닛 / 멤버 포커스 / 비주얼 파일',
    '/detail/ruka-midnight-runway',
  ],
  [
    '04',
    'FOREVER // 레드 룸',
    'BABYMONSTER 필름 유닛 / 소프트 글로시 컷 / 비주얼 챕터',
    '/detail/forever-red-room',
  ],
];

const discoveryTags = [
  '연도: 2024',
  '무드: 다크 글로시',
  '형식: 무대 파일',
  '구성: 컴백 하이라이트',
];

const discoverControls = [
  ['정렬', '최신순'],
  ['유형', '트랙 / 퍼포먼스 / 비주얼'],
  ['시기', '2024 컴백'],
  ['톤', '블랙 크롬'],
];

export default function DiscoverPage() {
  return (
    <div className="discover-page">
      <main className="discover-main">
        <section className="discover-hero">
          <div className="discover-hero__intro">
            <span>둘러보기 모드</span>
            <h2>둘러보기</h2>
            <p className="discover-hero__lead">
              타이틀곡, 퍼포먼스, 비주얼 파일을 빠르게 둘러보는 공간.
            </p>
            <div className="discover-hero__quote">
              <p>
                "대표 트랙에서 시작해 무대와 비주얼로 넓혀보세요."
              </p>
            </div>
          </div>

          <div className="discover-hero__visual discover-hero__visual--one">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJTfINDBU8N03T1oO3ZUwEiXuIUELYeKV1HFhswbKCRitS39XQMMyOID-6kkwUfBDHXKmvlAOJ3_9xBJ-Cf4qZOf1b-6NXw_Uc1fxGwDyEFwFamojhPqhz0oUzUlLqjBfuLquJTZSoJtftTBAAVb8E-bN-IlKqVqL65GIpyy666CD0V8Dx6D4WKXu36-Hm2CABAOI2onlVsSo36pgEwdYYr-SzRwSC0fri9EREn3vMtHbpZTWBCj0r-XakF0KKdYbv1GDVPgOIZ8dR" alt="Visual 1" />
          </div>
          <div className="discover-hero__visual discover-hero__visual--two">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmQPzJMNp3XBswJZkTP3cJbhIroLYnfQvd1NnEq48lWJCWpRAD-mhp5yo0_gk4PqvRyjqN7lal1sUy1CrtPqelwlYSD4U5PK55rTqURNpKQejNOm-iYm5JEuc_oSD9wU9YpcEk1HdAtPNqM9SQ5mQCP3xw0QW1PuabN7gNoNcKnuABhwEXW7mM4TfNFWUVULZlATSGvQF5KQgoNky9OOtr_pWVn32Sd98Imj-PL1dxGVBhiIj0aGwJMFIoYFJApLs1nafOEgSMWhVN" alt="Visual 2" />
          </div>
          <div className="discover-hero__visual discover-hero__visual--three">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcv0LoN8WHynPj4VpkJGrtKlVfamNj1SMTPb_ugSaV-yVyomK_Gu6ilSgCzL1vdlxbKu11fC6wJxFWAnH-7dWJvY-kmg8mPziccyqh4YAL8ihF5AcOoSH-vhaMtAgvKQaMrHzMxgwwl_y0x0HlRarLkSS5WzkUSwa3_3PcKfdj_h4tj5yL7FqbHCUQQ4rgPCEfG5FIUaarV-P1kK2m_Sb46aFBMjsmgplwaOOodue56PdbGgT1GhFjTPpLH4R7LTd0KNsUvuITzjmk" alt="Visual 3" />
          </div>

          <div className="discover-filters">
            <div>
              <span>정렬</span>
              <strong>최신순</strong>
            </div>
            <div>
              <span>에너지</span>
              <strong>강한 무대감</strong>
            </div>
            <div>
              <span>구성</span>
              <strong>트랙 + 무대</strong>
            </div>
          </div>
        </section>

        <section className="discover-toolbar" aria-label="둘러보기 정보">
          <div className="discover-toolbar__summary">
            <span>현재 보기</span>
            <p>파일 4개 / 정적 미리보기</p>
          </div>
          <div className="discover-toolbar__tags">
            {discoveryTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <section className="discover-controls" aria-label="정적 둘러보기 제어">
          {discoverControls.map(([label, value]) => (
            <button key={label} type="button" className="discover-controls__chip">
              <span>{label}</span>
              <strong>{value}</strong>
            </button>
          ))}
        </section>

        <section className="discover-categories">
          <div className="discover-categories__left">
            <h3>둘러보기 라인</h3>
            <p className="discover-categories__hint">
              트랙, 무대, 멤버 포인트 중심으로 빠르게 이동.
            </p>
            <ul>
              <li>타이틀곡</li>
              <li className="is-highlighted">무대 중심</li>
              <li>멤버 비주얼</li>
              <li>필름 컷</li>
            </ul>
          </div>

          <div className="discover-categories__right">
            <h3>주요 파일</h3>
            <p className="discover-categories__summary">
              바로 Detail로 이어지는 메인 파일 모음.
            </p>

            {collections.map(([index, title, meta, to]) => (
              <article key={index} className="discover-collection">
                <div className="discover-collection__main">
                  <span>{index}</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{meta}</p>
                  </div>
                </div>
                <Link to={to} className="discover-collection__cta">
                  파일 열기
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="discover-gallery">
          <Link to="/detail/sheesh-command" className="discover-gallery__large">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwPpFiexjmDaaMNo_JIfcfMOh-YAlNvh0JzFZn3SqfliIRaFp5KNx362mb4cpbyLN4edAWdX332uBbsC6oMD-Q8ROLYneZkwnGdTycGCYTczr2aS3-kI7I7S3wwmCWqtIetYGiC0MdTdRkV99eRnv2QLUDzWjzUqOf1OVrYCLTNqKDcibwvamMw9-G0mg7anqC-6C0dgECgaA3M6EdD0p3S7H_lLsMbnX7zBlbq9kNWr-pIW6uUVJTU69djdI1XGqIVzmj2xqxsNsx" alt="Gallery 1" />
            <div className="discover-gallery__feature-copy">
              <span>대표 타이틀곡</span>
              <h4>SHEESH</h4>
              <p>메인 타이틀곡부터 바로 확인.</p>
            </div>
          </Link>

          <div className="discover-gallery__stack">
            <article className="discover-gallery__essay">
              <span>무대 노트</span>
              <h5>무대의 힘과 무드가 어떻게 바뀌는지 한눈에.</h5>
              <p>짧게 보고 바로 넘어갈 수 있는 메모.</p>
              <Link to="/library" className="discover-gallery__essay-link">
                저장 파일 보기
              </Link>
            </article>

            <Link to="/detail/drip-floor-cut" className="discover-gallery__image">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwb_YC1dAzOmzsPfOJcPPGhh9DribJ39EvgOau_LlrhFlqnX8LCmPbZU7sJOTJtdFfNT3RrMLAZhoYELdCYDqJveFLJr4PRx5SFOUKhcfSDdVn_tD77WYXjvOty8ZX4sUP-robzRTwfnHTK8oAKBqZPiRK8Fs6fdCklFj4elfTaXxIh97pMYbW51w7Z5kJOE_6a_gArRK7XN0MN_u-scc9SX1w3k4YB10RM51jXIlh2GiD2-r8zDSKQZqA97czbGWUUtUZoa0lvOiw" alt="Ambience" />
              <div className="discover-gallery__secondary-copy">
                <span>두 번째 추천</span>
                <strong>DRIP</strong>
              </div>
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
