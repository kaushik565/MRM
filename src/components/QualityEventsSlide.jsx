import dynamic from 'next/dynamic';
const DoughnutChart = dynamic(()=>import('./charts/DoughnutChart.jsx'), { ssr:false });

export default function QualityEventsSlide({ data }) {
  const monthly = data.qualityEventsMonthly || [];
  // Aggregate totals per category (based on PowerPoint data: Clearances, Closures, Reverifications)
  const totals = monthly.reduce((acc, m) => {
    acc.clearances.approved += m.clearancesApproved; acc.clearances.not += m.clearancesNotApproved;
    acc.closures.approved += m.closuresApproved; acc.closures.not += m.closuresNotApproved;
    acc.reverifications.approved += m.reverificationsApproved; acc.reverifications.not += m.reverificationsNotApproved || 0;
    return acc;
  }, { clearances:{approved:0,not:0}, closures:{approved:0,not:0}, reverifications:{approved:0,not:0} });

  function pct(a,b){ return (a/(a+b))*100 || 0; }

  const summaryCards = [
    { label:'Line Clearance', value: totals.clearances.approved.toLocaleString(), pct: pct(totals.clearances.approved, totals.clearances.not), total: totals.clearances.approved + totals.clearances.not },
    { label:'Line Closure', value: totals.closures.approved.toLocaleString(), pct: pct(totals.closures.approved, totals.closures.not), total: totals.closures.approved + totals.closures.not },
    { label:'Line Reverification', value: totals.reverifications.approved.toLocaleString(), pct: pct(totals.reverifications.approved, totals.reverifications.not), total: totals.reverifications.approved + totals.reverifications.not }
  ];

  // Build donut of overall approval vs not (all categories combined)
  const overallApproved = summaryCards.reduce((a,c)=>a + parseInt(c.value.replace(/,/g,'')),0);
  const overallNot = totals.clearances.not + totals.closures.not + totals.reverifications.not;

  return (
    <div style={{width:'98vw',maxWidth:'100%'}}>
      <h2 className="h-title">Quality Events Analysis</h2>
      <p className="h-sub">Multi-category approval performance and monthly breakdown</p>

      <div style={{display:'grid',gap:24,gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',marginBottom:28}}>
        {summaryCards.map((c, idx) => (
          <div key={c.label} className={`card pad-24 ${idx === 2 ? 'featured' : ''}`} style={{display:'flex',flexDirection:'column',gap:8,textAlign:'center'}}>
            <div className="badge" style={{fontSize:'0.75em',marginBottom:4}}>{c.label}</div>
            <div className="metric" style={{fontSize:'2.8em',color:'var(--success)'}}>{c.value}</div>
            <div className="metric-label" style={{fontSize:'0.85em'}}>Total: {c.total.toLocaleString()}</div>
            <div style={{marginTop:8}}>
              <div className="progress-bar">
                <div className="progress-fill success" style={{width:`${c.pct}%`}}></div>
              </div>
              <div style={{fontSize:'0.75em',color:'var(--success)',fontWeight:700,marginTop:4}}>✓ {c.pct.toFixed(1)}% Approved</div>
            </div>
          </div>
        ))}
        <div className="card pad-24" style={{display:'flex',flexDirection:'column',minHeight:280}}>
          <h3 style={{fontSize:'1.1em',fontWeight:700,color:'var(--text-primary)',marginBottom:14}}>📊 Overall Approval</h3>
          <div className="chart-container" style={{flex:1}}>
            <DoughnutChart labels={['Approved','Not Approved']} values={[overallApproved,overallNot]} colors={['rgba(67,160,71,0.85)','rgba(251,140,0,0.7)']} centerText={<span style={{fontSize:'0.9em',fontWeight:700,color:'var(--text-primary)'}}>Overall<br/>{((overallApproved/(overallApproved+overallNot))*100).toFixed(1)}%</span>} />
          </div>
        </div>
      </div>

      <div className="card pad-24" style={{marginBottom:28}}>
        <h3 style={{margin:'0 0 18px',fontSize:'1.15em',fontWeight:700,color:'var(--text-primary)'}}>📅 Monthly Breakdown</h3>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.8em'}}>
            <thead>
              <tr style={{background:'linear-gradient(135deg, var(--accent-red), var(--accent-red-dark))',color:'#fff'}}>
                <th style={{padding:'12px 10px',textAlign:'left',fontWeight:700,fontSize:'0.9em'}}>Month</th>
                <th style={{padding:'12px 10px',textAlign:'center',fontWeight:700,fontSize:'0.9em'}}>Clearance A/NA</th>
                <th style={{padding:'12px 10px',textAlign:'center',fontWeight:700,fontSize:'0.9em'}}>Closure A/NA</th>
                <th style={{padding:'12px 10px',textAlign:'center',fontWeight:700,fontSize:'0.9em'}}>Reverification A/NA</th>
                <th style={{padding:'12px 10px',textAlign:'center',fontWeight:700,fontSize:'0.9em'}}>Avg %</th>
              </tr>
            </thead>
            <tbody>
              {monthly.map((m, idx) => {
                const avgPct = (
                  (pct(m.clearancesApproved,m.clearancesNotApproved)+pct(m.closuresApproved,m.closuresNotApproved)+pct(m.reverificationsApproved,m.reverificationsNotApproved || 0))/3
                );
                return (
                  <tr key={m.month} style={{borderBottom:'1px solid var(--border-light)',background: idx % 2 === 0 ? 'transparent' : 'var(--bg-secondary)',transition:'background 0.2s'}} className="hover-bg">
                    <td style={{padding:'10px',fontWeight:700,color:'var(--text-primary)'}}>{m.month}</td>
                    <td style={{padding:'10px',textAlign:'center',color:'var(--text-secondary)'}}>{m.clearancesApproved}<span style={{color:'var(--warning)',fontWeight:600}}>/{m.clearancesNotApproved}</span></td>
                    <td style={{padding:'10px',textAlign:'center',color:'var(--text-secondary)'}}>{m.closuresApproved}<span style={{color:'var(--warning)',fontWeight:600}}>/{m.closuresNotApproved}</span></td>
                    <td style={{padding:'10px',textAlign:'center',color:'var(--text-secondary)'}}>{m.reverificationsApproved}<span style={{color:'var(--warning)',fontWeight:600}}>/{m.reverificationsNotApproved || 0}</span></td>
                    <td style={{padding:'10px',textAlign:'center'}}>
                      <span className="badge success" style={{fontSize:'0.8em'}}>{avgPct.toFixed(1)}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card info-card pad-24">
        <h3 style={{margin:'0 0 14px',fontSize:'1.15em',fontWeight:700,color:'var(--text-primary)',display:'flex',alignItems:'center',gap:8}}>
          <span>💡</span> Key Insights
        </h3>
        <ul style={{margin:0,paddingLeft:24,fontSize:'0.85em',lineHeight:1.8,color:'var(--text-secondary)'}}>
          <li><strong style={{color:'var(--text-primary)'}}>Consistent Excellence:</strong> High approval rates across Line Clearance, Closure, and Reverification processes (Jul-Nov 2024).</li>
          <li><strong style={{color:'var(--text-primary)'}}>Total Approved Events:</strong> <span style={{color:'var(--success)',fontWeight:700}}>{overallApproved.toLocaleString()}</span> across all categories.</li>
          <li><strong style={{color:'var(--text-primary)'}}>Outstanding Performance:</strong> Line Reverification shows exceptional results with <span style={{color:'var(--success)',fontWeight:700}}>{totals.reverifications.approved.toLocaleString()}</span> approvals.</li>
        </ul>
      </div>
    </div>
  );
}