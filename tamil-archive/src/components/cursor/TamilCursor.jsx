import { useEffect, useRef, useState } from 'react';

export default function TamilCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('tamil-cursor-active');

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const t = e.target;
      if (t.closest('button, a, [role="button"], input, select, textarea, label')) {
        setIsHover(true);
      } else {
        setIsHover(false);
      }
    };

    const onLeave = () => {
      setVisible(false);
      posRef.current = { x: -200, y: -200 };
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      // Ring trails behind with lerp
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.09;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.09;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('tamil-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Tamil ழ cursor dot */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
        style={{
          marginLeft: '-9px',
          marginTop: '-13px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
          willChange: 'transform',
        }}
      >
        <span
          className="font-tamil-serif font-bold block leading-none"
          style={{
            fontSize: isHover ? '22px' : '17px',
            color: isHover ? '#FFD54F' : '#D4A017',
            filter: `drop-shadow(0 0 ${isHover ? '10px' : '5px'} rgba(212,160,23,${isHover ? 0.95 : 0.75}))`,
            transition: 'font-size 0.15s, color 0.15s, filter 0.15s',
          }}
        >
          ழ
        </span>
      </div>

      {/* Trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: isHover ? '40px' : '28px',
          height: isHover ? '40px' : '28px',
          marginLeft: isHover ? '-20px' : '-14px',
          marginTop: isHover ? '-20px' : '-14px',
          border: `1px solid rgba(212,160,23,${isHover ? 0.6 : 0.2})`,
          boxShadow: isHover ? '0 0 16px rgba(212,160,23,0.28)' : 'none',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s, height 0.2s, margin 0.2s, border-color 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
