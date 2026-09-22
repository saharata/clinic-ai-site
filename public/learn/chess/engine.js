/* ===== เอนจิ้นหมากรุกสากล =====
   กระดานแบบ 0x88 · กติกาครบ: เข้าป้อม กินผ่าน เลื่อนขั้น กฎห้าสิบตา เสมอซ้ำสามครั้ง หมากไม่พอ
   ใช้ได้ทั้งในเบราว์เซอร์ (window.Chess) และใน node (module.exports) เพื่อทดสอบด้วย perft   */
(function(root){
"use strict";

var W=1, B=2;
var P=1, N=2, BI=3, R=4, Q=5, K=6;
var VAL={1:100, 2:320, 3:330, 4:500, 5:900, 6:0};
var NAME_TH={1:"เบี้ย", 2:"ม้า", 3:"บิชอป", 4:"เรือ", 5:"ควีน", 6:"คิง"};
var LETTER={1:"", 2:"N", 3:"B", 4:"R", 5:"Q", 6:"K"};
var FILES="abcdefgh";

function mk(t,c){ return c===W ? t : t+8; }
function colorOf(p){ return p===0 ? 0 : (p>8 ? B : W); }
function typeOf(p){ return p & 7; }
function onBoard(sq){ return (sq & 0x88)===0; }
function sq2rf(sq){ return {r:sq>>4, f:sq&15}; }
function rf2sq(r,f){ return r*16+f; }
function sqName(sq){ return FILES[sq&15] + (8-(sq>>4)); }
function nameToSq(s){ return rf2sq(8-parseInt(s[1],10), FILES.indexOf(s[0])); }

var OFF_N=[-33,-31,-18,-14,14,18,31,33];
var OFF_B=[-17,-15,15,17];
var OFF_R=[-16,-1,1,16];
var OFF_K=[-17,-16,-15,-1,1,15,16,17];

/* สิทธิ์เข้าป้อม: 1 = ขาวฝั่งคิง · 2 = ขาวฝั่งควีน · 4 = ดำฝั่งคิง · 8 = ดำฝั่งควีน */
var E1=rf2sq(7,4), H1=rf2sq(7,7), A1=rf2sq(7,0);
var E8=rf2sq(0,4), H8=rf2sq(0,7), A8=rf2sq(0,0);

function newGame(){
  var st={ b:new Int8Array(128), turn:W, castle:15, ep:-1, half:0, full:1, hist:[], reps:{} };
  var back=[R,N,BI,Q,K,BI,N,R], f;
  for(f=0;f<8;f++){
    st.b[rf2sq(0,f)]=mk(back[f],B);
    st.b[rf2sq(1,f)]=mk(P,B);
    st.b[rf2sq(6,f)]=mk(P,W);
    st.b[rf2sq(7,f)]=mk(back[f],W);
  }
  st.reps[posKey(st)]=1;
  return st;
}
function clone(st){
  return { b:st.b.slice(), turn:st.turn, castle:st.castle, ep:st.ep, half:st.half, full:st.full,
           hist:st.hist.slice(), reps:Object.assign({},st.reps) };
}
function posKey(st){
  var s="", r, f, p;
  for(r=0;r<8;r++) for(f=0;f<8;f++){ p=st.b[rf2sq(r,f)]; s += p ? String.fromCharCode(64+p) : "."; }
  return s + st.turn + "|" + st.castle + "|" + st.ep;
}

/* ---------- สร้างตาเดิน ---------- */
function addPawnMoves(st,out,from,color){
  var dir = color===W ? -16 : 16;
  var startRank = color===W ? 6 : 1;
  var promoRank = color===W ? 0 : 7;
  var to = from+dir, i, tr;
  if(onBoard(to) && st.b[to]===0){
    tr=to>>4;
    if(tr===promoRank){ out.push(mv(st,from,to,Q)); out.push(mv(st,from,to,R));
                        out.push(mv(st,from,to,BI)); out.push(mv(st,from,to,N)); }
    else {
      out.push(mv(st,from,to,0));
      var two=from+dir*2;
      if((from>>4)===startRank && st.b[two]===0) out.push(mv(st,from,two,0,"double"));
    }
  }
  for(i=-1;i<=1;i+=2){
    to=from+dir+i;
    if(!onBoard(to)) continue;
    var t=st.b[to];
    if(t!==0 && colorOf(t)!==color){
      tr=to>>4;
      if(tr===promoRank){ out.push(mv(st,from,to,Q)); out.push(mv(st,from,to,R));
                          out.push(mv(st,from,to,BI)); out.push(mv(st,from,to,N)); }
      else out.push(mv(st,from,to,0));
    } else if(t===0 && to===st.ep){
      out.push(mv(st,from,to,0,"ep"));
    }
  }
}
function mv(st,from,to,promo,flag){
  return { from:from, to:to, piece:st.b[from], cap:st.b[to], promo:promo||0, flag:flag||"" };
}
function genMoves(st,color,out){
  out = out || [];
  out.length=0;
  color = color || st.turn;
  var sq, p, ty, i, to, off;
  for(sq=0;sq<128;sq++){
    if(!onBoard(sq)) continue;
    p=st.b[sq];
    if(p===0 || colorOf(p)!==color) continue;
    ty=typeOf(p);
    if(ty===P){ addPawnMoves(st,out,sq,color); continue; }
    if(ty===N || ty===K){
      off = ty===N ? OFF_N : OFF_K;
      for(i=0;i<off.length;i++){
        to=sq+off[i];
        if(!onBoard(to)) continue;
        if(st.b[to]!==0 && colorOf(st.b[to])===color) continue;
        out.push(mv(st,sq,to,0));
      }
      continue;
    }
    off = ty===BI ? OFF_B : (ty===R ? OFF_R : OFF_B.concat(OFF_R));
    for(i=0;i<off.length;i++){
      to=sq+off[i];
      while(onBoard(to)){
        if(st.b[to]===0) out.push(mv(st,sq,to,0));
        else { if(colorOf(st.b[to])!==color) out.push(mv(st,sq,to,0)); break; }
        to+=off[i];
      }
    }
  }
  /* เข้าป้อม: คิงกับเรือยังไม่ขยับ ช่องระหว่างกลางว่าง และคิงไม่เดินผ่านช่องที่ถูกคุม */
  var opp=3-color;
  if(color===W){
    if((st.castle&1) && st.b[E1]===mk(K,W) && st.b[H1]===mk(R,W) &&
       st.b[E1+1]===0 && st.b[E1+2]===0 &&
       !isAttacked(st,E1,opp) && !isAttacked(st,E1+1,opp) && !isAttacked(st,E1+2,opp))
      out.push(mv(st,E1,E1+2,0,"castleK"));
    if((st.castle&2) && st.b[E1]===mk(K,W) && st.b[A1]===mk(R,W) &&
       st.b[E1-1]===0 && st.b[E1-2]===0 && st.b[E1-3]===0 &&
       !isAttacked(st,E1,opp) && !isAttacked(st,E1-1,opp) && !isAttacked(st,E1-2,opp))
      out.push(mv(st,E1,E1-2,0,"castleQ"));
  } else {
    if((st.castle&4) && st.b[E8]===mk(K,B) && st.b[H8]===mk(R,B) &&
       st.b[E8+1]===0 && st.b[E8+2]===0 &&
       !isAttacked(st,E8,opp) && !isAttacked(st,E8+1,opp) && !isAttacked(st,E8+2,opp))
      out.push(mv(st,E8,E8+2,0,"castleK"));
    if((st.castle&8) && st.b[E8]===mk(K,B) && st.b[A8]===mk(R,B) &&
       st.b[E8-1]===0 && st.b[E8-2]===0 && st.b[E8-3]===0 &&
       !isAttacked(st,E8,opp) && !isAttacked(st,E8-1,opp) && !isAttacked(st,E8-2,opp))
      out.push(mv(st,E8,E8-2,0,"castleQ"));
  }
  return out;
}

function isAttacked(st,sq,by){
  var i, to, t, ty, off;
  for(i=0;i<OFF_N.length;i++){                       /* ม้า */
    to=sq+OFF_N[i];
    if(onBoard(to)){ t=st.b[to]; if(t && colorOf(t)===by && typeOf(t)===N) return true; }
  }
  for(i=0;i<OFF_K.length;i++){                       /* คิงประชิด */
    to=sq+OFF_K[i];
    if(onBoard(to)){ t=st.b[to]; if(t && colorOf(t)===by && typeOf(t)===K) return true; }
  }
  for(i=0;i<OFF_B.length;i++){                       /* แนวทแยง: บิชอป ควีน */
    to=sq+OFF_B[i];
    while(onBoard(to)){
      t=st.b[to];
      if(t){ if(colorOf(t)===by && (typeOf(t)===BI || typeOf(t)===Q)) return true; break; }
      to+=OFF_B[i];
    }
  }
  for(i=0;i<OFF_R.length;i++){                       /* แนวตรง: เรือ ควีน */
    to=sq+OFF_R[i];
    while(onBoard(to)){
      t=st.b[to];
      if(t){ if(colorOf(t)===by && (typeOf(t)===R || typeOf(t)===Q)) return true; break; }
      to+=OFF_R[i];
    }
  }
  var pdir = by===W ? 16 : -16;                      /* เบี้ยกินทแยงไปข้างหน้า */
  for(i=-1;i<=1;i+=2){
    to=sq+pdir+i;
    if(onBoard(to)){ t=st.b[to]; if(t && colorOf(t)===by && typeOf(t)===P) return true; }
  }
  return false;
}
function kingSq(st,color){
  var k=mk(K,color), sq;
  for(sq=0;sq<128;sq++) if(onBoard(sq) && st.b[sq]===k) return sq;
  return -1;
}
function inCheck(st,color){
  var k=kingSq(st,color);
  return k<0 ? false : isAttacked(st,k,3-color);
}

function makeMove(st,m){
  m._castle=st.castle; m._ep=st.ep; m._half=st.half; m._epCap=0; m._rook=null;
  var color=colorOf(m.piece), ty=typeOf(m.piece);
  st.b[m.to] = m.promo ? mk(m.promo,color) : m.piece;
  st.b[m.from]=0;
  if(m.flag==="ep"){
    var capSq = m.to + (color===W ? 16 : -16);
    m._epCap = st.b[capSq];
    st.b[capSq]=0;
  }
  if(m.flag==="castleK"){ var rf=m.to+1, rt=m.to-1; m._rook={from:rf,to:rt,p:st.b[rf]}; st.b[rt]=st.b[rf]; st.b[rf]=0; }
  if(m.flag==="castleQ"){ var rf2=m.to-2, rt2=m.to+1; m._rook={from:rf2,to:rt2,p:st.b[rf2]}; st.b[rt2]=st.b[rf2]; st.b[rf2]=0; }
  st.ep = (m.flag==="double") ? (m.from + (color===W ? -16 : 16)) : -1;
  if(ty===K) st.castle &= (color===W ? ~3 : ~12);
  if(m.from===H1 || m.to===H1) st.castle &= ~1;
  if(m.from===A1 || m.to===A1) st.castle &= ~2;
  if(m.from===H8 || m.to===H8) st.castle &= ~4;
  if(m.from===A8 || m.to===A8) st.castle &= ~8;
  st.half = (ty===P || m.cap || m.flag==="ep") ? 0 : st.half+1;
  if(color===B) st.full++;
  st.turn = 3-color;
}
function unmakeMove(st,m){
  var color=colorOf(m.piece);
  st.b[m.from]=m.piece;
  st.b[m.to]=m.cap;
  if(m.flag==="ep"){
    st.b[m.to]=0;
    st.b[m.to + (color===W ? 16 : -16)] = m._epCap;
  }
  if(m._rook){ st.b[m._rook.from]=m._rook.p; st.b[m._rook.to]=0; }
  st.castle=m._castle; st.ep=m._ep; st.half=m._half;
  if(color===B) st.full--;
  st.turn=color;
}
function legalMoves(st,color){
  color = color || st.turn;
  var ps=genMoves(st,color,[]), out=[], i;
  for(i=0;i<ps.length;i++){
    makeMove(st,ps[i]);
    if(!inCheck(st,color)) out.push(ps[i]);
    unmakeMove(st,ps[i]);
  }
  return out;
}
/* เดินจริงในเกม พร้อมบันทึกประวัติสำหรับกฎเสมอซ้ำ */
function playMove(st,m){
  makeMove(st,m);
  var key=posKey(st);
  st.reps[key]=(st.reps[key]||0)+1;
  st.hist.push({m:m, key:key});
}
function undoMove(st){
  if(!st.hist.length) return null;
  var h=st.hist.pop();
  st.reps[h.key]--;
  if(st.reps[h.key]<=0) delete st.reps[h.key];
  unmakeMove(st,h.m);
  return h.m;
}

function insufficientMaterial(st){
  var pieces=[], sq, p;
  for(sq=0;sq<128;sq++){
    if(!onBoard(sq)) continue;
    p=st.b[sq];
    if(p && typeOf(p)!==K) pieces.push({t:typeOf(p), c:colorOf(p), dark:(((sq>>4)+(sq&15))%2)===1});
  }
  if(pieces.length===0) return true;                                  /* คิงต่อคิง */
  if(pieces.length===1 && (pieces[0].t===N || pieces[0].t===BI)) return true;
  if(pieces.length===2 && pieces[0].t===BI && pieces[1].t===BI &&
     pieces[0].c!==pieces[1].c && pieces[0].dark===pieces[1].dark) return true;
  return false;
}
/* ผลของเกม ณ ตำแหน่งปัจจุบัน */
function gameResult(st){
  var ms=legalMoves(st,st.turn);
  if(!ms.length) return inCheck(st,st.turn) ? {over:true, type:"mate", winner:3-st.turn}
                                            : {over:true, type:"stalemate"};
  if(st.half>=100) return {over:true, type:"fifty"};
  var key=posKey(st);
  if((st.reps[key]||0)>=3) return {over:true, type:"repetition"};
  if(insufficientMaterial(st)) return {over:true, type:"material"};
  return {over:false, moves:ms};
}

/* ---------- สัญกรณ์ ---------- */
function moveSAN(st,m,legal){
  if(m.flag==="castleK") return "O-O";
  if(m.flag==="castleQ") return "O-O-O";
  var ty=typeOf(m.piece), s="";
  if(ty===P){
    if(m.cap || m.flag==="ep") s += FILES[m.from&15] + "x";
    s += sqName(m.to);
    if(m.promo) s += "=" + LETTER[m.promo];
  } else {
    s += LETTER[ty];
    var same=(legal||legalMoves(st,colorOf(m.piece))).filter(function(o){
      return o.to===m.to && typeOf(o.piece)===ty && o.from!==m.from;
    });
    if(same.length){
      var sameFile=same.some(function(o){ return (o.from&15)===(m.from&15); });
      var sameRank=same.some(function(o){ return (o.from>>4)===(m.from>>4); });
      s += sameFile ? (sameRank ? sqName(m.from) : String(8-(m.from>>4))) : FILES[m.from&15];
    }
    if(m.cap) s += "x";
    s += sqName(m.to);
  }
  makeMove(st,m);
  var opp=st.turn, chk=inCheck(st,opp), mate=chk && legalMoves(st,opp).length===0;
  unmakeMove(st,m);
  return s + (mate ? "#" : (chk ? "+" : ""));
}
function moveThai(st,m){
  if(m.flag==="castleK") return "เข้าป้อมฝั่งคิง";
  if(m.flag==="castleQ") return "เข้าป้อมฝั่งควีน";
  return NAME_TH[typeOf(m.piece)]+" "+sqName(m.from)+(m.cap||m.flag==="ep" ? "x" : "-")+sqName(m.to)+
         (m.promo ? " เลื่อนขั้นเป็น"+NAME_TH[m.promo] : "");
}

/* ---------- การประเมินและการค้นหา ---------- */
var PST_P=[0,0,0,0,0,0,0,0, 50,50,50,50,50,50,50,50, 10,10,20,30,30,20,10,10,
           5,5,10,25,25,10,5,5, 0,0,0,20,20,0,0,0, 5,-5,-10,0,0,-10,-5,5,
           5,10,10,-20,-20,10,10,5, 0,0,0,0,0,0,0,0];
var PST_N=[-50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,0,0,0,-20,-40, -30,0,10,15,15,10,0,-30,
           -30,5,15,20,20,15,5,-30, -30,0,15,20,20,15,0,-30, -30,5,10,15,15,10,5,-30,
           -40,-20,0,5,5,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50];
var PST_B=[-20,-10,-10,-10,-10,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,10,10,5,0,-10,
           -10,5,5,10,10,5,5,-10, -10,0,10,10,10,10,0,-10, -10,10,10,10,10,10,10,-10,
           -10,5,0,0,0,0,5,-10, -20,-10,-10,-10,-10,-10,-10,-20];
var PST_R=[0,0,0,0,0,0,0,0, 5,10,10,10,10,10,10,5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5,
           -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, 0,0,0,5,5,0,0,0];
var PST_Q=[-20,-10,-10,-5,-5,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,5,5,5,0,-10,
           -5,0,5,5,5,5,0,-5, 0,0,5,5,5,5,0,-5, -10,5,5,5,5,5,0,-10,
           -10,0,5,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20];
var PST_K=[-30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30,
           -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30,
           -20,-30,-30,-40,-40,-30,-30,-20, -10,-20,-20,-20,-20,-20,-20,-10,
           20,20,0,0,0,0,20,20, 20,30,10,0,0,10,30,20];
var PST={1:PST_P, 2:PST_N, 3:PST_B, 4:PST_R, 5:PST_Q, 6:PST_K};

function evaluate(st,color){
  var s=0, sq, p, c, ty, idx;
  for(sq=0;sq<128;sq++){
    if(!onBoard(sq)) continue;
    p=st.b[sq];
    if(!p) continue;
    c=colorOf(p); ty=typeOf(p);
    idx = c===W ? ((sq>>4)*8 + (sq&15)) : ((7-(sq>>4))*8 + (sq&15));
    var v = VAL[ty] + PST[ty][idx];
    s += (c===color ? v : -v);
  }
  return s;
}
function mvvLva(m){ return m.cap ? VAL[typeOf(m.cap)]*10 - VAL[typeOf(m.piece)] : (m.promo?800:0); }
function orderMoves(ms){ ms.sort(function(a,c){ return mvvLva(c)-mvvLva(a); }); return ms; }

var deadline=0, aborted=false, nodes=0;
function timeUp(){
  if(aborted) return true;
  if((++nodes & 1023)===0 && (typeof performance!=="undefined" ? performance.now() : Date.now())>deadline) aborted=true;
  return aborted;
}
function quiesce(st,color,alpha,beta){
  var stand=evaluate(st,color);
  if(stand>=beta) return beta;
  if(alpha<stand) alpha=stand;
  if(timeUp()) return alpha;
  var ms=genMoves(st,color,[]), caps=[], i;
  for(i=0;i<ms.length;i++) if(ms[i].cap || ms[i].promo) caps.push(ms[i]);
  orderMoves(caps);
  for(i=0;i<caps.length;i++){
    makeMove(st,caps[i]);
    if(inCheck(st,color)){ unmakeMove(st,caps[i]); continue; }
    var sc=-quiesce(st,3-color,-beta,-alpha);
    unmakeMove(st,caps[i]);
    if(timeUp()) return alpha;
    if(sc>=beta) return beta;
    if(sc>alpha) alpha=sc;
  }
  return alpha;
}
function negamax(st,color,depth,alpha,beta,pv,ply){
  if(pv) pv.length=0;
  if(timeUp()) return alpha;
  if(depth<=0) return quiesce(st,color,alpha,beta);
  var ms=genMoves(st,color,[]), any=false, child=pv?[]:null, i, j;
  orderMoves(ms);
  for(i=0;i<ms.length;i++){
    makeMove(st,ms[i]);
    if(inCheck(st,color)){ unmakeMove(st,ms[i]); continue; }
    any=true;
    var sc=-negamax(st,3-color,depth-1,-beta,-alpha,child,ply+1);
    unmakeMove(st,ms[i]);
    if(timeUp()) return alpha;
    if(sc>=beta) return beta;
    if(sc>alpha){
      alpha=sc;
      if(pv){ pv.length=0; pv.push(ms[i]); for(j=0;j<child.length;j++) pv.push(child[j]); }
    }
  }
  if(!any) return inCheck(st,color) ? -(90000-ply) : 0;
  return alpha;
}
function search(st,color,depth,ms){
  var best=null, alpha=-1e9, pv=[], child=[], i, j;
  ms = ms || legalMoves(st,color);
  orderMoves(ms);
  for(i=0;i<ms.length;i++){
    makeMove(st,ms[i]);
    var sc=-negamax(st,3-color,depth-1,-1e9,-alpha,child,1);
    unmakeMove(st,ms[i]);
    if(aborted) break;
    if(best===null || sc>alpha){
      alpha=sc; best=ms[i];
      pv.length=0; pv.push(ms[i]);
      for(j=0;j<child.length;j++) pv.push(child[j]);
    }
  }
  return best ? {move:best, score:alpha, pv:pv.slice()} : null;
}
function setDeadline(ms){
  deadline=(typeof performance!=="undefined" ? performance.now() : Date.now())+ms;
  aborted=false; nodes=0;
}
function wasAborted(){ return aborted; }

/* ---------- เครื่องมือของโค้ช ---------- */
function attackerValues(st,sq,by){
  var ms=genMoves(st,by,[]), out=[], i;
  for(i=0;i<ms.length;i++) if(ms[i].to===sq) out.push(VAL[typeOf(ms[i].piece)]);
  out.sort(function(a,c){ return a-c; });
  return out;
}
/* ประเมินการแลกหมากที่ช่องเดียวจนจบ คืนกำไรสุทธิหน่วยเซนติเบี้ย */
function seeCapture(st,m){
  var side=colorOf(m.piece);
  var gains=[ m.cap ? VAL[typeOf(m.cap)] : (m.flag==="ep" ? VAL[P] : 0) ];
  makeMove(st,m);
  var oppAtk=attackerValues(st,m.to,3-side), ownAtk=attackerValues(st,m.to,side);
  unmakeMove(st,m);
  var occupant=VAL[m.promo ? m.promo : typeOf(m.piece)];
  var oi=0, si=0, d=0;
  while(true){
    d++;
    var list=(d%2===1)?oppAtk:ownAtk, ptr=(d%2===1)?oi++:si++;
    if(ptr>=list.length) break;
    gains[d]=occupant-gains[d-1];
    occupant=list[ptr];
  }
  while(d>1){ d--; gains[d-1]=-Math.max(-gains[d-1], gains[d]); }
  return gains[0];
}
function bestCapture(st,color,minGain){
  var ms=legalMoves(st,color), best=null, bg=(minGain===undefined?40:minGain)-1, i;
  for(i=0;i<ms.length;i++){
    if(!ms[i].cap && ms[i].flag!=="ep") continue;
    var g=seeCapture(st,ms[i]);
    if(g>bg){ bg=g; best=ms[i]; }
  }
  return best ? {move:best, gain:bg} : null;
}
function mateIn1(st,color){
  var ms=legalMoves(st,color), i, found=null;
  for(i=0;i<ms.length && !found;i++){
    makeMove(st,ms[i]);
    if(inCheck(st,3-color) && legalMoves(st,3-color).length===0) found=ms[i];
    unmakeMove(st,ms[i]);
  }
  return found;
}
/* เดินตานี้แล้วคาดว่าจะเสียเท่าไร (คิดการกินคืนทั้งชุด) */
function moveLoss(st,m){
  var side=colorOf(m.piece);
  makeMove(st,m);
  var ms=genMoves(st,3-side,[]), worst=0, i;
  for(i=0;i<ms.length;i++){
    if(ms[i].to!==m.to) continue;
    var g=seeCapture(st,ms[i]);
    if(g>worst) worst=g;
  }
  unmakeMove(st,m);
  return worst - (m.cap ? VAL[typeOf(m.cap)] : 0);
}
function mateDistance(score){ return Math.ceil((90000-Math.abs(score)+1)/2); }

function perft(st,depth){
  if(depth===0) return 1;
  var ms=legalMoves(st,st.turn), n=0, i;
  if(depth===1) return ms.length;
  for(i=0;i<ms.length;i++){
    makeMove(st,ms[i]);
    n+=perft(st,depth-1);
    unmakeMove(st,ms[i]);
  }
  return n;
}
function loadFEN(fen){
  var st={ b:new Int8Array(128), turn:W, castle:0, ep:-1, half:0, full:1, hist:[], reps:{} };
  var parts=fen.split(/\s+/), rows=parts[0].split("/"), r, f, i, ch;
  var MAPT={p:P,n:N,b:BI,r:R,q:Q,k:K};
  for(r=0;r<8;r++){
    f=0;
    for(i=0;i<rows[r].length;i++){
      ch=rows[r][i];
      if(/\d/.test(ch)){ f+=parseInt(ch,10); continue; }
      var t=MAPT[ch.toLowerCase()];
      st.b[rf2sq(r,f)] = mk(t, ch===ch.toUpperCase() ? W : B);
      f++;
    }
  }
  st.turn = parts[1]==="b" ? B : W;
  if(parts[2] && parts[2]!=="-"){
    if(parts[2].indexOf("K")>=0) st.castle|=1;
    if(parts[2].indexOf("Q")>=0) st.castle|=2;
    if(parts[2].indexOf("k")>=0) st.castle|=4;
    if(parts[2].indexOf("q")>=0) st.castle|=8;
  }
  if(parts[3] && parts[3]!=="-") st.ep=nameToSq(parts[3]);
  st.half = parts[4] ? parseInt(parts[4],10) : 0;
  st.full = parts[5] ? parseInt(parts[5],10) : 1;
  st.reps[posKey(st)]=1;
  return st;
}

var API={ W:W, B:B, P:P, N:N, BI:BI, R:R, Q:Q, K:K, VAL:VAL, NAME_TH:NAME_TH, FILES:FILES,
  mk:mk, colorOf:colorOf, typeOf:typeOf, onBoard:onBoard, sqName:sqName, nameToSq:nameToSq,
  rf2sq:rf2sq, newGame:newGame, clone:clone, genMoves:genMoves, legalMoves:legalMoves,
  makeMove:makeMove, unmakeMove:unmakeMove, playMove:playMove, undoMove:undoMove,
  isAttacked:isAttacked, inCheck:inCheck, kingSq:kingSq, gameResult:gameResult,
  moveSAN:moveSAN, moveThai:moveThai, evaluate:evaluate, search:search, setDeadline:setDeadline,
  wasAborted:wasAborted, seeCapture:seeCapture, bestCapture:bestCapture, mateIn1:mateIn1,
  moveLoss:moveLoss, mateDistance:mateDistance, perft:perft, loadFEN:loadFEN, posKey:posKey };

if(typeof module!=="undefined" && module.exports) module.exports=API;
root.Chess=API;
})(typeof window!=="undefined" ? window : this);
