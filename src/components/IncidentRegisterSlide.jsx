import dynamic from 'next/dynamic';
const PieChart = dynamic(()=>import('./charts/PieChart.jsx'), { ssr:false });

export default function IncidentRegisterSlide({ data }) {
  const reporters = data.reportersDistribution || [];
  const register = data.incidentRegister || [];

  const pieLabels = reporters.map(r => r.name);
  const pieValues = reporters.map(r => r.count);

  return (
    <div style={{width:'98vw',maxWidth:'100%'}}>
      <h2 className="h-title">Detailed Incident Register</h2>
      <p className="h-sub">Reporter contribution & sample register entries</p>

      <div style={{display:'grid',gap:24,gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',marginBottom:28}}>
        <div className="card pad-24" style={{minHeight:380,display:'flex',flexDirection:'column'}}>
          <h3 style={{margin:'0 0 18px',fontSize:'1.15em',fontWeight:700,color:'var(--text-primary)'}}>📈 Reporter Distribution</h3>
          <div className="chart-container" style={{flex:1}}>
            <PieChart labels={pieLabels} values={pieValues} />
          </div>
        </div>
        <div className="card pad-24" style={{display:'flex',flexDirection:'column'}}>
          <h3 style={{margin:'0 0 18px',fontSize:'1.15em',fontWeight:700,color:'var(--text-primary)'}}>👥 Reporter Counts</h3>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:14}}>
            {reporters.map((r, idx) => (
              <div key={r.name} className="stat-card" style={{padding:'12px 14px'}}>
                <div style={{fontWeight:700,color:'var(--text-primary)',fontSize:'0.9em',marginBottom:4}}>{r.name}</div>
                <div className="badge info" style={{fontSize:'0.75em'}}>{r.count} reports</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card pad-24" style={{marginBottom:28}}>
        <h3 style={{margin:'0 0 18px',fontSize:'1.15em',fontWeight:700,color:'var(--text-primary)'}}>📋 Incident Register</h3>
        <div style={{maxHeight:340,overflowY:'auto',border:'1px solid var(--border-light)',borderRadius:10}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.75em'}}>
            <thead style={{position:'sticky',top:0,zIndex:10}}>
              <tr style={{background:'linear-gradient(135deg, var(--accent-red), var(--accent-red-dark))',color:'#fff'}}>
                <th style={{padding:'12px 10px',textAlign:'left',fontWeight:700,fontSize:'0.9em'}}>Date</th>
                <th style={{padding:'12px 10px',textAlign:'left',fontWeight:700,fontSize:'0.9em'}}>IR #</th>
                <th style={{padding:'12px 10px',textAlign:'left',fontWeight:700,fontSize:'0.9em'}}>Dept</th>
                <th style={{padding:'12px 10px',textAlign:'left',fontWeight:700,fontSize:'0.9em'}}>Reporter</th>
                <th style={{padding:'12px 10px',textAlign:'center',fontWeight:700,fontSize:'0.9em'}}>Severity</th>
                <th style={{padding:'12px 10px',textAlign:'left',fontWeight:700,fontSize:'0.9em'}}>Description</th>
              </tr>
            </thead>
            <tbody>
              {register.map((row, idx) => (
                <tr key={row.irNumber} style={{borderBottom:'1px solid var(--border-light)',background: idx % 2 === 0 ? 'transparent' : 'var(--bg-secondary)'}} className="hover-bg">
                  <td style={{padding:'10px',fontWeight:700,color:'var(--text-primary)'}}>{row.date}</td>
                  <td style={{padding:'10px',color:'var(--text-secondary)',fontWeight:600}}>{row.irNumber}</td>
                  <td style={{padding:'10px',color:'var(--text-secondary)'}}>{row.department}</td>
                  <td style={{padding:'10px',color:'var(--text-secondary)'}}>{row.reporter}</td>
                  <td style={{padding:'10px',textAlign:'center'}}>
                    <span className={`badge ${row.severity==='Critical'? '': row.severity==='Major'? 'warning':'info'}`} style={{fontSize:'0.8em',background: row.severity==='Critical' ? 'var(--accent-red)' : undefined, color: row.severity==='Critical' ? '#fff' : undefined}}>
                      {row.severity}
                    </span>
                  </td>
                  <td style={{padding:'10px',color:'var(--text-primary)',minWidth:260}}>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="highlight-box" style={{marginTop:16,fontSize:'0.8em'}}>
          ℹ️ Additional historic entries can be loaded dynamically in future (pagination/virtualization).
        </div>
      </div>
    </div>
  );
}