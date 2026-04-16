import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'HOME', to: '/', end: true },
  { label: 'BROWSE', to: '/browse' },
  { label: 'ARCHIVE', to: '/library' },
  { label: 'INTRO', to: '/search' },
];

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  let currentLabel = 'HOME';

  if (pathname === '/') currentLabel = 'HOME';
  else if (pathname.startsWith('/browse')) currentLabel = 'BROWSE';
  else if (pathname.startsWith('/search')) currentLabel = 'INTRO';
  else if (pathname.startsWith('/library')) currentLabel = 'ARCHIVE';
  else if (pathname.startsWith('/detail')) currentLabel = 'DETAIL';
  else if (pathname.startsWith('/playing')) currentLabel = 'PLAYER';

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__cluster">
          <NavLink to="/" end className="app-header__logo" aria-label="BABYMONSTER home">
            BABYMONSTER
          </NavLink>

          <nav className="app-header__nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? 'app-header__link app-header__link--active' : 'app-header__link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="app-header__utilities" aria-label="Utility">
          
        </div>
      </div>
    </header>
  );
}
