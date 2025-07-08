import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonios = [
  {
    nombre: "Lucía Martínez",
    cargo: "Desarrolladora Full Stack",
    empresa: "TechNow",
    opinion: "Gracias a EMPLOYRH conseguí mi primer trabajo IT en 3 meses. Su acompañamiento fue clave.",
    foto: "https://randomuser.me/api/portraits/women/68.jpg",
    calificacion: 5
  },
  {
    nombre: "Carlos Gómez",
    cargo: "CEO",
    empresa: "StartX",
    opinion: "La automatización que implementaron nos ahorra más de 10 horas por semana. ¡Excelente trabajo!",
    foto: "https://randomuser.me/api/portraits/men/52.jpg",
    calificacion: 4
  },
  {
    nombre: "Ana Torres",
    cargo: "Reclutadora IT",
    empresa: "DigitalWave",
    opinion: "El proceso fue transparente y rápido. Recomiendo 100%.",
    foto: "https://randomuser.me/api/portraits/women/44.jpg",
    calificacion: 5
  },
  {
    nombre: "Martín Pérez",
    cargo: "Junior Developer",
    empresa: "CodeLab",
    opinion: "Me ayudaron a preparar entrevistas técnicas y soft skills. Muy agradecido.",
    foto: "https://randomuser.me/api/portraits/men/35.jpg",
    calificacion: 4
  },
  {
    nombre: "Sofía Ramírez",
    cargo: "Analista de Datos",
    empresa: "DataPulse",
    opinion: "La formación fue muy práctica y me permitió crecer profesionalmente en poco tiempo.",
    foto: "https://randomuser.me/api/portraits/women/21.jpg",
    calificacion: 5
  },
  {
    nombre: "Javier López",
    cargo: "Ingeniero de Software",
    empresa: "CodeFactory",
    opinion: "El soporte fue excelente y el contenido muy actualizado. Lo recomiendo sin duda.",
    foto: "https://randomuser.me/api/portraits/men/23.jpg",
    calificacion: 4
  },
  {
    nombre: "María Fernanda Cruz",
    cargo: "Especialista UX/UI",
    empresa: "Creative Minds",
    opinion: "Aprendí nuevas herramientas que me ayudaron a mejorar la experiencia de usuario en mis proyectos.",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
    calificacion: 5
  },
  {
    nombre: "Diego Fernández",
    cargo: "DevOps Engineer",
    empresa: "CloudNet",
    opinion: "Gracias a este programa optimicé los procesos de integración continua en mi empresa.",
    foto: "https://randomuser.me/api/portraits/men/45.jpg",
    calificacion: 4
  }
];



export default function Testimonios() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % testimonios.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "tween", ease: "linear", duration: 0.8 } },
    exit: { x: "-100%", opacity: 0, transition: { type: "tween", ease: "linear", duration: 0.8 } }
  };

  const current = testimonios[slideIndex];

  return (
    <section id="testimonios" className="py-20 text-gray-300 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400 drop-shadow">⭐ Opiniones Reales</h2>
      <div
        className="max-w-3xl mx-auto px-4 relative"
        style={{ minHeight: "320px", position: "relative" }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current.nombre}
            className="bg-gradient-to-br from-gray-900/60 to-black/80 backdrop-blur-md p-6 rounded-xl shadow-xl absolute top-0 left-0 w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center mb-4 gap-4">
              <img
                src={current.foto}
                alt={current.nombre}
                className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
              />
              <div>
                <h4 className="font-bold text-lg text-white">{current.nombre}</h4>
                <p className="text-sm text-gray-400">
                  {current.cargo} en {current.empresa}
                </p>
              </div>
            </div>
            <p className="text-gray-300 italic mb-3">“{current.opinion}”</p>
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, idx) => {
                const isActive = idx < current.calificacion;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.8 }}
                    transition={{
                      delay: 2 + idx * 0.2, // Espera 5 segundos antes de iniciar la animación
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <FaStar className={`${isActive ? "text-yellow-400" : "text-gray-600"}`} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
