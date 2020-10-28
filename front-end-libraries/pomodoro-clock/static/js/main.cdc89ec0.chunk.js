(this["webpackJsonpfcc-pomodoroclock"]=this["webpackJsonpfcc-pomodoroclock"]||[]).push([[0],{10:function(e,t,n){},11:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(4),l=n.n(c),u=(n(10),n(1)),o=function(e){var t=e.label,n=e.secondsLeft;return r.a.createElement("div",{className:"timer-display"},r.a.createElement("h2",{id:"timer-label"},t),r.a.createElement("p",{id:"time-left"},function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:n,t=Math.floor(e/60),a=e%60;function r(e){return e<10?"0".concat(e):e}return"".concat(r(t),":").concat(r(a))}(n)))},i=n(2),s=function(e){var t=e.id,n=e.label,a=e.length,c=e.handleChange;return r.a.createElement("div",{className:"length-control"},r.a.createElement("h2",{id:"".concat(t,"-label"),class:"control-label"},n),r.a.createElement("div",{className:"controls"},r.a.createElement("button",{"data-value":"-1",id:"".concat(t,"-decrement"),onClick:c},r.a.createElement("i",null,r.a.createElement(i.a,null))),r.a.createElement("span",{id:"".concat(t,"-length")},a),r.a.createElement("button",{"data-value":"1",id:"".concat(t,"-increment"),onClick:c},r.a.createElement("i",null,r.a.createElement(i.d,null)))))},m=function(e){var t=e.handleStartStop,n=e.isIntervalRunning,a=e.handleReset;return r.a.createElement("div",{className:"timer-controls"},r.a.createElement("button",{id:"start_stop",onClick:t},r.a.createElement("i",null,n?r.a.createElement(i.b,null):r.a.createElement(i.c,null))),r.a.createElement("button",{id:"reset",onClick:a},r.a.createElement("i",null,r.a.createElement(i.e,null))))},f=function(){var e=Object(a.useState)(5),t=Object(u.a)(e,2),n=t[0],c=t[1],l=Object(a.useState)(25),i=Object(u.a)(l,2),f=i[0],d=i[1],E=Object(a.useState)(60*f),b=Object(u.a)(E,2),h=b[0],v=b[1],p=Object(a.useState)("Session"),g=Object(u.a)(p,2),j=g[0],O=g[1],S=Object(a.useRef)(null),k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,n=Object(a.useState)(!1),r=Object(u.a)(n,2),c=r[0],l=r[1],o=Object(a.useRef)(),i=Object(a.useRef)(),s=Object(a.useRef)();return Object(a.useEffect)((function(){o.current=e})),Object(a.useEffect)((function(){return c&&(s.current=Date.now()+t,i.current=setTimeout((function e(){var n=Date.now()-s.current;o.current(),s.current+=t,i.current=setTimeout(e,Math.max(0,t-n))}),t)),function(){return clearTimeout(i.current)}}),[c,t]),{startInterval:function(){return l(!0)},stopInterval:function(){return l(!1)},isIntervalRunning:c}}((function(){return v(h-1)})),I=k.startInterval,R=k.stopInterval,C=k.isIntervalRunning;function N(e,t){return e>0&&t<60||e<0&&t>1}return Object(a.useLayoutEffect)((function(){C||("Session"===j?v(60*f):"Break"===j&&v(60*n))}),[f,n]),Object(a.useEffect)((function(){h<=0&&(S.current.play(),"Session"===j?(v(60*n),O("Break")):"Break"===j&&(v(60*f),O("Session")))}),[h]),r.a.createElement("main",null,r.a.createElement("section",{className:"timerlength-controls"},r.a.createElement(s,{id:"break",label:"Break Length",length:n,handleChange:function(e){if(!C){var t=parseInt(e.currentTarget.dataset.value,10);N(t,n)&&c(n+t)}}}),r.a.createElement(s,{id:"session",label:"Session Length",length:f,handleChange:function(e){if(!C){var t=parseInt(e.currentTarget.dataset.value,10);N(t,f)&&d(f+t)}}})),r.a.createElement("section",{className:"timer"},r.a.createElement(o,{label:j,secondsLeft:h}),r.a.createElement(m,{handleStartStop:function(){C?R():I()},isIntervalRunning:C,handleReset:function(){R(),O("Session"),v(60*f),S.current.pause(),S.current.currentTime=0,d(25),c(5)}}),r.a.createElement("audio",{ref:S,id:"beep",src:"https://goo.gl/65cBl1"})))},d=function(){return r.a.createElement("div",{className:"page-wrapper"},r.a.createElement("header",null,r.a.createElement("h1",null,"Pomodoro Clock")),r.a.createElement(f,null))};l.a.render(r.a.createElement(d,null),document.getElementById("root"))},5:function(e,t,n){e.exports=n(11)}},[[5,1,2]]]);
//# sourceMappingURL=main.cdc89ec0.chunk.js.map