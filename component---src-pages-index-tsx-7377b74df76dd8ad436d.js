"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{620:function(A,e,t){function s(A,e){return e||(e=A.slice(0)),A.raw=e,A}t.r(e),t.d(e,{default:function(){return p}});var n,i,r=t(7294),o=t(9021),h=t(1721),a=function(){function A(A,e,t){this.ctx=A,this.splite=e,this.prop=t}var e=A.prototype;return e.draw=function(A,e,t,s){this.ctx.drawImage(this.splite,this.prop.topLeft[0]+t*this.prop.sz[0],this.prop.topLeft[1]+s*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],A[0]*e,A[1]*e,this.prop.sz[0]*e,this.prop.sz[1]*e)},e.sz=function(){return this.prop.sz},A}(),l=function(A){function e(e,t,s){var n;return(n=A.call(this,e,t,s)||this).cnt=0,n.prop=s,s.patterns?n.patterns=s.patterns:n.patterns=s.frames.reduce((function(A,e){return A>e?A:e}),0),n}(0,h.Z)(e,A);var t=e.prototype;return t.draw=function(e,t,s,n){A.prototype.draw.call(this,e,t,this.prop.frames[this.cnt]+this.patterns*n,s)},t.tick=function(){return this.cnt=(this.cnt+1)%this.prop.frames.length,this.prop.frames[this.cnt]},e}(a),B=function(){function A(A,e,t,s,n){this.sz=A,this.s=t,this.e=s,this.screenSize=n,this.data=new Array(A[0]*A[1]);for(var i=0;i<A[1];i++)for(var r=0;r<A[0];r++)this.data[i*A[0]+r]=e(r,i)}var e=A.prototype;return e.at=function(A){var e=E([Math.floor(A[0]),Math.floor(A[1])],this.sz);return this.data[e[1]*this.sz[0]+e[0]]},e.draw=function(A,e,t){for(var s=A.sz(),n=s[0],i=s[1],r=e[0]-this.s[0]*n,o=r>=0?this.s[0]:this.s[0]-Math.floor(r)/n,h=r>=0?e[0]:e[0]-Math.floor(r),a=e[0]+this.e[0]*n,l=a<this.screenSize[0]?this.e[0]:this.e[0]-Math.floor(a-this.screenSize[0])/n,B=e[1]-this.s[1]*i,E=B>=0?this.s[1]:this.s[1]-Math.floor(B)/i,g=B>=0?e[1]:e[1]-Math.floor(B),f=e[1]+this.e[1]*i,u=f<this.screenSize[1]?this.e[1]:this.e[1]-Math.floor(f-this.screenSize[1])/i,Q=E;Q<u;Q++)for(var c=o;c<l;c++){var d=this.at([c,Q]).appearance();A.draw([h+c*n,g+Q*i],t,d.mode1,d.mode2)}},A}(),E=function(A,e){var t=[A[0]%e[0],A[1]%e[1]];return[t[0]<0?t[0]+e[0]:t[0],t[1]<0?t[1]+e[1]:t[1]]},g=function(){function A(A,e,t){this.v={mode1:A,mode2:e},this.solid=t}return A.prototype.appearance=function(){return this.v},A}(),f=function(){function A(A,e,t){var s=A.getContext("2d");if(!s)throw"failed to get canvas context";this.ctx=s,this.canvas=A,this.ctx.imageSmoothingEnabled=!1,this.splite=e,this.messageBox=t,this.scale=3,this.kernelAnime={idle:new l(this.ctx,this.splite,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0]}),squat:new l(this.ctx,this.splite,{topLeft:[0,0],sz:[12,12],frames:[3]}),jump:new l(this.ctx,this.splite,{topLeft:[0,0],sz:[12,12],frames:[2,2,0,2,2,2,0]})},this.kernelShadow=new a(this.ctx,this.splite,{topLeft:[0,24],sz:[12,12]}),this.bg=new a(this.ctx,this.splite,{topLeft:[0,512],sz:[16,16]});var n=[[8,8,8,8,8,8,8,8,8,8,8,8,8,8],[8,8,7,1,6,8,8,8,8,8,8,8,8,8],[8,8,7,2,6,8,8,8,8,8,8,8,8,8],[0,1,2,3,2,1,3,2,0,4,8,5,3,2],[0,1,2,3,1,1,3,2,0,6,8,5,3,2],[1,0,2,3,2,9,1,2,6,8,8,5,1,0],[8,8,8,8,8,7,1,2,6,8,8,8,8,8]],i=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,3,3,3,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[3,3,3,3,3,2,2,2,2,0,0,3,3,3],[0,0,0,0,0,3,3,3,3,0,0,0,0,0]],r=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,0]];this.gameMap=new B([14,7],(function(A,e){return new g(n[e][A],i[e][A],1===r[e][A])}),[-100,0],[100,7],[640,480]),this.command=new Map,this.reset()}var e=A.prototype;return e.reset=function(){this.kernelPos=[100,0],this.kernelVel=[0,0],this.kernelOnGround=!0,this.kernelJumpPow=[0,0],this.kernelDir=0},e.start=function(){var A=this,e=this.keydown.bind(this),t=this.keyup.bind(this);this.canvas.addEventListener("keydown",e),this.canvas.addEventListener("keyup",t),this.canvas.focus();var s=setInterval(this.tick.bind(this),100),n=!1,i=setInterval((function(){n?A.showMessage("What's poppin?"):A.hideMessage(),n=!n}),5e3);this.cleanup=function(){clearInterval(s),clearInterval(i),A.canvas.removeEventListener("keydown",A.keydown.bind(A)),A.canvas.removeEventListener("keyup",A.keyup.bind(A))}},e.stop=function(){this.cleanup&&this.cleanup()},e.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480),this.command.has("ArrowLeft")&&this.kernelOnGround&&(this.kernelJumpPow[0]--,this.kernelJumpPow[0]<-4&&(this.kernelJumpPow[0]=-4),this.kernelDir=0),this.command.has("ArrowRight")&&this.kernelOnGround&&(this.kernelJumpPow[0]++,this.kernelJumpPow[0]>4&&(this.kernelJumpPow[0]=4),this.kernelDir=1),this.command.has("ArrowLeft")||this.command.has("ArrowRight")||this.command.has("Space")||!this.kernelOnGround||0===this.kernelJumpPow[0]||0!==this.kernelJumpPow[1]||(this.kernelOnGround=!1,this.kernelVel=[this.kernelJumpPow[0],2],this.kernelJumpPow=[0,0]),this.kernelPos[0]+=this.kernelVel[0],this.kernelPos[1]+=this.kernelVel[1];var A=this.kernelVel[1]<0?this.kernelVel[1]:0,e=[Math.round((this.kernelPos[0]-2)/16),Math.round((36-this.kernelPos[1]-A+1)/16)],t=this.kernelVel[1]>0?this.kernelVel[1]:0,s=[Math.round((this.kernelPos[0]+this.kernelVel[0]-2)/16),Math.round((36-this.kernelPos[1]-t-1)/16)],n=[Math.round((this.kernelPos[0]+this.kernelVel[0]-2)/16),Math.round((36-this.kernelPos[1])/16)],i=this.kernelAnime.idle;this.command.has("Space")&&this.kernelOnGround?(i=this.kernelAnime.squat,this.kernelJumpPow[1]+=2,this.kernelJumpPow[1]>10&&(this.kernelJumpPow[1]=10)):(!this.command.has("Space")&&this.kernelJumpPow[1]>0&&(this.kernelOnGround=!1,this.kernelVel=this.kernelJumpPow,this.kernelJumpPow=[0,0]),this.kernelOnGround||(this.kernelVel[1]-=2,this.kernelVel[1]<-15&&(this.kernelVel[1]=-15),this.gameMap.at(n).solid&&(this.kernelVel[0]=-.5*this.kernelVel[0]),this.gameMap.at(s).solid&&this.kernelVel[1]>0?(this.kernelVel[1]=-1,this.kernelPos[1]=s[1]+11):this.gameMap.at(e).solid&&this.kernelVel[1]<=0&&(this.kernelPos[1]=e[1]-2,this.kernelVel=[0,0],this.kernelOnGround=!0,i=this.kernelAnime.squat),this.kernelVel[1]>0?i=this.kernelAnime.jump:this.kernelVel[1]<0&&(i=this.kernelAnime.squat))),this.kernelPos[1]<-96&&this.reset();try{this.gameMap.draw(this.bg,[0,49],this.scale);var r=i.tick();this.kernelOnGround&&this.kernelShadow.draw([this.kernelPos[0],93-this.kernelPos[1]],this.scale,r,0),i.draw([this.kernelPos[0],92-this.kernelPos[1]],this.scale,this.kernelDir,0)}catch(o){console.error(o),this.stop()}},e.keydown=function(A){this.command.set(A.code,!0)},e.keyup=function(A){this.command.delete(A.code)},e.showMessage=function(A){this.messageBox.innerText=A,this.messageBox.style.display="block",this.messageBox.classList.remove("hide")},e.hideMessage=function(){this.messageBox.classList.add("hide")},A}(),u=f,Q=t.p+"static/frame-837fb4fd69fb62d88c255448223b7810.svg",c=t.p+"static/frame_inner-60f1e379dcb3ddb7d26173360cdc65ba.svg";var d={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},C=(0,o.F4)(n||(n=s(["\n  from, 20%, 46%, 80%, to {\n    transform: translate3d(0,0,0);\n    visibility: visible;\n  }\n  40%, 42% {\n    transform: translate3d(0, -20px, 0);\n  }\n  70% {\n    transform: translate3d(0, -8px, 0);\n  }\n  90% {\n    transform: translate3d(0,-2px,0);\n  }\n"]))),I=(0,o.F4)(i||(i=s(["\n  from, 50% {\n    transform: translate3d(0,0,0);\n  }\n  20% {\n    transform: translate3d(0,-2px,0);\n  }\n  70% {\n    transform: translate3d(0,-5px,0);\n  }\n  to {\n    visibility: hidden;\n  }\n"]))),p=function(){var A=(0,r.useRef)(null),e=(0,r.useRef)(null),t=(0,r.useRef)(null);return(0,r.useEffect)((function(){if(A.current&&e.current&&t.current){var s=new u(A.current,e.current,t.current);s.start();var n=function(){A.current&&A.current.focus()};return document.addEventListener("click",n),function(){document.removeEventListener("click",n),s.stop()}}}),[A,e,t]),(0,o.tZ)("main",null,(0,o.tZ)("title",null,"What's poppin?"),(0,o.tZ)("div",{style:{width:"808px",height:"689px",backgroundImage:"url("+Q+")",position:"relative"}},(0,o.tZ)("canvas",{ref:A,tabIndex:1,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"30px",position:"absolute",left:"84px",top:"188px"},width:"640",height:"480"}),(0,o.tZ)("div",{style:{width:"640px",height:"480px",backgroundImage:"url("+c+")",position:"absolute",left:"84px",top:"188px"}}),(0,o.tZ)("div",{ref:t,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"134px",bottom:"34px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:(0,o.iv)("animation:",C," 0.8s ease;&.hide{animation:",I," 0.5s ease;}","")})),(0,o.tZ)("img",{ref:e,src:"data:image/png;base64,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AAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgA3gIAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAADOdwD42rc/WM+/Tv2LOivPEwAAAE5lACgZsHc9fIf1/bMCAADAUReaN9z65G1hgK7eeebN3P2r+Ve9+t42dFc9w3n1uY//cJuvKT5HAAAAIA7LdV0f22v+x//487M//c3/G7XB8Ngg9/j54N8VDjqFx67ixODnlq7btmZ83u8882aVu0/zuXcZcxRC8r5lA8a21h+yXQAAAM5wAPjzf/7l3mExDqepdAjP/X3IoH77f/3n+ueHX/9w8eNz675w57+vtxF/HhszmmuEONA3eLeFir73sPA1th2ZkQ7+1fwxxesLAAAAAHsSAN7zJx+un7/4kcUvv3f4xpHBNAzm6UDeFB4XH7OpdHAv2X7u/rnbckNv+rq6HtNcvy8ABHH4L32PhqxfEABmcfgvXb/kNQEAAHD2HcTBPx3+w97idK98bjBNg0GpL7zxv+uv3BDcvD1sP3f/oG/Qzz0mCK8tfWxuO3HN5utrDvcl4jbie1byOtrWn424tkHf+gAAAOyH6osPvb/+8kfec+wPXXum24brLnfde8/i+9/80/8cuf32W36Q/fun7vvF9e/xPn1+7ZM/mv31X923eOyr128sbvu3d3+1+PGp8Lj0Ofz93T8uPmT+Sw9/IDuo597ntvdy7Pq3Pnlb2Gbx+o4AAAAA2JMA8Mnfuq9OB+R0SMztmY+DehCH7Nzwmg7x8b7pY9PHN2/vekzb2mH4/9lbDx67TxoActvqWyP+Lfz8C4/9XPE582kEaHvPwnsd3tsp1w8BIJwmULq+AAAAALAfLiyH9JsD4heSAfFnFx+cD6jtQ3rb4HpXx6Aevf9Dv9L5xNoeFx8bvn70H2/dfK5vtTy/TGQIe9TD6w7fLz9yaXFbuq3cEP7UC29XQ66u3/reJAN9GP5/5/fL1p8VfrxhvEZA6foAAADsSQBoGTZ7B9mhg3DYdjq0tw286ePCgH5X5m9dj22eQhAG7PT+4Tl8avbW+j5d2wpHD4RD768NfM0vPftQXfq+7Hp9AAAA9sPiGgDpQNjcs953mH5XPGjbiz/mkP9N7htdOnxjdq1xMbyS7TzwxIuDDpMPh9+XvF+lw/g21w9HNvjPAAAAYE8CwJBBum9w7QoGzSAQ7jNkEI7DenMvf5SLF7lD/1PpttpiQLh9yKDc3APf9Rp3vf7QuAAAAMAZDQDf+vKDRee1x3P2+w7dn8rQ9ZrD/6Zrp9tqG5Jffvnlxff777//2N++e+3xeuzzab72qddPty8AAAAACAAnMuCfZFQYa+yQHIbwttc4JFhsc30BAAAAYD8cdP0xHp6+reE/DKC56w2clPhpAqnmc+j7tIIuH7301eof/vZadq34une9PgAAAPvhyBEApRfWCxfTC+LHyJ2WK8rHvdrpuf6l1xhoe+2b7iFP98I3heE8/ZSEXazvIoAAAAB7GAD6But0WC4dqpv3ye3R7tob3RclmufLx9/jnu/wMYAl67RtN+xFH/vmhovxff83Xpt94se/23qfvvP0t73+JtsHAADg7LiQG8rD8BwH53Swjj83B/LmEB6H9r7Bv/Rvze2WRIp08M+tE+7b9okF4QiCyx+a5g2Ow3dYL/c6c6/pJNcHAABgjwJAUzo8x8G6ba9/OlTGn3OD5le++Z3Z5UfuHvUkw/biHv10YG6uM2TA7Ton/vZbfjD/37s3emPD3vdw+H76kXy5IbwZWk56fQAAAPYkAJQMhLmL5Q0RhvfLj1za6ImGQTlGgCnEYTh+b546MIUwfPd9nOGu1wcAAGA/HJzGJ9U2rOYO6x+yTUMwAAAA+6p67fnH6ik2dFKHl8fTEcJpAJusV/J8f/1735q988ybG12EL3d9haAkZpzE+i4CCAAAsB86jwAI5+2XDNJBc9Ds2uO+yWHuYZ0wvG4aG/oOuQ/D97/c8duzW5+8bVQgafv4vfDc0+F/W+u3aa4PAADAfjh2BEDbQD8kADQH/5O68NzQ597nlV/6u8VV9MfsJf/Swx+oNxm0w5pf+/YH6899/Icb76FvixFxHf8ZAAAAnH8HuQE6/lxy3nx6Abt0AO/6RIAxSo5G2PRihVPKXbSw6/2Mg3j4PvVQHrfpOggAAAD7a7JrADQH3dwRASc9nI+9LkHzIwvHDuS5owDSATx9bie1Jz79WMCwviMAAAAA9sNGnwLQdv56/Hi99Pdd7Jkfu2Y6/G+yxzx3CsCuj1B44IkXq/Dl//oAAAD75cImD+46x/20HIo/xcA89TZ3sec/97q6rg0AAADA+XLgLdidXR9+7/B/AACA/THoGgBjz6kfsp2+Nbo+dnDMdQfazsmfYlBunm/ftm7f+l3vU3huYZ2+92xb65f+m7Wt73QEAACAkzHoFIDTcFh/bsh/9fqN9ekIQwb/vmsTbBo8uh4br5MwZv1wezo4h59jbMjdv+22TdZPb+8LAaW3AQAAsD07OQWgbzAesp3wlV6LIN7W97GB2x5A4/n1bR8FOPXH8bXtST+p9Uv5KEIAAIBTHAC2ObRtY9th6E2v5L/LQbd5ocQYKMJXOHJhymE/vX1b64f3ti2eNI/OaDvNwN5/AACAUxoA0kO8pzZ2GOx6Ll2fTnASz6308X3P87Stn/nYxyr5yj6+7aMiAQAAOIUBIA5zXRfu6xvWu+4zZtAd8phdDKHNvfRTxZO+CxJ2XSRxIlXj+yz3e1y/eW2GXf17AAAACAAT6BvGd33Y9yZHBIwdnOM1AErfo771Nz1VYor177r3njjAr4f9j1766uJrW+sDAABwigLAWdY1VDevtr+L9ePgHJ5H6XMZEguGrP/q9RuL9WNQSQf/8HPpulOdogEAAEC5C/v+Bux6z3TJ+ouh+trjdd/h/2NeT7x/OCy/bTCP6z/1wtt964e/12k46NouAAAAJ2fUEQDn6Rzurtey7b3/fevHIXrbkSI9vL9v/e9ee7xvc1Vz+HfOPwAAwBkNAKeRz5cfL16jYdP374EnXjzye9zz7wgAAACA3atee/6xOjdMl+51brvq/HlQcsh9m5eefaje9D2J7+3QIxHC2pv+m8S99qsjA6p0e30X/QtHCcyfe9Hr3+Q9BgAAoNxBc+Acuhc4d4X/sXuSz9Ne/NzQPvT1DbnwX/NxueF7yPqrvfbrC/+VxoR4isCm6wMAALDFABCH+U33XI99/NRHEYwdNr/yze8sHhv3pE8lvr6+QXjX6ycRYL1+/Li/ko/8a9u2jwIEAAA4JQFgqG1c3G3KIXHsti4/cvckIWTsc5pi/bZD64dsM2zjqRfeXpzbX3Dxv3UoWF0LoHN9RwIAAACcoQDg4m7jI8BJ7A3v2hPftf5UYadryHc0AAAAwBkKAHHIG7I3d4o9v3HNMeeUn+R56GEPettafc8hPs+Xnn1o9PrhWgDp600H++b6zd/n960ar2Xoaw/fKuf9AwAAnNIA0DdYN28fujd7ij2/6bUKhm5vyGOmuEJ98yJ+8b3tew6r51lt8n6t4kGVG/6b201/n/jIjqr5XgoCAAAAOw4Aq8Gsil/z36swuKVfQwbSMXvn24JEaaDYVNz2lB9Pl26r78r+yeubIj6sh/Aw1IeP9At79tuiRPw57v0P5/2Xnvvft36yTuXwfwAAgJNXvfb8Y/FK79nD1ZMhbiEekt68vWk+ONZxiF1dRK4uHZKH6NtuLjC0DaDh72M+dm8T6fNPAsz6eQ499D4n/Ju9ev3G+vdwYb/m+mlwiP+2Yfifav1U+v5PsX0AAADKAkBuGO8aWLf2ZHIDeholwu25UxA6dA7Xbes3B+GJBv0j72/8vflelwYWAAAAGB0Aptwb2xxwS8LBmPULtls3h/++AGD4BgAA4NwFgLquz+2LW8WBOnd4OwAAAAgAAAAAwLly4C0AAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAABAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAAAAQAAAAAQAAAAAAABAAAAABAAAAAAAAEAAAAAEAAAAAAAAQAAAAAQAAAAAEAA8BYAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAgAAAAAAACAAAAACAAAAAAAAIAAAAAIAAAAAAAAgAAAAAgAAAAAAACAAAAAAgAAAAAAACAAAA8P/s2LEAAAAAwCB/6znsLowABAAAAAAgAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAEAAAAACAAAAAAAAEAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAAAQAAAAAIAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAAAEAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAgAAAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAQAAAAACAAAAAAAAEAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAEAAAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAAAAQAAAAAIAAAAAEAAAAAAAAIAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAQAAAAAAAAgAAAAAQAAAAAIAAAAAAAAQAAAAACAAAAABAAAAAAAACAAAAABAAAAAAgAAAAAAABAAAAAAgAAAAAAABAAAAAAIAAAAAEAAAAACAAAAAAAAEAAAAACAAAAAAAAEAAAAALAkwAOCGpf+VbG5/AAAAAElFTkSuQmCC",style:{display:"none"}}),(0,o.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:d},(0,o.tZ)("a",{href:"https://github.com/Doramanjyu/z-game"},"Source repository")))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-7377b74df76dd8ad436d.js.map