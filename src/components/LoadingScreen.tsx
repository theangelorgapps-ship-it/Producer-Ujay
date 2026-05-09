import { useEffect, useRef, useState } from 'react';
import type HlsType from 'hls.js';
import { AnimatePresence, motion } from 'motion/react';

const logoUrl = 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fba3434ef91f2f59351fb8.png';
const loaderVideoUrl = 'https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8';
const words = ["Don't Hate", 'Take Notes.', "Don't Hate, Take Notes."];
const ease = [0.4, 0, 0.2, 1] as const;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: HlsType | null = null;
    let cancelled = false;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = loaderVideoUrl;
      void video.play().catch(() => undefined);
      return;
    }

    void import('hls.js').then(({ default: Hls }) => {
      if (cancelled || !Hls.isSupported()) return;

      hls = new Hls();
      hls.loadSource(loaderVideoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void video.play().catch(() => undefined);
      });
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => {
        if (current >= words.length - 1) {
          window.clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 900);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let animationFrame = 0;
    let completeTimer = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const nextProgress = Math.min(((now - start) / 2700) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        completeTimer = window.setTimeout(() => onCompleteRef.current(), 400);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(completeTimer);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-bg text-text"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-[#0a0a0a]/55" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute left-8 top-8 md:left-12 md:top-12"
      >
        <img src={logoUrl} alt="Producer Ujay Logo" className="h-10 w-auto md:h-12" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease }}
            className="font-display text-4xl italic text-text/80 md:text-6xl lg:text-7xl"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute bottom-8 right-8 font-display text-6xl tabular-nums text-text md:bottom-12 md:right-12 md:text-8xl lg:text-9xl"
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <motion.div
          className="h-full origin-left"
          style={{
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
