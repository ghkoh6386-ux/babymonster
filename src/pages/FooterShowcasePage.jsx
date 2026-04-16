import React from 'react';

import FooterEditorial from '../components/FooterEditorial';

export default function FooterShowcasePage() {
  return (
    <div className="footer-page">
      <main className="footer-page__stage">
        <div className="footer-page__vignette" />
        <div className="footer-page__title">THE STAGE IS DARK</div>
      </main>
      <FooterEditorial />
    </div>
  );
}
