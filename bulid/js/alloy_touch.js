!function(){"use strict";Date.now||(Date.now=function(){return(new Date).getTime()});for(var t=["webkit","moz"],i=0;i<t.length&&!window.requestAnimationFrame;++i){var e=t[i];window.requestAnimationFrame=window[e+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e+"CancelAnimationFrame"]||window[e+"CancelRequestAnimationFrame"]}if(/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)||!window.requestAnimationFrame||!window.cancelAnimationFrame){var s=0;window.requestAnimationFrame=function(t){var i=Date.now(),e=Math.max(s+16,i);return setTimeout(function(){t(s=e)},e-i)},window.cancelAnimationFrame=clearTimeout}}(),function(){function t(t,i,e){t.addEventListener(i,e,!1)}function i(t){return Math.sqrt(1-Math.pow(t-1,2))}function e(t){return 1-Math.sqrt(1-t*t)}function s(t,i){for(var e in i)if(i[e].test(t[e]))return!0;return!1}var h=function(i){this.element="string"==typeof i.touch?document.querySelector(i.touch):i.touch,this.target=this._getValue(i.target,this.element),this.vertical=this._getValue(i.vertical,!0),this.property=i.property,this.tickID=0,this.initialValue=this._getValue(i.initialValue,this.target[this.property]),this.target[this.property]=this.initialValue,this.fixed=this._getValue(i.fixed,!1),this.sensitivity=this._getValue(i.sensitivity,1),this.moveFactor=this._getValue(i.moveFactor,1),this.factor=this._getValue(i.factor,1),this.outFactor=this._getValue(i.outFactor,.3),this.min=i.min,this.max=i.max,this.deceleration=6e-4,this.maxRegion=this._getValue(i.maxRegion,600),this.springMaxRegion=this._getValue(i.springMaxRegion,60),this.maxSpeed=i.maxSpeed,this.hasMaxSpeed=!(void 0===this.maxSpeed),this.lockDirection=this._getValue(i.lockDirection,!0);var e=function(){};if(this.change=i.change||e,this.touchEnd=i.touchEnd||e,this.touchStart=i.touchStart||e,this.touchMove=i.touchMove||e,this.touchCancel=i.touchCancel||e,this.reboundEnd=i.reboundEnd||e,this.animationEnd=i.animationEnd||e,this.correctionEnd=i.correctionEnd||e,this.tap=i.tap||e,this.pressMove=i.pressMove||e,this.preventDefault=this._getValue(i.preventDefault,!0),this.preventDefaultException={tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},this.hasMin=!(void 0===this.min),this.hasMax=!(void 0===this.max),this.hasMin&&this.hasMax&&this.min>this.max)throw"the min value can't be greater than the max value.";this.isTouchStart=!1,this.step=i.step,this.inertia=this._getValue(i.inertia,!0),this._calculateIndex(),this.eventTarget=window,i.bindSelf&&(this.eventTarget=this.element),this._moveHandler=this._move.bind(this),t(this.element,"touchstart",this._start.bind(this)),t(this.eventTarget,"touchend",this._end.bind(this)),t(this.eventTarget,"touchcancel",this._cancel.bind(this)),this.eventTarget.addEventListener("touchmove",this._moveHandler,{passive:!1,capture:!1}),this.x1=this.x2=this.y1=this.y2=null};h.prototype={_getValue:function(t,i){return void 0===t?i:t},_start:function(t){this.isTouchStart=!0,this.touchStart.call(this,t,this.target[this.property]),cancelAnimationFrame(this.tickID),this._calculateIndex(),this.startTime=(new Date).getTime(),this.x1=this.preX=t.touches[0].pageX,this.y1=this.preY=t.touches[0].pageY,this.start=this.vertical?this.preY:this.preX,this._firstTouchMove=!0,this._preventMove=!1},_move:function(t){if(this.isTouchStart){var i=t.touches.length,e=t.touches[0].pageX,h=t.touches[0].pageY;if(this._firstTouchMove&&this.lockDirection){var a=Math.abs(e-this.x1)-Math.abs(h-this.y1);a>0&&this.vertical?this._preventMove=!0:a<0&&!this.vertical&&(this._preventMove=!0),this._firstTouchMove=!1}if(!this._preventMove){var n=(this.vertical?h-this.preY:e-this.preX)*this.sensitivity,o=this.moveFactor;this.hasMax&&this.target[this.property]>this.max&&n>0?o=this.outFactor:this.hasMin&&this.target[this.property]<this.min&&n<0&&(o=this.outFactor),n*=o,this.preX=e,this.preY=h,this.fixed||(this.target[this.property]+=n),this.change.call(this,this.target[this.property]);var r=(new Date).getTime();r-this.startTime>300&&(this.startTime=r,this.start=this.vertical?this.preY:this.preX),this.touchMove.call(this,t,this.target[this.property])}this.preventDefault&&!s(t.target,this.preventDefaultException)&&t.preventDefault(),1===i&&(null!==this.x2?(t.deltaX=e-this.x2,t.deltaY=h-this.y2):(t.deltaX=0,t.deltaY=0),this.pressMove.call(this,t,this.target[this.property])),this.x2=e,this.y2=h}},_cancel:function(t){var i=this.target[this.property];this.touchCancel.call(this,t,i),this._end(t)},to:function(t,e,s){this._to(t,this._getValue(e,600),s||i,this.change,function(t){this._calculateIndex(),this.reboundEnd.call(this,t),this.animationEnd.call(this,t)}.bind(this))},_calculateIndex:function(){this.hasMax&&this.hasMin&&(this.currentPage=Math.round((this.max-this.target[this.property])/this.step))},_end:function(t){if(this.isTouchStart){this.isTouchStart=!1;var s=this,h=this.target[this.property],a=Math.abs(t.changedTouches[0].pageX-this.x1)<30&&Math.abs(t.changedTouches[0].pageY-this.y1)<30;if(a&&this.tap.call(this,t,h),!1===this.touchEnd.call(this,t,h,this.currentPage))return;if(this.hasMax&&h>this.max)this._to(this.max,200,i,this.change,function(t){this.reboundEnd.call(this,t),this.animationEnd.call(this,t)}.bind(this));else if(this.hasMin&&h<this.min)this._to(this.min,200,i,this.change,function(t){this.reboundEnd.call(this,t),this.animationEnd.call(this,t)}.bind(this));else if(!this.inertia||a||this._preventMove)s._correction();else{var n=(new Date).getTime()-this.startTime;if(n<300){var o=((this.vertical?t.changedTouches[0].pageY:t.changedTouches[0].pageX)-this.start)*this.sensitivity,r=Math.abs(o)/n,c=this.factor*r;this.hasMaxSpeed&&c>this.maxSpeed&&(c=this.maxSpeed);var l=h+c*c/(2*this.deceleration)*(o<0?-1:1),u=1;l<this.min?l<this.min-this.maxRegion?(u=e((h-this.min+this.springMaxRegion)/(h-l)),l=this.min-this.springMaxRegion):(u=e((h-this.min+this.springMaxRegion*(this.min-l)/this.maxRegion)/(h-l)),l=this.min-this.springMaxRegion*(this.min-l)/this.maxRegion):l>this.max&&(l>this.max+this.maxRegion?(u=e((this.max+this.springMaxRegion-h)/(l-h)),l=this.max+this.springMaxRegion):(u=e((this.max+this.springMaxRegion*(l-this.max)/this.maxRegion-h)/(l-h)),l=this.max+this.springMaxRegion*(l-this.max)/this.maxRegion));var m=Math.round(r/s.deceleration)*u;s._to(Math.round(l),m,i,s.change,function(t){s.hasMax&&s.target[s.property]>s.max?(cancelAnimationFrame(s.tickID),s._to(s.max,600,i,s.change,s.animationEnd)):s.hasMin&&s.target[s.property]<s.min?(cancelAnimationFrame(s.tickID),s._to(s.min,600,i,s.change,s.animationEnd)):s.step?s._correction():s.animationEnd.call(s,t),s.change.call(this,t)})}else s._correction()}}this.x1=this.x2=this.y1=this.y2=null},_to:function(t,i,e,s,h){if(!this.fixed){var a=this.target,n=this.property,o=a[n],r=t-o,c=new Date,l=this,u=function(){var m=new Date-c;if(m>=i)return a[n]=t,s&&s.call(l,t),void(h&&h.call(l,t));a[n]=r*e(m/i)+o,l.tickID=requestAnimationFrame(u),s&&s.call(l,a[n])};u()}},_correction:function(){if(void 0!==this.step){var t=this.target[this.property],e=Math.floor(Math.abs(t/this.step)),s=t%this.step;Math.abs(s)>this.step/2?this._to((t<0?-1:1)*(e+1)*this.step,400,i,this.change,function(t){this._calculateIndex(),this.correctionEnd.call(this,t),this.animationEnd.call(this,t)}.bind(this)):this._to((t<0?-1:1)*e*this.step,400,i,this.change,function(t){this._calculateIndex(),this.correctionEnd.call(this,t),this.animationEnd.call(this,t)}.bind(this))}}},"undefined"!=typeof module&&"object"==typeof exports?module.exports=h:window.AlloyTouch=h}();