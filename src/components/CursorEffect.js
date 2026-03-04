import React, { useEffect, useRef } from 'react';

function CursorEffect() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const onMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
    };

    const onDown = () => {
      cursor.classList.add('active');
      trail.classList.add('active');
    };

    const onUp = () => {
      cursor.classList.remove('active');
      trail.classList.remove('active');
    };

    const onEnterLink = () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      trail.style.width = '52px';
      trail.style.height = '52px';
    };

    const onLeaveLink = () => {
      cursor.style.width = '';
      cursor.style.height = '';
      trail.style.width = '';
      trail.style.height = '';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      links.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
}

export default CursorEffect;
