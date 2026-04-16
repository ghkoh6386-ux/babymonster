import React from 'react';

import Icon from '../Icon';
import './SideNav.scss';

const items = [
  { label: 'HOME', icon: 'home', active: true },
  { label: 'EXPLORE', icon: 'explore' },
  { label: 'LIBRARY', icon: 'library_music' },
  { label: 'SETTINGS', icon: 'settings' },
];

export default function SideNav() {
  return (
    <aside className="site-side-nav">
      <div className="site-side-nav__identity">
        <div className="site-side-nav__role">CURATOR</div>
        <div className="site-side-nav__sub-role">MASTERING</div>
      </div>

      <nav className="site-side-nav__nav" aria-label="Section">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className={
              item.active ? 'site-side-nav__item site-side-nav__item--active' : 'site-side-nav__item'
            }
            aria-current={item.active ? 'page' : undefined}
          >
            <Icon name={item.icon} className="site-side-nav__icon" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
