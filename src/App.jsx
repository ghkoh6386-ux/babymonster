import React, { useEffect, useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import DiscoverPage from './pages/DiscoverPage';
import EditorialChroniclesPage from './pages/EditorialChroniclesPage';
import FooterShowcasePage from './pages/FooterShowcasePage';
import HomePage from './pages/HomePage';
import MusicDetailPage from './pages/MusicDetailPage';
import SearchIntroPage from './pages/SearchIntroPage';
import SidebarCollectionPage from './pages/SidebarCollectionPage';

function getPageTitle(pathname) {
  if (pathname === '/') return 'Home';
  if (pathname.startsWith('/browse')) return 'Browse';
  if (pathname.startsWith('/library')) return 'Archive';
  if (pathname.startsWith('/search')) return 'Intro';
  if (pathname.startsWith('/favorites')) return 'Favorites';
  if (pathname.startsWith('/visual-cuts')) return 'Visual Cuts';
  if (pathname.startsWith('/detail')) return 'Detail';
  if (pathname.startsWith('/footer')) return 'Footer';
  return 'Home';
}

function RouteTitleSync() {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    document.title = `BABYMONSTER - ${pageTitle}`;
  }, [location.pathname]);

  return null;
}

function RouteScrollReset() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const layoutContent = document.querySelector('.main-layout__content');

    if (layoutContent instanceof HTMLElement) {
      layoutContent.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteTitleSync />
      <RouteScrollReset />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="browse" element={<DiscoverPage />} />
          <Route path="library" element={<EditorialChroniclesPage />} />
          <Route path="search" element={<SearchIntroPage />} />
          <Route
            path="favorites"
            element={
              <SidebarCollectionPage
                title="FAVORITES"
                description="좋아하는 무드와 장면을 따로 모아두는 공간으로 이어질 즐겨찾기 패널입니다."
              />
            }
          />
          <Route
            path="visual-cuts"
            element={
              <SidebarCollectionPage
                title="VISUAL CUTS"
                description="이미지와 비주얼 중심으로 따로 큐레이션될 사이드 컬렉션 공간입니다."
              />
            }
          />
          <Route path="detail/:id" element={<MusicDetailPage />} />
          <Route path="footer" element={<FooterShowcasePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
