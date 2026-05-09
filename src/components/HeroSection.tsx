import React from 'react';
import { motion } from 'motion/react';
import Typewriter from './Typewriter';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <div id="hero" className="relative h-[100dvh] bg-[#050505] text-white font-sans overflow-hidden flex flex-col p-3 md:p-6 lg:p-8">
      {/* Ambient Glow / Light Leaks */}
      <div className="absolute top-[-10%] left-1/4 w-1/2 h-[50vh] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-1/4 w-1/2 h-[50vh] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Background Video Frame Start */}
      <motion.div 
        initial={{ opacity: 0, borderRadius: "32px", scale: 0.93 }}
        animate={{ opacity: 1, borderRadius: "20px", scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative w-full flex-1 overflow-hidden rounded-[20px] md:rounded-[24px] shadow-[0_0_80px_rgba(255,255,255,0.07)] border border-white/10 z-10"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fb65cca6982c165580982b.mp4" type="video/mp4" />
        </video>

        {/* Gradient transition to black at the bottom */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 from-10% via-black/40 via-50% to-transparent pointer-events-none"></div>

        {/* Main Content Area */}
        <main className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
            className="w-full px-3 flex flex-col md:flex-row justify-center gap-0 md:gap-[clamp(0.5rem,2vw,30px)] items-center md:items-baseline mix-blend-difference"
          >
            <span className="font-playfair text-[clamp(2.8rem,15vw,5rem)] md:text-[clamp(2.5rem,8vw,113.92px)] font-semibold uppercase text-white tracking-[0.08em] md:tracking-widest whitespace-nowrap leading-none">
              Producer
            </span>
            <span className="font-playfair text-[clamp(2.8rem,15vw,5rem)] md:text-[clamp(2.5rem,8vw,113.92px)] font-semibold uppercase text-white tracking-[0.08em] md:tracking-widest whitespace-nowrap leading-none">
              Ujay
            </span>
          </motion.div>
        </main>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-[60] cursor-pointer pointer-events-auto"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <ChevronDown className="w-8 h-8 text-white/50 -mb-4 drop-shadow-md" />
            <ChevronDown className="w-8 h-8 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Background Video Frame End */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-b from-transparent via-black/85 to-black" />
    </div>
  );
}
