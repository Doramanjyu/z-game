"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{620:function(A,e,t){function n(A,e){return e||(e=A.slice(0)),A.raw=e,A}t.r(e),t.d(e,{default:function(){return I}});var s,i,r=t(7294),h=t(9021),o=t(1721),B=function(){function A(A,e,t){this.ctx=A,this.splite=e,this.prop=t}var e=A.prototype;return e.draw=function(A,e,t,n){this.ctx.drawImage(this.splite,this.prop.topLeft[0]+t*this.prop.sz[0],this.prop.topLeft[1]+n*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],A[0]*e,A[1]*e,this.prop.sz[0]*e,this.prop.sz[1]*e)},e.sz=function(){return this.prop.sz},A}(),a=function(A){function e(e,t,n){var s;return(s=A.call(this,e,t,n)||this).cnt=0,s.prop=n,n.patterns?s.patterns=n.patterns:s.patterns=n.frames.reduce((function(A,e){return A>e?A:e}),0),s}(0,o.Z)(e,A);var t=e.prototype;return t.draw=function(e,t,n,s){A.prototype.draw.call(this,e,t,this.prop.frames[this.cnt]+this.patterns*s,n)},t.tick=function(){this.cnt=(this.cnt+1)%this.prop.frames.length},e}(B),g=function(){function A(A,e,t,n,s){this.sz=A,this.s=t,this.e=n,this.screenSize=s,this.data=new Array(A[0]*A[1]);for(var i=0;i<A[1];i++)for(var r=0;r<A[0];r++)this.data[i*A[0]+r]=e(r,i)}var e=A.prototype;return e.at=function(A){var e=Q([Math.floor(A[0]),Math.floor(A[1])],this.sz);return this.data[e[1]*this.sz[0]+e[0]]},e.draw=function(A,e,t){for(var n=A.sz(),s=n[0],i=n[1],r=e[0]-this.s[0]*s,h=r>=0?this.s[0]:this.s[0]-Math.floor(r)/s,o=r>=0?e[0]:e[0]-Math.floor(r),B=e[0]+this.e[0]*s,a=B<this.screenSize[0]?this.e[0]:this.e[0]-Math.floor(B-this.screenSize[0])/s,g=e[1]-this.s[1]*i,Q=g>=0?this.s[1]:this.s[1]-Math.floor(g)/i,E=g>=0?e[1]:e[1]-Math.floor(g),l=e[1]+this.e[1]*i,f=l<this.screenSize[1]?this.e[1]:this.e[1]-Math.floor(l-this.screenSize[1])/i,u=Q;u<f;u++)for(var c=h;c<a;c++){var d=this.at([c,u]).appearance();A.draw([o+c*s,E+u*i],t,d.mode1,d.mode2)}},A}(),Q=function(A,e){var t=[A[0]%e[0],A[1]%e[1]];return[t[0]<0?t[0]+e[0]:t[0],t[1]<0?t[1]+e[1]:t[1]]},E=function(){function A(A,e,t){this.v={mode1:A,mode2:e},this.solid=t}return A.prototype.appearance=function(){return this.v},A}(),l=function(){function A(A,e,t){var n=A.getContext("2d");if(!n)throw"failed to get canvas context";this.ctx=n,this.canvas=A,this.ctx.imageSmoothingEnabled=!1,this.splite=e,this.messageBox=t,this.scale=3,this.kernelAnime={idle:new a(this.ctx,this.splite,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0]}),squat:new a(this.ctx,this.splite,{topLeft:[0,0],sz:[12,12],frames:[3]}),jump:new a(this.ctx,this.splite,{topLeft:[0,0],sz:[12,12],frames:[2,2,0,2,2,2,0]})},this.bg=new B(this.ctx,this.splite,{topLeft:[0,512],sz:[16,16]});var s=[[8,8,8,8,8,8,8,8,8,8,8,8,8,8],[8,8,7,1,6,8,8,8,8,8,8,8,8,8],[8,8,7,2,6,8,8,8,8,8,8,8,8,8],[0,1,2,3,2,1,3,2,0,4,8,5,3,2],[0,1,2,3,1,1,3,2,0,6,8,5,3,2],[1,0,2,3,2,9,1,2,6,8,8,5,1,0],[8,8,8,8,8,7,1,2,6,8,8,8,8,8]],i=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,3,3,3,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[3,3,3,3,3,2,2,2,2,0,0,3,3,3],[0,0,0,0,0,3,3,3,3,0,0,0,0,0]],r=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0]];this.gameMap=new g([14,7],(function(A,e){return new E(s[e][A],i[e][A],1===r[e][A])}),[-100,0],[100,7],[640,480]),this.command=new Map,this.reset()}var e=A.prototype;return e.reset=function(){this.kernelPos=[100,0],this.kernelVel=[0,0],this.kernelOnGround=!0,this.kernelJumpPow=[0,0],this.kernelDir=0},e.start=function(){var A=this,e=this.keydown.bind(this),t=this.keyup.bind(this);this.canvas.addEventListener("keydown",e),this.canvas.addEventListener("keyup",t),this.canvas.focus();var n=setInterval(this.tick.bind(this),100),s=!1,i=setInterval((function(){s?A.showMessage("What's poppin?"):A.hideMessage(),s=!s}),5e3);this.cleanup=function(){clearInterval(n),clearInterval(i),A.canvas.removeEventListener("keydown",A.keydown.bind(A)),A.canvas.removeEventListener("keyup",A.keyup.bind(A))}},e.stop=function(){this.cleanup&&this.cleanup()},e.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480),this.command.has("ArrowLeft")&&this.kernelOnGround&&(this.kernelJumpPow[0]--,this.kernelJumpPow[0]<-4&&(this.kernelJumpPow[0]=-4),this.kernelDir=0),this.command.has("ArrowRight")&&this.kernelOnGround&&(this.kernelJumpPow[0]++,this.kernelJumpPow[0]>4&&(this.kernelJumpPow[0]=4),this.kernelDir=1),this.command.has("ArrowLeft")||this.command.has("ArrowRight")||this.command.has("Space")||!this.kernelOnGround||0===this.kernelJumpPow[0]||0!==this.kernelJumpPow[1]||(this.kernelOnGround=!1,this.kernelVel=[this.kernelJumpPow[0],2],this.kernelJumpPow=[0,0]),this.kernelPos[0]+=this.kernelVel[0],this.kernelPos[1]+=this.kernelVel[1];var A=this.kernelVel[1]<0?this.kernelVel[1]:0,e=[Math.round((this.kernelPos[0]-2)/16),Math.round((36-this.kernelPos[1]-A+1)/16)],t=this.kernelVel[1]>0?this.kernelVel[1]:0,n=[Math.round((this.kernelPos[0]+this.kernelVel[0]-2)/16),Math.round((36-this.kernelPos[1]-t-1)/16)],s=[Math.round((this.kernelPos[0]+this.kernelVel[0]-2)/16),Math.round((36-this.kernelPos[1])/16)],i=this.kernelAnime.idle;this.command.has("Space")&&this.kernelOnGround?(i=this.kernelAnime.squat,this.kernelJumpPow[1]+=2,this.kernelJumpPow[1]>10&&(this.kernelJumpPow[1]=10)):(!this.command.has("Space")&&this.kernelJumpPow[1]>0&&(this.kernelOnGround=!1,this.kernelVel=this.kernelJumpPow,this.kernelJumpPow=[0,0]),this.kernelOnGround||(this.kernelVel[1]-=2,this.kernelVel[1]<-15&&(this.kernelVel[1]=-15),this.gameMap.at(s).solid&&(this.kernelVel[0]=-.5*this.kernelVel[0]),this.gameMap.at(n).solid&&this.kernelVel[1]>0?(this.kernelVel[1]=-1,this.kernelPos[1]=n[1]+11):this.gameMap.at(e).solid&&this.kernelVel[1]<=0&&(this.kernelPos[1]=e[1]-2,this.kernelVel=[0,0],this.kernelOnGround=!0,i=this.kernelAnime.squat),this.kernelVel[1]>0?i=this.kernelAnime.jump:this.kernelVel[1]<0&&(i=this.kernelAnime.squat))),this.kernelPos[1]<-96&&this.reset();try{this.gameMap.draw(this.bg,[0,49],this.scale),i.tick(),i.draw([this.kernelPos[0],92-this.kernelPos[1]],this.scale,this.kernelDir,0)}catch(r){console.error(r),this.stop()}},e.keydown=function(A){this.command.set(A.code,!0)},e.keyup=function(A){this.command.delete(A.code)},e.showMessage=function(A){this.messageBox.innerText=A,this.messageBox.style.display="block",this.messageBox.classList.remove("hide")},e.hideMessage=function(){this.messageBox.classList.add("hide")},A}(),f=l,u=t.p+"static/frame-837fb4fd69fb62d88c255448223b7810.svg",c=t.p+"static/frame_inner-60f1e379dcb3ddb7d26173360cdc65ba.svg";var d={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},p=(0,h.F4)(s||(s=n(["\n  from, 20%, 46%, 80%, to {\n    transform: translate3d(0,0,0);\n    visibility: visible;\n  }\n  40%, 42% {\n    transform: translate3d(0, -20px, 0);\n  }\n  70% {\n    transform: translate3d(0, -8px, 0);\n  }\n  90% {\n    transform: translate3d(0,-2px,0);\n  }\n"]))),C=(0,h.F4)(i||(i=n(["\n  from, 50% {\n    transform: translate3d(0,0,0);\n  }\n  20% {\n    transform: translate3d(0,-2px,0);\n  }\n  70% {\n    transform: translate3d(0,-5px,0);\n  }\n  to {\n    visibility: hidden;\n  }\n"]))),I=function(){var A=(0,r.useRef)(null),e=(0,r.useRef)(null),t=(0,r.useRef)(null);return(0,r.useEffect)((function(){if(A.current&&e.current&&t.current){var n=new f(A.current,e.current,t.current);n.start();var s=function(){A.current&&A.current.focus()};return document.addEventListener("click",s),function(){document.removeEventListener("click",s),n.stop()}}}),[A,e,t]),(0,h.tZ)("main",null,(0,h.tZ)("title",null,"What's poppin?"),(0,h.tZ)("div",{style:{width:"808px",height:"689px",backgroundImage:"url("+u+")",position:"relative"}},(0,h.tZ)("canvas",{ref:A,tabIndex:1,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"30px",position:"absolute",left:"84px",top:"188px"},width:"640",height:"480"}),(0,h.tZ)("div",{style:{width:"640px",height:"480px",backgroundImage:"url("+c+")",position:"absolute",left:"84px",top:"188px"}}),(0,h.tZ)("div",{ref:t,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"134px",bottom:"34px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:(0,h.iv)("animation:",p," 0.8s ease;&.hide{animation:",C," 0.5s ease;}","")})),(0,h.tZ)("img",{ref:e,src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAYAAAB/HSuDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAI41JREFUeNrs3V+IrOddwPF5twdJw6kg9Epa2ioNgZIQkmCoFtI7EaIkEY629CL1JgW9KElJgpjktIHSFIO9UGhuapGDmAMmYnPjnWJRDpwmIeWARBsrKfWighdd0iCFcZ6ZeeY8++7zvu/z/pmd3Z3PB7a7OzvzPjNz0ovf933nfav5fD7btqqqZnGdy3dWmwUvvzmvFr+H7zMAAABgi7N5GMybBvR4n7EDetx+2Pblf/3c5vbLn7yy/PM6BvjXAAAAgG0FgPhDbkBPh/R0QO8bDML9n71jdmzbTdsHAAAApnVhM4hnhv9sMaiqWdtjFgP9fHH7kYF+HRdm1cUrs59+c3XbB74w2/ycW6Ppowk+MgAAAAD9HYRBO+6dDwP64ZXVV/x5PeCHob4+iBcFg3jfL/1h/m/r2+e5wLBZJ/16cxUTAAAAgHKbIwDCsJ9Tvz39qEBuj364PXcUwBDZIwxWHzlQAAAAAKCHg7a9823agkHcq1/fU58e8t90+H8IDDEyfPn7s+IjEgAAAICWAFAyoKeH6Q8NBu9dW301/Z5qW6MtMAAAAAAdAaDPgB7//pPP3/w9/Jzev/7Z/lvuW301/V4y/AMAAAAjA0DpgD70/sHFR1eRIHwPX236BgYAAACgPQBUf/oX7QN6+Pti4K5GDPTLNS7fuYoEhy+ufg63rdeucoHhg9+6uf3wc1dgAAAAABoG82fvWO1NXwzijXvT4/B/8dHNJfiK9ryHx4XHBIcvVstBfjH4z+Pf1mFhFrcdDN0+AAAA0BIAwhn3t75IVc3iOuvL+K1+fnNehYF/7OUCAQAAgIIA0DSgxyF97PAfxEv7rS/jt9r2J5eXEqzW6/jXAAAAgG0FgPhDbkCPQ3pbBOgKBjEAPHvH7Ni20wggAAAAAMD2XEgH+dyA3iYbDMJtSQRIjiyYHV65MvvAF2azn35z9bfwczgHAQAAALDlAJDu+c8N6PPDzx0b6tPhv7p4ZXmfIPycG+jDfePJ/uqSExAut1//yMCxbTlvAAAAAPQPAPGHMPzn5G5Pg0H9PuH2XDDoq+mIhHUUqPzTAQAAQLmDtr3zbdqCQdhebu99EI8uqP8chT3/8WMDYVvhqILwPf68fq7z9eUCAQAAgJIAUDKgpwN9PRh0DfSp966tvpp+j7qihAgAAAAAIwJA6YBecv/cUQC33Lf6avq9ZPgHAAAARgaAkgF9wEB/5PeLj66+QigI39uE+/zk8zd/Dz+ngWHBmQABAACgQDgJYBXOwh/3useh/H/+YDb74Ldms8MXl2fpnzWd1C93/4xqfab/2ZfWN/z59cX/3Hnz702BoXD7AAAAQIsqXLYvuRRfVu4SgCUbTx93+OLqx7jOH927GvrjEQMXH53HbYdvRdtfPO8qPg4AAABoCQDxjPsAAADA+XXgLQAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQADwFgAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAg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AAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAPAWAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAP/Pjh0LAAAAAAzyt57D7sIIAABAAAAAAAACAAAAABAAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAAAgAAAAAQAAAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAEAAAAACAAAAAAAAEAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAAAQAAAAAIAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAAAEAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAgAAAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAQAAAAACAAAAAAAAEAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAGBJAAEGALgkOx8URVYpAAAAAElFTkSuQmCC",style:{display:"none"}}),(0,h.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:d},(0,h.tZ)("a",{href:"https://github.com/Doramanjyu/z-game"},"Source repository")))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-696dcc82024c123f8859.js.map