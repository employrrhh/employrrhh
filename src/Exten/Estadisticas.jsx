import React, { useEffect, useState } from "react";

function AnimatedNumber({ value, duration = 2000, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let startTime = null;
    setFinished(false);

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      const current = Math.floor(progressRatio * value);
      setDisplayValue(current);

      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        setFinished(true); // Animación terminada
      }
    }

    requestAnimationFrame(step);

    return () => setFinished(true);
  }, [value, duration]);

  return (
    <span
      className={`inline-block transition-colors duration-500 ${
        finished ? "text-cyan-700 neon-glow" : "text-cyan-400"
      }`}
    >
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Estadisticas() {
  return (
    <section className="py-8 text-center text-gray-300">
      <h3 className="text-3xl font-bold mb-8 text-cyan-300">Impacto en números</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-2xl font-semibold">
        <div>
          <span className="block text-4xl">
            +<AnimatedNumber value={150} />
          </span>{" "}
          Profesionales insertados
        </div>
        <div>
          <span className="block text-4xl">
            +<AnimatedNumber value={40} />
          </span>{" "}
          PYMEs digitalizadas
        </div>
        <div>
          <span className="block text-4xl">
            <AnimatedNumber value={98} suffix="%" />
          </span>{" "}
          Satisfacción de clientes
        </div>
        <div>
          <span className="block text-4xl">
            <AnimatedNumber value={24} suffix="h" />
          </span>{" "}
          Tiempo medio de respuesta
        </div>
      </div>

      {/* Estilo para el resplandor neón */}
      <style jsx>{`
        .neon-glow {
          text-shadow:
            0 0 3px #0ff,
            0 0 6px #0ff,
            0 0 9px #0ff;
          color: #0b7285;
        }
      `}</style>
    </section>
  );
}
