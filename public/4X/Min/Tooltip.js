/*@license
ARIA Tooltip Module 2.1 for Apex 4X
Author: Bryan Garaventa (https://www.linkedin.com/in/bgaraventa)
Home: WhatSock.com  :  Download: https://github.com/whatsock/apex
License: MIT (https://opensource.org/licenses/MIT)
*/
"setTooltip"in $A||($A.addWidgetProfile("Tooltip",{configure:function(e){return{delay:0,delayTimeout:0,isError:!1,isFocusOnly:!1,isResponsive:!1,isManualOpen:!1,isManualClose:!0,isAlert:!1,announce:!1,exposeBounds:!0,preload:!0,preloadImages:!0,preloadCSS:!0,className:"tooltip",allowRerender:!1,escToClose:!0,returnFocus:!1,mouseLeave:function(e,t){t.remove()},click:function(e,t){t.remove(),e.stopPropagation(),e.preventDefault()},onCreate:function(e){e.isManualOpen&&$A.isNode(e.triggerNode)&&("button"===e.triggerNode.getAttribute("role")||!e.triggerNode.hasAttribute("role")&&"button"===e.triggerNode.nodeName.toLowerCase())&&e.triggerNode.setAttribute("aria-pressed","false")}}},role:function(e){return{role:"region","aria-label":e.isError&&!e.isResponsive?"Error":"Tooltip"}},innerRole:function(e){return{role:"tooltip"}},afterFetch:function(e,t){e.isError||e.isFocusOnly||e.isResponsive||e.isManualOpen||e.isAlert||e.isIE||(e.noRepeat=!0,$A.setAttr(e.target,"aria-description",$A.getText($A.morph(t))))},afterRender:function(e,t){e.isError||e.isResponsive||e.isIE?e.speak():e.noRepeat||$A.setAttr(e.target,"aria-describedby",t.id),e.isManualOpen&&$A.isNode(e.triggerNode)&&("button"===e.triggerNode.getAttribute("role")||!e.triggerNode.hasAttribute("role")&&"button"===e.triggerNode.nodeName.toLowerCase())&&e.triggerNode.setAttribute("aria-pressed","true")},afterRemove:function(e,t){$A.remAttr(e.target,"aria-describedby"),e.isManualOpen&&$A.isNode(e.triggerNode)&&("button"===e.triggerNode.getAttribute("role")||!e.triggerNode.hasAttribute("role")&&"button"===e.triggerNode.nodeName.toLowerCase())&&e.triggerNode.setAttribute("aria-pressed","false")}}),$A.extend({setTooltip:function(e,a){if(this._4X&&(a=e,e=this._X),$A.isPlainObject(e)&&(e=(a=e).trigger||a.content||null),!e)return null;function l(r){return $A.extend({widgetType:"Tooltip",speak:function(e){var t=this;return e=e||t.text(),t.noRepeat||($A.announce.clear(),setTimeout(function(){$A.announce(e,t.suppressRepeat,t.isAlert)},1)),t},validate:function(e,t){if(!t.value)return e.isValid=!1,e.content;e.isValid=!0},validateCondition:function(e){if(!e.isError&&!e.isResponsive)return e;var t=e.validate(e,e.target)||!1;t&&!$A.isBool(t)&&(e.loaded&&e.speak(t),e.insert(t)),$A.isFn(e.onValidate)&&e.onValidate(e,e.target)},on:{focus:function(e,t){t.isError||t.isResponsive||t.isManualOpen||this!==r?(t.isError||t.isResponsive)&&(t.isError&&t.remove(),t.validate(t,t.target),$A.isFn(t.onValidate)&&t.onValidate(t,t.target)):t.render()},blur:function(e,t){t.isError?t.isResponsive||t.validateCondition(t):$A.isTouch||t.remove()},touchstart:function(e,t){t.isError||t.isResponsive||t.isManualOpen?(t.isError||t.isResponsive)&&(t.isError&&t.remove(),t.validate(t,t.target),$A.isFn(t.onValidate)&&t.onValidate(t,t.target)):t.render()},click:function(e,t){t.isError||!t.isManualOpen||t.loaded?!t.isError&&t.isManualOpen&&t.loaded&&(t.remove(),e.stopPropagation(),e.preventDefault()):(t.render(),e.stopPropagation(),e.preventDefault())},mouseenter:function(e,t){t.isError||t.isManualOpen||t.isFocusOnly||t.isResponsive||t.render()},mouseleave:function(e,t){t.isError||t.isManualClose||t.isFocusOnly||t.isResponsive||t.remove()},keyup:function(e,t){t.isResponsive&&t.target.value!==t.value?(t.value=t.target.value,t.validateCondition(t)):(t.isError||t.isResponsive)&&(t.validate(t,t.target),$A.isFn(t.onValidate)&&t.onValidate(t,t.target))},change:function(e,t){t.isResponsive&&t.target.value!==t.value?(t.value=t.target.value,t.validateCondition(t)):(t.isError||t.isResponsive)&&(t.validate(t,t.target),$A.isFn(t.onValidate)&&t.onValidate(t,t.target))}}},a||{})}(a=a||{}).isIE=$A.isIE();var u=[];return $A.query(e,a.context||document,function(e,t){var r=null,i=null,o=a.id||t.id||$A.genId();if(!a.isError&&a.isResponsive&&(a.isError=!0),$A.hasAttr(t,"data-tooltip")){var n=$A.getAttr(t,"data-tooltip");r={id:$A.hasDC(o)?$A.genId():o,target:t,trigger:t},$A.isPath(n)?r.fetch=$A.toFetch(n):r.content=$A.morph(n)}if($A.hasAttr(t,"data-error")){var s=$A.getAttr(t,"data-error");i={id:$A.hasDC(o)?$A.genId():o,target:t,trigger:t,isError:!0},$A.isPath(s)?i.fetch=$A.toFetch(s):i.content=$A.morph(s)}i&&u.push($A.toDC($A.extend(l(t),i))),r&&(u.push($A.toDC($A.extend(l(t),r))),!r.content||a.isFocusOnly||a.isError||a.isResponsive||a.isManualOpen||a.isAlert||a.isIE||$A.setAttr(t,"aria-description",$A.getText(r.content))),i||r||(u.push($A.toDC($A.extend(l(t),{id:$A.hasDC(o)?$A.genId():o,target:t,trigger:t}))),!a.content||a.isFocusOnly||a.isError||a.isResponsive||a.isManualOpen||a.isAlert||a.isIE||$A.setAttr(t,"aria-description",$A.getText($A.morph(a.content))))}),1===u.length?u[0]:u}}));