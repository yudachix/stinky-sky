(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{77306:function(e,t,n){Promise.resolve().then(n.bind(n,55095))},55095:function(e,t,n){"use strict";n.d(t,{default:function(){return P}});var r,i,a=n(57437),s=n(61032);let l=e=>new Promise((t,n)=>{let r=document.createElement("img"),i=()=>{r.onload=r.onerror=null};r.onload=()=>{i(),t(r)},r.onerror=e=>{i(),n(e)},r.src=e});var o=n(95253),c=n(7630),d=n(67622),u=n(22790),h=n(4703),x=n(71287),g=n(7999),p=n(76548),f=n(69022),m=n(62197),j=n(61096),w=n(66124),Z=n(80824),b=n(60335),v=n(99128),C=n(86917),k=n(31863),S=n(60382),y=n(28027),E=n(6623),I=n(88929),L=n(98131),R=n(80511),U=n(2265),N=n(61015);function O(){return new Worker(n.p+"static/029ff0f7370d3622.worker.js")}function P(){let[e,t]=(0,U.useState)(256),[n,r]=(0,U.useState)(),[i,P]=(0,U.useState)(0),[M,_]=(0,U.useState)(!1),[F,B]=(0,U.useState)(),[T,W]=(0,U.useState)(!1),[D,z]=(0,U.useState)(),[A,G]=(0,U.useState)(0),[K]=(0,U.useState)(()=>[s.rS,s.K1,s.ld,s.rU].map(e=>({color:e,id:Math.random()}))),[H]=(0,U.useState)(()=>new Set(K.map(e=>e.id))),[q,J]=(0,U.useState)(K),Q=(0,U.useRef)(null);return(0,U.useEffect)(()=>{let e=new AbortController;return window.addEventListener("dragover",e=>{e.preventDefault()},{signal:e.signal}),window.addEventListener("drop",e=>{var t;if(e.preventDefault(),n)return;let i=null===(t=e.dataTransfer)||void 0===t?void 0:t.files[0];i&&r(i)},{signal:e.signal}),()=>{e.abort()}},[n]),(0,U.useEffect)(()=>{if(!n)return;P(0);let t=new O;return(async()=>{try{let r=URL.createObjectURL(n),i=await l(r).finally(()=>{URL.revokeObjectURL(r)}),a=document.createElement("canvas").transferControlToOffscreen(),s=await createImageBitmap(i),o=await new Promise((n,r)=>{t.addEventListener("message",e=>{let{data:t}=e;switch(t.type){case"progress":P(t.progress);break;case"done":n(t.resultImageBitmap)}}),t.postMessage({offscreenCanvas:a,imageBitmap:s,colorSize:e,palette:q.map(e=>e.color)},[a,s])}),c=document.createElement("canvas");c.classList.add("result"),c.width=o.width,c.height=o.height;let d=c.getContext("2d");if(!d)throw Error("Can't get context");if(d.drawImage(o,0,0),!Q.current)throw Error("Can't draw image");Q.current.replaceChildren(),Q.current.append(c)}finally{r(void 0)}})(),()=>{t.terminate()}},[n,e,q]),(0,a.jsxs)(a.Fragment,{children:[!!F&&!!D&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(E.ZP,{anchorEl:D,anchorOrigin:{vertical:"bottom",horizontal:"left"},open:1===A,onClose:()=>{B(void 0),z(void 0)},children:(0,a.jsx)(N.xS,{styles:{default:{picker:{backgroundColor:s.rS}}},disableAlpha:!0,color:F.color,onChange:e=>J(t=>t.map(t=>{let n={...t,color:e.hex};return B(n),t.id===F.id?n:t}))})}),(0,a.jsxs)(k.Z,{open:0===A,anchorEl:D,onClose:()=>{B(void 0),z(void 0)},children:[(0,a.jsxs)(S.Z,{onClick:()=>G(1),children:[(0,a.jsx)(C.Z,{children:(0,a.jsx)(h.Z,{})}),"編集"]}),(0,a.jsxs)(S.Z,{onClick:()=>{J(e=>e.filter(e=>e.id!==F.id)),z(void 0),B(void 0)},children:[(0,a.jsx)(C.Z,{children:(0,a.jsx)(d.Z,{})}),"削除"]})]})]}),(0,a.jsxs)(j.Z,{open:M,fullScreen:!0,children:[(0,a.jsx)(Z.Z,{children:(0,a.jsxs)(I.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,a.jsx)(R.Z,{children:"設定"}),(0,a.jsx)(b.Z,{onClick:()=>_(!1),children:(0,a.jsx)(c.Z,{})})]})}),(0,a.jsx)(w.Z,{children:(0,a.jsxs)(I.Z,{alignItems:"flex-start",spacing:2,children:[(0,a.jsx)(R.Z,{variant:"h6",children:"減色処理"}),(0,a.jsx)(R.Z,{children:"色数を減らすと処理が高速になります"}),(0,a.jsx)(L.Z,{label:"色数",type:"number",inputProps:{min:1},value:e,onChange:e=>{let n=Number(e.currentTarget.value);n<1||!Number.isFinite(n)||Number.isNaN(n)||t(n)}}),(0,a.jsx)(R.Z,{variant:"h6",children:"カラーパレット"}),(0,a.jsxs)(I.Z,{useFlexGap:!0,spacing:1,direction:"row",alignItems:"center",flexWrap:"wrap",children:[q.map(e=>{let{color:t,id:n}=e,r=H.has(n),i={backgroundColor:t,width:"3rem",height:"3rem",borderRadius:"50%",border:"1px solid var(--mui-palette-text-primary)"};return r?(0,a.jsx)(g.Z,{sx:i},n):(0,a.jsx)(f.Z,{onClick:t=>{B(e),G(0),z(t.currentTarget)},sx:i},n)}),(0,a.jsx)(b.Z,{onClick:()=>J(e=>[...e,{id:Math.random(),color:"#fff"}]),children:(0,a.jsx)(o.Z,{})})]})]})})]}),(0,a.jsx)(m.Z,{sx:{height:"100%"},children:(0,a.jsxs)(I.Z,{spacing:2,alignItems:"flex-start",padding:2,height:"100%",children:[(0,a.jsxs)(I.Z,{useFlexGap:!0,direction:"row",alignItems:"center",width:"100%",spacing:2,justifyContent:"space-between",sx:e=>({[e.breakpoints.down("sm")]:{alignItems:"flex-start",flexDirection:"column",justifyContent:"flex-start"}}),children:[(0,a.jsx)(R.Z,{component:"h1",variant:"h4",children:"Stinky Sky"}),(0,a.jsxs)(I.Z,{direction:"row",alignItems:"center",spacing:2,children:[(0,a.jsx)(p.Z,{disabled:!0,startIcon:(0,a.jsx)(u.Z,{}),sx:{color:"text.primary"},children:"ヘルプ"}),(0,a.jsx)(p.Z,{disabled:!!n,onClick:()=>_(!0),startIcon:(0,a.jsx)(x.Z,{}),variant:"contained",children:"設定"})]})]}),(0,a.jsxs)(g.Z,{height:"10rem",width:"100%",children:[!n&&(0,a.jsxs)(y.Z,{component:"label",variant:"outlined",sx:{cursor:"pointer",padding:"1rem",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,a.jsx)(R.Z,{children:"ここを押すかファイルをドロップして画像を読み込みます"}),(0,a.jsx)(g.Z,{disabled:!!n,component:"input",type:"file",accept:"image/*",sx:{clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:1,overflow:"hidden",position:"absolute",bottom:0,left:0,whiteSpace:"nowrap",width:1},onChange:e=>{var t;let n=null===(t=e.target.files)||void 0===t?void 0:t[0];n&&r(n)}})]}),!!n&&(0,a.jsxs)(I.Z,{height:"100%",padding:1,justifyContent:"center",alignItems:"center",spacing:2,children:[(0,a.jsx)(v.Z,{sx:{width:"100%"},variant:"determinate",value:i}),(0,a.jsx)(R.Z,{fontWeight:"bold",children:"処理中です"})]})]}),(0,a.jsxs)(I.Z,{alignItems:"flex-start",spacing:2,display:i<100?"none":void 0,flex:1,height:"100%",width:"100%",children:[(0,a.jsx)(I.Z,{flex:1,height:"100%",width:"100%",ref:Q,position:"relative",justifyContent:"center",alignItems:"center",sx:{backgroundSize:"30px 30px",backgroundPosition:"0 0, 15px 15px",backgroundImage:"linear-gradient(45deg, #aaa 25%, transparent 25%, transparent 75%, #aaa 75%), linear-gradient(45deg, #aaa 25%, transparent 25%, transparent 75%, #aaa 75%)",backgroundColor:"#ddd",".result":{position:"absolute",width:"auto",height:"auto",maxWidth:"95%",maxHeight:"95%"}}}),(0,a.jsx)(p.Z,{variant:"contained",onClick:()=>{let e=document.getElementsByClassName("result")[0];e&&e.toBlob(e=>{if(!e)return;let t=document.createElement("a");t.href=URL.createObjectURL(e),t.download="".concat(Math.random().toString(36).slice(2),".png"),t.click(),URL.revokeObjectURL(t.href)},"image/png")},children:"画像を保存"})]})]})})]})}(r=i||(i={}))[r.Menu=0]="Menu",r[r.Edit=1]="Edit"},61032:function(e,t,n){"use strict";n.d(t,{K1:function(){return r},ld:function(){return i},rS:function(){return s},rU:function(){return a}});let r="#a1736b",i="#3e343f",a="#979f9b",s="#c9bfb6"}},function(e){e.O(0,[52,638,971,23,744],function(){return e(e.s=77306)}),_N_E=e.O()}]);