import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { posts } from '../data/posts';

const PLATFORM_STYLE = {
  ghpages:  { label: 'gh-pages', color: '#4af0c4' },
  medium:   { label: 'medium',   color: '#f0c44a' },
  substack: { label: 'substack', color: '#f04a6a' },
};

const TAG_CLASS_BLOG = {
  ai: 'tag-ai',
  creative: 'tag-fan',
  interactive: 'tag-fan',
  meta: 'tag-default',
};

function PostCard({ post }) {
  const { lang, t } = useLanguage();
  const [hover, setHover] = useState(false);

  const formatted = new Date(post.date).toLocaleDateString(
    lang === 'uk' ? 'uk-UA' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const cardStyle = {
    display: 'block',
    textDecoration: 'none',
    background: hover ? 'rgba(30,33,50,0.6)' : 'rgba(18,20,30,0.4)',
    border: `1px solid ${hover ? '#c04af0' : '#2e3250'}`,
    borderRadius: '4px',
    padding: '28px',
    transition: 'all 0.3s ease',
    boxShadow: hover ? '0 0 20px rgba(192,74,240,0.08)' : 'none',
    position: 'relative',
    overflow: 'hidden',
    cursor: post.link ? 'none' : 'default',
  };

  const inner = (
    <>
      {/* Left accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '2px',
        background: hover
          ? 'linear-gradient(180deg, #c04af0, transparent)'
          : 'linear-gradient(180deg, #2e3250, transparent)',
        transition: 'background 0.3s',
      }} />

      {/* Date + read time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: '#5a607a', letterSpacing: '0.06em' }}>
          {formatted}
        </span>
        <span style={{ color: '#2e3250', fontSize: '0.6rem' }}>·</span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: '#5a607a', letterSpacing: '0.04em' }}>
          {post.readTime} {t('thoughts', 'minRead')}
        </span>
        {post.platform && PLATFORM_STYLE[post.platform] && (
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.1em',
            color: PLATFORM_STYLE[post.platform].color,
            border: `1px solid ${PLATFORM_STYLE[post.platform].color}44`,
            borderRadius: '2px',
            padding: '1px 6px',
            opacity: 0.7,
          }}>
            {PLATFORM_STYLE[post.platform].label}
          </span>
        )}
        {post.link && (
          <span style={{ marginLeft: 'auto', fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: hover ? '#c04af0' : '#2e3250', transition: 'color 0.3s' }}>
            відкрити ↗
          </span>
        )}
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: '1rem', color: hover ? '#c8cfe8' : '#9199b8', marginBottom: '10px', transition: 'color 0.3s', letterSpacing: '0.01em', lineHeight: 1.4 }}>
        {post.title[lang]}
      </h3>

      {/* Summary */}
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#5a607a', lineHeight: 1.7, marginBottom: '20px' }}>
        {post.summary[lang]}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {post.tags.map(tag => (
          <span key={tag} className={`tag ${TAG_CLASS_BLOG[tag] ?? 'tag-default'}`}>{tag}</span>
        ))}
      </div>
    </>
  );

  if (post.link) {
    return (
      <a
        href={post.link}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={cardStyle}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={cardStyle}
    >
      {inner}
    </div>
  );
}

function BlogSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="thoughts"
      ref={sectionRef}
      style={{
        padding: 'clamp(60px, 10vw, 100px) 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div className="reveal" style={{ marginBottom: '48px' }}>
        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#c04af0',
          marginBottom: '8px',
        }}>
          {t('thoughts', 'subtitle')}
        </p>
        <h2 style={{
          fontFamily: 'Unbounded, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          color: '#c8cfe8',
          letterSpacing: '-0.02em',
        }}>
          {t('thoughts', 'title')}
        </h2>
        <div style={{
          width: '48px',
          height: '2px',
          background: 'linear-gradient(90deg, #c04af0, transparent)',
          marginTop: '14px',
        }} />
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {posts.map((post, i) => (
            <div key={post.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : null}

      {/* Coming soon */}
      <div className="reveal" style={{
        marginTop: posts.length > 0 ? '24px' : '0',
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.75rem',
        color: '#2e3250',
        letterSpacing: '0.08em',
        textAlign: 'center',
        padding: '32px',
        border: '1px dashed #1e2132',
        borderRadius: '4px',
      }}>
        {t('thoughts', 'comingSoon')}
      </div>
    </section>
  );
}

export default BlogSection;
