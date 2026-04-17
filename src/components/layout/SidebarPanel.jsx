import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '../Icon';
import {
  closeCollectionPanel,
  selectActiveCollectionPanel,
  selectPlaylistPanelOpen,
  setCollectionPanel,
  togglePlaylistPanel,
} from '../../features/feature/featureSlice';

const sidebarItems = [
  { label: 'PLAYLISTS', panel: 'playlists', icon: 'queue_music', tone: 'track' },
  { label: 'FAVORITES', panel: 'favorites', icon: 'favorite', tone: 'save' },
  { label: 'VISUAL CUTS', panel: 'visual-cuts', icon: 'photo_library', tone: 'visual' },
];

export default function SidebarPanel({ isMobileOpen = false, onCloseMobile }) {
  const dispatch = useDispatch();
  const isPlaylistPanelOpen = useSelector(selectPlaylistPanelOpen);
  const activeCollectionPanel = useSelector(selectActiveCollectionPanel);

  const handleToggleCollection = (panel) => {
    if (panel === 'playlists') {
      if (activeCollectionPanel) {
        dispatch(closeCollectionPanel());
      }

      dispatch(togglePlaylistPanel());
      onCloseMobile?.();
      return;
    }

    if (isPlaylistPanelOpen) {
      dispatch(togglePlaylistPanel());
    }

    if (activeCollectionPanel === panel) {
      dispatch(closeCollectionPanel());
      onCloseMobile?.();
      return;
    }

    dispatch(setCollectionPanel(panel));
    onCloseMobile?.();
  };

  return (
    <aside className={`app-sidebar${isMobileOpen ? ' app-sidebar--mobile-open' : ''}`}>
      <button
        type="button"
        className="app-sidebar__backdrop"
        aria-label="사이드 메뉴 닫기"
        onClick={() => onCloseMobile?.()}
      />

      <div className="app-sidebar__inner">
        <button
          type="button"
          className="app-sidebar__close"
          aria-label="사이드 메뉴 닫기"
          onClick={() => onCloseMobile?.()}
        >
          <Icon name="close" className="app-sidebar__close-icon" />
        </button>

        <div className="app-sidebar__group">
          <div className="app-sidebar__identity">
            <div className="app-sidebar__role">MONSTIEZ</div>
            <div className="app-sidebar__sub-role">SELECTION</div>
          </div>

          <nav className="app-sidebar__nav" aria-label="Sidebar menu">
            {sidebarItems.map((item) => {
              const isActive =
                item.panel === 'playlists'
                  ? isPlaylistPanelOpen
                  : activeCollectionPanel === item.panel;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleToggleCollection(item.panel)}
                  className={
                    isActive
                      ? `app-sidebar__item app-sidebar__item--active app-sidebar__item--${item.tone}`
                      : `app-sidebar__item app-sidebar__item--${item.tone}`
                  }
                >
                  <span className="app-sidebar__icon-wrap" aria-hidden="true">
                    <Icon name={item.icon} className="app-sidebar__icon" filled={item.tone === 'save'} />
                  </span>
                  <span className="app-sidebar__copy">
                    <span className="app-sidebar__label">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="app-sidebar__footer" aria-hidden="true">
          <span className="app-sidebar__footer-line" />
          <span className="app-sidebar__footer-text">BABYMONSTER ARCHIVE</span>
        </div>
      </div>
    </aside>
  );
}
