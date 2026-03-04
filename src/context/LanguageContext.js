import React, { createContext, useContext, useState } from 'react';

const T = {
  en: {
    nav: {
      projects: 'Projects',
      thoughts: 'Thoughts',
    },
    hero: {
      role: 'Principal Software Engineer in Test',
      tagline: 'Building AI agents that augment QA workflows. Automating the boring, testing the interesting.',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      medium: 'Medium',
      substack: 'Substack',
      scrollHint: 'scroll down',
    },
    platforms: {
      medium:    'technical SDET articles',
      substack:  'AI & beyond',
      ghpages:   'thoughts on everything',
    },
    projects: {
      title: 'Projects',
      subtitle: '// things I built',
      viewProject: 'View →',
      statusDone: 'done',
      statusWip: 'in progress',
    },
    thoughts: {
      title: 'Thoughts',
      subtitle: '// things on my mind',
      minRead: 'min read',
      comingSoon: 'More thoughts coming soon...',
    },
    footer: {
      made: 'made with',
      and: 'and',
      curiosity: 'curiosity',
    },
  },
  uk: {
    nav: {
      projects: 'Проєкти',
      thoughts: 'Думки',
    },
    hero: {
      role: 'Principal Software Engineer in Test',
      tagline: 'Будую AI агентів для QA. Автоматизую нудне, тестую цікаве.',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
      medium: 'Medium',
      substack: 'Substack',
      scrollHint: 'гортати вниз',
    },
    platforms: {
      medium:    'технічні SDET статті',
      substack:  'Інтелект Штучний і не тільки',
      ghpages:   'думки про все',
    },
    projects: {
      title: 'Проєкти',
      subtitle: '// те що я побудував',
      viewProject: 'Переглянути →',
      statusDone: 'готово',
      statusWip: 'в роботі',
    },
    thoughts: {
      title: 'Думки',
      subtitle: '// те що крутиться в голові',
      minRead: 'хв читання',
      comingSoon: 'Більше думок незабаром...',
    },
    footer: {
      made: 'зроблено з',
      and: 'та',
      curiosity: 'цікавістю',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('uk');

  const t = (section, key) => {
    return T[lang]?.[section]?.[key] ?? `${section}.${key}`;
  };

  const toggle = () => setLang(l => (l === 'uk' ? 'en' : 'uk'));

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
