import { useState, useRef, useEffect } from "react";
import christmasMusic from "../../assets/christmas-is-christmas-loop.mp3";

export default function ChristmasMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={christmasMusic} type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          top: "20px",
          left: "10px",
          padding: "12px 20px",
          fontSize: "24px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "2px solid #d4af37",
          borderRadius: "50px",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? "🔇" : "🎵"}
      </button>
    </>
  );
}
