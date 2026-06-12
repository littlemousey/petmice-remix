import { useEffect, useState } from "react";
import "./hearts.css";

interface Heart {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Hearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: 5 + Math.random() * 88,
      left: 3 + Math.random() * 90,
      size: 24 + Math.floor(Math.random() * 3) * 8,
      duration: 3 + Math.random() * 3,
      delay: -(Math.random() * 6),
      opacity: 0.35 + Math.random() * 0.45,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="hearts-container">
      {hearts.map((heart) => (
        <img
          key={heart.id}
          src={`${import.meta.env.BASE_URL}img/pixel-heart.png`}
          alt=""
          className="heart"
          style={{
            top: `${heart.top}%`,
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        />
      ))}
    </div>
  );
}
