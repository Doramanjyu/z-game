"use strict";(self.webpackChunkz_game=self.webpackChunkz_game||[]).push([[691],{7956:function(t,e,s){function i(t,e){return e||(e=t.slice(0)),t.raw=e,t}s.r(e),s.d(e,{default:function(){return C}});var o,n,a=s(7294),h=s(5698),r=function(){function t(t,e){this.sprite=t,this.prop=e}var e=t.prototype;return e.draw=function(t,e,s,i,o){t.drawImage(this.sprite,this.prop.topLeft[0]+i*this.prop.sz[0],this.prop.topLeft[1]+o*this.prop.sz[1],this.prop.sz[0],this.prop.sz[1],Math.floor(e[0]*s),Math.floor(e[1]*s),this.prop.sz[0]*s,this.prop.sz[1]*s)},e.sz=function(){return this.prop.sz},t}(),p=s(1721),c=function(t){function e(e,s){var i;return(i=t.call(this,e,s)||this).cnt=0,i.frame=0,i.prop=s,s.patterns?i.patterns=s.patterns:i.patterns=s.frames.reduce((function(t,e){return t>e?t:e}),0),s.countDiv?i.countDiv=s.countDiv:i.countDiv=1,i}(0,p.Z)(e,t);var s=e.prototype;return s.draw=function(e,s,i,o,n){t.prototype.draw.call(this,e,s,i,this.prop.frames[this.frame]+this.patterns*n,o)},s.tick=function(t){return void 0!==t&&(this.cnt=t),this.frame=Math.floor(this.cnt/this.countDiv%this.prop.frames.length),this.cnt++,this.prop.frames[this.frame]},e}(r),u=function(){function t(t,e,s,i,o){this.sz=t,this.s=s,this.e=i,this.screenSize=o,this.data=new Array(t[0]*t[1]);for(var n=0;n<t[1];n++)for(var a=0;a<t[0];a++)this.data[n*t[0]+a]=e(a,n)}var e=t.prototype;return e.at=function(t){var e=l([Math.floor(t[0]),Math.floor(t[1])],this.sz);return this.data[e[1]*this.sz[0]+e[0]]},e.set=function(t,e){var s=l([Math.floor(t[0]),Math.floor(t[1])],this.sz);this.data[s[1]*this.sz[0]+s[0]]=e},e.draw=function(t,e,s,i){for(var o=d(e.sz(),this.s,this.e,s,this.screenSize,i),n=e.sz(),a=n[0],h=n[1],r=o.s[1];r<o.e[1];r++)for(var p=o.s[0];p<o.e[0];p++){var c=this.at([p,r]).appearance();e.draw(t,[o.o[0]+p*a,o.o[1]+r*h],i,c.mode1,c.mode2)}},t}(),l=function(t,e){var s=[t[0]%e[0],t[1]%e[1]];return[s[0]<0?s[0]+e[0]:s[0],s[1]<0?s[1]+e[1]:s[1]]},d=function(t,e,s,i,o,n){i[0]=Math.floor(i[0]),i[1]=Math.floor(i[1]);var a=Math.round(o[0]/(t[0]*n))+2,h=Math.round(o[1]/(t[1]*n))+2,r=i[0]+e[0]*t[0]+t[0],p=i[1]+e[1]*t[1]+t[1],c=r>=0?e[0]:e[0]-Math.floor(r/t[0]),u=c+a,l=p>=0?e[1]:e[1]-Math.floor(p/t[1]);return{s:[c,l],e:[u,l+h],o:i}},f=s(5785),m=function(t,e){return[t[0]-e[0],t[1]-e[1]]},v=function(t,e){return t[0]*e[1]-t[1]*e[0]},w=function(t,e,s,i,o){var n=m(e,t),a=m(i,s),h=v(n,m(s,t)),r=v(n,m(i,t)),p=v(a,m(t,s)),c=v(a,m(e,s));return h<o&&r>-o&&p>-o&&c<o},g=function(){function t(t,e){this.map=t,this.cellSz=e,this.scanned=[],this.intersection=[]}var e=t.prototype;return e.check=function(t,e){var s=this,i={right:!1,left:!1},o=[Math.floor(Math.min(t[0],e[0])/this.cellSz[0]-.5),Math.floor(Math.min(t[1],e[1])/this.cellSz[1]-.5)],n=[Math.floor(Math.max(t[0],e[0])/this.cellSz[0]+.5),Math.floor(Math.max(t[1],e[1])/this.cellSz[1]+.5)],a=[[t[0]/this.cellSz[0],t[1]/this.cellSz[1]],[e[0]/this.cellSz[0],e[1]/this.cellSz[1]]];this.motion=a;for(var h=function(t){for(var e=function(e){s.map.at([e,t]).collision().forEach((function(o){var n=o.reduce((function(s,i){return s.push([e+i[0],t+i[1]]),s}),[]);n.length>0&&s.scanned.push(n);for(var h=0;h<n.length-1;h++)w(n[h],n[h+1],a[0],a[1],.005)&&(n[h][0]>n[h+1][0]?i.top=n[h][1]+.01:n[h][0]<n[h+1][0]&&(i.bottom=n[h][1]-.01),n[h][1]>n[h+1][1]?i.right=!0:n[h][1]<n[h+1][1]&&(i.left=!0),s.intersection.push([n[h],n[h+1]]))}))},h=o[0];h<n[0]+1;h++)e(h)},r=o[1];r<n[1]+1;r++)h(r);return i},e.draw=function(t,e,s){var i=this;t.strokeStyle="white",t.lineWidth=1;var o=d(this.map.sz,this.map.s,this.map.e,e,this.map.screenSize,s),n=this.cellSz,a=n[0],h=n[1];t.beginPath();for(var r=function(e){for(var n=function(n){i.map.at([n,e]).collision().forEach((function(i){i.forEach((function(i,r){var p=(o.o[0]+a*(n+i[0]))*s,c=(o.o[1]+h*(e+i[1]))*s;0==r?t.moveTo(p,c):t.lineTo(p,c)})),t.stroke()}))},r=o.s[0];r<o.e[0];r++)n(r)},p=o.s[1];p<o.e[1];p++)r(p);t.closePath();var c=function(t){return[(o.o[0]+a*t[0])*s,(o.o[1]+h*t[1])*s]},u=function(e){t.beginPath(),e.forEach((function(e){e.forEach((function(e,s){return 0==s?t.moveTo.apply(t,(0,f.Z)(c(e))):t.lineTo.apply(t,(0,f.Z)(c(e)))})),t.stroke()})),t.closePath()};t.strokeStyle="yellow",t.lineWidth=1,u(this.scanned),this.scanned=[],t.strokeStyle="orange",t.lineWidth=5,u(this.intersection),this.intersection=[],this.motion&&(t.strokeStyle="red",t.lineWidth=4,t.beginPath(),this.motion.forEach((function(e,s){return 0==s?t.moveTo.apply(t,(0,f.Z)(c(e))):t.lineTo.apply(t,(0,f.Z)(c(e)))})),t.stroke(),t.closePath())},t}(),x=function(){function t(t){this.pos=t.pos||[0,0],this.vel=t.vel||[0,0],this.onGround=t.onGround||!0,this.orientation=t.orientation||0,this.jumpPow=[0,0],this.heat=0,this.popped=0,this.trans=0}return t.prototype.clone=function(){return Object.assign({},this,{pos:[this.pos[0],this.pos[1]],vel:[this.vel[0],this.vel[1]],jumpPow:[this.jumpPow[0],this.jumpPow[1]]})},t}(),b=function(){function t(t,e){this.ellasticCoeff=.5,this.anime={idle:new c(t,{topLeft:[0,0],sz:[12,12],frames:[0,0,0,2,0,1,0],patterns:4}),squat:new c(t,{topLeft:[0,0],sz:[12,12],frames:[3],patterns:4}),jump:new c(t,{topLeft:[0,0],sz:[12,12],frames:[2,2,0,2,2,2,0],patterns:4})},this.currentAnime=this.anime.idle,this.shadow=new r(t,{topLeft:[0,24],sz:[12,12]}),this.trans=new r(t,{topLeft:[0,36],sz:[12,12]}),this.explosion=new r(t,{topLeft:[0,48],sz:[36,12]}),this.headUpText=new c(t,{topLeft:[0,60],sz:[24,12],frames:[0,1],patterns:2,countDiv:8}),this.state0=new x(e),this.state=this.state0.clone(),this.explosionPos=this.state.pos,this.explosionNum=0,this.headUpTextMode=0}var e=t.prototype;return e.reset=function(){this.state=this.state0.clone()},e.tick=function(t,e,s){if(t.left&&this.state.onGround&&(this.state.jumpPow[0]--,this.state.jumpPow[0]<-4&&(this.state.jumpPow[0]=-4),this.state.orientation=0),t.right&&this.state.onGround&&(this.state.jumpPow[0]++,this.state.jumpPow[0]>4&&(this.state.jumpPow[0]=4),this.state.orientation=1),t.left||t.right||t.space||!this.state.onGround||0===this.state.jumpPow[0]||0!==this.state.jumpPow[1]||(this.state.onGround=!1,this.state.vel=[this.state.jumpPow[0],-4],this.state.jumpPow=[0,0]),!t.space||!this.state.onGround){var i=[Math.round((this.state.pos[0]-2)/16),Math.floor(this.state.pos[1]/16)],o=e.at(i);0==this.state.jumpPow[0]&&this.state.jumpPow[1]<0&&this.state.jumpPow[1]>-4&&o.onAction?o.onAction({target:o}):!t.space&&this.state.jumpPow[1]<0?(this.state.onGround=!1,0==this.state.popped?this.state.vel=this.state.jumpPow:this.state.vel=[this.state.jumpPow[0],.5*this.state.jumpPow[1]],this.state.jumpPow=[0,0]):this.state.onGround||(0==this.state.popped?this.state.vel[1]+=2:this.state.vel[1]+=1.5,this.state.vel[1]>14&&(this.state.vel[1]=14))}var n=[Math.round((this.state.pos[0]-2)/16),Math.floor(this.state.pos[1]/16)],a=s.check([this.state.pos[0]+6,this.state.pos[1]],[this.state.pos[0]+this.state.vel[0]+6,this.state.pos[1]+this.state.vel[1]]),h=this.headUpTextMode;this.headUpTextMode=e.at(n).headUpText(),this.headUpTextMode>0&&0==h&&this.headUpText.tick(0),this.currentAnime=this.anime.idle,t.space&&this.state.onGround?(this.currentAnime=this.anime.squat,this.state.jumpPow[1]-=2,this.state.jumpPow[1]<-11&&(this.state.jumpPow[1]=-11)):this.state.onGround||(a.top&&this.state.vel[1]<0&&(this.state.vel[1]*=-this.ellasticCoeff,this.state.vel[0]*=this.ellasticCoeff,this.state.pos[1]=16*a.top),(a.left&&this.state.vel[0]<0||a.right&&this.state.vel[0]>0)&&(this.state.vel[0]*=-this.ellasticCoeff,this.state.pos[0]+=this.state.vel[0]),a.bottom&&this.state.vel[1]>=0&&(this.state.pos[1]=16*a.bottom,this.state.vel=[0,0],this.state.onGround=!0,this.currentAnime=this.anime.squat),this.state.vel[1]<0?this.currentAnime=this.anime.jump:this.state.vel[1]>0&&(this.currentAnime=this.anime.squat)),this.state.pos[0]+=this.state.vel[0],this.state.pos[1]+=this.state.vel[1],this.explosionNum&&this.explosionNum>0?(this.explosionNum--,2==this.explosionNum&&(this.state.heat=40,this.state.popped=96,this.state.onGround=!1,this.state.vel=[0,-17],this.state.jumpPow=[0,0])):e.at(n).heat()?(this.state.heat++,this.state.heat>38&&0==this.state.popped&&(this.explosionPos=[this.state.pos[0],this.state.pos[1]],this.explosionNum=3)):(this.state.heat--,this.state.heat<0&&(this.state.heat=0),this.state.popped>0&&(this.state.popped--,this.state.heat=0,this.state.popped<0&&(this.state.popped=0))),this.state.trans<8&&this.state.trans++},e.draw=function(t,e,s){var i=this.currentAnime.tick();this.headUpTextMode>0&&this.headUpText.tick();var o=this.state.popped>0&&2!=this.state.popped||39==this.state.heat?5:Math.min(4,Math.floor(this.state.heat/8));this.state.onGround&&this.shadow.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-5],s,4*o+i,0),this.state.trans>2&&this.currentAnime.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-6],s,this.state.orientation,o),this.state.trans<8&&this.trans.draw(t,[e[0]+this.state.pos[0],e[1]+this.state.pos[1]-5],s,this.state.trans-2,0),this.explosionNum>0&&this.explosion.draw(t,[e[0]+this.explosionPos[0]-12,e[1]+this.explosionPos[1]-8],s,3-this.explosionNum,0),this.headUpTextMode>0&&this.headUpText.draw(t,[e[0]+this.state.pos[0]-6,e[1]+this.state.pos[1]-15],s,0,this.headUpTextMode-1)},t}(),y=function(){},M=function(t){function e(e,s,i,o){var n;return(n=t.call(this)||this).v={mode1:e,mode2:s},n.typ=i,n.colDir=o,n}(0,p.Z)(e,t);var s=e.prototype;return s.appearance=function(){return this.v},s.heat=function(){return 2==this.typ},s.collision=function(){var t=.05,e=[];return this.colDir.top&&e.push([[0,t],[1,t]]),this.colDir.right&&this.colDir.bottom&&!this.colDir.left?(e.push([[1,t],[1,.9],[.3,1.4],[0,1.4]]),e):this.colDir.left&&this.colDir.bottom&&!this.colDir.right?(e.push([[1,1.4],[.7,1.4],[0,.9],[0,t]]),e):(this.colDir.right&&e.push([[1,.1],[1,1.4]]),this.colDir.bottom&&e.push([[1,1.4],[0,1.4]]),this.colDir.left&&e.push([[0,1.4],[0,.1]]),e)},s.headUpText=function(){return this.onAction?1:2==this.typ?2:0},e}(y),z=function(){function t(t,e){this.v={mode1:t,mode2:e}}return t.prototype.appearance=function(){return this.v},t}(),k=function(t){this.pos=t.pos||[0,0],this.mode=t.mode||0},P=function(t){function e(e,s){return t.call(this,new c(e,{topLeft:[0,72],sz:[24,24],frames:[0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,3,1,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2],patterns:5}),new c(e,{topLeft:[0,60],sz:[24,12],frames:[0,1],patterns:2,countDiv:8}),new k(s))||this}return(0,p.Z)(e,t),e}(function(t){function e(e,s,i){var o;return(o=t.call(this)||this).anime=e,o.headUpText=s,o.state=i,o.active=!1,o}(0,p.Z)(e,t);var s=e.prototype;return s.tick=function(t){var e=this.anime.sz(),s=this.active;this.active=Math.abs(t[0]-this.state.pos[0])<e[0]/2&&Math.abs(t[1]-this.state.pos[1])<e[1]/2,!s&&this.active&&this.onArrive&&this.onArrive({target:this}),this.anime.tick(),this.headUpText.tick()},s.draw=function(t,e,s){var i=this.anime.sz();this.anime.draw(t,[e[0]+this.state.pos[0]-i[0]/2,e[1]+this.state.pos[1]-i[1]+6],s,0,this.state.mode),(this.onArrive||this.onAction)&&this.headUpText.draw(t,[e[0]+this.state.pos[0]-i[0]/2,e[1]+this.state.pos[1]-i[1]+4],s,0,2+(this.active?1:0))},e}(y)),L=JSON.parse('{"BL":{"J":[6,12]},"DH":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[1,7],[1,6],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[1,7],[1,1],[1,3],[1,2],[1,8],[2,11],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[4,7],[4,2],[4,3],[4,0],[4,1],[4,6],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[5,0],[5,1],[5,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[1,7],[1,1],[1,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[4,7],[4,2],[4,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[1,0],[1,1],[1,2],[1,3],[1,2],[1,1],[1,3],[1,2],[1,0],[1,4],[0,0],[1,5],[1,3],[1,2]],[[2,0],[2,1],[2,2],[2,3],[2,1],[2,1],[2,3],[2,2],[2,0],[2,6],[0,0],[2,5],[2,3],[2,2]],[[3,9],[3,1],[3,2],[3,8],[4,1],[4,0],[4,2],[4,3],[2,9],[0,0],[0,0],[4,5],[4,1],[4,0]],[[4,7],[4,1],[4,2],[4,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]],"dt":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0,0],[0,0,0,3,3,3,3,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,2,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,1,1,1,1,1,1,0,1,1,1],[1,1,1,1,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"wc":[[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0]],"IJ":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]],"d4":[[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]]}'),A=function(){function t(t,e,s){var i=this,o=t.getContext("2d");if(!o)throw"failed to get canvas context";this.ctx=o,this.canvas=t,this.ctx.imageSmoothingEnabled=!1,this.sprite=e,this.messageBox=s,this.scale=3,this.origin=[16*L.BL.J[0],16*L.BL.J[1]],this.viewpoint=[0,0],this.debugView=!1,this.kernel=new b(this.sprite,{pos:this.origin}),this.bg=new r(this.sprite,{topLeft:[0,512],sz:[16,16]}),this.bgOverlay=new r(this.sprite,{topLeft:[0,896],sz:[16,16]}),this.bgOverlayAnime=new c(this.sprite,{topLeft:[0,768],sz:[16,16],frames:[0,0,1,1,2,2,1,1]}),this.bgGrad=new r(this.sprite,{topLeft:[1008,0],sz:[16,1024]}),this.zea=new P(this.sprite,{pos:[70,48],mode:1}),this.zea.onArrive=function(){i.showMessage("Hemlo"),setTimeout((function(){i.hideMessage()}),2e3)};var n=L.DH[0].length,a=L.DH.length;this.gameMap=new u([n,a],(function(t,e){var s=L.dt[e][t],o=t+1>n-1?n-1:L.dt[e][t+1],h=t-1<0?0:L.dt[e][t-1],r=e-1<0?0:L.dt[e-1][t],p=e+1>a-1?a-1:L.dt[e+1][t],c={top:2==s||3==s||1==s&&1!=r,bottom:1==s&&1!=p,left:1==s&&1!=h,right:1==s&&1!=o},u=new M(L.DH[e][t][1],L.DH[e][t][0],s,c);return L.wc[e][t]>0&&(u.onAction=function(){u.onAction=void 0,i.overlayAnimeMap.set([t,e],new z(0,0)),i.showMessage("Yum Yum"),setTimeout((function(){i.hideMessage()}),2e3)}),u}),[-100,0],[100,a],[640,480]),this.collisionMap=new g(this.gameMap,[16,16]),this.overlayMap=new u([n,a],(function(t,e){return new z(L.IJ[e][t][1],L.IJ[e][t][0])}),[-100,0],[100,a],[640,480]),this.overlayAnimeMap=new u([n,a],(function(t,e){return L.wc[e][t]>0?new z(2,0):new z(L.d4[e][t][1],L.d4[e][t][0])}),[-100,0],[100,a],[640,480]),this.command=new Map}var e=t.prototype;return e.start=function(){var t=setInterval(this.tick.bind(this),80);this.showMessage("What's poppin?"),setTimeout(this.hideMessage.bind(this),5e3),this.cleanup=function(){clearInterval(t)}},e.stop=function(){this.cleanup&&this.cleanup()},e.tick=function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,640,480);try{var t={left:this.command.has("ArrowLeft"),right:this.command.has("ArrowRight"),space:this.command.has("Space")};this.kernel.tick(t,this.gameMap,this.collisionMap),this.bgOverlayAnime.tick();var e=this.kernel.state;e.pos[1]>288&&this.kernel.reset(),this.zea.tick(e.pos);var s=(e.pos[1]-this.origin[1])/1.25;this.viewpoint[1]<s-16&&(this.viewpoint[1]+=(s-16-this.viewpoint[1])/4),this.viewpoint[1]>s+16&&(this.viewpoint[1]+=(s+16-this.viewpoint[1])/4);var i=640*Math.round(3*(e.pos[0]-this.origin[0]-6)/640)/3;this.viewpoint[0]+=Math.max(-50,Math.min(50,(i-this.viewpoint[0])/2));for(var o=[-this.viewpoint[0],110-this.origin[1]-this.viewpoint[1]],n=0;n<640/this.scale;n+=16)this.bgGrad.draw(this.ctx,[n,480/this.scale-1024-this.viewpoint[1]/3+12],this.scale,0,0);this.gameMap.draw(this.ctx,this.bg,o,this.scale),this.zea.draw(this.ctx,o,this.scale),this.kernel.draw(this.ctx,o,this.scale),this.overlayMap.draw(this.ctx,this.bgOverlay,o,this.scale),this.overlayAnimeMap.draw(this.ctx,this.bgOverlayAnime,o,this.scale),this.debugView&&this.collisionMap.draw(this.ctx,o,this.scale)}catch(a){console.error(a),this.stop()}},e.keydown=function(t){this.command.set(t.code,!0)},e.keyup=function(t){this.command.has("F2")&&(this.debugView=!this.debugView),this.command.delete(t.code)},e.showMessage=function(t){this.messageBox.innerText=t,this.messageBox.style.display="block",this.messageBox.classList.remove("hide")},e.hideMessage=function(){this.messageBox.classList.add("hide")},t}(),j=A,D=s.p+"static/frame-ca82859c688250bcb14362e22a5d3408.svg",S=s.p+"static/frame_inner-60f1e379dcb3ddb7d26173360cdc65ba.svg",T=s.p+"static/sprite-c9f449bf371dbb302e5afe81637abfd4.png";var E={name:"1qdmdf3",styles:">a{color:#666;}>a:hover{color:#999;}"},Z={name:"1i4j1ux",styles:"&:focus-visible{outline-style:none!important;}"},G=(0,h.F4)(o||(o=i(["\n  from, 20%, 46%, 80%, to {\n    transform: translate3d(0,0,0);\n    visibility: visible;\n  }\n  40%, 42% {\n    transform: translate3d(0, -20px, 0);\n  }\n  70% {\n    transform: translate3d(0, -8px, 0);\n  }\n  90% {\n    transform: translate3d(0,-2px,0);\n  }\n"]))),U=(0,h.F4)(n||(n=i(["\n  from, 50% {\n    transform: translate3d(0,0,0);\n  }\n  20% {\n    transform: translate3d(0,-2px,0);\n  }\n  70% {\n    transform: translate3d(0,-5px,0);\n  }\n  to {\n    visibility: hidden;\n  }\n"]))),C=function(){var t=(0,a.useRef)(null),e=(0,a.useRef)(null),s=(0,a.useRef)(null);return(0,a.useEffect)((function(){if(t.current&&e.current&&s.current){var i=new j(t.current,e.current,s.current);i.start();var o=i.keydown.bind(i),n=i.keyup.bind(i);document.addEventListener("keydown",o),document.addEventListener("keyup",n);var a=function(t){return!!(t.target&&t.target instanceof Element)&&null!==t.target.closest("a")},h=0,r=0,p=!1,c=function(t){a(t)||(t.preventDefault(),t.stopPropagation(),p||(h=t.touches[0].screenX,r=t.touches[0].screenY,p=!0))},u=function(t){a(t)||(t.preventDefault(),t.stopPropagation(),t.touches[0].screenY>r+32&&o({code:"Space"}),t.touches[0].screenX>h+32?(o({code:"ArrowLeft"}),n({code:"ArrowRight"})):t.touches[0].screenX<h-32?(o({code:"ArrowRight"}),n({code:"ArrowLeft"})):(n({code:"ArrowRight"}),n({code:"ArrowLeft"})))},l=function(t){a(t)||(t.preventDefault(),t.stopPropagation(),0===t.touches.length&&(n({code:"Space"}),n({code:"ArrowRight"}),n({code:"ArrowLeft"}),p=!1))};return document.addEventListener("touchstart",c),document.addEventListener("touchmove",u),document.addEventListener("touchend",l),document.addEventListener("touchcancel",l),function(){document.removeEventListener("touchstart",c),document.removeEventListener("touchmove",u),document.removeEventListener("touchend",l),document.removeEventListener("touchcancel",l),document.removeEventListener("keydown",o),document.removeEventListener("keyup",n),i.stop()}}}),[t,e,s]),(0,h.tZ)("main",null,(0,h.tZ)("title",null,"What's poppin?"),(0,h.tZ)("div",{style:{width:"788px",height:"689px",backgroundImage:"url("+D+")",position:"relative"}},(0,h.tZ)("canvas",{ref:t,style:{backgroundColor:"#000",width:"640px",height:"480px",borderRadius:"30px",position:"absolute",left:"74px",top:"188px"},css:Z,width:"640",height:"480"}),(0,h.tZ)("div",{style:{width:"640px",height:"480px",backgroundImage:"url("+S+")",position:"absolute",left:"74px",top:"188px"}}),(0,h.tZ)("div",{ref:s,style:{boxSizing:"border-box",backgroundColor:"rgba(255, 255, 255, 0.8)",borderWidth:"2px",borderStyle:"dotted",borderRadius:"0 20px 20px 20px",borderColor:"white",position:"absolute",width:"540px",height:"85px",left:"124px",bottom:"34px",padding:"10px 20px",fontSize:"20px",lineHeight:"25px",color:"#600",display:"none",animationIterationCount:1,animationFillMode:"forwards"},css:(0,h.iv)("animation:",G," 0.8s ease;&.hide{animation:",U," 0.5s ease;}","")})),(0,h.tZ)("img",{ref:e,src:T,style:{display:"none"}}),(0,h.tZ)("div",{style:{paddingTop:"10px",textAlign:"right",color:"#666"},css:E},(0,h.tZ)("a",{href:"https://github.com/Doramanjyu/z-game",target:"_blank",rel:"noreferrer"},"Source repository")))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-37f217e70c7c8730d0a6.js.map