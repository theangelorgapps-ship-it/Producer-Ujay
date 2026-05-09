import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, X } from 'lucide-react';

const advertiseVideoUrl = 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fead25a7b9e0385a1a1053.mp4';
const collabVideoUrl = 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69feaeeea3dd25aa2abc9256.mp4';
const modalInputClass = 'bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-950 placeholder:text-gray-400 focus:outline-none focus:border-[#0B2551] focus:ring-2 focus:ring-[#A4F4FD]/40 transition-shadow';
const modalLabelClass = 'text-sm font-semibold text-gray-700';
const modalHeadingClass = 'font-display text-[clamp(1.15rem,5vw,2rem)] italic font-normal leading-none text-black whitespace-nowrap';

function PopupVideo({ src, title }: { src: string; title: string }) {
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
      <video
        src={src}
        title={title}
        autoPlay
        muted={muted}
        loop
        playsInline
        className="aspect-video w-full bg-black object-cover"
      />
      <button
        type="button"
        onClick={() => setMuted((current) => !current)}
        aria-label={muted ? 'Turn video sound on' : 'Turn video sound off'}
        className="absolute bottom-3 right-3 md:bottom-4 md:right-4 inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/70 bg-black/55 text-white shadow-lg backdrop-blur transition hover:bg-black/75"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </div>
  );
}

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const [showAdvertiseForm, setShowAdvertiseForm] = useState(false);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const modalRoot = typeof document === 'undefined' ? null : document.body;
  
  return (
    <section id="connect" className="c3-section relative w-full overflow-hidden min-h-screen flex flex-col items-center py-8 md:py-[40px] px-4 md:px-[20px]">
      <style>{`
        .c3-section {
          background-color: #000;
          z-index: 10;
        }
        .c3-watermark-container {
          position: absolute;
          top: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          z-index: 0;
        }
        .c3-watermark-top {
          font-family: "Playfair Display", serif;
          font-size: 2.8rem;
          font-weight: 600;
          color: rgba(164, 244, 253, 1);
          top: -20px;
          margin-bottom: -110px;
          position: relative;
          text-transform: uppercase;
        }
        .c3-watermark-main {
          font-family: "Playfair Display", serif;
          font-size: 16rem;
          font-weight: 800;
          font-style: italic;
          line-height: 0.9;
          letter-spacing: -0.05em;
          background: linear-gradient(to right, #091020 0%, #0B2551 25%, #A4F4FD 65%, #00d2ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: url(#c3-noise);
        }
        .c3-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          width: 100%;
          margin-top: 60px;
          z-index: 10;
        }
        .c3-card {
          background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4));
          backdrop-filter: blur(14px) brightness(0.91);
          border: 1px solid #808080;
          border-radius: 28px;
          padding: 50px 24px;
          min-height: 580px;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .c3-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
          pointer-events: none;
          z-index: 0;
        }
        .c3-card:hover {
          background: rgba(15, 15, 15, 0.6);
          border-color: rgba(212, 175, 55, 0.7);
          transform: translateY(-12px) scale(1.01);
        }
        .c3-card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .c3-card-pro {
          background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.5));
        }
        .c3-tier-small {
          font-size: 1.1rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
        }
        .c3-tier-large {
          font-size: 2.8rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 12px;
        }
        .c3-desc {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.45);
          min-height: 3.2em;
          margin-bottom: 40px;
          line-height: 1.5;
        }
        .c3-list {
          list-style: none;
          padding: 0;
          margin: 0;
          margin-bottom: 40px;
        }
        .c3-list li {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 18px;
        }
        .c3-check-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .c3-btn {
          background: #fff;
          color: #000;
          padding: 10px 32px;
          border-radius: 100px;
          font-weight: 600;
          font-size: 0.88rem;
          margin-top: auto;
          align-self: center;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .c3-btn:hover {
          background: #f5f5f5;
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(255,255,255,0.2);
        }
        .c3-toggle-wrap {
          max-width: 1100px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 40px;
          z-index: 10;
        }
        .c3-toggle {
          width: 52px;
          height: 28px;
          background: #fff;
          border-radius: 100px;
          position: relative;
          cursor: pointer;
          transition: background 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .c3-toggle.yearly {
          background: rgba(255, 255, 255, 0.2);
        }
        .c3-toggle-knob {
          width: 20px;
          height: 20px;
          background: #000;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          left: 4px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .c3-toggle.yearly .c3-toggle-knob {
          transform: translateX(24px);
          background: #fff;
        }
        .c3-toggle-label {
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
        }
        @media (max-width: 1024px) {
          .c3-watermark-container {
            top: 100px;
          }
          .c3-watermark-top {
            font-size: 2rem;
            margin-bottom: -40px;
          }
          .c3-watermark-main {
            font-size: 10rem;
          }
          .c3-grid {
            grid-template-columns: repeat(2, 1fr);
            margin-top: 100px;
            gap: 20px;
          }
          .c3-card {
            min-height: 500px;
          }
        }
        @media (max-width: 768px) {
          .c3-watermark-container {
            top: 60px;
          }
          .c3-watermark-top {
            font-size: 1.5rem;
            margin-bottom: -20px;
          }
          .c3-watermark-main {
            font-size: 5rem;
          }
          .c3-grid {
            grid-template-columns: 1fr;
            margin-top: 56px;
            gap: 32px;
            max-width: 450px;
          }
          .c3-card {
            min-height: 0;
            border-radius: 22px;
          }
          .c3-card:hover {
            transform: none;
          }
          .c3-btn-gold-large {
            padding: 14px 32px;
            font-size: 1rem;
          }
        }
      `}</style>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" result="noise" />
          <feComponentTransfer in="noise" result="alphaNoise">
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in="SourceGraphic" in2="alphaNoise" operator="in" result="composite" />
          <feBlend in="composite" in2="SourceGraphic" mode="overlay" />
        </filter>
      </svg>

      <div className="c3-grid">
        {/* Card 1 */}
        <div className="c3-card relative overflow-hidden" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          {/* Gold circular background lines */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 70%)' }}>
            <div className="absolute top-[-30%] left-[10%] w-[80%] aspect-square rounded-full border border-[rgba(212,175,55,0.1)]"></div>
            <div className="absolute top-[-20%] left-[20%] w-[60%] aspect-square rounded-full border border-[rgba(212,175,55,0.15)]"></div>
            <div className="absolute top-[-10%] left-[30%] w-[40%] aspect-square rounded-full border border-[rgba(212,175,55,0.2)]"></div>
          </div>

          <div className="flex-1 w-full flex items-end justify-center px-4 md:px-6 pt-14 md:pt-16 pb-4 relative z-10 gap-2 md:gap-3 min-h-[280px] md:min-h-[340px]">
            {/* Pillar 1: LinkedIn */}
            <div className="flex flex-col items-center justify-end h-full w-full relative">
              <div className="absolute top-[-36px] bg-white rounded-md p-1.5 shadow-lg shadow-black/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </div>
              <div className="w-full bg-gradient-to-b from-[rgba(212,175,55,0.3)] to-transparent rounded-t-xl relative flex justify-center items-start pt-3 h-[30%] border-t border-l border-r border-[#d4af37]/40 backdrop-blur-sm">
                <span className="text-[0.65rem] md:text-xs text-white/90 font-semibold font-sans">152.1K</span>
              </div>
            </div>
            
            {/* Pillar 2: TikTok */}
            <div className="flex flex-col items-center justify-end h-full w-full relative">
              <div className="absolute top-[-36px] bg-black border border-white/20 rounded-md p-1.5 shadow-lg shadow-black/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </div>
              <div className="w-full bg-gradient-to-b from-[rgba(212,175,55,0.4)] to-transparent rounded-t-xl relative flex justify-center items-start pt-3 h-[75%] border-t border-l border-r border-[#d4af37]/50 backdrop-blur-sm">
                <span className="text-[0.65rem] md:text-xs text-white/90 font-semibold font-sans">4.12M+</span>
              </div>
            </div>

            {/* Pillar 3: Instagram */}
            <div className="flex flex-col items-center justify-end h-full w-full relative">
              <div className="absolute top-[-36px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-md p-1.5 shadow-lg shadow-black/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <div className="w-full bg-gradient-to-b from-[rgba(212,175,55,0.35)] to-transparent rounded-t-xl relative flex justify-center items-start pt-3 h-[60%] border-t border-l border-r border-[#d4af37]/40 backdrop-blur-sm">
                <span className="text-[0.65rem] md:text-xs text-white/90 font-semibold font-sans">2.3M+</span>
              </div>
            </div>

            {/* Pillar 4: YouTube */}
            <div className="flex flex-col items-center justify-end h-full w-full relative">
              <div className="absolute top-[-36px] bg-red-600 rounded-md p-1.5 shadow-lg shadow-black/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </div>
              <div className="w-full bg-gradient-to-b from-[rgba(212,175,55,0.5)] to-transparent rounded-t-xl relative flex justify-center items-start pt-3 h-[90%] border-t border-l border-r border-[#d4af37]/60 backdrop-blur-sm">
                <span className="text-[0.65rem] md:text-xs text-white pb-3 font-bold font-sans">5.7M+</span>
              </div>
            </div>

            {/* Pillar 5: X */}
            <div className="flex flex-col items-center justify-end h-full w-full relative">
               <div className="absolute top-[-36px] bg-black border border-white/20 rounded-md p-1.5 shadow-lg shadow-black/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20L20 4"></path></svg>
              </div>
              <div className="w-full bg-gradient-to-b from-[rgba(212,175,55,0.25)] to-transparent rounded-t-xl relative flex justify-center items-start pt-3 h-[45%] border-t border-l border-r border-[#d4af37]/40 backdrop-blur-sm">
                <span className="text-[0.65rem] md:text-xs text-white/90 font-semibold font-sans">808K+</span>
              </div>
            </div>
          </div>

          <div className="px-5 md:px-8 pb-8 md:pb-10 pt-5 md:pt-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex-1 flex flex-col justify-end">
            <h3 className="text-[1.65rem] md:text-[32px] font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">8M+ Followers Gained Organically</h3>
            <p className="text-[#d8d8d8] text-sm md:text-base leading-relaxed max-w-[300px]">Across YouTube, Instagram, and more - powered by our organic growth engine.</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="c3-card relative overflow-hidden group" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div className="w-full aspect-[4/3] md:flex-1 md:aspect-auto flex flex-col justify-center p-0 relative z-10 m-0 overflow-hidden">
             <img src="https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fe8969e4086e455f864122.png" alt="Ticket" className="h-full w-full object-cover drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }} />
          </div>

          <div className="px-5 md:px-8 pb-8 md:pb-10 pt-5 md:pt-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex-1 flex flex-col justify-end items-start border-t border-transparent">
            <h3 className="text-[1.65rem] md:text-[32px] font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">Advertise with Producer Ujay</h3>
            <p className="text-[#d8d8d8] text-sm md:text-base leading-relaxed max-w-[300px] mb-6">From Cape Town to London - designed for experience, information, and connections.</p>
            <button onClick={() => setShowAdvertiseForm(true)} className="c3-btn-gold"><span>Advertise</span></button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="c3-card relative overflow-hidden group" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div className="w-full aspect-[4/3] md:flex-1 md:aspect-auto flex flex-col justify-center p-0 relative z-10 m-0 overflow-hidden">
             <img src="https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fe8df66ca44fd334adbd41.png" alt="Community" className="h-full w-full object-cover drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" style={{ transformStyle: 'preserve-3d' }} />
          </div>

          <div className="px-5 md:px-8 pb-8 md:pb-10 pt-5 md:pt-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex-1 flex flex-col justify-end items-start border-t border-transparent">
            <h3 className="text-[1.65rem] md:text-[32px] font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">Connect on the Community</h3>
            <p className="text-[#d8d8d8] text-sm md:text-base leading-relaxed max-w-[300px] mb-6">Join our exclusive network - designed for experience, information, and connections.</p>
            <a href="https://uuweua6rp4gx1nei2kim.app.clientclub.net/" target="_blank" rel="noopener noreferrer" className="c3-btn-gold"><span>Join Now</span></a>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16 z-10 relative flex justify-center pb-16 md:pb-20">
        <button onClick={() => setShowConnectForm(true)} className="c3-btn-gold-large shadow-[0_0_40px_rgba(212,175,55,0.4)]"><span>Collab With Producer Ujay</span></button>
      </div>

      {modalRoot && createPortal(
        <>
          {/* Advertise Popup */}
          <AnimatePresence>
            {showAdvertiseForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdvertiseForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9997]"
            />
            <motion.div
              initial={{ x: 100, y: "100%" }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: 100, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full z-[9998] bg-white text-gray-950 border-t border-[#A4F4FD]/50 rounded-t-[1.35rem] md:rounded-t-3xl max-h-[92vh] md:max-h-[90vh] overflow-y-auto shadow-[0_-24px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="max-w-2xl mx-auto p-4 sm:p-5 md:p-10">
                <div className="flex justify-between items-center gap-2 sm:gap-3 mb-5 md:mb-8">
                  <h3 className={modalHeadingClass}>Advertise with Producer Ujay</h3>
                  <button onClick={() => setShowAdvertiseForm(false)} aria-label="Close advertise form" className="shrink-0 p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-950 transition-colors">
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
                <div className="mb-6 md:mb-8">
                  <PopupVideo src={advertiseVideoUrl} title="Advertise with Producer Ujay video" />
                </div>
                <form className="flex flex-col gap-4 md:gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className={modalLabelClass}>First Name</label>
                      <input type="text" className={modalInputClass} placeholder="John" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className={modalLabelClass}>Last Name</label>
                      <input type="text" className={modalInputClass} placeholder="Doe" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={modalLabelClass}>Email Address</label>
                    <input type="email" className={modalInputClass} placeholder="john@company.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={modalLabelClass}>Company / Brand</label>
                    <input type="text" className={modalInputClass} placeholder="Your Brand Name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={modalLabelClass}>Message / Goals</label>
                    <textarea className={`${modalInputClass} min-h-[120px]`} placeholder="Tell us about your advertising goals..."></textarea>
                  </div>
                  <button type="button" onClick={(e) => { e.preventDefault(); setShowAdvertiseForm(false); }} className="c3-btn-gold mt-4 w-full md:w-auto self-end">
                    <span>Submit Request</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </>
            )}
          </AnimatePresence>

          {/* Connect / Collab Popup */}
          <AnimatePresence>
            {showConnectForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConnectForm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9997]"
            />
            <motion.div
              initial={{ x: 100, y: "100%" }}
              animate={{ x: 0, y: 0 }}
              exit={{ x: 100, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full z-[9998] bg-white text-gray-950 border-t border-[#A4F4FD]/50 rounded-t-[1.35rem] md:rounded-t-3xl max-h-[92vh] md:max-h-[90vh] overflow-y-auto shadow-[0_-24px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="max-w-2xl mx-auto p-4 sm:p-5 md:p-10">
                <div className="flex justify-between items-center gap-2 sm:gap-3 mb-5 md:mb-8">
                  <h3 className={modalHeadingClass}>Collab With Producer Ujay</h3>
                  <button onClick={() => setShowConnectForm(false)} aria-label="Close collab form" className="shrink-0 p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-950 transition-colors">
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
                <div className="mb-6 md:mb-8">
                  <PopupVideo src={collabVideoUrl} title="Collab with Producer Ujay video" />
                </div>
                <form className="flex flex-col gap-4 md:gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={modalLabelClass}>Name</label>
                    <input type="text" className={modalInputClass} placeholder="Your Name" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={modalLabelClass}>Email Address</label>
                    <input type="email" className={modalInputClass} placeholder="you@example.com" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={modalLabelClass}>Type of Collaboration</label>
                    <select className={`${modalInputClass} appearance-none`}>
                      <option value="content">Content Creation</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="event">Event / Speaking</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={modalLabelClass}>Collaboration Details</label>
                    <textarea className={`${modalInputClass} min-h-[120px]`} placeholder="Tell us how you want to collaborate..."></textarea>
                  </div>
                  <button type="button" onClick={(e) => { e.preventDefault(); setShowConnectForm(false); }} className="c3-btn-gold mt-4 w-full md:w-auto self-end">
                    <span>Send Proposal</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </>
            )}
          </AnimatePresence>
        </>,
        modalRoot
      )}
    </section>
  );
}
