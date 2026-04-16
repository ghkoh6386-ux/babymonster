import React from 'react';
import { Link } from 'react-router-dom';

import Icon from './Icon';

export default function PlayerFooter({
  id,
  artwork,
  title,
  subtitle,
  variant = 'discover',
}) {
  const detailLink = id ? `/detail/${id}` : '/browse';
  const displayTitle = title || '이름 없는 무대';
  const displaySubtitle = subtitle || 'BABYMONSTER 파일';
  const displayArtwork =
    artwork ||
    'https://via.placeholder.com/80x80?text=BABY';

  return (
    <footer className={`player-footer player-footer--${variant}`}>
      <Link to={detailLink} className="player-footer__meta">
        <div className="player-footer__thumb">
          <img src={displayArtwork} alt={displayTitle} />
        </div>
        <div>
          <p className="player-footer__title">{displayTitle}</p>
          <p className="player-footer__subtitle">{displaySubtitle}</p>
        </div>
      </Link>

      <div className="player-footer__center">
        <div className="player-footer__controls">
          <Link to="/browse" aria-label="둘러보기로 이동">
            <Icon name="skip_previous" className="size-md" />
          </Link>

          <Link to="/playing" aria-label="플레이어 열기" className="player-footer__play">
            <Icon name="play_arrow" className="size-xl" filled />
          </Link>

          <Link to={detailLink} aria-label="상세 열기">
            <Icon name="skip_next" className="size-md" />
          </Link>
        </div>

        <div className="player-footer__scrubber">
          <span className="player-footer__scrubber-progress" />
        </div>
      </div>

      <div className="player-footer__actions">
        <Link to="/library" className="player-footer__queue">
          <Icon name="queue_music" />
          <span>보관함</span>
        </Link>

        <div className="player-footer__volume">
          <Icon name="volume_up" className="size-sm" />
          <div className="player-footer__volume-track">
            <span className="player-footer__volume-progress" />
          </div>
        </div>
      </div>
    </footer>
  );
}
