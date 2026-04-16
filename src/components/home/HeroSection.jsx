import React from 'react';
import { Link } from 'react-router-dom';

import heroImage from '../../assets/img/hero.jpg';
import './HeroSection.scss';

export default function HeroSection() {
  return (
    <section className="home-hero">
      <div className="home-hero__background" aria-hidden="true">
        <div className="home-hero__background-media">
          <img
            className="home-hero__image"
            src={heroImage}
            alt="BABYMONSTER"
          />
          <div className="home-hero__image-overlay" />
        </div>
      </div>

      <div className="home-hero__content">
        <div className="home-hero__title-wrap">
          <h1 className="home-hero__title">BABYMONSTER</h1>
        </div>

        <div className="home-hero__copy-wrap">
          <div className="home-hero__copy">
            <span className="home-hero__kicker">
              메인 스포트라이트
            </span>
            <h2 className="home-hero__heading">
              OWN THE STAGE.
            </h2>
            <p className="home-hero__description">
              타이틀곡, 퍼포먼스, 비주얼을 한눈에 보는 메인 아카이브.
            </p>
          </div>

          <Link to="/browse" className="home-hero__cta">
            <span>무대 보러 가기</span>
            <span className="home-hero__cta-icon">arrow_right_alt</span>
          </Link>
        </div>
      </div>

      <div className="home-hero__accents" aria-hidden="true">
        <div className="home-hero__shadow" />
        <div className="home-hero__glow" />
      </div>
    </section>
  );
}
