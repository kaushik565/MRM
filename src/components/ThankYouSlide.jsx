import MorphAnimation from './MorphAnimation.jsx';

export default function ThankYouSlide() {
  return (
    <div style={{width:'98vw',maxWidth:'100%'}} className="center column gap-24">
      <h2 className="h-title" style={{textAlign:'center'}}>Thank You</h2>
      <p className="h-sub" style={{textAlign:'center',marginBottom:8}}>Demo / Prototype Presentation</p>
      
      <div className="card featured pad-24" style={{textAlign:'center',maxWidth:900,margin:'0 auto'}}>
        <img src="/molbio-black-logo.png" alt="Company Logo" style={{height:80,objectFit:'contain',marginBottom:24}} />
        
        <div style={{padding:'28px 32px',background:'linear-gradient(135deg, var(--accent-red) 0%, var(--accent-red-dark) 100%)',borderRadius:12,marginBottom:28,boxShadow:'0 8px 24px rgba(229,57,53,0.25)'}}>
          <p style={{fontSize:'1.15em',lineHeight:1.9,color:'#fff',fontWeight:500,margin:0}}>
            This is a <strong style={{fontWeight:700,textDecoration:'underline'}}>DEMO/PROTOTYPE</strong> presentation only.<br/>
            Please review these slides and provide feedback.
          </p>
        </div>
        
        <div style={{padding:'24px 28px',background:'var(--bg-secondary)',borderRadius:10,marginBottom:28,border:'2px dashed var(--border-light)'}}>
          <p style={{fontSize:'1.05em',lineHeight:1.8,color:'var(--text-primary)',margin:0,fontWeight:500}}>
            If this format and structure meets your requirements,<br/>
            we will create the final version with <strong style={{color:'var(--accent-red)'}}>accurate and verified data</strong>.
          </p>
        </div>
        
        <MorphAnimation delay={800} />
        
        <div style={{marginTop:32,padding:'20px 28px',background:'var(--bg-secondary)',borderRadius:10,borderLeft:'4px solid var(--accent-red)'}}>
          <div style={{fontSize:'0.95em',color:'var(--text-secondary)',fontWeight:600,marginBottom:8}}>Regards,</div>
          <div style={{fontSize:'1.15em',color:'var(--accent-red)',fontWeight:700,letterSpacing:'0.5px'}}>KAUSHIK</div>
          <div style={{fontSize:'0.85em',color:'var(--text-muted)',marginTop:8}}>IPQA - Cartridge Assembly | SITE-III</div>
        </div>
      </div>
    </div>
  );
}