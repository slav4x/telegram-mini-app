import{r as u,j as o}from"./index-B4tkBQHj.js";const M="_background_1vkyt_1",W={background:M};function b(){var l,p;const c=u.useRef(null);return u.useEffect(()=>{const h=()=>{var f,y;const t=c.current;if(!t)return;const i=t.getContext("2d");if(!i)return;const d=window.devicePixelRatio||1,s=(f=window.Telegram)==null?void 0:f.WebApp,n=((y=window.visualViewport)==null?void 0:y.height)||(s==null?void 0:s.viewportStableHeight)||window.innerHeight;console.log("Viewport height:",n),t.width=window.innerWidth*d,t.height=n*d,t.style.width=`${window.innerWidth}px`,t.style.height=`${n}px`,i.scale(d,d);const{width:v}=t,E=Array.from({length:100}).map(()=>({x:Math.random()*window.innerWidth,y:Math.random()*n,size:2,opacity:Math.random(),fadeSpeed:.001})),a=v/7,g=Array.from({length:7}).map((e,w)=>({x:a*w+a/2+Math.random()*50-25,y:Math.random()*n,width:4,height:40,speed:Math.random()*1+.1,segments:Array.from({length:10}).map((x,r)=>({opacity:1-r*.1}))}));function m(){i.clearRect(0,0,window.innerWidth,n),E.forEach(e=>{e.opacity-=e.fadeSpeed,e.opacity<=0&&(e.x=Math.random()*window.innerWidth,e.y=Math.random()*n,e.opacity=1),i.beginPath(),i.rect(e.x,e.y,e.size,e.size),i.fillStyle=`rgba(0, 0, 0, ${e.opacity})`,i.fill()}),g.forEach(e=>{e.y-=e.speed,e.y+e.height<=0&&(e.y=n+Math.random()*200,e.x=a*g.indexOf(e)+a/2+Math.random()*50-25),e.segments.forEach((w,x)=>{const r=e.y+x*4;r+4>=0&&r<=n&&(i.beginPath(),i.rect(e.x,r,e.width,4),i.fillStyle=`rgba(0, 0, 0, ${w.opacity})`,i.fill())})}),requestAnimationFrame(m)}m()};return h(),window.addEventListener("resize",h),()=>{window.removeEventListener("resize",h)}},[]),o.jsxs(o.Fragment,{children:[o.jsx("div",{className:W.background,children:o.jsx("canvas",{ref:c,width:window.innerWidth,height:window.innerHeight,style:{position:"absolute",top:0,left:0}})}),"X: ",window.innerWidth," (",window.innerWidth*window.devicePixelRatio,")",o.jsx("br",{}),"Y: ",((l=window.visualViewport)==null?void 0:l.height)||((p=window.Telegram)==null?void 0:p.WebApp.viewportStableHeight)||window.innerHeight,o.jsx("br",{}),"Earn"]})}export{b as default};
