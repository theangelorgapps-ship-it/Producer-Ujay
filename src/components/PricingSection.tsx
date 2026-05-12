import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, X } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

const advertiseVideoUrl = 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69fead25a7b9e0385a1a1053.mp4';
const collabVideoUrl = 'https://assets.cdn.filesafe.space/uUwEUa6rp4Gx1NEi2KiM/media/69feaeeea3dd25aa2abc9256.mp4';
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

function LeadConnectorForm({
  formId,
  formName,
  height,
}: {
  formId: string;
  formName: string;
  height: number;
}) {
  const iframeId = `inline-${formId}`;

  useEffect(() => {
    const scriptId = 'leadconnector-form-embed-script';
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="leadconnector-frame-shell relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
        id={iframeId}
        title={formName}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-height={height}
        data-layout-iframe-id={iframeId}
        data-form-id={formId}
        loading="eager"
        className="block w-full border-0 bg-white"
        style={{
          minHeight: `${Math.min(height, 760)}px`,
          height: `min(${height}px, calc(92vh - 320px))`,
          borderRadius: 8,
        }}
      />
    </div>
  );
}

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const [showAdvertiseForm, setShowAdvertiseForm] = useState(false);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const modalRoot = typeof document === 'undefined' ? null : document.body;
  const { connect } = siteContent;
  const cardsByKind = Object.fromEntries(connect.cards.map((card) => [card.kind, card]));
  const collabCard = cardsByKind.collab;
  const advertiseCard = cardsByKind.advertise;
  const communityCard = cardsByKind.community;
  
  return (
    <section id="connect" className="c3-section relative w-full overflow-hidden min-h-screen flex flex-col items-center py-8 md:py-[40px] px-4 md:px-[20px]">
      <style>{`
        .c3-section {
          background-color: #000;
          z-index: 10;
          isolation: isolate;
          scroll-margin-top: 0;
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
        }
        .c3-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: stretch;
          gap: 24px;
          max-width: 1280px;
          width: 100%;
          margin-top: 60px;
          z-index: 10;
          transform: translateZ(0);
        }
        .c3-card {
          background: #050505;
          border: 1px solid rgba(255, 255, 255, 0.34);
          border-radius: 28px;
          padding: 50px 24px;
          min-height: 620px;
          height: 100%;
          transform: translateZ(0);
          transition: border-color 0.18s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
          backface-visibility: hidden;
        }
        .c3-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 42%);
          pointer-events: none;
          z-index: 0;
        }
        .c3-card:hover {
          border-color: rgba(212, 175, 55, 0.7);
        }
        .c3-stats-orbits {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 12%, rgba(212,175,55,0.18) 0 1px, transparent 2px 19%),
            radial-gradient(circle at 50% 12%, rgba(212,175,55,0.13) 0 1px, transparent 2px 31%),
            radial-gradient(circle at 50% 12%, rgba(212,175,55,0.08) 0 1px, transparent 2px 43%);
        }
        .c3-stats-chart {
          flex: 0 0 340px;
          min-height: 340px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 12px;
          padding: 72px 24px 22px;
          position: relative;
          z-index: 1;
        }
        .c3-stat-col {
          flex: 1 1 0;
          min-width: 0;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          position: relative;
        }
        .c3-stat-icon {
          position: absolute;
          top: -42px;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.16);
          background: #070707;
        }
        .c3-stat-icon-linkedin { background: #f5f7fb; color: #070707; }
        .c3-stat-icon-instagram { background: linear-gradient(135deg, #f7c43a, #e43c5c 50%, #7b4dff); }
        .c3-stat-icon-youtube { background: #dc2626; }
        .c3-stat-bar {
          width: 100%;
          border: 1px solid rgba(212,175,55,0.46);
          border-bottom: 0;
          border-radius: 12px 12px 0 0;
          background: linear-gradient(180deg, rgba(145,125,49,0.74), rgba(8,22,33,0.3));
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 16px;
        }
        .c3-stat-bar span {
          color: rgba(255,255,255,0.92);
          font-size: 0.75rem;
          font-weight: 800;
        }
        .c3-card-media {
          height: 310px;
          flex: 0 0 310px;
          background: #050505;
          transform: translateZ(0);
        }
        .c3-card-media img {
          display: block;
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: top center;
        }
        .c3-card-body {
          flex: 1 1 auto;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .c3-card-feature .c3-card-body {
          min-height: 310px;
          padding-top: 32px;
          padding-bottom: 34px;
        }
        .c3-card-feature .c3-card-body > h3 {
          min-height: 104px;
          display: flex;
          align-items: flex-start;
        }
        .c3-card-feature .c3-card-copy {
          min-height: 88px;
        }
        .c3-card-cta {
          width: 100%;
          max-width: 220px;
          min-height: 54px;
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .c3-section .c3-btn-gold,
        .c3-section .c3-btn-gold-large {
          transition: transform 0.16s ease, border-color 0.16s ease;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.72), inset 0 -1px 2px rgba(0,0,0,0.36);
        }
        .c3-section .c3-btn-gold::after,
        .c3-section .c3-btn-gold-large::after {
          display: none;
        }
        .c3-section .c3-btn-gold:hover,
        .c3-section .c3-btn-gold-large:hover {
          transform: translateY(-1px);
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.78), inset 0 -1px 2px rgba(0,0,0,0.4);
        }
        .c3-section .c3-primary-cta-glow {
          background-position: 16% center;
          border-color: rgba(255, 249, 230, 0.96);
          box-shadow:
            inset 0 1px 3px rgba(255,255,255,0.9),
            inset 0 -1px 3px rgba(0,0,0,0.42),
            0 5px 18px rgba(0,0,0,0.48),
            0 0 0 1px rgba(255, 255, 255, 0.18),
            0 0 18px rgba(255, 255, 255, 0.18),
            0 0 34px rgba(212, 175, 55, 0.22);
        }
        .c3-section .c3-primary-cta-glow:hover {
          background-position: right center;
          box-shadow:
            inset 0 1px 3px rgba(255,255,255,0.96),
            inset 0 -1px 3px rgba(0,0,0,0.48),
            0 7px 20px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255, 255, 255, 0.24),
            0 0 22px rgba(255, 255, 255, 0.24),
            0 0 42px rgba(212, 175, 55, 0.26);
        }
        .leadconnector-frame-shell iframe {
          width: 100%;
          border: 0;
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
          .c3-card { min-height: 560px; }
          .c3-stats-chart {
            flex-basis: 320px;
            min-height: 320px;
          }
          .c3-card-media {
            height: 300px;
            flex-basis: 300px;
          }
          .c3-card-feature .c3-card-body { min-height: 280px; }
          .c3-card-feature .c3-card-body > h3 { min-height: 90px; }
          .c3-card-feature .c3-card-copy { min-height: 78px; }
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
            min-height: 560px;
            border-radius: 22px;
          }
          .c3-stats-chart {
            flex-basis: 300px;
            min-height: 300px;
            gap: 8px;
            padding: 66px 16px 18px;
          }
          .c3-stat-icon {
            width: 32px;
            height: 32px;
            top: -40px;
          }
          .c3-stat-bar span {
            font-size: 0.68rem;
          }
          .c3-card-media {
            height: 280px;
            flex-basis: 280px;
          }
          .c3-card-feature .c3-card-body {
            min-height: 250px;
          }
          .c3-card-feature .c3-card-body > h3 {
            min-height: auto;
          }
          .c3-card-feature .c3-card-copy {
            min-height: auto;
          }
          .c3-btn-gold-large {
            padding: 14px 32px;
            font-size: 1rem;
          }
        }
      `}</style>
      <div className="c3-grid">
        {/* Card 1 */}
        <div className="c3-card relative overflow-hidden" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div className="c3-stats-orbits" />
          <div className="c3-stats-chart">
            {connect.stats.bars.map((bar) => (
              <div className="c3-stat-col" key={bar.platform}>
                <div className={`c3-stat-icon c3-stat-icon-${bar.platform}`}>
                  {bar.platform === 'linkedin' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  )}
                  {bar.platform === 'tiktok' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                  )}
                  {bar.platform === 'instagram' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  )}
                  {bar.platform === 'youtube' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  )}
                  {bar.platform === 'x' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M4 20L20 4"></path></svg>
                  )}
                </div>
                <div className="c3-stat-bar" style={{ height: `${bar.height}%` }}><span>{bar.value}</span></div>
              </div>
            ))}
          </div>

          <div className="c3-card-body px-5 md:px-8 pb-8 md:pb-10 pt-5 md:pt-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end">
            <h3 className="text-[1.65rem] md:text-[32px] font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">{connect.stats.title}</h3>
            <p className="c3-card-copy text-[#d8d8d8] text-sm md:text-base leading-relaxed max-w-[300px]">{connect.stats.subtitle}</p>
          </div>
        </div>

        {/* Card 2 */}
        {collabCard && <div className="c3-card c3-card-feature relative overflow-hidden group" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div className="c3-card-media w-full flex flex-col justify-center p-0 relative z-10 m-0 overflow-hidden">
             <img src={collabCard.image.url} alt={collabCard.image.alt ?? collabCard.title} className="h-full w-full object-cover object-top" />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
          </div>

          <div className="c3-card-body px-5 md:px-8 pb-8 md:pb-10 pt-5 md:pt-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end items-start border-t border-transparent">
            <h3 className="text-[1.65rem] md:text-[32px] font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">{collabCard.title}</h3>
            <p className="c3-card-copy text-[#d8d8d8] text-sm md:text-base leading-relaxed max-w-[320px] mb-6">{collabCard.description}</p>
            <button onClick={() => setShowConnectForm(true)} className="c3-btn-gold c3-card-cta"><span>{collabCard.buttonLabel}</span></button>
          </div>
        </div>}

        {/* Card 3 */}
        {advertiseCard && <div className="c3-card c3-card-feature relative overflow-hidden group" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div className="c3-card-media w-full flex flex-col justify-center p-0 relative z-10 m-0 overflow-hidden">
             <img src={advertiseCard.image.url} alt={advertiseCard.image.alt ?? advertiseCard.title} className="h-full w-full object-cover object-top" />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
          </div>

          <div className="c3-card-body px-5 md:px-8 pb-8 md:pb-10 pt-5 md:pt-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end items-start border-t border-transparent">
            <h3 className="text-[1.65rem] md:text-[32px] font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">{advertiseCard.title}</h3>
            <p className="c3-card-copy text-[#d8d8d8] text-sm md:text-base leading-relaxed max-w-[300px] mb-6">{advertiseCard.description}</p>
            <button onClick={() => setShowAdvertiseForm(true)} className="c3-btn-gold c3-card-cta"><span>{advertiseCard.buttonLabel}</span></button>
          </div>
        </div>}

        {/* Card 4 */}
        {communityCard && <div className="c3-card c3-card-feature relative overflow-hidden group" style={{ padding: '0', display: 'flex', flexDirection: 'column' }}>
          <div className="c3-card-media w-full flex flex-col justify-center p-0 relative z-10 m-0 overflow-hidden">
             <img src={communityCard.image.url} alt={communityCard.image.alt ?? communityCard.title} className="h-full w-full object-cover object-top" />
          </div>

          <div className="c3-card-body px-5 md:px-8 pb-8 md:pb-10 pt-5 md:pt-6 relative z-10 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end items-start border-t border-transparent">
            <h3 className="text-[1.65rem] md:text-[32px] font-bold text-white mb-3 md:mb-4 tracking-tight leading-tight">{communityCard.title}</h3>
            <p className="c3-card-copy text-[#d8d8d8] text-sm md:text-base leading-relaxed max-w-[300px] mb-6">{communityCard.description}</p>
            <a href={communityCard.url} target="_blank" rel="noopener noreferrer" className="c3-btn-gold c3-card-cta"><span>{communityCard.buttonLabel}</span></a>
          </div>
        </div>}
      </div>

      <div className="mt-12 md:mt-16 z-10 relative flex justify-center pb-16 md:pb-20">
        <button onClick={() => setShowConnectForm(true)} className="c3-btn-gold-large c3-primary-cta-glow"><span>{connect.primaryCta}</span></button>
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
                  <h3 className={modalHeadingClass}>{connect.modals.advertiseHeading}</h3>
                  <button onClick={() => setShowAdvertiseForm(false)} aria-label="Close advertise form" className="shrink-0 p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-950 transition-colors">
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
                <div className="mb-6 md:mb-8">
                  <PopupVideo src={advertiseVideoUrl} title="Advertise with Producer Ujay video" />
                </div>
                <LeadConnectorForm formId="Yjra8JFHwosBJ2LXgpOZ" formName="Advertise" height={891} />
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
                  <h3 className={modalHeadingClass}>{connect.modals.collabHeading}</h3>
                  <button onClick={() => setShowConnectForm(false)} aria-label="Close collab form" className="shrink-0 p-1.5 md:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-950 transition-colors">
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
                <div className="mb-6 md:mb-8">
                  <PopupVideo src={collabVideoUrl} title="Collab with Producer Ujay video" />
                </div>
                <LeadConnectorForm formId="uteitrfUjzkC1H9W9y8L" formName="Collab" height={799} />
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
