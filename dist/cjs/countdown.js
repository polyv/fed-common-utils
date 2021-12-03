"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Countdown=void 0;var computes=[{divisor:86400,unit:"days"},{divisor:3600,unit:"hours"},{divisor:60,unit:"minutes"},{divisor:1,unit:"seconds"}],Countdown=function(){function t(t,i){if(t|=0,isNaN(t))throw new Error("Total seconds must be a number");this._totalMSecs=1e3*t,this._cb=i}return t.prototype._exec=function(){var t=this;if(this._startTime&&null!=this._usingMSecs){var i=Math.max(0,this._usingMSecs-(Date.now()-this._startTime));if(i>0&&setTimeout((function(){t._exec()}),1e3),this._remainingMSecs=i,i>=0){var s={days:0,hours:0,minutes:0,seconds:0,totalMsecs:i};i=Math.round(i/1e3),computes.forEach((function(t,e){s[t.unit]=i/t.divisor,e===computes.length-1?s[t.unit]=Math.round(s[t.unit]):(s[t.unit]=Math.floor(s[t.unit]),i%=t.divisor)})),this._cb(s)}}},t.prototype.start=function(){null==this._usingMSecs&&(this._usingMSecs=this._totalMSecs),this._usingMSecs<=0||(this._startTime=Date.now(),this._exec())},t.prototype._break=function(){this._timerId&&clearTimeout(this._timerId),this._startTime=void 0},t.prototype.stop=function(){this._break(),this._usingMSecs=this._totalMSecs},t.prototype.pause=function(){this._break(),this._usingMSecs=this._remainingMSecs},t}();exports.Countdown=Countdown;