"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{4519:function(A,t,e){function n(A,t){return t||(t=A.slice(0)),A.raw=t,A}e.r(t),e.d(t,{default:function(){return l}});var s,g,i=e(7294),r=e(9021),C=e(1721),o=function(){function A(A,t,e){this.ctx=A,this.splite=t,this.prop=e}var t=A.prototype;return t.draw=function(A,t,e,n){this.ctx.drawImage(this.splite,this.prop.topLeft[0]+e*this.prop.sz[0],this.prop.topLeft[1]+n*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],A[0]*t,A[1]*t,this.prop.sz[0]*t,this.prop.sz[1]*t)},t.sz=function(){return this.prop.sz},A}(),a=function(A){function t(t,e,n){var s;return(s=A.call(this,t,e,n)||this).cnt=0,s.prop=n,n.patterns?s.patterns=n.patterns:s.patterns=n.frames.reduce((function(A,t){return A>t?A:t}),0),s}(0,C.Z)(t,A);var e=t.prototype;return e.draw=function(t,e,n,s){A.prototype.draw.call(this,t,e,this.prop.frames[this.cnt]+this.patterns*s,n)},e.tick=function(){this.cnt=(this.cnt+1)%this.prop.frames.length},t}(o),Q=function(){function A(A,t,e,n,s){this.sz=A,this.s=e,this.e=n,this.screenSize=s,this.data=new Array(A[0]*A[1]);for(var g=0;g<A[1];g++)for(var i=0;i<A[0];i++)this.data[g*A[0]+i]=t(i,g)}var t=A.prototype;return t.at=function(A){return this.data[A[1]*this.sz[0]+A[0]]},t.draw=function(A,t,e){for(var n=A.sz(),s=n[0],g=n[1],i=t[0]-this.s[0]*s,r=i>=0?this.s[0]:this.s[0]-Math.floor(i)/s,C=i>=0?t[0]:t[0]-Math.floor(i),o=t[0]+this.e[0]*s,a=o<this.screenSize[0]?this.e[0]:this.e[0]-Math.floor(o-this.screenSize[0])/s,Q=t[1]-this.s[1]*g,I=Q>=0?this.s[1]:this.s[1]-Math.floor(Q)/g,E=Q>=0?t[1]:t[1]-Math.floor(Q),c=t[1]+this.e[1]*g,h=c<this.screenSize[1]?this.e[1]:this.e[1]-Math.floor(c-this.screenSize[1])/g,f=I;f<h;f++)for(var u=r;u<a;u++){var d=this.at(B([u,f],this.sz)).appearance();A.draw([C+u*s,E+f*g],e,d.mode1,d.mode2)}},A}(),B=function(A,t){var e=[A[0]%t[0],A[1]%t[1]];return[e[0]<0?e[0]+t[0]:e[0],e[1]<0?e[1]+t[1]:e[1]]},I=function(){function A(A,t){this.v={mode1:A,mode2:t}}return A.prototype.appearance=function(){return this.v},A}(),E=function(){function A(A,t,e){var n=A.getContext("2d");if(!n)throw"failed to get canvas context";this.ctx=n,this.canvas=A,this.ctx.imageSmoothingEnabled=!1,this.splite=t,this.messageBox=e,this.kernelAnime=new a(this.ctx,this.splite,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0]}),this.bg=new o(this.ctx,this.splite,{topLeft:[0,977],sz:[16,16]});var s=[[0,1,2,3,2,1,3,2,0,4,6,5,3,2],[1,0,2,0,3,0,1,2,3,4,6,5,1,0],[2,0,1,0,1,0,2,2,3,4,6,5,0,1]];this.gameMap=new Q([14,3],(function(A,t){return new I(s[t][A],t)}),[-100,0],[100,3],[640,480]),this.kernelX=0,this.kernelY=9,this.kernelDir=0,this.command=new Map}var t=A.prototype;return t.start=function(){var A=this,t=this.keydown.bind(this),e=this.keyup.bind(this);this.canvas.addEventListener("keydown",t),this.canvas.addEventListener("keyup",e),this.canvas.focus();var n=setInterval(this.tick.bind(this),100),s=!1,g=setInterval((function(){s?A.showMessage("What's poppin?"):A.hideMessage(),s=!s}),5e3);this.cleanup=function(){clearInterval(n),clearInterval(g),A.canvas.removeEventListener("keydown",A.keydown.bind(A)),A.canvas.removeEventListener("keyup",A.keyup.bind(A))}},t.stop=function(){this.cleanup&&this.cleanup()},t.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480),this.command.has("ArrowLeft")&&(this.kernelX-=3,this.kernelDir=0),this.command.has("ArrowRight")&&(this.kernelX+=3,this.kernelDir=1);try{this.gameMap.draw(this.bg,[-this.kernelX/3,113],3),this.kernelAnime.tick(),this.kernelAnime.draw([this.kernelX+100,this.kernelY+100],3,this.kernelDir,0)}catch(A){console.error(A),this.stop()}},t.keydown=function(A){this.command.set(A.code,!0)},t.keyup=function(A){this.command.delete(A.code)},t.showMessage=function(A){this.messageBox.innerText=A,this.messageBox.style.display="block",this.messageBox.classList.remove("hide")},t.hideMessage=function(){this.messageBox.classList.add("hide")},A}(),c=E,h=e.p+"static/frame-bdb4c4dd207ef86a361181fed43e6535.svg";var f={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},u=(0,r.F4)(s||(s=n(["\n  from, 20%, 46%, 80%, to {\n    transform: translate3d(0,0,0);\n    visibility: visible;\n  }\n  40%, 42% {\n    transform: translate3d(0, -20px, 0);\n  }\n  70% {\n    transform: translate3d(0, -8px, 0);\n  }\n  90% {\n    transform: translate3d(0,-2px,0);\n  }\n"]))),d=(0,r.F4)(g||(g=n(["\n  from, 50% {\n    transform: translate3d(0,0,0);\n  }\n  20% {\n    transform: translate3d(0,-2px,0);\n  }\n  70% {\n    transform: translate3d(0,-5px,0);\n  }\n  to {\n    visibility: hidden;\n  }\n"]))),l=function(){var A=(0,i.useRef)(null),t=(0,i.useRef)(null),e=(0,i.useRef)(null);return(0,i.useEffect)((function(){if(A.current&&t.current&&e.current){var n=new c(A.current,t.current,e.current);n.start();var s=function(){A.current&&A.current.focus()};return document.addEventListener("click",s),function(){document.removeEventListener("click",s),n.stop()}}}),[A,t,e]),(0,r.tZ)("main",null,(0,r.tZ)("title",null,"What's poppin?"),(0,r.tZ)("div",{style:{width:"808px",height:"689px",backgroundImage:"url("+h+")",position:"relative"}},(0,r.tZ)("canvas",{ref:A,tabIndex:1,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"60px",position:"absolute",left:"84px",top:"188px"},width:"640",height:"480"}),(0,r.tZ)("div",{ref:e,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"134px",bottom:"34px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:(0,r.iv)("animation:",u," 0.8s ease;&.hide{animation:",d," 0.5s ease;}","")})),(0,r.tZ)("img",{ref:t,src:"data:image/png;base64,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CAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAD4CAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAB8BAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACgI8AAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAB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",style:{display:"none"}}),(0,r.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:f},(0,r.tZ)("a",{href:"https://github.com/Doramanjyu/z-game"},"Source repository")))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-f7757a12f26c8dda9e5c.js.map