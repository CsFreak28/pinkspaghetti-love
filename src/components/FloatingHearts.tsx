import React from "react";

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ count = 12 }) => {
  const hearts = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 10,
      size: 14 + Math.random() * 18,
      emoji: i % 5 === 0 ? "🍝" : "💕",
      isSpaghetti: i % 5 === 0,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: "-20px",
            fontSize: `${h.size}px`,
            animation: `${h.isSpaghetti ? "float-spaghetti" : "float-heart"} ${h.duration}s linear ${h.delay}s infinite`,
            opacity: 0,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
