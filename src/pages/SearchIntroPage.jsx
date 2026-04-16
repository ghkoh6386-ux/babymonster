import React from 'react';

import ahyeonImage from '../assets/img/ahyeon.jpg';
import batterupImage from '../assets/img/batterup.jpg';
import dripImage from '../assets/img/drip.jpg';
import foreverImage from '../assets/img/forever.jpg';
import heroImage from '../assets/img/hero.jpg';
import sheeshImage from '../assets/img/sheesh.jpg';
import visualImage from '../assets/img/visual.jpg';
import wegoupImage from '../assets/img/wegoup.jpg';

const heroTags = ['YG NEW WAVE', '7 MEMBERS', 'BOLD VISUAL'];

const introCards = [
  { label: 'Energy', value: 'Hard-hitting stage mood' },
  { label: 'Tone', value: 'Gloss + shadow + green' },
  { label: 'Read', value: 'Sharp, young, fearless' },
];

const heroPulse = [
  ['Debut', '2024'],
  ['Members', '7'],
  ['Aura', 'Fearless'],
];

const heroAlbums = [
  { image: sheeshImage, title: 'SHEESH' },
  { image: dripImage, title: 'DRIP' },
  { image: batterupImage, title: 'BATTER UP' },
];

const eraCards = [
  { year: '2023', title: 'Pre Debut' },
  { year: '2024', title: 'Official Drop' },
  { year: '2025', title: 'World Tour' },
];

const featureMembers = [
  { name: 'RUKA', image: batterupImage },
  { name: 'PHARITA', image: visualImage },
  { name: 'ASA', image: dripImage },
  { name: 'AHYEON', image: ahyeonImage },
  { name: 'RAMI', image: foreverImage },
  { name: 'RORA', image: sheeshImage },
  { name: 'CHIQUITA', image: wegoupImage },
];

export default function SearchIntroPage() {
  return (
    <div className="intro-page">
      <main className="intro-main intro-main--remix">
        <section className="intro-remix-hero">
          <div className="intro-remix-hero__copy">
            <div className="intro-remix-hero__album-stack" aria-hidden="true">
              {heroAlbums.map((item) => (
                <div key={item.title} className="intro-remix-hero__album-card">
                  <img src={item.image} alt="" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>

            <span className="intro-remix-hero__eyebrow">BABYMONSTER INTRO</span>
            <h1>BABY MONSTER</h1>
            <p>
              강한 무대 에너지와 글로시한 비주얼 무드로 읽히는 팀.
            </p>

            <div className="intro-remix-hero__pulse" aria-hidden="true">
              {heroPulse.map(([label, value]) => (
                <div key={label} className="intro-remix-hero__pulse-item">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="intro-remix-hero__tags" aria-hidden="true">
              {heroTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="intro-remix-hero__mini-grid">
              {introCards.map((item) => (
                <article key={item.label} className="intro-remix-hero__mini-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>

            <div className="intro-remix-hero__note">
              <span>About BM</span>
              <p>
                BABYMONSTER는 강한 퍼포먼스와 또렷한 비주얼 무드를 함께 끌고 가는 팀입니다.
                한 번의 장면이나 한 곡의 인상으로 끝나기보다, 무대의 에너지와 팀의 분위기,
                멤버별 존재감이 함께 쌓이면서 더 선명하게 읽히는 그룹이라는 점이 이 인트로
                페이지의 핵심입니다. 그래서 이 페이지도 긴 설명을 늘어놓기보다, 강한 무드와
                이미지, 그리고 짧지만 또렷한 키워드들이 자연스럽게 이어지도록 구성했습니다.
              </p>
            </div>

            <span className="intro-remix-hero__footer-mark" aria-hidden="true">
              stage energy / glossy presence / young tension
            </span>
          </div>

          <div className="intro-remix-hero__visual">
            <img src={heroImage} alt="BABYMONSTER group visual" />
            <div className="intro-remix-hero__overlay" />
            <div className="intro-remix-hero__stamp">
              <span>Core Mood</span>
              <strong>Performance First</strong>
            </div>
          </div>
        </section>

        <section className="intro-remix-strip" aria-label="BABYMONSTER quick intro">
          <article className="intro-remix-strip__lead">
            <span>Essence</span>
            <h2>무대에서 먼저 각인되고 비주얼로 오래 남는 팀.</h2>
          </article>

          <div className="intro-remix-strip__era">
            {eraCards.map((item) => (
              <article key={item.year} className="intro-remix-strip__era-card">
                <span>{item.year}</span>
                <strong>{item.title}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="intro-remix-members" aria-label="BABYMONSTER featured members">
          <div className="intro-remix-members__heading">
            <span>Visual Cuts</span>
            <h2>짧게 봐도 무드가 보이는 멤버 컷.</h2>
          </div>

          <div className="intro-remix-members__grid">
            {featureMembers.map((member) => (
              <article key={member.name} className="intro-remix-members__card">
                <img src={member.image} alt={`${member.name} visual cut`} />
                <div className="intro-remix-members__label">
                  <span>Member</span>
                  <strong>{member.name}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        
      </main>
    </div>
  );
}
