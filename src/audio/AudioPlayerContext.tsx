import React, { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';
import { AUDIO_PLAYLIST } from '../data/audioTracks';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  currentTrackTitle: string | null;
  hasTracks: boolean;
  toggle: () => void;
  next: () => void;
  toggleMute: () => void;
}

const AudioPlayerContext = createContext<AudioContextType | undefined>(undefined);

const MUTE_STORAGE_KEY = 'dvt_audio_muted';

export const AudioPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const hasTracks = AUDIO_PLAYLIST.length > 0;
  const currentTrack = hasTracks ? AUDIO_PLAYLIST[trackIndex % AUDIO_PLAYLIST.length] : null;

  // Create the <audio> element once and keep it alive for the life of the
  // app (mounted at the App root) so playback survives page navigation
  // within this single-page app.
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const handleEnded = () => {
      setTrackIndex((i) => (hasTracks ? (i + 1) % AUDIO_PLAYLIST.length : i));
    };
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the element's muted state in sync + persist the preference.
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
    } catch {
      // ignore
    }
  }, [isMuted]);

  // When the track index changes (either the user skipped, or one track
  // finished and we auto-advanced), load the new source. If playback was
  // already underway, keep it going with the next track — this is what
  // makes the playlist "dynamic" rather than a single looping file.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    const wasPlaying = isPlaying;
    audio.src = currentTrack.src;
    if (wasPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    // First play: the element has no src until now, since we never
    // autoplay. Set it up on this user-initiated interaction.
    if (!audio.src) {
      audio.src = currentTrack.src;
    }
    audio.play().catch(() => setIsPlaying(false));
  };

  const next = () => {
    if (!hasTracks) return;
    setTrackIndex((i) => (i + 1) % AUDIO_PLAYLIST.length);
  };

  const toggleMute = () => setIsMuted((m) => !m);

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        isMuted,
        currentTrackTitle: currentTrack?.title ?? null,
        hasTracks,
        toggle,
        next,
        toggleMute,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export function useAudioPlayer(): AudioContextType {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return ctx;
}
