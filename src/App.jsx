import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart, ComposedChart, Bar, CartesianGrid, Line, Cell } from "recharts";

const LOGO = "data:image/png;base64,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";

const MO=`'IBM Plex Mono','SF Mono',monospace`;const SA=`'Plus Jakarta Sans','SF Pro Display',sans-serif`;
const C={bg:"#09090b",sf:"#18181b",s2:"#1e1e24",s3:"#27272a",bd:"#27272a",tx:"#fafafa",tm:"#a1a1aa",td:"#71717a",g:"#34d399",gd:"#34d39915",r:"#fb7185",rd:"#fb718515",b:"#818cf8",bd2:"#818cf815",am:"#fbbf24",cy:"#22d3ee",pu:"#c084fc",vi:"#a78bfa",ac:"#818cf8"};

// ── OHLCV ──
function genOHLCV(n=500,s=100){const d=[];let p=s,v=.015,t=0;for(let i=0;i<n;i++){if(Math.random()<.05)t=(Math.random()-.45)*.008;if(Math.random()<.03)v=Math.max(.005,Math.min(.05,v*(.5+Math.random()*1.5)));v=v*.97+.015*.03;const r=.0002+t+v*(Math.random()+Math.random()+Math.random()-1.5)*.816;const o=p,c=p*(1+r),h=Math.max(o,c)*(1+Math.random()*v*.8),l=Math.min(o,c)*(1-Math.random()*v*.8);const dt=new Date(2024,0,1);dt.setDate(dt.getDate()+i);d.push({date:dt.toISOString().split("T")[0],ds:`${dt.getMonth()+1}/${dt.getDate()}`,open:+o.toFixed(2),high:+h.toFixed(2),low:+l.toFixed(2),close:+c.toFixed(2),volume:Math.floor(5e5+Math.random()*2e6)});p=c}return d}

// ── INDICATORS ──
const sma=(d,p)=>d.map((_,i)=>{if(i<p-1)return null;let s=0;for(let j=i-p+1;j<=i;j++)s+=d[j].close;return+(s/p).toFixed(2)});
const ema=(d,p)=>{const k=2/(p+1),e=[];let pv=null;for(let i=0;i<d.length;i++){if(i<p-1){e.push(null);continue}if(pv===null){let s=0;for(let j=i-p+1;j<=i;j++)s+=d[j].close;pv=s/p}else pv=d[i].close*k+pv*(1-k);e.push(+pv.toFixed(2))}return e};
const rsi=(d,p=14)=>{const r=[];let ag=0,al=0;for(let i=0;i<d.length;i++){if(!i){r.push(null);continue}const ch=d[i].close-d[i-1].close,g=ch>0?ch:0,l=ch<0?-ch:0;if(i<=p){ag+=g;al+=l;if(i===p){ag/=p;al/=p}r.push(i<p?null:+(100-100/(1+ag/(al||.001))).toFixed(2))}else{ag=(ag*(p-1)+g)/p;al=(al*(p-1)+l)/p;r.push(+(100-100/(1+ag/(al||.001))).toFixed(2))}}return r};
const macd=(d,f=12,s=26,sg=9)=>{const ef=ema(d,f),es=ema(d,s);const ml=ef.map((v,i)=>v!=null&&es[i]!=null?+(v-es[i]).toFixed(4):null);const k=2/(sg+1),sl=[];let pv=null;for(let i=0;i<ml.length;i++){if(ml[i]==null){sl.push(null);continue}if(pv==null){pv=ml[i];sl.push(+pv.toFixed(4));continue}pv=ml[i]*k+pv*(1-k);sl.push(+pv.toFixed(4))}return{ml,sl,hi:ml.map((m,i)=>m!=null&&sl[i]!=null?+(m-sl[i]).toFixed(4):null)}};
const bb=(d,p=20,m=2)=>{const s=sma(d,p);return s.map((v,i)=>{if(v==null)return{u:null,m:null,l:null};let sq=0;for(let j=i-p+1;j<=i;j++)sq+=(d[j].close-v)**2;const st=Math.sqrt(sq/p);return{u:+(v+m*st).toFixed(2),m:v,l:+(v-m*st).toFixed(2)}})};
const atr=(d,p=14)=>{const tr=d.map((v,i)=>i===0?v.high-v.low:Math.max(v.high-v.low,Math.abs(v.high-d[i-1].close),Math.abs(v.low-d[i-1].close)));const a=[];for(let i=0;i<d.length;i++){if(i<p-1){a.push(null);continue}if(i===p-1){let s=0;for(let j=0;j<p;j++)s+=tr[j];a.push(+(s/p).toFixed(4))}else a.push(+((a[a.length-1]*(p-1)+tr[i])/p).toFixed(4))}return a};
const stoch=(d,kp=14,dp=3)=>{const k=d.map((_,i)=>{if(i<kp-1)return null;let hi=-Infinity,lo=Infinity;for(let j=i-kp+1;j<=i;j++){hi=Math.max(hi,d[j].high);lo=Math.min(lo,d[j].low)}return hi===lo?50:+((d[i].close-lo)/(hi-lo)*100).toFixed(2)});const dv=k.map((_,i)=>{if(i<kp-1+dp-1||k[i]==null)return null;let s=0;for(let j=i-dp+1;j<=i;j++)s+=k[j]||0;return+(s/dp).toFixed(2)});return{k,d:dv}};
const vwap=(d)=>{let cumPV=0,cumV=0;return d.map(v=>{const tp=(v.high+v.low+v.close)/3;cumPV+=tp*v.volume;cumV+=v.volume;return+(cumPV/cumV).toFixed(2)})};

// ── MULTI-TIMEFRAME ──
function resampleHTF(daily,period=5){const htf=[];for(let i=0;i<daily.length;i+=period){const chunk=daily.slice(i,i+period);if(!chunk.length)continue;htf.push({date:chunk[chunk.length-1].date,ds:chunk[chunk.length-1].ds,open:chunk[0].open,high:Math.max(...chunk.map(c=>c.high)),low:Math.min(...chunk.map(c=>c.low)),close:chunk[chunk.length-1].close,volume:chunk.reduce((s,c)=>s+c.volume,0)})}
// Expand back to daily length — each daily bar gets its HTF bar's value
const expanded=[];let htfIdx=0;for(let i=0;i<daily.length;i++){if(htfIdx<htf.length-1&&i>=(htfIdx+1)*period)htfIdx++;expanded.push(htf[htfIdx])}return{htf,expanded}}

// ── CODE ENGINE ──
function buildCodeContext(data,i,prevI,weeklyExp,monthlyExp){
  const bar=data[i],prev=prevI>=0?data[prevI]:bar;
  const wbar=weeklyExp[i]||bar, mbar=monthlyExp[i]||bar;
  const cache={};
  const getInd=(fn,key,args)=>{if(!cache[key])cache[key]=fn(data,...args);return cache[key][i]};
  const getPrev=(fn,key,args)=>{if(!cache[key])cache[key]=fn(data,...args);return cache[key][prevI]};
  const getHTF=(tf,fn,key,args)=>{const src=tf==="W"?weeklyExp:monthlyExp;const kk=`${tf}_${key}`;if(!cache[kk]){const tfData=src.map(s=>({...s}));cache[kk]=fn(tfData,...args)}return cache[kk][i]};
  return {
    // Current bar
    open:bar.open,high:bar.high,low:bar.low,close:bar.close,volume:bar.volume,
    prev_open:prev.open,prev_high:prev.high,prev_low:prev.low,prev_close:prev.close,
    // Indicators (lazy computed)
    SMA:(p)=>getInd(sma,`s${p}`,[p]),
    EMA:(p)=>getInd(ema,`e${p}`,[p]),
    RSI:(p)=>getInd(rsi,`r${p}`,[p||14]),
    MACD_HIST:()=>{if(!cache.mc)cache.mc=macd(data);return cache.mc.hi[i]},
    MACD_LINE:()=>{if(!cache.mc)cache.mc=macd(data);return cache.mc.ml[i]},
    MACD_SIGNAL:()=>{if(!cache.mc)cache.mc=macd(data);return cache.mc.sl[i]},
    BB_UPPER:(p)=>{if(!cache[`b${p}`])cache[`b${p}`]=bb(data,p||20);return cache[`b${p}`][i]?.u},
    BB_LOWER:(p)=>{if(!cache[`b${p}`])cache[`b${p}`]=bb(data,p||20);return cache[`b${p}`][i]?.l},
    BB_MID:(p)=>{if(!cache[`b${p}`])cache[`b${p}`]=bb(data,p||20);return cache[`b${p}`][i]?.m},
    ATR:(p)=>getInd(atr,`a${p}`,[p||14]),
    STOCH_K:(p)=>{if(!cache[`sk${p}`])cache[`sk${p}`]=stoch(data,p||14);return cache[`sk${p}`].k[i]},
    STOCH_D:(p)=>{if(!cache[`sd${p}`])cache[`sd${p}`]=stoch(data,p||14);return cache[`sd${p}`].d[i]},
    VWAP:()=>{if(!cache.vwap)cache.vwap=vwap(data);return cache.vwap[i]},
    // Previous bar indicators
    prev_SMA:(p)=>getPrev(sma,`s${p}`,[p]),
    prev_EMA:(p)=>getPrev(ema,`e${p}`,[p]),
    prev_RSI:(p)=>getPrev(rsi,`r${p}`,[p||14]),
    prev_MACD_HIST:()=>{if(!cache.mc)cache.mc=macd(data);return cache.mc.hi[prevI]},
    // Crossover helpers
    crossAbove:(a,b)=>{const ca=typeof a==="function"?a():a,cb=typeof b==="function"?b():b,pa=typeof a==="function"?getPrev(sma,`_ca`,[1]):prev.close,pb=typeof b==="function"?getPrev(sma,`_cb`,[1]):prev.close;return pa<=pb&&ca>cb},
    crossBelow:(a,b)=>{const ca=typeof a==="function"?a():a,cb=typeof b==="function"?b():b,pa=typeof a==="function"?getPrev(sma,`_ca`,[1]):prev.close,pb=typeof b==="function"?getPrev(sma,`_cb`,[1]):prev.close;return pa>=pb&&ca<cb},
    // Higher timeframe
    HTF:(tf,fn)=>{const src=tf==="W"?weeklyExp:monthlyExp;if(!src.length)return null;const tfData=src;if(typeof fn==="function"){const oldI=i;return fn({close:src[i]?.close,open:src[i]?.open,high:src[i]?.high,low:src[i]?.low,SMA:(p)=>{const k=`${tf}s${p}`;if(!cache[k])cache[k]=sma(tfData,p);return cache[k][i]},EMA:(p)=>{const k=`${tf}e${p}`;if(!cache[k])cache[k]=ema(tfData,p);return cache[k][i]},RSI:(p)=>{const k=`${tf}r${p}`;if(!cache[k])cache[k]=rsi(tfData,p||14);return cache[k][i]},MACD_HIST:()=>{if(!cache[`${tf}mc`])cache[`${tf}mc`]=macd(tfData);return cache[`${tf}mc`].hi[i]}})}return src[i]?.close},
  }
}

function btCode(data,entryCode,exitCode,cfg){
  const{cap:c0=10000,sz=100,sl=0,tp=0,dir="long"}=cfg;
  const{expanded:wExp}=resampleHTF(data,5);
  const{expanded:mExp}=resampleHTF(data,20);
  let entryFn,exitFn;
  try{
    const keys="open,high,low,close,volume,prev_open,prev_high,prev_low,prev_close,SMA,EMA,RSI,MACD_HIST,MACD_LINE,MACD_SIGNAL,BB_UPPER,BB_LOWER,BB_MID,ATR,STOCH_K,STOCH_D,VWAP,prev_SMA,prev_EMA,prev_RSI,prev_MACD_HIST,crossAbove,crossBelow,HTF";
    const wrap=code=>`const{${keys}}=ctx;return(${code})`;
    entryFn=new Function("ctx",wrap(entryCode));exitFn=new Function("ctx",wrap(exitCode));
  }catch(e){return{trades:[],eq:[],stats:{ret:0,fin:c0,n:0,wr:0,aw:0,al:0,pf:0,mdd:0,sh:0,exp:0,ah:0,wn:0,ls:0},error:e.message}}
  let cap=c0,pos=null;const trades=[],eq=[];let peak=c0;
  for(let i=1;i<data.length;i++){const d=data[i];const ctx=buildCodeContext(data,i,i-1,wExp,mExp);
    if(pos){const pct=dir==="long"?(d.close-pos.ep)/pos.ep*100:(pos.ep-d.close)/pos.ep*100;let rsn=null;
      if(sl>0&&pct<=-sl)rsn="SL";if(tp>0&&pct>=tp)rsn="TP";
      if(!rsn){try{if(exitFn(ctx))rsn="Signal"}catch(e){}}
      if(rsn){const pnl=dir==="long"?(d.close-pos.ep)*pos.sh:(pos.ep-d.close)*pos.sh;cap+=pos.sh*pos.ep+pnl;trades.push({ed:pos.ed,xd:d.date,ep:pos.ep,xp:d.close,sh:pos.sh,pnl:+pnl.toFixed(2),pct:+pct.toFixed(2),rsn,days:i-pos.ei});pos=null}}
    if(!pos){try{if(entryFn(ctx)){const amt=cap*(sz/100);const sh=Math.floor(amt/d.close);if(sh>0){cap-=sh*d.close;pos={ep:d.close,sh,ed:d.date,ei:i}}}}catch(e){}}
    const ce=cap+(pos?pos.sh*d.close:0);peak=Math.max(peak,ce);eq.push({date:d.date,ds:d.ds,eq:+ce.toFixed(2),dd:+((ce-peak)/peak*100).toFixed(2),close:d.close})}
  if(pos){const l=data[data.length-1];const pct=dir==="long"?(l.close-pos.ep)/pos.ep*100:(pos.ep-l.close)/pos.ep*100;const pnl=dir==="long"?(l.close-pos.ep)*pos.sh:(pos.ep-l.close)*pos.sh;cap+=pos.sh*pos.ep+pnl;trades.push({ed:pos.ed,xd:l.date,ep:pos.ep,xp:l.close,sh:pos.sh,pnl:+pnl.toFixed(2),pct:+pct.toFixed(2),rsn:"End",days:data.length-1-pos.ei})}
  const fin=eq.length?eq[eq.length-1].eq:c0;const w=trades.filter(t=>t.pnl>0),lo=trades.filter(t=>t.pnl<=0);const aw=w.length?w.reduce((s,t)=>s+t.pnl,0)/w.length:0,al=lo.length?lo.reduce((s,t)=>s+t.pnl,0)/lo.length:0;
  const rets=eq.map((e,i)=>i===0?0:(e.eq-eq[i-1].eq)/eq[i-1].eq);const ar=rets.reduce((a,b)=>a+b,0)/rets.length,sr=Math.sqrt(rets.reduce((a,b)=>a+(b-ar)**2,0)/rets.length);
  return{trades,eq,stats:{ret:+(((fin-c0)/c0)*100).toFixed(2),fin:+fin.toFixed(2),n:trades.length,wr:trades.length?+((w.length/trades.length)*100).toFixed(1):0,aw:+aw.toFixed(2),al:+al.toFixed(2),pf:Math.abs(al)>0?+(aw*w.length/Math.abs(al*lo.length||1)).toFixed(2):w.length>0?999:0,mdd:+(Math.min(...eq.map(e=>e.dd),0)).toFixed(2),sh:sr>0?+((ar/sr)*Math.sqrt(252)).toFixed(2):0,exp:trades.length?+((aw*w.length/trades.length+al*lo.length/trades.length)).toFixed(2):0,ah:trades.length?+(trades.reduce((s,t)=>s+t.days,0)/trades.length).toFixed(1):0,wn:w.length,ls:lo.length}}}

const CODE_PRESETS={
  maCross:{n:"MA Crossover + Weekly Trend",en:`// Enter when fast EMA crosses above slow EMA\n// AND weekly trend is bullish\nEMA(9) > EMA(21) && prev_EMA(9) <= prev_EMA(21)\n&& HTF("W", w => w.EMA(10) > w.EMA(30))`,ex:`// Exit on reverse cross\nEMA(9) < EMA(21) && prev_EMA(9) >= prev_EMA(21)`},
  rsiDiv:{n:"RSI + Stochastic",en:`// Oversold RSI with Stochastic confirmation\nRSI(14) < 35 && STOCH_K(14) < 25\n&& STOCH_K(14) > STOCH_D(14)`,ex:`// Overbought exit\nRSI(14) > 70 || STOCH_K(14) > 80`},
  bbSqueeze:{n:"BB Squeeze Breakout",en:`// Price breaks above upper BB\n// with volume confirmation\nclose > BB_UPPER(20)\n&& prev_close <= BB_UPPER(20)\n&& volume > 1500000`,ex:`// Exit below middle BB\nclose < BB_MID(20)`},
  mtfMomentum:{n:"Multi-TF Momentum",en:`// Daily MACD positive\n// Weekly RSI above 50\n// Daily RSI not overbought\nMACD_HIST() > 0 && prev_MACD_HIST() <= 0\n&& HTF("W", w => w.RSI(14) > 50)\n&& RSI(14) < 65`,ex:`// MACD goes negative or weekly loses momentum\nMACD_HIST() < 0\n|| HTF("W", w => w.RSI(14) < 40)`},
  vwapBounce:{n:"VWAP Bounce",en:`// Price pulls back to VWAP and bounces\nlow < VWAP() && close > VWAP()\n&& RSI(14) > 40 && RSI(14) < 60`,ex:`// Exit above upper BB or below VWAP\nclose > BB_UPPER(20) || close < VWAP() * 0.995`}
};

// ── PRESETS ──
const PR={gc:{n:"Golden Cross",en:[{i:"sma",p1:50,c:"xa",t:"sma",p2:200}],ex:[{i:"sma",p1:50,c:"xb",t:"sma",p2:200}]},rsi:{n:"RSI Revert",en:[{i:"rsi",p1:14,c:"lt",t:"val",p2:30}],ex:[{i:"rsi",p1:14,c:"gt",t:"val",p2:70}]},macd:{n:"MACD Mom",en:[{i:"macd_h",p1:12,c:"xa",t:"val",p2:0}],ex:[{i:"macd_h",p1:12,c:"xb",t:"val",p2:0}]},bb:{n:"BB Bounce",en:[{i:"price",p1:0,c:"lt",t:"bb_l",p2:20}],ex:[{i:"price",p1:0,c:"gt",t:"bb_u",p2:20}]},ts:{n:"Triple Screen",en:[{i:"ema",p1:21,c:"xa",t:"ema",p2:55},{i:"rsi",p1:14,c:"lt",t:"val",p2:45},{i:"macd_h",p1:12,c:"gt",t:"val",p2:0}],ex:[{i:"ema",p1:21,c:"xb",t:"ema",p2:55}]}};

// ── ENGINE ──
function gv(ind,p1,p2,d,ix,i){switch(ind){case"price":return d[i].close;case"sma":return(ix[`s${p1}`]||[])[i];case"ema":return(ix[`e${p1}`]||[])[i];case"rsi":return(ix[`r${p1}`]||[])[i];case"macd_h":return ix.mc?.hi?.[i];case"macd_l":return ix.mc?.ml?.[i];case"bb_u":return(ix[`b${p2}`]||[])[i]?.u;case"bb_l":return(ix[`b${p2}`]||[])[i]?.l;case"atr":return(ix[`a${p1}`]||[])[i];case"val":return p2!=null?p2:p1;default:return null}}
function ev(c,d,ix,i){const a=gv(c.i,c.p1,c.p2,d,ix,i),b=gv(c.t,c.p2,c.p2,d,ix,i);if(a==null||b==null)return false;const ap=i>0?gv(c.i,c.p1,c.p2,d,ix,i-1):null,bp=i>0?gv(c.t,c.p2,c.p2,d,ix,i-1):null;if(c.c==="gt")return a>b;if(c.c==="lt")return a<b;if(c.c==="xa")return ap!=null&&bp!=null&&ap<=bp&&a>b;if(c.c==="xb")return ap!=null&&bp!=null&&ap>=bp&&a<b;return false}

function bt(data,enR,exR,cfg){const{cap:c0=10000,sz=100,sl=0,tp=0,dir="long"}=cfg;const ix={};[...enR,...exR].forEach(r=>{if(r.i==="sma"||r.t==="sma")[r.p1,r.p2].forEach(p=>{if(p>0)ix[`s${p}`]=ix[`s${p}`]||sma(data,p)});if(r.i==="ema"||r.t==="ema")[r.p1,r.p2].forEach(p=>{if(p>0)ix[`e${p}`]=ix[`e${p}`]||ema(data,p)});if(r.i==="rsi")ix[`r${r.p1}`]=ix[`r${r.p1}`]||rsi(data,r.p1);if(r.i?.includes("macd")||r.t?.includes("macd"))ix.mc=ix.mc||macd(data);if(r.i?.includes("bb")||r.t?.includes("bb"))ix[`b${r.p2}`]=ix[`b${r.p2}`]||bb(data,r.p2||20);if(r.i==="atr")ix[`a${r.p1}`]=ix[`a${r.p1}`]||atr(data,r.p1)});
let cap=c0,pos=null;const trades=[],eq=[];let peak=c0;
for(let i=1;i<data.length;i++){const d=data[i];if(pos){const pct=dir==="long"?(d.close-pos.ep)/pos.ep*100:(pos.ep-d.close)/pos.ep*100;let rsn=null;if(sl>0&&pct<=-sl)rsn="SL";if(tp>0&&pct>=tp)rsn="TP";if(!rsn&&exR.length>0&&exR.some(r=>ev(r,data,ix,i)))rsn="Signal";if(rsn){const pnl=dir==="long"?(d.close-pos.ep)*pos.sh:(pos.ep-d.close)*pos.sh;cap+=pos.sh*pos.ep+pnl;trades.push({ed:pos.ed,xd:d.date,ep:pos.ep,xp:d.close,sh:pos.sh,pnl:+pnl.toFixed(2),pct:+pct.toFixed(2),rsn,days:i-pos.ei});pos=null}}
if(!pos&&enR.length>0&&enR.every(r=>ev(r,data,ix,i))){const amt=cap*(sz/100);const sh=Math.floor(amt/d.close);if(sh>0){cap-=sh*d.close;pos={ep:d.close,sh,ed:d.date,ei:i}}}
const ce=cap+(pos?pos.sh*d.close:0);peak=Math.max(peak,ce);eq.push({date:d.date,ds:d.ds,eq:+ce.toFixed(2),dd:+((ce-peak)/peak*100).toFixed(2),close:d.close})}
if(pos){const l=data[data.length-1];const pct=dir==="long"?(l.close-pos.ep)/pos.ep*100:(pos.ep-l.close)/pos.ep*100;const pnl=dir==="long"?(l.close-pos.ep)*pos.sh:(pos.ep-l.close)*pos.sh;cap+=pos.sh*pos.ep+pnl;trades.push({ed:pos.ed,xd:l.date,ep:pos.ep,xp:l.close,sh:pos.sh,pnl:+pnl.toFixed(2),pct:+pct.toFixed(2),rsn:"End",days:data.length-1-pos.ei})}
const fin=eq.length?eq[eq.length-1].eq:c0;const w=trades.filter(t=>t.pnl>0),lo=trades.filter(t=>t.pnl<=0);const aw=w.length?w.reduce((s,t)=>s+t.pnl,0)/w.length:0,al=lo.length?lo.reduce((s,t)=>s+t.pnl,0)/lo.length:0;
const rets=eq.map((e,i)=>i===0?0:(e.eq-eq[i-1].eq)/eq[i-1].eq);const ar=rets.reduce((a,b)=>a+b,0)/rets.length,sr=Math.sqrt(rets.reduce((a,b)=>a+(b-ar)**2,0)/rets.length);
return{trades,eq,stats:{ret:+(((fin-c0)/c0)*100).toFixed(2),fin:+fin.toFixed(2),n:trades.length,wr:trades.length?+((w.length/trades.length)*100).toFixed(1):0,aw:+aw.toFixed(2),al:+al.toFixed(2),pf:Math.abs(al)>0?+(aw*w.length/Math.abs(al*lo.length||1)).toFixed(2):w.length>0?999:0,mdd:+(Math.min(...eq.map(e=>e.dd),0)).toFixed(2),sh:sr>0?+((ar/sr)*Math.sqrt(252)).toFixed(2):0,exp:trades.length?+((aw*w.length/trades.length+al*lo.length/trades.length)).toFixed(2):0,ah:trades.length?+(trades.reduce((s,t)=>s+t.days,0)/trades.length).toFixed(1):0,wn:w.length,ls:lo.length}}}

// ── MONTE CARLO ──
function mc(trades,c0,ns=1000){if(trades.length<2)return null;const pnls=trades.map(t=>t.pnl);const finals=[],paths=[];
for(let s=0;s<ns;s++){const sh=[...pnls].sort(()=>Math.random()-.5);let e=c0,pk=c0;const pa=[c0];for(const p of sh){e+=p;pk=Math.max(pk,e);pa.push(+e.toFixed(2))}paths.push(pa);finals.push(e)}
finals.sort((a,b)=>a-b);const len=pnls.length+1;const p5=[],p25=[],p50=[],p75=[],p95=[];
for(let i=0;i<len;i++){const col=paths.map(p=>p[i]).sort((a,b)=>a-b);p5.push(col[Math.floor(ns*.05)]);p25.push(col[Math.floor(ns*.25)]);p50.push(col[Math.floor(ns*.5)]);p75.push(col[Math.floor(ns*.75)]);p95.push(col[Math.floor(ns*.95)])}
const cd=Array.from({length:len},(_,i)=>({x:i,p5:+p5[i].toFixed(0),p25:+p25[i].toFixed(0),p50:+p50[i].toFixed(0),p75:+p75[i].toFixed(0),p95:+p95[i].toFixed(0)}));
return{cd,med:+finals[Math.floor(ns*.5)].toFixed(0),lo:+finals[0].toFixed(0),hi:+finals[ns-1].toFixed(0),p5f:+finals[Math.floor(ns*.05)].toFixed(0),p95f:+finals[Math.floor(ns*.95)].toFixed(0),pp:+((finals.filter(f=>f>c0).length/ns)*100).toFixed(1),pr:+((finals.filter(f=>f<c0*.5).length/ns)*100).toFixed(1)}}

// ── EXCHANGE PARSERS ──
const EXCHANGES=[
  {id:"binance",name:"Binance",url:"https://api.binance.com",note:"Spot & Futures",logo:"https://assets.coingecko.com/markets/images/52/small/binance.jpg"},
  {id:"hyperliquid",name:"Hyperliquid",url:"https://api.hyperliquid.xyz",note:"Perps DEX",logo:"https://assets.coingecko.com/markets/images/1262/small/hyperliquid-logo.jpeg"},
  {id:"bybit",name:"Bybit",url:"https://api.bybit.com",note:"Derivatives",logo:"https://assets.coingecko.com/markets/images/698/small/bybit_spot.png"},
  {id:"okx",name:"OKX",url:"https://www.okx.com",note:"Multi-asset",logo:"https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png"},
  {id:"bitget",name:"Bitget",url:"https://api.bitget.com",note:"Copy Trading",logo:"https://assets.coingecko.com/markets/images/540/small/Bitget.jpg"},
  {id:"kucoin",name:"KuCoin",url:"https://api.kucoin.com",note:"Spot & Futures",logo:"https://assets.coingecko.com/markets/images/61/small/kucoin.jpg"},
  {id:"csv",name:"CSV Import",url:"",note:"Upload trade history",logo:""}
];

function parseCSVTrades(text){
  const lines=text.trim().split("\n");if(lines.length<2)return[];
  const hdr=lines[0].toLowerCase().split(",").map(h=>h.trim());
  const dateI=hdr.findIndex(h=>h.includes("date")||h.includes("time"));
  const sideI=hdr.findIndex(h=>h.includes("side")||h.includes("type")||h.includes("direction"));
  const symI=hdr.findIndex(h=>h.includes("symbol")||h.includes("pair")||h.includes("market"));
  const priceI=hdr.findIndex(h=>h.includes("price"));
  const qtyI=hdr.findIndex(h=>h.includes("qty")||h.includes("quantity")||h.includes("amount")||h.includes("size"));
  const pnlI=hdr.findIndex(h=>h.includes("pnl")||h.includes("profit")||h.includes("realized"));
  const feeI=hdr.findIndex(h=>h.includes("fee")||h.includes("commission"));
  return lines.slice(1).map((l,idx)=>{const cols=l.split(",").map(c=>c.trim().replace(/"/g,""));return{id:idx,date:dateI>=0?cols[dateI]:"",side:sideI>=0?cols[sideI]:"",symbol:symI>=0?cols[symI]:"",price:priceI>=0?parseFloat(cols[priceI])||0:0,qty:qtyI>=0?parseFloat(cols[qtyI])||0:0,pnl:pnlI>=0?parseFloat(cols[pnlI])||0:0,fee:feeI>=0?parseFloat(cols[feeI])||0:0,source:"csv"}}).filter(t=>t.date)}

// ── UI ATOMS (Modern Fintech) ──
const Btn=({children,active,color,onClick,style:sx})=><button onClick={onClick} style={{background:active?(color||C.ac):"transparent",color:active?"#fff":(color||C.tm),border:`1px solid ${active?(color||C.ac):C.bd}`,borderRadius:12,padding:"10px 20px",fontSize:14,fontFamily:SA,fontWeight:600,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap",letterSpacing:"-0.01em",...sx}}>{children}</button>;
const Stat=({label,value,sub,color,big})=><div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:16,padding:big?"24px 28px":"16px 20px"}}><div style={{fontFamily:SA,fontSize:12,color:C.td,textTransform:"uppercase",letterSpacing:".06em",marginBottom:6,fontWeight:600}}>{label}</div><div style={{fontFamily:SA,fontSize:big?36:24,fontWeight:800,color:color||C.tx,lineHeight:1.1,letterSpacing:"-0.03em"}}>{value}</div>{sub&&<div style={{fontFamily:MO,fontSize:12,color:C.td,marginTop:4}}>{sub}</div>}</div>;
const Sel=({value,onChange,options,style:sx})=><select value={value} onChange={e=>onChange(e.target.value)} style={{background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:10,padding:"10px 14px",fontFamily:SA,fontSize:14,fontWeight:500,outline:"none",cursor:"pointer",...sx}}>{options.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>;
const Num=({value,onChange,min,max,step,style:sx})=><input type="number" value={value} min={min} max={max} step={step||1} onChange={e=>onChange(+e.target.value)} style={{background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:10,padding:"10px 14px",fontFamily:MO,fontSize:14,width:90,outline:"none",...sx}}/>;
const IO=[{v:"price",l:"Price"},{v:"sma",l:"SMA"},{v:"ema",l:"EMA"},{v:"rsi",l:"RSI"},{v:"macd_h",l:"MACD Hist"},{v:"atr",l:"ATR"}];
const TO=[{v:"val",l:"Value"},{v:"sma",l:"SMA"},{v:"ema",l:"EMA"},{v:"bb_u",l:"BB Up"},{v:"bb_l",l:"BB Lo"}];
const CO=[{v:"gt",l:">"},{v:"lt",l:"<"},{v:"xa",l:"X Above"},{v:"xb",l:"X Below"}];
const CR=({c,onChange,onRm})=><div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0",borderBottom:`1px solid ${C.bd}`,flexWrap:"wrap"}}><Sel value={c.i} onChange={v=>onChange({...c,i:v})} options={IO}/>{!["price"].includes(c.i)&&<Num value={c.p1} onChange={v=>onChange({...c,p1:v})} min={1} max={500}/>}<Sel value={c.c} onChange={v=>onChange({...c,c:v})} options={CO}/><Sel value={c.t} onChange={v=>onChange({...c,t:v})} options={TO}/><Num value={c.p2} onChange={v=>onChange({...c,p2:v})} min={0} max={500}/><button onClick={onRm} style={{background:C.rd,color:C.r,border:"none",borderRadius:8,padding:"8px 14px",cursor:"pointer",fontFamily:SA,fontSize:13,fontWeight:600}}>Remove</button></div>;
const TT=({active,payload,label})=>{if(!active||!payload?.length)return null;return<div style={{background:C.s2,border:`1px solid ${C.bd}`,borderRadius:12,padding:"12px 16px",fontFamily:SA,fontSize:13,boxShadow:"0 8px 32px rgba(0,0,0,.5)"}}><div style={{color:C.tm,marginBottom:6,fontWeight:600}}>{label}</div>{payload.filter(p=>p.value!=null).map((p,i)=><div key={i} style={{color:p.color||C.tx,fontFamily:MO,fontSize:12}}>{p.name}: {typeof p.value==="number"?p.value.toLocaleString(undefined,{maximumFractionDigits:2}):p.value}</div>)}</div>;};
const Section=({title,children,defaultOpen=true})=>{const[open,setOpen]=useState(defaultOpen);return<div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:16,marginBottom:16,overflow:"hidden"}}><button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px",background:"transparent",border:"none",color:C.tx,cursor:"pointer",fontFamily:SA,fontSize:16,fontWeight:700}}>{title}<span style={{color:C.td,fontSize:14,transform:open?"rotate(180deg)":"rotate(0)",transition:"transform .2s"}}>▾</span></button>{open&&<div style={{padding:"0 20px 20px"}}>{children}</div>}</div>};

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
// ── MARKET DATA FETCHER ──
const DEFAULT_ASSETS=[
  {id:"bitcoin",sym:"BTC",name:"Bitcoin"},{id:"ethereum",sym:"ETH",name:"Ethereum"},
  {id:"solana",sym:"SOL",name:"Solana"},{id:"ripple",sym:"XRP",name:"XRP"},
  {id:"dogecoin",sym:"DOGE",name:"Dogecoin"},{id:"cardano",sym:"ADA",name:"Cardano"},
  {id:"avalanche-2",sym:"AVAX",name:"Avalanche"},{id:"chainlink",sym:"LINK",name:"Chainlink"},
  {id:"polkadot",sym:"DOT",name:"Polkadot"},{id:"matic-network",sym:"MATIC",name:"Polygon"},
  {id:"near",sym:"NEAR",name:"NEAR"},{id:"litecoin",sym:"LTC",name:"Litecoin"},
  {id:"uniswap",sym:"UNI",name:"Uniswap"},{id:"aptos",sym:"APT",name:"Aptos"},
  {id:"sui",sym:"SUI",name:"Sui"},{id:"arbitrum",sym:"ARB",name:"Arbitrum"},
  {id:"optimism",sym:"OP",name:"Optimism"},{id:"pepe",sym:"PEPE",name:"Pepe"},
  {id:"render-token",sym:"RENDER",name:"Render"},{id:"injective-protocol",sym:"INJ",name:"Injective"},
  {id:"toncoin",sym:"TON",name:"Toncoin"},{id:"shiba-inu",sym:"SHIB",name:"Shiba Inu"},
  {id:"stellar",sym:"XLM",name:"Stellar"},{id:"hedera-hashgraph",sym:"HBAR",name:"Hedera"},
  {id:"cosmos",sym:"ATOM",name:"Cosmos"},{id:"internet-computer",sym:"ICP",name:"Internet Computer"},
  {id:"filecoin",sym:"FIL",name:"Filecoin"},{id:"aave",sym:"AAVE",name:"Aave"},
  {id:"the-graph",sym:"GRT",name:"The Graph"},{id:"maker",sym:"MKR",name:"Maker"},
  {id:"algorand",sym:"ALGO",name:"Algorand"},{id:"fantom",sym:"FTM",name:"Fantom"},
  {id:"theta-token",sym:"THETA",name:"Theta"},{id:"eos",sym:"EOS",name:"EOS"},
  {id:"flow",sym:"FLOW",name:"Flow"},{id:"tezos",sym:"XTZ",name:"Tezos"},
  {id:"gala",sym:"GALA",name:"Gala"},{id:"decentraland",sym:"MANA",name:"Decentraland"},
  {id:"the-sandbox",sym:"SAND",name:"The Sandbox"},{id:"axie-infinity",sym:"AXS",name:"Axie Infinity"},
  {id:"enjincoin",sym:"ENJ",name:"Enjin"},{id:"curve-dao-token",sym:"CRV",name:"Curve"},
  {id:"1inch",sym:"1INCH",name:"1inch"},{id:"compound-governance-token",sym:"COMP",name:"Compound"},
  {id:"lido-dao",sym:"LDO",name:"Lido DAO"},{id:"worldcoin-wld",sym:"WLD",name:"Worldcoin"},
  {id:"fetch-ai",sym:"FET",name:"Fetch.ai"},{id:"bonk",sym:"BONK",name:"Bonk"},
  {id:"floki",sym:"FLOKI",name:"Floki"},{id:"sei-network",sym:"SEI",name:"Sei"},
  {id:"celestia",sym:"TIA",name:"Celestia"},{id:"jupiter-exchange-solana",sym:"JUP",name:"Jupiter"},
  {id:"jito-governance-token",sym:"JTO",name:"Jito"},{id:"pyth-network",sym:"PYTH",name:"Pyth"},
  {id:"starknet",sym:"STRK",name:"Starknet"},{id:"blur",sym:"BLUR",name:"Blur"},
  {id:"ondo-finance",sym:"ONDO",name:"Ondo"},{id:"ethena",sym:"ENA",name:"Ethena"},
  {id:"pendle",sym:"PENDLE",name:"Pendle"},{id:"wormhole",sym:"W",name:"Wormhole"},
  {id:"kaspa",sym:"KAS",name:"Kaspa"},{id:"mantle",sym:"MNT",name:"Mantle"},
  {id:"_synthetic",sym:"SYN",name:"Synthetic (Random)"}
];

// Search CoinGecko for any coin
async function searchCoins(query){
  if(!query||query.length<2)return[];
  try{const r=await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`);
  if(!r.ok)return[];const d=await r.json();
  return(d.coins||[]).slice(0,12).map(c=>({id:c.id,sym:c.symbol?.toUpperCase(),name:c.name}))}catch(e){return[]}
}

const ASSETS=DEFAULT_ASSETS;
const TF_DAYS=[{v:30,l:"30 Days"},{v:90,l:"90 Days"},{v:180,l:"180 Days"},{v:365,l:"1 Year"}];

async function fetchCoinGecko(coinId,days){
  // Use market_chart for better granularity — returns price,vol arrays
  const url=`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
  const r=await fetch(url);if(!r.ok)throw new Error(`CoinGecko ${r.status}`);
  const raw=await r.json();
  if(!raw.prices||raw.prices.length<5)throw new Error("Not enough data");
  // Convert to OHLCV — market_chart gives [timestamp, price] arrays
  // We simulate OHLC from daily prices with some variance
  return raw.prices.map((p,i)=>{
    const dt=new Date(p[0]);const price=p[1];
    const vol=raw.total_volumes?.[i]?.[1]||0;
    const prevPrice=i>0?raw.prices[i-1][1]:price;
    const high=Math.max(price,prevPrice)*(1+Math.random()*0.01);
    const low=Math.min(price,prevPrice)*(1-Math.random()*0.01);
    return{date:dt.toISOString().split("T")[0],ds:`${dt.getMonth()+1}/${dt.getDate()}`,open:+prevPrice.toFixed(2),high:+high.toFixed(2),low:+low.toFixed(2),close:+price.toFixed(2),volume:Math.floor(vol)}
  }).slice(1); // skip first since we need prev price
}

async function fetchHyperliquid(coin,days){
  const end=Date.now();const start=end-days*864e5;
  const r=await fetch("https://api.hyperliquid.xyz/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"candleSnapshot",req:{coin,interval:"1d",startTime:start,endTime:end}})});
  if(!r.ok)throw new Error(`Hyperliquid ${r.status}`);
  const raw=await r.json();
  return raw.map(c=>{const dt=new Date(c.t);return{date:dt.toISOString().split("T")[0],ds:`${dt.getMonth()+1}/${dt.getDate()}`,open:+parseFloat(c.o).toFixed(2),high:+parseFloat(c.h).toFixed(2),low:+parseFloat(c.l).toFixed(2),close:+parseFloat(c.c).toFixed(2),volume:+parseFloat(c.v).toFixed(0)}});
}

async function fetchMarketData(assetId,days){
  if(assetId==="_synthetic")return genOHLCV(days,100);
  // Try CoinGecko first, fallback to Hyperliquid for major coins
  const asset=ASSETS.find(a=>a.id===assetId);
  try{const d=await fetchCoinGecko(assetId,days);if(d.length>5)return d}catch(e){console.warn("CoinGecko failed:",e.message)}
  if(asset){try{const d=await fetchHyperliquid(asset.sym,days);if(d.length>5)return d}catch(e){console.warn("Hyperliquid failed:",e.message)}}
  console.warn("All sources failed, using synthetic");return genOHLCV(days,100);
}

export default function StrategyLab(){
  const [data,setData]=useState(()=>genOHLCV(500,100));
  const [asset,setAsset]=useState("bitcoin");
  const [tfDays,setTfDays]=useState(90);
  const [dataLoading,setDataLoading]=useState(false);
  const [dataSource,setDataSource]=useState("synthetic");
  const [assetSearch,setAssetSearch]=useState("");
  const [searchResults,setSearchResults]=useState([]);
  const [showAssetDrop,setShowAssetDrop]=useState(false);
  const searchTimeout=useRef(null);
  const assetDropRef=useRef(null);

  // Search coins on typing
  useEffect(()=>{
    if(!assetSearch||assetSearch.length<2){setSearchResults([]);return}
    clearTimeout(searchTimeout.current);
    searchTimeout.current=setTimeout(async()=>{const r=await searchCoins(assetSearch);setSearchResults(r)},400);
  },[assetSearch]);

  // Close dropdown on click outside
  useEffect(()=>{const h=(e)=>{if(assetDropRef.current&&!assetDropRef.current.contains(e.target))setShowAssetDrop(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);
  const [preset,setPreset]=useState("gc");
  const [enR,setEnR]=useState(JSON.parse(JSON.stringify(PR.gc.en)));
  const [exR,setExR]=useState(JSON.parse(JSON.stringify(PR.gc.ex)));
  const [cfg,setCfg]=useState({cap:10000,sz:100,sl:0,tp:0,dir:"long"});
  const [pg,setPg]=useState("bt");const [ct,setCt]=useState("eq");
  const [showT,setShowT]=useState(false);const [sideO,setSideO]=useState(true);
  const [mode,setMode]=useState("visual"); // "visual" | "code"
  const [codeEn,setCodeEn]=useState(CODE_PRESETS.maCross.en);
  const [codeEx,setCodeEx]=useState(CODE_PRESETS.maCross.ex);
  const [codeErr,setCodeErr]=useState("");

  // Fetch market data on asset/timeframe change
  const loadData=useCallback(async(aid,days)=>{
    setDataLoading(true);
    try{
      const cached=localStorage.getItem(`sl_data_${aid}_${days}`);
      if(cached){const parsed=JSON.parse(cached);if(parsed.length>5&&Date.now()-parsed._ts<36e5){setData(parsed);setDataSource(aid==="_synthetic"?"synthetic":"live");setDataLoading(false);return}}
      const d=await fetchMarketData(aid,days);
      d._ts=Date.now();
      try{localStorage.setItem(`sl_data_${aid}_${days}`,JSON.stringify(d))}catch(e){}
      setData(d);setDataSource(aid==="_synthetic"?"synthetic":"live");
    }catch(e){setData(genOHLCV(days,100));setDataSource("synthetic")}
    finally{setDataLoading(false)}
  },[]);

  useEffect(()=>{loadData(asset,tfDays)},[asset,tfDays,loadData]);

  // AI
  const [apiKey,setApiKey]=useState("");const [aiMsg,setAiMsg]=useState("");
  const [aiChat,setAiChat]=useState([]);const [aiLoad,setAiLoad]=useState(false);
  const [showK,setShowK]=useState(false);const aiEnd=useRef(null);

  // Journal
  const [jEntries,setJEntries]=useState([]);const [jNote,setJNote]=useState("");
  const [jMood,setJMood]=useState("neutral");const [jTags,setJTags]=useState([]);

  // Exchange
  const [exch,setExch]=useState("csv");const [exKey,setExKey]=useState("");
  const [exSecret,setExSecret]=useState("");const [exTrades,setExTrades]=useState([]);
  const [exLoading,setExLoading]=useState(false);const [exError,setExError]=useState("");
  const [exConnected,setExConnected]=useState(false);
  const fileRef=useRef(null);

  // Portfolio state
  const [portfolio,setPortfolio]=useState(null); // {balance, positions, unrealizedPnl, marginUsed, accountValue}
  const [portLoading,setPortLoading]=useState(false);
  const [portError,setPortError]=useState("");
  const portInterval=useRef(null);

  // Fetch Hyperliquid portfolio
  const fetchPortfolio=useCallback(async(addr)=>{
    if(!addr||addr.length<10)return;
    setPortLoading(true);setPortError("");
    try{
      // Get clearinghouse state (balance + positions)
      const [stateR,metaR]=await Promise.all([
        fetch("https://api.hyperliquid.xyz/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"clearinghouseState",user:addr})}),
        fetch("https://api.hyperliquid.xyz/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"meta"})})
      ]);
      if(!stateR.ok)throw new Error(`API ${stateR.status}`);
      const state=await stateR.json();
      const meta=await metaR.json();
      const coinMap={};if(meta?.universe)meta.universe.forEach((u,i)=>{coinMap[i]=u.name});

      const marginSummary=state.marginSummary||{};
      const positions=(state.assetPositions||[]).map(p=>{
        const pos=p.position||p;
        const size=parseFloat(pos.szi||0);
        const entryPx=parseFloat(pos.entryPx||0);
        const markPx=parseFloat(pos.positionValue||0)/Math.abs(size||1);
        const unrealized=parseFloat(pos.unrealizedPnl||0);
        const leverage=parseFloat(pos.leverage?.value||pos.leverage||0);
        return{coin:pos.coin||coinMap[pos.assetId]||"?",size,entryPx,unrealized:+unrealized.toFixed(2),leverage,side:size>0?"LONG":"SHORT",liqPx:parseFloat(pos.liquidationPx||0),marginUsed:parseFloat(pos.marginUsed||0),returnPct:entryPx>0?+((size>0?(markPx-entryPx)/entryPx:(entryPx-markPx)/entryPx)*100).toFixed(2):0}
      }).filter(p=>Math.abs(p.size)>0);

      const accountValue=parseFloat(marginSummary.accountValue||0);
      const totalMarginUsed=parseFloat(marginSummary.totalMarginUsed||0);
      const totalUnrealized=positions.reduce((s,p)=>s+p.unrealized,0);
      const withdrawable=parseFloat(marginSummary.withdrawable||0);

      setPortfolio({
        accountValue:+accountValue.toFixed(2),
        balance:+(accountValue-totalUnrealized).toFixed(2),
        withdrawable:+withdrawable.toFixed(2),
        unrealizedPnl:+totalUnrealized.toFixed(2),
        marginUsed:+totalMarginUsed.toFixed(2),
        positions,
        lastUpdate:new Date().toLocaleTimeString()
      });
    }catch(e){setPortError(e.message)}
    finally{setPortLoading(false)}
  },[]);

  // Auto-refresh portfolio every 15s when connected to Hyperliquid
  useEffect(()=>{
    if(exch==="hyperliquid"&&exKey&&exConnected){
      fetchPortfolio(exKey);
      portInterval.current=setInterval(()=>fetchPortfolio(exKey),15000);
      return()=>clearInterval(portInterval.current);
    }else{clearInterval(portInterval.current)}
  },[exch,exKey,exConnected,fetchPortfolio]);

  useEffect(()=>{try{const j=localStorage.getItem("sl_journal");if(j)setJEntries(JSON.parse(j))}catch(e){}try{const k=localStorage.getItem("sl_apikey");if(k)setApiKey(k)}catch(e){}try{const t=localStorage.getItem("sl_trades");if(t)setExTrades(JSON.parse(t))}catch(e){}try{const c=localStorage.getItem("sl_code_en");if(c)setCodeEn(c)}catch(e){}try{const c=localStorage.getItem("sl_code_ex");if(c)setCodeEx(c)}catch(e){}try{const b=localStorage.getItem("sl_balance");if(b)setCfg(c=>({...c,cap:+b}))}catch(e){}},[]);

  // Persist balance
  useEffect(()=>{try{localStorage.setItem("sl_balance",String(cfg.cap))}catch(e){}},[cfg.cap]);

  const saveJ=useCallback((e)=>{setJEntries(e);try{localStorage.setItem("sl_journal",JSON.stringify(e))}catch(ex){}},[]);
  const saveExTrades=useCallback((t)=>{setExTrades(t);try{localStorage.setItem("sl_trades",JSON.stringify(t))}catch(ex){}},[]);

  // Export all data as JSON
  const exportData=useCallback(()=>{const d={journal:jEntries,trades:exTrades,codeEntry:codeEn,codeExit:codeEx,config:cfg,entryRules:enR,exitRules:exR,preset,mode,version:1};const blob=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`strategy-lab-backup-${new Date().toISOString().split("T")[0]}.json`;a.click();URL.revokeObjectURL(url)},[jEntries,exTrades,codeEn,codeEx,cfg,enR,exR,preset,mode]);
  const importRef=useRef(null);
  const importData=useCallback((e)=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=(ev)=>{try{const d=JSON.parse(ev.target.result);if(d.journal){setJEntries(d.journal);localStorage.setItem("sl_journal",JSON.stringify(d.journal))}if(d.trades){setExTrades(d.trades);localStorage.setItem("sl_trades",JSON.stringify(d.trades))}if(d.codeEntry)setCodeEn(d.codeEntry);if(d.codeExit)setCodeEx(d.codeExit);if(d.config)setCfg(d.config);if(d.entryRules)setEnR(d.entryRules);if(d.exitRules)setExR(d.exitRules);if(d.preset)setPreset(d.preset);if(d.mode)setMode(d.mode)}catch(ex){alert("Invalid backup file")}};r.readAsText(f)},[]);

  const applyP=useCallback(k=>{setPreset(k);setEnR(JSON.parse(JSON.stringify(PR[k].en)));setExR(JSON.parse(JSON.stringify(PR[k].ex)))},[]);
  const addR=(t)=>{const nr={i:"sma",p1:20,c:"xa",t:"sma",p2:50};if(t==="en")setEnR(p=>[...p,nr]);else setExR(p=>[...p,nr]);setPreset("custom")};
  useEffect(()=>{try{localStorage.setItem("sl_code_en",codeEn)}catch(e){}},[codeEn]);
  useEffect(()=>{try{localStorage.setItem("sl_code_ex",codeEx)}catch(e){}},[codeEx]);

  const res=useMemo(()=>{if(mode==="code"){const r=btCode(data,codeEn,codeEx,cfg);if(r.error)setCodeErr(r.error);else setCodeErr("");return r}return bt(data,enR,exR,cfg)},[data,enR,exR,cfg,mode,codeEn,codeEx]);
  const mcRes=useMemo(()=>mc(res.trades,cfg.cap,1000),[res.trades,cfg.cap]);
  const s=res.stats;const rc=s.ret>=0?C.g:C.r;

  const pwt=useMemo(()=>{const m={};res.trades.forEach(t=>{m[t.ed]={ty:"en",p:t.ep};m[t.xd]={ty:"ex",p:t.xp}});return data.map(d=>({...d,entry:m[d.date]?.ty==="en"?m[d.date].p:undefined,exit:m[d.date]?.ty==="ex"?m[d.date].p:undefined}))},[data,res]);

  // Exchange Stats
  const exStats=useMemo(()=>{if(!exTrades.length)return null;const tot=exTrades.reduce((s,t)=>s+t.pnl,0);const fees=exTrades.reduce((s,t)=>s+t.fee,0);const w=exTrades.filter(t=>t.pnl>0);const l=exTrades.filter(t=>t.pnl<=0);const aw=w.length?w.reduce((s,t)=>s+t.pnl,0)/w.length:0;const al=l.length?l.reduce((s,t)=>s+t.pnl,0)/l.length:0;
  const bySymbol={};exTrades.forEach(t=>{if(!bySymbol[t.symbol])bySymbol[t.symbol]={pnl:0,n:0,vol:0};bySymbol[t.symbol].pnl+=t.pnl;bySymbol[t.symbol].n++;bySymbol[t.symbol].vol+=t.price*t.qty});
  const cumPnl=[];let cum=0;exTrades.forEach(t=>{cum+=t.pnl;cumPnl.push({date:t.date,pnl:+cum.toFixed(2)})});
  return{tot:+tot.toFixed(2),fees:+fees.toFixed(2),n:exTrades.length,wr:exTrades.length?+((w.length/exTrades.length)*100).toFixed(1):0,aw:+aw.toFixed(2),al:+al.toFixed(2),bySymbol,cumPnl,wn:w.length,ls:l.length,pf:Math.abs(al)>0?+(aw*w.length/Math.abs(al*l.length||1)).toFixed(2):0}},[exTrades]);

  // AI Send
  const sendAI=useCallback(async(cm)=>{const msg=cm||aiMsg;if(!msg.trim()||!apiKey)return;
  const ctx=JSON.stringify({strategy:{entry:enR,exit:exR,config:cfg},stats:s,mc:mcRes?{median:mcRes.med,p5:mcRes.p5f,p95:mcRes.p95f,probProfit:mcRes.pp,probRuin:mcRes.pr}:null,exchangeStats:exStats,portfolio:portfolio?{accountValue:portfolio.accountValue,unrealizedPnl:portfolio.unrealizedPnl,positions:portfolio.positions,marginUsed:portfolio.marginUsed}:null,recentTrades:res.trades.slice(-15)});
  const nc=[...aiChat,{role:"user",content:msg}];setAiChat(nc);setAiMsg("");setAiLoad(true);
  try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:`You are an expert quant trading strategist. Be specific, data-driven, reference actual numbers.\n\nCONTEXT:\n${ctx}\n\nQuestion: ${msg}`}]})});
  const d=await r.json();if(d.error)setAiChat([...nc,{role:"assistant",content:`Error: ${d.error.message}`}]);else{const txt=d.content?.map(b=>b.text||"").join("\n")||"No response";setAiChat([...nc,{role:"assistant",content:txt}])}}catch(e){setAiChat([...nc,{role:"assistant",content:`Error: ${e.message}`}])}finally{setAiLoad(false)}},[aiMsg,apiKey,aiChat,s,enR,exR,cfg,mcRes,res.trades,exStats]);
  useEffect(()=>{aiEnd.current?.scrollIntoView({behavior:"smooth"})},[aiChat]);

  // CSV handler
  const handleCSV=useCallback((e)=>{const f=e.target.files?.[0];if(!f)return;const reader=new FileReader();reader.onload=(ev)=>{const parsed=parseCSVTrades(ev.target.result);if(parsed.length){saveExTrades(parsed);setExConnected(true);setExError("")}else setExError("Could not parse trades. Ensure CSV has headers: date, side, symbol, price, qty, pnl, fee")};reader.readAsText(f)},[saveExTrades]);

  // Exchange Connect (attempts API, falls back to instructions)
  const connectExchange=useCallback(async()=>{if(exch==="csv")return;if(!exKey){setExError("Enter your API key");return}
  setExLoading(true);setExError("");
  try{
    if(exch==="hyperliquid"){
      const r=await fetch("https://api.hyperliquid.xyz/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"userFills",user:exKey})});
      const d=await r.json();if(Array.isArray(d)&&d.length>0){const parsed=d.map((t,i)=>({id:i,date:t.time||new Date(t.tid).toISOString(),side:t.side,symbol:t.coin,price:parseFloat(t.px),qty:parseFloat(t.sz),pnl:parseFloat(t.closedPnl||0),fee:parseFloat(t.fee||0),source:"hyperliquid"}));saveExTrades(parsed);setExConnected(true)}else if(Array.isArray(d)){setExError("No trades found for this address");setExConnected(true)}else{setExError(JSON.stringify(d).slice(0,200))}}
    else{setExError(`Direct browser connection to ${EXCHANGES.find(e=>e.id===exch)?.name} requires HMAC signing which needs a backend. For now: 1) Export your trade history as CSV from your exchange, 2) Use CSV Import to load it here. We're working on a proxy server for direct connections.`)}
  }catch(e){setExError(`Connection failed: ${e.message}. Try CSV Import instead.`)}finally{setExLoading(false)}},[exch,exKey,saveExTrades]);

  const NAV=[{id:"bt",icon:"◈",l:"Backtest"},{id:"mc",icon:"◉",l:"Monte Carlo"},{id:"ex",icon:"⬡",l:"Exchange"},{id:"ai",icon:"⚡",l:"AI Advisor"},{id:"jn",icon:"✎",l:"Journal"},{id:"rk",icon:"△",l:"Risk Lab"}];
  const MOODS=["confident","neutral","fearful","greedy","disciplined","tilted"];
  const TAGS=["trend","reversal","breakout","scalp","swing","overtraded","revenge","patient"];

  const riskCalc=useMemo(()=>{const wr=s.wr/100,lr=1-wr;const rr=Math.abs(s.al)>0?Math.abs(s.aw/s.al):0;const kelly=Math.abs(s.al)>0?((wr*rr-lr)/rr)*100:0;return{kelly:+kelly.toFixed(1),hk:+(kelly/2).toFixed(1),rr:+rr.toFixed(2)}},[s]);

  return <div style={{background:C.bg,minHeight:"100vh",color:C.tx,fontFamily:SA,display:"flex",flexDirection:"column"}}>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
    <style>{`*{box-sizing:border-box;scrollbar-width:thin;scrollbar-color:${C.s3} transparent}::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-thumb{background:${C.s3};border-radius:6px}::selection{background:${C.ac}40}@keyframes fi{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.fi{animation:fi .4s cubic-bezier(.16,1,.3,1) both}@keyframes pu{0%,100%{opacity:.3}50%{opacity:1}}button{transition:all .15s}button:hover{opacity:.85}button:active{transform:scale(.98)}textarea,input[type=text],input[type=password],input[type=number]{font-size:16px}.nav-scroll{display:flex;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch}.nav-scroll::-webkit-scrollbar{display:none}.chart-scroll{display:flex;gap:8px;overflow-x:auto;-webkit-overflow-scrolling:touch;margin-bottom:16px;padding-bottom:4px}.chart-scroll::-webkit-scrollbar{display:none}@media(min-width:600px){textarea,input[type=text],input[type=password],input[type=number]{font-size:14px}}@media(max-width:768px){.hide-mobile{display:none !important}.hdr-wrap{flex-direction:column !important;align-items:stretch !important;height:auto !important;padding:12px 16px !important;gap:10px !important;position:relative}.hdr-top{display:flex;justify-content:space-between;align-items:center}.hdr-assets{width:100%}.hdr-assets select{flex:1;min-width:0;font-size:13px !important;padding:8px 10px !important}.main-p{padding:14px !important}.stat-g{grid-template-columns:repeat(2,1fr) !important;gap:8px !important}.stat-g>div{padding:12px 14px !important}.stat-val{font-size:20px !important}.stat-val-big{font-size:26px !important}.nav-btn{padding:10px 14px !important;font-size:13px !important;border-radius:10px !important}.foot-links{gap:8px !important}.foot-links a{padding:6px 10px !important;font-size:12px !important}.bal-input{font-size:20px !important;padding:10px 14px !important}.page-h{font-size:20px !important}.sect-h{font-size:14px !important}}@media(max-width:480px){.stat-g{grid-template-columns:1fr 1fr !important}.nav-btn{padding:8px 10px !important;font-size:12px !important}.stat-val-big{font-size:22px !important}}`}</style>

    {/* ═══ HEADER ═══ */}
    <div className="hdr-wrap" style={{background:C.sf,borderBottom:`1px solid ${C.bd}`,padding:"12px 24px",display:"flex",alignItems:"center",gap:16,flexShrink:0,flexWrap:"wrap",position:"relative"}}>
      <div className="hdr-top" style={{display:"flex",alignItems:"center",gap:12}}>
        <img src={LOGO} alt="Strategy Lab" style={{width:36,height:36,borderRadius:10}}/>
        <div>
          <div style={{fontSize:18,fontWeight:800,letterSpacing:"-.03em",lineHeight:1}}>Strategy <span style={{color:C.g}}>Lab</span></div>
          <div className="hide-mobile" style={{fontSize:11,color:C.td,fontWeight:500,marginTop:2}}>Backtest · Simulate · Optimize</div>
        </div>
      </div>

      <div className="hide-mobile" style={{width:1,height:28,background:C.bd,margin:"0 4px"}}/>

      {/* Asset Picker */}
      <div className="hdr-assets" style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <div ref={assetDropRef} style={{position:"relative",flex:1,minWidth:140}}>
          <button onClick={()=>setShowAssetDrop(!showAssetDrop)} style={{background:C.s2,color:C.tx,border:`1px solid ${showAssetDrop?C.ac:C.bd}`,borderRadius:12,padding:"8px 14px",fontFamily:SA,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8,width:"100%"}}>
            <span>{ASSETS.find(a=>a.id===asset)?.sym||"BTC"}</span>
            <span className="hide-mobile" style={{color:C.td,fontWeight:500,fontSize:13}}>{ASSETS.find(a=>a.id===asset)?.name||"Bitcoin"}</span>
            <span style={{color:C.td,fontSize:12,marginLeft:"auto"}}>▾</span>
          </button>
          {showAssetDrop&&<div style={{position:"absolute",top:"100%",left:0,marginTop:6,background:C.sf,border:`1px solid ${C.bd}`,borderRadius:16,width:"min(320px,90vw)",maxHeight:380,overflow:"hidden",zIndex:999,boxShadow:"0 16px 48px rgba(0,0,0,.6)"}}>
            <div style={{padding:10,borderBottom:`1px solid ${C.bd}`}}>
              <input value={assetSearch} onChange={e=>setAssetSearch(e.target.value)} placeholder="Search any coin..." autoFocus style={{width:"100%",background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:10,padding:"10px 14px",fontFamily:SA,fontSize:14,outline:"none"}}/>
            </div>
            <div style={{overflowY:"auto",maxHeight:300}}>
              {searchResults.length>0&&<><div style={{padding:"8px 14px",fontSize:11,color:C.td,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Search Results</div>
              {searchResults.map(a=><button key={a.id} onClick={()=>{setAsset(a.id);setShowAssetDrop(false);setAssetSearch("")}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:asset===a.id?C.ac+"15":"transparent",border:"none",color:C.tx,cursor:"pointer",fontFamily:SA,fontSize:14,textAlign:"left"}}>
                <span style={{fontWeight:700,minWidth:50}}>{a.sym}</span><span style={{color:C.tm}}>{a.name}</span>
              </button>)}
              <div style={{height:1,background:C.bd,margin:"4px 0"}}/></>}
              {ASSETS.filter(a=>!assetSearch||a.name.toLowerCase().includes(assetSearch.toLowerCase())||a.sym.toLowerCase().includes(assetSearch.toLowerCase())).map(a=><button key={a.id} onClick={()=>{setAsset(a.id);setShowAssetDrop(false);setAssetSearch("")}} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:asset===a.id?C.ac+"15":"transparent",border:"none",color:C.tx,cursor:"pointer",fontFamily:SA,fontSize:14,textAlign:"left"}}>
                <span style={{fontWeight:700,minWidth:50}}>{a.sym}</span><span style={{color:C.tm}}>{a.name}</span>
                {asset===a.id&&<span style={{marginLeft:"auto",color:C.ac}}>✓</span>}
              </button>)}
            </div>
          </div>}
        </div>
        <select value={tfDays} onChange={e=>setTfDays(+e.target.value)} style={{background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:12,padding:"8px 12px",fontFamily:SA,fontSize:14,fontWeight:600,outline:"none",cursor:"pointer"}}>
          {TF_DAYS.map(t=><option key={t.v} value={t.v}>{t.l}</option>)}
        </select>
        {dataLoading?<span style={{fontFamily:SA,fontSize:12,color:C.am,fontWeight:600}}>Loading...</span>
        :<span className="hide-mobile" style={{fontSize:12,fontWeight:600,color:dataSource==="live"?C.g:C.td,background:dataSource==="live"?C.gd:"transparent",padding:"5px 10px",borderRadius:20}}>{dataSource==="live"?"● Live":"○ Synthetic"}</span>}
        <button onClick={()=>loadData(asset,tfDays)} title="Refresh" style={{background:C.s2,border:`1px solid ${C.bd}`,borderRadius:10,padding:"7px 10px",color:C.tm,fontSize:15,cursor:"pointer",lineHeight:1}}>↻</button>
      </div>

      <div style={{flex:1}} className="hide-mobile"/>

      {/* Import/Export — hidden on mobile */}
      <div className="hide-mobile" style={{display:"flex",gap:8,alignItems:"center"}}>
        <input ref={importRef} type="file" accept=".json" onChange={importData} style={{display:"none"}}/>
        <button onClick={()=>importRef.current?.click()} style={{background:C.s2,border:`1px solid ${C.bd}`,borderRadius:10,padding:"8px 14px",color:C.tm,fontFamily:SA,fontSize:13,fontWeight:600,cursor:"pointer"}}>↑ Import</button>
        <button onClick={exportData} style={{background:C.s2,border:`1px solid ${C.bd}`,borderRadius:10,padding:"8px 14px",color:C.tm,fontFamily:SA,fontSize:13,fontWeight:600,cursor:"pointer"}}>↓ Export</button>
      </div>

      {/* Return Badge */}
      <div style={{background:rc+"15",border:`1px solid ${rc}30`,borderRadius:20,padding:"8px 16px",display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:rc}}/>
        <span style={{fontFamily:SA,fontSize:16,color:rc,fontWeight:800}}>{s.ret>0?"+":""}{s.ret}%</span>
        <span style={{fontFamily:MO,fontSize:12,color:C.td}}>${s.fin.toLocaleString()}</span>
      </div>
    </div>

    {/* ═══ NAVIGATION ═══ */}
    <div className="nav-scroll" style={{background:C.bg,padding:"12px 24px",flexShrink:0}}>
      {NAV.map(n=><button key={n.id} className="nav-btn" onClick={()=>setPg(n.id)} style={{background:pg===n.id?C.ac:C.sf,color:pg===n.id?"#fff":C.tm,border:pg===n.id?"none":`1px solid ${C.bd}`,borderRadius:12,padding:"12px 24px",fontSize:15,fontFamily:SA,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
        <span>{n.icon}</span><span className="nav-label">{n.l}</span>
      </button>)}
    </div>

    {/* ═══ MAIN CONTENT ═══ */}
    <div className="main-p" style={{flex:1,overflowY:"auto",padding:"24px",maxWidth:1400,width:"100%",margin:"0 auto"}}>

      {/* STRATEGY BUILDER (collapsible, always accessible) */}
      {pg==="bt"&&<>
        <Section title="⚙️ Strategy Builder" defaultOpen={false}>
          <div style={{display:"flex",gap:8,marginBottom:16,background:C.s2,borderRadius:12,padding:4}}>
            <button onClick={()=>setMode("visual")} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:mode==="visual"?C.ac:"transparent",color:mode==="visual"?"#fff":C.tm,fontFamily:SA,fontSize:14,cursor:"pointer",fontWeight:700}}>Visual Builder</button>
            <button onClick={()=>setMode("code")} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:mode==="code"?C.vi:"transparent",color:mode==="code"?"#fff":C.tm,fontFamily:SA,fontSize:14,cursor:"pointer",fontWeight:700}}>Code Editor</button>
          </div>

          {mode==="code"?<>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>{Object.entries(CODE_PRESETS).map(([k,v])=><button key={k} onClick={()=>{setCodeEn(v.en);setCodeEx(v.ex);setCodeErr("")}} style={{background:C.s2,border:`1px solid ${C.bd}`,borderRadius:10,padding:"8px 16px",fontSize:13,fontFamily:SA,fontWeight:600,color:C.tm,cursor:"pointer"}}>{v.n}</button>)}</div>
            <div style={{marginBottom:16}}><div style={{fontSize:14,fontWeight:700,color:C.g,marginBottom:8}}>Entry Condition</div><textarea value={codeEn} onChange={e=>{setCodeEn(e.target.value);setCodeErr("")}} spellCheck={false} style={{width:"100%",height:120,background:"#0c0c0f",color:C.g,border:`1px solid ${codeErr?C.r:C.bd}`,borderRadius:12,padding:16,fontFamily:MO,fontSize:13,outline:"none",resize:"vertical",lineHeight:1.7}}/></div>
            <div style={{marginBottom:16}}><div style={{fontSize:14,fontWeight:700,color:C.r,marginBottom:8}}>Exit Condition</div><textarea value={codeEx} onChange={e=>{setCodeEx(e.target.value);setCodeErr("")}} spellCheck={false} style={{width:"100%",height:100,background:"#0c0c0f",color:C.r,border:`1px solid ${codeErr?C.r:C.bd}`,borderRadius:12,padding:16,fontFamily:MO,fontSize:13,outline:"none",resize:"vertical",lineHeight:1.7}}/></div>
            {codeErr&&<div style={{background:C.rd,border:`1px solid ${C.r}30`,borderRadius:12,padding:14,fontFamily:MO,fontSize:13,color:C.r,marginBottom:16}}>⚠ {codeErr}</div>}
          </>:<>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>{Object.entries(PR).map(([k,v])=><Btn key={k} active={preset===k} onClick={()=>applyP(k)} style={{borderRadius:10,padding:"10px 18px",fontSize:13}}>{v.n}</Btn>)}</div>
            <div style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{fontSize:15,fontWeight:700,color:C.g}}>▲ Entry Rules {enR.length>1?"(ALL must match)":""}</div><button onClick={()=>addR("en")} style={{background:C.gd,color:C.g,border:`1px solid ${C.g}30`,borderRadius:10,padding:"8px 16px",fontSize:13,fontFamily:SA,fontWeight:600,cursor:"pointer"}}>+ Add Rule</button></div>
            {enR.map((r,i)=><CR key={i} c={r} onChange={v=>{setEnR(p=>p.map((x,j)=>j===i?v:x));setPreset("custom")}} onRm={()=>{setEnR(p=>p.filter((_,j)=>j!==i));setPreset("custom")}}/>)}</div>
            <div style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{fontSize:15,fontWeight:700,color:C.r}}>▼ Exit Rules {exR.length>1?"(ANY triggers)":""}</div><button onClick={()=>addR("ex")} style={{background:C.rd,color:C.r,border:`1px solid ${C.r}30`,borderRadius:10,padding:"8px 16px",fontSize:13,fontFamily:SA,fontWeight:600,cursor:"pointer"}}>+ Add Rule</button></div>
            {exR.map((r,i)=><CR key={i} c={r} onChange={v=>{setExR(p=>p.map((x,j)=>j===i?v:x));setPreset("custom")}} onRm={()=>{setExR(p=>p.filter((_,j)=>j!==i));setPreset("custom")}}/>)}</div>
          </>}

          {/* Account Balance — prominent */}
          <div style={{background:C.s2,borderRadius:14,padding:16,marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{fontSize:14,fontWeight:700}}>Your Account Balance</div>
              {portfolio&&<button onClick={()=>setCfg(c=>({...c,cap:portfolio.accountValue}))} style={{background:C.gd,color:C.g,border:`1px solid ${C.g}30`,borderRadius:10,padding:"6px 14px",fontSize:12,fontFamily:SA,fontWeight:600,cursor:"pointer"}}> Sync from Exchange (${portfolio.accountValue.toLocaleString()})</button>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:24,fontWeight:800,color:C.td}}>$</span>
              <input type="number" value={cfg.cap} onChange={e=>setCfg(c=>({...c,cap:+e.target.value}))} min={1} className="bal-input" style={{background:C.sf,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:12,padding:"12px 16px",fontFamily:SA,fontSize:24,fontWeight:800,width:"100%",outline:"none",letterSpacing:"-0.02em"}}/>
            </div>
            {!portfolio&&<div style={{fontSize:12,color:C.td,marginTop:6}}>Enter your real account balance for accurate backtesting. Or connect your exchange on the Exchange tab to sync automatically.</div>}
          </div>

          {/* Other Config */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12}}>
            {[["Position Size %","sz",1,100],["Stop Loss %","sl",0,50],["Take Profit %","tp",0,100]].map(([l,k,mn,mx])=><div key={k}><div style={{fontSize:12,color:C.td,fontWeight:600,marginBottom:4}}>{l}</div><Num value={cfg[k]} onChange={v=>setCfg(c=>({...c,[k]:v}))} min={mn} max={mx} step={k==="sl"||k==="tp"?.5:1} style={{width:"100%",borderRadius:12}}/></div>)}
            <div><div style={{fontSize:12,color:C.td,fontWeight:600,marginBottom:4}}>Direction</div><div style={{display:"flex",gap:6}}>{["long","short"].map(d=><Btn key={d} active={cfg.dir===d} color={d==="long"?C.g:C.r} onClick={()=>setCfg(c=>({...c,dir:d}))} style={{flex:1,textTransform:"uppercase",borderRadius:10,padding:"10px 0"}}>{d}</Btn>)}</div></div>
          </div>
        </Section>
      </>}

      {/* ═══ BACKTEST PAGE ═══ */}
      {pg==="bt"&&<div className="fi">
        {dataLoading&&<div style={{background:C.sf,borderRadius:16,padding:24,textAlign:"center",marginBottom:20}}><span style={{fontSize:16,color:C.am,fontWeight:600}}>⏳ Fetching {ASSETS.find(a=>a.id===asset)?.name} market data...</span></div>}
        <div style={{marginBottom:8,fontFamily:MO,fontSize:13,color:C.td}}>{ASSETS.find(a=>a.id===asset)?.sym}/USD · {data.length} candles · {data[0]?.date} → {data[data.length-1]?.date}</div>

        {/* Hero Stats */}
        <div className="stat-g" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:24}}>
          <Stat label="Total Return" value={`${s.ret>0?"+":""}${s.ret}%`} sub={`$${cfg.cap.toLocaleString()} → $${s.fin.toLocaleString()}`} color={rc} big/>          <Stat label="Win Rate" value={`${s.wr}%`} sub={`${s.wn}W / ${s.ls}L`} color={s.wr>=50?C.g:C.am}/><Stat label="Profit Factor" value={s.pf>=999?"∞":s.pf} color={s.pf>=1.5?C.g:s.pf>=1?C.am:C.r}/><Stat label="Sharpe" value={s.sh} color={s.sh>=1?C.g:C.am}/><Stat label="Max Drawdown" value={`${s.mdd}%`} color={C.r}/><Stat label="Expectancy" value={`$${s.exp}`} sub="per trade" color={s.exp>0?C.g:C.r}/><Stat label="Avg Hold" value={`${s.ah}d`} sub={`${s.n} trades`}/>
          </div>
          <div className="chart-scroll" style={{display:"flex",gap:8,marginBottom:16}}>{[["eq","Equity Curve"],["dd","Drawdown"],["pr","Price + Trades"],["di","P&L Distribution"]].map(([id,l])=><Btn key={id} active={ct===id} onClick={()=>setCt(id)} style={{fontSize:14,borderRadius:12,padding:"10px 20px",flexShrink:0}}>{l}</Btn>)}</div>
          <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:20,padding:24,marginBottom:20}}>
            {ct==="eq"&&<ResponsiveContainer width="100%" height={300}><AreaChart data={res.eq}><defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={rc} stopOpacity={.3}/><stop offset="100%" stopColor={rc} stopOpacity={.02}/></linearGradient></defs><CartesianGrid stroke={C.bd} strokeDasharray="3 3"/><XAxis dataKey="ds" tick={{fill:C.td,fontSize:9,fontFamily:MO}} interval="preserveStartEnd" minTickGap={50}/><YAxis tick={{fill:C.td,fontSize:9,fontFamily:MO}} tickFormatter={v=>`$${(v/1000).toFixed(1)}k`}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="eq" stroke={rc} fill="url(#eg)" strokeWidth={2} dot={false} name="Equity"/><ReferenceLine y={cfg.cap} stroke={C.td} strokeDasharray="5 5"/></AreaChart></ResponsiveContainer>}
            {ct==="dd"&&<ResponsiveContainer width="100%" height={300}><AreaChart data={res.eq}><defs><linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.r} stopOpacity={.05}/><stop offset="100%" stopColor={C.r} stopOpacity={.4}/></linearGradient></defs><CartesianGrid stroke={C.bd} strokeDasharray="3 3"/><XAxis dataKey="ds" tick={{fill:C.td,fontSize:9,fontFamily:MO}} interval="preserveStartEnd" minTickGap={50}/><YAxis tick={{fill:C.td,fontSize:9,fontFamily:MO}} tickFormatter={v=>`${v}%`}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="dd" stroke={C.r} fill="url(#dg)" strokeWidth={2} dot={false} name="DD%"/></AreaChart></ResponsiveContainer>}
            {ct==="pr"&&<ResponsiveContainer width="100%" height={300}><ComposedChart data={pwt}><CartesianGrid stroke={C.bd} strokeDasharray="3 3"/><XAxis dataKey="ds" tick={{fill:C.td,fontSize:9,fontFamily:MO}} interval="preserveStartEnd" minTickGap={50}/><YAxis tick={{fill:C.td,fontSize:9,fontFamily:MO}}/><Tooltip content={<TT/>}/><Line type="monotone" dataKey="close" stroke={C.tm} strokeWidth={1.5} dot={false} name="Price"/><Line type="monotone" dataKey="entry" stroke={C.g} strokeWidth={0} dot={{r:4,fill:C.g}} name="Entry" connectNulls={false}/><Line type="monotone" dataKey="exit" stroke={C.r} strokeWidth={0} dot={{r:4,fill:C.r}} name="Exit" connectNulls={false}/></ComposedChart></ResponsiveContainer>}
            {ct==="di"&&<ResponsiveContainer width="100%" height={300}><ComposedChart data={res.trades.map((t,i)=>({x:i+1,pnl:t.pnl}))}><CartesianGrid stroke={C.bd} strokeDasharray="3 3"/><XAxis dataKey="x" tick={{fill:C.td,fontSize:9,fontFamily:MO}}/><YAxis tick={{fill:C.td,fontSize:9,fontFamily:MO}} tickFormatter={v=>`$${v}`}/><Tooltip content={<TT/>}/><Bar dataKey="pnl" name="P&L">{res.trades.map((t,i)=><Cell key={i} fill={t.pnl>=0?C.g:C.r}/>)}</Bar><ReferenceLine y={0} stroke={C.td}/></ComposedChart></ResponsiveContainer>}
          </div>
          <button onClick={()=>setShowT(!showT)} style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:8,padding:"8px 14px",color:C.tm,fontFamily:MO,fontSize:11,cursor:"pointer",width:"100%",textAlign:"left"}}>{showT?"▼":"▶"} Trade Log ({res.trades.length})</button>
          {showT&&<div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:8,marginTop:6,overflowX:"auto"}} className="fi"><table style={{width:"100%",borderCollapse:"collapse",fontFamily:MO,fontSize:10}}><thead><tr style={{borderBottom:`1px solid ${C.bd}`}}>{["#","Entry","Exit","In","Out","P&L","P&L%","Days","Why"].map(h=><th key={h} style={{padding:"6px 7px",textAlign:"left",color:C.td,fontWeight:500}}>{h}</th>)}</tr></thead><tbody>{res.trades.map((t,i)=><tr key={i} style={{borderBottom:`1px solid ${C.bd}`}}><td style={{padding:"4px 7px",color:C.td}}>{i+1}</td><td style={{padding:"4px 7px"}}>{t.ed}</td><td style={{padding:"4px 7px"}}>{t.xd}</td><td style={{padding:"4px 7px"}}>{t.ep.toFixed(2)}</td><td style={{padding:"4px 7px"}}>{t.xp.toFixed(2)}</td><td style={{padding:"4px 7px",color:t.pnl>=0?C.g:C.r,fontWeight:600}}>{t.pnl>=0?"+":""}{t.pnl.toFixed(2)}</td><td style={{padding:"4px 7px",color:t.pct>=0?C.g:C.r}}>{t.pct>=0?"+":""}{t.pct.toFixed(2)}%</td><td style={{padding:"4px 7px"}}>{t.days}</td><td style={{padding:"4px 7px",color:C.td}}>{t.rsn}</td></tr>)}</tbody></table></div>}
        </div>}

        {/* MONTE CARLO */}
        {pg==="mc"&&<div className="fi">
          <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 4px",letterSpacing:"-.02em"}}>Monte Carlo Simulation</h2>
          <p style={{fontFamily:MO,fontSize:10,color:C.td,margin:"0 0 14px"}}>1,000 randomized trade sequences · probability distribution of outcomes</p>
          {!mcRes?<div style={{background:C.sf,borderRadius:10,padding:30,textAlign:"center",color:C.td,fontFamily:MO,fontSize:12}}>Need ≥2 trades to simulate</div>:<>
          <div className="stat-g" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:7,marginBottom:14}}>
            <Stat label="Median" value={`$${mcRes.med.toLocaleString()}`} color={mcRes.med>cfg.cap?C.g:C.r}/><Stat label="5th %ile" value={`$${mcRes.p5f.toLocaleString()}`} sub="Worst realistic" color={C.r}/><Stat label="95th %ile" value={`$${mcRes.p95f.toLocaleString()}`} sub="Best realistic" color={C.g}/><Stat label="Prob Profit" value={`${mcRes.pp}%`} color={mcRes.pp>60?C.g:C.am}/><Stat label="Prob Ruin" value={`${mcRes.pr}%`} sub="50% loss" color={mcRes.pr<5?C.g:C.r}/>
          </div>
          <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:10,padding:14}}>
            <div style={{fontFamily:MO,fontSize:9,color:C.td,marginBottom:6}}>EQUITY PROBABILITY CONE</div>
            <ResponsiveContainer width="100%" height={340}><AreaChart data={mcRes.cd}><defs><linearGradient id="m95" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.b} stopOpacity={.08}/><stop offset="100%" stopColor={C.b} stopOpacity={.02}/></linearGradient><linearGradient id="m75" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.b} stopOpacity={.15}/><stop offset="100%" stopColor={C.b} stopOpacity={.05}/></linearGradient></defs><CartesianGrid stroke={C.bd} strokeDasharray="3 3"/><XAxis dataKey="x" tick={{fill:C.td,fontSize:9,fontFamily:MO}}/><YAxis tick={{fill:C.td,fontSize:9,fontFamily:MO}} tickFormatter={v=>`$${(v/1000).toFixed(1)}k`}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="p5" stroke="none" fill="url(#m95)" name="5th"/><Area type="monotone" dataKey="p95" stroke={C.b} strokeOpacity={.3} fill="url(#m95)" strokeWidth={1} name="95th"/><Area type="monotone" dataKey="p25" stroke="none" fill="url(#m75)" name="25th"/><Area type="monotone" dataKey="p75" stroke={C.b} strokeOpacity={.5} fill="url(#m75)" strokeWidth={1} name="75th"/><Line type="monotone" dataKey="p50" stroke={C.cy} strokeWidth={2} dot={false} name="Median"/><ReferenceLine y={cfg.cap} stroke={C.am} strokeDasharray="5 5"/></AreaChart></ResponsiveContainer>
          </div>
          <div style={{marginTop:10,background:C.sf,border:`1px solid ${C.bd}`,borderRadius:8,padding:12,fontFamily:MO,fontSize:10,color:C.tm,lineHeight:1.7}}><strong style={{color:C.cy}}>Reading:</strong> Bright line = median. Inner band = 25th–75th (50% of outcomes). Outer = 5th–95th (90%). Wider cone = more variance.</div>
          </>}
        </div>}

        {/* EXCHANGE */}
        {pg==="ex"&&<div className="fi">
          <h2 style={{fontSize:24,fontWeight:800,margin:"0 0 4px",letterSpacing:"-.02em"}}>Exchange <span style={{color:C.g}}>Connect</span></h2>
          <p style={{fontFamily:SA,fontSize:14,color:C.td,margin:"0 0 20px"}}>Connect your exchange to see your portfolio, open positions, and trade history in real-time</p>

          <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:10,padding:16,marginBottom:14}}>
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
              {EXCHANGES.map(e=><button key={e.id} onClick={()=>{setExch(e.id);setExError("")}} style={{background:exch===e.id?C.ac+"20":"transparent",border:`1px solid ${exch===e.id?C.ac:C.bd}`,borderRadius:12,padding:"12px 16px",cursor:"pointer",textAlign:"left",minWidth:130,display:"flex",alignItems:"center",gap:10}}>
                {e.logo?<img src={e.logo} alt={e.name} style={{width:24,height:24,borderRadius:6,objectFit:"cover"}}/>:<div style={{width:24,height:24,borderRadius:6,background:C.s3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>📄</div>}
                <div>
                  <div style={{fontFamily:SA,fontSize:14,color:exch===e.id?C.ac:C.tx,fontWeight:700}}>{e.name}</div>
                  <div style={{fontFamily:SA,fontSize:11,color:C.td}}>{e.note}</div>
                </div>
              </button>)}
            </div>

            {exch==="csv"?<div>
              <div style={{fontFamily:MO,fontSize:11,color:C.tm,marginBottom:8}}>Upload your trade history CSV. Expected columns: date, side, symbol, price, qty, pnl, fee</div>
              <input ref={fileRef} type="file" accept=".csv" onChange={handleCSV} style={{display:"none"}}/>
              <button onClick={()=>fileRef.current?.click()} style={{background:C.ac,color:"#fff",border:"none",borderRadius:8,padding:"10px 24px",fontFamily:SA,fontSize:13,fontWeight:600,cursor:"pointer"}}>Choose CSV File</button>
            </div>:<div>
              <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
                <div style={{flex:1,minWidth:200}}><div style={{fontSize:9,color:C.td,fontFamily:MO,marginBottom:3}}>{exch==="hyperliquid"?"WALLET ADDRESS":"API KEY"}</div><input type="text" value={exKey} onChange={e=>setExKey(e.target.value)} placeholder={exch==="hyperliquid"?"0x...":"Enter API key"} style={{width:"100%",background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:6,padding:"8px 10px",fontFamily:MO,fontSize:11,outline:"none"}}/></div>
                {exch!=="hyperliquid"&&<div style={{flex:1,minWidth:200}}><div style={{fontSize:9,color:C.td,fontFamily:MO,marginBottom:3}}>API SECRET</div><input type="password" value={exSecret} onChange={e=>setExSecret(e.target.value)} placeholder="Enter secret" style={{width:"100%",background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:6,padding:"8px 10px",fontFamily:MO,fontSize:11,outline:"none"}}/></div>}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <button onClick={connectExchange} disabled={exLoading} style={{background:C.ac,color:"#fff",border:"none",borderRadius:12,padding:"12px 28px",fontFamily:SA,fontSize:14,fontWeight:700,cursor:exLoading?"wait":"pointer",opacity:exLoading?.6:1}}>{exLoading?"Connecting...":"Connect & Fetch Portfolio"}</button>
                <div style={{fontFamily:SA,fontSize:12,color:C.td}}>Your keys stay local — never sent to our servers</div>
              </div>
            </div>}
            {exError&&<div style={{marginTop:10,background:C.rd,border:`1px solid ${C.r}30`,borderRadius:6,padding:10,fontFamily:MO,fontSize:10,color:C.r,lineHeight:1.6}}>{exError}</div>}
          </div>

          {/* ═══ PORTFOLIO DASHBOARD ═══ */}
          {(portfolio||portLoading)&&<div style={{marginBottom:20}} className="fi">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <h3 style={{fontSize:20,fontWeight:800,margin:0,letterSpacing:"-.02em"}}>Portfolio Overview</h3>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                {portLoading&&<span style={{fontFamily:MO,fontSize:12,color:C.am}}>Refreshing...</span>}
                {portfolio?.lastUpdate&&<span style={{fontFamily:MO,fontSize:12,color:C.td}}>Updated {portfolio.lastUpdate}</span>}
                <button onClick={()=>fetchPortfolio(exKey)} style={{background:C.s2,border:`1px solid ${C.bd}`,borderRadius:10,padding:"6px 14px",color:C.tm,fontFamily:SA,fontSize:13,fontWeight:600,cursor:"pointer"}}>↻ Refresh</button>
              </div>
            </div>
            {portError&&<div style={{background:C.rd,border:`1px solid ${C.r}30`,borderRadius:12,padding:14,fontFamily:MO,fontSize:13,color:C.r,marginBottom:14}}>{portError}</div>}

            {portfolio&&<>
              {/* Account Value Hero */}
              <div className="stat-g" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:20}}>
                <Stat label="Account Value" value={`$${portfolio.accountValue.toLocaleString()}`} color={C.tx} big/>
                <Stat label="Unrealized P&L" value={`${portfolio.unrealizedPnl>=0?"+":""}$${portfolio.unrealizedPnl.toLocaleString()}`} color={portfolio.unrealizedPnl>=0?C.g:C.r} big/>
                <Stat label="Available Balance" value={`$${portfolio.withdrawable.toLocaleString()}`} color={C.tx}/>
                <Stat label="Margin Used" value={`$${portfolio.marginUsed.toLocaleString()}`} sub={portfolio.accountValue>0?`${(portfolio.marginUsed/portfolio.accountValue*100).toFixed(1)}% utilized`:""}/>
              </div>

              {/* Open Positions */}
              {portfolio.positions.length>0?<div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:16,overflow:"hidden",marginBottom:20}}>
                <div style={{padding:"16px 20px",borderBottom:`1px solid ${C.bd}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:16,fontWeight:700}}>Open Positions ({portfolio.positions.length})</div>
                  <div style={{fontSize:13,fontWeight:600,color:portfolio.unrealizedPnl>=0?C.g:C.r}}>Total: {portfolio.unrealizedPnl>=0?"+":""}${portfolio.unrealizedPnl.toLocaleString()}</div>
                </div>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontFamily:SA,fontSize:14}}>
                    <thead><tr style={{borderBottom:`1px solid ${C.bd}`}}>
                      {["Asset","Side","Size","Entry Price","Leverage","Unrealized P&L","Return %","Liq. Price"].map(h=><th key={h} style={{padding:"12px 16px",textAlign:"left",color:C.td,fontWeight:600,fontSize:12,textTransform:"uppercase",letterSpacing:".04em"}}>{h}</th>)}
                    </tr></thead>
                    <tbody>{portfolio.positions.map((p,i)=><tr key={i} style={{borderBottom:`1px solid ${C.bd}`}}>
                      <td style={{padding:"14px 16px",fontWeight:700,fontSize:15}}>{p.coin}</td>
                      <td style={{padding:"14px 16px"}}><span style={{background:p.side==="LONG"?C.gd:C.rd,color:p.side==="LONG"?C.g:C.r,padding:"4px 12px",borderRadius:8,fontWeight:700,fontSize:12}}>{p.side}</span></td>
                      <td style={{padding:"14px 16px",fontFamily:MO}}>{Math.abs(p.size).toFixed(4)}</td>
                      <td style={{padding:"14px 16px",fontFamily:MO}}>${p.entryPx.toLocaleString()}</td>
                      <td style={{padding:"14px 16px"}}><span style={{background:C.s2,padding:"4px 10px",borderRadius:6,fontFamily:MO,fontSize:12,fontWeight:600}}>{p.leverage}x</span></td>
                      <td style={{padding:"14px 16px",fontFamily:MO,fontWeight:700,fontSize:15,color:p.unrealized>=0?C.g:C.r}}>{p.unrealized>=0?"+":""}${p.unrealized.toLocaleString()}</td>
                      <td style={{padding:"14px 16px",fontFamily:MO,fontWeight:600,color:p.returnPct>=0?C.g:C.r}}>{p.returnPct>=0?"+":""}{p.returnPct}%</td>
                      <td style={{padding:"14px 16px",fontFamily:MO,color:C.am}}>{p.liqPx>0?`$${p.liqPx.toLocaleString()}`:"—"}</td>
                    </tr>)}</tbody>
                  </table>
                </div>
              </div>
              :<div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:16,padding:32,textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:24,marginBottom:8}}>📭</div>
                <div style={{fontSize:15,fontWeight:600,color:C.tm}}>No open positions</div>
                <div style={{fontSize:13,color:C.td,marginTop:4}}>Your open trades will appear here in real-time</div>
              </div>}
            </>}
          </div>}

          {/* Exchange Results */}
          {exTrades.length>0&&exStats&&<div className="fi">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <h3 style={{fontSize:14,fontWeight:600,margin:0}}>Your Trading Performance</h3>
              <div style={{display:"flex",gap:6}}><span style={{fontFamily:MO,fontSize:10,color:C.g,background:C.gd,padding:"3px 8px",borderRadius:4}}>● Connected</span>
              <button onClick={()=>{saveExTrades([]);setExConnected(false)}} style={{background:C.rd,color:C.r,border:"none",borderRadius:4,padding:"3px 8px",fontFamily:MO,fontSize:10,cursor:"pointer"}}>Clear</button></div>
            </div>
            <div className="stat-g" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:7,marginBottom:14}}>
              <Stat label="Total P&L" value={`${exStats.tot>=0?"+":""}$${exStats.tot.toLocaleString()}`} color={exStats.tot>=0?C.g:C.r}/><Stat label="Total Fees" value={`$${exStats.fees.toLocaleString()}`} color={C.am}/><Stat label="Win Rate" value={`${exStats.wr}%`} sub={`${exStats.wn}W/${exStats.ls}L`} color={exStats.wr>=50?C.g:C.am}/><Stat label="Profit Factor" value={exStats.pf} color={exStats.pf>=1.5?C.g:C.r}/><Stat label="Avg Win" value={`$${exStats.aw}`} color={C.g}/><Stat label="Avg Loss" value={`$${exStats.al}`} color={C.r}/><Stat label="Total Trades" value={exStats.n}/>
            </div>

            {/* Cumulative P&L Chart */}
            {exStats.cumPnl.length>1&&<div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:10,padding:14,marginBottom:14}}>
              <div style={{fontFamily:MO,fontSize:9,color:C.td,marginBottom:6}}>CUMULATIVE P&L</div>
              <ResponsiveContainer width="100%" height={250}><AreaChart data={exStats.cumPnl}><defs><linearGradient id="cpnl" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={exStats.tot>=0?C.g:C.r} stopOpacity={.3}/><stop offset="100%" stopColor={exStats.tot>=0?C.g:C.r} stopOpacity={.02}/></linearGradient></defs><CartesianGrid stroke={C.bd} strokeDasharray="3 3"/><XAxis dataKey="date" tick={{fill:C.td,fontSize:8,fontFamily:MO}} interval="preserveStartEnd" minTickGap={40}/><YAxis tick={{fill:C.td,fontSize:9,fontFamily:MO}} tickFormatter={v=>`$${v}`}/><Tooltip content={<TT/>}/><Area type="monotone" dataKey="pnl" stroke={exStats.tot>=0?C.g:C.r} fill="url(#cpnl)" strokeWidth={2} dot={false} name="Cum P&L"/><ReferenceLine y={0} stroke={C.td}/></AreaChart></ResponsiveContainer>
            </div>}

            {/* P&L by Symbol */}
            <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:10,padding:14,marginBottom:14}}>
              <div style={{fontFamily:MO,fontSize:9,color:C.td,marginBottom:8}}>P&L BY SYMBOL</div>
              <div style={{display:"grid",gap:6}}>{Object.entries(exStats.bySymbol).sort((a,b)=>b[1].pnl-a[1].pnl).map(([sym,d])=><div key={sym} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:C.s2,borderRadius:6}}>
                <div style={{fontFamily:MO,fontSize:12,fontWeight:600,minWidth:80,color:C.tx}}>{sym}</div>
                <div style={{flex:1,height:4,background:C.bd,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${Math.min(Math.abs(d.pnl)/Math.max(...Object.values(exStats.bySymbol).map(v=>Math.abs(v.pnl)))*100,100)}%`,background:d.pnl>=0?C.g:C.r,borderRadius:2}}/></div>
                <div style={{fontFamily:MO,fontSize:11,fontWeight:600,color:d.pnl>=0?C.g:C.r,minWidth:70,textAlign:"right"}}>{d.pnl>=0?"+":""}${d.pnl.toFixed(2)}</div>
                <div style={{fontFamily:MO,fontSize:9,color:C.td,minWidth:40}}>{d.n} trades</div>
              </div>)}</div>
            </div>

            {/* Recent Trades Table */}
            <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:8,overflowX:"auto"}}>
              <div style={{fontFamily:MO,fontSize:9,color:C.td,padding:"8px 10px",borderBottom:`1px solid ${C.bd}`}}>RECENT TRADES ({Math.min(exTrades.length,50)} of {exTrades.length})</div>
              <table style={{width:"100%",borderCollapse:"collapse",fontFamily:MO,fontSize:10}}><thead><tr style={{borderBottom:`1px solid ${C.bd}`}}>{["Date","Symbol","Side","Price","Qty","P&L","Fee"].map(h=><th key={h} style={{padding:"6px 7px",textAlign:"left",color:C.td,fontWeight:500}}>{h}</th>)}</tr></thead>
              <tbody>{exTrades.slice(0,50).map((t,i)=><tr key={i} style={{borderBottom:`1px solid ${C.bd}`}}><td style={{padding:"4px 7px"}}>{t.date?.slice(0,16)}</td><td style={{padding:"4px 7px",fontWeight:600}}>{t.symbol}</td><td style={{padding:"4px 7px",color:t.side?.toLowerCase().includes("buy")||t.side==="B"?C.g:C.r}}>{t.side}</td><td style={{padding:"4px 7px"}}>{t.price.toFixed(2)}</td><td style={{padding:"4px 7px"}}>{t.qty}</td><td style={{padding:"4px 7px",color:t.pnl>=0?C.g:C.r,fontWeight:600}}>{t.pnl>=0?"+":""}${t.pnl.toFixed(2)}</td><td style={{padding:"4px 7px",color:C.am}}>${t.fee.toFixed(2)}</td></tr>)}</tbody></table>
            </div>
          </div>}
        </div>}

        {/* AI ADVISOR */}
        {pg==="ai"&&<div className="fi" style={{display:"flex",flexDirection:"column",height:"calc(100vh - 68px)"}}>
          <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 4px"}}>AI Strategy <span style={{color:C.cy}}>Advisor</span></h2>
          <p style={{fontFamily:MO,fontSize:10,color:C.td,margin:"0 0 10px"}}>BYOK — Your Anthropic API key stays in your browser</p>
          <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:8,padding:10,marginBottom:10,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
            <span style={{fontFamily:MO,fontSize:9,color:C.td}}>KEY:</span>
            <input type={showK?"text":"password"} value={apiKey} onChange={e=>{setApiKey(e.target.value);try{localStorage.setItem("sl_apikey",e.target.value)}catch(ex){}}} placeholder="sk-ant-..." style={{flex:1,minWidth:180,background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:5,padding:"6px 8px",fontFamily:MO,fontSize:11,outline:"none"}}/>
            <button onClick={()=>setShowK(!showK)} style={{background:C.s2,border:`1px solid ${C.bd}`,borderRadius:5,padding:"5px 8px",color:C.tm,fontFamily:MO,fontSize:9,cursor:"pointer"}}>{showK?"Hide":"Show"}</button>
          </div>
          {!apiKey?<div style={{background:C.s2,borderRadius:10,padding:30,textAlign:"center",flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}><div style={{fontSize:28}}>🔑</div><div style={{fontSize:14,fontWeight:600}}>Bring Your Own Key</div><div style={{fontFamily:MO,fontSize:10,color:C.td,maxWidth:380,lineHeight:1.6}}>Enter your Anthropic API key. It never leaves your browser. AI gets full context: strategy, stats, Monte Carlo, and exchange data.</div></div>
          :<>
          {aiChat.length===0&&<div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>{["Analyze my strategy strengths & weaknesses","How can I reduce max drawdown?","Is my win rate sustainable?","Suggest parameter optimizations","What's my biggest risk right now?","Analyze my exchange trading history"].map((q,i)=><button key={i} onClick={()=>sendAI(q)} style={{background:C.s2,border:`1px solid ${C.bd}`,borderRadius:6,padding:"7px 12px",fontFamily:MO,fontSize:9,color:C.tm,cursor:"pointer",textAlign:"left",lineHeight:1.4,maxWidth:250}}>{q}</button>)}</div>}
          <div style={{flex:1,overflowY:"auto",marginBottom:10,display:"flex",flexDirection:"column",gap:6}}>{aiChat.map((m,i)=><div key={i} style={{alignSelf:m.role==="user"?"flex-end":"flex-start",maxWidth:"85%",background:m.role==="user"?C.ac+"20":C.sf,border:`1px solid ${m.role==="user"?C.ac+"40":C.bd}`,borderRadius:10,padding:"9px 12px",fontFamily:m.role==="assistant"?MO:SA,fontSize:11,color:C.tx,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{m.content}</div>)}{aiLoad&&<div style={{alignSelf:"flex-start",background:C.sf,border:`1px solid ${C.bd}`,borderRadius:10,padding:"9px 12px",fontFamily:MO,fontSize:10,color:C.td}}><span style={{animation:"pu 1.2s infinite"}}>Analyzing...</span></div>}<div ref={aiEnd}/></div>
          <div style={{display:"flex",gap:6}}><input value={aiMsg} onChange={e=>setAiMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendAI()} placeholder="Ask about your strategy..." style={{flex:1,background:C.sf,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:8,padding:"9px 12px",fontFamily:MO,fontSize:11,outline:"none"}}/><button onClick={()=>sendAI()} disabled={aiLoad||!aiMsg.trim()} style={{background:C.ac,color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontFamily:SA,fontSize:12,fontWeight:600,cursor:aiLoad?"wait":"pointer",opacity:aiLoad?.6:1}}>Send</button></div>
          </>}
        </div>}

        {/* JOURNAL */}
        {pg==="jn"&&<div className="fi">
          <h2 style={{fontSize:18,fontWeight:700,margin:"0 0 4px"}}>Trade <span style={{color:C.pu}}>Journal</span></h2>
          <p style={{fontFamily:MO,fontSize:10,color:C.td,margin:"0 0 14px"}}>Track psychology & patterns · Persists across sessions</p>
          <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:10,padding:14,marginBottom:14}}>
            <textarea value={jNote} onChange={e=>setJNote(e.target.value)} placeholder="What did you observe? Lessons learned?" style={{width:"100%",height:70,background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:6,padding:8,fontFamily:MO,fontSize:11,outline:"none",resize:"vertical",marginBottom:8}}/>
            <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:8}}>
              <div><div style={{fontSize:9,color:C.td,fontFamily:MO,marginBottom:3}}>MOOD</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{MOODS.map(m=><Btn key={m} active={jMood===m} color={m==="confident"||m==="disciplined"?C.g:m==="fearful"||m==="tilted"?C.r:m==="greedy"?C.am:C.tm} onClick={()=>setJMood(m)} style={{fontSize:8,padding:"2px 7px",textTransform:"capitalize"}}>{m}</Btn>)}</div></div>
              <div><div style={{fontSize:9,color:C.td,fontFamily:MO,marginBottom:3}}>TAGS</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{TAGS.map(t=><Btn key={t} active={jTags.includes(t)} onClick={()=>setJTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t])} style={{fontSize:8,padding:"2px 7px"}}>{t}</Btn>)}</div></div>
            </div>
            <button onClick={()=>{if(!jNote.trim())return;const e={id:Date.now(),date:new Date().toISOString().split("T")[0],time:new Date().toLocaleTimeString(),note:jNote,mood:jMood,tags:jTags,preset,stats:{ret:s.ret,wr:s.wr}};saveJ([e,...jEntries]);setJNote("");setJTags([])}} style={{background:C.ac,color:"#fff",border:"none",borderRadius:6,padding:"8px 18px",fontFamily:SA,fontSize:12,fontWeight:600,cursor:"pointer"}}>Save Entry</button>
          </div>
          {jEntries.length===0?<div style={{background:C.sf,borderRadius:10,padding:30,textAlign:"center",color:C.td,fontFamily:MO,fontSize:11}}>No entries yet</div>
          :jEntries.map(e=><div key={e.id} style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:8,padding:12,marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontFamily:MO,fontSize:10,color:C.tm}}>{e.date}</span><span style={{background:e.mood==="confident"||e.mood==="disciplined"?C.gd:e.mood==="fearful"||e.mood==="tilted"?C.rd:C.bd2,color:e.mood==="confident"||e.mood==="disciplined"?C.g:e.mood==="fearful"||e.mood==="tilted"?C.r:C.b,padding:"2px 6px",borderRadius:4,fontSize:8,fontFamily:MO,textTransform:"capitalize"}}>{e.mood}</span></div>
              <button onClick={()=>saveJ(jEntries.filter(x=>x.id!==e.id))} style={{background:"transparent",border:"none",color:C.td,cursor:"pointer",fontFamily:MO}}>×</button>
            </div>
            <div style={{fontFamily:MO,fontSize:10,color:C.tx,lineHeight:1.6,marginBottom:4,whiteSpace:"pre-wrap"}}>{e.note}</div>
            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{e.tags?.map(t=><span key={t} style={{background:C.s2,padding:"2px 5px",borderRadius:3,fontSize:8,fontFamily:MO,color:C.tm}}>{t}</span>)}<span style={{fontFamily:MO,fontSize:8,color:C.td,marginLeft:"auto"}}>{e.stats?.ret>0?"+":""}{e.stats?.ret}%</span></div>
          </div>)}
        </div>}

        {/* RISK LAB */}
        {pg==="rk"&&<div className="fi">
          <h2 style={{fontSize:24,fontWeight:800,margin:"0 0 4px",letterSpacing:"-.02em"}}>Risk <span style={{color:C.am}}>Lab</span></h2>
          <p style={{fontFamily:SA,fontSize:14,color:C.td,margin:"0 0 20px"}}>Kelly criterion · Position sizing · Derived from your backtest</p>

          {/* Editable Account Balance */}
          <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:16,padding:20,marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:16,fontWeight:700}}>Your Account Balance</div>
              {portfolio&&<button onClick={()=>setCfg(c=>({...c,cap:portfolio.accountValue}))} style={{background:C.gd,color:C.g,border:`1px solid ${C.g}30`,borderRadius:10,padding:"8px 16px",fontSize:13,fontFamily:SA,fontWeight:600,cursor:"pointer"}}> Sync ${portfolio.accountValue.toLocaleString()}</button>}
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:28,fontWeight:800,color:C.td}}>$</span>
              <input type="number" value={cfg.cap} onChange={e=>setCfg(c=>({...c,cap:+e.target.value}))} min={1} className="bal-input" style={{background:C.s2,color:C.tx,border:`1px solid ${C.bd}`,borderRadius:12,padding:"14px 18px",fontFamily:SA,fontSize:28,fontWeight:800,width:"100%",outline:"none",letterSpacing:"-0.02em"}}/>
            </div>
            {!portfolio&&<div style={{fontSize:13,color:C.td,marginTop:8}}>Enter your real balance. Connect your exchange to sync automatically.</div>}
          </div>

          <div className="stat-g" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:20}}>
            <Stat label="Kelly Criterion" value={`${riskCalc.kelly}%`} sub="Optimal bet size" color={riskCalc.kelly>0?C.g:C.r}/>
            <Stat label="Half Kelly" value={`${riskCalc.hk}%`} sub="Recommended" color={C.cy}/>
            <Stat label="Reward:Risk" value={`${riskCalc.rr}:1`} color={riskCalc.rr>=2?C.g:C.am}/>
          </div>

          <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:16,padding:20,marginBottom:20}}>
            <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>Position Size Calculator</div>
            <div className="stat-g" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:16}}>
              {[
                ["Your Account",`$${cfg.cap.toLocaleString()}`,C.tx],
                ["Kelly Optimal",`$${(cfg.cap*Math.max(riskCalc.kelly,0)/100).toLocaleString(undefined,{maximumFractionDigits:0})}`,C.g],
                ["Half Kelly (Safer)",`$${(cfg.cap*Math.max(riskCalc.hk,0)/100).toLocaleString(undefined,{maximumFractionDigits:0})}`,C.cy],
                ["1% Risk (Conservative)",`$${(cfg.cap*.01).toLocaleString(undefined,{maximumFractionDigits:0})}`,C.am],
                ["2% Risk (Standard)",`$${(cfg.cap*.02).toLocaleString(undefined,{maximumFractionDigits:0})}`]
              ].map(([l,v,c],i)=><div key={i}>
                <div style={{fontSize:12,color:C.td,fontWeight:600,marginBottom:4}}>{l}</div>
                <div style={{fontSize:22,fontWeight:800,fontFamily:SA,color:c||C.tx,letterSpacing:"-0.02em"}}>{v}</div>
              </div>)}
            </div>
          </div>

          <div style={{background:C.sf,border:`1px solid ${C.bd}`,borderRadius:16,padding:20}}>
            <div style={{fontSize:16,fontWeight:700,marginBottom:14}}>Strategy Health</div>
            <div style={{display:"grid",gap:10}}>
              {[
                ["Edge Strength",s.exp>0?(s.pf>=2?"Strong":"Moderate"):"None",s.exp>0?(s.pf>=2?C.g:C.am):C.r,`Expectancy: $${s.exp} · Profit Factor: ${s.pf}`],
                ["Consistency",s.wr>=55?"High":s.wr>=45?"Medium":"Low",s.wr>=55?C.g:s.wr>=45?C.am:C.r,`Win Rate: ${s.wr}%`],
                ["Risk Profile",Math.abs(s.mdd)<10?"Conservative":Math.abs(s.mdd)<25?"Moderate":"Aggressive",Math.abs(s.mdd)<10?C.g:Math.abs(s.mdd)<25?C.am:C.r,`Max Drawdown: ${s.mdd}% · Sharpe: ${s.sh}`],
                ["Sample Size",s.n>=30?"Sufficient":s.n>=15?"Borderline":"Insufficient",s.n>=30?C.g:s.n>=15?C.am:C.r,`${s.n} trades (min recommended: 30)`]
              ].map(([l,sc,co,dt],i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:C.s2,borderRadius:12}}>
                <div style={{width:10,height:10,borderRadius:"50%",background:co,flexShrink:0}}/>
                <div style={{minWidth:100}}>
                  <div style={{fontFamily:SA,fontSize:15,fontWeight:700,color:co}}>{sc}</div>
                  <div style={{fontSize:12,color:C.td,fontWeight:500}}>{l}</div>
                </div>
                <div style={{fontFamily:MO,fontSize:12,color:C.tm}}>{dt}</div>
              </div>)}
            </div>
          </div>
        </div>}
      </div>

      {/* ═══ FOOTER ═══ */}
      <div style={{borderTop:`1px solid ${C.bd}`,padding:"40px 24px",textAlign:"center",marginTop:40}}>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <div style={{fontSize:18,fontStyle:"italic",color:C.tm,lineHeight:1.7,marginBottom:24,fontFamily:SA,fontWeight:500}}>
            "If you are feeling down and thinking of giving up, then you absolutely should, you fkn pussy"
          </div>
          <div className="foot-links" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:12}}>
            {/* X / Twitter */}
            <a href="https://x.com/barneyxbt" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,color:C.tm,textDecoration:"none",fontSize:14,fontWeight:600,fontFamily:SA,padding:"8px 14px",borderRadius:10,border:`1px solid ${C.bd}`,background:C.sf,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.tx} onMouseLeave={e=>e.currentTarget.style.borderColor=C.bd}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              @barneyxbt
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/@barneyxbt" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,color:C.tm,textDecoration:"none",fontSize:14,fontWeight:600,fontFamily:SA,padding:"8px 14px",borderRadius:10,border:`1px solid ${C.bd}`,background:C.sf,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#ff0000"} onMouseLeave={e=>e.currentTarget.style.borderColor=C.bd}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
            {/* Telegram */}
            <a href="https://t.me/barneyxbt" target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,color:C.tm,textDecoration:"none",fontSize:14,fontWeight:600,fontFamily:SA,padding:"8px 14px",borderRadius:10,border:`1px solid ${C.bd}`,background:C.sf,transition:"all .15s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#26a5e4"} onMouseLeave={e=>e.currentTarget.style.borderColor=C.bd}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#26a5e4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram
            </a>
          </div>
          <div style={{fontSize:12,color:C.td,marginTop:8}}>Free forever · No data collection · Your keys never leave your device</div>
        </div>
      </div>

  </div>
}
