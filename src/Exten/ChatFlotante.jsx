import React, { useState, useEffect, useRef } from 'react';

function ChatFlotante({ autoOpen }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Para la animación del mensaje:
  const fullMessage = "Hola, ¿quieres ayuda?";
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

  useEffect(() => {
    if (open) {
      // Cuando abres el chat, reseteamos animación
      setDisplayedText("");
      setTyping(true);
      setOffset(0);
    }
  }, [open]);

  useEffect(() => {
    if (open) return; // Solo mostrar animación cuando chat está cerrado

    // Primera fase: mostrar "..." escribiendo por 2s aprox
    const typingTimeout = setTimeout(() => {
      setTyping(false);
      setDisplayedText("");
      setOffset(0);
    }, 2000);

    return () => clearTimeout(typingTimeout);
  }, [open]);

  // Animación para mostrar texto letra a letra + correr a la izquierda (limitado)
  useEffect(() => {
    if (open || typing) return;

    let index = 0;
    const maxOffset = 5; // máximo desplazamiento a la izquierda

    const interval = setInterval(() => {
      index++;
      if (index > fullMessage.length) {
        clearInterval(interval);
        return;
      }

      setDisplayedText(fullMessage.slice(0, index));

      // Desplazamiento limitado para que no se corra mucho
      const newOffset = Math.max(-index * 3, -maxOffset);
      setOffset(newOffset);

    }, 150);

    return () => clearInterval(interval);
  }, [typing, open]);

  const toggleOpen = () => {
    setOpen(!open);
    if (sent) {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
        {/* Mensaje burbuja solo si el chat está cerrado */}
        {!open && (
          <div
            className="bg-gray-800 text-gray-200 rounded-lg shadow-lg select-none overflow-hidden cursor-pointer"
            onClick={toggleOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') toggleOpen(); }}
            aria-label="Abrir chat"
            style={{
              maxWidth: '240px',
              padding: '10px 16px',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {typing ? (
              <TypingDots />
            ) : (
              <span
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  left: offset,
                  whiteSpace: 'nowrap',
                  transition: 'left 0.1s linear',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  textAlign: 'center',
                }}
              >
                {displayedText}
              </span>
            )}
          </div>
        )}

        <button
          onClick={toggleOpen}
          aria-label={open ? "Cerrar chat" : "Abrir chat"}
          className="bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-full w-14 h-14 flex items-center justify-center shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-transparent"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <img
              src="../../public/icono.png"
              alt="Logo Empresa"
              className="h-20 w-20 object-contain -m-2"
            />
          )}
        </button>
      </div>

      {open && (
        <div
          className="my-10 fixed bottom-20 right-6 z-50 bg-gray-900 rounded-xl shadow-lg w-80 max-w-xs p-6 text-gray-300 flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-100">Contáctanos</h2>
          {sent ? (
            <div className="text-center text-green-400 font-semibold">¡Gracias por tu mensaje!</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Tu nombre"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded-md px-3 py-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 "
              />
              <input
                type="email"
                name="email"
                placeholder="Tu correo"
                value={form.email}
                onChange={handleChange}
                required
                className="rounded-md px-3 py-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <textarea
                name="message"
                placeholder="Escribe tu mensaje"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="rounded-md px-3 py-2 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 rounded-md py-2 font-semibold transition"
              >
                {sending ? "Enviando..." : "Enviar"}
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}

// Componente para los puntos "escribiendo..."
function TypingDots() {
  return (
    <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#ffffff' }}>
      <span className="typing-dot">.</span>
      <span className="typing-dot" style={{ animationDelay: '0.2s' }}>.</span>
      <span className="typing-dot" style={{ animationDelay: '0.4s' }}>.</span>

      <style jsx>{`
        .typing-dot {
          animation-name: typing;
          animation-duration: 1.4s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          opacity: 0.2;
          margin-left: 2px;
          display: inline-block;
        }
        @keyframes typing {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </span>
  );
}

export default ChatFlotante;
