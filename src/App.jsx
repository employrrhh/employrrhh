import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import './App.css'
import Particles from './Exten/Particles';
import RotatingText from './Exten/RotatingText'
import { GiWheat } from "react-icons/gi";
import Testimonios from './Exten/Testimonios';
import ChatFlotante from './Exten/ChatFlotante';
import Estadisticas from './Exten/Estadisticas';
import ProfileCard from './Exten/ProfileCard';
function App() {

  const [showInitialModal, setShowInitialModal] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialModal(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const toggleChat = () => {
    setChatOpen(prev => !prev);
  };

  return (
    <>
    {showInitialModal ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-50">
          <div className="text-gray-400 text-9xl animate-pulse select-none drop-shadow-lg">
            <img src="../public/icono.png" className='h-48 w-96 object-contain grayscale' alt="Logo" />
          </div>
        </div>
      ) : (
        <>
      {/* Fondo con partículas */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <Particles
          particleColors={['#00FFFF', '#B0C4DE', '#7B68EE', '#E0FFFF']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={800}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      {/* Contenido principal */}
      <div className="relative z-10">
        <div className="navbar fixed top-0 left-0 w-full z-50 bg-base-100 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">EMPLOYRH</a>
          </div>

          {/* Botón hamburguesa (solo en móvil) */}
          <div className="md:hidden">
            <button
              className="btn btn-ghost text-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
          {/* Menú en pantallas grandes */}
          <div className="hidden md:flex">
            <ul className="menu menu-horizontal px-1 font-semibold text-gray-400">
              {/* ... enlaces ... */}
              <li><a href="#about">Quiénes somos</a></li>
              <li><a href="#how">Cómo lo hacemos</a></li>
              <li><a href="#mission">Nuestra misión</a></li>
              <li><a href="#services">Servicios</a></li>
              <li><a href="#contact"
                    onClick={(e) => {
                      e.preventDefault(); // Previene el salto automático
                      toggleChat();
                    }}
                  >Contacto</a></li>
            </ul>
          </div>
        </div>
        {isMenuOpen && (
            <div className="md:hidden fixed top-15 right-0 w-40 bg-base-100 shadow-md z-50">
              <ul className="menu menu-vertical p-4 text-gray-400 space-y-2 text-left font-semibold">
                <li><a href="#about" onClick={() => setIsMenuOpen(false)}>Quiénes somos</a></li>
                <li><a href="#how" onClick={() => setIsMenuOpen(false)}>Cómo lo hacemos</a></li>
                <li><a href="#mission" onClick={() => setIsMenuOpen(false)}>Nuestra misión</a></li>
                <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Servicios</a></li>
                <li><a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleChat();
                      setIsMenuOpen(false);
                    }}
                  >
                    Contacto
                  </a></li>
              </ul>
            </div>
        )}
        <div className="hero min-h-screen">
          <div className="hero-content">
            <div className="flex flex-row-reverse gap-11 max-w-6xl items-center">
              <div className="text-9xl select-none animate-bounce text-gray-400 drop-shadow-lg">
              <img src="../public/icono.png" className='hidden md:block h-48 w-96 object-contain' alt="Logo" />
            </div>
            <motion.div
              initial={{opacity: 0, scale: 0}}
              whileInView={{opacity:1, scale: 1}}
              transition={{duration:2}}
              className="max-w-xl text-gray-300">
                <h3 className="text-2xl sm:text-3xl font-bold leading-snug mb-6 drop-shadow-md flex flex-wrap items-center gap-2">
                  <span>Consultora en</span>
                  <span>
                    <RotatingText
                      texts={['RR-HH', 'AUTOMATIZACIÓN', 'TALENTO', 'TRANSFORMACIÓN', 'APRENDIZAJE', 'DIGITALIZACIÓN']}
                      mainClassName="text-2xl sm:text-3xl px-3 bg-cyan-300 text-black py-1 rounded-lg inline-block"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={2000}
                    />
                  </span>
                </h3>
                <p className="text-xl mb-8 leading-relaxed text-gray-400">
                    Impulsamos pymes y profesionales con automatización de procesos e incorporación estratégica de talento para maximizar eficiencia y visibilidad profesional.
                </p>
                <a
                  href="#contact"
                  className="btn btn-primary shadow-md hover:shadow-gray-600 transition transform hover:-translate-y-1 bg-gray-700 border-gray-700 hover:bg-gray-800 text-gray-100"
                onClick={(e) => {
                      e.preventDefault(); // Previene el salto automático
                      toggleChat();
                    }}>
                  ¡Hablemos!
                </a>
            </motion.div>
            </div>
          </div>
        </div>
        <div className="hero min-h-screen" id="about">
          <div className="hero-content text-center">
            <div className="flex flex-row-reverse gap-11 max-w-6xl items-center">
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                className="relative py-24 px-6 max-w-6xl mx-auto text-gray-300"
              >
                {/* Fondo decorativo animado */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-black/80 z-0 pointer-events-none blur-sm" />

                <h2 className="relative z-10 text-5xl font-bold text-center mb-16 text-cyan-400 drop-shadow-md tracking-tight">
                  ¿Quiénes somos?
                </h2>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-14 md:gap-20 px-4">
                  {/* Icono animado con efecto */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <GiWheat className="text-cyan-400 drop-shadow-lg w-32 h-32 hover:scale-110 transform transition duration-500" />
                  </motion.div>

                  {/* Texto con efecto fade */}
                  <motion.div
                    variants={fadeInUp}
                    className="text-lg text-gray-300 space-y-6 max-w-3xl leading-relaxed"
                  >
                    <p>
                      Somos una consultora especializada en <span className="text-cyan-400 font-medium">Recursos Humanos y formación</span>, dedicada a ayudar a pymes a digitalizar sus procesos y a personas a reconvertirse laboralmente.
                    </p>
                    <p>
                      Acompañamos tanto a personas como a empresas en sus procesos de transformación, facilitando la <span className="text-cyan-300 font-medium">digitalización, automatización</span> y la selección de talento.
                    </p>
                    <p>
                      Impulsamos también a personas que quieren aprender programación desde cero, brindándoles <span className="text-cyan-400 font-medium">orientación, motivación</span> y recursos para potenciar su crecimiento profesional.
                    </p>
                  </motion.div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
        <div className="hero min-h-screen" id="how">
          <div className="hero-content text-center">
            <div className="flex flex-row-reverse gap-11 max-w-6xl items-center">
              <section className="py-20 px-6 min-h-screen  rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-12 text-gray-400 drop-shadow-sm">
                  🚀 ¿Cómo lo hacemos?
                </h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 text-gray-300 text-lg leading-relaxed">
                  <ul className="space-y-2 text-left">
                    <li className="relative pl-6 before:content-['🚀'] before:absolute before:left-0 before:top-0">
                      Automatización con Excel, Google Sheets, Airtable y herramientas no-code.
                    </li>
                    <li className="relative pl-6 before:content-['🛠️'] before:absolute before:left-0 before:top-0">
                      Implementación de herramientas de gestión como Trello, Notion y Asana.
                    </li>
                    <li className="relative pl-6 before:content-['📈'] before:absolute before:left-0 before:top-0">
                      Optimización de procesos de RRHH: selección, onboarding y comunicación interna.
                    </li>
                    <li className="relative pl-6 before:content-['🌎'] before:absolute before:left-0 before:top-0">
                      Reclutamiento especializado para LATAM, alineado a la cultura organizacional.
                    </li>
                    <li className="relative pl-6 before:content-['📊'] before:absolute before:left-0 before:top-0">
                      Manejo avanzado de Google Sheets, Excel y Power BI.
                    </li>
                    <li className="relative pl-6 before:content-['🔁'] before:absolute before:left-0 before:top-0">
                      Automatización de procesos con N8N.
                    </li>
                    <li className="relative pl-6 before:content-['🤖'] before:absolute before:left-0 before:top-0">
                      Aplicación práctica de inteligencia artificial en entornos laborales.
                    </li>
                  </ul>
                  <div className=' flex justify-center items-center'>
                    <ProfileCard />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Estadisticas/>
        <div className="hero min-h-screen" id="mission">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <section
                className="relative py-24 px-8 max-w-4xl mx-auto my-24 overflow-hidden
                  rounded-3xl shadow-2xl border border-gray-700 text-center text-gray-300 transition-transform duration-700 hover:scale-[1.03]"
              >
                {/* Fondo desenfocado detrás */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-black/80 z-0 blur-sm pointer-events-none"></div>

                {/* Contenido sobre el fondo */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                    className="mb-6 flex justify-center"
                  >
                    <span className="text-7xl drop-shadow-md text-green-400 animate-bounce">🌱</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl font-extrabold mb-6 text-cyan-400 drop-shadow-md"
                  >
                    Misión
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="text-lg leading-relaxed max-w-2xl mx-auto text-gray-300"
                  >
                    Ayudamos a empresas y personas a crecer con herramientas concretas y un enfoque humano,
                    promoviendo la automatización, gestión estratégica del talento y el aprendizaje continuo
                    para afrontar los desafíos del mundo laboral.
                  </motion.p>
                </div>
              </section>
            </div>
          </div>
        </div>
        <section
          id="services"
          className="py-20 px-6 min-h-screen text-gray-300"
        >
          <h2 className="text-4xl font-bold text-center mb-14 text-gray-400 drop-shadow-sm">
            ¿Qué ofrecemos?
          </h2>

          <motion.div
            initial={{ opacity: 0, translateY: "100%" }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 2 }}
            className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto"
          >
            {[
              {
                title: "Automatización de PYMEs",
                description:
                  "Organizamos y optimizamos tareas con Excel, Notion, Trello, Airtable y herramientas no-code para agilizar procesos y mejorar la gestión.",
                icon: "⚙️",
              },
              {
                title: "Reclutamiento especializado",
                description:
                  "Seleccionamos talento alineado a tus valores y necesidades, con foco en el mercado LATAM.",
                icon: "🔍",
              },
              {
                title: "Formación en programación",
                description:
                  "Acompañamos a personas desde cero para reconvertirse y abrir nuevas oportunidades laborales.",
                icon: "💻",
              },
            ].map(({ title, description, icon }, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 30px rgba(0,255,255,0.2)"
                }}
                transition={{ type: "spring", stiffness: 180 }}
                className="relative overflow-hidden rounded-3xl p-8 border border-gray-700 shadow-2xl cursor-pointer"
              >
                {/* Fondo degradado con blur estilo 'mission' */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-black/80 z-0 blur-sm pointer-events-none"></div>
              
                {/* Contenido visible */}
                <div className="relative z-10 flex flex-col h-full text-center">
                  <div className="text-6xl mb-6 text-cyan-400 animate-pulse">{icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-cyan-300 drop-shadow-sm">{title}</h3>
                  <p className="text-gray-300">{description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        <Testimonios/>
        <ChatFlotante autoOpen={chatOpen} />
        {/* footer*/}
        <footer className="footer sm:footer-horizontal w-full bg-base-100 text-neutral-content items-center p-4">
          <aside className="grid-flow-col items-center">
            EMPLOYRH
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </nav>
        </footer>
      </div>
       </>
      )}
    </>
  )
}

export default App
