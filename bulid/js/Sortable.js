!function(t){"use strict";"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module&&void 0!==module.exports?module.exports=t():window.Sortable=t()}(function(){"use strict";function t(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, and not "+{}.toString.call(t);this.el=t,this.options=e=_({},e),t[V]=this;var n={group:Math.random(),sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,draggable:/[uo]l/i.test(t.nodeName)?"li":">*",ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0}};for(var i in n)!(i in e)&&(e[i]=n[i]);rt(e);for(var o in this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&K,a(t,"mousedown",this._onTapStart),a(t,"touchstart",this._onTapStart),a(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(a(t,"dragover",this),a(t,"dragenter",this)),ot.push(this._onDragOver),e.store&&this.sort(e.store.get(this))}function e(t,e){"clone"!==t.lastPullMode&&(e=!0),S&&S.state!==e&&(l(S,"display",e?"none":""),e||S.state&&(t.options.group.revertClone?(E.insertBefore(S,x),t._animate(w,S)):E.insertBefore(S,w)),S.state=e)}function n(t,e,n){if(t){n=n||z;do{if(">*"===e&&t.parentNode===n||m(t,e))return t}while(t=i(t))}return null}function i(t){var e=t.host;return e&&e.nodeType?e:t.parentNode}function o(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move"),t.preventDefault()}function a(t,e,n){t.addEventListener(e,n,J)}function r(t,e,n){t.removeEventListener(e,n,J)}function s(t,e,n){if(t)if(t.classList)t.classList[n?"add":"remove"](e);else{var i=(" "+t.className+" ").replace(H," ").replace(" "+e+" "," ");t.className=(i+(n?" "+e:"")).replace(H," ")}}function l(t,e,n){var i=t&&t.style;if(i){if(void 0===n)return z.defaultView&&z.defaultView.getComputedStyle?n=z.defaultView.getComputedStyle(t,""):t.currentStyle&&(n=t.currentStyle),void 0===e?n:n[e];e in i||(e="-webkit-"+e),i[e]=n+("string"==typeof n?"":"px")}}function c(t,e,n){if(t){var i=t.getElementsByTagName(e),o=0,a=i.length;if(n)for(;o<a;o++)n(i[o],o);return i}return[]}function d(t,e,n,i,o,a,r){t=t||e[V];var s=z.createEvent("Event"),l=t.options,c="on"+n.charAt(0).toUpperCase()+n.substr(1);s.initEvent(n,!0,!0),s.to=e,s.from=o||e,s.item=i||e,s.clone=S,s.oldIndex=a,s.newIndex=r,e.dispatchEvent(s),l[c]&&l[c].call(t,s)}function h(t,e,n,i,o,a,r){var s,l,c=t[V],d=c.options.onMove;return(s=z.createEvent("Event")).initEvent("move",!0,!0),s.to=e,s.from=t,s.dragged=n,s.draggedRect=i,s.related=o||e,s.relatedRect=a||e.getBoundingClientRect(),t.dispatchEvent(s),d&&(l=d.call(c,s,r)),l}function u(t){t.draggable=!1}function f(){tt=!1}function p(t,e){var n=t.lastElementChild,i=n.getBoundingClientRect();return(e.clientY-(i.top+i.height)>5||e.clientX-(i.right+i.width)>5)&&n}function g(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,n=e.length,i=0;n--;)i+=e.charCodeAt(n);return i.toString(36)}function v(t,e){var n=0;if(!t||!t.parentNode)return-1;for(;t&&(t=t.previousElementSibling);)"TEMPLATE"===t.nodeName.toUpperCase()||">*"!==e&&!m(t,e)||n++;return n}function m(t,e){if(t){var n=(e=e.split(".")).shift().toUpperCase(),i=new RegExp("\\s("+e.join("|")+")(?=\\s)","g");return!(""!==n&&t.nodeName.toUpperCase()!=n||e.length&&((" "+t.className+" ").match(i)||[]).length!=e.length)}return!1}function b(t,e){var n,i;return function(){void 0===n&&(n=arguments,i=this,setTimeout(function(){1===n.length?t.call(i,n[0]):t.apply(i,n),n=void 0},e))}}function _(t,e){if(t&&e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function D(t){return Q?Q(t).clone(!0)[0]:Z&&Z.dom?Z.dom(t).cloneNode(!0):t.cloneNode(!0)}function y(t){for(var e=t.getElementsByTagName("input"),n=e.length;n--;){var i=e[n];i.checked&&it.push(i)}}if("undefined"==typeof window||!window.document)return function(){throw new Error("Sortable.js requires a window with a document")};var w,T,C,S,E,x,N,k,B,Y,O,X,M,A,P,R,I,L,F,U,j={},H=/\s+/g,W=/left|right|inline/,V="Sortable"+(new Date).getTime(),q=window,z=q.document,G=q.parseInt,Q=q.jQuery||q.Zepto,Z=q.Polymer,J=!1,K=!!("draggable"in z.createElement("div")),$=function(t){return!navigator.userAgent.match(/Trident.*rv[ :]?11\./)&&(t=z.createElement("x"),t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents)}(),tt=!1,et=Math.abs,nt=Math.min,it=[],ot=[],at=b(function(t,e,n){if(n&&e.scroll){var i,o,a,r,s,l,c=n[V],d=e.scrollSensitivity,h=e.scrollSpeed,u=t.clientX,f=t.clientY,p=window.innerWidth,g=window.innerHeight;if(B!==n&&(k=e.scroll,B=n,Y=e.scrollFn,!0===k)){k=n;do{if(k.offsetWidth<k.scrollWidth||k.offsetHeight<k.scrollHeight)break}while(k=k.parentNode)}k&&(i=k,o=k.getBoundingClientRect(),a=(et(o.right-u)<=d)-(et(o.left-u)<=d),r=(et(o.bottom-f)<=d)-(et(o.top-f)<=d)),a||r||(r=(g-f<=d)-(f<=d),((a=(p-u<=d)-(u<=d))||r)&&(i=q)),j.vx===a&&j.vy===r&&j.el===i||(j.el=i,j.vx=a,j.vy=r,clearInterval(j.pid),i&&(j.pid=setInterval(function(){if(l=r?r*h:0,s=a?a*h:0,"function"==typeof Y)return Y.call(c,s,l,t);i===q?q.scrollTo(q.pageXOffset+s,q.pageYOffset+l):(i.scrollTop+=l,i.scrollLeft+=s)},24)))}},30),rt=function(t){function e(t,e){return void 0!==t&&!0!==t||(t=n.name),"function"==typeof t?t:function(n,i){var o=i.options.group.name;return e?t:t&&(t.join?t.indexOf(o)>-1:o==t)}}var n={},i=t.group;i&&"object"==typeof i||(i={name:i}),n.name=i.name,n.checkPull=e(i.pull,!0),n.checkPut=e(i.put),n.revertClone=i.revertClone,t.group=n};t.prototype={constructor:t,_onTapStart:function(t){var e,i=this,o=this.el,a=this.options,r=a.preventOnFilter,s=t.type,l=t.touches&&t.touches[0],c=(l||t).target,h=t.target.shadowRoot&&t.path[0]||c,u=a.filter;if(y(o),!w&&!("mousedown"===s&&0!==t.button||a.disabled)&&(c=n(c,a.draggable,o))&&N!==c){if(e=v(c,a.draggable),"function"==typeof u){if(u.call(this,t,c,this))return d(i,h,"filter",c,o,e),void(r&&t.preventDefault())}else if(u&&(u=u.split(",").some(function(t){if(t=n(h,t.trim(),o))return d(i,t,"filter",c,o,e),!0})))return void(r&&t.preventDefault());a.handle&&!n(h,a.handle,o)||this._prepareDragStart(t,l,c,e)}},_prepareDragStart:function(t,e,n,i){var o,r=this,l=r.el,h=r.options,f=l.ownerDocument;n&&!w&&n.parentNode===l&&(L=t,E=l,T=(w=n).parentNode,x=w.nextSibling,N=n,R=h.group,A=i,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,w.style["will-change"]="transform",o=function(){r._disableDelayedDrag(),w.draggable=r.nativeDraggable,s(w,h.chosenClass,!0),r._triggerDragStart(t,e),d(r,E,"choose",w,E,A)},h.ignore.split(",").forEach(function(t){c(w,t.trim(),u)}),a(f,"mouseup",r._onDrop),a(f,"touchend",r._onDrop),a(f,"touchcancel",r._onDrop),a(f,"pointercancel",r._onDrop),a(f,"selectstart",r),h.delay?(a(f,"mouseup",r._disableDelayedDrag),a(f,"touchend",r._disableDelayedDrag),a(f,"touchcancel",r._disableDelayedDrag),a(f,"mousemove",r._disableDelayedDrag),a(f,"touchmove",r._disableDelayedDrag),a(f,"pointermove",r._disableDelayedDrag),r._dragStartTimer=setTimeout(o,h.delay)):o())},_disableDelayedDrag:function(){var t=this.el.ownerDocument;clearTimeout(this._dragStartTimer),r(t,"mouseup",this._disableDelayedDrag),r(t,"touchend",this._disableDelayedDrag),r(t,"touchcancel",this._disableDelayedDrag),r(t,"mousemove",this._disableDelayedDrag),r(t,"touchmove",this._disableDelayedDrag),r(t,"pointermove",this._disableDelayedDrag)},_triggerDragStart:function(t,e){(e=e||("touch"==t.pointerType?t:null))?(L={target:w,clientX:e.clientX,clientY:e.clientY},this._onDragStart(L,"touch")):this.nativeDraggable?(a(w,"dragend",this),a(E,"dragstart",this._onDragStart)):this._onDragStart(L,!0);try{z.selection?setTimeout(function(){z.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(){if(E&&w){var e=this.options;s(w,e.ghostClass,!0),s(w,e.dragClass,!1),t.active=this,d(this,E,"start",w,E,A)}else this._nulling()},_emulateDragOver:function(){if(F){if(this._lastX===F.clientX&&this._lastY===F.clientY)return;this._lastX=F.clientX,this._lastY=F.clientY,$||l(C,"display","none");var t=z.elementFromPoint(F.clientX,F.clientY),e=t,n=ot.length;if(e)do{if(e[V]){for(;n--;)ot[n]({clientX:F.clientX,clientY:F.clientY,target:t,rootEl:e});break}t=e}while(e=e.parentNode);$||l(C,"display","")}},_onTouchMove:function(e){if(L){var n=this.options,i=n.fallbackTolerance,o=n.fallbackOffset,a=e.touches?e.touches[0]:e,r=a.clientX-L.clientX+o.x,s=a.clientY-L.clientY+o.y,c=e.touches?"translate3d("+r+"px,"+s+"px,0)":"translate("+r+"px,"+s+"px)";if(!t.active){if(i&&nt(et(a.clientX-this._lastX),et(a.clientY-this._lastY))<i)return;this._dragStarted()}this._appendGhost(),U=!0,F=a,l(C,"webkitTransform",c),l(C,"mozTransform",c),l(C,"msTransform",c),l(C,"transform",c),e.preventDefault()}},_appendGhost:function(){if(!C){var t,e=w.getBoundingClientRect(),n=l(w),i=this.options;s(C=w.cloneNode(!0),i.ghostClass,!1),s(C,i.fallbackClass,!0),s(C,i.dragClass,!0),l(C,"top",e.top-G(n.marginTop,10)),l(C,"left",e.left-G(n.marginLeft,10)),l(C,"width",e.width),l(C,"height",e.height),l(C,"opacity","0.8"),l(C,"position","fixed"),l(C,"zIndex","100000"),l(C,"pointerEvents","none"),i.fallbackOnBody&&z.body.appendChild(C)||E.appendChild(C),t=C.getBoundingClientRect(),l(C,"width",2*e.width-t.width),l(C,"height",2*e.height-t.height)}},_onDragStart:function(t,e){var n=t.dataTransfer,i=this.options;this._offUpEvents(),R.checkPull(this,this,w,t)&&((S=D(w)).draggable=!1,S.style["will-change"]="",l(S,"display","none"),s(S,this.options.chosenClass,!1),E.insertBefore(S,w),d(this,E,"clone",w)),s(w,i.dragClass,!0),e?("touch"===e?(a(z,"touchmove",this._onTouchMove),a(z,"touchend",this._onDrop),a(z,"touchcancel",this._onDrop),a(z,"pointermove",this._onTouchMove),a(z,"pointerup",this._onDrop)):(a(z,"mousemove",this._onTouchMove),a(z,"mouseup",this._onDrop)),this._loopId=setInterval(this._emulateDragOver,50)):(n&&(n.effectAllowed="move",i.setData&&i.setData.call(this,n,w)),a(z,"drop",this),setTimeout(this._dragStarted,0))},_onDragOver:function(i){var o,a,r,s,c=this.el,d=this.options,u=d.group,g=t.active,v=R===u,m=!1,b=d.sort;if(void 0!==i.preventDefault&&(i.preventDefault(),!d.dragoverBubble&&i.stopPropagation()),!w.animated&&(U=!0,g&&!d.disabled&&(v?b||(s=!E.contains(w)):I===this||(g.lastPullMode=R.checkPull(this,g,w,i))&&u.checkPut(this,g,w,i))&&(void 0===i.rootEl||i.rootEl===this.el))){if(at(i,d,this.el),tt)return;if(o=n(i.target,d.draggable,c),a=w.getBoundingClientRect(),I!==this&&(I=this,m=!0),s)return e(g,!0),T=E,void(S||x?E.insertBefore(w,S||x):b||E.appendChild(w));if(0===c.children.length||c.children[0]===C||c===i.target&&(o=p(c,i))){if(o){if(o.animated)return;r=o.getBoundingClientRect()}e(g,v),!1!==h(E,c,w,a,o,r,i)&&(w.contains(c)||(c.appendChild(w),T=c),this._animate(a,w),o&&this._animate(r,o))}else if(o&&!o.animated&&o!==w&&void 0!==o.parentNode[V]){O!==o&&(O=o,X=l(o),M=l(o.parentNode));var _=(r=o.getBoundingClientRect()).right-r.left,D=r.bottom-r.top,y=W.test(X.cssFloat+X.display)||"flex"==M.display&&0===M["flex-direction"].indexOf("row"),N=o.offsetWidth>w.offsetWidth,k=o.offsetHeight>w.offsetHeight,B=(y?(i.clientX-r.left)/_:(i.clientY-r.top)/D)>.5,Y=o.nextElementSibling,A=h(E,c,w,a,o,r,i),P=!1;if(!1!==A){if(tt=!0,setTimeout(f,30),e(g,v),1===A||-1===A)P=1===A;else if(y){var L=w.offsetTop,F=o.offsetTop;P=L===F?o.previousElementSibling===w&&!N||B&&N:o.previousElementSibling===w||w.previousElementSibling===o?(i.clientY-r.top)/D>.5:F>L}else m||(P=Y!==w&&!k||B&&k);w.contains(c)||(P&&!Y?c.appendChild(w):o.parentNode.insertBefore(w,P?Y:o)),T=w.parentNode,this._animate(a,w),this._animate(r,o)}}}},_animate:function(t,e){var n=this.options.animation;if(n){var i=e.getBoundingClientRect();1===t.nodeType&&(t=t.getBoundingClientRect()),l(e,"transition","none"),l(e,"transform","translate3d("+(t.left-i.left)+"px,"+(t.top-i.top)+"px,0)"),e.offsetWidth,l(e,"transition","all "+n+"ms"),l(e,"transform","translate3d(0,0,0)"),clearTimeout(e.animated),e.animated=setTimeout(function(){l(e,"transition",""),l(e,"transform",""),e.animated=!1},n)}},_offUpEvents:function(){var t=this.el.ownerDocument;r(z,"touchmove",this._onTouchMove),r(z,"pointermove",this._onTouchMove),r(t,"mouseup",this._onDrop),r(t,"touchend",this._onDrop),r(t,"pointerup",this._onDrop),r(t,"touchcancel",this._onDrop),r(t,"selectstart",this)},_onDrop:function(e){var n=this.el,i=this.options;clearInterval(this._loopId),clearInterval(j.pid),clearTimeout(this._dragStartTimer),r(z,"mousemove",this._onTouchMove),this.nativeDraggable&&(r(z,"drop",this),r(n,"dragstart",this._onDragStart)),this._offUpEvents(),e&&(U&&(e.preventDefault(),!i.dropBubble&&e.stopPropagation()),C&&C.parentNode.removeChild(C),E!==T&&"clone"===t.active.lastPullMode||S&&S.parentNode.removeChild(S),w&&(this.nativeDraggable&&r(w,"dragend",this),u(w),w.style["will-change"]="",s(w,this.options.ghostClass,!1),s(w,this.options.chosenClass,!1),E!==T?(P=v(w,i.draggable))>=0&&(d(null,T,"add",w,E,A,P),d(this,E,"remove",w,E,A,P),d(null,T,"sort",w,E,A,P),d(this,E,"sort",w,E,A,P)):w.nextSibling!==x&&(P=v(w,i.draggable))>=0&&(d(this,E,"update",w,E,A,P),d(this,E,"sort",w,E,A,P)),t.active&&(null!=P&&-1!==P||(P=A),d(this,E,"end",w,E,A,P),this.save()))),this._nulling()},_nulling:function(){E=w=T=C=x=S=N=k=B=L=F=U=P=O=X=I=R=t.active=null,it.forEach(function(t){t.checked=!0}),it.length=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragover":case"dragenter":w&&(this._onDragOver(t),o(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],i=this.el.children,o=0,a=i.length,r=this.options;o<a;o++)n(t=i[o],r.draggable,this.el)&&e.push(t.getAttribute(r.dataIdAttr)||g(t));return e},sort:function(t){var e={},i=this.el;this.toArray().forEach(function(t,o){var a=i.children[o];n(a,this.options.draggable,i)&&(e[t]=a)},this),t.forEach(function(t){e[t]&&(i.removeChild(e[t]),i.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set(this)},closest:function(t,e){return n(t,e||this.options.draggable,this.el)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];n[t]=e,"group"===t&&rt(n)},destroy:function(){var t=this.el;t[V]=null,r(t,"mousedown",this._onTapStart),r(t,"touchstart",this._onTapStart),r(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(r(t,"dragover",this),r(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),ot.splice(ot.indexOf(this._onDragOver),1),this._onDrop(),this.el=t=null}},a(z,"touchmove",function(e){t.active&&e.preventDefault()});try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){J={capture:!1,passive:!1}}}))}catch(t){}return t.utils={on:a,off:r,css:l,find:c,is:function(t,e){return!!n(t,e,t)},extend:_,throttle:b,closest:n,toggleClass:s,clone:D,index:v},t.create=function(e,n){return new t(e,n)},t.version="1.5.1",t});