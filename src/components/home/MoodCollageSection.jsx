import React from 'react';

import { images } from '../../assets/media';
import '../../styles/home/mood-collage.scss';

export default function MoodCollageSection() {
  return (
    <section className="home-mood-collage" aria-label="Mood collage composition">
      <div className="home-mood-collage__header">
        <h5>VISUAL MANIFESTO // ERA_002</h5>
      </div>

      <div className="home-mood-collage__stage">
        <div className="home-mood-collage__feeling" aria-hidden="true">
          FEELING
        </div>

        <figure className="home-mood-collage__signal">
          <img
              src={images.sheeshHero}
              alt="Live Recording Environment"
            />
          <figcaption>VISUAL_PATH</figcaption>
        </figure>

        <figure className="home-mood-collage__environment">
          <div className="home-mood-collage__environment-frame">
            <img
            src={images.batterupHero}
            alt="Signal Path Component"
          />
            <span>LIVE SPOTLIGHT</span>
          </div>
        </figure>

        <div className="home-mood-collage__artifact" aria-hidden="true">
          ARTIFACT
        </div>
      </div>

      <div className="home-mood-collage__footer">
        <span className="home-mood-collage__footer-line" />
        <span className="home-mood-collage__footer-text">BABYMONSTER // VISUAL ERA FILES</span>
        <span className="home-mood-collage__footer-line" />
      </div>
    </section>
  );
}
