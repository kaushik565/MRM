import { useState, useEffect } from 'react';
import TitleSlide from './TitleSlide';
import TeamSlide from './TeamSlide';
import ExecutiveSummarySlide from './ExecutiveSummarySlide';
import ProductionSlide from './ProductionSlide';
import RejectionSlide from './RejectionSlide';
import QualityEventsSlide from './QualityEventsSlide';
import IncidentTrendSlide from './IncidentTrendSlide';
import IncidentRegisterSlide from './IncidentRegisterSlide';
import ProcessImplementationSlide from './ProcessImplementationSlide';
import ThankYouSlide from './ThankYouSlide';
import FitToViewport from './FitToViewport';

export default function Slides({ data, onAnnounce }) {
  const slides = [
    <TitleSlide key="title" />,
    <TeamSlide key="team" team={data.team} />,
    <ExecutiveSummarySlide key="exec" data={data} />,
    <ProductionSlide key="prod" data={data} />,
    <RejectionSlide key="rej" data={data} noScale />,
    <QualityEventsSlide key="quality" data={data} />,
    <IncidentTrendSlide key="trend" data={data} />,
    <IncidentRegisterSlide key="register" data={data} />,
    <ProcessImplementationSlide key="process" data={data} />,
    <ThankYouSlide key="thanks" />
  ];
  const [index, setIndex] = useState(0);

  const next = () => setIndex(i => {
    const ni = Math.min(i + 1, slides.length - 1);
    if (ni !== i && onAnnounce) onAnnounce(`Moved to slide ${ni+1} of ${slides.length}`);
    return ni;
  });
  const prev = () => setIndex(i => {
    const pi = Math.max(i - 1, 0);
    if (pi !== i && onAnnounce) onAnnounce(`Moved to slide ${pi+1} of ${slides.length}`);
    return pi;
  });

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
      if (e.key === 'Home') { setIndex(0); if(onAnnounce) onAnnounce(`Moved to first slide 1 of ${slides.length}`); }
      if (e.key === 'End') { setIndex(slides.length-1); if(onAnnounce) onAnnounce(`Moved to last slide ${slides.length} of ${slides.length}`); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <div style={{ position:'relative', width:'100%', height:'100%' }}>
        {slides.map((s, i) => (
          <div key={i} className={"slide" + (i === index ? '' : ' hidden')}>
            <FitToViewport>{s}</FitToViewport>
          </div>
        ))}
      </div>
      <div className="nav">
        <button onClick={prev} disabled={index===0} style={index===0?{opacity:.4,cursor:'not-allowed'}:{}}>Prev</button>
        <button onClick={next} disabled={index===slides.length-1} style={index===slides.length-1?{opacity:.4,cursor:'not-allowed'}:{}}>Next</button>
      </div>
    </>
  );
}
