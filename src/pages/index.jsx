import { useEffect, useState, useRef } from 'react';
import { useTheme } from './_app';
import Slides from '../components/Slides';

export default function Home() {
  const [data, setData] = useState(null);
  const announceRef = useRef(null);
  useEffect(() => {
    fetch('/api/metrics')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setData({ error: true }));
  }, []);
  if (!data) return <div style={{padding:40}} aria-busy="true">Loading…</div>;
  if (data.error) return <div style={{padding:40,color:'#ffb300'}} role="alert">Failed to load data.</div>;
  return (
    <>
      <a href="#slides-root" className="skip-link">Skip to content</a>
      <div ref={announceRef} aria-live="polite" style={{position:'absolute',left:'-999px',top:'-999px'}} />
      <Slides data={data} onAnnounce={(msg)=>{ if(announceRef.current) announceRef.current.textContent=msg; }} />
    </>
  );
}
