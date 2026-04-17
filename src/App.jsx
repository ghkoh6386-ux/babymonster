import React, { useEffect, useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import DiscoverPage from './pages/DiscoverPage';
import EditorialChroniclesPage from './pages/EditorialChroniclesPage';
import FooterShowcasePage from './pages/FooterShowcasePage';
import HomePage from './pages/HomePage';
import MusicDetailPage from './pages/MusicDetailPage';
import SearchIntroPage from './pages/SearchIntroPage';

function getPageTitle(pathname) {
  if (pathname === '/') return 'Home';
  if (pathname.startsWith('/browse')) return 'Browse';
  if (pathname.startsWith('/library')) return 'Archive';
  if (pathname.startsWith('/search')) return 'Intro';
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
          <Route path="favorites" element={<Navigate to="/" replace />} />
          <Route path="visual-cuts" element={<Navigate to="/" replace />} />
          <Route path="detail/:id" element={<MusicDetailPage />} />
          <Route path="footer" element={<FooterShowcasePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
