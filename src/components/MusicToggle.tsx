import React, { useState, useRef } from "react";

const MusicToggle: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2022/02/23/audio_ea70ad08e0.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
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
