import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projects } from '../data/projects';

const TAG_CLASS = {
  qa: 'tag-qa',
  fan: 'tag-fan',
  react: 'tag-react',
  ai: 'tag-ai',
  game: 'tag-game',
  dashboard: 'tag-default',
  creative: 'tag-fan',
  playwright: 'tag-react',
  cli: 'tag-default',
  health: 'tag-default',
  collection: 'tag-default',
  interactive: 'tag-fan',
};

function ProjectCard({ project }) {
  const { lang, t } = useLanguage();
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: hover ? 'rgba(30,33,50,0.8)' : 'rgba(18,20,30,0.6)',
        border: `1px solid ${hover ? '#4af0c4' : '#2e3250'}`,
        borderRadius: '4px',
        padding: '28px',
        transition: 'all 0.3s ease',
        boxShadow: hover ? '0 0 20px rgba(74,240,196,0.1), inset 0 0 20px rgba(74,240,196,0.03)' : 'none',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40px',
        height: '40px',
        borderTop: `2px solid ${hover ? '#4af0c4' : '#2e3250'}`,
        borderRight: `2px solid ${hover ? '#4af0c4' : '#2e3250'}`,
        transition: 'border-color 0.3s',
      }} />

      {/* Icon */}
      <div style={{ fontSize: '2rem', marginBottom: '14px', lineHeight: 1 }}>
        {project.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Unbounded, sans-serif',
        fontWeight: 700,
        fontSize: '1rem',
        color: hover ? '#c8cfe8' : '#9199b8',
        marginBottom: '10px',
        transition: 'color 0.3s',
        letterSpacing: '0.01em',
      }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        color: '#5a607a',
        lineHeight: 1.65,
        marginBottom: '20px',
      }}>
        {project.description[lang]}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {project.tags.map(tag => (
          <span key={tag} className={`tag ${TAG_CLASS[tag] ?? 'tag-default'}`}>
            {tag}
          </span>
        ))}
        <span className="tag tag-default" style={{ marginLeft: 'auto' }}>
          {t('projects', `status${project.status === 'done' ? 'Done' : 'Wip'}`)}
        </span>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '4px' }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.06em',
              color: hover ? '#4af0c4' : '#5a607a',
              border: `1px solid ${hover ? '#4af0c4' : '#2e3250'}`,
              borderRadius: '2px',
              padding: '5px 12px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'none',
            }}
          >
            GitHub ↗
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.06em',
              color: '#5a607a',
              border: '1px solid #2e3250',
              borderRadius: '2px',
              padding: '5px 12px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              cursor: 'none',
            }}
          >
            {t('projects', 'viewProject')}
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectsSection() {
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
      id="projects"
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
          color: '#4af0c4',
          marginBottom: '8px',
        }}>
          {t('projects', 'subtitle')}
        </p>
        <h2 style={{
          fontFamily: 'Unbounded, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          color: '#c8cfe8',
          letterSpacing: '-0.02em',
        }}>
          {t('projects', 'title')}
        </h2>
        <div style={{
          width: '48px',
          height: '2px',
          background: 'linear-gradient(90deg, #4af0c4, transparent)',
          marginTop: '14px',
        }} />
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {projects.map((project, i) => (
          <div key={project.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
