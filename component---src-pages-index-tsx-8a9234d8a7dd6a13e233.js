"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{4042:function(A,t,e){function s(A,t){return t||(t=A.slice(0)),A.raw=t,A}e.r(t),e.d(t,{default:function(){return P}});var i,n,r=e(7294),a=e(5698),o=function(){function A(A,t){this.splite=A,this.prop=t}var t=A.prototype;return t.draw=function(A,t,e,s,i){A.drawImage(this.splite,this.prop.topLeft[0]+s*this.prop.sz[0],this.prop.topLeft[1]+i*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],t[0]*e,t[1]*e,this.prop.sz[0]*e,this.prop.sz[1]*e)},t.sz=function(){return this.prop.sz},A}(),h=e(1721),B=function(A){function t(t,e){var s;return(s=A.call(this,t,e)||this).cnt=0,s.prop=e,e.patterns?s.patterns=e.patterns:s.patterns=e.frames.reduce((function(A,t){return A>t?A:t}),0),s}(0,h.Z)(t,A);var e=t.prototype;return e.draw=function(t,e,s,i,n){A.prototype.draw.call(this,t,e,s,this.prop.frames[this.cnt]+this.patterns*n,i)},e.tick=function(){return this.cnt=(this.cnt+1)%this.prop.frames.length,this.prop.frames[this.cnt]},t}(o),Q=function(){function A(A,t,e,s,i){this.sz=A,this.s=e,this.e=s,this.screenSize=i,this.data=new Array(A[0]*A[1]);for(var n=0;n<A[1];n++)for(var r=0;r<A[0];r++)this.data[n*A[0]+r]=t(r,n)}var t=A.prototype;return t.at=function(A){var t=f([Math.floor(A[0]),Math.floor(A[1])],this.sz);return this.data[t[1]*this.sz[0]+t[0]]},t.draw=function(A,t,e,s){for(var i=t.sz(),n=i[0],r=i[1],a=e[0]-this.s[0]*n,o=a>=0?this.s[0]:this.s[0]-Math.floor(a)/n,h=a>=0?e[0]:e[0]-Math.floor(a),B=e[0]+this.e[0]*n,Q=B<this.screenSize[0]?this.e[0]:this.e[0]-Math.floor(B-this.screenSize[0])/n,f=e[1]-this.s[1]*r,c=f>=0?this.s[1]:this.s[1]-Math.floor(f)/r,g=f>=0?e[1]:e[1]-Math.floor(f),E=e[1]+this.e[1]*r,u=E<this.screenSize[1]?this.e[1]:this.e[1]-Math.floor(E-this.screenSize[1])/r,v=c;v<u;v++)for(var p=o;p<Q;p++){var d=this.at([p,v]).appearance();t.draw(A,[h+p*n,g+v*r],s,d.mode1,d.mode2)}},A}(),f=function(A,t){var e=[A[0]%t[0],A[1]%t[1]];return[e[0]<0?e[0]+t[0]:e[0],e[1]<0?e[1]+t[1]:e[1]]},c=function(){function A(A){this.pos=A.pos||[0,0],this.vel=A.vel||[0,0],this.jumpPow=A.jumpPow||[0,0],this.onGround=A.onGround||!0,this.orientation=A.orientation||0}return A.prototype.clone=function(){return Object.assign({},this,{pos:[this.pos[0],this.pos[1]],vel:[this.vel[0],this.vel[1]],jumpPow:[this.jumpPow[0],this.jumpPow[1]]})},A}(),g=function(){function A(A,t){this.ellasticCoeff=.5,this.anime={idle:new B(A,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0]}),squat:new B(A,{topLeft:[0,0],sz:[12,12],frames:[3]}),jump:new B(A,{topLeft:[0,0],sz:[12,12],frames:[2,2,0,2,2,2,0]})},this.currentAnime=this.anime.idle,this.shadow=new o(A,{topLeft:[0,24],sz:[12,12]}),this.state0=new c(t),this.state=this.state0.clone()}var t=A.prototype;return t.reset=function(){this.state=this.state0.clone()},t.tick=function(A,t){A.left&&this.state.onGround&&(this.state.jumpPow[0]--,this.state.jumpPow[0]<-4&&(this.state.jumpPow[0]=-4),this.state.orientation=0),A.right&&this.state.onGround&&(this.state.jumpPow[0]++,this.state.jumpPow[0]>4&&(this.state.jumpPow[0]=4),this.state.orientation=1),A.left||A.right||A.space||!this.state.onGround||0===this.state.jumpPow[0]||0!==this.state.jumpPow[1]||(this.state.onGround=!1,this.state.vel=[this.state.jumpPow[0],-2],this.state.jumpPow=[0,0]),this.state.pos[0]+=this.state.vel[0],this.state.pos[1]+=this.state.vel[1];var e=this.state.vel[1]>0?this.state.vel[1]:0,s=[Math.round((this.state.pos[0]-2)/16),Math.floor((this.state.pos[1]+e+1)/16)],i=this.state.vel[1]<0?this.state.vel[1]:0,n=[Math.round((this.state.pos[0]+this.state.vel[0]-2)/16),Math.floor((this.state.pos[1]+i-4)/16)],r=[Math.round((this.state.pos[0]+this.state.vel[0]-2)/16),Math.floor((this.state.pos[1]-1)/16)];this.currentAnime=this.anime.idle,A.space&&this.state.onGround?(this.currentAnime=this.anime.squat,this.state.jumpPow[1]-=2,this.state.jumpPow[1]<-13&&(this.state.jumpPow[1]=-13)):(!A.space&&this.state.jumpPow[1]<0&&(this.state.onGround=!1,this.state.vel=this.state.jumpPow,this.state.jumpPow=[0,0]),this.state.onGround||(this.state.vel[1]+=2,this.state.vel[1]>14&&(this.state.vel[1]=14),t.at(n).solid&&this.state.vel[1]<0?(this.state.vel[1]*=-this.ellasticCoeff,this.state.vel[0]*=this.ellasticCoeff,this.state.pos[1]=16*n[1]+16+4):t.at(r).solid&&(this.state.vel[0]*=-this.ellasticCoeff),t.at(s).solid&&this.state.vel[1]>=0&&(this.state.pos[1]=16*s[1],this.state.vel=[0,0],this.state.onGround=!0,this.currentAnime=this.anime.squat),this.state.vel[1]<0?this.currentAnime=this.anime.jump:this.state.vel[1]>0&&(this.currentAnime=this.anime.squat))),this.state.pos[1]>160&&this.reset()},t.draw=function(A,t){var e=this.currentAnime.tick();this.state.onGround&&this.shadow.draw(A,[this.state.pos[0],this.state.pos[1]-5],t,e,0),this.currentAnime.draw(A,[this.state.pos[0],this.state.pos[1]-6],t,this.state.orientation,0)},A}(),E=function(){function A(A,t,e){this.v={mode1:A,mode2:t},this.solid=e}return A.prototype.appearance=function(){return this.v},A}(),u=function(){function A(A,t){this.v={mode1:A,mode2:t}}return A.prototype.appearance=function(){return this.v},A}(),v=function(){function A(A,t,e){var s=A.getContext("2d");if(!s)throw"failed to get canvas context";this.ctx=s,this.canvas=A,this.ctx.imageSmoothingEnabled=!1,this.splite=t,this.messageBox=e,this.scale=3,this.kernel=new g(this.splite,{pos:[100,96]}),this.bg=new o(this.splite,{topLeft:[0,512],sz:[16,16]}),this.bgOverlay=new B(this.splite,{topLeft:[0,768],sz:[16,16],frames:[0,0,1,1,2,2,1,1]});var i=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,7,1,6,0,0,0,0,0,0,0,0,0],[0,0,7,2,6,0,0,0,0,0,0,0,0,0],[0,1,2,3,2,1,3,2,0,4,0,5,3,2],[0,1,2,3,1,1,3,2,0,6,0,5,3,2],[1,0,2,3,2,9,1,2,6,0,0,5,1,0],[0,0,0,0,0,7,1,2,6,0,0,0,0,0]],n=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,4,4,4,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[2,2,2,2,2,2,2,2,2,2,0,2,2,2],[4,4,4,4,4,3,3,3,3,0,0,4,4,4],[0,0,0,0,0,4,4,4,4,0,0,0,0,0]],r=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0]],a=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,2,4,0,0,0,0,0,0,0,0,0,0],[0,0,3,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0]];this.gameMap=new Q([14,10],(function(A,t){return new E(i[t][A],n[t][A],1===r[t][A])}),[-100,0],[100,10],[640,480]),this.overlayMap=new Q([14,10],(function(A,t){return new u(a[t][A],0)}),[-100,0],[100,10],[640,480]),this.command=new Map}var t=A.prototype;return t.start=function(){var A=this,t=this.keydown.bind(this),e=this.keyup.bind(this);this.canvas.addEventListener("keydown",t),this.canvas.addEventListener("keyup",e),this.canvas.focus();var s=setInterval(this.tick.bind(this),100),i=!1,n=setInterval((function(){i?A.showMessage("What's poppin?"):A.hideMessage(),i=!i}),5e3);this.cleanup=function(){clearInterval(s),clearInterval(n),A.canvas.removeEventListener("keydown",A.keydown.bind(A)),A.canvas.removeEventListener("keyup",A.keyup.bind(A))}},t.stop=function(){this.cleanup&&this.cleanup()},t.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480);try{var A={left:this.command.has("ArrowLeft"),right:this.command.has("ArrowRight"),space:this.command.has("Space")};this.kernel.tick(A,this.gameMap),this.bgOverlay.tick(),this.gameMap.draw(this.ctx,this.bg,[0,0],this.scale),this.kernel.draw(this.ctx,this.scale),this.overlayMap.draw(this.ctx,this.bgOverlay,[0,0],this.scale)}catch(t){console.error(t),this.stop()}},t.keydown=function(A){this.command.set(A.code,!0)},t.keyup=function(A){this.command.delete(A.code)},t.showMessage=function(A){this.messageBox.innerText=A,this.messageBox.style.display="block",this.messageBox.classList.remove("hide")},t.hideMessage=function(){this.messageBox.classList.add("hide")},A}(),p=v,d=e.p+"static/frame-837fb4fd69fb62d88c255448223b7810.svg",I=e.p+"static/frame_inner-60f1e379dcb3ddb7d26173360cdc65ba.svg";var l={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},C={name:"1i4j1ux",styles:"&:focus-visible{outline-style:none!important;}"},w=(0,a.F4)(i||(i=s(["\n  from, 20%, 46%, 80%, to {\n    transform: translate3d(0,0,0);\n    visibility: visible;\n  }\n  40%, 42% {\n    transform: translate3d(0, -20px, 0);\n  }\n  70% {\n    transform: translate3d(0, -8px, 0);\n  }\n  90% {\n    transform: translate3d(0,-2px,0);\n  }\n"]))),m=(0,a.F4)(n||(n=s(["\n  from, 50% {\n    transform: translate3d(0,0,0);\n  }\n  20% {\n    transform: translate3d(0,-2px,0);\n  }\n  70% {\n    transform: translate3d(0,-5px,0);\n  }\n  to {\n    visibility: hidden;\n  }\n"]))),P=function(){var A=(0,r.useRef)(null),t=(0,r.useRef)(null),e=(0,r.useRef)(null);return(0,r.useEffect)((function(){if(A.current&&t.current&&e.current){var s=new p(A.current,t.current,e.current);s.start();var i=function(){A.current&&A.current.focus()};return document.addEventListener("click",i),function(){document.removeEventListener("click",i),s.stop()}}}),[A,t,e]),(0,a.tZ)("main",null,(0,a.tZ)("title",null,"What's poppin?"),(0,a.tZ)("div",{style:{width:"808px",height:"689px",backgroundImage:"url("+d+")",position:"relative"}},(0,a.tZ)("canvas",{ref:A,tabIndex:1,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"30px",position:"absolute",left:"84px",top:"188px"},css:C,width:"640",height:"480"}),(0,a.tZ)("div",{style:{width:"640px",height:"480px",backgroundImage:"url("+I+")",position:"absolute",left:"84px",top:"188px"}}),(0,a.tZ)("div",{ref:e,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"134px",bottom:"34px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:(0,a.iv)("animation:",w," 0.8s ease;&.hide{animation:",m," 0.5s ease;}","")})),(0,a.tZ)("img",{ref:t,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAYAAAB/HSuDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAJl1JREFUeNrs3W+IbOV9wPFztpdg5CZQ8FVJmpuWiBCUoFJJe8G8alBsUQumhrwweWPAvrho0FCqXiOUGBp6XzQQ39hQLrVeqJZGBN9ZKi0X/BMMQrGNVQzpiwiF5GIlBE7nmZ1n7rNnn/N/Zmd35/OBzc7OzjnP7Nz44vc9Z86UVVUV61aWZRHXOXtduVzw7BtVOfs5fC8AAACANc7mYTBvGtDjY6YO6HH/Yd9n//0ry/vPfv78/NeLGOBfAwAAANYVAOKN3ICeDunpgD40GITHP3ptsW/fTfsHAAAAVuvEchDPDP/ZYlCWRds2s4G+mt2/Z6BfxIWiPHm++OX3d+/72NeL5e3cGk1vTfCWAQAAABhuJwza8eh8GNAvnd/9ircXA34Y6uuDeK9gEB/7jfvyv1vcX+UCw3Kd9OuN3ZgAAAAA9Lc8AyAM+zn1+9O3CuSO6If7c2cBjJE9w2D3LQcKAAAAAAyw03Z0vk1bMIhH9etH6tNT/ptO/w+BIUaGx35c9D4jAQAAAGgJAH0G9PQ0/bHB4MOLu19NP6fa1mgLDAAAAEBHABgyoMff//yrl38Ot9PH19/bf8VNu19NP/cZ/gEAAICJAaDvgD728cHJe3cjQfgevtoMDQwAAABAewAo/+p77QN6+P1s4C4nDPTzNc5etxsJLj25ezvct1i7zAWGq566vP9wuyswAAAAAA2D+aPX7h5Nnw3ijUfT4/B/8t7lR/D1OvIetgvbBJeeLOeD/Gzwr+LvFmGhiPsOxu4fAAAAaAkA4Yr7a1+kLIu4zuJj/HZvv1GVYeCf+nGBAAAAQI8A0DSgxyF96vAfxI/2W3yM3+6+Pz//KMFysY5/DQAAAFhXAIg3cgN6HNLbIkBXMIgB4NFri337TiOAAAAAAADrcyId5HMDeptsMAj3JREgObOguHT+fPGxrxfFL7+/+7twO1yDAAAAAFhzAEiP/OcG9OrSV/YN9enwX548P39MEG7nBvrw2Hixv7rkAoTz/dffMrBvX64bAAAAAMMDQLwRhv+c3P1pMKg/JtyfCwZDNZ2RsIgCpX86AAAA6G+n7eh8m7ZgEPaXO3ofxLML6rejcOQ/vm0g7CucVRC+x9uL51otPi4QAAAA6BMA+gzo6UBfDwZdA33qw4u7X00/R11RQgQAAACACQGg74De5/G5swCuuGn3q+nnPsM/AAAAMDEA9BnQRwz0e34+ee/uVwgF4Xub8Jiff/Xyz+F2GhhmXAkQAAAAeggXASzDVfjjUfc4lL//taK46qmiuPTk/Cr9RdNF/XKPzygXV/ovvrG4429emf3PdZd/3xQYeu4fAAAAaFGGj+1LPoovK/cRgH12nm536cndm3GdP7txd+iPZwycvLeK+w7feu1/9rzLuB0AAADQEgDiFfcBAACA42vHSwAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAALB0Iv2hLMsvZB7zUlVV++5seGzrNpntGh839PkAAAAAzcowTHcM83sG756P3Tes9w0GA/dfzLZ7yT8jAAAAtPMWAAAAANgCpdPpAQAA4PhzBgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAeAkAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAvAQAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAA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AAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQADwEgAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAADw/+zYAQkAAACAoP+v2xHoDAEBAAAAAAgAAAAAQAAAAAAAAgAAAAAEAAAAACAAAAAAAAEAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAABAAAAAAIAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAAAEAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAgAAAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAQAAAAAIAAAAAAAAEAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAAAIAAAAAEAAAAAAgAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAAABAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAAAEAAAAACAAAAABAAAAAAAACAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAABAAAAAAAACAAAAAHhLAAEGAKUzvd38wwWLAAAAAElFTkSuQmCC",style:{display:"none"}}),(0,a.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:l},(0,a.tZ)("a",{href:"https://github.com/Doramanjyu/z-game"},"Source repository")))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-8a9234d8a7dd6a13e233.js.map