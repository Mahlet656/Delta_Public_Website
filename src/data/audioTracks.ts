// src/data/audioTracks.ts
//
// Playlist for the site's background audio player (Header/NasheedPlayerButton).
//
// IMPORTANT — audio files are NOT included:
// Drop your own licensed Quran recitation / nasheed audio files (mp3) into
// `public/audio/` and list them below. A few sources commonly used by
// Islamic sites that explicitly permit free redistribution for da'wah
// purposes (double-check each source's current terms before publishing,
// since a commercial travel agency site may fall under different terms
// than personal/non-commercial use):
//   - https://everyayah.com          (Quran recitations, per-reciter)
//   - https://quran.com/api          (Quran.com's public API + audio CDN)
//   - your own commissioned/licensed nasheed recordings
//
// Each entry's `src` is a path under /public, e.g. '/audio/track-1.mp3'.
// The player auto-advances through this list and loops back to the start —
// add or remove entries and it adapts automatically.

export interface AudioTrack {
  id: string;
  title: string;
  src: string;
}

export const AUDIO_PLAYLIST: AudioTrack[] = [
  // { id: 'track-1', title: 'Recitation — Surah Al-Fatiha', src: '/audio/track-1.mp3' },
  // { id: 'track-2', title: 'Nasheed — Your Track Title', src: '/audio/track-2.mp3' },
];
