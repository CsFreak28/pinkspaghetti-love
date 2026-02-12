import React from "react";

const CelebrationHearts: React.FC = () => {
  const hearts = React.useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 30;
      const distance = 100 + Math.random() * 200;
      return {
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance - 150,
        rot: Math.random() * 360,
        delay: Math.random() * 0.5,
        emoji: ["💖", "💕", "❤️", "💗", "🩷", "✨"][i % 6],
        size: 16 + Math.random() * 20,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            fontSize: `${h.size}px`,
            "--tx": `${h.tx}px`,
            "--ty": `${h.ty}px`,
            "--rot": `${h.rot}deg`,
            animation: `celebration-heart 1.5s ease-out ${h.delay}s forwards`,
          } as React.CSSProperties}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

export default CelebrationHearts;
