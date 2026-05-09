import React from 'react';
import { motion } from 'motion/react';
import { Player } from '@lottiefiles/react-lottie-player';
import Typewriter from './Typewriter';

export default function ImageSection() {
  return (
    <section id="services" className="w-full relative overflow-hidden flex flex-col justify-center bg-black">
      {/* Content Container */}
      <div className="relative z-10 w-full mx-auto px-5 md:px-12 lg:px-[120px] py-16 md:py-32 flex flex-col items-center text-center">
        
        {/* Content: Headline & Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl flex flex-col items-center"
        >
            <h2 className="text-[clamp(2rem,9vw,4.5rem)] font-light tracking-tight mb-6 md:mb-8 leading-[1.12] md:leading-[1.2] font-playfair bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent max-w-3xl mx-auto">
            <Typewriter text="Join ProducerUjay’s Exclusive Community " delay={0} speed={0.012} />
            <span className="font-dm-serif italic block mt-2 text-white/90">
              <Typewriter text="Digital Martyrs" delay={0.8} speed={0.012} />
            </span>
          </h2>
          
          <button 
            onClick={() => window.open('https://uuweua6rp4gx1nei2kim.app.clientclub.net/', '_blank')}
            className="c3-btn-gold-large mt-7 md:mt-8 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            <span>Join Now</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
