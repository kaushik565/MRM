import ProductionChart from './ProductionChart';

export default function ProductionSlide({ data }) {
  return (
    <div style={{width:'98vw',maxWidth:'100%'}}>
      <h2 className="h-title">Cartridge Assembly Production</h2>
      <p className="h-sub">Batch Production & Cartridge Assembly Statistics - Year {data.year}</p>
      
      <div className="grid-2" style={{alignItems:'flex-start',gap:28}}>
        <div style={{display:'flex',flexDirection:'column',gap:24}}>
          <div className="card featured pad-24 center">
            <div className="badge success" style={{marginBottom:12}}>⚙️ TOTAL BATCHES RUN</div>
            <div className="metric" style={{fontSize:'4.5em',marginBottom:8}}>{data.batchesTotal}</div>
            <div className="metric-label" style={{fontSize:'1em'}}>Year {data.year}</div>
          </div>
          
          <div className="card pad-24">
            <h3 style={{margin:'0 0 16px',fontSize:'1.2em',fontWeight:700,color:'var(--text-primary)'}}>📊 Production Summary</h3>
            <div style={{display:'grid',gap:12}}>
              <div className="stat-row">
                <span className="label">Total Cartridges</span>
                <strong className="value">{data.cartridgesTotal.toLocaleString()}</strong>
              </div>
              <div className="stat-row highlight">
                <span className="label">Avg Monthly</span>
                <strong className="value">{data.avgMonthly.toLocaleString()}</strong>
              </div>
            </div>
          </div>
          
          <div className="card pad-24">
            <h3 style={{margin:'0 0 16px',fontSize:'1.2em',fontWeight:700,color:'var(--text-primary)'}}>📈 Quarterly Performance</h3>
            <div style={{display:'grid',gap:10}}>
              {Object.entries(data.quarterly).map(([q,v]) => (
                <div key={q} className="stat-row">
                  <span className="label" style={{fontWeight:600}}>{q}</span>
                  <span className="value">{v.value.toLocaleString()} <span style={{color:'var(--accent-red)',fontSize:'0.9em'}}>({v.percent}%)</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card pad-24" style={{height:'100%',minHeight:480,display:'flex',flexDirection:'column'}}>
          <h3 style={{margin:'0 0 18px',fontSize:'1.2em',fontWeight:700,color:'var(--text-primary)'}}>📉 Monthly Production Trend</h3>
          <div className="chart-container" style={{flex:1}}>
            <ProductionChart labels={data.months} data={data.production} />
          </div>
          <div className="highlight-box" style={{marginTop:16}}>
            <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',fontSize:'0.85em'}}>
              <span style={{color:'var(--success)',fontWeight:600}}>📈 Peak: Jan (1.26M)</span>
              <span style={{color:'var(--warning)',fontWeight:600}}>📉 Low: Jul (239K)</span>
              <span style={{color:'var(--accent-red)',fontWeight:600}}>⚠️ Jun: No Production</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
