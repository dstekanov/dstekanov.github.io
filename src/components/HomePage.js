import React from 'react';
import CursorEffect from './CursorEffect';
import Nav from './Nav';
import HeroSection from './HeroSection';
import ProjectsSection from './ProjectsSection';
import BlogSection from './BlogSection';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{
      borderTop: '1px solid #1e2132',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.68rem',
        color: '#2e3250',
        letterSpacing: '0.08em',
      }}>
        {t('footer', 'made')}{' '}
        <span style={{ color: '#f04a6a' }}>♥</span>{' '}
        {t('footer', 'and')}{' '}
        <span style={{ color: '#4af0c4' }}>{t('footer', 'curiosity')}</span>
        {' — '}
        <a
          href="https://github.com/dstekanov"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#5a607a', textDecoration: 'none', cursor: 'none' }}
        >
          dstekanov
        </a>
      </p>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <CursorEffect />
      <Nav />
      <main>
        <HeroSection />

        {/* Section divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #1e2132, transparent)',
          margin: '0 24px',
        }} />

        <ProjectsSection />

        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #1e2132, transparent)',
          margin: '0 24px',
        }} />

        <BlogSection />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
