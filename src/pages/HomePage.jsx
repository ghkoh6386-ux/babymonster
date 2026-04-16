import React from 'react';
import { Link } from 'react-router-dom';
import featureCards from '../data/featureCards';
import FeatureCardsSection from '../components/home/FeatureCardsSection';
import Footer from '../components/layout/Footer';
import HomeClosingSection from '../components/home/HomeClosingSection';
import HeroSection from '../components/home/HeroSection';
import MoodCollageSection from '../components/home/MoodCollageSection';
import TrackArchiveSection from '../components/home/TrackArchiveSection';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const featuredPrimary = featureCards[0];
  const featuredSecondary = featureCards.slice(1, 4);

  if (!featuredPrimary || featuredSecondary.length < 3) {
    return null;
  }

  const overviewItems = [
    {
      to: '/browse',
      label: '브라우저 페이지',
      title: '뮤직비디오와 퍼포먼스 중심.',
      meta: 'VIDEO FOCUS',
      index: '01',
    },
    {
      to: '/library',
      label: '아카이브 페이지',
      title: '앨범 무드와 대표 이미지.',
      meta: 'ALBUM ARCHIVE',
      index: '02',
    },
    {
      to: '/search',
      label: '인트로 페이지',
      title: '팀 무드를 먼저 읽는 인트로.',
      meta: 'INTRO MOOD',
      index: '03',
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.canvas} aria-label="홈 메인 화면">
        <HeroSection />

        <section className={styles.overview} aria-label="홈 경로 미리보기">
          {overviewItems.map((item) => (
            <Link key={item.to} to={item.to} className={styles.overviewCard}>
              <div className={styles.overviewTop}>
                <div className={styles.overviewMeta}>
                  <span>{item.meta}</span>
                </div>
                <span className={styles.overviewIndex}>{item.index}</span>
              </div>
              <strong className={styles.overviewTitle}>{item.title}</strong>
              <span className={styles.overviewLabel}>{item.label}</span>
            </Link>
          ))}
        </section>

        <FeatureCardsSection />

        <MoodCollageSection />
        <TrackArchiveSection />
        <HomeClosingSection />
        <Footer />
      </main>
    </div>
  );
}
