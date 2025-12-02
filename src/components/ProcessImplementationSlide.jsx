export default function ProcessImplementationSlide({ data }) {
  const items = data.processImplementationFull || [];
  const implemented = items.filter(i => i.status === 'implemented').length;
  const pending = items.filter(i => i.status !== 'implemented').length;
  const progressPct = (implemented/(implemented+pending)*100);

  return (
    <div style={{width:'98vw',maxWidth:'100%'}}>
      <h2 className="h-title">New Process Implementation</h2>
      <p className="h-sub">Operational initiatives & adoption status</p>
      
      <div className="card featured pad-24" style={{marginBottom:28}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:32,alignItems:'center',justifyContent:'center'}}>
          <div style={{flex:'1 1 180px',textAlign:'center'}}>
            <div className="metric" style={{fontSize:'3em',color:'var(--success)'}}>{implemented}</div>
            <div className="metric-label">✓ Implemented</div>
          </div>
          <div style={{flex:'1 1 180px',textAlign:'center'}}>
            <div className="metric" style={{fontSize:'3em',color:'var(--warning)'}}>{pending}</div>
            <div className="metric-label">⏳ Pending</div>
          </div>
          <div style={{flex:'2 1 360px'}}>
            <div className="highlight-box" style={{margin:0}}>
              <div style={{fontSize:'0.9em',fontWeight:600,color:'var(--text-primary)',marginBottom:10}}>
                📊 Progress Momentum
              </div>
              <div className="progress-bar" style={{height:28,marginBottom:8}}>
                <div className="progress-fill success" style={{width:`${progressPct}%`,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'0.85em'}}>
                  {progressPct >= 15 ? `${progressPct.toFixed(1)}%` : ''}
                </div>
              </div>
              {progressPct < 15 && (
                <div style={{fontSize:'0.8em',color:'var(--success)',fontWeight:700,textAlign:'center'}}>
                  {progressPct.toFixed(1)}%
                </div>
              )}
              <div style={{fontSize:'0.8em',color:'var(--text-secondary)',textAlign:'center',marginTop:6}}>
                {implemented} of {implemented+pending} targeted initiatives active
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card pad-24">
        <h3 style={{margin:'0 0 20px',fontSize:'1.15em',fontWeight:700,color:'var(--text-primary)',display:'flex',alignItems:'center',gap:8}}>
          <span>📋</span> Implementation Items
        </h3>
        <ul style={{margin:0,padding:0,listStyle:'none',display:'grid',gap:14}}>
          {items.map(i => (
            <li key={i.item} style={{display:'flex',alignItems:'center',gap:14,background:'var(--bg-secondary)',padding:'14px 18px',borderRadius:12,border:`2px solid ${i.status==='implemented'? 'var(--success)':'var(--warning)'}`,transition:'all 0.3s ease'}} className="hover-lift">
              <span className="status-indicator" style={{width:28,height:28,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',background:i.status==='implemented'? 'var(--success)':'var(--warning)',color:'#fff',fontSize:'1em',fontWeight:700,flexShrink:0,boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>
                {i.status==='implemented'?'✓':'⏳'}
              </span>
              <span style={{flex:1,fontSize:'0.9em',color:'var(--text-primary)',fontWeight:500,lineHeight:1.5}}>{i.item}</span>
              <span className={`badge ${i.status==='implemented'? 'success':'warning'}`} style={{fontSize:'0.75em',flexShrink:0}}>
                {i.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}