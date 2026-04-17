import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="home-footer" id="footer">
      <div className="home-footer__divider" />

      <div className="home-footer__content">
        <div className="home-footer__left">
          <p className="home-footer__copy">
            BABYMONSTER의 무대와 비주얼을 모은 아카이브.
          </p>

          <nav className="home-footer__nav" aria-label="Footer navigation">
            <Link to="/browse">VIDEO</Link>
            <Link to="/library">MUSIC</Link>
            <Link to="/search">INTRO</Link>
          </nav>
        </div>

        <div className="home-footer__right">
          <h2 className="home-footer__brand">BABYMONSTER</h2>
          <p className="home-footer__legal">
            © 2024 BABYMONSTER ARCHIVE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
