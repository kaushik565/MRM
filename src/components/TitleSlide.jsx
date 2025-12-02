import MorphAnimation from './MorphAnimation.jsx';

export default function TitleSlide() {
  return (
    <div style={{width:'98vw',maxWidth:'100%'}} className="center column gap-24">
      <h2 className="h-title" style={{textAlign:'center',fontSize:'2.5em',marginBottom:8}}>MOLBIO DIAGNOSTICS LIMITED</h2>
      <p className="h-sub" style={{textAlign:'center',marginBottom:8}}>Management Review Meeting</p>
      
      <div className="card featured pad-24" style={{textAlign:'center',maxWidth:900,margin:'0 auto'}}>
        <img src="/molbio-black-logo.png" alt="Company Logo" style={{height:100,objectFit:'contain',marginBottom:32}} />
        
        <div style={{padding:'32px 40px',background:'linear-gradient(135deg, var(--accent-red) 0%, var(--accent-red-dark) 100%)',borderRadius:12,marginBottom:32,boxShadow:'0 8px 24px rgba(229,57,53,0.25)'}}>
          <div style={{fontSize:'3em',fontWeight:900,color:'#fff',letterSpacing:'3px',marginBottom:12}}>MRM</div>
          <MorphAnimation />
        </div>
        
        <div style={{padding:'24px 32px',background:'var(--bg-secondary)',borderRadius:10,marginBottom:24,border:'2px solid var(--border-light)'}}>
          <div style={{fontSize:'1.6em',fontWeight:700,color:'var(--text-primary)',marginBottom:8}}>15-16 Dec 2025</div>
        </div>
        
        <div style={{padding:'24px 32px',background:'var(--bg-secondary)',borderRadius:10,borderLeft:'4px solid var(--accent-red)'}}>
          <div style={{fontSize:'1.4em',fontWeight:700,color:'var(--text-primary)',marginBottom:6}}>IPQA - Cartridge Assembly</div>
          <div style={{fontSize:'1.1em',color:'var(--text-secondary)',fontWeight:600}}>SITE-III</div>
        </div>
      </div>
    </div>
  );
}
