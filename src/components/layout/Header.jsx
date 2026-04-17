import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import {
  closeCollectionPanel,
  setNowPlayingOpen,
  setPlaylistPanelOpen,
} from '../../features/feature/featureSlice';

const navItems = [
  { label: 'HOME', to: '/', end: true },
  { label: 'VIDEO', to: '/browse' },
  { label: 'MUSIC', to: '/library' },
  { label: 'INTRO', to: '/search' },
];

export default function Header({
  isMobileNavOpen = false,
  isMobileSidebarOpen = false,
  onToggleMobileNav,
  onToggleMobileSidebar,
  onCloseMobileMenus,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const handleClosePanels = () => {
    dispatch(setPlaylistPanelOpen(false));
    dispatch(closeCollectionPanel());
    dispatch(setNowPlayingOpen(false));
    onCloseMobileMenus?.();
  };

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__cluster">
          <button
            type="button"
            className={`app-header__mobile-toggle${isMobileSidebarOpen ? ' app-header__mobile-toggle--active' : ''}`}
            onClick={onToggleMobileSidebar}
            aria-label="컬렉션 메뉴 열기"
          >
            <span
              className={`app-header__mobile-glyph app-header__mobile-glyph--collection${isMobileSidebarOpen ? ' app-header__mobile-glyph--active' : ''}`}
              aria-hidden="true"
            />
            <span className="app-header__mobile-label">COLLECTION</span>
          </button>

          <NavLink
            to="/"
            end
            onClick={handleClosePanels}
            className="app-header__logo"
            aria-label="BABYMONSTER home"
          >
            BABYMONSTER
          </NavLink>

          <nav
            className={`app-header__nav${isMobileNavOpen ? ' app-header__nav--mobile-open' : ''}`}
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                onClick={handleClosePanels}
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
          <button
            type="button"
            className={`app-header__mobile-toggle app-header__mobile-toggle--nav${isMobileNavOpen ? ' app-header__mobile-toggle--active' : ''}`}
            onClick={onToggleMobileNav}
            aria-label="네비게이션 열기"
          >
            <span
              className={`app-header__mobile-glyph app-header__mobile-glyph--menu${isMobileNavOpen ? ' app-header__mobile-glyph--active' : ''}`}
              aria-hidden="true"
            />
            <span className="app-header__mobile-label">MENU</span>
          </button>
        </div>
      </div>
    </header>
  );
}
