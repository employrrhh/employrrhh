import React, { useEffect, useState, useRef } from "react";

function ProfileCard() {
  const icons = [
    { name: "Excel", src: "/google-sheets-logo-main-icon.png", color: "#1D6F42" },
    { name: "From", src: "/pngwing.com(1).png", color: "#9B59B6" },
    { name: "Trello", src: "/pngwing.com(2).png", color: "#00B8D9" },
    { name: "n8n", src: "/n8n-color.png", color: "#FC562D" },
    { name: "Power BI", src: "/pngwing.com.png", color: "#F4C300" },
    { name: "IA", src: "/zhipu-color.png", color: "#5C33F6" },
    { name: "Notion", src: "/notion.png", color: "#000000" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [phase, setPhase] = useState("fadeIn"); // fadeIn, jump, fadeOut, change

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (phase === "fadeIn") {
      setOpacity(0);
      timeoutRef.current = setTimeout(() => setOpacity(1), 50);
      timeoutRef.current = setTimeout(() => setPhase("jump"), 1500);
    } else if (phase === "jump") {
      timeoutRef.current = setTimeout(() => setPhase("fadeOut"), 3600);
    } else if (phase === "fadeOut") {
      setOpacity(1);
      timeoutRef.current = setTimeout(() => setOpacity(0), 50);
      timeoutRef.current = setTimeout(() => setPhase("change"), 1050);
    } else if (phase === "change") {
      setActiveIndex((i) => (i + 1) % icons.length);
      setPhase("fadeIn");
    }
    return () => clearTimeout(timeoutRef.current);
  }, [phase]);

  const activeIcon = icons[activeIndex];

  return (
    <div className="center-container">
      <div
        className={`icon-wrapper ${phase === "jump" ? "jumpVertical" : ""}`}
        style={{
          "--glow-color": activeIcon.color,
          opacity,
          transition: "opacity 1s ease",
        }}
      >
        <img
          src={activeIcon.src}
          alt={activeIcon.name}
          onError={() => console.error(`Error cargando: ${activeIcon.src}`)}
        />
        {/* Sombra debajo de la imagen */}
        {phase === "jump" && <div className="shadow-glow" />}
      </div>

      <style>{`
        .center-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        .icon-wrapper {
          position: relative;
          width: 150px;
          height: 150px;
          display: flex;
          justify-content: center;
          align-items: center;
          filter: drop-shadow(0 0 5px var(--glow-color));
          will-change: transform, filter;
        }

        .icon-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          z-index: 2;
          position: relative;
        }

        /* Sombra debajo */
        .shadow-glow {
          position: absolute;
          top: 200px; /* distancia al suelo */
          left: 50%;
          transform: translateX(-50%) scaleX(1) scaleY(1);
          width: 180px;
          height: 20px;
          background: radial-gradient(
            ellipse at center,
            var(--glow-color) 0%,
            transparent 80%
          );
          filter: blur(8px);
          opacity: 0.6;
          animation: shadowVerticalJump 1.2s ease forwards;
          animation-iteration-count: 3;
          z-index: 1;
          pointer-events: none;
          user-select: none;
        }

        /* Animación salto vertical */
        @keyframes jumpVerticalAnim {
          0%, 100% {
            transform: translateY(0);
            filter: drop-shadow(0 0 5px var(--glow-color));
            opacity: 1;
          }
          25% {
            transform: translateY(-40px);
            filter: drop-shadow(0 0 15px var(--glow-color));
            opacity: 1;
          }
          50% {
            transform: translateY(0);
            filter: drop-shadow(0 0 5px var(--glow-color));
            opacity: 1;
          }
          75% {
            transform: translateY(-20px);
            filter: drop-shadow(0 0 10px var(--glow-color));
            opacity: 1;
          }
        }

        .jumpVertical {
          animation: jumpVerticalAnim 1.2s ease forwards;
          animation-iteration-count: 3;
        }

        /* Animación sombra sincronizada */
        @keyframes shadowVerticalJump {
          0%, 100% {
            transform: translateX(-50%) scaleX(1) scaleY(1);
            opacity: 0.6;
          }
          25% {
            transform: translateX(-50%) scaleX(1.4) scaleY(0.6);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) scaleX(1) scaleY(1);
            opacity: 0.6;
          }
          75% {
            transform: translateX(-50%) scaleX(1.2) scaleY(0.8);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

export default ProfileCard;
