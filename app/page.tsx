'use client';

import { useEffect, useMemo, useState } from 'react';

type Credential = { name: string; year: number; issuer?: string };
type Provider = { id:string; name:string; year:number; position:number; credentials:Credential[] };

const experience = [
  [2009,2012,'Internship Experiences','Horus Consulting Company',2009],
  [2012,2016,'HSBC Global Technology','IT Support Analyst',2012],
  [2016,2018,'Bradesco Bank','Business Intelligence Analyst',2016],
  [2019,null,'Compwire','Big Data Analyst',2019],
  [2019,2020,'Paraná Banco','Data Engineer',2020.3],
  [2020,2021,'Datasprints','Data Engineer / Tech Lead',2021.6],
  [2021,2023,'Americanas','Data Analytics Manager',2022.9],
  [2023,2026,'Capgemini','Data & AI Solution Engineer',2025.55],
] as const;

const education = [
  { start:2009,end:2012,title:'Bachelor of Information Systems' },
  { start:2016,end:2017,title:'Post-Graduate Degree in Big Data & Analytics' },
];

const providers:Provider[] = [
  { id:'ibm',name:'IBM',year:2013,position:2012.8,credentials:[{name:'DB2 9 Fundamentals',year:2013}] },
  { id:'informatica',name:'Informatica',year:2017,position:2014.25,credentials:[{name:'PowerCenter 10: Developer Level 1',year:2017}] },
  { id:'altair',name:'Altair',year:2019,position:2015.7,credentials:[{name:'RapidMiner Professional Certification',year:2019}] },
  { id:'aws',name:'AWS',year:2021,position:2017.15,credentials:[
    {name:'AWS Technical Essentials',year:2020},{name:'AWS Community Builder',year:2023},{name:'Generative AI for Executives',year:2023},
  ]},
  { id:'microsoft',name:'Microsoft',year:2021,position:2018.6,credentials:[
    {name:'Azure Data Fundamentals',year:2021},{name:'Become an AI-Powered People Manager',year:2022},
  ]},
  { id:'finops',name:'FinOps',year:2022,position:2020.05,credentials:[
    {name:'Cloud FinOps',year:2022,issuer:'Intel'},{name:'Introduction to FOCUS',year:2022,issuer:'FinOps Foundation'},
  ]},
  { id:'leadership',name:'Leadership & Strategy',year:2022,position:2021.5,credentials:[
    {name:'Connected Manager',year:2022,issuer:'Harvard Business School'},{name:'Strategic Foresight',year:2022,issuer:'FGV'},{name:'Become an AI-Powered People Manager',year:2022,issuer:'Microsoft'},
  ]},
  { id:'dbt',name:'dbt Labs',year:2026,position:2022.95,credentials:[{name:'DBT Fundamentals',year:2026}] },
  { id:'databricks',name:'Databricks',year:2025,position:2024.4,credentials:[
    {name:'Azure Databricks Platform Architect',year:2025},{name:'AI Security Fundamentals',year:2025},{name:'Advantages of Expanding EDW with Data Intelligence',year:2025},{name:'Cloud Native SPARK Migration (Verified)',year:2025},{name:'Spark Migration',year:2025},{name:'Data & AI Governance with Unity Catalog (Verified)',year:2025},{name:'Generative AI Fundamentals',year:2025},{name:'Gen AI & LLM on Databricks',year:2025},{name:'Gen AI & LLM on Databricks (Verified)',year:2025},{name:'Advantages of Azure Databricks & Microsoft Fabric',year:2025},{name:'Energy Industry Specialization for Gen AI & LLM',year:2025},{name:'Advantages of Gen AI with Data Intelligence',year:2025},{name:'Advantages of Being GTM Ready and the Art of the Possible',year:2025},{name:'Advantages of Data Intelligence & Interoperability with SAP',year:2025},{name:'2025 Data + AI Summit Product Announcement Enablement for Partners',year:2025},
  ]},
  { id:'openai',name:'OpenAI',year:2026,position:2025.85,credentials:[
    {name:'OpenAI Foundational',year:2026},{name:'ChatGPT Technical Practitioner',year:2026},{name:'Codex Deployment Practitioner',year:2026},{name:'AI Technical Practitioner',year:2026},
  ]},
];

const years=Array.from({length:18},(_,i)=>2009+i);
const x=(year:number)=>`${((year-2009)/17)*100}%`;

export default function Home(){
  const [activeId,setActiveId]=useState<string|null>(null);
  const active=useMemo(()=>providers.find(p=>p.id===activeId)??null,[activeId]);
  useEffect(()=>{const close=(e:KeyboardEvent)=>e.key==='Escape'&&setActiveId(null);window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[]);
  return <main className="career-page">
    <header className="nameplate"><strong>DIEGO LOPES</strong><span>Data &amp; AI Engineer</span></header>
    <section className="timeline-shell" aria-label="Diego Lopes career timeline from 2009 to 2026">
      <div className="years" aria-hidden="true">{years.map(year=><span key={year} style={{left:x(year)}}>{year}</span>)}</div>
      <div className="grid" aria-hidden="true">{years.map(year=><i key={year} style={{left:x(year)}}/>)}</div>
      <section className="route experience-route" aria-label="Professional experience"><div className="route-line"/>
        {experience.map(([start,end,company,role,position],index)=><article className={`experience-stop stop-${index}`} key={`${company}-${start}`} style={{left:x(position)}}><span className="station"/><div><b>{start}{end?` – ${end}`:''}</b><strong>{company}</strong><small>{role}</small></div></article>)}
      </section>
      <section className="route education-route" aria-label="Education"><div className="route-line"/>
        {education.map(item=><article className="education-stop" key={item.title} style={{left:x(item.start)}}><span className="education-icon" aria-hidden="true">◆</span><div><b>{item.start} – {item.end}</b><strong>{item.title}</strong></div></article>)}
      </section>
      <section className="route credential-route" aria-label="Certifications and credentials"><div className="route-line"/>
        {providers.map((provider,index)=><button type="button" className={`provider-stop provider-${index} ${activeId===provider.id?'is-active':''}`} key={provider.id} style={{left:x(provider.position)}} onClick={()=>setActiveId(provider.id)} aria-expanded={activeId===provider.id} aria-controls="credential-panel"><span className="credential-icon" aria-hidden="true">▤</span><span className="provider-copy"><strong>{provider.name}</strong><small>{provider.credentials.length} {provider.credentials.length===1?'credential':'credentials'}</small></span></button>)}
      </section>
    </section>
    <section className="career-stats" aria-label="Career totals">
      <div className="career-stat certification-stat"><strong>52</strong><span>Tech certifications</span></div>
      <div className="career-stat experience-stat"><strong>10</strong><span>Professional experiences</span></div>
      <div className="career-stat years-stat"><strong>15</strong><span>Years in IT-related roles</span></div>
    </section>
    <div className={`drawer-backdrop ${active?'is-open':''}`} onClick={()=>setActiveId(null)} aria-hidden="true"/>
    <aside id="credential-panel" className={`credential-drawer ${active?'is-open':''}`} aria-live="polite" aria-label={active?`${active.name} certifications`:'Certification details'}>
      {active&&<><div className="drawer-head"><div><span className="drawer-kicker">Credential station · {active.year}</span><h2>{active.name}</h2><p>{active.credentials.length} {active.credentials.length===1?'credential':'credentials'}</p></div><button type="button" className="close-button" onClick={()=>setActiveId(null)} aria-label="Close certification details">×</button></div>
      <ol className="credential-list">{active.credentials.map((credential,index)=><li key={`${credential.name}-${index}`}><span>{String(index+1).padStart(2,'0')}</span><div><strong>{credential.name}</strong>{credential.issuer&&<small>{credential.issuer}</small>}</div><time>{credential.year}</time></li>)}</ol></>}
    </aside>
  </main>
}
