import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../components/Icon';
import featureCards from '../data/featureCards';

export default function EditorialChroniclesPage() {
  const featuredItem = featureCards[0];
  const smallCardItem = featureCards[1];
  const gridCardOne = featureCards[2];
  const gridCardTwo = featureCards[3];

  if (!featuredItem || !smallCardItem || !gridCardOne || !gridCardTwo) {
    return null;
  }

  return (
    <div className="chronicles-page">
      <main className="chronicles-main">
        <section className="chronicles-hero">
          <div className="chronicles-feature">
            <div className="chronicles-feature__image">
              <img src={featuredItem.image} alt={featuredItem.title} />
            </div>

            <div className="chronicles-feature__card">
              <span>최근 저장</span>
              <h2>{featuredItem.title.toUpperCase()}</h2>
              <p>
                저장한 메인 파일과 주요 장면을 모아둔 공간.
              </p>

              <Link
                to={`/detail/${featuredItem.id}`}
                className="chronicles-feature__link"
              >
                저장 파일 보기
                <Icon name="arrow_right_alt" className="size-sm" />
              </Link>
            </div>
          </div>
        </section>

        <section className="chronicles-spread">
          <Link
            to={`/detail/${smallCardItem.id}`}
            className="chronicles-small-card"
          >
            <div className="chronicles-small-card__image">
              <img src={smallCardItem.image} alt={smallCardItem.title} />
              <span>{smallCardItem.category}</span>
            </div>

            <h3>{smallCardItem.title.toUpperCase()}</h3>
            <p>다시 보기 좋은 퍼포먼스 파일.</p>
            <em>{smallCardItem.collection}</em>
          </Link>

          <div className="chronicles-grid-cards">
            <Link to={`/detail/${gridCardOne.id}`}>
              <strong>01</strong>
              <div className="chronicles-grid-cards__image">
                <img src={gridCardOne.image} alt={gridCardOne.title} />
              </div>
              <span>{gridCardOne.category}</span>
              <h4>{gridCardOne.title.toUpperCase()}</h4>
              <p>멤버 무드와 비주얼 포인트 정리.</p>
            </Link>

            <Link to={`/detail/${gridCardTwo.id}`}>
              <strong>02</strong>
              <div className="chronicles-grid-cards__image">
                <img src={gridCardTwo.image} alt={gridCardTwo.title} />
              </div>
              <span>{gridCardTwo.category}</span>
              <h4>{gridCardTwo.title.toUpperCase()}</h4>
              <p>저장해두기 좋은 시기별 하이라이트.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
