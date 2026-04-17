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

export default function SidebarPanel() {
  const dispatch = useDispatch();
  const isPlaylistPanelOpen = useSelector(selectPlaylistPanelOpen);
  const activeCollectionPanel = useSelector(selectActiveCollectionPanel);

  const handleToggleCollection = (panel) => {
    if (panel === 'playlists') {
      if (activeCollectionPanel) {
        dispatch(closeCollectionPanel());
      }

      dispatch(togglePlaylistPanel());
      return;
    }

    if (isPlaylistPanelOpen) {
      dispatch(togglePlaylistPanel());
    }

    if (activeCollectionPanel === panel) {
      dispatch(closeCollectionPanel());
      return;
    }

    dispatch(setCollectionPanel(panel));
  };

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__inner">
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
