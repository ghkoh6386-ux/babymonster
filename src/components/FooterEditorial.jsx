import React from 'react';

import Icon from './Icon';

export default function FooterEditorial() {
  return (
    <footer className="footer-editorial">
      <div className="footer-editorial__line" />

      <div className="footer-editorial__top">
        <div className="footer-editorial__copy">
          <p className="footer-editorial__quote">
            A performance-driven archive where stage energy, visuals, and presence stay in motion.
          </p>
          <nav>
            <a href="#footer">Archive Note</a>
            <a href="#footer">Legal</a>
            <a href="#footer">Stage Specs</a>
            <a href="#footer">Contact</a>
          </nav>
        </div>

        <div className="footer-editorial__brand">
          <h2>BABYMONSTER</h2>
          <p>&copy; 2024 BABYMONSTER PERFORMANCE ARCHIVE. ALL RIGHTS RESERVED.</p>
        </div>
      </div>

      <div className="footer-editorial__grid">
        <article className="footer-editorial__card footer-editorial__card--text">
          <span>Current Spotlight</span>
          <strong>Stage Energy Locked</strong>
        </article>

        <article className="footer-editorial__card footer-editorial__card--image">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhnGw_PKECCDHNqLMgr5zZG_IoSukLZ1_ZwbcPKM6dO4FbWhWoUbNtGEbMtJ1jX6HU4J40al2y_Vpj8QQIVRwGi1pqVArJnwR1JhNBfeDkmrNF7MesBJ_6x3_9zzEW0AP6hCW0ZV4acROWPbj0jJpUT1XY31o30yhEh0PCC9NtNSLZTrYzMOUvzsUCZKVT_EJ_ljy1pVp0d6ANfDSeRJeYSPjWufM0lQCnrOKfN0UerOSVtrlAOYy9Np_6Tk4eEs4vjrOYbl1JjBK-"
            alt="The Archive"
          />
          <span>The Archive</span>
        </article>

        <article className="footer-editorial__card footer-editorial__card--icon">
          <Icon name="theater_comedy" className="size-lg" />
          <p>The Spotlight Never Drops</p>
        </article>
      </div>
    </footer>
  );
}
