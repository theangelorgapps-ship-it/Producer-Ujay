import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useSiteContent } from "../hooks/useSiteContent";

function TextReveal({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

const highlightPhrases = [
  "British entrepreneur",
  "media personality",
  "digital educator",
  "exposure",
  "ambition",
  "entrepreneurship",
  "don't hate, take notes",
  "valuable assets",
  "First Class",
  "Economy",
  "greatness",
  "wealth",
  "success",
  "self-made entrepreneurs",
  "vision into reality",
  "11 years old",
  "media",
  "technology",
  "real estate",
  "hospitality",
  "Pink Marble Studios",
  "Monopoly Millionaire",
  "Digital Martyr",
  "PlutoCat",
  "property portfolio",
  "Beethoven Hotel",
  "Black Gold H2O",
].sort((a, b) => b.length - a.length);

const highlightRegex = new RegExp(`(${highlightPhrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");

function HighlightedText({ text }: { text: string }) {
  const shouldReduceMotion = useReducedMotion();
  const parts = text.split(highlightRegex).filter(Boolean);
  let highlightIndex = 0;

  return (
    <>
      {parts.map((part, index) => {
        const isHighlight = highlightPhrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase());
        if (!isHighlight) return <span key={`${part}-${index}`}>{part}</span>;

        const delay = Math.min(highlightIndex * 0.045, 0.36);
        highlightIndex += 1;

        return (
          <motion.span
            key={`${part}-${index}`}
            className="about-highlight"
            initial={shouldReduceMotion ? false : { backgroundSize: "0% 100%", color: "rgba(255,255,255,0.78)" }}
            whileInView={shouldReduceMotion ? undefined : { backgroundSize: "100% 100%", color: "rgba(255,255,255,1)" }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
          >
            {part}
          </motion.span>
        );
      })}
    </>
  );
}

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { about } = useSiteContent();
  const aboutImages = about.images;

  return (
    <section id="about" className="bg-black text-white py-16 md:py-24 px-5 sm:px-10 lg:px-20 min-h-screen flex items-center relative z-10 w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 md:gap-12 lg:gap-20 items-start">
        
        {/* Left Column - Image */}
        <div className="w-full max-w-[720px] md:max-w-none shrink-0 mt-6 md:mt-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            whileHover={shouldReduceMotion ? undefined : "hover"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.16 }
              }
            }}
            className="relative mx-auto aspect-[1.08/1] w-full max-w-[620px] sm:aspect-[1.16/1] md:max-w-none"
          >
            {aboutImages.map((image, index) => (
              <motion.div
                key={`${image.url}-${index}`}
                variants={{
                  hidden: { opacity: 0, x: index === 0 ? -44 : 44, y: index === 0 ? 24 : -12, scale: 0.92, rotate: index === 0 ? -2.5 : 2.5 },
                  visible: { opacity: 1, x: 0, y: 0, scale: 1 },
                  hover: { x: index === 0 ? -34 : 34, y: index === 0 ? 10 : -8, scale: 1.015 }
                }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className={`about-image-stack-card group overflow-hidden rounded-[1.35rem] md:rounded-[2rem] shadow-[0_28px_80px_rgba(0,0,0,0.35)] will-change-transform ${
                  index === 0 ? "about-image-stack-card-front z-20" : "about-image-stack-card-back z-10"
                }`}
              >
                <motion.img
                  src={image.url}
                  alt={image.alt ?? (index === 0 ? "Producer Ujay" : "Producer Ujay portrait")}
                  animate={shouldReduceMotion ? undefined : { y: index === 0 ? [0, -7, 0] : [0, 7, 0] }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.055 }}
                  transition={{
                    y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: index === 0 ? 0 : 0.35 },
                    scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className="w-full aspect-[3/4] object-cover object-top"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Content */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col justify-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-5 md:mb-8 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent py-2 leading-tight tracking-tight"
          >
            {about.title}
          </motion.h2>

          <div className="text-gray-100 text-base md:text-[1.15rem] leading-[1.7] md:leading-[1.8] font-normal tracking-wide space-y-5 md:space-y-6">
            <TextReveal delay={0.1}>
              <p>
                <HighlightedText text={about.intro} />
              </p>
            </TextReveal>

            {!isExpanded ? (
              <TextReveal delay={0.2}>
                <motion.button 
                  onClick={() => setIsExpanded(true)}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.03, x: 4 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="text-gray-500 hover:text-white transition-colors duration-300 text-sm tracking-wide uppercase mt-2 mb-8 focus:outline-none"
                >
                  Read more
                </motion.button>
              </TextReveal>
            ) : (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-6 overflow-hidden"
              >
                {about.body.map((paragraph) => (
                  <p key={paragraph}>
                    <HighlightedText text={paragraph} />
                  </p>
                ))}

                <motion.button 
                  onClick={() => setIsExpanded(false)}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.03, x: 4 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  className="text-gray-500 hover:text-white transition-colors duration-300 text-sm tracking-wide uppercase mt-4 mb-8 focus:outline-none block"
                >
                  Read less
                </motion.button>
              </motion.div>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-8 md:pt-10 flex flex-col items-center md:items-start gap-4"
          >
            {/* Logo Below the Text */}
            <div className="flex w-full items-center justify-center md:justify-start md:-ml-2 mb-2">
              <img 
                src="https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fba3434ef91f2f59351fb8.png" 
                alt="PU Logo" 
                className="w-36 md:w-48 h-auto object-contain opacity-90 sepia-[.2]" 
              />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
