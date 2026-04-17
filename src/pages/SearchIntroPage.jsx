import React from 'react';

import { images } from '../assets/media';
import batterupImage from '../assets/img/batterup.jpg';
import dripImage from '../assets/img/drip.jpg';
import sheeshImage from '../assets/img/sheesh.jpg';

const heroTags = ['YG NEW WAVE', '7 MEMBERS', 'BOLD VISUAL'];

const introCards = [
  { label: 'Energy', value: 'Hard-hitting stage mood' },
  { label: 'Tone', value: 'Gloss + shadow + tension' },
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
  { name: 'RUKA', image: images.luka },
  { name: 'PHARITA', image: images.pharita },
  { name: 'ASA', image: images.asa },
  { name: 'AHYEON', image: images.ahyeon },
  { name: 'RAMI', image: images.rami },
  { name: 'RORA', image: images.rora },
  { name: 'CHIQUITA', image: images.chiquita },
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
              무대에서 먼저 존재감을 남기고, 비주얼로 오래 기억되는 팀의 첫인상을 담았습니다.
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
                BABYMONSTER는 퍼포먼스, 스타일링, 팀의 분위기로 빠르게 강한 인상을 남깁니다.
                이 페이지는 그 첫인상을 멤버별 이미지와 비주얼 중심 흐름으로 자연스럽게 소개하는 구성입니다.
              </p>
            </div>

            <span className="intro-remix-hero__footer-mark" aria-hidden="true">
              stage energy / glossy presence / young tension
            </span>
          </div>

          <div className="intro-remix-hero__visual">
            <img src={images.aboutHero} alt="BABYMONSTER group visual" />
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
            <h2>First remembered on stage, then sealed by visual impact.</h2>
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
            <h2>MEMBERS</h2>
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
