import dynamic from 'next/dynamic';
const StackedBarChart = dynamic(()=>import('./charts/StackedBarChart.jsx'), { ssr:false });

export default function IncidentTrendSlide({ data }) {
  const severityMonthly = data.incidentMonthlySeverity || [];
  const { incidents } = data;

  const labels = severityMonthly.map(m => m.month);
  const minorData = severityMonthly.map(m => m.minor);
  const majorData = severityMonthly.map(m => m.major);
  const criticalData = severityMonthly.map(m => m.critical);

  const datasets = [
    { label:'Minor', data: minorData, backgroundColor:'rgba(30,136,229,0.75)', borderColor:'#1e88e5' },
    { label:'Major', data: majorData, backgroundColor:'rgba(251,140,0,0.75)', borderColor:'#fb8c00' },
    { label:'Critical', data: criticalData, backgroundColor:'rgba(229,57,53,0.75)', borderColor:'#e53935' }
  ];

  const keyObservation = `Peak activity in ${incidents.peakMonth} (${incidents.peakValue} total). Stability maintained post-peak with low critical occurrence (only ${incidents.critical || 0}).`; 

  return (
    <div style={{width:'98vw',maxWidth:'100%'}}>
      <h2 className="h-title">Incident Data Analysis</h2>
      <p className="h-sub">Monthly severity distribution & performance overview</p>

      <div style={{display:'grid',gap:24,gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',marginBottom:28}}>
        <div className="card featured pad-24" style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center'}}>
          <div className="badge" style={{marginBottom:10}}>Total Incidents</div>
          <div className="metric" style={{fontSize:'3em',color:'var(--accent-red)'}}>{incidents.total}</div>
        </div>
        <div className="card pad-24" style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',borderLeft:'4px solid var(--info)'}}>
          <div className="metric-label" style={{marginBottom:8}}>Minor</div>
          <div className="metric" style={{fontSize:'2.5em',color:'var(--info)'}}>{incidents.minor}</div>
        </div>
        <div className="card pad-24" style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',borderLeft:'4px solid var(--warning)'}}>
          <div className="metric-label" style={{marginBottom:8}}>Major</div>
          <div className="metric" style={{fontSize:'2.5em',color:'var(--warning)'}}>{incidents.major}</div>
        </div>
        <div className="card pad-24" style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',borderLeft:'4px solid var(--accent-red)'}}>
          <div className="metric-label" style={{marginBottom:8}}>Critical</div>
          <div className="metric" style={{fontSize:'2.5em',color:'var(--accent-red)'}}>{incidents.critical || 0}</div>
        </div>
      </div>

      <div className="card pad-24" style={{marginBottom:28,minHeight:420,display:'flex',flexDirection:'column'}}>
        <h3 style={{margin:'0 0 18px',fontSize:'1.15em',fontWeight:700,color:'var(--text-primary)'}}>📊 Monthly Severity Trend</h3>
        <div className="chart-container" style={{flex:1}}>
          <StackedBarChart labels={labels} datasets={datasets} options={{plugins:{legend:{position:'bottom'}}}} />
        </div>
      </div>

      <div className="card highlight-box pad-24">
        <h3 style={{margin:'0 0 14px',fontSize:'1.15em',fontWeight:700,color:'var(--text-primary)',display:'flex',alignItems:'center',gap:8}}>
          <span>🔍</span> Key Observation
        </h3>
        <p style={{fontSize:'0.9em',lineHeight:1.7,color:'var(--text-secondary)',margin:0}}>{keyObservation}</p>
      </div>
    </div>
  );
}