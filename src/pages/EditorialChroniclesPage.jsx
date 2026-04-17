import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { images } from '../assets/media';
import './EditorialChroniclesPage.scss';

const albumChronicles = [
  {
    id: 'sheesh',
    title: 'SHEESH',
    subtitle: '1st Mini Album',
    year: '2024',
    label: 'Lead Era',
    format: 'Mini Album',
    description: '가장 선명한 메인 무드와 타이틀 에너지가 살아 있는 대표 앨범 챕터입니다.',
    image: images.sheesh,
  },
  {
    id: 'batter-up',
    title: 'BATTER UP',
    subtitle: 'Debut Single',
    year: '2023',
    label: 'Debut Chapter',
    format: 'Single Album',
    description: '데뷔 시점의 강한 인상과 첫 인트로 톤을 보여주는 시작점입니다.',
    image: images.batterup,
  },
  {
    id: 'drip',
    title: 'DRIP',
    subtitle: 'Digital Single',
    year: '2024',
    label: 'Style Cut',
    format: 'Single Release',
    description: '리듬과 스타일을 중심으로 보다 매끈한 앨범 인상을 완성한 싱글입니다.',
    image: images.drip,
  },
  {
    id: 'forever',
    title: 'FOREVER',
    subtitle: 'Special Single',
    year: '2024',
    label: 'Mood Chapter',
    format: 'Special Single',
    description: '조금 더 부드럽고 감정적인 톤으로 확장되는 무드 중심의 앨범 컷입니다.',
    image: images.forever,
  },
  {
    id: 'we-go-up',
    title: 'WE GO UP',
    subtitle: 'Live Release',
    year: '2025',
    label: 'Live Chapter',
    format: 'Live Album Cut',
    description: '현장감과 상승감을 전면에 두고 빠르게 몰입할 수 있는 라이브 챕터입니다.',
    image: images.wegoup,
  },
  {
    id: 'sheesh',
    title: 'SHEESH ARCHIVE',
    subtitle: 'Album Edition',
    year: '2024',
    label: 'Archive Pack',
    format: 'Collector Edition',
    description: '비주얼과 타이틀 컷을 함께 묶어 앨범 페이지답게 감상할 수 있는 패키지입니다.',
    image: images.sheesh,
  },
  {
    id: 'drip',
    title: 'DRIP BLACK',
    subtitle: 'Visual Edition',
    year: '2024',
    label: 'Visual Pack',
    format: 'Concept Album',
    description: '짙은 컬러와 스타일 라인을 강조해 보다 세련된 앨범 이미지를 보여줍니다.',
    image: images.drip,
  },
  {
    id: 'batter-up',
    title: 'BATTER UP FILE',
    subtitle: 'Starter Edition',
    year: '2023',
    label: 'Starter Pack',
    format: 'Archive Album',
    description: '초기 에너지와 팀 컬러를 다시 한 번 정리해 보는 스타터 앨범 카드입니다.',
    image: images.batterup,
  },
];

const initialAlbums = albumChronicles.slice(0, 4);
const extraAlbums = albumChronicles.slice(4);

export default function EditorialChroniclesPage() {
  const [showMore, setShowMore] = useState(false);
  const heroAlbum = albumChronicles[0];
  const heroStack = albumChronicles.slice(1, 4);

  return (
    <div className="chronicles-page chronicles-page--albums">
      <main className="chronicles-main chronicles-main--albums">
        <section className="chronicles-album-hero">
          <div className="chronicles-album-hero__lede">
            <div className="chronicles-album-hero__copy">
              <span>EDITORIAL ALBUMS</span>
              <h1>ALBUM NOTES</h1>
              <p>한 장의 앨범이 만들어내는 무드와 순간들을, 지금의 시선으로 다시 만나보세요.</p>
            </div>

            <div className="chronicles-album-hero__spotlight">
              <div className="chronicles-album-hero__spotlight-cover">
                <img src={heroAlbum.image} alt={heroAlbum.title} />
              </div>
              <div className="chronicles-album-hero__spotlight-copy">
                <em>{heroAlbum.label}</em>
                <strong>{heroAlbum.title}</strong>
                <p>{heroAlbum.description}</p>
              </div>
            </div>

            <Link to={`/detail/${heroAlbum.id}`} className="chronicles-album-hero__cta">
              앨범 상세 보기
            </Link>
          </div>

          <div className="chronicles-album-hero__board">
            <div className="chronicles-album-hero__board-header">
              <span>FEATURED BOARD</span>
              <p>Featured Album</p>
            </div>

            <div className="chronicles-album-hero__stack">
              {heroStack.map((album, index) => (
                <article key={`${album.title}-hero-${index}`} className="chronicles-album-hero__stack-card">
                  <div className="chronicles-album-hero__stack-image">
                    <img src={album.image} alt={album.title} />
                  </div>
                  <div className="chronicles-album-hero__stack-copy">
                    <span>{album.year}</span>
                    <strong>{album.title}</strong>
                    <p>{album.subtitle}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="chronicles-album-hero__meta">
              <div>
                <span>FORMAT</span>
                <strong>{heroAlbum.format}</strong>
              </div>
              <div>
                <span>YEAR</span>
                <strong>{heroAlbum.year}</strong>
              </div>
              <div>
                <span>FOCUS</span>
                <strong>{heroAlbum.label}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="chronicles-album-library">
          <div className="chronicles-album-library__heading">
            <h2>COLLECTED ERAS</h2>
            <span>ALBUM CARDS</span>
          </div>

          <div className="chronicles-album-grid">
            {initialAlbums.map((album, index) => (
              <Link
                key={`${album.title}-${index}`}
                to={`/detail/${album.id}`}
                className={`chronicles-album-card chronicles-album-card--tone-${(index % 4) + 1}`}
              >
                <div className="chronicles-album-card__image">
                  <img src={album.image} alt={album.title} />
                </div>
                <div className="chronicles-album-card__copy">
                  <span>{album.label}</span>
                  <h3>{album.title}</h3>
                  <p>{album.description}</p>
                  <em>
                    {album.subtitle} · {album.year}
                  </em>
                </div>
              </Link>
            ))}
          </div>

          {showMore ? (
            <div className="chronicles-album-grid chronicles-album-grid--expanded">
              {extraAlbums.map((album, index) => (
                <Link
                  key={`${album.title}-extra-${index}`}
                  to={`/detail/${album.id}`}
                  className={`chronicles-album-card chronicles-album-card--reveal chronicles-album-card--tone-${((index + 1) % 4) + 1}`}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="chronicles-album-card__image">
                    <img src={album.image} alt={album.title} />
                  </div>
                  <div className="chronicles-album-card__copy">
                    <span>{album.label}</span>
                    <h3>{album.title}</h3>
                    <p>{album.description}</p>
                    <em>
                      {album.subtitle} · {album.year}
                    </em>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          {!showMore ? (
            <button
              type="button"
              className="chronicles-album-library__more"
              onClick={() => setShowMore(true)}
            >
              MORE ALBUMS
            </button>
          ) : null}
        </section>
      </main>
    </div>
  );
}
