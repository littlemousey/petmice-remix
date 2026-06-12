import { useEffect, useState } from "react";
import "./clouds.css";

interface Cloud {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  direction: "right" | "left";
  opacity: number;
}

export default function Clouds() {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const generated: Cloud[] = Array.from({ length: 12 }, (_, i) => {
      const width = 80 + Math.random() * 170;
      return {
        id: i,
        top: 3 + Math.random() * 52,
        left: Math.random() * 88,
        width,
        height: Math.round(width * 0.38),
        duration: 18 + Math.random() * 24,
        delay: -(Math.random() * 40),
        direction: Math.random() > 0.5 ? "right" : "left",
        opacity: 0.75 + Math.random() * 0.25,
      };
    });
    setClouds(generated);
  }, []);

  return (
    <div className="clouds-container">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`cloud cloud-${cloud.direction}`}
          style={{
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
            opacity: cloud.opacity,
          }}
        />
      ))}
    </div>
  );
}
