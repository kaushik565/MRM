import Card from './ui/Card';

export default function ExecutiveSummarySlide({ data }) {
  const { batchesTotal, cartridgesTotal, avgMonthly, quality, incidents, improvementsSummary, achievements, processImprovements } = data;
  const improvements = improvementsSummary || data.improvements || { implemented: 0, pending: 0 };
  
  return (
    <div className="slide-content" style={{width:'98vw',maxWidth:'100%'}}>
      <h2 className="h-title">Executive Summary Dashboard</h2>
      <p className="h-sub">Year {data.year} (Jan–Oct) Performance Overview</p>
      
      <div className="grid-4" style={{marginBottom:28}}>
        <div className="card stat-card pad-24">
          <div className="badge success">Production</div>
          <div className="metric">{(cartridgesTotal/1_000_000).toFixed(2)}M</div>
          <div className="metric-label">Cartridges Assembled</div>
          <div className="chip">✓ {batchesTotal} Batches</div>
        </div>
        <div className="card stat-card pad-24">
          <div className="badge success">Quality Rate</div>
          <div className="metric">{(quality.successRate*100).toFixed(2)}%</div>
          <div className="metric-label">Success Rate</div>
          <div className="chip">✓ {(quality.approvals*100).toFixed(1)}% Approval</div>
        </div>
        <div className="card stat-card pad-24">
          <div className="badge info">Incidents</div>
          <div className="metric">{incidents.total}</div>
          <div className="metric-label">Total Reported</div>
          <div className="chip">✓ All Resolved</div>
        </div>
        <div className="card stat-card pad-24">
          <div className="badge warning">Improvements</div>
          <div className="metric">{improvements.implemented}</div>
          <div className="metric-label">Processes Implemented</div>
          <div className="chip">⏳ {improvements.pending} Pending</div>
        </div>
      </div>
      
      <div className="grid-3" style={{marginBottom:28}}>
        <div className="success-card">
          <div style={{display:'flex',alignItems:'center',marginBottom:16}}>
            <div style={{fontSize:'2em',marginRight:12}}>📊</div>
            <div style={{fontSize:'1em',color:'var(--success)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px'}}>Production Details</div>
          </div>
          <div className="stat-row">
            <span className="label">Avg Monthly:</span>
            <span className="value">{avgMonthly.toLocaleString()}</span>
          </div>
          <div className="stat-row highlight">
            <span className="label">Peak Month:</span>
            <span className="value">Jan (1.26M)</span>
          </div>
          <div className="stat-row">
            <span className="label">Q1 Output:</span>
            <span className="value">{data.quarterly.Q1.value.toLocaleString()} ({data.quarterly.Q1.percent}%)</span>
          </div>
        </div>
        
        <div className="info-card">
          <div style={{display:'flex',alignItems:'center',marginBottom:16}}>
            <div style={{fontSize:'2em',marginRight:12}}>🎯</div>
            <div style={{fontSize:'1em',color:'var(--info)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px'}}>Quality Metrics</div>
          </div>
          <div className="stat-row">
            <span className="label">Clearances:</span>
            <span className="value" style={{color:'var(--success)'}}>{(quality.approvals*100).toFixed(1)}%</span>
          </div>
          <div className="stat-row">
            <span className="label">Closures:</span>
            <span className="value" style={{color:'var(--success)'}}>{(quality.approvals*100).toFixed(1)}%</span>
          </div>
          <div className="stat-row">
            <span className="label">Verifications:</span>
            <span className="value" style={{color:'var(--success)'}}>{(quality.successRate*100).toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="warning-card">
          <div style={{display:'flex',alignItems:'center',marginBottom:16}}>
            <div style={{fontSize:'2em',marginRight:12}}>📋</div>
            <div style={{fontSize:'1em',color:'var(--warning)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px'}}>Incident Analysis</div>
          </div>
          <div className="stat-row">
            <span className="label">Minor:</span>
            <span className="value">{incidents.minor} ({((incidents.minor/incidents.total)*100).toFixed(0)}%)</span>
          </div>
          <div className="stat-row">
            <span className="label">Major:</span>
            <span className="value" style={{color:'var(--warning)'}}>{incidents.major} ({((incidents.major/incidents.total)*100).toFixed(0)}%)</span>
          </div>
          <div className="stat-row highlight">
            <span className="label">Peak Month:</span>
            <span className="value">{incidents.peakMonth} ({incidents.peakValue})</span>
          </div>
        </div>
      </div>
      
      <div className="grid-2">
        <Card padding="pad-24">
          <div style={{display:'flex',alignItems:'center',marginBottom:18}}>
            <div style={{fontSize:'2.2em',marginRight:12}}>🏆</div>
            <div style={{fontSize:'1.1em',color:'var(--success)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.8px'}}>Key Achievements</div>
          </div>
          <div className="achievements-grid">
            {(achievements || []).map(a => (
              <div key={a.label} className="achievement">
                <div style={{color:'var(--text-muted)',fontSize:'0.75em',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.5px'}}>{a.label}</div>
                <div className="value" style={{color:'var(--accent-red)',fontSize:'1.3em'}}>{a.value}</div>
                <div style={{color:'var(--success)',fontSize:'0.75em',fontWeight:600}}>{a.note}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card padding="pad-24">
          <div style={{display:'flex',alignItems:'center',marginBottom:18}}>
            <div style={{fontSize:'2.2em',marginRight:12}}>🎯</div>
            <div style={{fontSize:'1.1em',color:'var(--accent-red)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.8px'}}>Process Improvements</div>
          </div>
          <div className="improvements">
            {(processImprovements || []).map(p => (
              <div key={p.text} className={"improvement" + (p.status === 'pending' ? ' pending' : '')}>
                <span style={{fontSize:'1.3em'}}>{p.status === 'pending' ? '⏳' : '✓'}</span>
                <span style={{fontSize:'.9em',color:'var(--text-primary)',fontWeight:500}}>{p.text}{p.status==='pending' && ' (Pending)'}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
