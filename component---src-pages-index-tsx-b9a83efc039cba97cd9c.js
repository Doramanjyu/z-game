"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{4519:function(A,t,e){function n(A,t){return t||(t=A.slice(0)),A.raw=t,A}e.r(t),e.d(t,{default:function(){return u}});var s,r,i=e(7294),g=e(9021),a=e(1721),C=function(){function A(A,t,e){this.ctx=A,this.splite=t,this.prop=e}var t=A.prototype;return t.draw=function(A,t,e,n){this.ctx.drawImage(this.splite,this.prop.topLeft[0]+e*this.prop.sz[0],this.prop.topLeft[1]+n*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],A[0]*t,A[1]*t,this.prop.sz[0]*t,this.prop.sz[1]*t)},t.sz=function(){return this.prop.sz},A}(),B=function(A){function t(t,e,n){var s;return(s=A.call(this,t,e,n)||this).cnt=0,s.prop=n,n.patterns?s.patterns=n.patterns:s.patterns=n.frames.reduce((function(A,t){return A>t?A:t}),0),s}(0,a.Z)(t,A);var e=t.prototype;return e.draw=function(t,e,n,s){A.prototype.draw.call(this,t,e,this.prop.frames[this.cnt]+this.patterns*s,n)},e.tick=function(){this.cnt=(this.cnt+1)%this.prop.frames.length},t}(C),Q=function(){function A(A,t,e,n,s){this.sz=A,this.s=e,this.e=n,this.screenSize=s,this.data=new Array(A[0]*A[1]);for(var r=0;r<A[1];r++)for(var i=0;i<A[0];i++)this.data[r*A[0]+i]=t(i,r)}var t=A.prototype;return t.at=function(A){return this.data[A[1]*this.sz[0]+A[0]]},t.draw=function(A,t,e){for(var n=A.sz(),s=n[0],r=n[1],i=t[0]-this.s[0]*s,g=i>=0?this.s[0]:this.s[0]-Math.floor(i)/s,a=i>=0?t[0]:t[0]-Math.floor(i),C=t[0]+this.e[0]*s,B=C<this.screenSize[0]?this.e[0]:this.e[0]-Math.floor(C-this.screenSize[0])/s,Q=t[1]-this.s[1]*r,I=Q>=0?this.s[1]:this.s[1]-Math.floor(Q)/r,f=Q>=0?t[1]:t[1]-Math.floor(Q),E=t[1]+this.e[1]*r,h=E<this.screenSize[1]?this.e[1]:this.e[1]-Math.floor(E-this.screenSize[1])/r,c=I;c<h;c++)for(var d=g;d<B;d++){var p=this.at(o([d,c],this.sz)).appearance();A.draw([a+d*s,f+c*r],e,p.mode1,p.mode2)}},A}(),o=function(A,t){var e=[A[0]%t[0],A[1]%t[1]];return[e[0]<0?e[0]+t[0]:e[0],e[1]<0?e[1]+t[1]:e[1]]},I=function(){function A(A,t){this.v={mode1:A,mode2:t}}return A.prototype.appearance=function(){return this.v},A}(),f=function(){function A(A,t,e){var n=A.getContext("2d");if(!n)throw"failed to get canvas context";this.ctx=n,this.canvas=A,this.ctx.imageSmoothingEnabled=!1,this.splite=t,this.messageBox=e,this.kernelAnime=new B(this.ctx,this.splite,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0]}),this.bg=new C(this.ctx,this.splite,{topLeft:[0,962],sz:[16,16]});var s=[[0,1,2,3,2,1,3,2,0,4,8,5,3,2],[0,1,2,3,0,1,3,2,0,6,8,5,3,2],[1,0,2,0,6,7,1,2,6,8,8,5,1,0],[8,8,8,8,8,8,7,2,6,8,8,8,8,8]],r=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,1,1,1,1],[3,3,3,3,3,2,2,2,2,2,2,3,3,3],[3,3,3,3,3,3,3,3,3,3,3,3,3,3]];this.gameMap=new Q([14,4],(function(A,t){return new I(s[t][A],r[t][A])}),[-100,0],[100,4],[640,480]),this.kernelX=0,this.kernelY=9,this.kernelDir=0,this.command=new Map}var t=A.prototype;return t.start=function(){var A=this,t=this.keydown.bind(this),e=this.keyup.bind(this);this.canvas.addEventListener("keydown",t),this.canvas.addEventListener("keyup",e),this.canvas.focus();var n=setInterval(this.tick.bind(this),100),s=!1,r=setInterval((function(){s?A.showMessage("What's poppin?"):A.hideMessage(),s=!s}),5e3);this.cleanup=function(){clearInterval(n),clearInterval(r),A.canvas.removeEventListener("keydown",A.keydown.bind(A)),A.canvas.removeEventListener("keyup",A.keyup.bind(A))}},t.stop=function(){this.cleanup&&this.cleanup()},t.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480),this.command.has("ArrowLeft")&&(this.kernelX-=3,this.kernelDir=0),this.command.has("ArrowRight")&&(this.kernelX+=3,this.kernelDir=1);try{this.gameMap.draw(this.bg,[-this.kernelX/3,97],3),this.kernelAnime.tick(),this.kernelAnime.draw([this.kernelX+100,this.kernelY+84],3,this.kernelDir,0)}catch(A){console.error(A),this.stop()}},t.keydown=function(A){this.command.set(A.code,!0)},t.keyup=function(A){this.command.delete(A.code)},t.showMessage=function(A){this.messageBox.innerText=A,this.messageBox.style.display="block",this.messageBox.classList.remove("hide")},t.hideMessage=function(){this.messageBox.classList.add("hide")},A}(),E=f,h=e.p+"static/frame-bdb4c4dd207ef86a361181fed43e6535.svg";var c={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},d=(0,g.F4)(s||(s=n(["\n  from, 20%, 46%, 80%, to {\n    transform: translate3d(0,0,0);\n    visibility: visible;\n  }\n  40%, 42% {\n    transform: translate3d(0, -20px, 0);\n  }\n  70% {\n    transform: translate3d(0, -8px, 0);\n  }\n  90% {\n    transform: translate3d(0,-2px,0);\n  }\n"]))),p=(0,g.F4)(r||(r=n(["\n  from, 50% {\n    transform: translate3d(0,0,0);\n  }\n  20% {\n    transform: translate3d(0,-2px,0);\n  }\n  70% {\n    transform: translate3d(0,-5px,0);\n  }\n  to {\n    visibility: hidden;\n  }\n"]))),u=function(){var A=(0,i.useRef)(null),t=(0,i.useRef)(null),e=(0,i.useRef)(null);return(0,i.useEffect)((function(){if(A.current&&t.current&&e.current){var n=new E(A.current,t.current,e.current);n.start();var s=function(){A.current&&A.current.focus()};return document.addEventListener("click",s),function(){document.removeEventListener("click",s),n.stop()}}}),[A,t,e]),(0,g.tZ)("main",null,(0,g.tZ)("title",null,"What's poppin?"),(0,g.tZ)("div",{style:{width:"808px",height:"689px",backgroundImage:"url("+h+")",position:"relative"}},(0,g.tZ)("canvas",{ref:A,tabIndex:1,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"60px",position:"absolute",left:"84px",top:"188px"},width:"640",height:"480"}),(0,g.tZ)("div",{ref:e,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"134px",bottom:"34px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:(0,g.iv)("animation:",d," 0.8s ease;&.hide{animation:",p," 0.5s ease;}","")})),(0,g.tZ)("img",{ref:t,src:"data:image/png;base64,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AAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAA+AgAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAfAQAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAPgIAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAA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",style:{display:"none"}}),(0,g.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:c},(0,g.tZ)("a",{href:"https://github.com/Doramanjyu/z-game"},"Source repository")))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-b9a83efc039cba97cd9c.js.map