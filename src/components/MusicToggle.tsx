import React, { useState, useRef, useEffect } from "react";
import mysong from "../thirdaudio.mp3";

const MusicToggle: React.FC = () => {
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(mysong);
    audio.loop = true;
    audio.volume = 0.3;

    audioRef.current = audio;

    // Try autoplay
    audio.play().catch(() => {
      // Autoplay blocked
      setPlaying(false);
    });
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-valentine-soft shadow-lg flex items-center justify-center text-xl transition-all duration-300 hover:scale-110"
      aria-label="Toggle music"
    >
      {playing ? "🎵" : "🔇"}
    </button>
  );
};

export default MusicToggle;
