import { useState, useEffect, useCallback, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  LayoutDashboard, FileText, Award, Clock, Archive, Package, LogOut,
  Menu, Lock, Eye, EyeOff, ChevronRight, ChevronDown, AlertTriangle,
  ExternalLink, Users, BookOpen, Shield, Wallet, RefreshCw,
  Wifi, WifiOff, Loader2, Info, Building2, CheckCircle2, XCircle,
  Download, Map, Leaf, Home, Droplets
} from "lucide-react";


const APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbzALeGBww1zrIACfztHNcEVoCGU2CAwUPfvtreFvA-eEYfZYdGQnTNUzAQ_abK2rqjo/exec";
const AUTO_MS=5*60*1000;
const PWD_MAIN="KANWILGTO2026";
const PWD_TIM="TIMKENDALI2026";

// Spreadsheet IDs — dari PDF Link_master_dashboard.pdf
const ID={
  shat:"1c96_FSH8QYZTkbUsUAGIW0Id7tPQ6m0j",
  pbtFoto:"1gSVp4yeTNYF_VN2xuwuwBBXYojW9bew8LOp4qgs-IoQ",
  bmnResidu:"1nTXAZRWwC0fEnaKDRRs6nl07FJoFY_j5v1o_kTaAUEI",
  redistribusi:"1B4jowidXtWvJzlmhkwu3xYKBoHNckeNRLwajx1mrqYo",
  gtraAkses:"17zpIprvzwhzczS2dCliL9O7RiGl0OyIvkyRyS9xIMM",
  wakaf:"1FNRf83X6YaJTZ9UahxamKAXwvTDCeq6BPmM_sFThslc",
  layanan7:"1jZcNXnAB5LTSEmOwlJuYNOgbEe73Wfe",
  tunggakan:"1DKcDAZH5X2En5aUXoBUHnLCGpZ6eCe14",
  keuangan:"1f6jHetDX0zY835v2ZuFS2GgXUTSLkiH8CSWaszNjGQ",
  timeline:"1-jWfXPFkhY6myWHoDr3zwYsnaFHypPP43h3yApsFnVM",
  bahan:"1nKovJ4stzhQ3cPd2gs3lLtuYwb5nqnL",
  lkeKanwil:"149xqmjD_JFZhHfEZvqvDWUFdrADeDz76",
  lkeKota:"1vOvxeS8PGi0SXLt6RK5o8VjJeCpmFpcI",
  lkeKabGor:"1iSeqpRnJYPUlG9Ac0q_WzU2kOeMg3XBS",
  lkeGorut:"1h_sd5-WOkXpDU39WxVb2dNa9doJz50pB",
  lkeBone:"1HZmja7Q8NRiammXFv8km6scL0_yHSoZ",
  lkeBoalemo:"1qHwoD2meA7v3IWSDTFWufXdUMhpomwce",
  lkePohuwato:"1lvIN50",
};
const gs=x=>`https://docs.google.com/spreadsheets/d/${x}`;
const gp=x=>`https://docs.google.com/presentation/d/${x}`;
const L={
  shat:`${gs(ID.shat)}/edit?gid=1627414568`,
  pbt:`${gs(ID.pbtFoto)}/edit?gid=1817094701&range=A1:Q10`,
  foto:`${gs(ID.pbtFoto)}/edit?gid=1817094701&range=A1:Q11`,
  bmn:`${gs(ID.bmnResidu)}/edit?gid=1783707587`,
  residu:`${gs(ID.bmnResidu)}/edit?gid=1783707587`,
  redistribusi:`${gs(ID.redistribusi)}/edit?gid=1644893587&range=C5:X10`,
  gtra:`${gs(ID.gtraAkses)}/edit?gid=1684816552&range=A1:R6`,
  akses:`${gs(ID.gtraAkses)}/edit?gid=1684816552`,
  wakafRekap:`${gs(ID.wakaf)}/edit?gid=0`,
  wakafProg:`${gs(ID.wakaf)}/edit?gid=1`,
  layKanwil:`${gs(ID.layanan7)}/edit?gid=830324875`,
  layKantah:`${gs(ID.layanan7)}/edit?gid=830324875`,
  tungRutin:`${gs(ID.tunggakan)}/edit?gid=1852758891&range=B2:G13`,
  tungProg:`${gs(ID.tunggakan)}/edit?gid=1852758891&range=B2:G13`,
  keuangan:`${gs(ID.keuangan)}/edit?gid=1701500196`,
  timeline:`${gs(ID.timeline)}/edit`,
  bahan:`${gp(ID.bahan)}/edit`,
  bahanEmbed:`${gp(ID.bahan)}/embed?start=false&loop=false&delayms=5000`,
  bahanPdf:`${gp(ID.bahan)}/export/pdf`,
  lkeKanwil:`${gs(ID.lkeKanwil)}/edit?gid=2093962558`,
  lkeKota:`${gs(ID.lkeKota)}/edit?gid=1039469721`,
  lkeKabGor:`${gs(ID.lkeKabGor)}/edit?gid=324511525`,
  lkeGorut:`${gs(ID.lkeGorut)}/edit?gid=1454550944`,
  lkeBone:`${gs(ID.lkeBone)}/edit?gid=143333334`,
  lkeBoalemo:`${gs(ID.lkeBoalemo)}/edit?gid=1454550944`,
  lkePohuwato:`${gs(ID.lkePohuwato)}/edit`,
};

// Target Daerah dari TABEL RENAKSI 2026
const RNK={
  shat:{"Kota Gorontalo":100,"Kab. Gorontalo":1031,"Kab. Gorut":300,"Kab. Pohuwato":500,"Kab. Boalemo":578,"Kab. Bone Bolango":500},
  pbt:{"Kab. Gorontalo":850,"Kab. Bone Bolango":750,"Kab. Pohuwato":948,"Kab. Boalemo":750},
  foto:{"Kab. Gorontalo":850,"Kab. Bone Bolango":750,"Kab. Pohuwato":948,"Kab. Boalemo":750},
  redistrib:{"Kab. Gorontalo":500,"Kab. Pohuwato":100,"Kab. Boalemo":250},
  lintor:{"Kab. Pohuwato":100,"Kab. Boalemo":100},
  wakaf:{"Kota Gorontalo":7},
  tungg:{"Kota Gorontalo":21},
  residu:{"Kota Gorontalo":37},
};

// Deadline PPP per program — fleksibel, idealnya dari sheet Timeline
const DL={
  shat:new Date("2026-07-31"),
  pbt:new Date("2026-07-31"),
  foto:new Date("2026-07-31"),
  lintor:new Date("2026-09-24"),
  redistrib:new Date("2026-12-31"),
  gtra:new Date("2026-12-31"),
  akses:new Date("2026-12-31"),
  wakaf:new Date("2026-12-31"),
  layanan:new Date("2026-12-31"),
  tunggakan:new Date("2026-12-31"),
  residu:new Date("2026-12-31"),
  bmn:new Date("2026-12-31"),
  zi:new Date("2026-12-31"),
  keuangan:new Date("2026-12-31"),
};

const LKE_LIST=[
  {nama:"Kanwil BPN Gorontalo",lnk:L.lkeKanwil},
  {nama:"Kantah Kota Gorontalo",lnk:L.lkeKota},
  {nama:"Kantah Kab. Gorontalo",lnk:L.lkeKabGor},
  {nama:"Kantah Kab. Gorontalo Utara",lnk:L.lkeGorut},
  {nama:"Kantah Kab. Bone Bolango",lnk:L.lkeBone},
  {nama:"Kantah Kab. Boalemo",lnk:L.lkeBoalemo},
  {nama:"Kantah Kab. Pohuwato",lnk:L.lkePohuwato},
];

// UTILS
const TODAY=new Date("2026-03-09");
const fn=n=>n==null||n===""?"—":Number(n).toLocaleString("id-ID");
const fd=d=>d?new Date(d).toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"}):"—";
const fs=d=>d?new Date(d).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"}):"—";
const dsi=d=>d?Math.floor((Date.now()-new Date(d))/86400000):999;
function calD(dl){return Math.max(0,Math.ceil((dl-TODAY)/86400000));}
function wrkD(dl){let c=0,d=new Date(TODAY);d.setDate(d.getDate()+1);while(d<=dl){if(d.getDay()!==0&&d.getDay()!==6)c++;d.setDate(d.getDate()+1);}return c;}



function useLive(){
  const[data,setData]=useState(null);
  const[st,setSt]=useState("loading");
  const[lf,setLf]=useState(null);
  const[cd,setCd]=useState(AUTO_MS/1000);
  const t1=useRef(),t2=useRef();
  const go=useCallback(async()=>{
    setSt("loading");
    try{
      const r=await fetch(APPS_SCRIPT_URL,{cache:"no-store"});
      if(!r.ok)throw 0;
      const j=await r.json();
      setData(j);setSt(j.ok?"ok":"error");
    }catch{setSt("offline");}
    setLf(new Date());setCd(AUTO_MS/1000);
  },[]);
  useEffect(()=>{go();},[go]);
  useEffect(()=>{t1.current=setInterval(go,AUTO_MS);return()=>clearInterval(t1.current);},[go]);
  useEffect(()=>{t2.current=setInterval(()=>setCd(n=>n<=1?AUTO_MS/1000:n-1),1000);return()=>clearInterval(t2.current);},[]);
  return{data,st,lf,cd,go};
}

function Bdg({d}){
  if(!d)return<span className="text-slate-600 text-[10px] italic">belum update</span>;
  const n=dsi(d);
  const[dot,c]=n<=3?["🟢","text-emerald-400 bg-emerald-900/40 border-emerald-700"]:n<=14?["🟡","text-amber-400 bg-amber-900/40 border-amber-700"]:["🔴","text-rose-400 bg-rose-900/40 border-rose-700"];
  return<span className={`inline-flex items-center gap-1 border rounded text-[10px] px-1.5 py-0.5 ${c}`}>{dot}{fs(d)}</span>;
}
function MBar({v,max=100,color="#22d3ee"}){
  const w=max>0?Math.min(100,v/max*100):0;
  return<div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden"><div className="h-full rounded-full" style={{width:`${w}%`,background:color}}/></div>;
}
function Lnk({href,label="Buka",sm}){
  if(!href||href.endsWith("/edit"))return<span className="text-slate-700 text-[10px] italic">—</span>;
  return<a href={href} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 ${sm?"text-[10px] px-1.5 py-0.5":"text-xs px-2 py-1"} bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/20`}><ExternalLink size={sm?9:11}/>{label}</a>;
}
function Head({title,sub,date,link}){
  return(
    <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
      <div>
        <h2 className="text-white font-bold text-base">{title}</h2>
        {sub&&<p className="text-slate-500 text-xs">{sub}</p>}
        {date&&<p className="text-slate-600 text-[11px]">Update: {fd(date)}</p>}
      </div>
      <div className="flex items-center gap-2">{date&&<Bdg d={date}/>}{link&&<Lnk href={link}/>}</div>
    </div>
  );
}
function CDown({dlKey,achieved=0,tD,label}){
  if(!tD||typeof tD!=="number")return null;
  const dl=DL[dlKey]||DL.keuangan;
  const cal=calD(dl),wrk=wrkD(dl);
  const pct=tD>0?Math.min(100,Math.round(achieved/tD*100)):0;
  const urg=cal<60;
  const bc=urg?"border-rose-700/50 bg-rose-900/20":"border-amber-700/40 bg-amber-900/10";
  const tc=urg?"text-rose-400":"text-amber-300";
  const dlStr=dl.toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"});
  return(
    <div className={`rounded-xl border px-4 py-3 mb-4 ${bc}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className={`font-bold text-sm ${tc}`}>⏳ {label||"Deadline Target Daerah"}</p>
          <p className="text-slate-500 text-xs">Batas: {dlStr} · {cal} hari kalender · {wrk} hari kerja</p>
        </div>
        <div className="flex gap-4 text-center">
          <div><p className={`text-2xl font-black ${tc}`}>{pct}%</p><p className="text-slate-500 text-[10px]">capaian</p></div>
          <div><p className="text-2xl font-black text-slate-400">{100-pct}%</p><p className="text-slate-500 text-[10px]">sisa</p></div>
          <div><p className={`text-2xl font-black ${tc}`}>{cal}</p><p className="text-slate-500 text-[10px]">hari kal.</p></div>
          <div><p className={`text-2xl font-black ${tc}`}>{wrk}</p><p className="text-slate-500 text-[10px]">hari kerja</p></div>
        </div>
      </div>
      <div className="mt-2"><MBar v={achieved} max={tD} color={urg?"#f87171":"#fbbf24"}/></div>
    </div>
  );
}
function TTgl({mode,set}){
  return(
    <div className="flex items-center gap-2 flex-wrap mb-4">
      <span className="text-slate-500 text-xs font-medium">Target:</span>
      {[["nasional","Nasional"],["daerah","Daerah (Renaksi PPP)"]].map(([k,l])=>(
        <button key={k} onClick={()=>set(k)} className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${mode===k?"bg-cyan-900/50 border-cyan-600 text-cyan-300":"bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"}`}>{l}</button>
      ))}
      {mode==="daerah"&&<span className="text-[10px] text-amber-400 bg-amber-900/20 border border-amber-700/30 rounded-lg px-2 py-1">Target Rencana Aksi 2026</span>}
    </div>
  );
}
function Empty({link,label}){
  return(
    <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-10 text-center">
      <AlertTriangle size={28} className="text-amber-500 mx-auto mb-3"/>
      <p className="text-slate-400 font-medium text-sm">Data belum tersedia dari Apps Script</p>
      <p className="text-slate-600 text-xs mt-1 mb-4">Perbarui Apps Script atau buka spreadsheet langsung</p>
      {link&&<Lnk href={link} label={label||"Buka Spreadsheet"}/>}
    </div>
  );
}
function SBar({st,lf,cd,go}){
  const m=Math.floor(cd/60),s=cd%60;
  const cfg={
    loading:{i:<Loader2 size={11} className="animate-spin"/>,t:"Mengambil data…",c:"text-cyan-400 bg-cyan-900/10 border-cyan-800/30"},
    ok:{i:<Wifi size={11}/>,t:`Live dari Google Sheets · refresh ${m}:${String(s).padStart(2,"0")}`,c:"text-emerald-400 bg-emerald-900/10 border-emerald-800/30"},
    error:{i:<AlertTriangle size={11}/>,t:"Apps Script error — periksa deployment",c:"text-amber-400 bg-amber-900/10 border-amber-800/30"},
    offline:{i:<WifiOff size={11}/>,t:"Tidak terhubung — menampilkan data terakhir",c:"text-rose-400 bg-rose-900/10 border-rose-800/30"},
  }[st]||{};
  return(
    <div className={`flex items-center justify-between px-3 py-1.5 border-b border-t ${cfg.c}`}>
      <div className="flex items-center gap-2 text-[10px] font-medium">
        {cfg.i}<span>{cfg.t}</span>
        {lf&&st!=="loading"&&<span className="text-slate-700">· {lf.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span>}
      </div>
      <button onClick={go} className="flex items-center gap-1 text-[10px] text-slate-600 hover:text-white px-2 py-0.5 rounded hover:bg-slate-700"><RefreshCw size={9}/>Refresh</button>
    </div>
  );
}
function Skel(){return<div className="space-y-3 animate-pulse">{[80,160,160,120].map((h,i)=><div key={i} className="bg-slate-800 rounded-2xl" style={{height:h}}/>)}</div>;}
function InfoBox({color,text}){
  const c={blue:"bg-sky-900/20 border-sky-700/30 text-sky-300",amber:"bg-amber-900/20 border-amber-700/30 text-amber-300",indigo:"bg-indigo-900/20 border-indigo-700/30 text-indigo-300",green:"bg-emerald-900/20 border-emerald-700/30 text-emerald-300"}[color]||"bg-slate-800 border-slate-700 text-slate-400";
  return<div className={`border rounded-xl p-3 mb-4 flex gap-2 ${c}`}><Info size={12} className="flex-shrink-0 mt-0.5"/><p className="text-xs">{text}</p></div>;
}
function SimpleTable({cols,rows}){
  return(
    <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
      <table className="w-full text-xs" style={{minWidth:420}}>
        <thead className="border-b border-slate-700"><tr>{cols.map(c=><th key={c} className="px-3 py-2.5 text-left text-[10px] font-medium text-slate-500">{c}</th>)}</tr></thead>
        <tbody>{rows.map((r,i)=><tr key={i} className="border-b border-slate-800 hover:bg-slate-700/10">{r.map((v,j)=><td key={j} className={`px-3 py-2.5 ${j===0?"text-slate-200 font-medium":"text-slate-400"}`}>{v}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}



function Overview({data}){
  const shat=data?.shat?.kantah||[];
  const totK1=shat.reduce((a,r)=>a+(r.k1||0),0);
  const programs=[
    {k:"shat",l:"PTSL SHAT",cap:totK1,tD:Object.values(RNK.shat).reduce((a,b)=>a+b,0),unit:"bid",upd:data?.shat?.lastMod},
    {k:"pbt",l:"PBT PTSL",cap:null,tD:Object.values(RNK.pbt).reduce((a,b)=>a+b,0),unit:"bid",upd:data?.pbt?.lastMod},
    {k:"foto",l:"Foto Tegak",cap:null,tD:Object.values(RNK.foto).reduce((a,b)=>a+b,0),unit:"bid",upd:data?.foto?.lastMod},
    {k:"redistrib",l:"Redistribusi Tanah",cap:null,tD:850,unit:"bid",upd:data?.redistrib?.lastMod},
    {k:"gtra",l:"GTRA",cap:null,tD:null,unit:"laporan",upd:data?.gtra?.lastMod},
    {k:"akses",l:"Akses Reform",cap:null,tD:null,unit:"KK",upd:data?.akses?.lastMod},
    {k:"wakaf",l:"Sertipikasi Wakaf",cap:null,tD:7,unit:"bid",upd:data?.wakafRekap?.lastMod},
    {k:"layanan",l:"7 Layanan Prioritas",cap:null,tD:null,unit:"%",upd:data?.layanan?.lastMod},
    {k:"tunggakan",l:"Tunggakan Rutin",cap:null,tD:null,unit:"berkas",upd:data?.tunggakan?.lastMod},
    {k:"residu",l:"Residu PTSL",cap:null,tD:null,unit:"bid",upd:data?.residu?.lastMod},
    {k:"bmn",l:"BMN",cap:null,tD:null,unit:"—",upd:null},
    {k:"lintor",l:"Lintor",cap:null,tD:200,unit:"bid",upd:data?.lintor?.lastMod},
    {k:"zi",l:"Zona Integritas (LKE)",cap:null,tD:null,unit:"—",upd:null},
    {k:"keuangan",l:"Keuangan",cap:null,tD:null,unit:"—",upd:null},
  ];
  return(
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><h2 className="text-white font-bold text-lg">Overview — Semua Program 2026</h2><p className="text-slate-500 text-xs">Kanwil BPN Provinsi Gorontalo</p></div>
        <Lnk href={L.timeline} label="Timeline PPP"/>
      </div>
      <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
        <table className="w-full text-xs" style={{minWidth:640}}>
          <thead className="border-b border-slate-700"><tr>{["Program","Target Daerah","Capaian","Progress","Deadline PPP","Sisa Hari","Update"].map(h=><th key={h} className="px-3 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
          <tbody>
            {programs.map(p=>{
              const dl=DL[p.k]||DL.keuangan;
              const cal=calD(dl);
              const pct=p.cap!=null&&p.tD?Math.min(100,Math.round(p.cap/p.tD*100)):null;
              const urg=cal<60;
              const c=pct==null?"#475569":pct>=80?"#34d399":pct>=40?"#fbbf24":"#f87171";
              return(
                <tr key={p.k} className="border-b border-slate-800 hover:bg-slate-700/10">
                  <td className="px-3 py-2.5 text-slate-200 font-medium">{p.l}</td>
                  <td className="px-3 py-2.5 text-slate-400">{p.tD?`${fn(p.tD)} ${p.unit}`:"—"}</td>
                  <td className="px-3 py-2.5" style={{color:c}}>{p.cap!=null?`${fn(p.cap)} ${p.unit}`:<span className="text-slate-700 text-[10px] italic">belum tersedia</span>}</td>
                  <td className="px-3 py-2.5 w-24">{pct!=null?<div className="flex items-center gap-1.5"><MBar v={pct} max={100} color={c}/><span style={{color:c}} className="font-bold text-[10px]">{pct}%</span></div>:<div className="w-16 h-1.5 rounded-full bg-slate-800"/>}</td>
                  <td className="px-3 py-2.5 text-slate-500 text-[10px]">{dl.toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"})}</td>
                  <td className={`px-3 py-2.5 font-bold text-[11px] ${urg?"text-rose-400":"text-slate-400"}`}>{cal}</td>
                  <td className="px-3 py-2.5"><Bdg d={p.upd}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {shat.length>0&&(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3"><p className="text-sm font-semibold text-white">PTSL SHAT — Progress per Kantah</p><Lnk href={L.shat} sm/></div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={shat.map(r=>({name:r.kantah?.replace("Kab. ","").replace("Kota ",""),"T.Nas":r.targetNasional||r.targetPusat||0,"T.Daerah":RNK.shat[r.kantah]||0,Puldadis:r.puldadis||0,"K1/SHAT":r.k1||0}))} barSize={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
              <XAxis dataKey="name" tick={{fill:"#94a3b8",fontSize:9}}/><YAxis tick={{fill:"#94a3b8",fontSize:10}}/>
              <Tooltip contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:11}}/>
              <Legend wrapperStyle={{fontSize:10}}/>
              <Bar dataKey="T.Nas" fill="#1e3a5f" radius={[2,2,0,0]}/><Bar dataKey="T.Daerah" fill="#334155" radius={[2,2,0,0]}/>
              <Bar dataKey="Puldadis" fill="#818cf8" radius={[2,2,0,0]}/><Bar dataKey="K1/SHAT" fill="#34d399" radius={[2,2,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function SHATPage({data}){
  const[mode,setMode]=useState("nasional");
  const rows=data?.shat?.kantah||[];
  const totN=rows.reduce((a,r)=>a+(r.targetNasional||r.targetPusat||0),0);
  const totD=Object.values(RNK.shat).reduce((a,b)=>a+b,0);
  const totK1=rows.reduce((a,r)=>a+(r.k1||0),0);
  return(
    <div>
      <Head title="PTSL SHAT 2026" sub="PTSL 2026.xlsx — sheet: Dashboard" date={data?.shat?.lastMod} link={L.shat}/>
      <TTgl mode={mode} set={setMode}/>
      {mode==="daerah"&&<CDown dlKey="shat" achieved={totK1} tD={totD} label="PTSL SHAT — batas Juli 2026"/>}
      {rows.length===0?<Empty link={L.shat} label="Buka PTSL 2026.xlsx"/>:(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
          <table className="w-full text-xs" style={{minWidth:680}}>
            <thead className="border-b border-slate-700"><tr>{["Kantah",`Target ${mode==="nasional"?"Nasional":"Daerah"}`,mode==="nasional"?"(Daerah)":"(Nasional)","Puldadis","Pemberkasan","Pot.K1","K1/SHAT","Diserahkan","%"].map(h=><th key={h} className="px-3 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
            <tbody>
              {rows.map(r=>{
                const tN=r.targetNasional||r.targetPusat||0,tD=RNK.shat[r.kantah]||tN;
                const ref=mode==="nasional"?tN:tD,alt=mode==="nasional"?tD:tN;
                const pct=ref>0?Math.round((r.k1||0)/ref*100):0;
                const c=pct>=40?"#34d399":pct>0?"#fbbf24":"#f87171";
                return<tr key={r.kantah} className="border-b border-slate-800 hover:bg-slate-700/20">
                  <td className="px-3 py-2.5 text-slate-200 font-medium">{r.kantah}</td>
                  <td className="px-3 py-2.5 text-white font-bold">{fn(ref)}</td>
                  <td className="px-3 py-2.5 text-slate-600 text-[10px]">{fn(alt)}</td>
                  <td className="px-3 py-2.5 text-slate-300">{fn(r.puldadis)}</td>
                  <td className="px-3 py-2.5 text-slate-300">{fn(r.pemberkasan)}</td>
                  <td className="px-3 py-2.5 text-slate-400">{fn(r.potensiK1)}</td>
                  <td className="px-3 py-2.5 font-bold text-white">{fn(r.k1)}</td>
                  <td className="px-3 py-2.5 text-white">{fn(r.diserahkan)}</td>
                  <td className="px-3 py-2.5"><span style={{color:c}} className="font-bold">{pct}%</span></td>
                </tr>;
              })}
              <tr className="bg-slate-700/30 font-bold border-t-2 border-slate-600">
                <td className="px-3 py-2 text-slate-300">TOTAL</td>
                <td className="px-3 py-2 text-white">{fn(mode==="nasional"?totN:totD)}</td>
                <td className="px-3 py-2 text-slate-500">{fn(mode==="nasional"?totD:totN)}</td>
                <td className="px-3 py-2 text-white">{fn(rows.reduce((a,r)=>a+(r.puldadis||0),0))}</td>
                <td className="px-3 py-2 text-white">{fn(rows.reduce((a,r)=>a+(r.pemberkasan||0),0))}</td>
                <td className="px-3 py-2">{fn(rows.reduce((a,r)=>a+(r.potensiK1||0),0))}</td>
                <td className="px-3 py-2 text-white">{fn(totK1)}</td>
                <td className="px-3 py-2 text-white">{fn(rows.reduce((a,r)=>a+(r.diserahkan||0),0))}</td>
                <td className="px-3 py-2 text-amber-400 font-black">{(mode==="nasional"?totN:totD)>0?Math.round(totK1/(mode==="nasional"?totN:totD)*100):0}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PBTPage({sub,data}){
  const[mode,setMode]=useState("nasional");
  const isFoto=sub==="foto";
  const rnk=isFoto?RNK.foto:RNK.pbt;
  const dlKey=isFoto?"foto":"pbt";
  const lnk=isFoto?L.foto:L.pbt;
  const rows=isFoto?(data?.fotoTegak?.kantah||[]):(data?.pbt?.kantah||[]);
  const totD=Object.values(rnk).reduce((a,b)=>a+b,0);
  const totCap=rows.reduce((a,r)=>a+(r.realisasi||r.capaian||0),0);
  const sheetNm=isFoto?"FOTO TEGAK":"PBT PTSL";
  return(
    <div>
      <Head title={isFoto?"Foto Tegak PTSL / Foto Drone":"PBT PTSL 2026"} sub={`Rekap PBT PTSL — sheet: ${sheetNm}`} date={isFoto?data?.fotoTegak?.lastMod:data?.pbt?.lastMod} link={lnk}/>
      <TTgl mode={mode} set={setMode}/>
      {mode==="daerah"&&<CDown dlKey={dlKey} achieved={totCap} tD={totD} label={`${isFoto?"Foto Tegak":"PBT PTSL"} — batas Juli 2026`}/>}
      {rows.length===0?<Empty link={lnk} label={`Buka sheet ${sheetNm}`}/>:(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
          <table className="w-full text-xs" style={{minWidth:480}}>
            <thead className="border-b border-slate-700"><tr>{["Kantah",`Target ${mode==="nasional"?"Nasional":"Daerah"}`,mode==="nasional"?"(Daerah)":"(Nasional)","Realisasi","%"].map(h=><th key={h} className="px-3 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
            <tbody>{rows.map(r=>{
              const tD=rnk[r.kantah],tN=r.targetNasional||r.target||0;
              const ref=mode==="nasional"?tN:(tD||tN),alt=mode==="nasional"?(tD||"—"):tN;
              const cap=r.realisasi||r.capaian||0,pct=ref>0?Math.round(cap/ref*100):0;
              const c=pct>=40?"#34d399":pct>0?"#fbbf24":"#f87171";
              return<tr key={r.kantah} className="border-b border-slate-800 hover:bg-slate-700/20">
                <td className="px-3 py-2.5 text-slate-200 font-medium">{r.kantah}</td>
                <td className="px-3 py-2.5 font-bold text-white">{fn(ref)}</td>
                <td className="px-3 py-2.5 text-slate-600 text-[10px]">{fn(alt)}</td>
                <td className="px-3 py-2.5 text-slate-300">{fn(cap)}</td>
                <td className="px-3 py-2.5"><span style={{color:c}} className="font-bold">{pct}%</span></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RedistribusiPage({data}){
  const[mode,setMode]=useState("nasional");
  const rows=data?.redistrib?.kantah||[];
  const totD=Object.values(RNK.redistrib).reduce((a,b)=>a+b,0);
  const totCap=rows.reduce((a,r)=>a+(r.realisasi||0),0);
  return(
    <div>
      <Head title="Redistribusi Tanah 2026" sub="Redistribusi Tanah & Reforma Agraria — sheet: Redis Kantah" date={data?.redistrib?.lastMod} link={L.redistribusi}/>
      <TTgl mode={mode} set={setMode}/>
      {mode==="daerah"&&<CDown dlKey="redistrib" achieved={totCap} tD={totD} label="Redistribusi Tanah"/>}
      {rows.length===0?<Empty link={L.redistribusi}/>:(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
          <table className="w-full text-xs" style={{minWidth:480}}>
            <thead className="border-b border-slate-700"><tr>{["Kantah","Target","(Alt)","Realisasi","%"].map(h=><th key={h} className="px-3 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
            <tbody>{rows.map(r=>{
              const tD=RNK.redistrib[r.kantah],tN=r.targetNasional||r.target||0;
              const ref=mode==="daerah"?(tD||tN):tN,cap=r.realisasi||0,pct=ref>0?Math.round(cap/ref*100):0;
              const c=pct>=40?"#34d399":pct>0?"#fbbf24":"#f87171";
              return<tr key={r.kantah} className="border-b border-slate-800 hover:bg-slate-700/20">
                <td className="px-3 py-2.5 text-slate-200 font-medium">{r.kantah}</td>
                <td className="px-3 py-2.5 font-bold text-white">{fn(ref)}</td>
                <td className="px-3 py-2.5 text-slate-600 text-[10px]">{fn(mode==="daerah"?tN:(tD||"—"))}</td>
                <td className="px-3 py-2.5 text-slate-300">{fn(cap)}</td>
                <td className="px-3 py-2.5"><span style={{color:c}} className="font-bold">{pct}%</span></td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function GtraPage({sub,data}){
  const isAkses=sub==="akses";
  const rows=isAkses?(data?.akses?.kantah||[]):(data?.gtra?.kantah||[]);
  const rnk=isAkses?RNK.akses:RNK.gtra;
  const lnk=isAkses?L.akses:L.gtra;
  const title=isAkses?"Akses Reforma Agraria":"GTRA 2026";
  const sheet=isAkses?"AKSES REFORM":"GTRA 2026";
  return(
    <div>
      <Head title={title} sub={`Data Bidang Penataan dan Pemberdayaan 2026 — sheet: ${sheet}`} date={isAkses?data?.akses?.lastMod:data?.gtra?.lastMod} link={lnk}/>
      <InfoBox color="green" text={isAkses?"Target daerah: 200 KK (Kab. Gorontalo)":"Target daerah: 1 Laporan per kantah yang punya program GTRA (Kab. Gorontalo, Pohuwato, Boalemo)"}/>
      {rows.length===0?<Empty link={lnk} label={`Buka sheet ${sheet}`}/>:(
        <SimpleTable cols={["Kantah","Target (Renaksi)","Realisasi","Status"]} rows={rows.map(r=>[r.kantah,rnk?rnk[r.kantah]||"—":"—",r.realisasi||"—",r.status||<span className="text-slate-700 italic text-[10px]">belum update</span>])}/>
      )}
    </div>
  );
}

function WakafPage({sub,data}){
  const isP=sub==="prog";
  const rows=isP?(data?.wakafProg?.kantah||[]):(data?.wakafRekap?.kantah||[]);
  const lnk=isP?L.wakafProg:L.wakafRekap;
  const title=isP?"Progress Sertipikasi Wakaf 2026":"Rekap Sertipikasi Tanah Wakaf & Rumah Ibadah 2026";
  return(
    <div>
      <Head title={title} date={isP?data?.wakafProg?.lastMod:data?.wakafRekap?.lastMod} link={lnk}/>
      <InfoBox color="indigo" text="Target daerah Renaksi: Kota Gorontalo = 7 bidang."/>
      {rows.length===0?<Empty link={lnk}/>:(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
          <table className="w-full text-xs" style={{minWidth:400}}>
            <thead className="border-b border-slate-700"><tr>{["Kantah","Target","Capaian","%"].map(h=><th key={h} className="px-3 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
            <tbody>{rows.map(r=>{const pct=r.target>0?Math.round((r.capaian||0)/r.target*100):0;const c=pct>=80?"#34d399":pct>=40?"#fbbf24":"#f87171";return<tr key={r.kantah} className="border-b border-slate-800 hover:bg-slate-700/20"><td className="px-3 py-2.5 text-slate-200 font-medium">{r.kantah}</td><td className="px-3 py-2.5 text-slate-400">{fn(r.target)}</td><td className="px-3 py-2.5 text-slate-300">{fn(r.capaian)}</td><td className="px-3 py-2.5"><span style={{color:c}} className="font-bold">{pct}%</span></td></tr>;})}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LayananPage({sub,data}){
  const isK=sub==="kanwil";
  const rows=[...(data?.layanan?.kantah||[])].sort((a,b)=>(b.kinerja||0)-(a.kinerja||0));
  return(
    <div>
      <Head title={isK?"7 Layanan Prioritas — Nasional (Kanwil)":"7 Layanan Prioritas — Provinsi Gorontalo"} sub="Salinan 7 Layanan Prioritas" date={data?.layanan?.lastMod} link={isK?L.layKanwil:L.layKantah}/>
      {rows.length===0?<Empty link={isK?L.layKanwil:L.layKantah}/>:(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
          <table className="w-full text-xs" style={{minWidth:680}}>
            <thead className="border-b border-slate-700"><tr>{["#","Kantah","Berkas","Pend.SK","Peralihan","Ubah Hak","Roya","Pengecekan","SKPT","HT","Kinerja%","Akselerasi%"].map(h=><th key={h} className="px-2 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
            <tbody>{rows.map((r,i)=>{
              const c=!r.kinerja?null:r.kinerja>=99?"#34d399":r.kinerja>=90?"#fbbf24":"#f87171";
              return<tr key={r.kantah} className="border-b border-slate-800 hover:bg-slate-700/20">
                <td className="px-2 py-2 text-slate-600">{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</td>
                <td className="px-2 py-2 text-slate-200 font-medium">{r.kantah}</td>
                <td className="px-2 py-2 text-slate-300">{fn(r.jumlahBerkas)}</td>
                {[r.pendSK,r.peralihan,r.ubahHak,r.roya,r.pengecekan,r.skpt,r.ht].map((v,j)=><td key={j} className="px-2 py-2 text-slate-500">{v!=null?`${v}%`:"—"}</td>)}
                <td className="px-2 py-2 font-bold" style={{color:c||"#64748b"}}>{r.kinerja?`${r.kinerja.toFixed(2)}%`:"—"}</td>
                <td className="px-2 py-2 text-slate-500">{r.akselerasi?`${r.akselerasi}%`:"—"}</td>
              </tr>;
            })}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TunggakanPage({sub,data}){
  const isP=sub==="prog";
  const rows=[...(data?.tunggakan?.kantah||[])].sort((a,b)=>b.total-a.total);
  const total=rows.reduce((s,r)=>s+(r.total||0),0);
  return(
    <div>
      <Head title={isP?"Progress Penyelesaian Tunggakan":"Tunggakan Rutin"} sub="Jumlah Tunggakan — diisi Kantah" date={data?.tunggakan?.lastMod} link={isP?L.tungProg:L.tungRutin}/>
      {rows.length===0?<Empty link={isP?L.tungProg:L.tungRutin}/>:(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
          <table className="w-full text-xs" style={{minWidth:540}}>
            <thead className="border-b border-slate-700"><tr>{["Kantah","<2023","2023","2024","2025","Total","Status"].map(h=><th key={h} className="px-3 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
            <tbody>
              {rows.map(r=>{const c=r.total===0?"#34d399":r.total<100?"#fbbf24":"#f87171";const s=r.total===0?"✓ Nihil":r.total<100?"⚠ Sedang":"✕ Tinggi";return<tr key={r.kantah} className="border-b border-slate-800 hover:bg-slate-700/20"><td className="px-3 py-2.5 text-slate-200 font-medium">{r.kantah}</td>{[r.pre2023,r.y2023,r.y2024,r.y2025].map((v,i)=><td key={i} className="px-3 py-2.5 text-slate-400">{v||"—"}</td>)}<td className="px-3 py-2.5 font-black" style={{color:c}}>{fn(r.total)}</td><td className="px-3 py-2.5"><span style={{color:c}} className="font-bold text-[10px]">{s}</span></td></tr>;})}
              <tr className="bg-slate-700/20 font-bold border-t-2 border-slate-600"><td className="px-3 py-2 text-slate-300">TOTAL</td>{["pre2023","y2023","y2024","y2025"].map(k=><td key={k} className="px-3 py-2 text-slate-300">{fn(rows.reduce((s,r)=>s+(r[k]||0),0))}</td>)}<td className="px-3 py-2 text-white font-black">{fn(total)}</td><td/></tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ResiduPage({data}){
  const rows=data?.residu?.kantah||[];
  const total=rows.reduce((s,r)=>s+(r.total||0),0);
  const colors=["#22d3ee","#818cf8","#f472b6","#34d399","#fbbf24","#f87171"];
  const active=rows.filter(r=>r.total>0);
  return(
    <div>
      <Head title="Residu PTSL 2017–2024" sub="PTSL - Residu - BMN — sheet: Residu" date={data?.residu?.lastMod} link={L.residu}/>
      {rows.length===0?<Empty link={L.residu}/>:(
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {rows.map((r,i)=><div key={r.kantah} className={`bg-slate-800/60 border border-slate-700/40 rounded-2xl p-3 ${!r.total?"opacity-40":""}`}><p className="text-slate-400 text-xs">{r.kantah}</p><p className="text-xl font-black mt-0.5" style={{color:colors[i]}}>{fn(r.total)}</p><p className="text-slate-600 text-[10px]">{total>0?((r.total/total)*100).toFixed(1):0}% dari total</p><MBar v={r.total} max={total} color={colors[i]}/></div>)}
          </div>
          {active.length>0&&<div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-4"><ResponsiveContainer width="100%" height={180}><BarChart data={[2017,2018,2019,2020,2021,2022,2023,2024].map(y=>({y:String(y),...Object.fromEntries(active.map(r=>[r.kantah.replace("Kab. ","").replace("Kota ",""),r[`y${y}`]||0]))}))} barSize={10}><CartesianGrid strokeDasharray="3 3" stroke="#334155"/><XAxis dataKey="y" tick={{fill:"#94a3b8",fontSize:10}}/><YAxis tick={{fill:"#94a3b8",fontSize:10}}/><Tooltip contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:11}}/><Legend wrapperStyle={{fontSize:10}}/>{active.map((r,i)=><Bar key={r.kantah} dataKey={r.kantah.replace("Kab. ","").replace("Kota ","")} fill={colors[i]} radius={[2,2,0,0]}/>)}</BarChart></ResponsiveContainer></div>}
        </>
      )}
    </div>
  );
}

function BMNPage({data}){return<div><Head title="BMN — Barang Milik Negara" sub="PTSL - Residu - BMN — sheet: BMN" date={data?.bmn?.lastMod} link={L.bmn}/>{data?.bmn?.kantah?.length?<SimpleTable cols={Object.keys(data.bmn.kantah[0])} rows={data.bmn.kantah.map(Object.values)}/>:<Empty link={L.bmn} label="Buka sheet BMN"/>}</div>;}

function LintorPage({data}){
  const[mode,setMode]=useState("nasional");
  const rows=data?.lintor?.kantah||[];
  const totD=Object.values(RNK.lintor).reduce((a,b)=>a+b,0);
  const totCap=rows.reduce((a,r)=>a+(r.penyerahan||0),0);
  return(
    <div>
      <Head title="Lintor — Transmigrasi Hak Milik" date={data?.lintor?.lastMod} link={L.bmn}/>
      <TTgl mode={mode} set={setMode}/>
      {mode==="daerah"&&<CDown dlKey="lintor" achieved={totCap} tD={totD} label="Lintor — batas 24 September 2026"/>}
      <InfoBox color="indigo" text="Target daerah Renaksi: Kab. Pohuwato = 100 bid, Kab. Boalemo = 100 bid (sebelum 24 September 2026)"/>
      {rows.length===0?<Empty link={L.bmn} label="Buka Spreadsheet BMN & Lintor"/>:(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-x-auto">
          <table className="w-full text-xs" style={{minWidth:580}}>
            <thead className="border-b border-slate-700"><tr>{["Kantah","Target","Berkas","PBT","SU","SK","Sertipikat","Penyerahan","%"].map(h=><th key={h} className="px-2 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
            <tbody>{rows.map(r=>{const tD=RNK.lintor[r.kantah],tN=r.targetNasional||r.target||0;const ref=mode==="daerah"?(tD||tN):tN;const cap=r.penyerahan||0,pct=ref>0?Math.round(cap/ref*100):0;const c=pct>=80?"#34d399":pct>0?"#fbbf24":"#f87171";return<tr key={r.kantah} className="border-b border-slate-800 hover:bg-slate-700/20"><td className="px-2 py-2.5 text-slate-200 font-medium">{r.kantah}</td><td className="px-2 py-2.5 font-bold text-white">{fn(ref)}</td><td className="px-2 py-2.5 text-slate-400">{fn(r.berkas)}</td><td className="px-2 py-2.5 text-slate-400">{fn(r.pbt)}</td><td className="px-2 py-2.5 text-slate-400">{fn(r.su)}</td><td className="px-2 py-2.5 text-slate-400">{fn(r.sk)}</td><td className="px-2 py-2.5 text-slate-400">{fn(r.sertipikat)}</td><td className="px-2 py-2.5 text-slate-300">{fn(r.penyerahan)}</td><td className="px-2 py-2.5"><span style={{color:c}} className="font-bold">{pct}%</span></td></tr>;})}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ZIPage({data}){
  const ziData=data?.zi?.satker||[];
  return(
    <div>
      <Head title="Zona Integritas — LKE 2026" sub="Lembar Kerja Evaluasi per Satker"/>
      <InfoBox color="blue" text="Status Memenuhi = Nilai Evaluasi Reformasi Birokrasi (sheet Utama) ≥ 75. Nilai diambil otomatis via Apps Script saat dashboard dibuka."/>
      <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-hidden mb-3">
        <table className="w-full text-xs">
          <thead className="border-b border-slate-700"><tr>{["Satker","Update Terakhir","Nilai TPI / Eval. RB","Status Pengajuan","Spreadsheet LKE"].map(h=><th key={h} className="px-3 py-2.5 text-left text-[10px] font-medium text-slate-500">{h}</th>)}</tr></thead>
          <tbody>
            {LKE_LIST.map(s=>{
              const live=ziData.find(d=>d.satker===s.nama);
              const nilai=live?.nilai??null;
              const ok=nilai!=null?nilai>=75:null;
              return<tr key={s.nama} className="border-b border-slate-800 hover:bg-slate-700/10">
                <td className="px-3 py-3 text-slate-200 font-medium">{s.nama}</td>
                <td className="px-3 py-3"><Bdg d={live?.lastMod||null}/></td>
                <td className="px-3 py-3">{nilai!=null?<span className={`font-black text-base ${nilai>=75?"text-emerald-400":"text-rose-400"}`}>{nilai.toFixed(2)}</span>:<span className="text-slate-700 italic text-[10px]">belum tersedia</span>}</td>
                <td className="px-3 py-3">{ok===null?<span className="text-slate-700 text-[10px]">—</span>:<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] border ${ok?"bg-emerald-900/40 border-emerald-700 text-emerald-400":"bg-rose-900/40 border-rose-700 text-rose-400"}`}>{ok?<><CheckCircle2 size={9}/>Memenuhi</>:<><XCircle size={9}/>Tidak Memenuhi</>}</span>}</td>
                <td className="px-3 py-3"><Lnk href={s.lnk} label="Buka LKE" sm/></td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      <p className="text-slate-600 text-[10px] italic">* Pastikan Apps Script sudah memiliki fungsi getZIData() untuk membaca nilai "NILAI EVALUASI REFORMASI BIROKRASI" dari masing-masing spreadsheet LKE.</p>
    </div>
  );
}

function KeuanganPage(){
  return<div><Head title="Keuangan — Realisasi Anggaran" link={L.keuangan}/><InfoBox color="amber" text="Integrasi otomatis ke Apps Script dapat ditambahkan. Saat ini buka spreadsheet langsung."/><div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-5 flex items-start justify-between gap-4"><div><p className="text-white font-semibold">Monitoring Kinerja Anggaran 2025</p><p className="text-slate-500 text-xs mt-0.5">Sheet: Realisasi Termasuk Blokir SPAN · gid=1701500196</p></div><a href={L.keuangan} target="_blank" rel="noreferrer" className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl text-xs hover:bg-cyan-500/20"><ExternalLink size={11}/>Buka</a></div></div>;
}

function BahanRapatPage(){
  const[ok,setOk]=useState(true);const[loaded,setLoaded]=useState(false);
  return(
    <div>
      <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
        <div><h2 className="text-white font-bold">Bahan Rapat</h2><p className="text-slate-500 text-xs">Monitoring & Evaluasi Capaian Kinerja Tahun 2026</p></div>
        <div className="flex gap-2">
          <a href={L.bahanPdf} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-rose-600/80 hover:bg-rose-500 text-white rounded-xl text-xs font-bold"><Download size={12}/>Unduh PDF</a>
          <a href={L.bahan} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs"><ExternalLink size={12}/>Buka di Slides</a>
        </div>
      </div>
      <InfoBox color="blue" text="Agar slide tampil: buka Google Slides → File → Publish to web → aktifkan. Jika tidak muncul, gunakan tombol Unduh PDF atau Buka di Slides."/>
      {ok?(
        <div className="bg-black rounded-2xl overflow-hidden relative" style={{aspectRatio:"16/9"}}>
          {!loaded&&<div className="absolute inset-0 flex items-center justify-center bg-slate-900"><Loader2 size={28} className="text-slate-600 animate-spin"/></div>}
          <iframe src={L.bahanEmbed} className="w-full h-full" allowFullScreen style={{border:"none"}} onLoad={()=>setLoaded(true)} onError={()=>setOk(false)}/>
        </div>
      ):(
        <div className="bg-slate-800/60 border border-slate-700/40 rounded-2xl p-12 text-center">
          <BookOpen size={36} className="text-slate-600 mx-auto mb-3"/>
          <p className="text-slate-400 font-medium mb-1">Slide tidak dapat ditampilkan</p>
          <p className="text-slate-600 text-xs mb-5">Aktifkan "Publish to web" di Google Slides, atau gunakan tombol di bawah.</p>
          <div className="flex justify-center gap-3">
            <a href={L.bahan} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm"><ExternalLink size={14}/>Buka Slides</a>
            <a href={L.bahanPdf} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm"><Download size={14}/>Unduh PDF</a>
          </div>
        </div>
      )}
    </div>
  );
}

function TimKendaliPage({data}){
  const TIM=[
    {bidang:"Bidang 1 — Survei & Pemetaan",warna:"#22d3ee",pic:["Sintia","Hamdan"],items:[
      {nama:"PBT PTSL",lnk:L.pbt,d:data?.pbt?.lastMod},
      {nama:"Foto Tegak PTSL",lnk:L.foto,d:data?.fotoTegak?.lastMod},
    ]},
    {bidang:"Bidang 2 — Hak Tanah & Pendaftaran",warna:"#818cf8",pic:["Fauzan","Vivi"],items:[
      {nama:"PTSL SHAT",lnk:L.shat,d:data?.shat?.lastMod},
      {nama:"7 Layanan Prioritas",lnk:L.layKantah,d:data?.layanan?.lastMod},
      {nama:"Tunggakan Rutin",lnk:L.tungRutin,d:data?.tunggakan?.lastMod},
      {nama:"Residu PTSL",lnk:L.residu,d:data?.residu?.lastMod},
      {nama:"BMN",lnk:L.bmn,d:data?.bmn?.lastMod},
      {nama:"Lintor",lnk:L.bmn,d:data?.lintor?.lastMod},
      {nama:"Wakaf",lnk:L.wakafRekap,d:data?.wakafRekap?.lastMod},
    ]},
    {bidang:"Bidang 3 — Penataan Agraria",warna:"#34d399",pic:["Isty","Meyranda"],items:[
      {nama:"Redistribusi Tanah",lnk:L.redistribusi,d:data?.redistrib?.lastMod},
      {nama:"GTRA",lnk:L.gtra,d:data?.gtra?.lastMod},
      {nama:"Akses Reforma Agraria",lnk:L.akses,d:data?.akses?.lastMod},
    ]},
    {bidang:"Umum & Keuangan",warna:"#fbbf24",pic:["Timang","Rio"],items:[
      {nama:"LKE / Zona Integritas",lnk:L.lkeKanwil,d:null},
      {nama:"Keuangan",lnk:L.keuangan,d:null},
      {nama:"PPP / Timeline",lnk:L.timeline,d:null},
      {nama:"Bahan Rapat",lnk:L.bahan,d:null},
    ]},
  ];
  return(
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-xl bg-indigo-500/20"><Users size={18} className="text-indigo-400"/></div>
        <div><h2 className="text-white font-bold">Tim Kendali Data</h2><p className="text-slate-500 text-xs">PIC, spreadsheet, dan status update per program</p></div>
      </div>
      {TIM.map(b=>(
        <div key={b.bidang} className="bg-slate-800/60 border border-slate-700/40 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between flex-wrap gap-2" style={{background:b.warna+"15"}}>
            <div className="flex items-center gap-2"><div className="w-1.5 h-5 rounded-full" style={{background:b.warna}}/><p className="text-white font-semibold text-sm">{b.bidang}</p></div>
            <div className="flex gap-1.5">{b.pic.map(p=><span key={p} className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{background:b.warna+"40",border:`1px solid ${b.warna}50`}}>{p}</span>)}</div>
          </div>
          <table className="w-full text-xs">
            <thead className="border-b border-slate-700/50"><tr><th className="px-4 py-2 text-left text-[10px] text-slate-500 font-medium">Program</th><th className="px-3 py-2 text-center text-[10px] text-slate-500 font-medium">Update Terakhir</th><th className="px-4 py-2 text-center text-[10px] text-slate-500 font-medium">Spreadsheet</th></tr></thead>
            <tbody>{b.items.map(m=><tr key={m.nama} className="border-b border-slate-800 hover:bg-slate-700/10"><td className="px-4 py-2.5 text-slate-200 font-medium">{m.nama}</td><td className="px-3 py-2.5 text-center"><Bdg d={m.d}/></td><td className="px-4 py-2.5 text-center">{m.lnk?<Lnk href={m.lnk} label="Buka" sm/>:<span className="text-slate-700 text-[10px]">—</span>}</td></tr>)}</tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function TimKendaliLogin({onLogin}){
  const[code,setCode]=useState("");const[show,setShow]=useState(false);const[err,setErr]=useState("");
  return(
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="p-3 rounded-2xl bg-indigo-900/40 border border-indigo-700/40"><Users size={28} className="text-indigo-400"/></div>
      <h3 className="text-white font-bold">Akses Tim Kendali</h3>
      <div className="w-full max-w-xs space-y-2">
        <div className="relative">
          <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input type={show?"text":"password"} value={code} onChange={e=>{setCode(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&(code.toUpperCase()===PWD_TIM?onLogin():setErr("Kode salah."))} placeholder="Kode Tim Kendali" className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 tracking-widest"/>
          <button onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">{show?<EyeOff size={12}/>:<Eye size={12}/>}</button>
        </div>
        {err&&<p className="text-rose-400 text-xs">{err}</p>}
        <button onClick={()=>code.toUpperCase()===PWD_TIM?onLogin():setErr("Kode salah.")} disabled={!code} className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm disabled:opacity-40">Masuk Tim Kendali</button>
      </div>
    </div>
  );
}



const NAV=[
  {id:"overview",l:"Overview",I:LayoutDashboard},
  {id:"shat",l:"PTSL SHAT",I:FileText},
  {id:"pbt",l:"PBT & Foto Tegak",I:Map,sub:[{id:"pbt_pbt",l:"PBT PTSL"},{id:"pbt_foto",l:"Foto Tegak"}]},
  {id:"redistrib",l:"Redistribusi Tanah",I:Leaf},
  {id:"gtra",l:"GTRA & Akses Reform",I:Home,sub:[{id:"gtra_gtra",l:"GTRA"},{id:"gtra_akses",l:"Akses Reform"}]},
  {id:"wakaf",l:"Wakaf",I:Droplets,sub:[{id:"wakaf_rekap",l:"Rekap"},{id:"wakaf_prog",l:"Progress"}]},
  {id:"layanan7",l:"7 Layanan Prioritas",I:Award,sub:[{id:"lay_kanwil",l:"Nasional (Kanwil)"},{id:"lay_kantah",l:"Provinsi Gorontalo"}]},
  {id:"tunggakan",l:"Tunggakan",I:Clock,sub:[{id:"tung_rutin",l:"Tunggakan Rutin"},{id:"tung_prog",l:"Progress Penyelesaian"}]},
  {id:"residu",l:"Residu PTSL",I:Archive},
  {id:"bmn",l:"BMN",I:Package},
  {id:"lintor",l:"Lintor",I:Building2},
  {id:"zi",l:"Zona Integritas (LKE)",I:Shield},
  {id:"keuangan",l:"Keuangan",I:Wallet},
  {id:"bahanrapat",l:"Bahan Rapat",I:BookOpen},
  {id:"timkendali",l:"Tim Kendali",I:Users,restricted:true},
];

function LoginScreen({onLogin}){
  const[code,setCode]=useState("");const[show,setShow]=useState(false);
  const[err,setErr]=useState("");const[loading,setLoading]=useState(false);
  const go=()=>{if(!code)return;setLoading(true);setTimeout(()=>{if(code.toUpperCase()===PWD_MAIN)onLogin();else{setErr("Kode akses salah.");setLoading(false);}},600);};
  return(
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:"radial-gradient(ellipse at 30% 20%,#0c2d4a,#0f172a 60%)"}}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)"}}><Building2 size={30} className="text-white"/></div>
          <h1 className="text-2xl font-black text-white">MONEV KANWIL</h1>
          <p className="text-cyan-400 font-semibold text-sm">BPN Provinsi Gorontalo 2026</p>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6">
          <label className="block text-slate-500 text-[10px] font-bold mb-2 tracking-widest">KODE AKSES</label>
          <div className="relative mb-2">
            <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
            <input type={show?"text":"password"} value={code} onChange={e=>{setCode(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Masukkan kode akses" className="w-full bg-slate-900/60 border border-slate-600 rounded-xl pl-10 pr-10 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-sm tracking-widest"/>
            <button onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">{show?<EyeOff size={13}/>:<Eye size={13}/>}</button>
          </div>
          {err&&<p className="text-rose-400 text-xs mb-2">{err}</p>}
          <button onClick={go} disabled={loading||!code} className="w-full py-3 rounded-xl font-bold text-white text-sm mt-2 disabled:opacity-40" style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)"}}>{loading?"Memverifikasi…":"Masuk →"}</button>
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const[authed,setAuthed]=useState(false);
  const[kAuthed,setKAuthed]=useState(false);
  const[page,setPage]=useState("overview");
  const[sideOpen,setSideOpen]=useState(true);
  const[exp,setExp]=useState({});
  const{data,st,lf,cd,go}=useLive();

  if(!authed)return<LoginScreen onLogin={()=>setAuthed(true)}/>;

  const baseId=page.split("_")[0];
  const sub=page.includes("_")?page.split("_").slice(1).join("_"):null;
  const navItem=NAV.find(n=>n.id===baseId)||NAV.find(n=>n.sub?.some(s=>s.id===page));
  const m=Math.floor(cd/60),s=cd%60;

  return(
    <div className="flex h-screen overflow-hidden" style={{background:"#0b1120",fontFamily:"system-ui,sans-serif"}}>
      {/* SIDEBAR */}
      <aside className={`${sideOpen?"w-56":"w-12"} flex-shrink-0 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-200 overflow-hidden`}>
        <div className={`p-3 border-b border-slate-800 flex items-center gap-2 ${!sideOpen&&"justify-center"}`}>
          <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{background:"linear-gradient(135deg,#0ea5e9,#6366f1)"}}><Building2 size={14} className="text-white"/></div>
          {sideOpen&&<div><p className="text-white font-bold text-sm leading-tight">MONEV BPN</p><p className="text-cyan-400 text-[10px]">Prov. Gorontalo 2026</p></div>}
        </div>
        <nav className="flex-1 p-1.5 overflow-y-auto space-y-0.5">
          {NAV.map(n=>{
            const active=n.id===baseId||n.sub?.some(ss=>ss.id===page);
            const isLeaf=!n.sub;
            const isOpen=exp[n.id];
            return(
              <div key={n.id}>
                <button onClick={()=>{if(n.sub)setExp(e=>({...e,[n.id]:!e[n.id]}));else setPage(n.id);}}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all border
                    ${active&&isLeaf?"bg-cyan-500/20 text-cyan-300 font-bold border-cyan-700/40":
                      active?"bg-slate-800 text-slate-200 font-semibold border-slate-700":
                      n.restricted?"text-indigo-400 border-transparent hover:bg-indigo-900/20":
                      "text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200"}`}>
                  <n.I size={13} className="flex-shrink-0"/>
                  {sideOpen&&<span className="truncate flex-1 text-left">{n.l}</span>}
                  {sideOpen&&n.sub&&<ChevronDown size={10} className={`flex-shrink-0 transition-transform ${isOpen?"rotate-180":""}`}/>}
                  {sideOpen&&n.restricted&&<Lock size={9} className="flex-shrink-0 text-indigo-600"/>}
                </button>
                {sideOpen&&n.sub&&isOpen&&(
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l border-slate-700/60 pl-2">
                    {n.sub.map(ss=>(
                      <button key={ss.id} onClick={()=>setPage(ss.id)}
                        className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] transition-all ${page===ss.id?"bg-cyan-500/20 text-cyan-300 font-bold":"text-slate-500 hover:bg-slate-800 hover:text-slate-300"}`}>
                        <ChevronRight size={9}/>{ss.l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="p-1.5 border-t border-slate-800">
          <button onClick={()=>setAuthed(false)} className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-slate-600 hover:text-rose-400 hover:bg-rose-900/20 transition-all ${!sideOpen&&"justify-center"}`}><LogOut size={13}/>{sideOpen&&"Keluar"}</button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="px-4 py-2.5 flex items-center justify-between border-b border-slate-800 bg-slate-900/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={()=>setSideOpen(!sideOpen)} className="text-slate-500 hover:text-white"><Menu size={15}/></button>
            <p className="text-white font-bold text-sm">{navItem?.l||"Dashboard"}</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={L.timeline} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500 hover:text-cyan-400 border border-slate-700 hover:border-cyan-700 rounded-xl px-2 py-1.5 transition-all"><Clock size={10}/>Timeline PPP</a>
            <button onClick={go} title="Refresh" className="flex items-center gap-1 px-2 py-1.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white text-xs"><RefreshCw size={11} className={st==="loading"?"animate-spin":""}/><span className="hidden sm:inline">{m}:{String(s).padStart(2,"0")}</span></button>
          </div>
        </header>
        <SBar st={st} lf={lf} cd={cd} go={go}/>
        <main className="flex-1 overflow-y-auto p-4">
          {st==="loading"&&!data?<Skel/>:(
            <>
              {page==="overview"       &&<Overview data={data}/>}
              {page==="shat"           &&<SHATPage data={data}/>}
              {page==="pbt_pbt"        &&<PBTPage sub="pbt"  data={data}/>}
              {page==="pbt_foto"       &&<PBTPage sub="foto" data={data}/>}
              {page==="redistrib"      &&<RedistribusiPage data={data}/>}
              {page==="gtra_gtra"      &&<GtraPage sub="gtra"  data={data}/>}
              {page==="gtra_akses"     &&<GtraPage sub="akses" data={data}/>}
              {page==="wakaf_rekap"    &&<WakafPage sub="rekap" data={data}/>}
              {page==="wakaf_prog"     &&<WakafPage sub="prog"  data={data}/>}
              {page==="lay_kanwil"     &&<LayananPage sub="kanwil" data={data}/>}
              {page==="lay_kantah"     &&<LayananPage sub="kantah" data={data}/>}
              {page==="tung_rutin"     &&<TunggakanPage sub="rutin" data={data}/>}
              {page==="tung_prog"      &&<TunggakanPage sub="prog"  data={data}/>}
              {page==="residu"         &&<ResiduPage data={data}/>}
              {page==="bmn"            &&<BMNPage data={data}/>}
              {page==="lintor"         &&<LintorPage data={data}/>}
              {page==="zi"             &&<ZIPage data={data}/>}
              {page==="keuangan"       &&<KeuanganPage/>}
              {page==="bahanrapat"     &&<BahanRapatPage/>}
              {page==="timkendali"     &&(kAuthed?<TimKendaliPage data={data}/>:<TimKendaliLogin onLogin={()=>setKAuthed(true)}/>)}
              {["pbt","gtra","wakaf","layanan7","tunggakan"].includes(page)&&(
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ChevronDown size={24} className="text-slate-600 mb-3"/>
                  <p className="text-slate-500 font-medium">Pilih sub-menu dari panel kiri</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
