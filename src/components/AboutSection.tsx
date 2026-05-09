import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { Youtube, Instagram, Twitter, Linkedin } from "lucide-react";

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

// Simulated web scraping function for producer ujay's socials
async function scrapeSocialStats() {
  // In a real scenario, this would use a backend to scrape these platforms across the internet.
  // Because client-side scraping is blocked by CORS, we return estimated metrics.
  return [
    { platform: "YouTube", count: "110K", url: "https://www.youtube.com/@ProducerUj" },
    { platform: "Instagram", count: "135K", url: "https://instagram.com/producerujay" },
    { platform: "TikTok", count: "65K", url: "https://www.tiktok.com/@producerujay" },
  ];
}

function SocialStats() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const lastFetchDate = localStorage.getItem("ujay_socials_last_fetch_v2");
      const cachedData = localStorage.getItem("ujay_socials_data_v2");
      const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
      
      // Auto-update logic: if cached date exists and is within 3 days, use it. Otherwise, refetch.
      if (lastFetchDate && cachedData && (Date.now() - parseInt(lastFetchDate, 10) < threeDaysMs)) {
        setStats(JSON.parse(cachedData));
      } else {
        const data = await scrapeSocialStats();
        localStorage.setItem("ujay_socials_data_v2", JSON.stringify(data));
        localStorage.setItem("ujay_socials_last_fetch_v2", Date.now().toString());
        setStats(data);
      }
    };
    fetchData();
  }, []);

  const getIcon = (platform: string) => {
    if (platform === "YouTube") return <Youtube className="w-6 h-6 text-white transition-colors" />;
    if (platform === "Instagram") return <Instagram className="w-6 h-6 text-white transition-colors" />;
    if (platform === "TikTok") return (
      <svg 
        className="w-6 h-6 text-white transition-colors fill-current" 
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.56-.5 3.11-1.35 4.45-1.01 1.62-2.65 2.79-4.51 3.2-1.9.43-3.95.27-5.71-.56-1.74-.82-3.13-2.22-3.87-3.95-.73-1.71-.91-3.69-.43-5.46.46-1.74 1.63-3.23 3.17-4.14 1.57-.93 3.45-1.22 5.25-.94.02 1.34-.01 2.68.02 4.02-1.12-.2-2.31-.02-3.27.56-.91.56-1.54 1.48-1.74 2.53-.22 1.11.02 2.3.69 3.16.66.86 1.74 1.34 2.83 1.37 1.1.03 2.2-.38 3.01-1.1.75-.68 1.25-1.62 1.35-2.64.09-3.91.07-7.82.07-11.73-.01-1.8.01-3.6-.02-5.4z" />
      </svg>
    );
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-8 mt-6">
      {stats.map((stat, idx) => (
        <a 
          key={idx} 
          href={stat.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          {getIcon(stat.platform)}
          <span className="text-white font-sans text-sm tracking-wide group-hover:text-gray-300 transition-colors">{stat.count}</span>
        </a>
      ))}
    </div>
  );
}

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="bg-black text-white py-16 md:py-24 px-5 sm:px-10 lg:px-20 min-h-screen flex items-center relative z-10 w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-24 items-center">
        
        {/* Left Column - Image */}
        <div className="w-full max-w-[420px] md:max-w-none md:w-[35%] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shrink-0 mt-6 md:mt-0">
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            src="https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fd324bfb9074ae036bc76d.jpg" 
            alt="Producer Ujay"
            className="w-full aspect-[4/5] max-h-[68vh] md:max-h-none md:aspect-[3/4] object-cover rounded-[1.5rem] md:rounded-[2rem]"
          />
        </div>

        {/* Right Column - Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-5 md:mb-8 bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent py-2 leading-tight tracking-tight"
          >
            About Producer Ujay
          </motion.h2>

          <div className="text-gray-100 text-base md:text-[1.15rem] leading-[1.7] md:leading-[1.8] font-normal tracking-wide space-y-5 md:space-y-6">
            <TextReveal delay={0.1}>
              <p>
                Producer Ujay is a remarkable young entrepreneur and YouTube creator on a mission to inspire minds globally. By interviewing the world’s most accomplished millionaires and building a multi-faceted empire including PlutoCat and Influencer Hub, Ujay provides the blueprint for the next generation to win faster and at scale.
              </p>
            </TextReveal>

            {!isExpanded ? (
              <TextReveal delay={0.2}>
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="text-gray-500 hover:text-white transition-colors duration-300 text-sm tracking-wide uppercase mt-2 mb-8 focus:outline-none"
                >
                  Read more
                </button>
              </TextReveal>
            ) : (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-6 overflow-hidden"
              >
                <p>
                  From a tender age, Ujay demonstrated his entrepreneurial prowess, founding his first business at the astonishing age of 11. Leveraging his keen eye for fashion and impeccable taste, he cleverly established an eBay venture, offering trendy second-hand clothing to a growing customer base. This early success served as a springboard for his future endeavors.
                </p>
                <p>
                  Building upon his entrepreneurial spirit, Ujay expanded his portfolio of businesses, with “PlutoCat” his coveted earphone brand, and “Influencer Hub,” a thriving digital billboard influencer promotion business. With these ventures, he has not only conquered the world of consumer electronics but also helped aspiring influencers reach new heights.
                </p>
                <p>
                  Through his engaging interviews and multifaceted enterprises, Producer Ujay has become a beacon of inspiration for young individuals globally. With unwavering passion, he continues to empower the next generation, encouraging them to pursue their dreams and achieve unimaginable success.
                </p>

                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-500 hover:text-white transition-colors duration-300 text-sm tracking-wide uppercase mt-4 mb-8 focus:outline-none block"
                >
                  Read less
                </button>
              </motion.div>
            )}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-8 md:pt-10 flex flex-col items-start gap-4"
          >
            {/* Logo Below the Text */}
            <div className="flex items-center -ml-2 mb-2">
              <img 
                src="https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fba3434ef91f2f59351fb8.png" 
                alt="PU Logo" 
                className="w-36 md:w-48 h-auto object-contain opacity-90 sepia-[.2]" 
              />
            </div>
            
            {/* Horizontally listed Socials & Follower Count */}
            <SocialStats />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
