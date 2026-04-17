import { createSlice } from '@reduxjs/toolkit';
import featureCards from '../../data/featureCards';
import videoLibrary from '../../data/videoLibrary';

const initialState = {
  cards: featureCards,
  currentCardId: null,
  isPlaying: false,
  playlistIds: [],
  isPlaylistPanelOpen: false,
  activeCollectionPanel: null,
  favoriteMusicIds: [],
  favoriteVideoIds: [],
  isNowPlayingOpen: false,
  repeatMode: 'sequence',
  playerVolume: 0.66,
  playbackTime: 0,
  playbackDuration: 0,
  seekTarget: null,
};

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    setCurrentFeatureCardId(state, action) {
      state.currentCardId = action.payload;
    },
    setPlayerPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    addPlaylistCard(state, action) {
      state.playlistIds.push(action.payload);
    },
    insertPlaylistCardNext(state, action) {
      const { id, afterId } = action.payload;
      const existingIndex = state.playlistIds.findIndex((item) => item === id);

      if (existingIndex >= 0) {
        state.playlistIds.splice(existingIndex, 1);
      }

      const afterIndex = state.playlistIds.findIndex((item) => item === afterId);

      if (afterIndex >= 0) {
        state.playlistIds.splice(afterIndex + 1, 0, id);
        return;
      }

      state.playlistIds.unshift(id);
    },
    removePlaylistCardAtIndex(state, action) {
      state.playlistIds.splice(action.payload, 1);
    },
    clearPlaylist(state) {
      state.playlistIds = [];
    },
    setPlaylistPanelOpen(state, action) {
      state.isPlaylistPanelOpen = action.payload;
    },
    togglePlaylistPanel(state) {
      state.isPlaylistPanelOpen = !state.isPlaylistPanelOpen;
    },
    toggleFavoriteMusicId(state, action) {
      const id = action.payload;
      const existingIndex = state.favoriteMusicIds.findIndex((item) => item === id);

      if (existingIndex >= 0) {
        state.favoriteMusicIds.splice(existingIndex, 1);
        return;
      }

      state.favoriteMusicIds.push(id);
    },
    toggleFavoriteVideoId(state, action) {
      const id = action.payload;
      const existingIndex = state.favoriteVideoIds.findIndex((item) => item === id);

      if (existingIndex >= 0) {
        state.favoriteVideoIds.splice(existingIndex, 1);
        return;
      }

      state.favoriteVideoIds.push(id);
    },
    setCollectionPanel(state, action) {
      state.activeCollectionPanel = action.payload;
    },
    closeCollectionPanel(state) {
      state.activeCollectionPanel = null;
    },
    setNowPlayingOpen(state, action) {
      state.isNowPlayingOpen = action.payload;
    },
    toggleNowPlaying(state) {
      state.isNowPlayingOpen = !state.isNowPlayingOpen;
    },
    cycleRepeatMode(state) {
      if (state.repeatMode === 'sequence') {
        state.repeatMode = 'playlist';
        return;
      }

      if (state.repeatMode === 'playlist') {
        state.repeatMode = 'track';
        return;
      }

      state.repeatMode = 'sequence';
    },
    setPlayerVolume(state, action) {
      state.playerVolume = action.payload;
    },
    setPlaybackTime(state, action) {
      state.playbackTime = action.payload;
    },
    setPlaybackDuration(state, action) {
      state.playbackDuration = action.payload;
    },
    seekPlayerTo(state, action) {
      state.seekTarget = action.payload;
    },
    clearSeekTarget(state) {
      state.seekTarget = null;
    },
  },
});

export const selectFeatureState = (state) => state.feature;

export const selectFeatureCards = (state) => selectFeatureState(state).cards;
export const selectCurrentFeatureCardId = (state) => selectFeatureState(state).currentCardId;
export const selectPlayerPlaying = (state) => selectFeatureState(state).isPlaying;
export const selectPlaylistIds = (state) => selectFeatureState(state).playlistIds;
export const selectPlaylistPanelOpen = (state) => selectFeatureState(state).isPlaylistPanelOpen;
export const selectActiveCollectionPanel = (state) => selectFeatureState(state).activeCollectionPanel;
export const selectFavoriteMusicIds = (state) => selectFeatureState(state).favoriteMusicIds;
export const selectFavoriteVideoIds = (state) => selectFeatureState(state).favoriteVideoIds;
export const selectNowPlayingOpen = (state) => selectFeatureState(state).isNowPlayingOpen;
export const selectRepeatMode = (state) => selectFeatureState(state).repeatMode;
export const selectPlayerVolume = (state) => selectFeatureState(state).playerVolume;
export const selectPlaybackTime = (state) => selectFeatureState(state).playbackTime;
export const selectPlaybackDuration = (state) => selectFeatureState(state).playbackDuration;
export const selectSeekTarget = (state) => selectFeatureState(state).seekTarget;

export const selectPrimaryFeatureCard = (state) =>
  selectFeatureCards(state).find((card) => card.type === 'primary') ?? null;

export const selectSecondaryFeatureCards = (state) =>
  selectFeatureCards(state).filter((card) => card.type === 'secondary');

export const selectFeatureCardById = (id) => (state) =>
  selectFeatureCards(state).find((card) => String(card.id) === String(id)) ?? null;

export const selectCurrentFeatureCard = (state) => {
  const currentId = selectCurrentFeatureCardId(state);
  return selectFeatureCards(state).find((card) => String(card.id) === String(currentId)) ?? null;
};

export const selectPlaylistCards = (state) => {
  const cards = selectFeatureCards(state);
  return selectPlaylistIds(state)
    .map((id) => cards.find((card) => String(card.id) === String(id)) ?? null)
    .filter(Boolean);
};

export const selectFavoriteMusicCards = (state) => {
  const cards = selectFeatureCards(state);
  return selectFavoriteMusicIds(state)
    .map((id) => cards.find((card) => String(card.id) === String(id)) ?? null)
    .filter(Boolean);
};

export const selectFavoriteVideoCards = (state) =>
  selectFavoriteVideoIds(state)
    .map((id) => videoLibrary.find((video) => String(video.id) === String(id)) ?? null)
    .filter(Boolean);

export const {
  setCurrentFeatureCardId,
  setPlayerPlaying,
  addPlaylistCard,
  insertPlaylistCardNext,
  removePlaylistCardAtIndex,
  clearPlaylist,
  setPlaylistPanelOpen,
  togglePlaylistPanel,
  toggleFavoriteMusicId,
  toggleFavoriteVideoId,
  setCollectionPanel,
  closeCollectionPanel,
  setNowPlayingOpen,
  toggleNowPlaying,
  cycleRepeatMode,
  setPlayerVolume,
  setPlaybackTime,
  setPlaybackDuration,
  seekPlayerTo,
  clearSeekTarget,
} = featureSlice.actions;

export default featureSlice.reducer;
