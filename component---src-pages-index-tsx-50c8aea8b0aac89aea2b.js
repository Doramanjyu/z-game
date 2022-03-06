"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{1589:function(t,e,s){s.r(e),s.d(e,{default:function(){return N}});var i=s(7294),n=function(){function t(t,e){this.sprite=t,this.prop=Object.assign({baseScale:1},e)}var e=t.prototype;return e.draw=function(t,e,s,i,n,o){void 0!==(null==o?void 0:o.opacity)&&(t.globalAlpha=o.opacity),t.drawImage(this.sprite,this.prop.topLeft[0]+i*this.prop.sz[0],this.prop.topLeft[1]+n*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],Math.floor(e[0]*s),Math.floor(e[1]*s),this.prop.sz[0]*s*this.prop.baseScale,this.prop.sz[1]*s*this.prop.baseScale),void 0!==(null==o?void 0:o.opacity)&&(t.globalAlpha=1)},e.sz=function(){return this.prop.sz},t}(),o=n,a=s(1721),r=function(t){function e(e,s){var i;return(i=t.call(this,e,s)||this).cnt=0,i.frame=0,i.propAnime=s,s.patterns?i.patterns=s.patterns:i.patterns=s.frames.reduce((function(t,e){return t>e?t:e}),0)+1,s.countDiv?i.countDiv=s.countDiv:i.countDiv=1,i}(0,a.Z)(e,t);var s=e.prototype;return s.draw=function(e,s,i,n,o,a){t.prototype.draw.call(this,e,s,i,this.propAnime.frames[this.frame]+this.patterns*n,o,a)},s.tick=function(t){return void 0!==t&&(this.cnt=t),this.frame=Math.floor(this.cnt/this.countDiv%this.propAnime.frames.length),this.cnt++,this.propAnime.frames[this.frame]},e}(o),h=r,c=s(5785),p=s(1225),u=function(t,e){return[t[0]-e[0],t[1]-e[1]]},l=function(t,e){return t[0]*e[1]-t[1]*e[0]},d=function(t,e,s,i,n){var o=u(e,t),a=u(i,s),r=l(o,u(s,t)),h=l(o,u(i,t)),c=l(a,u(t,s)),p=l(a,u(e,s));return r<n&&h>-n&&c>-n&&p<n},m=function(){function t(t,e){this.map=t,this.cellSz=e,this.scanned=[],this.intersection=[]}var e=t.prototype;return e.check=function(t,e){var s=this,i={right:!1,left:!1},n=[Math.floor(Math.min(t[0],e[0])/this.cellSz[0]-.5),Math.floor(Math.min(t[1],e[1])/this.cellSz[1]-.5)],o=[Math.floor(Math.max(t[0],e[0])/this.cellSz[0]+.5),Math.floor(Math.max(t[1],e[1])/this.cellSz[1]+.5)],a=[[t[0]/this.cellSz[0],t[1]/this.cellSz[1]],[e[0]/this.cellSz[0],e[1]/this.cellSz[1]]];this.motion=a;for(var r=function(t){for(var e=function(e){s.map.at([e,t]).collision().forEach((function(n){var o=n.reduce((function(s,i){return s.push([e+i[0],t+i[1]]),s}),[]);o.length>0&&s.scanned.push(o);for(var r=0;r<o.length-1;r++)d(o[r],o[r+1],a[0],a[1],.005)&&(o[r][0]>o[r+1][0]?i.top=o[r][1]+.01:o[r][0]<o[r+1][0]&&(i.bottom=o[r][1]-.01),o[r][1]>o[r+1][1]?i.right=!0:o[r][1]<o[r+1][1]&&(i.left=!0),s.intersection.push([o[r],o[r+1]]))}))},r=n[0];r<o[0]+1;r++)e(r)},h=n[1];h<o[1]+1;h++)r(h);return i},e.draw=function(t,e,s){var i=this;t.strokeStyle="white",t.lineWidth=1;var n=(0,p.B)(this.cellSz,this.map.s,this.map.e,e,this.map.screenSize,s,1),o=this.cellSz,a=o[0],r=o[1];t.beginPath();for(var h=function(e){for(var o=function(o){i.map.at([o,e]).collision().forEach((function(i){i.forEach((function(i,h){var c=(n.o[0]+a*(o+i[0]))*s,p=(n.o[1]+r*(e+i[1]))*s;0==h?t.moveTo(c,p):t.lineTo(c,p)})),t.stroke()}))},h=n.s[0];h<n.e[0];h++)o(h)},u=n.s[1];u<n.e[1];u++)h(u);t.closePath();var l=function(t){return[(n.o[0]+a*t[0])*s,(n.o[1]+r*t[1])*s]},d=function(e){t.beginPath(),e.forEach((function(e){e.forEach((function(e,s){return 0==s?t.moveTo.apply(t,(0,c.Z)(l(e))):t.lineTo.apply(t,(0,c.Z)(l(e)))})),t.stroke()})),t.closePath()};t.strokeStyle="yellow",t.lineWidth=1,d(this.scanned),this.scanned=[],t.strokeStyle="orange",t.lineWidth=5,d(this.intersection),this.intersection=[],this.motion&&(t.strokeStyle="red",t.lineWidth=4,t.beginPath(),this.motion.forEach((function(e,s){return 0==s?t.moveTo.apply(t,(0,c.Z)(l(e))):t.lineTo.apply(t,(0,c.Z)(l(e)))})),t.stroke(),t.closePath())},t}(),f=function(){function t(t){var e=this;this.current=v,this.initial=t,this.states=new Map,this.set(t);for(var s=[t];s.length>0;){var i=s.pop();i&&(this.states.set(i,null),Object.values(i.nextStates).forEach((function(t){return e.states.has(t)||s.push(t)})))}}var e=t.prototype;return e.set=function(t){this.current.leave&&this.current.leave(),this.current=t,t.enter&&t.enter()},e.tick=function(){var t=this.current.tick();null!==t&&(console.log(t,this.current.nextStates),this.set(this.current.nextStates[t]))},e.reset=function(){this.current=v,this.states.forEach((function(t,e){return e.reset&&e.reset()})),this.set(this.initial)},t}(),v={nextStates:{},tick:function(){return null}},g=f,w=function(){function t(t){this.pos=t.pos||[0,0],this.vel=t.vel||[0,0],this.onGround=t.onGround||!0,this.orientation=t.orientation||0,this.jumpPow=[0,0],this.heat=0,this.popped=0,this.trans=0}return t.prototype.clone=function(){return Object.assign({},this,{pos:[this.pos[0],this.pos[1]],vel:[this.vel[0],this.vel[1]],jumpPow:[this.jumpPow[0],this.jumpPow[1]]})},t}(),x=function(){function t(t,e,s){this.eventCtx=t,this.ellasticCoeff=.5,this.anime={idle:new h(e,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0],patterns:4}),squat:new h(e,{topLeft:[0,0],sz:[12,12],frames:[3],patterns:4}),jump:new h(e,{topLeft:[0,0],sz:[12,12],frames:[2,2,0,2,2,2,0],patterns:4})},this.currentAnime=this.anime.idle,this.shadow=new o(e,{topLeft:[0,24],sz:[12,12]}),this.trans=new o(e,{topLeft:[0,36],sz:[12,12]}),this.explosion=new o(e,{topLeft:[0,48],sz:[36,12]}),this.headUpText=new h(e,{topLeft:[0,60],sz:[24,12],frames:[0,1],patterns:2,countDiv:8}),this.item=new o(e,{topLeft:[512,0],sz:[12,12]}),this.state0=new w(s),this.state=this.state0.clone(),this.explosionPos=this.state.pos,this.explosionNum=0,this.headUpTextMode=0,this.interacting=!1;var i=this;this.effectItem=function(t){i.earnedItem={id:t,effectCnt:0}}}var e=t.prototype;return e.reset=function(){this.state=this.state0.clone()},e.mapPos=function(){return[Math.round((this.state.pos[0]-2)/16),Math.floor(this.state.pos[1]/16)]},e.tick=function(t,e,s){var i=this;t.left&&this.state.onGround&&(this.state.jumpPow[0]--,this.state.jumpPow[0]<-4&&(this.state.jumpPow[0]=-4),this.state.orientation=0),t.right&&this.state.onGround&&(this.state.jumpPow[0]++,this.state.jumpPow[0]>4&&(this.state.jumpPow[0]=4),this.state.orientation=1),t.left||t.right||t.space||!this.state.onGround||0===this.state.jumpPow[0]||0!==this.state.jumpPow[1]||(this.state.onGround=!1,this.state.vel=[this.state.jumpPow[0],-4],this.state.jumpPow=[0,0]);var n=!1;t.space&&this.state.onGround||(0==this.state.jumpPow[0]&&this.state.jumpPow[1]<0&&this.state.jumpPow[1]>-4?n=!0:!t.space&&this.state.jumpPow[1]<0?(this.state.onGround=!1,0==this.state.popped?this.state.vel=this.state.jumpPow:this.state.vel=[this.state.jumpPow[0],.5*this.state.jumpPow[1]],this.state.jumpPow=[0,0]):this.state.onGround||(0==this.state.popped?this.state.vel[1]+=2:this.state.vel[1]+=1.5,this.state.vel[1]>14&&(this.state.vel[1]=14)));var o=this.mapPos(),a=s.check([this.state.pos[0]+6,this.state.pos[1]],[this.state.pos[0]+this.state.vel[0]+6,this.state.pos[1]+this.state.vel[1]]),r=this.headUpTextMode;this.headUpTextMode=e.at(o).headUpText(),this.headUpTextMode>0&&0==r&&this.headUpText.tick(0),this.currentAnime=this.anime.idle,t.space&&this.state.onGround?(this.currentAnime=this.anime.squat,this.state.jumpPow[1]-=2,this.state.jumpPow[1]<-11&&(this.state.jumpPow[1]=-11)):this.state.onGround||(a.top&&this.state.vel[1]<0&&(this.state.vel[1]*=-this.ellasticCoeff,this.state.vel[0]*=this.ellasticCoeff,this.state.pos[1]=16*a.top),(a.left&&this.state.vel[0]<0||a.right&&this.state.vel[0]>0)&&(this.state.vel[0]*=-this.ellasticCoeff,this.state.pos[0]+=this.state.vel[0]),a.bottom&&this.state.vel[1]>=0&&(this.state.pos[1]=16*a.bottom,this.state.vel=[0,0],this.state.onGround=!0,this.currentAnime=this.anime.squat),this.state.vel[1]<0?this.currentAnime=this.anime.jump:this.state.vel[1]>0&&(this.currentAnime=this.anime.squat)),this.state.pos[0]+=this.state.vel[0],this.state.pos[1]+=this.state.vel[1];var h=function(t){void 0===t&&(t=1),i.state.popped>0&&(i.state.popped-=t,i.state.heat=0,i.state.popped<0&&(i.state.popped=0))};if(this.explosionNum&&this.explosionNum>0?(this.explosionNum--,2==this.explosionNum&&(this.state.heat=40,this.state.popped=96,this.state.onGround=!1,this.state.vel=[0,-17],this.state.jumpPow=[0,0])):e.at(o).heat()?(this.state.heat++,this.state.heat>38&&0==this.state.popped&&(this.explosionPos=[this.state.pos[0],this.state.pos[1]],this.explosionNum=3)):(this.state.heat--,this.state.heat<0&&(this.state.heat=0),h()),this.state.trans<8&&this.state.trans++,n&&!this.interacting){this.state.jumpPow=[0,0],h(10);var c=[Math.round((this.state.pos[0]-2)/16),Math.floor(this.state.pos[1]/16)],p=e.at(c);p.onAction.forEach((function(t){return t(Object.assign({},i.eventCtx,{target:p}))})),this.onInteract&&this.onInteract()}this.interacting=n,this.earnedItem&&(this.earnedItem.effectCnt+=1,this.earnedItem.effectCnt>12&&(this.earnedItem=void 0))},e.draw=function(t,e,s){var i=this.currentAnime.tick();this.headUpTextMode>0&&this.headUpText.tick();var n=this.state.popped>0&&2!=this.state.popped||39==this.state.heat?5:Math.min(4,Math.floor(this.state.heat/8));if(this.state.onGround&&this.shadow.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-5],s,4*n+i,0),this.state.trans>2&&this.currentAnime.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-6],s,n,this.state.orientation),this.state.trans<8&&this.trans.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-5],s,this.state.trans-2,0),this.explosionNum>0&&this.explosion.draw(t,[e[0]+this.explosionPos[0]-12,e[1]+this.explosionPos[1]-8],s,3-this.explosionNum,0),this.headUpTextMode>0&&this.headUpText.draw(t,[e[0]+this.state.pos[0]-6,e[1]+this.state.pos[1]-15],s,this.headUpTextMode-1,0),this.earnedItem){var o=1-Math.ceil((this.earnedItem.effectCnt-1)/3)/4;this.item.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-12-this.earnedItem.effectCnt],s,this.earnedItem.id,0,{opacity:o})}},t}(),b=x,y=s(9640),k=function(t){this.pos=t.pos||[0,0],this.mode=t.mode||0},z=function(t){function e(e,s,i){return t.call(this,e,new h(s,{topLeft:[0,72],sz:[24,24],frames:[0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,3,1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2],patterns:5}),new h(s,{topLeft:[0,60],sz:[24,12],frames:[0,1],patterns:2,countDiv:8}),new k(i))||this}return(0,a.Z)(e,t),e}(function(t){function e(e,s,i,n){var o;return(o=t.call(this)||this).eventCtx=e,o.anime=s,o.headUpText=i,o.state=n,o.active=!1,o.hasDialog=!1,o}(0,a.Z)(e,t);var s=e.prototype;return s.tick=function(t){var e=this,s=this.anime.sz(),i=this.active;this.active=Math.abs(t[0]-this.state.pos[0])<s[0]/2&&Math.abs(t[1]-this.state.pos[1])<s[1]/2,!i&&this.active&&this.onArrive&&this.onArrive.forEach((function(t){return t(Object.assign({},e.eventCtx,{target:e}))})),this.anime.tick(),this.headUpText.tick()},s.interact=function(){var t=this;this.active&&this.onAction.length&&this.onAction.forEach((function(e){return e(Object.assign({},t.eventCtx,{target:t}))}))},s.draw=function(t,e,s){var i=this.anime.sz();this.anime.draw(t,[e[0]+this.state.pos[0]-i[0]/2,e[1]+this.state.pos[1]-i[1]+6],s,this.state.mode,0),this.hasDialog&&this.headUpText.draw(t,[e[0]+this.state.pos[0]-i[0]/2,e[1]+this.state.pos[1]-i[1]+4],s,2+(this.active?1:0),0)},e}(y.b)),P=z,M=function(){function t(t){this.messageBox=t}var e=t.prototype;return e.showMessage=function(t,e){this.timeoutTimer&&clearTimeout(this.timeoutTimer),this.messageBox.innerHTML=t,this.messageBox.style.display="block",this.messageBox.classList.remove("hide"),null!=e&&e.timeout&&(this.timeoutTimer=setTimeout(this.hideMessage.bind(this),e.timeout))},e.hideMessage=function(){this.messageBox.classList.add("hide")},t}(),j=s(6526),A=function(){function t(t,e,s,i){var n=this,a=this,r=t.getContext("2d");if(!r)throw"failed to get canvas context";this.ctx=r,this.canvas=t,this.ctx.imageSmoothingEnabled=!1,this.sprite=e,i((function(){return[]})),this.dm=new M(s);var c=function(){console.error("item effect not ready")},p={updateItems:i,dialogManager:this.dm,effectItem:function(t){c&&c(t)}};this.game=(0,j.D)(p),this.scale=3,this.origin=this.game.init.kernel,this.viewpoint=[0,0],this.debugView=!1,this.kernel=new b(p,this.sprite,{pos:this.origin}),c=this.kernel.effectItem,this.bgUnder=new o(this.sprite,{topLeft:[512,512],sz:[16,16],baseScale:2}),this.bg=new o(this.sprite,{topLeft:[0,512],sz:[16,16]}),this.bgOverlay=new o(this.sprite,{topLeft:[0,896],sz:[16,16]}),this.bgOverlayAnime=new h(this.sprite,{topLeft:[0,768],sz:[16,16],frames:[0,0,1,1,2,2,1,1]}),this.bgGrad=new o(this.sprite,{topLeft:[1008,0],sz:[16,1024]}),this.zea=new P(p,this.sprite,{pos:this.game.spawn.ZEA,mode:1});var u=["Hemlo","..."],l=0,d=this.newEventState({nextStates:{next:v},tick:function(){return a.dm.showMessage(u[l],{timeout:2e3}),(l+=1)<u.length?null:"next"},enter:function(){n.zea.hasDialog=!0},leave:function(){n.zea.hasDialog=!1}}),f=d[0],w=d[1];this.zea.onAction.push(w),this.sm=new g(f),this.kernel.onInteract=function(){n.zea.interact()},this.collisionMap=new m(this.game.m,[16,16]),this.command=new Map}var e=t.prototype;return e.start=function(){var t=setInterval(this.tick.bind(this),80);this.dm.showMessage("What's poppin?",{timeout:5e3}),this.cleanup=function(){clearInterval(t)}},e.stop=function(){this.cleanup&&this.cleanup()},e.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480);try{var t={left:this.command.has("ArrowLeft"),right:this.command.has("ArrowRight"),space:this.command.has("Space")};this.kernel.tick(t,this.game.m,this.collisionMap),this.bgOverlayAnime.tick(),this.game.m.at(this.kernel.mapPos()).gameover&&this.kernel.reset();var e=this.kernel.state;this.zea.tick(e.pos);var s=function(t,e,s,i){return t<e-s&&(t+=(e-s-t)*i),t>e+s&&(t+=(e+s-t)*i),Math.floor(t)};this.viewpoint=[s(this.viewpoint[0],e.pos[0]-this.origin[0],24,.25),s(this.viewpoint[1],(e.pos[1]-this.origin[1])/1.25,16,.3)];for(var i=this.offset(),n=0;n<640/this.scale;n+=16)this.bgGrad.draw(this.ctx,[n,480/this.scale-1024-this.viewpoint[1]/3+12],this.scale,0,0);this.game.m.draw(this.ctx,this.bgUnder,i,this.scale,"under"),this.game.m.draw(this.ctx,this.bg,i,this.scale,"main"),this.zea.draw(this.ctx,i,this.scale),this.kernel.draw(this.ctx,i,this.scale),this.game.m.draw(this.ctx,this.bgOverlay,i,this.scale,"overlay"),this.game.m.draw(this.ctx,this.bgOverlayAnime,i,this.scale,"overlayAnime"),this.game.m.draw(this.ctx,this.bgOverlayAnime,i,this.scale,"overlayAnime"),this.debugView&&this.collisionMap.draw(this.ctx,i,this.scale)}catch(o){console.error(o),this.stop()}},e.offset=function(){return[-this.viewpoint[0]-28,110-this.origin[1]-this.viewpoint[1]]},e.keydown=function(t){this.command.set(t.code,!0)},e.keyup=function(t){this.command.has("F2")&&(this.debugView=!this.debugView),this.command.delete(t.code)},e.newEventState=function(t){var e=this;return[t,function(){e.sm.current===t&&e.sm.tick()}]},t}(),L=A,S=s(7326),E=s(5698),I=function(t){function e(e){var s;(s=t.call(this,e)||this).items=[];var i=(0,S.Z)(s);return s.updateItems=function(t){i.items=t(i.items),i.forceUpdate()},s}return(0,a.Z)(e,t),e.prototype.render=function(){var t=this.props,e=t.sprite,s=t.scale,i=t.style;return(0,E.tZ)("div",{style:Object.assign({},i,{width:"100%",padding:"16px 64px",display:"flex"}),css:(0,E.iv)(">div{width:",12*s,"px;height:",12*s,"px;border:",s,"px solid #666;background-color:rgba(64, 64, 64, 0.5);background-image:url(",e,");background-size:",1024*s,"px ",1024*s,"px;image-rendering:pixelated;margin:",s/2,"px;opacity:0.5;position:relative;}>div.usableItem{opacity:1;}>div.usableItem:hover{border:",s,"px solid #ccc;cursor:pointer;}>div>span{visibility:hidden;background-color:rgba(0, 0, 0, 0.5);border-radius:4px;text-align:center;padding:4px;color:white;position:absolute;width:100px;top:120%;left:50%;margin-left:-50px;}>div:hover>span{visibility:visible;}","")},this.items.map((function(t){var e=[];return t.onUse&&e.push("usableItem"),(0,E.tZ)("div",{key:t.id,onClick:function(){return t.onUse&&t.onUse()},className:e.join(" "),style:{backgroundPosition:"-"+(512+12*t.id)*s+"px 0"}},(0,E.tZ)("span",null,t.label))})))},e}(i.Component),T=I,Z=L,C=s.p+"static/frame-ca82859c688250bcb14362e22a5d3408.svg",U=s.p+"static/frame_inner-60f1e379dcb3ddb7d26173360cdc65ba.svg",D=s(388);var G={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},O={name:"i6h8q9",styles:"animation:bounceIn 0.8s ease;&.hide{animation:bounceOut 0.5s ease;}"},R={name:"1i4j1ux",styles:"&:focus-visible{outline-style:none!important;}"},N=function(){var t=(0,i.useRef)(null),e=(0,i.useRef)(null),s=(0,i.useRef)(null),n=(0,i.useRef)(null);return(0,i.useEffect)((function(){if(t.current&&e.current&&s.current&&n.current){var i=new Z(t.current,e.current,s.current,n.current.updateItems);i.start();var o=i.keydown.bind(i),a=i.keyup.bind(i);document.addEventListener("keydown",o),document.addEventListener("keyup",a);var r=function(t){return!!(t.target&&t.target instanceof Element)&&null!==t.target.closest("a,.usableItem")},h=0,c=0,p=!1,u=function(t){r(t)||(t.preventDefault(),t.stopPropagation(),p||(h=t.touches[0].screenX,c=t.touches[0].screenY,p=!0))},l=function(t){r(t)||(t.preventDefault(),t.stopPropagation(),t.touches[0].screenY>c+32&&o({code:"Space"}),t.touches[0].screenX>h+32?(o({code:"ArrowLeft"}),a({code:"ArrowRight"})):t.touches[0].screenX<h-32?(o({code:"ArrowRight"}),a({code:"ArrowLeft"})):(a({code:"ArrowRight"}),a({code:"ArrowLeft"})))},d=function(t){r(t)||(t.preventDefault(),t.stopPropagation(),0===t.touches.length&&(a({code:"Space"}),a({code:"ArrowRight"}),a({code:"ArrowLeft"}),p=!1))};return document.addEventListener("touchstart",u),document.addEventListener("touchmove",l),document.addEventListener("touchend",d),document.addEventListener("touchcancel",d),function(){document.removeEventListener("touchstart",u),document.removeEventListener("touchmove",l),document.removeEventListener("touchend",d),document.removeEventListener("touchcancel",d),document.removeEventListener("keydown",o),document.removeEventListener("keyup",a),i.stop()}}}),[t,e,s]),(0,E.tZ)("main",{style:{width:"788px",margin:"0 auto"}},(0,E.tZ)("title",null,"What's poppin?"),(0,E.tZ)("h1",{style:{textAlign:"center",margin:"3px"}},"UNDER DEVELOPMENT"),(0,E.tZ)("div",{style:{width:"788px",height:"689px",backgroundImage:"url("+C+")",position:"relative"}},(0,E.tZ)("canvas",{ref:t,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"30px",position:"absolute",left:"74px",top:"188px"},css:R,width:"640",height:"480"}),(0,E.tZ)("div",{style:{width:"640px",height:"480px",backgroundImage:"url("+U+")",position:"absolute",left:"74px",top:"188px"}},(0,E.tZ)(T,{ref:n,sprite:D.Z,scale:3,style:{position:"absolute",top:"16px"}}),(0,E.tZ)("div",{ref:s,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"50px",bottom:"30px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:O}))),(0,E.tZ)("img",{ref:e,src:D.Z,style:{display:"none"}}),(0,E.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:G},(0,E.tZ)("a",{href:"https://github.com/Doramanjyu/z-game",target:"_blank",rel:"noreferrer"},"Source repository")))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-50c8aea8b0aac89aea2b.js.map