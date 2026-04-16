import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { images } from '../../assets/media';
import {
  selectFeatureCards,
  selectPrimaryFeatureCard,
  selectSecondaryFeatureCards,
} from '../../features/feature/featureSlice';
import '../../styles/home/feature-cards.scss';

export default function FeatureCardsSection() {
  const cards = useSelector(selectFeatureCards);
  const primaryCard = useSelector(selectPrimaryFeatureCard);
  const secondaryCards = useSelector(selectSecondaryFeatureCards);

  const findCard = (id) =>
    cards.find((card) => card.id === id) ??
    secondaryCards.find((card) => card.id === id) ??
    primaryCard;

  const stackTopCard = findCard('sheesh');
  const stackBottomCard = findCard('drip');
  const wideCard = findCard('forever');

  const cardImages = {
    primary: images.batterup,
    stackTop: images.sheesh,
    stackBottom: images.drip,
    wide: images.forever,
  };

  if (!primaryCard || !stackTopCard || !stackBottomCard || !wideCard) {
    return null;
  }

  return (
    <section className="home-feature-cards" aria-label="Featured BABYMONSTER releases and spotlight cards">
      <div className="home-feature-cards__glow" aria-hidden="true" />

      <div className="home-feature-cards__stage">
        <Link
          to={`/detail/${primaryCard.id}`}
          className="home-feature-cards__card home-feature-cards__card--primary"
        >
          <div className="home-feature-cards__media home-feature-cards__media--primary">
            <img src={cardImages.primary} alt={primaryCard.title} />
          </div>

          <div className="home-feature-cards__primary-head">
            <span className="home-feature-cards__label">STAGE_SPOTLIGHT</span>
            <span className="home-feature-cards__symbol material-symbols-outlined" aria-hidden="true">
              auto_awesome
            </span>
          </div>

          <div className="home-feature-cards__primary-body">
            <span className="home-feature-cards__kicker">
              {primaryCard.kicker ?? 'TITLE TRACK'}
            </span>
            <h3 className="home-feature-cards__title">{primaryCard.title}</h3>
            <p className="home-feature-cards__subtitle">{primaryCard.subtitle}</p>

            <div className="home-feature-cards__specs">
              <span className="home-feature-cards__time">{primaryCard.duration ?? '04:42'}</span>
              <span className="home-feature-cards__rule" />
              <span className="home-feature-cards__format">
                {primaryCard.format ?? '44.1kHz / 24bit'}
              </span>
            </div>
          </div>
        </Link>

        <Link
          to={`/detail/${stackTopCard.id}`}
          className="home-feature-cards__card home-feature-cards__card--stack-top"
        >
          <div className="home-feature-cards__media home-feature-cards__media--full">
            <img src={cardImages.stackTop} alt={stackTopCard.title} />
          </div>

          <div className="home-feature-cards__overlay-copy">
            <h4>{stackTopCard.title}</h4>
            <p className="home-feature-cards__overlay-category">{stackTopCard.subtitle}</p>
          </div>
        </Link>

        <Link
          to={`/detail/${stackBottomCard.id}`}
          className="home-feature-cards__card home-feature-cards__card--stack-bottom"
        >
          <div className="home-feature-cards__media home-feature-cards__media--full">
            <img src={cardImages.stackBottom} alt={stackBottomCard.title} />
          </div>

          <span
            className="home-feature-cards__stack-icon material-symbols-outlined"
            aria-hidden="true"
          >
            equalizer
          </span>

          <h4>{stackBottomCard.title}</h4>
          <p className="home-feature-cards__stack-copy">{stackBottomCard.subtitle}</p>
        </Link>

        <Link
          to={`/detail/${wideCard.id}`}
          className="home-feature-cards__card home-feature-cards__card--wide"
        >
          <div className="home-feature-cards__wide-image">
            <img src={cardImages.wide} alt={wideCard.title} />
          </div>

          <div className="home-feature-cards__wide-copy">
            <span className="home-feature-cards__wide-index">
              {wideCard.indexLabel ?? '04'}
            </span>
            <div>
              <h4>{wideCard.title}</h4>
              <p className="home-feature-cards__wide-subtitle">{wideCard.subtitle}</p>
            </div>
          </div>

          <span className="home-feature-cards__wide-icon material-symbols-outlined" aria-hidden="true">
            play_circle
          </span>
        </Link>
      </div>
    </section>
  );
}
