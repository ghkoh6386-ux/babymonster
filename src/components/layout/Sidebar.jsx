import React from 'react';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { label: '재생리스트', to: '/playlists', emoji: '🎵' },
  { label: '찜리스트', to: '/favorites', emoji: '💘' },
  { label: '비주얼 컷', to: '/visual-cuts', emoji: '📸' },
];

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__inner">
        <div className="app-sidebar__group">
          <div className="app-sidebar__identity">
            <div className="app-sidebar__role">MY</div>
            <div className="app-sidebar__sub-role">COLLECTION</div>
          </div>

          <nav className="app-sidebar__nav" aria-label="사이드바 메뉴">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end
                className={({ isActive }) =>
                  isActive ? 'app-sidebar__item app-sidebar__item--active' : 'app-sidebar__item'
                }
              >
                <span className="app-sidebar__emoji" aria-hidden="true">
                  {item.emoji}
                </span>
                <span className="app-sidebar__label">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
