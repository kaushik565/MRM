export default function TeamSlide({ team }) {
  return (
    <div style={{width:'98vw',maxWidth:'100%'}} className="center column gap-24">
      <h2 className="h-title" style={{textAlign:'center'}}>Our Team</h2>
      <p className="h-sub" style={{textAlign:'center'}}>IPQA - Cartridge Assembly Team Hierarchy</p>
      
      <div className="card featured pad-24" style={{maxWidth:1000,margin:'0 auto',width:'100%'}}>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:32}}>
          {/* Manager - Top Level */}
          <div style={{textAlign:'center',position:'relative',minWidth:280,padding:'24px',background:'linear-gradient(135deg, rgba(229,57,53,0.08), rgba(229,57,53,0.02))',borderRadius:12,border:'2px solid var(--accent-red)'}}>
            <div className="member-avatar" style={{width:90,height:90,borderRadius:'50%',background:'linear-gradient(135deg, var(--accent-red), var(--accent-red-dark))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'1.6em',color:'#fff',margin:'0 auto 14px',boxShadow:'0 8px 24px rgba(229,57,53,0.3)',border:'4px solid #fff'}}>
              {team.manager.initials}
            </div>
            <div className="member-name" style={{fontWeight:800,fontSize:'1.15em',color:'var(--text-primary)',marginBottom:6}}>{team.manager.name}</div>
            <div className="badge" style={{marginTop:8}}>{team.manager.role}</div>
            {/* Connector line down */}
            <div style={{position:'absolute',bottom:-32,left:'50%',transform:'translateX(-50%)',width:3,height:32,background:'linear-gradient(180deg, var(--accent-red), var(--border-medium))'}}></div>
          </div>

          {/* Senior Officer - Second Level */}
          <div style={{textAlign:'center',position:'relative',minWidth:260,padding:'24px',background:'var(--bg-secondary)',borderRadius:12,border:'2px solid var(--accent-red-light)'}}>
            <div className="member-avatar" style={{width:85,height:85,borderRadius:'50%',background:'linear-gradient(135deg, var(--accent-red-dark), var(--accent-red))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'1.5em',color:'#fff',margin:'0 auto 12px',boxShadow:'0 6px 20px rgba(198,40,40,0.3)',border:'3px solid #fff'}}>
              {team.seniorOfficer.initials}
            </div>
            <div className="member-name" style={{fontWeight:700,fontSize:'1.1em',color:'var(--text-primary)',marginBottom:6}}>{team.seniorOfficer.name}</div>
            <div className="badge info" style={{marginTop:8}}>{team.seniorOfficer.role}</div>
            {/* Connector lines down to supervisors */}
            <div style={{position:'absolute',bottom:-32,left:'50%',transform:'translateX(-50%)',width:3,height:32,background:'linear-gradient(180deg, var(--info), var(--border-medium))'}}></div>
          </div>

          {/* Horizontal line for supervisors */}
          <div style={{position:'relative',width:'100%',display:'flex',justifyContent:'center'}}>
            <div style={{position:'absolute',top:-32,left:'50%',transform:'translateX(-50%)',width:Math.min(team.supervisors.length * 220, 800),height:3,background:'var(--border-medium)'}}></div>
          </div>

          {/* Supervisors - Third Level */}
          <div style={{display:'flex',gap:28,justifyContent:'center',flexWrap:'wrap',maxWidth:1000,position:'relative'}}>
            {team.supervisors.map((s, index) => (
              <div key={s.initials} style={{position:'relative'}}>
                {/* Vertical connector to horizontal line */}
                <div style={{position:'absolute',top:-32,left:'50%',transform:'translateX(-50%)',width:3,height:32,background:'var(--border-medium)'}}></div>
                <div style={{textAlign:'center',minWidth:200,padding:'24px',background:'var(--bg-secondary)',borderRadius:12,border:'1px solid var(--border-medium)'}}>
                  <div className="member-avatar" style={{width:75,height:75,borderRadius:'50%',background:'linear-gradient(135deg, var(--info), #42a5f5)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'1.4em',color:'#fff',margin:'0 auto 12px',boxShadow:'0 4px 16px rgba(30,136,229,0.3)',border:'3px solid #fff'}}>
                    {s.initials}
                  </div>
                  <div className="member-name" style={{fontWeight:700,fontSize:'1em',color:'var(--text-primary)',marginBottom:6}}>{s.name}</div>
                  <div className="badge success" style={{marginTop:8,fontSize:'0.7em'}}>{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
