"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{4414:function(t,s,e){function i(t,s){return s||(s=t.slice(0)),t.raw=s,t}e.r(s),e.d(s,{default:function(){return L}});var n,a,o=e(7294),r=e(5698),h=function(){function t(t,s){this.splite=t,this.prop=s}var s=t.prototype;return s.draw=function(t,s,e,i,n){t.drawImage(this.splite,this.prop.topLeft[0]+i*this.prop.sz[0],this.prop.topLeft[1]+n*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],s[0]*e,s[1]*e,this.prop.sz[0]*e,this.prop.sz[1]*e)},s.sz=function(){return this.prop.sz},t}(),p=e(1721),c=function(t){function s(s,e){var i;return(i=t.call(this,s,e)||this).cnt=0,i.prop=e,e.patterns?i.patterns=e.patterns:i.patterns=e.frames.reduce((function(t,s){return t>s?t:s}),0),i}(0,p.Z)(s,t);var e=s.prototype;return e.draw=function(s,e,i,n,a){t.prototype.draw.call(this,s,e,i,this.prop.frames[this.cnt]+this.patterns*a,n)},e.tick=function(){return this.cnt=(this.cnt+1)%this.prop.frames.length,this.prop.frames[this.cnt]},s}(h),u=function(){function t(t,s,e,i,n){this.sz=t,this.s=e,this.e=i,this.screenSize=n,this.data=new Array(t[0]*t[1]);for(var a=0;a<t[1];a++)for(var o=0;o<t[0];o++)this.data[a*t[0]+o]=s(o,a)}var s=t.prototype;return s.at=function(t){var s=l([Math.floor(t[0]),Math.floor(t[1])],this.sz);return this.data[s[1]*this.sz[0]+s[0]]},s.draw=function(t,s,e,i){for(var n=s.sz(),a=n[0],o=n[1],r=e[0]-this.s[0]*a,h=r>=0?this.s[0]:this.s[0]-Math.floor(r)/a,p=r>=0?e[0]:e[0]-Math.floor(r),c=e[0]+this.e[0]*a,u=c<this.screenSize[0]?this.e[0]:this.e[0]-Math.floor(c-this.screenSize[0])/a,l=e[1]-this.s[1]*o,d=l>=0?this.s[1]:this.s[1]-Math.floor(l)/o,f=l>=0?e[1]:e[1]-Math.floor(l),m=e[1]+this.e[1]*o,v=m<this.screenSize[1]?this.e[1]:this.e[1]-Math.floor(m-this.screenSize[1])/o,w=d;w<v;w++)for(var g=h;g<u;g++){var y=this.at([g,w]).appearance();s.draw(t,[p+g*a,f+w*o],i,y.mode1,y.mode2)}},t}(),l=function(t,s){var e=[t[0]%s[0],t[1]%s[1]];return[e[0]<0?e[0]+s[0]:e[0],e[1]<0?e[1]+s[1]:e[1]]},d=function(){function t(t){this.pos=t.pos||[0,0],this.vel=t.vel||[0,0],this.jumpPow=t.jumpPow||[0,0],this.onGround=t.onGround||!0,this.orientation=t.orientation||0}return t.prototype.clone=function(){return Object.assign({},this,{pos:[this.pos[0],this.pos[1]],vel:[this.vel[0],this.vel[1]],jumpPow:[this.jumpPow[0],this.jumpPow[1]]})},t}(),f=function(){function t(t,s){this.ellasticCoeff=.5,this.anime={idle:new c(t,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0]}),squat:new c(t,{topLeft:[0,0],sz:[12,12],frames:[3]}),jump:new c(t,{topLeft:[0,0],sz:[12,12],frames:[2,2,0,2,2,2,0]})},this.currentAnime=this.anime.idle,this.shadow=new h(t,{topLeft:[0,24],sz:[12,12]}),this.state0=new d(s),this.state=this.state0.clone()}var s=t.prototype;return s.reset=function(){this.state=this.state0.clone()},s.tick=function(t,s){t.left&&this.state.onGround&&(this.state.jumpPow[0]--,this.state.jumpPow[0]<-4&&(this.state.jumpPow[0]=-4),this.state.orientation=0),t.right&&this.state.onGround&&(this.state.jumpPow[0]++,this.state.jumpPow[0]>4&&(this.state.jumpPow[0]=4),this.state.orientation=1),t.left||t.right||t.space||!this.state.onGround||0===this.state.jumpPow[0]||0!==this.state.jumpPow[1]||(this.state.onGround=!1,this.state.vel=[this.state.jumpPow[0],-2],this.state.jumpPow=[0,0]),this.state.pos[0]+=this.state.vel[0],this.state.pos[1]+=this.state.vel[1];var e=this.state.vel[1]>0?this.state.vel[1]:0,i=[Math.round((this.state.pos[0]-2)/16),Math.floor((this.state.pos[1]+e+1)/16)],n=this.state.vel[1]<0?this.state.vel[1]:0,a=[Math.round((this.state.pos[0]+this.state.vel[0]-2)/16),Math.floor((this.state.pos[1]+n-4)/16)],o=[Math.round((this.state.pos[0]+this.state.vel[0]-2)/16),Math.floor((this.state.pos[1]-1)/16)];this.currentAnime=this.anime.idle,t.space&&this.state.onGround?(this.currentAnime=this.anime.squat,this.state.jumpPow[1]-=2,this.state.jumpPow[1]<-13&&(this.state.jumpPow[1]=-13)):(!t.space&&this.state.jumpPow[1]<0&&(this.state.onGround=!1,this.state.vel=this.state.jumpPow,this.state.jumpPow=[0,0]),this.state.onGround||(this.state.vel[1]+=2,this.state.vel[1]>14&&(this.state.vel[1]=14),s.at(a).occupied()&&this.state.vel[1]<0?(this.state.vel[1]*=-this.ellasticCoeff,this.state.vel[0]*=this.ellasticCoeff,this.state.pos[1]=16*a[1]+16+4):s.at(o).occupied()&&(this.state.vel[0]*=-this.ellasticCoeff),s.at(i).step()&&this.state.vel[1]>=0&&(this.state.pos[1]=16*i[1],this.state.vel=[0,0],this.state.onGround=!0,this.currentAnime=this.anime.squat),this.state.vel[1]<0?this.currentAnime=this.anime.jump:this.state.vel[1]>0&&(this.currentAnime=this.anime.squat))),this.state.pos[1]>160&&this.reset()},s.draw=function(t,s){var e=this.currentAnime.tick();this.state.onGround&&this.shadow.draw(t,[this.state.pos[0],this.state.pos[1]-5],s,e,0),this.currentAnime.draw(t,[this.state.pos[0],this.state.pos[1]-6],s,this.state.orientation,0)},t}(),m=function(){function t(t,s,e){this.v={mode1:t,mode2:s},this.typ=e}var s=t.prototype;return s.appearance=function(){return this.v},s.occupied=function(){return 1==this.typ},s.step=function(){return this.typ>0},t}(),v=function(){function t(t,s){this.v={mode1:t,mode2:s}}return t.prototype.appearance=function(){return this.v},t}(),w=JSON.parse('{"DH":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[5,0],[5,1],[5,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[1,7],[1,1],[1,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[4,7],[4,2],[4,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[1,0],[1,1],[1,2],[1,3],[1,2],[1,1],[1,3],[1,2],[1,0],[1,4],[0,0],[1,5],[1,3],[1,2]],[[2,0],[2,1],[2,2],[2,3],[2,1],[2,1],[2,3],[2,2],[2,0],[2,6],[0,0],[2,5],[2,3],[2,2]],[[4,1],[4,0],[4,2],[4,3],[4,2],[3,9],[3,1],[3,2],[3,6],[0,0],[0,0],[4,5],[4,1],[4,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[4,7],[4,1],[4,2],[4,6],[0,0],[0,0],[0,0],[0,0],[0,0]]],"dt":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0]],"IJ":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]],"d4":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]]}'),g=function(){function t(t,s,e){var i=t.getContext("2d");if(!i)throw"failed to get canvas context";this.ctx=i,this.canvas=t,this.ctx.imageSmoothingEnabled=!1,this.splite=s,this.messageBox=e,this.scale=3,this.kernel=new f(this.splite,{pos:[100,96]}),this.bg=new h(this.splite,{topLeft:[0,512],sz:[16,16]}),this.bgOverlay=new h(this.splite,{topLeft:[0,896],sz:[16,16]}),this.bgOverlayAnime=new c(this.splite,{topLeft:[0,768],sz:[16,16],frames:[0,0,1,1,2,2,1,1]}),this.gameMap=new u([14,10],(function(t,s){return new m(w.DH[s][t][1],w.DH[s][t][0],w.dt[s][t])}),[-100,0],[100,10],[640,480]),this.overlayMap=new u([14,10],(function(t,s){return new v(w.IJ[s][t][1],w.IJ[s][t][0])}),[-100,0],[100,10],[640,480]),this.overlayAnimeMap=new u([14,10],(function(t,s){return new v(w.d4[s][t][1],w.d4[s][t][0])}),[-100,0],[100,10],[640,480]),this.command=new Map}var s=t.prototype;return s.start=function(){var t=this,s=this.keydown.bind(this),e=this.keyup.bind(this);this.canvas.addEventListener("keydown",s),this.canvas.addEventListener("keyup",e),this.canvas.focus();var i=setInterval(this.tick.bind(this),100),n=!1,a=setInterval((function(){n?t.showMessage("What's poppin?"):t.hideMessage(),n=!n}),5e3);this.cleanup=function(){clearInterval(i),clearInterval(a),t.canvas.removeEventListener("keydown",t.keydown.bind(t)),t.canvas.removeEventListener("keyup",t.keyup.bind(t))}},s.stop=function(){this.cleanup&&this.cleanup()},s.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480);try{var t={left:this.command.has("ArrowLeft"),right:this.command.has("ArrowRight"),space:this.command.has("Space")};this.kernel.tick(t,this.gameMap),this.bgOverlayAnime.tick(),this.gameMap.draw(this.ctx,this.bg,[0,0],this.scale),this.kernel.draw(this.ctx,this.scale),this.overlayMap.draw(this.ctx,this.bgOverlay,[0,0],this.scale),this.overlayAnimeMap.draw(this.ctx,this.bgOverlayAnime,[0,0],this.scale)}catch(s){console.error(s),this.stop()}},s.keydown=function(t){this.command.set(t.code,!0)},s.keyup=function(t){this.command.delete(t.code)},s.showMessage=function(t){this.messageBox.innerText=t,this.messageBox.style.display="block",this.messageBox.classList.remove("hide")},s.hideMessage=function(){this.messageBox.classList.add("hide")},t}(),y=g,x=e.p+"static/frame-837fb4fd69fb62d88c255448223b7810.svg",b=e.p+"static/frame_inner-60f1e379dcb3ddb7d26173360cdc65ba.svg",k=e.p+"static/splite-487a8a012e05b28c6174bc4a9dc98367.png";var z={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},M={name:"1i4j1ux",styles:"&:focus-visible{outline-style:none!important;}"},j=(0,r.F4)(n||(n=i(["\n  from, 20%, 46%, 80%, to {\n    transform: translate3d(0,0,0);\n    visibility: visible;\n  }\n  40%, 42% {\n    transform: translate3d(0, -20px, 0);\n  }\n  70% {\n    transform: translate3d(0, -8px, 0);\n  }\n  90% {\n    transform: translate3d(0,-2px,0);\n  }\n"]))),P=(0,r.F4)(a||(a=i(["\n  from, 50% {\n    transform: translate3d(0,0,0);\n  }\n  20% {\n    transform: translate3d(0,-2px,0);\n  }\n  70% {\n    transform: translate3d(0,-5px,0);\n  }\n  to {\n    visibility: hidden;\n  }\n"]))),L=function(){var t=(0,o.useRef)(null),s=(0,o.useRef)(null),e=(0,o.useRef)(null);return(0,o.useEffect)((function(){if(t.current&&s.current&&e.current){var i=new y(t.current,s.current,e.current);i.start();var n=function(){t.current&&t.current.focus()};return document.addEventListener("click",n),function(){document.removeEventListener("click",n),i.stop()}}}),[t,s,e]),(0,r.tZ)("main",null,(0,r.tZ)("title",null,"What's poppin?"),(0,r.tZ)("div",{style:{width:"808px",height:"689px",backgroundImage:"url("+x+")",position:"relative"}},(0,r.tZ)("canvas",{ref:t,tabIndex:1,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"30px",position:"absolute",left:"84px",top:"188px"},css:M,width:"640",height:"480"}),(0,r.tZ)("div",{style:{width:"640px",height:"480px",backgroundImage:"url("+b+")",position:"absolute",left:"84px",top:"188px"}}),(0,r.tZ)("div",{ref:e,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"134px",bottom:"34px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:(0,r.iv)("animation:",j," 0.8s ease;&.hide{animation:",P," 0.5s ease;}","")})),(0,r.tZ)("img",{ref:s,src:k,style:{display:"none"}}),(0,r.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:z},(0,r.tZ)("a",{href:"https://github.com/Doramanjyu/z-game"},"Source repository")))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-6f92f095079483757415.js.map