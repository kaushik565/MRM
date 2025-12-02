import { useEffect, useState } from 'react';

// Elegant sequential reveal animation
export default function MorphAnimation({ delay = 600 }) {
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleIndex(0), delay),
      setTimeout(() => setVisibleIndex(1), delay + 400),
      setTimeout(() => setVisibleIndex(2), delay + 800)
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [delay]);

  const words = ['Management', 'Review', 'Meeting'];

  return (
    <div style={{
      display:'flex',
      gap:20,
      flexWrap:'wrap',
      justifyContent:'center',
      alignItems:'center'
    }}>
      {words.map((word, i) => (
        <div key={i} style={{
          opacity: visibleIndex >= i ? 1 : 0,
          transform: visibleIndex >= i ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display:'flex',
          alignItems:'center',
          gap:20
        }}>
          <span style={{
            fontSize:'1.6em',
            fontWeight:900,
            letterSpacing:'3px',
            textTransform:'uppercase',
            color:'#e53935',
            position:'relative'
          }}>
            {word}
            <span style={{
              position:'absolute',
              bottom:'-4px',
              left:0,
              right:0,
              height:'3px',
              background:'#e53935',
              opacity: visibleIndex >= i ? 1 : 0,
              transition:'opacity 0.8s ease 0.4s'
            }}/>
          </span>
          {i < words.length - 1 && (
            <span style={{
              fontSize:'1.8em',
              color:'#1a1a1a',
              fontWeight:300,
              opacity: visibleIndex > i ? 0.3 : 0,
              transition:'opacity 0.6s ease'
            }}>•</span>
          )}
        </div>
      ))}
    </div>
  );
}