import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

function Nav() {
  const { lang, t, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'projects', 'thoughts'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(3,5,8,0.88)' : 'transparent',
        borderBottom: scrolled ? '1px solid #2e3250' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 24px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          style={{
            fontFamily: 'Unbounded, sans-serif',
            fontWeight: 700,
            fontSize: '0.9rem',
            color: '#4af0c4',
            background: 'none',
            border: 'none',
            cursor: 'none',
            letterSpacing: '0.05em',
            padding: 0,
          }}
        >
          DS<span style={{ color: '#5a607a' }}>.dev</span>
        </button>

        {/* Links + Language toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['projects', 'thoughts'].map((section) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: active === section ? '#4af0c4' : '#9199b8',
                background: 'none',
                border: 'none',
                cursor: 'none',
                padding: '6px 12px',
                transition: 'color 0.2s',
                position: 'relative',
              }}
            >
              {t('nav', section)}
              {active === section && (
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  left: '12px',
                  right: '12px',
                  height: '1px',
                  background: '#4af0c4',
                  boxShadow: '0 0 6px #4af0c4',
                }} />
              )}
            </button>
          ))}

          {/* Language toggle */}
          <button
            onClick={toggle}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: '#c8cfe8',
              background: 'rgba(46,50,80,0.5)',
              border: '1px solid #2e3250',
              borderRadius: '3px',
              cursor: 'none',
              padding: '4px 10px',
              marginLeft: '8px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#4af0c4';
              e.currentTarget.style.color = '#4af0c4';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#2e3250';
              e.currentTarget.style.color = '#c8cfe8';
            }}
          >
            {lang === 'uk' ? 'EN' : 'UA'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
