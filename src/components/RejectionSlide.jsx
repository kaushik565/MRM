import dynamic from 'next/dynamic';
const BarChart = dynamic(()=>import('./charts/BarChart.jsx'), { ssr:false });
const DoughnutChart = dynamic(()=>import('./charts/DoughnutChart.jsx'), { ssr:false });

export default function RejectionSlide({ data }) {
  const { rejections, rootCauses, correctiveActions, rejectionKpi } = data;

  const barLabels = rejections.types.map(t => t.name);
  const barValues = rejections.types.map(t => t.count);
  const doughnutLabels = rootCauses.map(rc => `${rc.category} (${rc.percentage}%)`);
  const doughnutValues = rootCauses.map(rc => rc.count);

  const total = rejections.total;
  const topType = rejections.types[0];
  const weldRelatedPct = rootCauses.find(rc => rc.category.toLowerCase().includes('weld'))?.percentage;

  return (
    <div className="full-bleed" style={{padding:'0 24px',maxHeight:'100vh',overflowY:'auto'}}>
      <h2 className="h-title" style={{marginTop:8,marginBottom:8}}>Rejections Deep Dive - IPQA Analysis</h2>
      <p className="h-sub" style={{marginBottom:16,fontSize:'0.9em'}}>Comprehensive Rejection Type & Root Cause Analysis ({total.toLocaleString()} Total Rejections)</p>

      {/* KPI Strip */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14,marginBottom:18}}>
        <div className="card stat-card" style={{padding:'16px 18px'}}>
          <div className="metric" style={{fontSize:'2em',color:'var(--accent-red)'}}>{rejectionKpi.currentRate}%</div>
          <div className="metric-label">Current Rate</div>
        </div>
        <div className="card stat-card" style={{padding:'16px 18px'}}>
          <div className="metric" style={{fontSize:'2em',color:'var(--warning)'}}>{rejectionKpi.targetRate}%</div>
          <div className="metric-label">Target Threshold</div>
        </div>
        <div className="card stat-card" style={{padding:'16px 18px'}}>
          <div className="metric" style={{fontSize:'2em',color:'var(--success)'}}>{rejectionKpi.goalRate}%</div>
          <div className="metric-label">Goal Rate</div>
        </div>
        <div className="card stat-card" style={{padding:'16px 18px'}}>
          <div className="metric" style={{fontSize:'1.6em',color:'var(--accent-red)'}}>{topType.name}</div>
          <div className="metric-label">Top Type</div>
        </div>
        <div className="card stat-card" style={{padding:'16px 18px'}}>
          <div className="metric" style={{fontSize:'1.6em',color:'var(--info)'}}>{weldRelatedPct ?? '-'}%</div>
          <div className="metric-label">Weld Related %</div>
        </div>
        <div className="card stat-card" style={{padding:'16px 18px'}}>
          <div className="metric" style={{fontSize:'1.6em',color:'var(--text-primary)'}}>{Math.round(total/1000)}K</div>
          <div className="metric-label">Total (K)</div>
        </div>
      </div>

      {/* Unified Side-by-Side Layout */}
      {/* Unified Side-by-Side Layout */}
      <div style={{display:'grid',gridTemplateColumns:'2fr 2fr 1fr',gap:18,marginBottom:18}}>
        <div className="card pad-24" style={{display:'flex',flexDirection:'column',minHeight:340,maxHeight:340}}>
          <h3 style={{margin:'0 0 12px',fontSize:'1.05em',fontWeight:800,color:'var(--text-primary)'}}>📊 Rejection Types</h3>
          <div className="chart-container" style={{flex:1}}>
            <BarChart
              labels={barLabels}
              values={barValues}
              label="Rejections"
              horizontal
              showValues
              options={{
                plugins:{ legend:{ display:false } },
                scales:{
                  x:{ ticks:{ callback: value => (value/1000).toFixed(0)+'K' } }
                }
              }}
            />
          </div>
        </div>
        <div className="card pad-24" style={{display:'flex',flexDirection:'column',minHeight:340,maxHeight:340}}>
          <h3 style={{margin:'0 0 12px',fontSize:'1.05em',fontWeight:800,color:'var(--text-primary)'}}>🎯 Root Cause Distribution</h3>
          <div className="chart-container" style={{flex:1}}>
            <DoughnutChart labels={doughnutLabels} values={doughnutValues} centerText={<span style={{fontSize:'0.7em',fontWeight:700,color:'var(--text-secondary)'}}>Root Causes</span>} showTotal />
          </div>
        </div>
        <div className="card pad-24" style={{display:'flex',flexDirection:'column',minHeight:340,maxHeight:340}}>
          <h3 style={{margin:'0 0 12px',fontSize:'1.05em',fontWeight:800,color:'var(--text-primary)'}}>✅ Actions Status</h3>
          <div style={{display:'flex',flexDirection:'column',gap:12,overflowY:'auto'}}>
            {correctiveActions.map(a => (
              <div key={a.action} style={{background:'var(--bg-secondary)',padding:'10px 12px',borderRadius:10,border:'1px solid var(--border-light)',display:'flex',justifyContent:'space-between',alignItems:'center'}} className="hover-lift">
                <span style={{fontSize:'0.75em',fontWeight:600,color:'var(--text-primary)'}}>{a.action}</span>
                <span className={`badge ${a.status==='completed'? 'success': a.status==='in-progress'? 'warning':'info'}`} style={{fontSize:'0.6em',textTransform:'capitalize'}}>{a.status.replace('-', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card pad-24 rejection-breakdown-card" style={{display:'flex',flexDirection:'column',maxHeight:'200px'}}>
        <h3 style={{margin:'0 0 12px',fontSize:'1.05em',fontWeight:800,color:'var(--text-primary)'}}>📋 Detailed Breakdown</h3>
        <div className="rejection-list" style={{flex:1}}>
          {rejections.types.map((t,i) => (
            <div key={t.name} className="rejection-row" style={{padding:'8px 0',borderBottom:'1px solid var(--border-light)',display:'flex',alignItems:'center',gap:10}}>
              <span style={{width:34,fontWeight:700,color:'var(--accent-red)',fontSize:'0.75em'}}>{i+1}</span>
              <span style={{flex:'1 1 160px',fontWeight:600,color:'var(--text-primary)',fontSize:'0.75em'}}>{t.name}</span>
              <div style={{flex:'3 1 260px',height:18,background:'var(--bg-secondary)',borderRadius:10,overflow:'hidden',position:'relative'}}>
                <span style={{display:'block',height:'100%',width:`${Math.min(t.percent,100)}%`,background:'linear-gradient(90deg, var(--accent-red), var(--accent-red-light))',borderRadius:10,transition:'width 0.6s ease'}} />
              </div>
              <span style={{width:90,textAlign:'right',fontWeight:700,fontSize:'0.7em',color:'var(--text-primary)'}}>{t.count.toLocaleString()}</span>
              <span style={{width:50,textAlign:'right',fontSize:'0.65em',color:'var(--text-secondary)',fontWeight:600}}>{t.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
