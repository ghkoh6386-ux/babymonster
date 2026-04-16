import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header';
import PlayerBar from '../components/layout/PlayerBar';
import SidebarPanel from '../components/layout/SidebarPanel';
import NowPlayingPage from '../pages/NowPlayingPage';
import SidebarCollectionPage from '../pages/SidebarCollectionPage';
import {
  selectNowPlayingOpen,
  selectPlaylistPanelOpen,
  setNowPlayingOpen,
  setPlaylistPanelOpen,
} from '../features/feature/featureSlice';

export default function MainLayout() {
  const dispatch = useDispatch();
  const isPlaylistPanelOpen = useSelector(selectPlaylistPanelOpen);
  const isNowPlayingOpen = useSelector(selectNowPlayingOpen);
  const [shouldRenderPlaylistPanel, setShouldRenderPlaylistPanel] = useState(isPlaylistPanelOpen);
  const [isPlaylistPanelClosing, setIsPlaylistPanelClosing] = useState(false);
  const [shouldRenderNowPlaying, setShouldRenderNowPlaying] = useState(isNowPlayingOpen);
  const [isNowPlayingClosing, setIsNowPlayingClosing] = useState(false);

  useEffect(() => {
    if (isPlaylistPanelOpen) {
      setShouldRenderPlaylistPanel(true);
      setIsPlaylistPanelClosing(false);
      return undefined;
    }

    if (!shouldRenderPlaylistPanel) {
      return undefined;
    }

    setIsPlaylistPanelClosing(true);
    const timeoutId = window.setTimeout(() => {
      setShouldRenderPlaylistPanel(false);
      setIsPlaylistPanelClosing(false);
    }, 320);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isPlaylistPanelOpen, shouldRenderPlaylistPanel]);

  useEffect(() => {
    if (isNowPlayingOpen) {
      setShouldRenderNowPlaying(true);
      setIsNowPlayingClosing(false);
      return undefined;
    }

    if (!shouldRenderNowPlaying) {
      return undefined;
    }

    setIsNowPlayingClosing(true);
    const timeoutId = window.setTimeout(() => {
      setShouldRenderNowPlaying(false);
      setIsNowPlayingClosing(false);
    }, 320);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isNowPlayingOpen, shouldRenderNowPlaying]);

  useEffect(() => {
    if (!isNowPlayingOpen) {
      document.body.style.overflow = '';
      const layoutContent = document.querySelector('.main-layout__content');

      if (layoutContent instanceof HTMLElement) {
        layoutContent.style.overflow = '';
      }

      return undefined;
    }

    document.body.style.overflow = 'hidden';
    const layoutContent = document.querySelector('.main-layout__content');

    if (layoutContent instanceof HTMLElement) {
      layoutContent.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';

      if (layoutContent instanceof HTMLElement) {
        layoutContent.style.overflow = '';
      }
    };
  }, [isNowPlayingOpen]);

  return (
    <div className="main-layout">
      <Header />
      <SidebarPanel />
      <main className="main-layout__content">
        <div className="main-layout__canvas">
          <Outlet />
        </div>
      </main>
      <PlayerBar />
      {shouldRenderPlaylistPanel ? (
        <SidebarCollectionPage
          kind="playlists"
          title="PLAYLISTS"
          description="트랙 아카이브에서 추가한 곡이 여기 쌓이고, 이 순서대로 자동 재생됩니다."
          overlay
          closing={isPlaylistPanelClosing}
          onClose={() => dispatch(setPlaylistPanelOpen(false))}
        />
      ) : null}
      {shouldRenderNowPlaying ? (
        <NowPlayingPage
          overlay
          closing={isNowPlayingClosing}
          onClose={() => dispatch(setNowPlayingOpen(false))}
        />
      ) : null}
    </div>
  );
}
