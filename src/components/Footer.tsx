import React from 'react';
import { Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-black py-12 md:py-16 px-5 md:px-12 lg:px-[120px] w-full border-t border-white/10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8 text-center md:text-left"
      >
        
        {/* Logo & Name */}
        <div className="flex flex-col gap-6 items-center md:items-start">
          <div className="flex items-center gap-3">
            <img src="https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fba3434ef91f2f59351fb8.png" alt="Producer Ujay Logo" className="h-10" />
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-white font-medium mb-1 md:mb-2">Contact</h4>
          <a href="mailto:tteam@producerujay.com" className="text-white/72 hover:text-white transition-colors duration-300 text-sm">
            tteam@producerujay.com
          </a>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-white font-medium mb-1 md:mb-2">Navigation</h4>
          <a href="#hero" onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white/72 hover:text-white transition-colors duration-300 text-sm">Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white/72 hover:text-white transition-colors duration-300 text-sm">About Me</a>
          <a href="#connect" onClick={(e) => { e.preventDefault(); document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-white/72 hover:text-white transition-colors duration-300 text-sm">Connect</a>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-white font-medium mb-1 md:mb-2">Follow Us</h4>
          <div className="flex gap-5">
            <a href="#" className="text-white/72 hover:text-white transition-colors duration-300" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/72 hover:text-white transition-colors duration-300" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/72 hover:text-white transition-colors duration-300" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/72 hover:text-white transition-colors duration-300" aria-label="Discord">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

      </motion.div>

      {/* Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="max-w-[1440px] mx-auto mt-12 md:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-xs text-white/72 text-center"
      >
        <p>© 2026 Producer Ujay. All rights reserved.</p>
        <div className="flex gap-6 justify-center">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </motion.div>
    </footer>
  );
}
