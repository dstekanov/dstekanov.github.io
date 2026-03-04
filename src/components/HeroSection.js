import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function HeroSection() {
  const { t } = useLanguage();
  const canvasRef = useRef(null);
  const [typed, setTyped] = useState('');
  const fullRole = t('hero', 'role');

  useEffect(() => {
    setTyped('');
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullRole.slice(0, i + 1));
      i++;
      if (i >= fullRole.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [fullRole]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLS = Math.floor(canvas.width / 22);
    const drops = Array(COLS).fill(1).map(() => Math.random() * -50);
    const chars = 'アイウエオカキクケコ01アイウエオ</>{}[]()';

    const draw = () => {
      ctx.fillStyle = 'rgba(3,5,8,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(74,240,196,0.25)';
      ctx.font = '13px Space Mono, monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 22, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.4;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100svh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 24px 60px',
      }}
    >
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* Grid bg */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />

      {/* Radial vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(3,5,8,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: '720px',
      }}>
        {/* Label */}
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#4af0c4',
          marginBottom: '20px',
          opacity: 0.8,
        }}>
          &gt; init portfolio.exe
        </p>

        {/* Name with glitch */}
        <h1
          className="glitch"
          data-text="DMYTRO STEKANOV"
          style={{
            fontFamily: 'Unbounded, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 7vw, 4.5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: '#c8cfe8',
            marginBottom: '20px',
          }}
        >
          DMYTRO STEKANOV
        </h1>

        {/* Role typewriter */}
        <div style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          color: '#9199b8',
          marginBottom: '32px',
          minHeight: '1.5em',
          letterSpacing: '0.04em',
        }}>
          <span style={{ color: '#4af0c4' }}>~/</span>{' '}
          {typed}
          <span style={{ animation: 'blink 1s step-end infinite', color: '#4af0c4' }}>▋</span>
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <SocialLink href="https://github.com/dstekanov" label={t('hero', 'github')} accent="#4af0c4" />
          <SocialLink href="https://www.linkedin.com/in/dmytrostekanov/" label={t('hero', 'linkedin')} accent="#c04af0" />
          <SocialLink href="https://x.com/dmytrostekanov" label={t('hero', 'twitter')} accent="#9199b8" />
          <SocialLink href="https://medium.com/@dstekanov.tech" label={t('hero', 'medium')} accent="#f0c44a" desc={t('platforms', 'medium')} />
          <SocialLink href="https://dstekanov.substack.com/" label={t('hero', 'substack')} accent="#f04a6a" desc={t('platforms', 'substack')} />
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#2e3250',
        }}>
          {t('hero', 'scrollHint')}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '1px',
              height: '6px',
              background: '#2e3250',
              animation: `fadeDown 1.5s ease ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeDown {
          0%, 100% { opacity: 0.2; transform: translateY(-4px); }
          50% { opacity: 1; transform: translateY(4px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function SocialLink({ href, label, accent, desc }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={desc}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        color: hover ? accent : '#9199b8',
        background: hover ? `rgba(${accent === '#4af0c4' ? '74,240,196' : '192,74,240'},0.08)` : 'rgba(46,50,80,0.3)',
        border: `1px solid ${hover ? accent : '#2e3250'}`,
        borderRadius: '3px',
        padding: desc ? '6px 16px 8px' : '8px 20px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        boxShadow: hover ? `0 0 14px ${accent}33` : 'none',
        cursor: 'none',
        minWidth: desc ? '100px' : 'auto',
      }}
    >
      <span>[{label}]</span>
      {desc && (
        <span style={{
          fontSize: '0.5rem',
          letterSpacing: '0.04em',
          color: hover ? accent : '#2e3250',
          marginTop: '3px',
          transition: 'color 0.2s',
          textAlign: 'center',
          lineHeight: 1.3,
        }}>
          {desc}
        </span>
      )}
    </a>
  );
}

export default HeroSection;
