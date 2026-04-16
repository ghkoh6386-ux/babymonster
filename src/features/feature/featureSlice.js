import { createSlice } from '@reduxjs/toolkit';
import featureCards from '../../data/featureCards';

const initialState = {
  cards: featureCards,
  currentCardId: null,
  isPlaying: false,
  playlistIds: [],
  isPlaylistPanelOpen: false,
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

export const {
  setCurrentFeatureCardId,
  setPlayerPlaying,
  addPlaylistCard,
  insertPlaylistCardNext,
  removePlaylistCardAtIndex,
  clearPlaylist,
  setPlaylistPanelOpen,
  togglePlaylistPanel,
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
