"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{6702:function(t,e,s){s.d(e,{b:function(){return i}});var i=function(){this.onArrive=[],this.onAction=[]}},1225:function(t,e,s){s.d(e,{_:function(){return i},B:function(){return o}});var i=function(){function t(t,e,s,i,n,o){void 0===o&&(o=1),this.sz=t,this.s=s,this.e=i,this.screenSize=n,this.baseScale=o,this.data=new Array(t[0]*t[1]);for(var a=0;a<t[1];a++)for(var r=0;r<t[0];r++)this.data[a*t[0]+r]=e(r,a)}var e=t.prototype;return e.at=function(t){var e=n([Math.floor(t[0]),Math.floor(t[1])],this.sz);return this.data[e[1]*this.sz[0]+e[0]]},e.set=function(t,e){var s=n([Math.floor(t[0]),Math.floor(t[1])],this.sz);this.data[s[1]*this.sz[0]+s[0]]=e},e.draw=function(t,e,s,i,n){for(var a=o(e.sz(),this.s,this.e,s,this.screenSize,i,this.baseScale),r=e.sz(),h=r[0],c=r[1],p=a.s[1];p<a.e[1];p++)for(var u=a.s[0];u<a.e[0];u++){var l=this.at([u,p]).appearance(n);e.draw(t,[a.o[0]+u*h,a.o[1]+p*c],i,l[0],l[1])}},t}(),n=function(t,e){var s=[t[0]%e[0],t[1]%e[1]];return[s[0]<0?s[0]+e[0]:s[0],s[1]<0?s[1]+e[1]:s[1]]},o=function(t,e,s,i,n,o,a){i[0]=Math.floor(i[0]),i[1]=Math.floor(i[1]);var r=Math.round(n[0]/(t[0]*o))+2,h=Math.round(n[1]/(t[1]*o))+2,c=i[0]+e[0]*t[0]+t[0],p=i[1]+e[1]*t[1]+t[1],u=c>=0?e[0]:e[0]-Math.floor(c/t[0])-a+1,l=u+r+a-1,f=p>=0?e[1]:e[1]-Math.floor(p/t[1])-a+1;return{s:[u,f],e:[l,f+h+a-1],o:i}}},1091:function(t,e,s){s.d(e,{A:function(){return r}});var i=s(1225),n=s(1721),o=function(t){function e(e,s,i){var n;return(n=t.call(this)||this).v=e,n.typ=s,n.colDir=i,n}(0,n.Z)(e,t);var s=e.prototype;return s.appearance=function(t){return this.v[t]},s.heat=function(){return 2==this.typ},s.collision=function(){var t=.05,e=[];return this.colDir.top&&e.push([[0,t],[1,t]]),this.colDir.right&&this.colDir.bottom&&!this.colDir.left?(e.push([[1,t],[1,.9],[.3,1.4],[0,1.4]]),e):this.colDir.left&&this.colDir.bottom&&!this.colDir.right?(e.push([[1,1.4],[.7,1.4],[0,.9],[0,t]]),e):(this.colDir.right&&e.push([[1,.1],[1,1.4]]),this.colDir.bottom&&e.push([[1,1.4],[0,1.4]]),this.colDir.left&&e.push([[0,1.4],[0,.1]]),e)},s.headUpText=function(){return this.onAction.length>0?1:2==this.typ?2:0},e}(s(6702).b),a=s(9751),r=function(t){var e=t.getItem,s=a.main[0].length,n=a.main.length;return new i._([s,n],(function(t,i){var r=a.type[i][t],h=t+1>s-1?s-1:a.type[i][t+1],c=t-1<0?0:a.type[i][t-1],p=i-1<0?0:a.type[i-1][t],u=i+1>n-1?n-1:a.type[i+1][t],l={top:2==r||3==r||1==r&&1!=p,bottom:1==r&&1!=u,left:1==r&&1!=c,right:1==r&&1!=h},f=new o({main:[a.main[i][t][1],a.main[i][t][0]],under:[a.under[i][t][1],a.under[i][t][0]],overlay:[a.overlay[i][t][1],a.overlay[i][t][0]],overlayAnime:a.item[i][t]>0?[0,2]:[a.overlayAnime[i][t][1],a.overlayAnime[i][t][0]]},r,l);return a.item[i][t]>0&&f.onAction.push((function(t){f.onAction=[],t.target.v.overlayAnime=[0,0],e(t)})),f}),[-100,0],[100,n],[640,480])}},6984:function(t,e,s){function i(t,e){return e||(e=t.slice(0)),t.raw=e,t}s.r(e),s.d(e,{default:function(){return R}});var n,o,a=s(7294),r=s(5698),h=function(){function t(t,e){this.sprite=t,this.prop=Object.assign({baseScale:1},e)}var e=t.prototype;return e.draw=function(t,e,s,i,n){t.drawImage(this.sprite,this.prop.topLeft[0]+i*this.prop.sz[0],this.prop.topLeft[1]+n*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],Math.floor(e[0]*s),Math.floor(e[1]*s),this.prop.sz[0]*s*this.prop.baseScale,this.prop.sz[1]*s*this.prop.baseScale)},e.sz=function(){return this.prop.sz},t}(),c=s(1721),p=function(t){function e(e,s){var i;return(i=t.call(this,e,s)||this).cnt=0,i.frame=0,i.propAnime=s,s.patterns?i.patterns=s.patterns:i.patterns=s.frames.reduce((function(t,e){return t>e?t:e}),0),s.countDiv?i.countDiv=s.countDiv:i.countDiv=1,i}(0,c.Z)(e,t);var s=e.prototype;return s.draw=function(e,s,i,n,o){t.prototype.draw.call(this,e,s,i,this.propAnime.frames[this.frame]+this.patterns*n,o)},s.tick=function(t){return void 0!==t&&(this.cnt=t),this.frame=Math.floor(this.cnt/this.countDiv%this.propAnime.frames.length),this.cnt++,this.propAnime.frames[this.frame]},e}(h),u=s(5785),l=s(1225),f=function(t,e){return[t[0]-e[0],t[1]-e[1]]},d=function(t,e){return t[0]*e[1]-t[1]*e[0]},m=function(t,e,s,i,n){var o=f(e,t),a=f(i,s),r=d(o,f(s,t)),h=d(o,f(i,t)),c=d(a,f(t,s)),p=d(a,f(e,s));return r<n&&h>-n&&c>-n&&p<n},v=function(){function t(t,e){this.map=t,this.cellSz=e,this.scanned=[],this.intersection=[]}var e=t.prototype;return e.check=function(t,e){var s=this,i={right:!1,left:!1},n=[Math.floor(Math.min(t[0],e[0])/this.cellSz[0]-.5),Math.floor(Math.min(t[1],e[1])/this.cellSz[1]-.5)],o=[Math.floor(Math.max(t[0],e[0])/this.cellSz[0]+.5),Math.floor(Math.max(t[1],e[1])/this.cellSz[1]+.5)],a=[[t[0]/this.cellSz[0],t[1]/this.cellSz[1]],[e[0]/this.cellSz[0],e[1]/this.cellSz[1]]];this.motion=a;for(var r=function(t){for(var e=function(e){s.map.at([e,t]).collision().forEach((function(n){var o=n.reduce((function(s,i){return s.push([e+i[0],t+i[1]]),s}),[]);o.length>0&&s.scanned.push(o);for(var r=0;r<o.length-1;r++)m(o[r],o[r+1],a[0],a[1],.005)&&(o[r][0]>o[r+1][0]?i.top=o[r][1]+.01:o[r][0]<o[r+1][0]&&(i.bottom=o[r][1]-.01),o[r][1]>o[r+1][1]?i.right=!0:o[r][1]<o[r+1][1]&&(i.left=!0),s.intersection.push([o[r],o[r+1]]))}))},r=n[0];r<o[0]+1;r++)e(r)},h=n[1];h<o[1]+1;h++)r(h);return i},e.draw=function(t,e,s){var i=this;t.strokeStyle="white",t.lineWidth=1;var n=(0,l.B)(this.cellSz,this.map.s,this.map.e,e,this.map.screenSize,s,1),o=this.cellSz,a=o[0],r=o[1];t.beginPath();for(var h=function(e){for(var o=function(o){i.map.at([o,e]).collision().forEach((function(i){i.forEach((function(i,h){var c=(n.o[0]+a*(o+i[0]))*s,p=(n.o[1]+r*(e+i[1]))*s;0==h?t.moveTo(c,p):t.lineTo(c,p)})),t.stroke()}))},h=n.s[0];h<n.e[0];h++)o(h)},c=n.s[1];c<n.e[1];c++)h(c);t.closePath();var p=function(t){return[(n.o[0]+a*t[0])*s,(n.o[1]+r*t[1])*s]},f=function(e){t.beginPath(),e.forEach((function(e){e.forEach((function(e,s){return 0==s?t.moveTo.apply(t,(0,u.Z)(p(e))):t.lineTo.apply(t,(0,u.Z)(p(e)))})),t.stroke()})),t.closePath()};t.strokeStyle="yellow",t.lineWidth=1,f(this.scanned),this.scanned=[],t.strokeStyle="orange",t.lineWidth=5,f(this.intersection),this.intersection=[],this.motion&&(t.strokeStyle="red",t.lineWidth=4,t.beginPath(),this.motion.forEach((function(e,s){return 0==s?t.moveTo.apply(t,(0,u.Z)(p(e))):t.lineTo.apply(t,(0,u.Z)(p(e)))})),t.stroke(),t.closePath())},t}(),w=function(){function t(t){var e=this;this.current=g,this.initial=t,this.states=new Map,this.set(t);for(var s=[t];s.length>0;){var i=s.pop();i&&(this.states.set(i,null),Object.values(i.nextStates).forEach((function(t){return e.states.has(t)||s.push(t)})))}}var e=t.prototype;return e.set=function(t){this.current.leave&&this.current.leave(),this.current=t,t.enter&&t.enter()},e.tick=function(){var t=this.current.tick();null!==t&&(console.log(t,this.current.nextStates),this.set(this.current.nextStates[t]))},e.reset=function(){this.current=g,this.states.forEach((function(t,e){return e.reset&&e.reset()})),this.set(this.initial)},t}(),g={nextStates:{},tick:function(){return null}},x=function(){function t(t){this.pos=t.pos||[0,0],this.vel=t.vel||[0,0],this.onGround=t.onGround||!0,this.orientation=t.orientation||0,this.jumpPow=[0,0],this.heat=0,this.popped=0,this.trans=0}return t.prototype.clone=function(){return Object.assign({},this,{pos:[this.pos[0],this.pos[1]],vel:[this.vel[0],this.vel[1]],jumpPow:[this.jumpPow[0],this.jumpPow[1]]})},t}(),b=function(){function t(t,e){this.ellasticCoeff=.5,this.anime={idle:new p(t,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0],patterns:4}),squat:new p(t,{topLeft:[0,0],sz:[12,12],frames:[3],patterns:4}),jump:new p(t,{topLeft:[0,0],sz:[12,12],frames:[2,2,0,2,2,2,0],patterns:4})},this.currentAnime=this.anime.idle,this.shadow=new h(t,{topLeft:[0,24],sz:[12,12]}),this.trans=new h(t,{topLeft:[0,36],sz:[12,12]}),this.explosion=new h(t,{topLeft:[0,48],sz:[36,12]}),this.headUpText=new p(t,{topLeft:[0,60],sz:[24,12],frames:[0,1],patterns:2,countDiv:8}),this.state0=new x(e),this.state=this.state0.clone(),this.explosionPos=this.state.pos,this.explosionNum=0,this.headUpTextMode=0,this.interacting=!1}var e=t.prototype;return e.reset=function(){this.state=this.state0.clone()},e.tick=function(t,e,s){t.left&&this.state.onGround&&(this.state.jumpPow[0]--,this.state.jumpPow[0]<-4&&(this.state.jumpPow[0]=-4),this.state.orientation=0),t.right&&this.state.onGround&&(this.state.jumpPow[0]++,this.state.jumpPow[0]>4&&(this.state.jumpPow[0]=4),this.state.orientation=1),t.left||t.right||t.space||!this.state.onGround||0===this.state.jumpPow[0]||0!==this.state.jumpPow[1]||(this.state.onGround=!1,this.state.vel=[this.state.jumpPow[0],-4],this.state.jumpPow=[0,0]);var i=!1;t.space&&this.state.onGround||(0==this.state.jumpPow[0]&&this.state.jumpPow[1]<0&&this.state.jumpPow[1]>-6?i=!0:!t.space&&this.state.jumpPow[1]<0?(this.state.onGround=!1,0==this.state.popped?this.state.vel=this.state.jumpPow:this.state.vel=[this.state.jumpPow[0],.5*this.state.jumpPow[1]],this.state.jumpPow=[0,0]):this.state.onGround||(0==this.state.popped?this.state.vel[1]+=2:this.state.vel[1]+=1.5,this.state.vel[1]>14&&(this.state.vel[1]=14)));var n=[Math.round((this.state.pos[0]-2)/16),Math.floor(this.state.pos[1]/16)],o=s.check([this.state.pos[0]+6,this.state.pos[1]],[this.state.pos[0]+this.state.vel[0]+6,this.state.pos[1]+this.state.vel[1]]),a=this.headUpTextMode;if(this.headUpTextMode=e.at(n).headUpText(),this.headUpTextMode>0&&0==a&&this.headUpText.tick(0),this.currentAnime=this.anime.idle,t.space&&this.state.onGround?(this.currentAnime=this.anime.squat,this.state.jumpPow[1]-=2,this.state.jumpPow[1]<-11&&(this.state.jumpPow[1]=-11)):this.state.onGround||(o.top&&this.state.vel[1]<0&&(this.state.vel[1]*=-this.ellasticCoeff,this.state.vel[0]*=this.ellasticCoeff,this.state.pos[1]=16*o.top),(o.left&&this.state.vel[0]<0||o.right&&this.state.vel[0]>0)&&(this.state.vel[0]*=-this.ellasticCoeff,this.state.pos[0]+=this.state.vel[0]),o.bottom&&this.state.vel[1]>=0&&(this.state.pos[1]=16*o.bottom,this.state.vel=[0,0],this.state.onGround=!0,this.currentAnime=this.anime.squat),this.state.vel[1]<0?this.currentAnime=this.anime.jump:this.state.vel[1]>0&&(this.currentAnime=this.anime.squat)),this.state.pos[0]+=this.state.vel[0],this.state.pos[1]+=this.state.vel[1],this.explosionNum&&this.explosionNum>0?(this.explosionNum--,2==this.explosionNum&&(this.state.heat=40,this.state.popped=96,this.state.onGround=!1,this.state.vel=[0,-17],this.state.jumpPow=[0,0])):e.at(n).heat()?(this.state.heat++,this.state.heat>38&&0==this.state.popped&&(this.explosionPos=[this.state.pos[0],this.state.pos[1]],this.explosionNum=3)):(this.state.heat--,this.state.heat<0&&(this.state.heat=0),this.state.popped>0&&(this.state.popped--,this.state.heat=0,this.state.popped<0&&(this.state.popped=0))),this.state.trans<8&&this.state.trans++,i&&!this.interacting){var r=[Math.round((this.state.pos[0]-2)/16),Math.floor(this.state.pos[1]/16)],h=e.at(r);h.onAction.forEach((function(t){return t({target:h})})),this.onInteract&&this.onInteract()}this.interacting=i},e.draw=function(t,e,s){var i=this.currentAnime.tick();this.headUpTextMode>0&&this.headUpText.tick();var n=this.state.popped>0&&2!=this.state.popped||39==this.state.heat?5:Math.min(4,Math.floor(this.state.heat/8));this.state.onGround&&this.shadow.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-5],s,4*n+i,0),this.state.trans>2&&this.currentAnime.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-6],s,n,this.state.orientation),this.state.trans<8&&this.trans.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-5],s,this.state.trans-2,0),this.explosionNum>0&&this.explosion.draw(t,[e[0]+this.explosionPos[0]-12,e[1]+this.explosionPos[1]-8],s,3-this.explosionNum,0),this.headUpTextMode>0&&this.headUpText.draw(t,[e[0]+this.state.pos[0]-6,e[1]+this.state.pos[1]-15],s,this.headUpTextMode-1,0)},t}(),y=s(6702),M=function(t){this.pos=t.pos||[0,0],this.mode=t.mode||0},z=function(t){function e(e,s){return t.call(this,new p(e,{topLeft:[0,72],sz:[24,24],frames:[0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,3,1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2],patterns:5}),new p(e,{topLeft:[0,60],sz:[24,12],frames:[0,1],patterns:2,countDiv:8}),new M(s))||this}return(0,c.Z)(e,t),e}(function(t){function e(e,s,i){var n;return(n=t.call(this)||this).anime=e,n.headUpText=s,n.state=i,n.active=!1,n.hasDialog=!1,n}(0,c.Z)(e,t);var s=e.prototype;return s.tick=function(t){var e=this,s=this.anime.sz(),i=this.active;this.active=Math.abs(t[0]-this.state.pos[0])<s[0]/2&&Math.abs(t[1]-this.state.pos[1])<s[1]/2,!i&&this.active&&this.onArrive&&this.onArrive.forEach((function(t){return t({target:e})})),this.anime.tick(),this.headUpText.tick()},s.interact=function(){var t=this;this.active&&this.onAction.length&&this.onAction.forEach((function(e){return e({target:t})}))},s.draw=function(t,e,s){var i=this.anime.sz();this.anime.draw(t,[e[0]+this.state.pos[0]-i[0]/2,e[1]+this.state.pos[1]-i[1]+6],s,this.state.mode,0),this.hasDialog&&this.headUpText.draw(t,[e[0]+this.state.pos[0]-i[0]/2,e[1]+this.state.pos[1]-i[1]+4],s,2+(this.active?1:0),0)},e}(y.b)),k=function(){function t(t){this.messageBox=t}var e=t.prototype;return e.showMessage=function(t,e){this.timeoutTimer&&clearTimeout(this.timeoutTimer),this.messageBox.innerHTML=t,this.messageBox.style.display="block",this.messageBox.classList.remove("hide"),null!=e&&e.timeout&&(this.timeoutTimer=setTimeout(this.hideMessage.bind(this),e.timeout))},e.hideMessage=function(){this.messageBox.classList.add("hide")},t}(),A=s(1091),S=s(9751),P=function(){function t(t,e,s){var i=this,n=this,o=t.getContext("2d");if(!o)throw"failed to get canvas context";this.ctx=o,this.canvas=t,this.ctx.imageSmoothingEnabled=!1,this.sprite=e,this.dm=new k(s),this.scale=3,this.origin=[16*S.start.pos[0],16*S.start.pos[1]],this.viewpoint=[0,0],this.debugView=!1,this.kernel=new b(this.sprite,{pos:this.origin}),this.bgUnder=new h(this.sprite,{topLeft:[512,512],sz:[16,16],baseScale:2}),this.bg=new h(this.sprite,{topLeft:[0,512],sz:[16,16]}),this.bgOverlay=new h(this.sprite,{topLeft:[0,896],sz:[16,16]}),this.bgOverlayAnime=new p(this.sprite,{topLeft:[0,768],sz:[16,16],frames:[0,0,1,1,2,2,1,1]}),this.bgGrad=new h(this.sprite,{topLeft:[1008,0],sz:[16,1024]}),this.zea=new z(this.sprite,{pos:[70,48],mode:1});var a=["Hemlo","..."],r=0,c=this.newEventState({nextStates:{next:g},tick:function(){return n.dm.showMessage(a[r],{timeout:2e3}),(r+=1)<a.length?null:"next"},enter:function(){i.zea.hasDialog=!0},leave:function(){i.zea.hasDialog=!1}}),u=c[0],l=c[1];this.zea.onAction.push(l),this.sm=new w(u),this.kernel.onInteract=function(){i.zea.interact()},this.gameMap=(0,A.A)({getItem:function(){n.dm.showMessage("Yum Yum",{timeout:2e3})}}),this.collisionMap=new v(this.gameMap,[16,16]),this.command=new Map}var e=t.prototype;return e.start=function(){var t=setInterval(this.tick.bind(this),80);this.dm.showMessage("What's poppin?",{timeout:5e3}),this.cleanup=function(){clearInterval(t)}},e.stop=function(){this.cleanup&&this.cleanup()},e.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480);try{var t={left:this.command.has("ArrowLeft"),right:this.command.has("ArrowRight"),space:this.command.has("Space")};this.kernel.tick(t,this.gameMap,this.collisionMap),this.bgOverlayAnime.tick();var e=this.kernel.state;e.pos[1]>288&&this.kernel.reset(),this.zea.tick(e.pos);var s=(e.pos[1]-this.origin[1])/1.25;this.viewpoint[1]<s-16&&(this.viewpoint[1]+=(s-16-this.viewpoint[1])/4),this.viewpoint[1]>s+16&&(this.viewpoint[1]+=(s+16-this.viewpoint[1])/4);var i=640*Math.round(3*(e.pos[0]-this.origin[0]-6)/640)/3;this.viewpoint[0]+=Math.max(-50,Math.min(50,(i-this.viewpoint[0])/2));for(var n=this.offset(),o=0;o<640/this.scale;o+=16)this.bgGrad.draw(this.ctx,[o,480/this.scale-1024-this.viewpoint[1]/3+12],this.scale,0,0);this.gameMap.draw(this.ctx,this.bgUnder,n,this.scale,"under"),this.gameMap.draw(this.ctx,this.bg,n,this.scale,"main"),this.zea.draw(this.ctx,n,this.scale),this.kernel.draw(this.ctx,n,this.scale),this.gameMap.draw(this.ctx,this.bgOverlay,n,this.scale,"overlay"),this.gameMap.draw(this.ctx,this.bgOverlayAnime,n,this.scale,"overlayAnime"),this.gameMap.draw(this.ctx,this.bgOverlayAnime,n,this.scale,"overlayAnime"),this.debugView&&this.collisionMap.draw(this.ctx,n,this.scale)}catch(a){console.error(a),this.stop()}},e.offset=function(){return[-this.viewpoint[0],110-this.origin[1]-this.viewpoint[1]]},e.keydown=function(t){this.command.set(t.code,!0)},e.keyup=function(t){this.command.has("F2")&&(this.debugView=!this.debugView),this.command.delete(t.code)},e.newEventState=function(t){var e=this;return[t,function(){e.sm.current===t&&e.sm.tick()}]},t}(),L=P,j=s.p+"static/frame-ca82859c688250bcb14362e22a5d3408.svg",E=s.p+"static/frame_inner-60f1e379dcb3ddb7d26173360cdc65ba.svg",T=s(388);var D={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},Z={name:"1i4j1ux",styles:"&:focus-visible{outline-style:none!important;}"},U=(0,r.F4)(n||(n=i(["\n  from, 20%, 46%, 80%, to {\n    transform: translate3d(0,0,0);\n    visibility: visible;\n  }\n  40%, 42% {\n    transform: translate3d(0, -20px, 0);\n  }\n  70% {\n    transform: translate3d(0, -8px, 0);\n  }\n  90% {\n    transform: translate3d(0,-2px,0);\n  }\n"]))),G=(0,r.F4)(o||(o=i(["\n  from, 50% {\n    transform: translate3d(0,0,0);\n  }\n  20% {\n    transform: translate3d(0,-2px,0);\n  }\n  70% {\n    transform: translate3d(0,-5px,0);\n  }\n  to {\n    visibility: hidden;\n  }\n"]))),R=function(){var t=(0,a.useRef)(null),e=(0,a.useRef)(null),s=(0,a.useRef)(null);return(0,a.useEffect)((function(){if(t.current&&e.current&&s.current){var i=new L(t.current,e.current,s.current);i.start();var n=i.keydown.bind(i),o=i.keyup.bind(i);document.addEventListener("keydown",n),document.addEventListener("keyup",o);var a=function(t){return!!(t.target&&t.target instanceof Element)&&null!==t.target.closest("a")},r=0,h=0,c=!1,p=function(t){a(t)||(t.preventDefault(),t.stopPropagation(),c||(r=t.touches[0].screenX,h=t.touches[0].screenY,c=!0))},u=function(t){a(t)||(t.preventDefault(),t.stopPropagation(),t.touches[0].screenY>h+32&&n({code:"Space"}),t.touches[0].screenX>r+32?(n({code:"ArrowLeft"}),o({code:"ArrowRight"})):t.touches[0].screenX<r-32?(n({code:"ArrowRight"}),o({code:"ArrowLeft"})):(o({code:"ArrowRight"}),o({code:"ArrowLeft"})))},l=function(t){a(t)||(t.preventDefault(),t.stopPropagation(),0===t.touches.length&&(o({code:"Space"}),o({code:"ArrowRight"}),o({code:"ArrowLeft"}),c=!1))};return document.addEventListener("touchstart",p),document.addEventListener("touchmove",u),document.addEventListener("touchend",l),document.addEventListener("touchcancel",l),function(){document.removeEventListener("touchstart",p),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",l),document.removeEventListener("touchcancel",l),document.removeEventListener("keydown",n),document.removeEventListener("keyup",o),i.stop()}}}),[t,e,s]),(0,r.tZ)("main",{style:{width:"788px",margin:"0 auto"}},(0,r.tZ)("title",null,"What's poppin?"),(0,r.tZ)("h1",{style:{textAlign:"center",margin:"3px"}},"UNDER DEVELOPMENT"),(0,r.tZ)("div",{style:{width:"788px",height:"689px",backgroundImage:"url("+j+")",position:"relative"}},(0,r.tZ)("canvas",{ref:t,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"30px",position:"absolute",left:"74px",top:"188px"},css:Z,width:"640",height:"480"}),(0,r.tZ)("div",{style:{width:"640px",height:"480px",backgroundImage:"url("+E+")",position:"absolute",left:"74px",top:"188px"}}),(0,r.tZ)("div",{ref:s,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"124px",bottom:"34px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:(0,r.iv)("animation:",U," 0.8s ease;&.hide{animation:",G," 0.5s ease;}","")})),(0,r.tZ)("img",{ref:e,src:T.Z,style:{display:"none"}}),(0,r.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:D},(0,r.tZ)("a",{href:"https://github.com/Doramanjyu/z-game",target:"_blank",rel:"noreferrer"},"Source repository")))}},388:function(t,e,s){e.Z=s.p+"static/sprite-cd853a3e08192952875ad489b5b32e2b.png"},9751:function(t){t.exports=JSON.parse('{"start":{"pos":[6,12]},"main":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,7],[1,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[1,7],[1,1],[1,3],[1,2],[1,8],[2,11],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[4,7],[4,2],[4,3],[4,0],[4,1],[4,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[5,0],[5,1],[5,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[1,7],[1,1],[1,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[4,7],[4,2],[4,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[1,0],[1,1],[1,2],[1,3],[1,2],[1,1],[1,3],[1,2],[1,0],[1,4],[0,0],[1,5],[1,3],[1,2],[1,0],[1,1],[6,0],[6,1],[6,2],[1,3],[1,1],[6,0],[6,1],[6,2],[6,3],[1,2],[6,4],[1,5]],[[2,0],[2,1],[2,2],[2,3],[2,1],[2,1],[2,3],[2,2],[2,0],[2,6],[0,0],[2,5],[2,3],[2,2],[2,0],[2,1],[2,2],[2,2],[2,3],[2,0],[2,1],[2,2],[2,3],[2,0],[2,1],[2,2],[2,4],[2,5]],[[3,9],[3,1],[3,2],[3,8],[4,1],[4,0],[4,2],[4,3],[2,9],[0,0],[0,0],[4,5],[4,1],[4,0],[4,1],[4,2],[4,3],[4,2],[4,3],[4,2],[4,1],[4,0],[4,3],[4,2],[4,1],[4,0],[4,4],[4,5]],[[4,7],[4,1],[4,2],[4,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]],"type":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,3,3,3,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"item":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"under":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,2],[0,0],[1,3],[0,0],[1,4],[0,0],[1,5],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0],[0,0],[1,1],[0,0],[0,0],[2,0],[2,0],[0,0],[0,0],[0,0],[1,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,1],[0,0],[1,2],[2,2],[0,0],[2,3],[0,0],[2,4],[0,0],[2,5],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2,0],[0,0],[2,1],[0,0],[0,0],[3,0],[2,0],[0,0],[0,0],[0,0],[2,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[2,1],[0,0],[2,2],[3,2],[0,0],[3,3],[0,0],[3,4],[0,0],[3,5],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[3,0],[0,0],[3,1],[0,0],[0,0],[4,0],[3,0],[0,0],[0,0],[0,0],[3,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[3,1],[0,0],[3,2],[4,2],[0,0],[4,3],[0,0],[4,4],[0,0],[4,5],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[4,0],[0,0],[4,1],[0,0],[0,0],[5,0],[4,0],[0,0],[0,0],[0,0],[4,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[4,1],[0,0],[4,2],[5,2],[0,0],[5,3],[0,0],[5,4],[0,0],[5,5],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[5,0],[0,0],[5,1],[0,0],[0,0],[6,0],[5,0],[0,0],[0,0],[0,0],[5,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[5,1],[0,0],[5,2],[6,2],[0,0],[6,3],[0,0],[6,4],[0,0],[6,5],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]],"overlay":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[3,6],[3,2],[3,0],[0,0],[3,9],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[3,7],[3,8],[0,0],[0,0],[3,7],[3,5],[3,3],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[3,1],[0,0],[3,4],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]],"overlayAnime":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]]}')}}]);
//# sourceMappingURL=component---src-pages-index-tsx-71c612b240577179efb2.js.map