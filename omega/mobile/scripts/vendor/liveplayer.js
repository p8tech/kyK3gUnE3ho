!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.liveplayer=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    }
    else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],2:[function(_dereq_,module,exports){
function X2JS(a,b,c){function d(a){var b=a.localName;return null==b&&(b=a.baseName),(null==b||""==b)&&(b=a.nodeName),b}function e(a){return a.prefix}function f(a){return"string"==typeof a?a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):a}function g(a){return a.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&#x2F;/g,"/")}function h(f){if(f.nodeType==u.DOCUMENT_NODE){var i,j,k,l=f.firstChild;for(j=0,k=f.childNodes.length;k>j;j+=1)if(f.childNodes[j].nodeType!==u.COMMENT_NODE){l=f.childNodes[j];break}if(c)i=h(l);else{i={};var m=d(l);i[m]=h(l)}return i}if(f.nodeType==u.ELEMENT_NODE){var i=new Object;i.__cnt=0;for(var n=f.childNodes,o=0;o<n.length;o++){var l=n.item(o),m=d(l);if(i.__cnt++,null==i[m])i[m]=h(l),i[m+"_asArray"]=new Array(1),i[m+"_asArray"][0]=i[m];else{if(null!=i[m]&&!(i[m]instanceof Array)){var p=i[m];i[m]=new Array,i[m][0]=p,i[m+"_asArray"]=i[m]}for(var q=0;null!=i[m][q];)q++;i[m][q]=h(l)}}for(var r=0;r<f.attributes.length;r++){var s=f.attributes.item(r);i.__cnt++;for(var v=s.value,w=0,x=a.length;x>w;w++){var y=a[w];y.test.call(this,s)&&(v=y.converter.call(this,s.value))}i[b+s.name]=v}var z=e(f);return null!=z&&""!=z&&(i.__cnt++,i.__prefix=z),1==i.__cnt&&null!=i["#text"]&&(i=i["#text"]),null!=i["#text"]&&(i.__text=i["#text"],t&&(i.__text=g(i.__text)),delete i["#text"],delete i["#text_asArray"]),null!=i["#cdata-section"]&&(i.__cdata=i["#cdata-section"],delete i["#cdata-section"],delete i["#cdata-section_asArray"]),(null!=i.__text||null!=i.__cdata)&&(i.toString=function(){return(null!=this.__text?this.__text:"")+(null!=this.__cdata?this.__cdata:"")}),i}return f.nodeType==u.TEXT_NODE||f.nodeType==u.CDATA_SECTION_NODE?f.nodeValue:f.nodeType==u.COMMENT_NODE?null:void 0}function i(a,b,c,d){var e="<"+(null!=a&&null!=a.__prefix?a.__prefix+":":"")+b;if(null!=c)for(var f=0;f<c.length;f++){var g=c[f],h=a[g];e+=" "+g.substr(1)+"='"+h+"'"}return e+=d?"/>":">"}function j(a,b){return"</"+(null!=a.__prefix?a.__prefix+":":"")+b+">"}function k(a,b){return-1!==a.indexOf(b,a.length-b.length)}function l(a,b){return k(b.toString(),"_asArray")||0==b.toString().indexOf("_")||a[b]instanceof Function?!0:!1}function m(a){var b=0;if(a instanceof Object)for(var c in a)l(a,c)||b++;return b}function n(a){var b=[];if(a instanceof Object)for(var c in a)-1==c.toString().indexOf("__")&&0==c.toString().indexOf("_")&&b.push(c);return b}function o(a){var b="";return null!=a.__cdata&&(b+="<![CDATA["+a.__cdata+"]]>"),null!=a.__text&&(b+=t?f(a.__text):a.__text),b}function p(a){var b="";return a instanceof Object?b+=o(a):null!=a&&(b+=t?f(a):a),b}function q(a,b,c){var d="";if(0==a.length)d+=i(a,b,c,!0);else for(var e=0;e<a.length;e++)d+=i(a[e],b,n(a[e]),!1),d+=r(a[e]),d+=j(a[e],b);return d}function r(a){var b="",c=m(a);if(c>0)for(var d in a)if(!l(a,d)){var e=a[d],f=n(e);if(null==e||void 0==e)b+=i(e,d,f,!0);else if(e instanceof Object)if(e instanceof Array)b+=q(e,d,f);else{var g=m(e);g>0||null!=e.__text||null!=e.__cdata?(b+=i(e,d,f,!1),b+=r(e),b+=j(e,d)):b+=i(e,d,f,!0)}else b+=i(e,d,f,!1),b+=p(e),b+=j(e,d)}return b+=p(a)}(null===b||void 0===b)&&(b="_"),(null===c||void 0===c)&&(c=!1);var s="1.0.11",t=!1,u={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};this.parseXmlString=function(a){var b;if(window.DOMParser){var c=new window.DOMParser;b=c.parseFromString(a,"text/xml")}else 0==a.indexOf("<?")&&(a=a.substr(a.indexOf("?>")+2)),b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a);return b},this.xml2json=function(a){return h(a)},this.xml_str2json=function(a){var b=this.parseXmlString(a);return this.xml2json(b)},this.json2xml_str=function(a){return r(a)},this.json2xml=function(a){var b=this.json2xml_str(a);return this.parseXmlString(b)},this.getVersion=function(){return s},this.escapeMode=function(a){t=a}}function ObjectIron(a){var b;for(b=[],i=0,len=a.length;i<len;i+=1)b.push(a[i].isRoot?"root":a[i].name);var c=function(a,b){var c;if(null!==a&&null!==b)for(c in a)a.hasOwnProperty(c)&&(b.hasOwnProperty(c)||(b[c]=a[c]))},d=function(a,b,d){var e,f,g,h,i;if(null!==a&&0!==a.length)for(e=0,f=a.length;f>e;e+=1)g=a[e],b.hasOwnProperty(g.name)&&(d.hasOwnProperty(g.name)?g.merge&&(h=b[g.name],i=d[g.name],"object"==typeof h&&"object"==typeof i?c(h,i):d[g.name]=null!=g.mergeFunction?g.mergeFunction(h,i):h+i):d[g.name]=b[g.name])},e=function(a,b){var c,f,g,h,i,j,k,l=a;if(null!==l.children&&0!==l.children.length)for(c=0,f=l.children.length;f>c;c+=1)if(j=l.children[c],b.hasOwnProperty(j.name))if(j.isArray)for(i=b[j.name+"_asArray"],g=0,h=i.length;h>g;g+=1)k=i[g],d(l.properties,b,k),e(j,k);else k=b[j.name],d(l.properties,b,k),e(j,k)},f=function(c){var d,g,h,i,j,k,l;if(null===c)return c;if("object"!=typeof c)return c;for(d=0,g=b.length;g>d;d+=1)"root"===b[d]&&(j=a[d],k=c,e(j,k));for(i in c)if(c.hasOwnProperty(i)){if(h=b.indexOf(i),-1!==h)if(j=a[h],j.isArray)for(l=c[i+"_asArray"],d=0,g=l.length;g>d;d+=1)k=l[d],e(j,k);else k=c[i],e(j,k);f(c[i])}return c};return{run:f}}function intTobitArray(a,b){for(var c=[],d=0;b>d;d++)c.push((a&Math.pow(2,d))>0);return c}if(function(a){"use strict";var b={VERSION:"0.5.3"};b.System=function(){this._mappings={},this._outlets={},this._handlers={},this.strictInjections=!0,this.autoMapOutlets=!1,this.postInjectionHook="setup"},b.System.prototype={_createAndSetupInstance:function(a,b){var c=new b;return this.injectInto(c,a),c},_retrieveFromCacheOrCreate:function(a,b){"undefined"==typeof b&&(b=!1);var c;if(!this._mappings.hasOwnProperty(a))throw new Error(1e3);var d=this._mappings[a];return!b&&d.isSingleton?(null==d.object&&(d.object=this._createAndSetupInstance(a,d.clazz)),c=d.object):c=d.clazz?this._createAndSetupInstance(a,d.clazz):d.object,c},mapOutlet:function(a,b,c){if("undefined"==typeof a)throw new Error(1010);return b=b||"global",c=c||a,this._outlets.hasOwnProperty(b)||(this._outlets[b]={}),this._outlets[b][c]=a,this},getObject:function(a){if("undefined"==typeof a)throw new Error(1020);return this._retrieveFromCacheOrCreate(a)},mapValue:function(a,b){if("undefined"==typeof a)throw new Error(1030);return this._mappings[a]={clazz:null,object:b,isSingleton:!0},this.autoMapOutlets&&this.mapOutlet(a),this.hasMapping(a)&&this.injectInto(b,a),this},hasMapping:function(a){if("undefined"==typeof a)throw new Error(1040);return this._mappings.hasOwnProperty(a)},mapClass:function(a,b){if("undefined"==typeof a)throw new Error(1050);if("undefined"==typeof b)throw new Error(1051);return this._mappings[a]={clazz:b,object:null,isSingleton:!1},this.autoMapOutlets&&this.mapOutlet(a),this},mapSingleton:function(a,b){if("undefined"==typeof a)throw new Error(1060);if("undefined"==typeof b)throw new Error(1061);return this._mappings[a]={clazz:b,object:null,isSingleton:!0},this.autoMapOutlets&&this.mapOutlet(a),this},instantiate:function(a){if("undefined"==typeof a)throw new Error(1070);return this._retrieveFromCacheOrCreate(a,!0)},injectInto:function(a,b){if("undefined"==typeof a)throw new Error(1080);if("object"==typeof a){var c=[];this._outlets.hasOwnProperty("global")&&c.push(this._outlets.global),"undefined"!=typeof b&&this._outlets.hasOwnProperty(b)&&c.push(this._outlets[b]);for(var d in c){var e=c[d];for(var f in e){var g=e[f];(!this.strictInjections||f in a)&&(a[f]=this.getObject(g))}}"setup"in a&&a.setup.call(a)}return this},unmap:function(a){if("undefined"==typeof a)throw new Error(1090);return delete this._mappings[a],this},unmapOutlet:function(a,b){if("undefined"==typeof a)throw new Error(1100);if("undefined"==typeof b)throw new Error(1101);return delete this._outlets[a][b],this},mapHandler:function(a,b,c,d,e){if("undefined"==typeof a)throw new Error(1110);return b=b||"global",c=c||a,"undefined"==typeof d&&(d=!1),"undefined"==typeof e&&(e=!1),this._handlers.hasOwnProperty(a)||(this._handlers[a]={}),this._handlers[a].hasOwnProperty(b)||(this._handlers[a][b]=[]),this._handlers[a][b].push({handler:c,oneShot:d,passEvent:e}),this},unmapHandler:function(a,b,c){if("undefined"==typeof a)throw new Error(1120);if(b=b||"global",c=c||a,this._handlers.hasOwnProperty(a)&&this._handlers[a].hasOwnProperty(b)){var d=this._handlers[a][b];for(var e in d){var f=d[e];if(f.handler===c){d.splice(e,1);break}}}return this},notify:function(a){if("undefined"==typeof a)throw new Error(1130);var b=Array.prototype.slice.call(arguments),c=b.slice(1);if(this._handlers.hasOwnProperty(a)){var d=this._handlers[a];for(var e in d){var f,g=d[e];"global"!==e&&(f=this.getObject(e));var h,i,j=[];for(h=0,i=g.length;i>h;h++){var k,l=g[h];k=f&&"string"==typeof l.handler?f[l.handler]:l.handler,l.oneShot&&j.unshift(h),l.passEvent?k.apply(f,b):k.apply(f,c)}for(h=0,i=j.length;i>h;h++)g.splice(j[h],1)}}return this}},a.dijon=b}(this),"undefined"==typeof utils)var utils={};"undefined"==typeof utils.Math&&(utils.Math={}),utils.Math.to64BitNumber=function(a,b){var c,d,e;return c=new goog.math.Long(0,b),d=new goog.math.Long(a,0),e=c.add(d),e.toNumber()},goog={},goog.math={},goog.math.Long=function(a,b){this.low_=0|a,this.high_=0|b},goog.math.Long.IntCache_={},goog.math.Long.fromInt=function(a){if(a>=-128&&128>a){var b=goog.math.Long.IntCache_[a];if(b)return b}var c=new goog.math.Long(0|a,0>a?-1:0);return a>=-128&&128>a&&(goog.math.Long.IntCache_[a]=c),c},goog.math.Long.fromNumber=function(a){return isNaN(a)||!isFinite(a)?goog.math.Long.ZERO:a<=-goog.math.Long.TWO_PWR_63_DBL_?goog.math.Long.MIN_VALUE:a+1>=goog.math.Long.TWO_PWR_63_DBL_?goog.math.Long.MAX_VALUE:0>a?goog.math.Long.fromNumber(-a).negate():new goog.math.Long(a%goog.math.Long.TWO_PWR_32_DBL_|0,a/goog.math.Long.TWO_PWR_32_DBL_|0)},goog.math.Long.fromBits=function(a,b){return new goog.math.Long(a,b)},goog.math.Long.fromString=function(a,b){if(0==a.length)throw Error("number format error: empty string");var c=b||10;if(2>c||c>36)throw Error("radix out of range: "+c);if("-"==a.charAt(0))return goog.math.Long.fromString(a.substring(1),c).negate();if(a.indexOf("-")>=0)throw Error('number format error: interior "-" character: '+a);for(var d=goog.math.Long.fromNumber(Math.pow(c,8)),e=goog.math.Long.ZERO,f=0;f<a.length;f+=8){var g=Math.min(8,a.length-f),h=parseInt(a.substring(f,f+g),c);if(8>g){var i=goog.math.Long.fromNumber(Math.pow(c,g));e=e.multiply(i).add(goog.math.Long.fromNumber(h))}else e=e.multiply(d),e=e.add(goog.math.Long.fromNumber(h))}return e},goog.math.Long.TWO_PWR_16_DBL_=65536,goog.math.Long.TWO_PWR_24_DBL_=1<<24,goog.math.Long.TWO_PWR_32_DBL_=goog.math.Long.TWO_PWR_16_DBL_*goog.math.Long.TWO_PWR_16_DBL_,goog.math.Long.TWO_PWR_31_DBL_=goog.math.Long.TWO_PWR_32_DBL_/2,goog.math.Long.TWO_PWR_48_DBL_=goog.math.Long.TWO_PWR_32_DBL_*goog.math.Long.TWO_PWR_16_DBL_,goog.math.Long.TWO_PWR_64_DBL_=goog.math.Long.TWO_PWR_32_DBL_*goog.math.Long.TWO_PWR_32_DBL_,goog.math.Long.TWO_PWR_63_DBL_=goog.math.Long.TWO_PWR_64_DBL_/2,goog.math.Long.ZERO=goog.math.Long.fromInt(0),goog.math.Long.ONE=goog.math.Long.fromInt(1),goog.math.Long.NEG_ONE=goog.math.Long.fromInt(-1),goog.math.Long.MAX_VALUE=goog.math.Long.fromBits(-1,2147483647),goog.math.Long.MIN_VALUE=goog.math.Long.fromBits(0,-2147483648),goog.math.Long.TWO_PWR_24_=goog.math.Long.fromInt(1<<24),goog.math.Long.prototype.toInt=function(){return this.low_},goog.math.Long.prototype.toNumber=function(){return this.high_*goog.math.Long.TWO_PWR_32_DBL_+this.getLowBitsUnsigned()},goog.math.Long.prototype.toString=function(a){var b=a||10;if(2>b||b>36)throw Error("radix out of range: "+b);if(this.isZero())return"0";if(this.isNegative()){if(this.equals(goog.math.Long.MIN_VALUE)){var c=goog.math.Long.fromNumber(b),d=this.div(c),e=d.multiply(c).subtract(this);return d.toString(b)+e.toInt().toString(b)}return"-"+this.negate().toString(b)}for(var f=goog.math.Long.fromNumber(Math.pow(b,6)),e=this,g="";;){var h=e.div(f),i=e.subtract(h.multiply(f)).toInt(),j=i.toString(b);if(e=h,e.isZero())return j+g;for(;j.length<6;)j="0"+j;g=""+j+g}},goog.math.Long.prototype.getHighBits=function(){return this.high_},goog.math.Long.prototype.getLowBits=function(){return this.low_},goog.math.Long.prototype.getLowBitsUnsigned=function(){return this.low_>=0?this.low_:goog.math.Long.TWO_PWR_32_DBL_+this.low_},goog.math.Long.prototype.getNumBitsAbs=function(){if(this.isNegative())return this.equals(goog.math.Long.MIN_VALUE)?64:this.negate().getNumBitsAbs();for(var a=0!=this.high_?this.high_:this.low_,b=31;b>0&&0==(a&1<<b);b--);return 0!=this.high_?b+33:b+1},goog.math.Long.prototype.isZero=function(){return 0==this.high_&&0==this.low_},goog.math.Long.prototype.isNegative=function(){return this.high_<0},goog.math.Long.prototype.isOdd=function(){return 1==(1&this.low_)},goog.math.Long.prototype.equals=function(a){return this.high_==a.high_&&this.low_==a.low_},goog.math.Long.prototype.notEquals=function(a){return this.high_!=a.high_||this.low_!=a.low_},goog.math.Long.prototype.lessThan=function(a){return this.compare(a)<0},goog.math.Long.prototype.lessThanOrEqual=function(a){return this.compare(a)<=0},goog.math.Long.prototype.greaterThan=function(a){return this.compare(a)>0},goog.math.Long.prototype.greaterThanOrEqual=function(a){return this.compare(a)>=0},goog.math.Long.prototype.compare=function(a){if(this.equals(a))return 0;var b=this.isNegative(),c=a.isNegative();return b&&!c?-1:!b&&c?1:this.subtract(a).isNegative()?-1:1},goog.math.Long.prototype.negate=function(){return this.equals(goog.math.Long.MIN_VALUE)?goog.math.Long.MIN_VALUE:this.not().add(goog.math.Long.ONE)},goog.math.Long.prototype.add=function(a){var b=this.high_>>>16,c=65535&this.high_,d=this.low_>>>16,e=65535&this.low_,f=a.high_>>>16,g=65535&a.high_,h=a.low_>>>16,i=65535&a.low_,j=0,k=0,l=0,m=0;return m+=e+i,l+=m>>>16,m&=65535,l+=d+h,k+=l>>>16,l&=65535,k+=c+g,j+=k>>>16,k&=65535,j+=b+f,j&=65535,goog.math.Long.fromBits(l<<16|m,j<<16|k)},goog.math.Long.prototype.subtract=function(a){return this.add(a.negate())},goog.math.Long.prototype.multiply=function(a){if(this.isZero())return goog.math.Long.ZERO;if(a.isZero())return goog.math.Long.ZERO;if(this.equals(goog.math.Long.MIN_VALUE))return a.isOdd()?goog.math.Long.MIN_VALUE:goog.math.Long.ZERO;if(a.equals(goog.math.Long.MIN_VALUE))return this.isOdd()?goog.math.Long.MIN_VALUE:goog.math.Long.ZERO;if(this.isNegative())return a.isNegative()?this.negate().multiply(a.negate()):this.negate().multiply(a).negate();if(a.isNegative())return this.multiply(a.negate()).negate();if(this.lessThan(goog.math.Long.TWO_PWR_24_)&&a.lessThan(goog.math.Long.TWO_PWR_24_))return goog.math.Long.fromNumber(this.toNumber()*a.toNumber());var b=this.high_>>>16,c=65535&this.high_,d=this.low_>>>16,e=65535&this.low_,f=a.high_>>>16,g=65535&a.high_,h=a.low_>>>16,i=65535&a.low_,j=0,k=0,l=0,m=0;return m+=e*i,l+=m>>>16,m&=65535,l+=d*i,k+=l>>>16,l&=65535,l+=e*h,k+=l>>>16,l&=65535,k+=c*i,j+=k>>>16,k&=65535,k+=d*h,j+=k>>>16,k&=65535,k+=e*g,j+=k>>>16,k&=65535,j+=b*i+c*h+d*g+e*f,j&=65535,goog.math.Long.fromBits(l<<16|m,j<<16|k)},goog.math.Long.prototype.div=function(a){if(a.isZero())throw Error("division by zero");if(this.isZero())return goog.math.Long.ZERO;if(this.equals(goog.math.Long.MIN_VALUE)){if(a.equals(goog.math.Long.ONE)||a.equals(goog.math.Long.NEG_ONE))return goog.math.Long.MIN_VALUE;if(a.equals(goog.math.Long.MIN_VALUE))return goog.math.Long.ONE;var b=this.shiftRight(1),c=b.div(a).shiftLeft(1);if(c.equals(goog.math.Long.ZERO))return a.isNegative()?goog.math.Long.ONE:goog.math.Long.NEG_ONE;var d=this.subtract(a.multiply(c)),e=c.add(d.div(a));return e}if(a.equals(goog.math.Long.MIN_VALUE))return goog.math.Long.ZERO;if(this.isNegative())return a.isNegative()?this.negate().div(a.negate()):this.negate().div(a).negate();if(a.isNegative())return this.div(a.negate()).negate();for(var f=goog.math.Long.ZERO,d=this;d.greaterThanOrEqual(a);){for(var c=Math.max(1,Math.floor(d.toNumber()/a.toNumber())),g=Math.ceil(Math.log(c)/Math.LN2),h=48>=g?1:Math.pow(2,g-48),i=goog.math.Long.fromNumber(c),j=i.multiply(a);j.isNegative()||j.greaterThan(d);)c-=h,i=goog.math.Long.fromNumber(c),j=i.multiply(a);i.isZero()&&(i=goog.math.Long.ONE),f=f.add(i),d=d.subtract(j)}return f},goog.math.Long.prototype.modulo=function(a){return this.subtract(this.div(a).multiply(a))},goog.math.Long.prototype.not=function(){return goog.math.Long.fromBits(~this.low_,~this.high_)},goog.math.Long.prototype.and=function(a){return goog.math.Long.fromBits(this.low_&a.low_,this.high_&a.high_)},goog.math.Long.prototype.or=function(a){return goog.math.Long.fromBits(this.low_|a.low_,this.high_|a.high_)},goog.math.Long.prototype.xor=function(a){return goog.math.Long.fromBits(this.low_^a.low_,this.high_^a.high_)},goog.math.Long.prototype.shiftLeft=function(a){if(a&=63,0==a)return this;var b=this.low_;if(32>a){var c=this.high_;return goog.math.Long.fromBits(b<<a,c<<a|b>>>32-a)}return goog.math.Long.fromBits(0,b<<a-32)},goog.math.Long.prototype.shiftRight=function(a){if(a&=63,0==a)return this;var b=this.high_;if(32>a){var c=this.low_;return goog.math.Long.fromBits(c>>>a|b<<32-a,b>>a)}return goog.math.Long.fromBits(b>>a-32,b>=0?0:-1)},goog.math.Long.prototype.shiftRightUnsigned=function(a){if(a&=63,0==a)return this;var b=this.high_;if(32>a){var c=this.low_;return goog.math.Long.fromBits(c>>>a|b<<32-a,b>>>a)}return 32==a?goog.math.Long.fromBits(b,0):goog.math.Long.fromBits(b>>>a-32,0)};var UTF8={};UTF8.encode=function(a){for(var b=[],c=0;c<a.length;++c){var d=a.charCodeAt(c);128>d?b.push(d):2048>d?(b.push(192|d>>6),b.push(128|63&d)):65536>d?(b.push(224|d>>12),b.push(128|63&d>>6),b.push(128|63&d)):(b.push(240|d>>18),b.push(128|63&d>>12),b.push(128|63&d>>6),b.push(128|63&d))}return b},UTF8.decode=function(a){for(var b=[],c=0;c<a.length;){var d=a[c++];128>d||(224>d?(d=(31&d)<<6,d|=63&a[c++]):240>d?(d=(15&d)<<12,d|=(63&a[c++])<<6,d|=63&a[c++]):(d=(7&d)<<18,d|=(63&a[c++])<<12,d|=(63&a[c++])<<6,d|=63&a[c++])),b.push(String.fromCharCode(d))}return b.join("")};var BASE64={};if(function(b){var c=function(a){for(var c=0,d=[],e=0|a.length/3;0<e--;){var f=(a[c]<<16)+(a[c+1]<<8)+a[c+2];c+=3,d.push(b.charAt(63&f>>18)),d.push(b.charAt(63&f>>12)),d.push(b.charAt(63&f>>6)),d.push(b.charAt(63&f))}if(2==a.length-c){var f=(a[c]<<16)+(a[c+1]<<8);d.push(b.charAt(63&f>>18)),d.push(b.charAt(63&f>>12)),d.push(b.charAt(63&f>>6)),d.push("=")}else if(1==a.length-c){var f=a[c]<<16;d.push(b.charAt(63&f>>18)),d.push(b.charAt(63&f>>12)),d.push("==")}return d.join("")},d=function(){for(var a=[],c=0;c<b.length;++c)a[b.charCodeAt(c)]=c;return a["=".charCodeAt(0)]=0,a}(),e=function(a){for(var b=0,c=[],e=0|a.length/4;0<e--;){var f=(d[a.charCodeAt(b)]<<18)+(d[a.charCodeAt(b+1)]<<12)+(d[a.charCodeAt(b+2)]<<6)+d[a.charCodeAt(b+3)];c.push(255&f>>16),c.push(255&f>>8),c.push(255&f),b+=4}return c&&("="==a.charAt(b-2)?(c.pop(),c.pop()):"="==a.charAt(b-1)&&c.pop()),c},f={};f.encode=function(a){for(var b=[],c=0;c<a.length;++c)b.push(a.charCodeAt(c));return b},f.decode=function(){for(var b=0;b<s.length;++b)a[b]=String.fromCharCode(a[b]);return a.join("")},BASE64.decodeArray=function(a){var b=e(a);return new Uint8Array(b)},BASE64.encodeASCII=function(a){var b=f.encode(a);return c(b)},BASE64.decodeASCII=function(a){var b=e(a);return f.decode(b)},BASE64.encode=function(a){var b=UTF8.encode(a);return c(b)},BASE64.decode=function(a){var b=e(a);return UTF8.decode(b)}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),void 0===btoa)var btoa=BASE64.encode;if(void 0===atob)var atob=BASE64.decode;MediaPlayer=function(a){"use strict";var b,c,d,e,f,g,h,i,j,k,l,m="1.4.0",n="http://time.akamai.com/?iso",o="urn:mpeg:dash:utc:http-xsdate:2014",p=0,q=null,r=null,s=!1,t=!1,u=!0,v=!1,w=MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED,x=!0,y=[],z=4,A=!1,B=function(){return!!d&&!!e},C=function(){if(!s)throw"MediaPlayer not initialized!";if(!this.capabilities.supportsMediaSource())return void this.errHandler.capabilityError("mediasource");if(!d||!e)throw"Missing view or source.";t=!0,this.debug.log("Playback initiated!"),f=b.getObject("streamController"),h.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,f),h.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED,f),h.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY,f),h.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR,f),h.setLiveDelayAttributes(z,A),f.initialize(u,q,r),l.checkInitialBitrate(),"string"==typeof e?f.load(e):f.loadWithManifest(e),f.setUTCTimingSources(y,x),b.mapValue("scheduleWhilePaused",v),b.mapOutlet("scheduleWhilePaused","stream"),b.mapOutlet("scheduleWhilePaused","scheduleController"),b.mapValue("numOfParallelRequestAllowed",p),b.mapOutlet("numOfParallelRequestAllowed","scheduleController"),b.mapValue("bufferMax",w),b.mapOutlet("bufferMax","bufferController"),g.initialize()},D=function(){B()&&C.call(this)},E=function(){var a=j.getReadOnlyMetricsFor("video")||j.getReadOnlyMetricsFor("audio");return i.getCurrentDVRInfo(a)},F=function(){return E.call(this).manifestInfo.DVRWindowSize},G=function(a){var b=E.call(this),c=b.range.start+a;return c>b.range.end&&(c=b.range.end),c},H=function(a){this.getVideoModel().getElement().currentTime=this.getDVRSeekOffset(a)},I=function(){var a=E.call(this);return null===a?0:this.duration()-(a.range.end-a.time)},J=function(){var a,b=E.call(this);return null===b?0:(a=b.range.end-b.range.start,a<b.manifestInfo.DVRWindowSize?a:b.manifestInfo.DVRWindowSize)},K=function(a){var b,c,d=E.call(this);return null===d?0:(b=d.manifestInfo.availableFrom.getTime()/1e3,c=a+(b+d.range.start))},L=function(){return K.call(this,this.time())},M=function(){return K.call(this,this.duration())},N=function(a,b,c){var d=new Date(1e3*a),e=d.toLocaleDateString(b),f=d.toLocaleTimeString(b,{hour12:c});return f+" "+e},O=function(a){a=Math.max(a,0);var b=Math.floor(a/3600),c=Math.floor(a%3600/60),d=Math.floor(a%3600%60);return(0===b?"":10>b?"0"+b.toString()+":":b.toString()+":")+(10>c?"0"+c.toString():c.toString())+":"+(10>d?"0"+d.toString():d.toString())},P=function(a,b,c){b&&void 0!==a&&null!==a&&(c?g.setRules(a,b):g.addRules(a,b))},Q=function(){t&&f&&(h.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,f),h.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED,f),h.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY,f),h.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR,f),f.reset(),c.reset(),g.reset(),h.reset(),f=null,t=!1)},R=dijon.System.prototype.getObject;return dijon.System.prototype.getObject=function(a){var b=R.call(this,a);return"object"!=typeof b||b.getName||(b.getName=function(){return a},b.setMediaType=function(a){b.mediaType=a},b.getMediaType=function(){return b.mediaType}),b},b=new dijon.System,b.mapValue("system",b),b.mapOutlet("system"),b.injectInto(a),{notifier:void 0,debug:void 0,eventBus:void 0,capabilities:void 0,adapter:void 0,errHandler:void 0,uriQueryFragModel:void 0,videoElementExt:void 0,setup:function(){i=b.getObject("metricsExt"),c=b.getObject("abrController"),g=b.getObject("rulesController"),j=b.getObject("metricsModel"),l=b.getObject("DOMStorage"),h=b.getObject("playbackController"),this.restoreDefaultUTCTimingSources()},addEventListener:function(a,b,c){a=a.toLowerCase(),this.eventBus.addEventListener(a,b,c)},removeEventListener:function(a,b,c){a=a.toLowerCase(),this.eventBus.removeEventListener(a,b,c)},getVersion:function(){return m},startup:function(){s||(b.injectInto(this),s=!0)},getDebug:function(){return this.debug},getVideoModel:function(){return k},setLiveDelayFragmentCount:function(a){z=a},useSuggestedPresentationDelay:function(a){A=a},enableLastBitrateCaching:function(a,b){l.enableLastBitrateCaching(a,b)},setNumOfParallelRequestAllowed:function(a){p=a},setMaxAllowedBitrateFor:function(a,b){c.setMaxAllowedBitrateFor(a,b)},getMaxAllowedBitrateFor:function(a){return c.getMaxAllowedBitrateFor(a)},setAutoPlay:function(a){u=a},getAutoPlay:function(){return u},setScheduleWhilePaused:function(a){v=a},getScheduleWhilePaused:function(){return v},setBufferMax:function(a){w=a},getBufferMax:function(){return w},getMetricsExt:function(){return i},getMetricsFor:function(a){return j.getReadOnlyMetricsFor(a)},getQualityFor:function(a){return c.getQualityFor(a,f.getActiveStreamInfo())},setQualityFor:function(a,b){c.setPlaybackQuality(a,f.getActiveStreamInfo(),b)},getBitrateInfoListFor:function(a){var b=f.getActiveStreamInfo(),c=f.getStreamById(b.id);return c.getBitrateListFor(a)},setInitialBitrateFor:function(a,b){c.setInitialBitrateFor(a,b)},getInitialBitrateFor:function(a){return c.getInitialBitrateFor(a)},getAutoSwitchQuality:function(){return c.getAutoSwitchBitrate()},setAutoSwitchQuality:function(a){c.setAutoSwitchBitrate(a)},setSchedulingRules:function(a){P.call(this,g.SCHEDULING_RULE,a,!0)},addSchedulingRules:function(a){P.call(this,g.SCHEDULING_RULE,a,!1)},setABRRules:function(a){P.call(this,g.ABR_RULE,a,!0)},addABRRules:function(a){P.call(this,g.ABR_RULE,a,!1)},createProtection:function(){return b.getObject("protectionController")},retrieveManifest:function(a,c){!function(a){var d=b.getObject("manifestLoader"),e=b.getObject("uriQueryFragModel"),f={};f[MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED]=function(a){a.error?c(null,a.error):c(a.data.manifest),d.unsubscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED,this)},d.subscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED,f),d.load(e.parseURI(a))}(a)},addUTCTimingSource:function(a,b){this.removeUTCTimingSource(a,b);var c=new Dash.vo.UTCTiming;c.schemeIdUri=a,c.value=b,y.push(c)},removeUTCTimingSource:function(a,b){y.forEach(function(c,d){c.schemeIdUri===a&&c.value===b&&y.splice(d,1)})},clearDefaultUTCTimingSources:function(){y=[]},restoreDefaultUTCTimingSources:function(){this.addUTCTimingSource(o,n)},enableManifestDateHeaderTimeSource:function(a){x=a},attachView:function(a){if(!s)throw"MediaPlayer not initialized!";d=a,k=null,d&&(k=b.getObject("videoModel"),k.setElement(d)),Q.call(this),B.call(this)&&D.call(this)},attachSource:function(a,b,c){if(!s)throw"MediaPlayer not initialized!";"string"==typeof a?(this.uriQueryFragModel.reset(),e=this.uriQueryFragModel.parseURI(a)):e=a,q=b,r=c,Q.call(this),B.call(this)&&D.call(this)},reset:function(){this.attachSource(null),this.attachView(null),q=null,r=null},play:C,isReady:B,seek:H,time:I,duration:J,timeAsUTC:L,durationAsUTC:M,getDVRWindowSize:F,getDVRSeekOffset:G,formatUTC:N,convertToTimeCode:O}},MediaPlayer.prototype={constructor:MediaPlayer},MediaPlayer.dependencies={},MediaPlayer.dependencies.protection={},MediaPlayer.dependencies.protection.servers={},MediaPlayer.utils={},MediaPlayer.models={},MediaPlayer.vo={},MediaPlayer.vo.metrics={},MediaPlayer.vo.protection={},MediaPlayer.rules={},MediaPlayer.di={},MediaPlayer.events={METRICS_CHANGED:"metricschanged",METRIC_CHANGED:"metricchanged",METRIC_UPDATED:"metricupdated",METRIC_ADDED:"metricadded",MANIFEST_LOADED:"manifestloaded",STREAM_SWITCH_STARTED:"streamswitchstarted",STREAM_SWITCH_COMPLETED:"streamswitchcompleted",STREAM_INITIALIZED:"streaminitialized",TEXT_TRACK_ADDED:"texttrackadded",BUFFER_LOADED:"bufferloaded",BUFFER_EMPTY:"bufferstalled",ERROR:"error",LOG:"log"},MediaPlayer.di.Context=function(){"use strict";var a=function(){var a=document.createElement("video");if(MediaPlayer.models.ProtectionModel_21Jan2015.detect(a))this.system.mapClass("protectionModel",MediaPlayer.models.ProtectionModel_21Jan2015);else if(MediaPlayer.models.ProtectionModel_3Feb2014.detect(a))this.system.mapClass("protectionModel",MediaPlayer.models.ProtectionModel_3Feb2014);else if(MediaPlayer.models.ProtectionModel_01b.detect(a))this.system.mapClass("protectionModel",MediaPlayer.models.ProtectionModel_01b);else{var b=this.system.getObject("debug");b.log("No supported version of EME detected on this user agent!"),b.log("Attempts to play encrypted content will fail!")}};return{system:void 0,setup:function(){this.system.autoMapOutlets=!0,this.system.mapSingleton("debug",MediaPlayer.utils.Debug),this.system.mapSingleton("eventBus",MediaPlayer.utils.EventBus),this.system.mapSingleton("capabilities",MediaPlayer.utils.Capabilities),this.system.mapSingleton("DOMStorage",MediaPlayer.utils.DOMStorage),this.system.mapClass("customTimeRanges",MediaPlayer.utils.CustomTimeRanges),this.system.mapSingleton("virtualBuffer",MediaPlayer.utils.VirtualBuffer),this.system.mapSingleton("textTrackExtensions",MediaPlayer.utils.TextTrackExtensions),this.system.mapSingleton("vttParser",MediaPlayer.utils.VTTParser),this.system.mapSingleton("ttmlParser",MediaPlayer.utils.TTMLParser),this.system.mapSingleton("videoModel",MediaPlayer.models.VideoModel),this.system.mapSingleton("manifestModel",MediaPlayer.models.ManifestModel),this.system.mapSingleton("metricsModel",MediaPlayer.models.MetricsModel),this.system.mapSingleton("uriQueryFragModel",MediaPlayer.models.URIQueryAndFragmentModel),this.system.mapSingleton("ksPlayReady",MediaPlayer.dependencies.protection.KeySystem_PlayReady),this.system.mapSingleton("ksWidevine",MediaPlayer.dependencies.protection.KeySystem_Widevine),this.system.mapSingleton("ksClearKey",MediaPlayer.dependencies.protection.KeySystem_ClearKey),this.system.mapSingleton("serverPlayReady",MediaPlayer.dependencies.protection.servers.PlayReady),this.system.mapSingleton("serverWidevine",MediaPlayer.dependencies.protection.servers.Widevine),this.system.mapSingleton("serverClearKey",MediaPlayer.dependencies.protection.servers.ClearKey),this.system.mapSingleton("serverDRMToday",MediaPlayer.dependencies.protection.servers.DRMToday),this.system.mapSingleton("requestModifierExt",MediaPlayer.dependencies.RequestModifierExtensions),this.system.mapSingleton("textSourceBuffer",MediaPlayer.dependencies.TextSourceBuffer),this.system.mapSingleton("mediaSourceExt",MediaPlayer.dependencies.MediaSourceExtensions),this.system.mapSingleton("sourceBufferExt",MediaPlayer.dependencies.SourceBufferExtensions),this.system.mapSingleton("abrController",MediaPlayer.dependencies.AbrController),this.system.mapSingleton("errHandler",MediaPlayer.dependencies.ErrorHandler),this.system.mapSingleton("videoExt",MediaPlayer.dependencies.VideoModelExtensions),this.system.mapSingleton("protectionExt",MediaPlayer.dependencies.ProtectionExtensions),this.system.mapClass("protectionController",MediaPlayer.dependencies.ProtectionController),this.system.mapSingleton("playbackController",MediaPlayer.dependencies.PlaybackController),a.call(this),this.system.mapSingleton("liveEdgeFinder",MediaPlayer.dependencies.LiveEdgeFinder),this.system.mapClass("metrics",MediaPlayer.models.MetricsList),this.system.mapClass("insufficientBufferRule",MediaPlayer.rules.InsufficientBufferRule),this.system.mapClass("bufferOccupancyRule",MediaPlayer.rules.BufferOccupancyRule),this.system.mapClass("throughputRule",MediaPlayer.rules.ThroughputRule),this.system.mapSingleton("abrRulesCollection",MediaPlayer.rules.ABRRulesCollection),this.system.mapSingleton("rulesController",MediaPlayer.rules.RulesController),this.system.mapClass("bufferLevelRule",MediaPlayer.rules.BufferLevelRule),this.system.mapClass("pendingRequestsRule",MediaPlayer.rules.PendingRequestsRule),this.system.mapClass("playbackTimeRule",MediaPlayer.rules.PlaybackTimeRule),this.system.mapClass("sameTimeRequestRule",MediaPlayer.rules.SameTimeRequestRule),this.system.mapClass("abandonRequestRule",MediaPlayer.rules.AbandonRequestsRule),this.system.mapSingleton("scheduleRulesCollection",MediaPlayer.rules.ScheduleRulesCollection),this.system.mapClass("liveEdgeBinarySearchRule",MediaPlayer.rules.LiveEdgeBinarySearchRule),this.system.mapClass("liveEdgeWithTimeSynchronizationRule",MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule),this.system.mapSingleton("synchronizationRulesCollection",MediaPlayer.rules.SynchronizationRulesCollection),this.system.mapSingleton("xlinkController",MediaPlayer.dependencies.XlinkController),
this.system.mapSingleton("xlinkLoader",MediaPlayer.dependencies.XlinkLoader),this.system.mapClass("streamProcessor",MediaPlayer.dependencies.StreamProcessor),this.system.mapClass("eventController",MediaPlayer.dependencies.EventController),this.system.mapClass("textController",MediaPlayer.dependencies.TextController),this.system.mapClass("bufferController",MediaPlayer.dependencies.BufferController),this.system.mapClass("manifestLoader",MediaPlayer.dependencies.ManifestLoader),this.system.mapSingleton("manifestUpdater",MediaPlayer.dependencies.ManifestUpdater),this.system.mapClass("fragmentController",MediaPlayer.dependencies.FragmentController),this.system.mapClass("fragmentLoader",MediaPlayer.dependencies.FragmentLoader),this.system.mapClass("fragmentModel",MediaPlayer.dependencies.FragmentModel),this.system.mapSingleton("streamController",MediaPlayer.dependencies.StreamController),this.system.mapClass("stream",MediaPlayer.dependencies.Stream),this.system.mapClass("scheduleController",MediaPlayer.dependencies.ScheduleController),this.system.mapSingleton("timeSyncController",MediaPlayer.dependencies.TimeSyncController),this.system.mapSingleton("notifier",MediaPlayer.dependencies.Notifier)}}},Dash=function(){"use strict";return{modules:{},dependencies:{},vo:{},di:{}}}(),Dash.di.DashContext=function(){"use strict";return{system:void 0,setup:function(){Dash.di.DashContext.prototype.setup.call(this),this.system.mapClass("parser",Dash.dependencies.DashParser),this.system.mapClass("indexHandler",Dash.dependencies.DashHandler),this.system.mapSingleton("baseURLExt",Dash.dependencies.BaseURLExtensions),this.system.mapClass("fragmentExt",Dash.dependencies.FragmentExtensions),this.system.mapClass("trackController",Dash.dependencies.RepresentationController),this.system.mapSingleton("manifestExt",Dash.dependencies.DashManifestExtensions),this.system.mapSingleton("metricsExt",Dash.dependencies.DashMetricsExtensions),this.system.mapSingleton("timelineConverter",Dash.dependencies.TimelineConverter),this.system.mapSingleton("adapter",Dash.dependencies.DashAdapter)}}},Dash.di.DashContext.prototype=new MediaPlayer.di.Context,Dash.di.DashContext.prototype.constructor=Dash.di.DashContext,Dash.dependencies.DashAdapter=function(){"use strict";var a=[],b={},c=function(a,b){return b.getRepresentationForQuality(a.quality)},d=function(a){return b[a.streamInfo.id][a.index]},e=function(b){var c,d=a.length,e=0;for(e;d>e;e+=1)if(c=a[e],b.id===c.id)return c;return null},f=function(a,b){var c=new MediaPlayer.vo.TrackInfo,d=b.adaptation.period.mpd.manifest.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index],e=this.manifestExt.getRepresentationFor(b.index,d);return c.id=b.id,c.quality=b.index,c.bandwidth=this.manifestExt.getBandwidth(e),c.DVRWindow=b.segmentAvailabilityRange,c.fragmentDuration=b.segmentDuration||(b.segments&&b.segments.length>0?b.segments[0].duration:0/0),c.MSETimeOffset=b.MSETimeOffset,c.useCalculatedLiveEdgeTime=b.useCalculatedLiveEdgeTime,c.mediaInfo=g.call(this,a,b.adaptation),c},g=function(a,b){var c=new MediaPlayer.vo.MediaInfo,d=this,e=b.period.mpd.manifest.Period_asArray[b.period.index].AdaptationSet_asArray[b.index];return c.id=b.id,c.index=b.index,c.type=b.type,c.streamInfo=h.call(this,a,b.period),c.trackCount=this.manifestExt.getRepresentationCount(e),c.lang=this.manifestExt.getLanguageForAdaptation(e),c.codec=this.manifestExt.getCodec(e),c.mimeType=this.manifestExt.getMimeType(e),c.contentProtection=this.manifestExt.getContentProtectionData(e),c.bitrateList=this.manifestExt.getBitrateListForAdaptation(e),c.contentProtection&&c.contentProtection.forEach(function(a){a.KID=d.manifestExt.getKID(a)}),c.isText=this.manifestExt.getIsTextTrack(c.mimeType),c},h=function(a,b){var c=new MediaPlayer.vo.StreamInfo,d=1;return c.id=b.id,c.index=b.index,c.start=b.start,c.duration=b.duration,c.manifestInfo=i.call(this,a,b.mpd),c.isLast=1===a.Period_asArray.length||Math.abs(c.start+c.duration-c.manifestInfo.duration)<d,c},i=function(a,b){var c=new MediaPlayer.vo.ManifestInfo;return c.DVRWindowSize=b.timeShiftBufferDepth,c.loadedTime=b.manifest.loadedTime,c.availableFrom=b.availabilityStartTime,c.minBufferTime=b.manifest.minBufferTime,c.maxFragmentDuration=b.maxSegmentDuration,c.duration=this.manifestExt.getDuration(a),c.isDynamic=this.manifestExt.getIsDynamic(a),c},j=function(a,c,d){var f,h=e(c),i=h.id,j=this.manifestExt.getAdaptationForType(a,c.index,d);return j?(f=this.manifestExt.getIndexForAdaptation(j,a,c.index),b[i]=b[i]||this.manifestExt.getAdaptationsForPeriod(a,h),g.call(this,a,b[i][f])):null},k=function(c){var d,e,f,g=[];if(!c)return null;for(d=this.manifestExt.getMpd(c),a=this.manifestExt.getRegularPeriods(c,d),d.checkTime=this.manifestExt.getCheckTime(c,a[0]),b={},e=a.length,f=0;e>f;f+=1)g.push(h.call(this,c,a[f]));return g},l=function(a){var b=this.manifestExt.getMpd(a);return i.call(this,a,b)},m=function(a,b){var c=a.trackController.getRepresentationForQuality(b);return a.indexHandler.getInitRequest(c)},n=function(a,b){var d=c(b,a.trackController);return a.indexHandler.getNextSegmentRequest(d)},o=function(a,b,d,e){var f=c(b,a.trackController);return a.indexHandler.getSegmentRequestForTime(f,d,e)},p=function(a,b,d){var e=c(b,a.trackController);return a.indexHandler.generateSegmentRequestForTime(e,d)},q=function(a){return a.indexHandler.getCurrentTime()},r=function(a,b){return a.indexHandler.setCurrentTime(b)},s=function(a,b){var c,f,g=e(b.getStreamInfo()),h=b.getMediaInfo(),i=d(h),j=b.getType();c=h.id,f=c?this.manifestExt.getAdaptationForId(c,a,g.index):this.manifestExt.getAdaptationForIndex(h.index,a,g.index),b.trackController.updateData(f,i,j)},t=function(a,b,c){var d=b.getRepresentationForQuality(c);return d?f.call(this,a,d):null},u=function(a,b){var c=b.getCurrentRepresentation();return c?f.call(this,a,c):null},v=function(a,b,c){var d=new Dash.vo.Event,e=a[0],f=a[1],g=a[2],h=a[3],i=a[4],j=a[5],k=a[6],l=c*g+h;return b[e]?(d.eventStream=b[e],d.eventStream.value=f,d.eventStream.timescale=g,d.duration=i,d.id=j,d.presentationTime=l,d.messageData=k,d.presentationTimeDelta=h,d):null},w=function(a,b,f){var g=[];return b instanceof MediaPlayer.vo.StreamInfo?g=this.manifestExt.getEventsForPeriod(a,e(b)):b instanceof MediaPlayer.vo.MediaInfo?g=this.manifestExt.getEventStreamForAdaptationSet(a,d(b)):b instanceof MediaPlayer.vo.TrackInfo&&(g=this.manifestExt.getEventStreamForRepresentation(a,c(b,f.trackController))),g};return{system:void 0,manifestExt:void 0,timelineConverter:void 0,metricsList:{TCP_CONNECTION:"TcpConnection",HTTP_REQUEST:"HttpRequest",HTTP_REQUEST_TRACE:"HttpRequestTrace",TRACK_SWITCH:"RepresentationSwitch",BUFFER_LEVEL:"BufferLevel",BUFFER_STATE:"BufferState",DVR_INFO:"DVRInfo",DROPPED_FRAMES:"DroppedFrames",SCHEDULING_INFO:"SchedulingInfo",MANIFEST_UPDATE:"ManifestUpdate",MANIFEST_UPDATE_STREAM_INFO:"ManifestUpdatePeriodInfo",MANIFEST_UPDATE_TRACK_INFO:"ManifestUpdateRepresentationInfo",PLAY_LIST:"PlayList",PLAY_LIST_TRACE:"PlayListTrace"},convertDataToTrack:f,convertDataToMedia:g,convertDataToStream:h,getDataForTrack:c,getDataForMedia:d,getDataForStream:e,getStreamsInfo:k,getManifestInfo:l,getMediaInfoForType:j,getCurrentTrackInfo:u,getTrackInfoForQuality:t,updateData:s,getInitRequest:m,getNextFragmentRequest:n,getFragmentRequestForTime:o,generateFragmentRequestForTime:p,getIndexHandlerTime:q,setIndexHandlerTime:r,getEventsFor:w,getEvent:v,reset:function(){a=[],b={}}}},Dash.dependencies.DashAdapter.prototype={constructor:Dash.dependencies.DashAdapter},Dash.create=function(a,b,c){if("undefined"==typeof a||"VIDEO"!=a.nodeName)return null;var d,e=a.id||a.name||"video element";if(c=c||new Dash.di.DashContext,b=b||[].slice.call(a.querySelectorAll("source")).filter(function(a){return a.type==Dash.supportedManifestMimeTypes.mimeType})[0],void 0===b&&a.src)b=document.createElement("source"),b.src=a.src;else if(void 0===b&&!a.src)return null;return d=new MediaPlayer(c),d.startup(),d.attachView(a),d.setAutoPlay(a.autoplay),d.attachSource(b.src),d.getDebug().log("Converted "+e+" to dash.js player and added content: "+b.src),d},Dash.createAll=function(a,b,c){var d=[];a=a||".dashjs-player",b=b||document,c=c||new Dash.di.DashContext;for(var e=b.querySelectorAll(a),f=0;f<e.length;f++){var g=Dash.create(e[f],void 0,c);d.push(g)}return d},Dash.supportedManifestMimeTypes={mimeType:"application/dash+xml"},Dash.dependencies.DashHandler=function(){"use strict";var a,b,c,d=-1,e=0,f=new RegExp("^(?:(?:[a-z]+:)?/)?/","i"),g=function(a,b){for(;a.length<b;)a="0"+a;return a},h=function(a,b,c){for(var d,e,f,h,i,j,k=b.length,l="%0",m=l.length;;){if(d=a.indexOf("$"+b),0>d)return a;if(e=a.indexOf("$",d+k),0>e)return a;if(f=a.indexOf(l,d+k),f>d&&e>f)switch(h=a.charAt(e-1),i=parseInt(a.substring(f+m,e-1),10),h){case"d":case"i":case"u":j=g(c.toString(),i);break;case"x":j=g(c.toString(16),i);break;case"X":j=g(c.toString(16),i).toUpperCase();break;case"o":j=g(c.toString(8),i);break;default:return this.log("Unsupported/invalid IEEE 1003.1 format identifier string in URL"),a}else j=c;a=a.substring(0,d)+j+a.substring(e+1)}},i=function(a){return a.split("$$").join("$")},j=function(a,b){if(null===b||-1===a.indexOf("$RepresentationID$"))return a;var c=b.toString();return a.split("$RepresentationID$").join(c)},k=function(a,b){return a.representation.startNumber+b},l=function(a,b){var c,d=b.adaptation.period.mpd.manifest.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index].Representation_asArray[b.index].BaseURL;return c=a===d?a:f.test(a)?a:d+a},m=function(a,c){var d,e,f=this,g=new MediaPlayer.vo.FragmentRequest;return d=a.adaptation.period,g.mediaType=c,g.type="Initialization Segment",g.url=l(a.initialization,a),g.range=a.range,e=d.start,g.availabilityStartTime=f.timelineConverter.calcAvailabilityStartTimeFromPresentationTime(e,a.adaptation.period.mpd,b),g.availabilityEndTime=f.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(e+d.duration,d.mpd,b),g.quality=a.index,g},n=function(a){var b,d=this;return a?b=m.call(d,a,c):null},o=function(a){var c,e,f,g=a.adaptation.period,h=!1;return 0>d?h=!1:b||d<a.availableSegmentsNumber?(e=B(d,a),e&&(f=e.presentationStartTime-g.start,c=a.adaptation.period.duration,this.log(a.segmentInfoType+": "+f+" / "+c),h=f>=c)):h=!0,h},p=function(a,c){var d,e,f,g,h=this;return e=a.segmentDuration,isNaN(e)&&(e=a.adaptation.period.duration),f=a.adaptation.period.start+c*e,g=f+e,d=new Dash.vo.Segment,d.representation=a,d.duration=e,d.presentationStartTime=f,d.mediaStartTime=h.timelineConverter.calcMediaTimeFromPresentationTime(d.presentationStartTime,a),d.availabilityStartTime=h.timelineConverter.calcAvailabilityStartTimeFromPresentationTime(d.presentationStartTime,a.adaptation.period.mpd,b),d.availabilityEndTime=h.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(g,a.adaptation.period.mpd,b),d.wallStartTime=h.timelineConverter.calcWallTimeForSegment(d,b),d.replacementNumber=k(d,c),d.availabilityIdx=c,d},q=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q=this,r=b.adaptation.period.mpd.manifest.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index].Representation_asArray[b.index].SegmentTemplate,s=r.SegmentTimeline,v=b.availableSegmentsNumber>0,w=10,x=[],y=0,z=0,A=-1,B=function(a){return u.call(q,b,y,a.d,p,r.media,a.mediaRange,A)};for(p=b.timescale,c=s.S_asArray,k=t.call(q,b),k?(n=k.start,o=k.end):m=q.timelineConverter.calcMediaTimeFromPresentationTime(a||0,b),e=0,f=c.length;f>e;e+=1)if(d=c[e],h=0,d.hasOwnProperty("r")&&(h=d.r),d.hasOwnProperty("t")&&(y=d.t,z=y/p),0>h&&(j=c[e+1],j&&j.hasOwnProperty("t")?i=j.t/p:(i=q.timelineConverter.calcMediaTimeFromPresentationTime(b.segmentAvailabilityRange.end,b),b.segmentDuration=d.d/p),h=Math.ceil((i-z)/(d.d/p))-1),l){if(v)break;A+=h+1}else for(g=0;h>=g;g+=1){if(A+=1,k){if(A>o){if(l=!0,v)break;continue}A>=n&&x.push(B.call(q,d))}else{if(x.length>w){if(l=!0,v)break;continue}z>=m-d.d/p&&x.push(B.call(q,d))}y+=d.d,z=y/p}return v||(b.availableSegmentsNumber=A+1),x},r=function(a){var c,d,e,f,g,i=[],j=this,k=a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].SegmentTemplate,l=a.segmentDuration,m=a.segmentAvailabilityRange,n=null,o=null;for(g=a.startNumber,c=isNaN(l)&&!b?{start:g,end:g}:s.call(j,a),e=c.start,f=c.end,d=e;f>=d;d+=1)n=p.call(j,a,d),n.replacementTime=(g+d-1)*a.segmentDuration,o=k.media,o=h(o,"Number",n.replacementNumber),o=h(o,"Time",n.replacementTime),n.media=o,i.push(n),n=null;return a.availableSegmentsNumber=isNaN(l)?1:Math.ceil((m.end-m.start)/l),i},s=function(c){var e,f,g,h=this,i=c.segmentDuration,j=c.adaptation.period.mpd.manifest.minBufferTime,k=c.segmentAvailabilityRange,l={start:h.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(c,k.start),end:h.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(c,k.end)},m=0/0,n=null,o=c.segments,p=2*i,q=Math.max(2*j,10*i);return l||(l=h.timelineConverter.calcSegmentAvailabilityRange(c,b)),l.start=Math.max(l.start,0),b&&!h.timelineConverter.isTimeSyncCompleted()?(e=Math.floor(l.start/i),f=Math.floor(l.end/i),g={start:e,end:f}):(o&&o.length>0?(n=B(d,c),m=n?h.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(c,n.presentationStartTime):d>0?d*i:h.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(c,a||o[0].presentationStartTime)):m=d>0?d*i:b?l.end:l.start,e=Math.floor(Math.max(m-p,l.start)/i),f=Math.floor(Math.min(e+q/i,l.end/i)),g={start:e,end:f})},t=function(){var c,e,f,g=2,h=10,i=0,j=Number.POSITIVE_INFINITY;return b&&!this.timelineConverter.isTimeSyncCompleted()?f={start:i,end:j}:!b&&a||0>d?null:(c=Math.max(d-g,i),e=Math.min(d+h,j),f={start:c,end:e})},u=function(a,c,d,e,f,g,i){var j,l,m,n=this,o=c/e,p=Math.min(d/e,a.adaptation.period.mpd.maxSegmentDuration);return j=n.timelineConverter.calcPresentationTimeFromMediaTime(o,a),l=j+p,m=new Dash.vo.Segment,m.representation=a,m.duration=p,m.mediaStartTime=o,m.presentationStartTime=j,m.availabilityStartTime=a.adaptation.period.mpd.manifest.loadedTime,m.availabilityEndTime=n.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(l,a.adaptation.period.mpd,b),m.wallStartTime=n.timelineConverter.calcWallTimeForSegment(m,b),m.replacementTime=c,m.replacementNumber=k(m,i),f=h(f,"Number",m.replacementNumber),f=h(f,"Time",m.replacementTime),m.media=f,m.mediaRange=g,m.availabilityIdx=i,m},v=function(a){var b,c,d,e,f,g,h,i=this,j=[],k=a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].SegmentList,l=a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].BaseURL,m=k.SegmentURL_asArray.length;for(h=a.startNumber,e=s.call(i,a),f=Math.max(e.start,0),g=Math.min(e.end,k.SegmentURL_asArray.length-1),b=f;g>=b;b+=1)d=k.SegmentURL_asArray[b],c=p.call(i,a,b),c.replacementTime=(h+b-1)*a.segmentDuration,c.media=d.media?d.media:l,c.mediaRange=d.mediaRange,c.index=d.index,c.indexRange=d.indexRange,j.push(c),c=null;return a.availableSegmentsNumber=m,j},w=function(a){var b,c=this,d=a.segmentInfoType;return"SegmentBase"!==d&&"BaseURL"!==d&&C.call(c,a)?("SegmentTimeline"===d?b=q.call(c,a):"SegmentTemplate"===d?b=r.call(c,a):"SegmentList"===d&&(b=v.call(c,a)),x.call(c,a,b)):b=a.segments,b},x=function(a,c){var d,e,f,g;a.segments=c,d=c.length-1,b&&isNaN(this.timelineConverter.getExpectedLiveEdge())&&(g=c[d],e=g.presentationStartTime,f=this.metricsModel.getMetricsFor("stream"),this.timelineConverter.setExpectedLiveEdge(e),this.metricsModel.updateManifestUpdateInfo(this.metricsExt.getCurrentManifestUpdate(f),{presentationStartTime:e}))},y=function(a){var b=this;if(!a)throw new Error("no representation");return a.segments=null,w.call(b,a),a},z=function(a,e){var f,g=this,h=a.initialization,i="BaseURL"!==a.segmentInfoType&&"SegmentBase"!==a.segmentInfoType;return a.segmentDuration||a.segments||y.call(g,a),a.segmentAvailabilityRange=null,a.segmentAvailabilityRange=g.timelineConverter.calcSegmentAvailabilityRange(a,b),a.segmentAvailabilityRange.end<a.segmentAvailabilityRange.start&&!a.useCalculatedLiveEdgeTime?(f=new MediaPlayer.vo.Error(Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE,"no segments are available yet",{availabilityDelay:Math.abs(a.segmentAvailabilityRange.end)}),void g.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED,{representation:a},f)):(e||(d=-1),a.segmentDuration&&y.call(g,a),h||g.baseURLExt.loadInitialization(a),i||g.baseURLExt.loadSegments(a,c,a.indexRange),void(h&&i&&g.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED,{representation:a})))},A=function(a,b,c){var d,e,f,g,h,i=b.segments,j=i?i.length:null,k=-1;if(i&&j>0)for(h=0;j>h;h+=1)if(e=i[h],f=e.presentationStartTime,g=e.duration,d=void 0===c||null===c?g/2:c,a+d>=f&&f+g>a-d){k=e.availabilityIdx;break}return k},B=function(a,b){if(!b||!b.segments)return null;var c,d,e=b.segments.length;for(d=0;e>d;d+=1)if(c=b.segments[d],c.availabilityIdx===a)return c;return null},C=function(a){var b,c,e=!1,f=a.segments;return f&&0!==f.length?(c=f[0].availabilityIdx,b=f[f.length-1].availabilityIdx,e=c>d||d>b):e=!0,e},D=function(a){if(null===a||void 0===a)return null;var b,d=new MediaPlayer.vo.FragmentRequest,e=a.representation,f=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].bandwidth;return b=l(a.media,e),b=h(b,"Number",a.replacementNumber),b=h(b,"Time",a.replacementTime),b=h(b,"Bandwidth",f),b=j(b,e.id),b=i(b),d.mediaType=c,d.type="Media Segment",d.url=b,d.range=a.mediaRange,d.startTime=a.presentationStartTime,d.duration=a.duration,d.timescale=e.timescale,d.availabilityStartTime=a.availabilityStartTime,d.availabilityEndTime=a.availabilityEndTime,d.wallStartTime=a.wallStartTime,d.quality=e.index,d.index=a.availabilityIdx,d},E=function(b,e,f){var g,h,i,j=d,k=f?f.keepIdx:!1,l=f?f.timeThreshold:null,m=f&&f.ignoreIsFinished?!0:!1,n=this;return b?(a=e,n.log("Getting the request for time: "+e),d=A.call(n,e,b,l),w.call(n,b),0>d&&(d=A.call(n,e,b,l)),n.log("Index for time "+e+" is "+d),i=m?!1:o.call(n,b),i?(g=new MediaPlayer.vo.FragmentRequest,g.action=g.ACTION_COMPLETE,g.index=d,g.mediaType=c,n.log("Signal complete."),n.log(g)):(h=B(d,b),g=D.call(n,h)),k&&(d=j),g):null},F=function(a,b){var c=(a.segmentAvailabilityRange.end-a.segmentAvailabilityRange.start)/2;return a.segments=null,a.segmentAvailabilityRange={start:b-c,end:b+c},E.call(this,a,b,{keepIdx:!1,ignoreIsFinished:!0})},G=function(b){var e,f,g,h,i=this;if(!b)return null;if(-1===d)throw"You must call getSegmentRequestForTime first.";return a=null,d+=1,h=d,g=o.call(i,b),g?(e=new MediaPlayer.vo.FragmentRequest,e.action=e.ACTION_COMPLETE,e.index=h,e.mediaType=c,i.log("Signal complete.")):(w.call(i,b),f=B(h,b),e=D.call(i,f)),e},H=function(a){var b=a.data.representation;b.segments&&this.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED,{representation:b})},I=function(a){if(!a.error&&c===a.data.mediaType){var b,d,e,f,g=this,h=a.data.segments,i=a.data.representation,j=[],k=0;for(b=0,d=h.length;d>b;b+=1)e=h[b],f=u.call(g,i,e.startTime,e.duration,e.timescale,e.media,e.mediaRange,k),j.push(f),f=null,k+=1;i.segmentAvailabilityRange={start:j[0].presentationStartTime,end:j[d-1].presentationStartTime},i.availableSegmentsNumber=d,x.call(g,i,j),i.initialization&&this.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED,{representation:i})}};return{log:void 0,baseURLExt:void 0,timelineConverter:void 0,metricsModel:void 0,metricsExt:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,setup:function(){this[Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED]=H,this[Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED]=I},initialize:function(a){this.subscribe(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED,a.trackController),c=a.getType(),this.setMediaType(c),b=a.isDynamic(),this.streamProcessor=a},getType:function(){return c},setType:function(a){c=a},getIsDynamic:function(){return b},setIsDynamic:function(a){b=a},setCurrentTime:function(a){e=a},getCurrentTime:function(){return e},reset:function(){e=0,a=void 0,d=-1,b=void 0,this.unsubscribe(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED,this.streamProcessor.trackController)},getInitRequest:n,getSegmentRequestForTime:E,getNextSegmentRequest:G,generateSegmentRequestForTime:F,updateRepresentation:z}},Dash.dependencies.DashHandler.prototype={constructor:Dash.dependencies.DashHandler},Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE=1,Dash.dependencies.DashHandler.eventList={ENAME_REPRESENTATION_UPDATED:"representationUpdated"},Dash.dependencies.DashParser=function(){"use strict";var a=31536e3,b=2592e3,c=86400,d=3600,e=60,f=60,g=1e3,h=/^([-])?P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/,i=/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+-])([0-9]{2})([0-9]{2}))?/,j=/^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/,k=[{type:"duration",test:function(a){for(var b=["minBufferTime","mediaPresentationDuration","minimumUpdatePeriod","timeShiftBufferDepth","maxSegmentDuration","maxSubsegmentDuration","suggestedPresentationDelay","start","starttime","duration"],c=b.length,d=0;c>d;d++)if(a.nodeName===b[d])return h.test(a.value);return!1},converter:function(f){var g=h.exec(f),i=parseFloat(g[2]||0)*a+parseFloat(g[4]||0)*b+parseFloat(g[6]||0)*c+parseFloat(g[8]||0)*d+parseFloat(g[10]||0)*e+parseFloat(g[12]||0);return void 0!==g[1]&&(i=-i),i}},{type:"datetime",test:function(a){return i.test(a.value)},converter:function(a){var b,c=i.exec(a);if(b=Date.UTC(parseInt(c[1],10),parseInt(c[2],10)-1,parseInt(c[3],10),parseInt(c[4],10),parseInt(c[5],10),c[6]&&parseInt(c[6],10)||0,c[7]&&parseFloat(c[7])*g||0),c[9]&&c[10]){var d=parseInt(c[9],10)*f+parseInt(c[10],10);b+=("+"===c[8]?-1:1)*d*e*g}return new Date(b)}},{type:"numeric",test:function(a){return j.test(a.value)},converter:function(a){return parseFloat(a)}}],l=function(){var a,b,c,d;return d=[{name:"profiles",merge:!1},{name:"width",merge:!1},{name:"height",merge:!1},{name:"sar",merge:!1},{name:"frameRate",merge:!1},{name:"audioSamplingRate",merge:!1},{name:"mimeType",merge:!1},{name:"segmentProfiles",merge:!1},{name:"codecs",merge:!1},{name:"maximumSAPPeriod",merge:!1},{name:"startsWithSap",merge:!1},{name:"maxPlayoutRate",merge:!1},{name:"codingDependency",merge:!1},{name:"scanType",merge:!1},{name:"FramePacking",merge:!0},{name:"AudioChannelConfiguration",merge:!0},{name:"ContentProtection",merge:!0}],a={},a.name="AdaptationSet",a.isRoot=!1,a.isArray=!0,a.parent=null,a.children=[],a.properties=d,b={},b.name="Representation",b.isRoot=!1,b.isArray=!0,b.parent=a,b.children=[],b.properties=d,a.children.push(b),c={},c.name="SubRepresentation",c.isRoot=!1,c.isArray=!0,c.parent=b,c.children=[],c.properties=d,b.children.push(c),a},m=function(){var a,b,c,d;return d=[{name:"SegmentBase",merge:!0},{name:"SegmentTemplate",merge:!0},{name:"SegmentList",merge:!0}],a={},a.name="Period",a.isRoot=!1,a.isArray=!0,a.parent=null,a.children=[],a.properties=d,b={},b.name="AdaptationSet",b.isRoot=!1,b.isArray=!0,b.parent=a,b.children=[],b.properties=d,a.children.push(b),c={},c.name="Representation",c.isRoot=!1,c.isArray=!0,c.parent=b,c.children=[],c.properties=d,b.children.push(c),a},n=function(){var a,b,c,d,e;return e=[{name:"BaseURL",merge:!0,mergeFunction:function(a,b){var c;return c=0===b.indexOf("http://")?b:a+b}}],a={},a.name="mpd",a.isRoot=!0,a.isArray=!0,a.parent=null,a.children=[],a.properties=e,b={},b.name="Period",b.isRoot=!1,b.isArray=!0,b.parent=null,b.children=[],b.properties=e,a.children.push(b),c={},c.name="AdaptationSet",c.isRoot=!1,c.isArray=!0,c.parent=b,c.children=[],c.properties=e,b.children.push(c),d={},d.name="Representation",d.isRoot=!1,d.isArray=!0,d.parent=c,d.children=[],d.properties=e,c.children.push(d),a},o=function(){var a=[];return a.push(l()),a.push(m()),a.push(n()),a},p=function(a,b){var c,d=new X2JS(k,"",!0),e=new ObjectIron(o()),f=new Date,g=null,h=null;try{c=d.xml_str2json(a),g=new Date,c.hasOwnProperty("BaseURL")?(c.BaseURL=c.BaseURL_asArray[0],0!==c.BaseURL.toString().indexOf("http")&&(c.BaseURL=b+c.BaseURL)):c.BaseURL=b,c.hasOwnProperty("Location")&&(c.Location=c.Location_asArray[0]),e.run(c),h=new Date,this.xlinkController.setMatchers(k),this.xlinkController.setIron(e),this.log("Parsing complete: ( xml2json: "+(g.getTime()-f.getTime())+"ms, objectiron: "+(h.getTime()-g.getTime())+"ms, total: "+(h.getTime()-f.getTime())/1e3+"s)")}catch(i){return this.errHandler.manifestError("parsing the manifest failed","parse",a),null}return c};return{log:void 0,errHandler:void 0,xlinkController:void 0,parse:p}},Dash.dependencies.DashParser.prototype={constructor:Dash.dependencies.DashParser},Dash.dependencies.TimelineConverter=function(){"use strict";var a=0,b=!1,c=0/0,d=function(b,c,d,e){var f=0/0;return f=e?d&&c.timeShiftBufferDepth!=Number.POSITIVE_INFINITY?new Date(c.availabilityStartTime.getTime()+1e3*(b+c.timeShiftBufferDepth)):c.availabilityEndTime:d?new Date(c.availabilityStartTime.getTime()+1e3*(b-a)):c.availabilityStartTime},e=function(a,b,c){return d.call(this,a,b,c)},f=function(a,b,c){return d.call(this,a,b,c,!0)},g=function(b,c){return(b.getTime()-c.mpd.availabilityStartTime.getTime()+1e3*a)/1e3},h=function(a,b){var c=b.adaptation.period.start,d=b.presentationTimeOffset;return a+(c-d)},i=function(a,b){var c=b.adaptation.period.start,d=b.presentationTimeOffset;return a-c+d},j=function(a,b){var c,d,e;return b&&(c=a.representation.adaptation.period.mpd.suggestedPresentationDelay,d=a.presentationStartTime+c,e=new Date(a.availabilityStartTime.getTime()+1e3*d)),e},k=function(a,c){var d,e,f=a.adaptation.period.start,h=f+a.adaptation.period.duration,i={start:f,end:h},j=a.segmentDuration||(a.segments&&a.segments.length?a.segments[a.segments.length-1].duration:0);return c?!b&&a.segmentAvailabilityRange?a.segmentAvailabilityRange:(d=a.adaptation.period.mpd.checkTime,e=g(new Date,a.adaptation.period),f=Math.max(e-a.adaptation.period.mpd.timeShiftBufferDepth,0),h=(isNaN(d)?e:Math.min(d,e))-j,i={start:f,end:h}):i},l=function(a,b){var c=a.adaptation.period.start;return b-c},m=function(a,b){var c=a.adaptation.period.start;return b+c},n=function(d){b||d.error||(a+=d.data.liveEdge-(c+d.data.searchTime),b=!0)},o=function(c){b||c.error||(a=c.data.offset/1e3,b=!0)},p=function(a){var b=a.presentationTimeOffset,c=a.adaptation.period.start;return c-b},q=function(){a=0,b=!1,c=0/0};return{setup:function(){this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED]=n,this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED]=o},calcAvailabilityStartTimeFromPresentationTime:e,calcAvailabilityEndTimeFromPresentationTime:f,calcPresentationTimeFromWallTime:g,calcPresentationTimeFromMediaTime:h,calcPeriodRelativeTimeFromMpdRelativeTime:l,calcMpdRelativeTimeFromPeriodRelativeTime:m,calcMediaTimeFromPresentationTime:i,calcSegmentAvailabilityRange:k,calcWallTimeForSegment:j,calcMSETimeOffset:p,reset:q,isTimeSyncCompleted:function(){return b},setTimeSyncCompleted:function(a){b=a},getClientTimeOffset:function(){return a},getExpectedLiveEdge:function(){return c},setExpectedLiveEdge:function(a){c=a}}},Dash.dependencies.TimelineConverter.prototype={constructor:Dash.dependencies.TimelineConverter},Dash.dependencies.RepresentationController=function(){"use strict";var a,b=null,c=-1,d=!0,e=[],f=function(c,f,g){var h,j=this,k=null,m=j.streamProcessor.getStreamInfo(),n=j.abrController.getTopQualityIndexFor(g,m.id);if(d=!0,j.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED),e=l.call(j,f),null===b?(k=j.abrController.getInitialBitrateFor(g,m),h=j.abrController.getQualityForBitrate(j.streamProcessor.getMediaInfo(),k)):h=j.abrController.getQualityFor(g,m),h>n&&(h=n),a=i.call(j,h),b=c,"video"!==g&&"audio"!==g&&"fragmentedText"!==g)return d=!1,void j.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,{data:b,currentRepresentation:a});for(var o=0;o<e.length;o+=1)j.indexHandler.updateRepresentation(e[o],!0)},g=function(){var a=new Date,b=this.getCurrentRepresentation(),c=this.streamProcessor.playbackController.getTime();this.metricsModel.addTrackSwitch(b.adaptation.type,a,c,b.id)},h=function(){var b=this.streamProcessor,c=this.timelineConverter.calcSegmentAvailabilityRange(a,b.isDynamic());this.metricsModel.addDVRInfo(b.getType(),b.playbackController.getTime(),b.getStreamInfo().manifestInfo,c)},i=function(a){return e[a]},j=function(a){return e.indexOf(a)},k=function(){for(var a=0,b=e.length;b>a;a+=1){var c=e[a].segmentInfoType;if(null===e[a].segmentAvailabilityRange||null===e[a].initialization||("SegmentBase"===c||"BaseURL"===c)&&!e[a].segments)return!1}return!0},l=function(a){var d,e=this,f=e.manifestModel.getValue();return c=e.manifestExt.getIndexForAdaptation(b,f,a.period.index),d=e.manifestExt.getRepresentationsForAdaptation(f,a)},m=function(a){for(var b,c=this,d=0,f=e.length;f>d;d+=1)b=e[d],b.segmentAvailabilityRange=c.timelineConverter.calcSegmentAvailabilityRange(b,a)},n=function(b){var c=this,f=1e3*(b+3*a.segmentDuration),g=function(){if(!this.isUpdating()){d=!0,c.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED);for(var a=0;a<e.length;a+=1)c.indexHandler.updateRepresentation(e[a],!0)}};d=!1,setTimeout(g.bind(this),f)},o=function(c){if(this.isUpdating()){var e,f,i,l=this,m=c.data.representation,o=l.metricsModel.getMetricsFor("stream"),p=l.metricsModel.getMetricsFor(this.getCurrentRepresentation().adaptation.type),q=l.metricsExt.getCurrentManifestUpdate(o),r=!1;if(c.error&&c.error.code===Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE)return h.call(this),n.call(this,c.error.data.availabilityDelay),f=new MediaPlayer.vo.Error(Dash.dependencies.RepresentationController.SEGMENTS_UPDATE_FAILED_ERROR_CODE,"Segments update failed",null),void this.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,{data:b,currentRepresentation:a},f);if(q){for(var s=0;s<q.trackInfo.length;s+=1)if(e=q.trackInfo[s],e.index===m.index&&e.mediaType===l.streamProcessor.getType()){r=!0;break}r||l.metricsModel.addManifestUpdateTrackInfo(q,m.id,m.index,m.adaptation.period.index,l.streamProcessor.getType(),m.presentationTimeOffset,m.startNumber,m.segmentInfoType)}k()&&(d=!1,l.abrController.setPlaybackQuality(l.streamProcessor.getType(),l.streamProcessor.getStreamInfo(),j.call(this,a)),l.metricsModel.updateManifestUpdateInfo(q,{latency:a.segmentAvailabilityRange.end-l.streamProcessor.playbackController.getTime()}),i=l.metricsExt.getCurrentRepresentationSwitch(p),i||g.call(l),this.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,{data:b,currentRepresentation:a}))}},p=function(a){m.call(this,a.data.isDynamic)},q=function(b){if(!b.error){m.call(this,!0),this.indexHandler.updateRepresentation(a,!1);var c=this.manifestModel.getValue(),d=a.adaptation.period,e=this.streamController.getActiveStreamInfo();e.isLast&&(d.mpd.checkTime=this.manifestExt.getCheckTime(c,d),d.duration=this.manifestExt.getEndTimeForLastPeriod(this.manifestModel.getValue(),d)-d.start,e.duration=d.duration)}},r=function(){h.call(this)},s=function(b){var c=this;b.data.mediaType===c.streamProcessor.getType()&&c.streamProcessor.getStreamInfo().id===b.data.streamInfo.id&&(a=c.getRepresentationForQuality(b.data.newQuality),t.call(c,b.data.mediaType,a.bandwidth),g.call(c))},t=function(a,b){!this.DOMStorage.isSupported(MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL)||"video"!==a&&"audio"!==a||localStorage.setItem(MediaPlayer.utils.DOMStorage["LOCAL_STORAGE_"+a.toUpperCase()+"_BITRATE_KEY"],JSON.stringify({
bitrate:b/1e3,timestamp:(new Date).getTime()}))};return{system:void 0,log:void 0,manifestExt:void 0,manifestModel:void 0,metricsModel:void 0,metricsExt:void 0,abrController:void 0,streamController:void 0,timelineConverter:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,DOMStorage:void 0,setup:function(){this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED]=s,this[Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED]=o,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED]=p,this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED]=q,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED]=r},initialize:function(a){this.streamProcessor=a,this.indexHandler=a.indexHandler},getData:function(){return b},getDataIndex:function(){return c},isUpdating:function(){return d},updateData:f,getRepresentationForQuality:i,getCurrentRepresentation:function(){return a}}},Dash.dependencies.RepresentationController.prototype={constructor:Dash.dependencies.RepresentationController},Dash.dependencies.RepresentationController.SEGMENTS_UPDATE_FAILED_ERROR_CODE=1,Dash.dependencies.RepresentationController.eventList={ENAME_DATA_UPDATE_COMPLETED:"dataUpdateCompleted",ENAME_DATA_UPDATE_STARTED:"dataUpdateStarted"},Dash.dependencies.BaseURLExtensions=function(){"use strict";var a=function(a,b){for(var c,d,e,f,g,h,i,j,k,l,m=new DataView(a),n={},o=0;"sidx"!==j&&o<m.byteLength;){for(k=m.getUint32(o),o+=4,j="",f=0;4>f;f+=1)l=m.getInt8(o),j+=String.fromCharCode(l),o+=1;"moof"!==j&&"traf"!==j&&"sidx"!==j?o+=k-8:"sidx"===j&&(o-=8)}if(e=m.getUint32(o,!1)+o,e>a.byteLength)throw"sidx terminates after array buffer";for(n.version=m.getUint8(o+8),o+=12,n.timescale=m.getUint32(o+4,!1),o+=8,0===n.version?(n.earliest_presentation_time=m.getUint32(o,!1),n.first_offset=m.getUint32(o+4,!1),o+=8):(n.earliest_presentation_time=utils.Math.to64BitNumber(m.getUint32(o+4,!1),m.getUint32(o,!1)),n.first_offset=(m.getUint32(o+8,!1)<<32)+m.getUint32(o+12,!1),o+=16),n.first_offset+=e+(b||0),n.reference_count=m.getUint16(o+2,!1),o+=4,n.references=[],c=n.first_offset,d=n.earliest_presentation_time,f=0;f<n.reference_count;f+=1)h=m.getUint32(o,!1),g=h>>>31,h=2147483647&h,i=m.getUint32(o+4,!1),o+=12,n.references.push({size:h,type:g,offset:c,duration:i,time:d,timescale:n.timescale}),c+=h,d+=i;if(o!==e)throw"Error: final pos "+o+" differs from SIDX end "+e;return n},b=function(b,c,d){var e,f,g,h,i,j,k,l;for(e=a.call(this,b,d),f=e.references,g=[],i=0,j=f.length;j>i;i+=1)h=new Dash.vo.Segment,h.duration=f[i].duration,h.media=c,h.startTime=f[i].time,h.timescale=f[i].timescale,k=f[i].offset,l=f[i].offset+f[i].size-1,h.mediaRange=k+"-"+l,g.push(h);return this.log("Parsed SIDX box: "+g.length+" segments."),g},c=function(a,b,d){var e,f,h,i,j,k,l,m,n=new DataView(a),o=0,p="",q=0,r=!1,s=this;for(s.log("Searching for initialization.");"moov"!==p&&o<n.byteLength;){for(q=n.getUint32(o),o+=4,p="",j=0;4>j;j+=1)k=n.getInt8(o),p+=String.fromCharCode(k),o+=1;"ftyp"===p&&(e=o-8),"moov"===p&&(f=o-8),"moov"!==p&&(o+=q-8)}"moov"!==p?(s.log("Loading more bytes to find initialization."),b.range.start=0,b.range.end=b.bytesLoaded+b.bytesToLoad,l=new XMLHttpRequest,l.onloadend=function(){r||d.call(s,null,new Error("Error loading initialization."))},l.onload=function(){r=!0,b.bytesLoaded=b.range.end,c.call(s,l.response,function(a){d.call(s,a)})},l.onerror=function(){d.call(s,null,new Error("Error loading initialization."))},g.call(s,l,b)):(h=void 0===e?f:e,i=f+q-1,m=h+"-"+i,s.log("Found the initialization.  Range: "+m),d.call(s,m))},d=function(a){var b=new XMLHttpRequest,d=!0,e=this,f=a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].BaseURL,h={url:f,range:{},searching:!1,bytesLoaded:0,bytesToLoad:1500,request:b};e.log("Start searching for initialization."),h.range.start=0,h.range.end=h.bytesToLoad,b.onload=function(){b.status<200||b.status>299||(d=!1,h.bytesLoaded=h.range.end,c.call(e,b.response,h,function(b){a.range=b,a.initialization=f,e.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED,{representation:a})}))},b.onloadend=b.onerror=function(){d&&(d=!1,e.errHandler.downloadError("initialization",h.url,b),e.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED,{representation:a}))},g.call(e,b,h),e.log("Perform init search: "+h.url)},e=function(a,c,d,h){var i,j,k,l,m,n,o,p,q,r=new DataView(a),s=new XMLHttpRequest,t=0,u="",v=0,w=!0,x=!1,y=this;for(y.log("Searching for SIDX box."),y.log(c.bytesLoaded+" bytes loaded.");"sidx"!==u&&t<r.byteLength;){for(v=r.getUint32(t),t+=4,u="",n=0;4>n;n+=1)o=r.getInt8(t),u+=String.fromCharCode(o),t+=1;"sidx"!==u&&(t+=v-8)}if(j=r.byteLength-t,"sidx"!==u)h.call(y);else if(v-8>j)y.log("Found SIDX but we don't have all of it."),c.range.start=0,c.range.end=c.bytesLoaded+(v-j),s.onload=function(){s.status<200||s.status>299||(w=!1,c.bytesLoaded=c.range.end,e.call(y,s.response,c,d,h))},s.onloadend=s.onerror=function(){w&&(w=!1,y.errHandler.downloadError("SIDX",c.url,s),h.call(y))},g.call(y,s,c);else if(c.range.start=t-8,c.range.end=c.range.start+v,y.log("Found the SIDX box.  Start: "+c.range.start+" | End: "+c.range.end),k=new ArrayBuffer(c.range.end-c.range.start),m=new Uint8Array(k),l=new Uint8Array(a,c.range.start,c.range.end-c.range.start),m.set(l),p=this.parseSIDX.call(this,k,c.range.start),q=p.references,null!==q&&void 0!==q&&q.length>0&&(x=1===q[0].type),x){y.log("Initiate multiple SIDX load.");var z,A,B,C,D,E=[],F=0,G=function(a){a?(E=E.concat(a),F+=1,F>=A&&h.call(y,E)):h.call(y)};for(z=0,A=q.length;A>z;z+=1)B=q[z].offset,C=q[z].offset+q[z].size-1,D=B+"-"+C,f.call(y,d,null,D,G)}else y.log("Parsing segments from SIDX."),i=b.call(y,k,c.url,c.range.start),h.call(y,i)},f=function(a,c,d,f){var h,i,j=new XMLHttpRequest,k=a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].BaseURL,l=!0,m=this,n={url:k,range:{},searching:!1,bytesLoaded:0,bytesToLoad:1500,request:j};null===d?(m.log("No known range for SIDX request."),n.searching=!0,n.range.start=0,n.range.end=n.bytesToLoad):(i=d.split("-"),n.range.start=parseFloat(i[0]),n.range.end=parseFloat(i[1])),j.onload=function(){j.status<200||j.status>299||(l=!1,n.searching?(n.bytesLoaded=n.range.end,e.call(m,j.response,n,a,function(b){b&&f.call(m,b,a,c)})):(h=b.call(m,j.response,n.url,n.range.start),f.call(m,h,a,c)))},j.onloadend=j.onerror=function(){l&&(l=!1,m.errHandler.downloadError("SIDX",n.url,j),f.call(m,null,a,c))},g.call(m,j,n),m.log("Perform SIDX load: "+n.url)},g=function(a,b){a.open("GET",this.requestModifierExt.modifyRequestURL(b.url)),a.responseType="arraybuffer",a.setRequestHeader("Range","bytes="+b.range.start+"-"+b.range.end),a=this.requestModifierExt.modifyRequestHeader(a),a.send(null)},h=function(a,b,c){var d=this;a?d.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED,{segments:a,representation:b,mediaType:c}):d.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED,{segments:null,representation:b,mediaType:c},new MediaPlayer.vo.Error(null,"error loading segments",null))};return{log:void 0,errHandler:void 0,requestModifierExt:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,loadSegments:function(a,b,c){f.call(this,a,b,c,h.bind(this))},loadInitialization:d,parseSegments:b,parseSIDX:a,findSIDX:e}},Dash.dependencies.BaseURLExtensions.prototype={constructor:Dash.dependencies.BaseURLExtensions},Dash.dependencies.BaseURLExtensions.eventList={ENAME_INITIALIZATION_LOADED:"initializationLoaded",ENAME_SEGMENTS_LOADED:"segmentsLoaded"},Dash.dependencies.DashManifestExtensions=function(){"use strict";this.timelineConverter=void 0},Dash.dependencies.DashManifestExtensions.prototype={constructor:Dash.dependencies.DashManifestExtensions,getIsTypeOf:function(a,b){"use strict";var c,d,e,f=a.ContentComponent_asArray,g=new RegExp("text"!==b?b:"(vtt|ttml)"),h=!1,i=!1;if(a.Representation_asArray.length>0&&a.Representation_asArray[0].hasOwnProperty("codecs")&&"stpp"==a.Representation_asArray[0].codecs)return"fragmentedText"==b;if(f)for(c=0,d=f.length;d>c;c+=1)f[c].contentType===b&&(h=!0,i=!0);if(a.hasOwnProperty("mimeType")&&(h=g.test(a.mimeType),i=!0),!i)for(c=0,d=a.Representation_asArray.length;!i&&d>c;)e=a.Representation_asArray[c],e.hasOwnProperty("mimeType")&&(h=g.test(e.mimeType),i=!0),c+=1;return h},getIsAudio:function(a){"use strict";return this.getIsTypeOf(a,"audio")},getIsVideo:function(a){"use strict";return this.getIsTypeOf(a,"video")},getIsFragmentedText:function(a){"use strict";return this.getIsTypeOf(a,"fragmentedText")},getIsText:function(a){"use strict";return this.getIsTypeOf(a,"text")},getIsTextTrack:function(a){return"text/vtt"===a||"application/ttml+xml"===a},getLanguageForAdaptation:function(a){var b="";return a.hasOwnProperty("lang")&&(b=a.lang),b},getIsMain:function(){"use strict";return!1},processAdaptation:function(a){"use strict";return void 0!==a.Representation_asArray&&null!==a.Representation_asArray&&a.Representation_asArray.sort(function(a,b){return a.bandwidth-b.bandwidth}),a},getAdaptationForId:function(a,b,c){"use strict";var d,e,f=b.Period_asArray[c].AdaptationSet_asArray;for(d=0,e=f.length;e>d;d+=1)if(f[d].hasOwnProperty("id")&&f[d].id===a)return f[d];return null},getAdaptationForIndex:function(a,b,c){"use strict";var d=b.Period_asArray[c].AdaptationSet_asArray;return d[a]},getIndexForAdaptation:function(a,b,c){"use strict";var d,e,f=b.Period_asArray[c].AdaptationSet_asArray;for(d=0,e=f.length;e>d;d+=1)if(f[d]===a)return d;return-1},getAdaptationsForType:function(a,b,c){"use strict";var d,e,f=this,g=a.Period_asArray[b].AdaptationSet_asArray,h=[];for(d=0,e=g.length;e>d;d+=1)this.getIsTypeOf(g[d],c)&&h.push(f.processAdaptation(g[d]));return h},getAdaptationForType:function(a,b,c){"use strict";var d,e,f,g=this;if(f=this.getAdaptationsForType(a,b,c),!f||0===f.length)return null;for(d=0,e=f.length;e>d;d+=1)if(g.getIsMain(f[d]))return f[d];return f[0]},getCodec:function(a){"use strict";var b=a.Representation_asArray[0];return b.mimeType+';codecs="'+b.codecs+'"'},getMimeType:function(a){"use strict";return a.Representation_asArray[0].mimeType},getKID:function(a){"use strict";return a&&a.hasOwnProperty("cenc:default_KID")?a["cenc:default_KID"]:null},getContentProtectionData:function(a){"use strict";return a&&a.hasOwnProperty("ContentProtection_asArray")&&0!==a.ContentProtection_asArray.length?a.ContentProtection_asArray:null},getIsDynamic:function(a){"use strict";var b=!1,c="dynamic";return a.hasOwnProperty("type")&&(b=a.type===c),b},getIsDVR:function(a){"use strict";var b,c,d=this.getIsDynamic(a);return b=!isNaN(a.timeShiftBufferDepth),c=d&&b},getIsOnDemand:function(a){"use strict";var b=!1;return a.profiles&&a.profiles.length>0&&(b=-1!==a.profiles.indexOf("urn:mpeg:dash:profile:isoff-on-demand:2011")),b},getDuration:function(a){var b;return b=a.hasOwnProperty("mediaPresentationDuration")?a.mediaPresentationDuration:Number.MAX_VALUE},getBandwidth:function(a){"use strict";return a.bandwidth},getRefreshDelay:function(a){"use strict";var b=0/0,c=2;return a.hasOwnProperty("minimumUpdatePeriod")&&(b=Math.max(parseFloat(a.minimumUpdatePeriod),c)),b},getRepresentationCount:function(a){"use strict";return a.Representation_asArray.length},getBitrateListForAdaptation:function(a){if(!a||!a.Representation_asArray||!a.Representation_asArray.length)return null;for(var b=this.processAdaptation(a),c=b.Representation_asArray,d=c.length,e=[],f=0;d>f;f+=1)e.push(c[f].bandwidth);return e},getRepresentationFor:function(a,b){"use strict";return b.Representation_asArray[a]},getRepresentationsForAdaptation:function(a,b){for(var c,d,e,f,g,h=this,i=h.processAdaptation(a.Period_asArray[b.period.index].AdaptationSet_asArray[b.index]),j=[],k=0;k<i.Representation_asArray.length;k+=1)f=i.Representation_asArray[k],c=new Dash.vo.Representation,c.index=k,c.adaptation=b,f.hasOwnProperty("id")&&(c.id=f.id),f.hasOwnProperty("bandwidth")&&(c.bandwidth=f.bandwidth),f.hasOwnProperty("maxPlayoutRate")&&(c.maxPlayoutRate=f.maxPlayoutRate),f.hasOwnProperty("SegmentBase")?(e=f.SegmentBase,c.segmentInfoType="SegmentBase"):f.hasOwnProperty("SegmentList")?(e=f.SegmentList,c.segmentInfoType="SegmentList",c.useCalculatedLiveEdgeTime=!0):f.hasOwnProperty("SegmentTemplate")?(e=f.SegmentTemplate,e.hasOwnProperty("SegmentTimeline")?(c.segmentInfoType="SegmentTimeline",g=e.SegmentTimeline.S_asArray[e.SegmentTimeline.S_asArray.length-1],(!g.hasOwnProperty("r")||g.r>=0)&&(c.useCalculatedLiveEdgeTime=!0)):c.segmentInfoType="SegmentTemplate",e.hasOwnProperty("initialization")&&(c.initialization=e.initialization.split("$Bandwidth$").join(f.bandwidth).split("$RepresentationID$").join(f.id))):(e=f.BaseURL,c.segmentInfoType="BaseURL"),e.hasOwnProperty("Initialization")?(d=e.Initialization,d.hasOwnProperty("sourceURL")?c.initialization=d.sourceURL:d.hasOwnProperty("range")&&(c.initialization=f.BaseURL,c.range=d.range)):f.hasOwnProperty("mimeType")&&h.getIsTextTrack(f.mimeType)&&(c.initialization=f.BaseURL,c.range=0),e.hasOwnProperty("timescale")&&(c.timescale=e.timescale),e.hasOwnProperty("duration")&&(c.segmentDuration=e.duration/c.timescale),e.hasOwnProperty("startNumber")&&(c.startNumber=e.startNumber),e.hasOwnProperty("indexRange")&&(c.indexRange=e.indexRange),e.hasOwnProperty("presentationTimeOffset")&&(c.presentationTimeOffset=e.presentationTimeOffset/c.timescale),c.MSETimeOffset=h.timelineConverter.calcMSETimeOffset(c),j.push(c);return j},getAdaptationsForPeriod:function(a,b){for(var c,d,e=a.Period_asArray[b.index],f=[],g=0;g<e.AdaptationSet_asArray.length;g+=1)d=e.AdaptationSet_asArray[g],c=new Dash.vo.AdaptationSet,d.hasOwnProperty("id")&&(c.id=d.id),c.index=g,c.period=b,c.type=this.getIsAudio(d)?"audio":this.getIsVideo(d)?"video":this.getIsFragmentedText(d)?"fragmentedText":"text",f.push(c);return f},getRegularPeriods:function(a,b){var c,d,e=this,f=[],g=e.getIsDynamic(a),h=null,i=null,j=null,k=null;for(c=0,d=a.Period_asArray.length;d>c;c+=1)i=a.Period_asArray[c],i.hasOwnProperty("start")?(k=new Dash.vo.Period,k.start=i.start):null!==h&&i.hasOwnProperty("duration")&&null!==j?(k=new Dash.vo.Period,k.start=j.start+j.duration,k.duration=i.duration):0!==c||g||(k=new Dash.vo.Period,k.start=0),null!==j&&isNaN(j.duration)&&(j.duration=k.start-j.start),null!==k&&i.hasOwnProperty("id")&&(k.id=i.id),null!==k&&i.hasOwnProperty("duration")&&(k.duration=i.duration),null!==k&&(k.index=c,k.mpd=b,f.push(k),h=i,j=k),i=null,k=null;return 0===f.length?f:(null!==j&&isNaN(j.duration)&&(j.duration=e.getEndTimeForLastPeriod(a,j)-j.start),f)},getMpd:function(a){var b=new Dash.vo.Mpd;return b.manifest=a,b.availabilityStartTime=new Date(a.hasOwnProperty("availabilityStartTime")?a.availabilityStartTime.getTime():a.loadedTime.getTime()),a.hasOwnProperty("availabilityEndTime")&&(b.availabilityEndTime=new Date(a.availabilityEndTime.getTime())),a.hasOwnProperty("suggestedPresentationDelay")&&(b.suggestedPresentationDelay=a.suggestedPresentationDelay),a.hasOwnProperty("timeShiftBufferDepth")&&(b.timeShiftBufferDepth=a.timeShiftBufferDepth),a.hasOwnProperty("maxSegmentDuration")&&(b.maxSegmentDuration=a.maxSegmentDuration),b},getFetchTime:function(a,b){return this.timelineConverter.calcPresentationTimeFromWallTime(a.loadedTime,b)},getCheckTime:function(a,b){var c,d=this,e=0/0;return a.hasOwnProperty("minimumUpdatePeriod")&&(c=d.getFetchTime(a,b),e=c+a.minimumUpdatePeriod),e},getEndTimeForLastPeriod:function(a,b){var c,d=this.getCheckTime(a,b);if(a.mediaPresentationDuration)c=a.mediaPresentationDuration;else{if(isNaN(d))throw new Error("Must have @mediaPresentationDuration or @minimumUpdatePeriod on MPD or an explicit @duration on the last period.");c=d}return c},getEventsForPeriod:function(a,b){var c=a.Period_asArray,d=c[b.index].EventStream_asArray,e=[];if(d)for(var f=0;f<d.length;f+=1){var g=new Dash.vo.EventStream;if(g.period=b,g.timescale=1,!d[f].hasOwnProperty("schemeIdUri"))throw"Invalid EventStream. SchemeIdUri has to be set";g.schemeIdUri=d[f].schemeIdUri,d[f].hasOwnProperty("timescale")&&(g.timescale=d[f].timescale),d[f].hasOwnProperty("value")&&(g.value=d[f].value);for(var h=0;h<d[f].Event_asArray.length;h+=1){var i=new Dash.vo.Event;i.presentationTime=0,i.eventStream=g,d[f].Event_asArray[h].hasOwnProperty("presentationTime")&&(i.presentationTime=d[f].Event_asArray[h].presentationTime),d[f].Event_asArray[h].hasOwnProperty("duration")&&(i.duration=d[f].Event_asArray[h].duration),d[f].Event_asArray[h].hasOwnProperty("id")&&(i.id=d[f].Event_asArray[h].id),e.push(i)}}return e},getEventStreams:function(a,b){var c=[];if(!a)return c;for(var d=0;d<a.length;d++){var e=new Dash.vo.EventStream;if(e.timescale=1,e.representation=b,!a[d].hasOwnProperty("schemeIdUri"))throw"Invalid EventStream. SchemeIdUri has to be set";e.schemeIdUri=a[d].schemeIdUri,a[d].hasOwnProperty("timescale")&&(e.timescale=a[d].timescale),a[d].hasOwnProperty("value")&&(e.value=a[d].value),c.push(e)}return c},getEventStreamForAdaptationSet:function(a,b){var c=a.Period_asArray[b.period.index].AdaptationSet_asArray[b.index].InbandEventStream_asArray;return this.getEventStreams(c,null)},getEventStreamForRepresentation:function(a,b){var c=a.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index].Representation_asArray[b.index].InbandEventStream_asArray;return this.getEventStreams(c,b)},getUTCTimingSources:function(a){"use strict";var b=this,c=b.getIsDynamic(a),d=a.hasOwnProperty("availabilityStartTime"),e=a.UTCTiming_asArray,f=[];return(c||d)&&e&&e.forEach(function(a){var b=new Dash.vo.UTCTiming;a.hasOwnProperty("schemeIdUri")&&(b.schemeIdUri=a.schemeIdUri,a.hasOwnProperty("value")&&(b.value=a.value.toString(),f.push(b)))}),f}},Dash.dependencies.DashMetricsExtensions=function(){"use strict";var a=function(a,b){var c,d,e,f,g,h;for(d=a.AdaptationSet_asArray,g=0;g<d.length;g+=1)for(c=d[g],f=c.Representation_asArray,h=0;h<f.length;h+=1)if(e=f[h],b===e.id)return h;return-1},b=function(a,b){var c,d,e,f,g,h;for(d=a.AdaptationSet_asArray,g=0;g<d.length;g+=1)for(c=d[g],f=c.Representation_asArray,h=0;h<f.length;h+=1)if(e=f[h],b===e.id)return e;return null},c=function(a,b){return this.manifestExt.getIsTypeOf(a,b)},d=function(a,b){var d,e,f,g;if(!a||!b)return-1;for(e=a.AdaptationSet_asArray,g=0;g<e.length;g+=1)if(d=e[g],f=d.Representation_asArray,c.call(this,d,b))return f.length;return-1},e=function(a,c){var d,e=this,f=e.manifestModel.getValue(),g=f.Period_asArray[c];return d=b.call(e,g,a),null===d?null:d.bandwidth},f=function(b,c){var d,e=this,f=e.manifestModel.getValue(),g=f.Period_asArray[c];return d=a.call(e,g,b)},g=function(a,b){var c,e=this,f=e.manifestModel.getValue(),g=f.Period_asArray[b];return c=d.call(this,g,a)},h=function(a,b){var c=this.system.getObject("abrController"),d=0;return c&&(d=c.getTopQualityIndexFor(a,b)),d},i=function(a){if(null===a)return null;var b,c,d,e=a.RepSwitchList;return null===e||e.length<=0?null:(b=e.length,c=b-1,d=e[c])},j=function(a){if(null===a)return null;var b,c,d,e=a.BufferLevel;return null===e||e.length<=0?null:(b=e.length,c=b-1,d=e[c])},k=function(a){if(null===a)return null;var b,c,d=a.PlayList;return null===d||d.length<=0?null:(b=d[d.length-1].trace,null===b||b.length<=0?null:c=b[b.length-1].playbackspeed)},l=function(a){if(null===a)return null;var b,c,d=a.HttpList,e=null;if(null===d||d.length<=0)return null;for(b=d.length,c=b-1;c>=0;){if(d[c].responsecode){e=d[c];break}c-=1}return e},m=function(a){return null===a?[]:a.HttpList?a.HttpList:[]},n=function(a){if(null===a)return null;var b,c,d,e=a.DroppedFrames;return null===e||e.length<=0?null:(b=e.length,c=b-1,d=e[c])},o=function(a){if(null===a)return null;var b,c,d,e=a.SchedulingInfo;return null===e||e.length<=0?null:(b=e.length,c=b-1,d=e[c])},p=function(a){if(null===a)return null;var b,c,d,e=a.ManifestUpdate;return null===e||e.length<=0?null:(b=e.length,c=b-1,d=e[c])},q=function(a){if(null===a)return null;var b,c,d=a.DVRInfo;return null===d||d.length<=0?null:(b=d.length-1,c=d[b])},r=function(a,b){if(null===a)return null;var c,d=m(a),e=d[d.length-1];return"MPD"===e.type&&(c=t(e.responseHeaders)),void 0===c[b]?null:c[b]},s=function(a,b){if(null===a)return null;var c,d=l(a);return null===d||null===d.responseHeaders?null:(c=t(d.responseHeaders),void 0===c[b]?null:c[b])},t=function(a){var b={};if(!a)return b;for(var c=a.split("\r\n"),d=0,e=c.length;e>d;d++){var f=c[d],g=f.indexOf(": ");g>0&&(b[f.substring(0,g)]=f.substring(g+2))}return b};return{manifestModel:void 0,manifestExt:void 0,system:void 0,getBandwidthForRepresentation:e,getIndexForRepresentation:f,getMaxIndexForBufferType:g,getMaxAllowedIndexForBufferType:h,getCurrentRepresentationSwitch:i,getCurrentBufferLevel:j,getCurrentPlaybackRate:k,getCurrentHttpRequest:l,getHttpRequests:m,getCurrentDroppedFrames:n,getCurrentSchedulingInfo:o,getCurrentDVRInfo:q,getCurrentManifestUpdate:p,getLatestFragmentRequestHeaderValueByID:s,getLatestMPDRequestHeaderValueByID:r}},Dash.dependencies.DashMetricsExtensions.prototype={constructor:Dash.dependencies.DashMetricsExtensions},Dash.dependencies.FragmentExtensions=function(){"use strict";var a=0,b=1,c=3,d=4,e=5,f=0,g=2,h=8,i=9,j=10,k=11,l=function(a){for(var b,c,d,e,f,g,h=new DataView(a),i=0;"tfdt"!==e&&i<h.byteLength;){for(d=h.getUint32(i),i+=4,e="",f=0;4>f;f+=1)g=h.getInt8(i),e+=String.fromCharCode(g),i+=1;"moof"!==e&&"traf"!==e&&"tfdt"!==e&&(i+=d-8)}if(i===h.byteLength)throw"Error finding live offset.";return c=h.getUint8(i),0===c?(i+=4,b=h.getUint32(i,!1)):(i+=d-16,b=utils.Math.to64BitNumber(h.getUint32(i+4,!1),h.getUint32(i,!1))),{version:c,base_media_decode_time:b}},m=function(a){for(var b,c,d,e,f,g,h,i=new DataView(a),j=0;"sidx"!==f&&j<i.byteLength;){for(g=i.getUint32(j),j+=4,f="",e=0;4>e;e+=1)h=i.getInt8(j),f+=String.fromCharCode(h),j+=1;"moof"!==f&&"traf"!==f&&"sidx"!==f?j+=g-8:"sidx"===f&&(j-=8)}return b=i.getUint8(j+8),j+=12,c=i.getUint32(j+4,!1),j+=8,d=0===b?i.getUint32(j,!1):utils.Math.to64BitNumber(i.getUint32(j+4,!1),i.getUint32(j,!1)),{earliestPresentationTime:d,timescale:c}},n=function(f){for(var g,h,i,j,k,l,m,n=new DataView(f),o=0;"tfhd"!==h&&o<n.byteLength;){for(g=n.getUint32(o),o+=4,h="",l=0;4>l;l+=1)m=n.getInt8(o),h+=String.fromCharCode(m),o+=1;"moof"!==h&&"traf"!==h&&"tfhd"!==h&&(o+=g-8)}if(o===n.byteLength)throw"Error finding live offset.";return k={baseDataOffset:0,descriptionIndex:0,sampleDuration:0,sampleSize:0,defaultSampleFlags:0},o+=1,o+=2,i=n.getUint8(o),o+=1,j=intTobitArray(i,8),o+=4,j[a]&&(k.baseDataOffset=utils.Math.to64BitNumber(n.getUint32(o+4,!1),n.getUint32(o,!1)),o+=8),j[b]&&(k.descriptionIndex=n.getUint32(o),o+=4),j[c]&&(k.sampleDuration=n.getUint32(o),o+=4),j[d]&&(k.sampleSize=n.getUint32(o),o+=4),j[e]&&(k.defaultSampleFlags=n.getUint32(o),o+=4),k},o=function(a){for(var b,c,d,e,f,g=new DataView(a),h=0;"mdhd"!==d&&h<g.byteLength;){for(c=g.getUint32(h),h+=4,d="",e=0;4>e;e+=1)f=g.getInt8(h),d+=String.fromCharCode(f),h+=1;"moov"!==d&&"trak"!==d&&"mdia"!==d&&"mdhd"!==d&&(h+=c-8)}if(h===g.byteLength)throw"Error finding live offset.";return b=g.getUint8(h),h+=12,1==b&&(h+=8),g.getUint32(h,!1)},p=function(a){var b,c,d,e,m,o,p,q,r,s,t,u,v,w,x,y,z=new DataView(a),A=0;for(w=n(a),x=l(a);"trun"!==c&&A<z.byteLength;){for(b=z.getUint32(A),A+=4,c="",t=0;4>t;t+=1)u=z.getInt8(A),c+=String.fromCharCode(u),A+=1;"moof"!==c&&"traf"!==c&&"trun"!==c&&(A+=b-8),"moof"==c&&(v=A-8)}if(A===z.byteLength)throw"Error finding live offset.";for(A+=1,A+=1,r=z.getUint16(A),A+=2,s=intTobitArray(r,16),m=z.getUint32(A),A+=4,p=x.base_media_decode_time,s[f]?(y=z.getUint32(A)+w.baseDataOffset,A+=4):y=w.baseDataOffset,s[g]&&(A+=4),q=[],t=0;m>t;t++)s[h]?(d=z.getUint32(A),A+=4):d=w.sampleDuration,s[i]?(o=z.getUint32(A),A+=4):o=w.sampleSize,s[j]&&(A+=4),s[k]?(e=z.getUint32(A),A+=4):e=0,q.push({dts:p,cts:p+e,duration:d,offset:v+y,size:o}),y+=o,p+=d;return q},q=function(a){var b,c=this,d=new XMLHttpRequest,e=a,f=!1,g="Error loading fragment: "+e,h=new MediaPlayer.vo.Error(null,g,null);d.onloadend=function(){f||(g="Error loading fragment: "+e,c.notify(Dash.dependencies.FragmentExtensions.eventList.ENAME_FRAGMENT_LOADING_COMPLETED,{fragment:null},h))},d.onload=function(){f=!0,b=l(d.response),c.notify(Dash.dependencies.FragmentExtensions.eventList.ENAME_FRAGMENT_LOADING_COMPLETED,{fragment:b})},d.onerror=function(){g="Error loading fragment: "+e,c.notify(Dash.dependencies.FragmentExtensions.eventList.ENAME_FRAGMENT_LOADING_COMPLETED,{fragment:null},h)},d.responseType="arraybuffer",d.open("GET",e),d.send(null)};return{log:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,loadFragment:q,parseTFDT:l,parseSIDX:m,getSamplesInfo:p,getMediaTimescaleFromMoov:o}},Dash.dependencies.FragmentExtensions.prototype={constructor:Dash.dependencies.FragmentExtensions},Dash.dependencies.FragmentExtensions.eventList={ENAME_FRAGMENT_LOADING_COMPLETED:"fragmentLoadingCompleted"},Dash.vo.AdaptationSet=function(){"use strict";this.period=null,this.index=-1,this.type=null},Dash.vo.AdaptationSet.prototype={constructor:Dash.vo.AdaptationSet},Dash.vo.Event=function(){"use strict";this.duration=0/0,this.presentationTime=0/0,this.id=0/0,this.messageData="",this.eventStream=null,this.presentationTimeDelta=0/0},Dash.vo.Event.prototype={constructor:Dash.vo.Event},Dash.vo.EventStream=function(){"use strict";this.adaptionSet=null,this.representation=null,this.period=null,this.timescale=1,this.value="",this.schemeIdUri=""},Dash.vo.EventStream.prototype={constructor:Dash.vo.EventStream},Dash.vo.Mpd=function(){"use strict";this.manifest=null,this.suggestedPresentationDelay=0,this.availabilityStartTime=null,this.availabilityEndTime=Number.POSITIVE_INFINITY,this.timeShiftBufferDepth=Number.POSITIVE_INFINITY,this.maxSegmentDuration=Number.POSITIVE_INFINITY,this.checkTime=0/0,this.clientServerTimeShift=0,this.isClientServerTimeSyncCompleted=!1},Dash.vo.Mpd.prototype={constructor:Dash.vo.Mpd},Dash.vo.Period=function(){"use strict";this.id=null,this.index=-1,this.duration=0/0,this.start=0/0,this.mpd=null},Dash.vo.Period.prototype={constructor:Dash.vo.Period},Dash.vo.Representation=function(){"use strict";this.id=null,this.index=-1,this.adaptation=null,this.segmentInfoType=null,this.initialization=null,this.segmentDuration=0/0,this.timescale=1,this.startNumber=1,this.indexRange=null,this.range=null,this.presentationTimeOffset=0,this.MSETimeOffset=0/0,this.segmentAvailabilityRange=null,this.availableSegmentsNumber=0,this.bandwidth=0/0,this.maxPlayoutRate=0/0},Dash.vo.Representation.prototype={constructor:Dash.vo.Representation},Dash.vo.Segment=function(){"use strict";this.indexRange=null,this.index=null,this.mediaRange=null,this.media=null,this.duration=0/0,this.replacementTime=null,this.replacementNumber=0/0,this.mediaStartTime=0/0,this.presentationStartTime=0/0,this.availabilityStartTime=0/0,this.availabilityEndTime=0/0,this.availabilityIdx=0/0,this.wallStartTime=0/0,this.representation=null},Dash.vo.Segment.prototype={constructor:Dash.vo.Segment},Dash.vo.UTCTiming=function(){"use strict";this.schemeIdUri="",this.value=""},Dash.vo.UTCTiming.prototype={constructor:Dash.vo.UTCTiming},MediaPlayer.dependencies.ErrorHandler=function(){"use strict";var a=MediaPlayer.events.ERROR;return{eventBus:void 0,capabilityError:function(b){this.eventBus.dispatchEvent({type:a,error:"capability",event:b})},downloadError:function(b,c,d){this.eventBus.dispatchEvent({type:a,error:"download",event:{id:b,url:c,request:d}})},manifestError:function(b,c,d){this.eventBus.dispatchEvent({type:a,error:"manifestError",event:{message:b,id:c,manifest:d}})},closedCaptionsError:function(b,c,d){this.eventBus.dispatchEvent({type:a,error:"cc",event:{message:b,id:c,cc:d}})},mediaSourceError:function(b){this.eventBus.dispatchEvent({type:a,error:"mediasource",event:b})},mediaKeySessionError:function(b){this.eventBus.dispatchEvent({type:a,error:"key_session",event:b})},mediaKeyMessageError:function(b){this.eventBus.dispatchEvent({type:a,error:"key_message",event:b})},mediaKeySystemSelectionError:function(b){this.eventBus.dispatchEvent({type:a,error:"key_system_selection",event:b})}}},MediaPlayer.dependencies.ErrorHandler.prototype={constructor:MediaPlayer.dependencies.ErrorHandler},MediaPlayer.dependencies.FragmentLoader=function(){"use strict";var a=3,b=500,c=[],d=function(a,e){var f=new XMLHttpRequest,g=null,h=!0,i=!0,j=null,k=this,l=function(a,b){i=!1;var c,d,e=new Date,h=f.response;a.firstByteDate||(a.firstByteDate=a.requestStartDate),a.requestEndDate=e,c=a.firstByteDate.getTime()-a.requestStartDate.getTime(),d=a.requestEndDate.getTime()-a.firstByteDate.getTime(),k.log((b?"loaded ":"failed ")+a.mediaType+":"+a.type+":"+a.startTime+" ("+f.status+", "+c+"ms, "+d+"ms)"),g.tresponse=a.firstByteDate,g.tfinish=a.requestEndDate,g.responsecode=f.status,g.responseHeaders=f.getAllResponseHeaders(),k.metricsModel.appendHttpTrace(g,e,e.getTime()-j.getTime(),[h?h.byteLength:0]),j=e};c.push(f),a.requestStartDate=new Date,g=k.metricsModel.addHttpRequest(a.mediaType,null,a.type,a.url,null,a.range,a.requestStartDate,null,null,null,null,a.duration,null),k.metricsModel.appendHttpTrace(g,a.requestStartDate,a.requestStartDate.getTime()-a.requestStartDate.getTime(),[0]),j=a.requestStartDate,f.open("GET",k.requestModifierExt.modifyRequestURL(a.url),!0),f.responseType="arraybuffer",f=k.requestModifierExt.modifyRequestHeader(f),a.range&&f.setRequestHeader("Range","bytes="+a.range),f.onprogress=function(b){var c=new Date;h&&(h=!1,(!b.lengthComputable||b.lengthComputable&&b.total!=b.loaded)&&(a.firstByteDate=c,g.tresponse=c)),b.lengthComputable&&(a.bytesLoaded=b.loaded,a.bytesTotal=b.total),k.metricsModel.appendHttpTrace(g,c,c.getTime()-j.getTime(),[f.response?f.response.byteLength:0]),j=c,k.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS,{request:a})},f.onload=function(){f.status<200||f.status>299||(l(a,!0),k.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED,{request:a,response:f.response}))},f.onloadend=f.onerror=function(){-1!==c.indexOf(f)&&(c.splice(c.indexOf(f),1),i&&(l(a,!1),e>0?(k.log("Failed loading fragment: "+a.mediaType+":"+a.type+":"+a.startTime+", retry in "+b+"ms attempts: "+e),e--,setTimeout(function(){d.call(k,a,e)},b)):(k.log("Failed loading fragment: "+a.mediaType+":"+a.type+":"+a.startTime+" no retry attempts left"),k.errHandler.downloadError("content",a.url,f),k.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED,{request:a,bytes:null},new MediaPlayer.vo.Error(null,"failed loading fragment",null)))))},f.send()},e=function(a){var b=this,c=new XMLHttpRequest,d=!1;c.open("HEAD",a.url,!0),c.onload=function(){c.status<200||c.status>299||(d=!0,b.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED,{request:a,exists:!0}))},c.onloadend=c.onerror=function(){d||b.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED,{request:a,exists:!1})},c.send()};return{metricsModel:void 0,errHandler:void 0,log:void 0,requestModifierExt:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,load:function(b){b?d.call(this,b,a):this.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED,{request:b,bytes:null},new MediaPlayer.vo.Error(null,"request is null",null))},checkForExistence:function(a){return a?void e.call(this,a):void this.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED,{request:a,exists:!1})},abort:function(){var a,b,d=c.length;for(a=0;d>a;a+=1)b=c[a],c[a]=null,b.abort(),b=null;c=[]}}},MediaPlayer.dependencies.FragmentLoader.prototype={constructor:MediaPlayer.dependencies.FragmentLoader},MediaPlayer.dependencies.FragmentLoader.eventList={ENAME_LOADING_COMPLETED:"loadingCompleted",ENAME_LOADING_PROGRESS:"loadingProgress",ENAME_CHECK_FOR_EXISTENCE_COMPLETED:"checkForExistenceCompleted"
},MediaPlayer.dependencies.LiveEdgeFinder=function(){"use strict";var a,b=!1,c=0/0,d=null,e=MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES,f=function(a){var b=((new Date).getTime()-c)/1e3;d=a.value,this.notify(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,{liveEdge:d,searchTime:b},null===d?new MediaPlayer.vo.Error(MediaPlayer.dependencies.LiveEdgeFinder.LIVE_EDGE_NOT_FOUND_ERROR_CODE,"live edge has not been found",null):null)},g=function(d){var g=this;!g.streamProcessor.isDynamic()||b||d.error||(a=g.synchronizationRulesCollection.getRules(e),b=!0,c=(new Date).getTime(),g.rulesController.applyRules(a,g.streamProcessor,f.bind(g),null,function(a,b){return b}))},h=function(a){e=a.error?MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES:MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES};return{system:void 0,synchronizationRulesCollection:void 0,rulesController:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,setup:function(){this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED]=g,this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED]=h},initialize:function(a){this.streamProcessor=a,this.fragmentLoader=a.fragmentLoader},abortSearch:function(){b=!1,c=0/0},getLiveEdge:function(){return d},reset:function(){this.abortSearch(),d=null}}},MediaPlayer.dependencies.LiveEdgeFinder.prototype={constructor:MediaPlayer.dependencies.LiveEdgeFinder},MediaPlayer.dependencies.LiveEdgeFinder.eventList={ENAME_LIVE_EDGE_SEARCH_COMPLETED:"liveEdgeFound"},MediaPlayer.dependencies.LiveEdgeFinder.LIVE_EDGE_NOT_FOUND_ERROR_CODE=1,MediaPlayer.dependencies.ManifestLoader=function(){"use strict";var a=3,b=500,c=function(a){var b="";return-1!==a.indexOf("/")&&(-1!==a.indexOf("?")&&(a=a.substring(0,a.indexOf("?"))),b=a.substring(0,a.lastIndexOf("/")+1)),b},d=function(a,e){var f,g,h,i=c(a),j=new XMLHttpRequest,k=new Date,l=null,m=!0,n=this;g=function(){j.status<200||j.status>299||(m=!1,l=new Date,n.metricsModel.addHttpRequest("stream",null,"MPD",a,null,null,k,l,null,j.status,null,null,j.getAllResponseHeaders()),j.responseURL&&(i=c(j.responseURL),a=j.responseURL),f=n.parser.parse(j.responseText,i),f?(f.url=a,f.loadedTime=l,n.metricsModel.addManifestUpdate("stream",f.type,k,l,f.availabilityStartTime),n.xlinkController.resolveManifestOnLoad(f)):n.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED,{manifest:null},new MediaPlayer.vo.Error(null,"Failed loading manifest: "+a,null)))},h=function(){m&&(m=!1,n.metricsModel.addHttpRequest("stream",null,"MPD",a,null,null,k,new Date,j.status,null,null,j.getAllResponseHeaders()),e>0?(n.log("Failed loading manifest: "+a+", retry in "+b+"ms attempts: "+e),e--,setTimeout(function(){d.call(n,a,e)},b)):(n.log("Failed loading manifest: "+a+" no retry attempts left"),n.errHandler.downloadError("manifest",a,j),n.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED,null,new Error("Failed loading manifest: "+a+" no retry attempts left"))))};try{j.onload=g,j.onloadend=h,j.onerror=h,j.open("GET",n.requestModifierExt.modifyRequestURL(a),!0),j.send()}catch(o){j.onerror()}},e=function(a){this.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED,{manifest:a.data.manifest})};return{log:void 0,parser:void 0,errHandler:void 0,metricsModel:void 0,requestModifierExt:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,xlinkController:void 0,load:function(b){d.call(this,b,a)},setup:function(){e=e.bind(this),this.xlinkController.subscribe(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY,this,e)}}},MediaPlayer.dependencies.ManifestLoader.prototype={constructor:MediaPlayer.dependencies.ManifestLoader},MediaPlayer.dependencies.ManifestLoader.eventList={ENAME_MANIFEST_LOADED:"manifestLoaded"},MediaPlayer.dependencies.ManifestUpdater=function(){"use strict";var a,b=0/0,c=null,d=!0,e=!1,f=function(){null!==c&&(clearInterval(c),c=null)},g=function(){f.call(this),isNaN(b)||(this.log("Refresh manifest in "+b+" seconds."),c=setTimeout(i.bind(this),Math.min(1e3*b,Math.pow(2,31)-1),this))},h=function(a){var c,e;this.manifestModel.setValue(a),this.log("Manifest has been refreshed."),c=this.manifestExt.getRefreshDelay(a),e=((new Date).getTime()-a.loadedTime.getTime())/1e3,b=Math.max(c-e,0),this.notify(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED,{manifest:a}),d||g.call(this)},i=function(){var b,c,f=this;d||e||(e=!0,b=f.manifestModel.getValue(),c=b.url,b.hasOwnProperty("Location")&&(c=b.Location),a.load(c))},j=function(a){a.error||h.call(this,a.data.manifest)},k=function(){d=!1,g.call(this)},l=function(){d=!0,f.call(this)},m=function(){e=!1};return{log:void 0,system:void 0,subscribe:void 0,unsubscribe:void 0,notify:void 0,manifestModel:void 0,manifestExt:void 0,setup:function(){this[MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED]=m,this[MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED]=j,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED]=k,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED]=l},initialize:function(b){e=!1,d=!0,a=b,a.subscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED,this)},setManifest:function(a){h.call(this,a)},getManifestLoader:function(){return a},reset:function(){d=!0,e=!1,f.call(this),a.unsubscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED,this),b=0/0}}},MediaPlayer.dependencies.ManifestUpdater.prototype={constructor:MediaPlayer.dependencies.ManifestUpdater},MediaPlayer.dependencies.ManifestUpdater.eventList={ENAME_MANIFEST_UPDATED:"manifestUpdated"},MediaPlayer.dependencies.Notifier=function(){"use strict";var a,b="observableId",c=0,d=function(){return this[b]||(c+=1,this[b]="_id_"+c),this[b]};return{system:void 0,setup:function(){a=this.system,a.mapValue("notify",this.notify),a.mapValue("subscribe",this.subscribe),a.mapValue("unsubscribe",this.unsubscribe)},notify:function(){var b=arguments[0]+d.call(this),c=new MediaPlayer.vo.Event;c.sender=this,c.type=arguments[0],c.data=arguments[1],c.error=arguments[2],c.timestamp=(new Date).getTime(),a.notify.call(a,b,c)},subscribe:function(b,c,e,f){if(!e&&c[b]&&(e=c[b]=c[b].bind(c)),!c)throw"observer object cannot be null or undefined";if(!e)throw"event handler cannot be null or undefined";b+=d.call(this),a.mapHandler(b,void 0,e,f)},unsubscribe:function(b,c,e){e=e||c[b],b+=d.call(this),a.unmapHandler(b,void 0,e)}}},MediaPlayer.dependencies.Notifier.prototype={constructor:MediaPlayer.dependencies.Notifier},MediaPlayer.dependencies.Stream=function(){"use strict";var a,b=[],c=!1,d=!1,e=null,f={},g=!1,h=!1,i=!1,j=null,k=function(a){this.errHandler.mediaKeySessionError(a.data),this.log(a.data),this.reset()},l=function(a,c){var d,f,g=this,h=null,i=g.manifestModel.getValue(),k=function(a){return a.codec},l=g.adapter.getMediaInfoForType(i,e,a);if("text"===a&&(k=function(a){return h=a.mimeType}),null!==l){var m,n=k.call(g,l);if("text"!==a&&"fragmentedText"!==a)if(d=n,g.log(a+" codec: "+d),m=l.contentProtection,m&&!g.capabilities.supportsEncryptedMedia())g.errHandler.capabilityError("encryptedmedia");else if(!g.capabilities.supportsCodec(g.videoModel.getElement(),d)){var o=a+"Codec ("+d+") is not supported.";return g.errHandler.manifestError(o,"codec",i),void g.log(o)}f=g.system.getObject("streamProcessor"),b.push(f),f.initialize(h||a,g.fragmentController,c,g,j),g.abrController.updateTopQualityIndex(l),f.updateMediaInfo(i,l)}else g.log("No "+a+" data.")},m=function(a){var c,f=this,h=f.manifestModel.getValue();if(j=f.system.getObject("eventController"),c=f.adapter.getEventsFor(h,e),j.addInlineEvents(c),g=!0,l.call(f,"video",a),l.call(f,"audio",a),l.call(f,"text",a),l.call(f,"fragmentedText",a),p.call(f),d=!0,g=!1,0===b.length){var i="No streams to play.";f.errHandler.manifestError(i,"nostreams",h),f.log(i)}else f.liveEdgeFinder.initialize(b[0]),f.liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,f.playbackController);n.call(this)},n=function(){var i=this,j=b.length,k=!!f.audio||!!f.video,l=k?new MediaPlayer.vo.Error(MediaPlayer.dependencies.Stream.DATA_UPDATE_FAILED_ERROR_CODE,"Data update failed",null):null,m=0;for(m;j>m;m+=1)if(b[m].isUpdating()||g)return;h=!0,i.eventBus.dispatchEvent({type:MediaPlayer.events.STREAM_INITIALIZED,data:{streamInfo:e}}),i.notify(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED,{streamInfo:e},l),d&&!c&&(a.init(i.manifestModel.getValue(),o.call(this,"audio"),o.call(this,"video")),c=!0)},o=function(a){for(var c=b.length,d=null,e=0;c>e;e+=1)if(d=b[e],d.getType()===a)return d.getMediaInfo();return null},p=function(){for(var a=0,c=b.length;c>a;a+=1)b[a].createBuffer()},q=function(){var a=s(),b=a.length,c=0;for(c;b>c;c+=1)if(!a[c].isBufferingCompleted())return;this.notify(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED,{streamInfo:e})},r=function(a){var b=a.sender.streamProcessor.getType();f[b]=a.error,n.call(this)},s=function(){var a,c,d=[],e=0,f=b.length;for(e;f>e;e+=1)c=b[e],a=c.getType(),("audio"===a||"video"===a)&&d.push(c);return d},t=function(a){var d,f,i,k=this,l=b.length,m=k.manifestModel.getValue(),o=0;for(c=!1,e=a,k.log("Manifest updated... set new data on buffers."),j&&(f=k.adapter.getEventsFor(m,e),j.addInlineEvents(f)),g=!0,h=!1,o;l>o;o+=1)i=b[o],d=k.adapter.getMediaInfoForType(m,e,i.getType()),this.abrController.updateTopQualityIndex(d),i.updateMediaInfo(m,d);g=!1,n.call(k)};return{system:void 0,eventBus:void 0,manifestModel:void 0,sourceBufferExt:void 0,adapter:void 0,videoModel:void 0,fragmentController:void 0,playbackController:void 0,capabilities:void 0,log:void 0,errHandler:void 0,liveEdgeFinder:void 0,abrController:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,setup:function(){this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED]=q,this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED]=r,this[MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR]=k.bind(this)},initialize:function(b,c,d){e=b,this.capabilities.supportsEncryptedMedia()&&(c||(c=this.system.getObject("protectionController"),i=!0),a=c,a.subscribe(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,this),a.setMediaElement(this.videoModel.getElement()),d&&a.setProtectionData(d))},activate:function(a){c?p.call(this):m.call(this,a)},deactivate:function(){var a=b.length,e=0;for(e;a>e;e+=1)b[e].reset();b=[],c=!1,d=!1,this.resetEventController()},reset:function(e){this.playbackController.pause();var k,l=b.length,m=0;for(m;l>m;m+=1)k=b[m],k.reset(e),k=null;j&&j.reset(),b=[],g=!1,h=!1,this.fragmentController&&this.fragmentController.reset(),this.fragmentController=void 0,this.liveEdgeFinder.abortSearch(),this.liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,this.playbackController),a&&(a.unsubscribe(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,this),i&&(a.teardown(),a=null,i=!1)),d=!1,c=!1,f={}},getDuration:function(){return e.duration},getStartTime:function(){return e.start},getStreamIndex:function(){return e.index},getId:function(){return e.id},getStreamInfo:function(){return e},hasMedia:function(a){return null!==o.call(this,a)},getBitrateListFor:function(a){var b=o.call(this,a);return this.abrController.getBitrateList(b)},startEventController:function(){j.start()},resetEventController:function(){j.reset()},isActivated:function(){return c},isInitialized:function(){return h},updateData:t}},MediaPlayer.dependencies.Stream.prototype={constructor:MediaPlayer.dependencies.Stream},MediaPlayer.dependencies.Stream.DATA_UPDATE_FAILED_ERROR_CODE=1,MediaPlayer.dependencies.Stream.eventList={ENAME_STREAM_UPDATED:"streamUpdated",ENAME_STREAM_BUFFERING_COMPLETED:"streamBufferingCompleted"},MediaPlayer.dependencies.StreamProcessor=function(){"use strict";var a,b=null,c=null,d=null,e=null,f=function(a){var b=this,c="video"===a||"audio"===a||"fragmentedText"===a?"bufferController":"textController";return b.system.getObject(c)};return{system:void 0,videoModel:void 0,indexHandler:void 0,liveEdgeFinder:void 0,timelineConverter:void 0,abrController:void 0,playbackController:void 0,baseURLExt:void 0,adapter:void 0,manifestModel:void 0,initialize:function(c,g,h,i,j){var k,l=this,m=l.system.getObject("trackController"),n=l.system.getObject("scheduleController"),o=l.liveEdgeFinder,p=l.abrController,q=l.indexHandler,r=l.baseURLExt,s=l.playbackController,t=this.system.getObject("fragmentLoader"),u=f.call(l,c);b=i,d=c,e=j,a=b.getStreamInfo().manifestInfo.isDynamic,l.bufferController=u,l.scheduleController=n,l.trackController=m,l.fragmentController=g,l.fragmentLoader=t,m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,u),g.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED,u),m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,b),"video"===d||"audio"===d||"fragmentedText"===d?(p.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED,u),p.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED,m),p.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED,n),o.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,this.timelineConverter),o.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,m),o.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,n),m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED,n),m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,n),b.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED,n),m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,s),g.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED,u),g.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START,n),g.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,n),g.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,u),g.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,n.scheduleRulesCollection.bufferLevelRule),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED,s),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED,n),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED,n),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED,n),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED,m),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED,n),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED,n),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED,b),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED,n),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN,n.scheduleRulesCollection.bufferLevelRule),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED,n.scheduleRulesCollection.bufferLevelRule),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED,s),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS,u),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED,u),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED,u),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED,n),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,u),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,n),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED,n),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,n.scheduleRulesCollection.playbackTimeRule),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,p.abrRulesCollection.insufficientBufferRule),a&&s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED,m),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED,u),s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED,n),r.subscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED,q),r.subscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED,q)):u.subscribe(MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED,n),q.initialize(this),q.setCurrentTime(s.getStreamStartTime(this.getStreamInfo())),u.initialize(d,h,l),n.initialize(d,this),p.initialize(d,this),k=this.getFragmentModel(),k.setLoader(t),k.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED,g),k.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED,g),k.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED,g),k.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED,n),t.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED,k),t.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS,p),("video"===d||"audio"===d||"fragmentedText"===d)&&(u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN,k),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED,k),u.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED,k)),m.initialize(this)},isUpdating:function(){return this.trackController.isUpdating()},getType:function(){return d},getABRController:function(){return this.abrController},getFragmentLoader:function(){return this.fragmentLoader},getFragmentModel:function(){return this.scheduleController.getFragmentModel()},getStreamInfo:function(){return b.getStreamInfo()},updateMediaInfo:function(a,b){b===c||b&&c&&b.type!==c.type||(c=b),this.adapter.updateData(a,this)},getMediaInfo:function(){return c},getScheduleController:function(){return this.scheduleController},getEventController:function(){return e},start:function(){this.scheduleController.start()},stop:function(){this.scheduleController.stop()},getCurrentTrack:function(){return this.adapter.getCurrentTrackInfo(this.manifestModel.getValue(),this.trackController)},getTrackForQuality:function(a){return this.adapter.getTrackInfoForQuality(this.manifestModel.getValue(),this.trackController,a)},isBufferingCompleted:function(){return this.bufferController.isBufferingCompleted()},createBuffer:function(){return this.bufferController.getBuffer()||this.bufferController.createBuffer(c)},isDynamic:function(){return a},reset:function(f){var g=this,h=g.bufferController,i=g.trackController,j=g.scheduleController,k=g.liveEdgeFinder,l=g.fragmentController,m=g.abrController,n=g.playbackController,o=this.indexHandler,p=this.baseURLExt,q=this.getFragmentModel(),r=this.fragmentLoader;m.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED,h),m.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED,i),m.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED,j),k.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,this.timelineConverter),k.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,j),k.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED,i),i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED,j),i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,h),i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,j),i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,b),i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED,n),b.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED,j),l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED,h),l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED,h),l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START,j),l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,j),l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,h),l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,j.scheduleRulesCollection.bufferLevelRule),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED,n),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED,j),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED,j),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED,j),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED,i),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED,j),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED,j),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED,b),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED,j),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN,j.scheduleRulesCollection.bufferLevelRule),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED,j.scheduleRulesCollection.bufferLevelRule),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED,n),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS,h),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED,h),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED,h),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED,j),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,h),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,j),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED,j),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED,i),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED,h),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED,j),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,j.scheduleRulesCollection.playbackTimeRule),n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,m.abrRulesCollection.insufficientBufferRule),p.unsubscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED,o),p.unsubscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED,o),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN,q),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED,q),h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED,q),q.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED,l),q.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED,l),q.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED,l),q.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED,j),r.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED,q),r.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS,m),q.reset(),o.reset(),this.bufferController.reset(f),this.scheduleController.reset(),this.bufferController=null,this.scheduleController=null,this.trackController=null,this.videoModel=null,this.fragmentController=null,a=void 0,b=null,c=null,d=null,e=null}}},MediaPlayer.dependencies.StreamProcessor.prototype={constructor:MediaPlayer.dependencies.StreamProcessor},MediaPlayer.utils.TTMLParser=function(){"use strict";var a,b=3600,c=60,d=/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])((\.[0-9][0-9][0-9])|(:[0-9][0-9]))$/,e=function(e){var f,g,h,i=d.test(e);if(!i)return 0/0;if(f=e.split(":"),g=parseFloat(f[0])*b+parseFloat(f[1])*c+parseFloat(f[2]),f[3]){if(h=a.tt.frameRate,!h||isNaN(h))return 0/0;g+=parseFloat(f[3])/h}return g},f=function(){var b=!1,c=a.hasOwnProperty("tt"),d=c?a.tt.hasOwnProperty("head"):!1,e=d?a.tt.head.hasOwnProperty("layout"):!1,f=d?a.tt.head.hasOwnProperty("styling"):!1,g=c?a.tt.hasOwnProperty("body"):!1;return c&&d&&e&&f&&g&&(b=!0),b},g=function(a,b){var c=Object.keys(a).filter(function(c){return"xmlns"===c.split(":")[0]&&a[c]===b}).map(function(a){return a.split(":")[1]});return 1!=c.length?null:c[0]},h=function(b){var c,d,h,i,j,k,l,m,n,o=[],p=new X2JS([],"",!1);if(a=p.xml_str2json(b),!f())throw c="TTML document has incorrect structure";if(k=g(a.tt,"http://www.w3.org/ns/ttml#parameter"),a.tt.hasOwnProperty(k+":frameRate")&&(a.tt.frameRate=parseInt(a.tt[k+":frameRate"],10)),d=a.tt.body.div_asArray?a.tt.body.div_asArray[0].p_asArray:a.tt.body.p_asArray,!d||0===d.length)throw c="TTML document does not contain any cues";for(m=0;m<d.length;m+=1){if(h=d[m],i=e(h.begin),j=e(h.end),isNaN(i)||isNaN(j))throw c="TTML document has incorrect timing value";if(void 0!==h["smpte:backgroundImage"]){var q=a.tt.head.metadata.image_asArray;for(n=0;n<q.length;n+=1)"#"+q[n]["xml:id"]==h["smpte:backgroundImage"]&&o.push({start:i,end:j,id:q[n]["xml:id"],data:"data:image/"+q[n].imagetype.toLowerCase()+";base64, "+q[n].__text,type:"image"})}else l=h.span_asArray?h.span_asArray[0].__text:h.__text,o.push({start:i,end:j,data:l,type:"text"})}return o};return{parse:h}},MediaPlayer.dependencies.TextSourceBuffer=function(){var a,b;return{system:void 0,videoModel:void 0,eventBus:void 0,errHandler:void 0,initialize:function(c,d){b=c,a=d.streamProcessor.getCurrentTrack().mediaInfo,this.buffered=this.system.getObject("customTimeRanges"),this.initializationSegmentReceived=!1,this.timescale=9e4},append:function(c,d){var e,f,g,h,i,j,k=this;if("fragmentedText"==b){var l;if(this.initializationSegmentReceived)for(l=k.system.getObject("fragmentExt"),h=l.getSamplesInfo(c.buffer),i=0;i<h.length;i++){this.firstSubtitleStart||(this.firstSubtitleStart=h[0].cts-d.start*this.timescale),h[i].cts-=this.firstSubtitleStart,this.buffered.add(h[i].cts/this.timescale,(h[i].cts+h[i].duration)/this.timescale),j=window.UTF8.decode(new Uint8Array(c.buffer.slice(h[i].offset,h[i].offset+h[i].size)));var m=this.system.getObject("ttmlParser");try{e=m.parse(j),this.textTrackExtensions.addCaptions(this.firstSubtitleStart/this.timescale,e)}catch(n){}}else this.initializationSegmentReceived=!0,f=a.id,g=a.lang,this.textTrackExtensions=k.getTextTrackExtensions(),this.textTrackExtensions.addTextTrack(k.videoModel.getElement(),e,f,g,!0),k.eventBus.dispatchEvent({type:MediaPlayer.events.TEXT_TRACK_ADDED}),l=k.system.getObject("fragmentExt"),this.timescale=l.getMediaTimescaleFromMoov(c.buffer)}else{j=window.UTF8.decode(c);try{e=k.getParser().parse(j),f=a.id,g=a.lang,k.getTextTrackExtensions().addTextTrack(k.videoModel.getElement(),e,f,g,!0),k.eventBus.dispatchEvent({type:MediaPlayer.events.TEXT_TRACK_ADDED})}catch(n){k.errHandler.closedCaptionsError(n,"parse",j)}}},abort:function(){this.getTextTrackExtensions().deleteCues(this.videoModel.getElement())},getParser:function(){var a;return"text/vtt"===b?a=this.system.getObject("vttParser"):"application/ttml+xml"===b&&(a=this.system.getObject("ttmlParser")),a},getTextTrackExtensions:function(){return this.system.getObject("textTrackExtensions")},addEventListener:function(a,b,c){this.eventBus.addEventListener(a,b,c)},removeEventListener:function(a,b,c){this.eventBus.removeEventListener(a,b,c)}}},MediaPlayer.dependencies.TextSourceBuffer.prototype={constructor:MediaPlayer.dependencies.TextSourceBuffer},MediaPlayer.dependencies.TimeSyncController=function(){"use strict";var a,b=5e3,c=0,d=!1,e=!1,f=function(a){d=a},g=function(){return d},h=function(a){e=a},i=function(a){c=a},j=function(){return c},k=function(a){var b,c,d=60,e=60,f=1e3,g=/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+\-])([0-9]{2})([0-9]{2}))?/,h=g.exec(a);return b=Date.UTC(parseInt(h[1],10),parseInt(h[2],10)-1,parseInt(h[3],10),parseInt(h[4],10),parseInt(h[5],10),h[6]&&(parseInt(h[6],10)||0),h[7]&&parseFloat(h[7])*f||0),h[9]&&h[10]&&(c=parseInt(h[9],10)*e+parseInt(h[10],10),b+=("+"===h[8]?-1:1)*c*d*f),new Date(b).getTime()},l=function(a){var b=Date.parse(a);return isNaN(b)&&(b=k(a)),b},m=function(a){return Date.parse(a)},n=function(a){return Date.parse(a)},o=function(a,b,c){c()},p=function(a,b,c){var d=l(a);return isNaN(d)?void c():void b(d)},q=function(a,c,d,e,f){var g,h,i=!1,j=new XMLHttpRequest,k=f?"HEAD":"GET",l=c.match(/\S+/g);c=l.shift(),g=function(){i||(i=!0,l.length?q(a,l.join(" "),d,e,f):e())},h=function(){var b,c;200===j.status&&(b=f?j.getResponseHeader("Date"):j.response,c=a(b),isNaN(c)||(d(c),i=!0))},j.open(k,c),j.timeout=b||0,j.onload=h,j.onloadend=g,j.send()},r=function(a,b,c){q.call(this,n,a,b,c,!0)},s={"urn:mpeg:dash:utc:http-head:2014":r,"urn:mpeg:dash:utc:http-xsdate:2014":q.bind(null,l),"urn:mpeg:dash:utc:http-iso:2014":q.bind(null,m),"urn:mpeg:dash:utc:direct:2014":p,"urn:mpeg:dash:utc:http-head:2012":r,"urn:mpeg:dash:utc:http-xsdate:2012":q.bind(null,l),"urn:mpeg:dash:utc:http-iso:2012":q.bind(null,m),"urn:mpeg:dash:utc:direct:2012":p,"urn:mpeg:dash:utc:http-ntp:2014":o,"urn:mpeg:dash:utc:ntp:2014":o,"urn:mpeg:dash:utc:sntp:2014":o},t=function(){var a=this.metricsModel.getReadOnlyMetricsFor("stream"),b=this.metricsExt.getLatestMPDRequestHeaderValueByID(a,"Date"),d=null!==b?new Date(b).getTime():Number.NaN;isNaN(d)?u.call(this,!0):(i(d-(new Date).getTime()),u.call(this,!1,d/1e3,c))},u=function(a,b,c){f(!1),this.notify(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED,{time:b,offset:c},a?new MediaPlayer.vo.Error(MediaPlayer.dependencies.TimeSyncController.TIME_SYNC_FAILED_ERROR_CODE):null)},v=function(b,c){var d=this,e=c||0,g=b[e],h=function(b,c){var e=!b||!c;e&&a?t.call(d):u.call(d,e,b,c)};f(!0),g?s.hasOwnProperty(g.schemeIdUri)?s[g.schemeIdUri](g.value,function(a){var b=(new Date).getTime(),c=a-b;i(c),d.log("Local time:      "+new Date(b)),d.log("Server time:     "+new Date(a)),d.log("Difference (ms): "+c),
h.call(d,a,c)},function(){v.call(d,b,e+1)}):v.call(d,b,e+1):(i(0),h.call(d))};return{log:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,metricsModel:void 0,metricsExt:void 0,getOffsetToDeviceTimeMs:function(){return j()},initialize:function(b,c){a=c,g()||(v.call(this,b),h(!0))},reset:function(){h(!1),f(!1)}}},MediaPlayer.dependencies.TimeSyncController.prototype={constructor:MediaPlayer.dependencies.TimeSyncController},MediaPlayer.dependencies.TimeSyncController.eventList={ENAME_TIME_SYNCHRONIZATION_COMPLETED:"timeSynchronizationComplete"},MediaPlayer.dependencies.TimeSyncController.TIME_SYNC_FAILED_ERROR_CODE=1,MediaPlayer.utils.VTTParser=function(){"use strict";var a=/(?:\r\n|\r|\n)/gm,b=/-->/,c=/(^[\s]+|[\s]+$)/g,d=/\s\b/g,e=function(a){var b=a.split(":"),c=b.length-1;return a=60*parseInt(b[c-1],10)+parseFloat(b[c]),2===c&&(a+=3600*parseInt(b[0],10)),a},f=function(a){var c=a.split(b),e=c[1].split(d);return e.shift(),c[1]=e[0],e.shift(),{cuePoints:c,styles:g(e)}},g=function(a){var b={};return a.forEach(function(a){if(a.split(/:/).length>1){var c=a.split(/:/)[1];c&&-1!=c.search(/%/)&&(c=parseInt(c.replace(/%/,""))),(a.match(/align/)||a.match(/A/))&&(b.align=c),(a.match(/line/)||a.match(/L/))&&(b.line=c),(a.match(/position/)||a.match(/P/))&&(b.position=c),(a.match(/size/)||a.match(/S/))&&(b.size=c)}}),b},h=function(a,c){for(var d,e=c,f="",g="";""!==a[e]&&e<a.length;)e++;if(d=e-c,d>1)for(var h=0;d>h;h++){if(g=a[c+h],g.match(b)){f="";break}f+=g,h!==d-1&&(f+="\n")}else g=a[c],g.match(b)||(f=g);return decodeURI(f)};return{log:void 0,parse:function(d){var g,i,j=[];d=d.split(a),g=d.length,i=-1;for(var k=0;g>k;k++){var l=d[k];if(l.length>0&&"WEBVTT"!==l&&l.match(b)){var m=f(l),n=m.cuePoints,o=m.styles,p=h(d,k+1),q=e(n[0].replace(c,"")),r=e(n[1].replace(c,""));!Number.isNaN(q)&&!Number.isNaN(r)&&q>=i&&r>q?""!==p?(i=q,j.push({start:q,end:r,data:p,styles:o})):this.log("Skipping cue due to empty/malformed cue text"):this.log("Skipping cue due to incorrect cue timing")}}return j}}},MediaPlayer.dependencies.XlinkLoader=function(){"use strict";var a=1,b=500,c="urn:mpeg:dash:resolve-to-zero:2013",d=function(a,c,e,f){var g,h,i,j=new XMLHttpRequest,k=this,l=null,m=!0,n=new Date;h=function(){j.status<200||j.status>299||(m=!1,k.metricsModel.addHttpRequest("stream",null,"XLink",a,null,null,n,l,null,j.status,null,null,j.getAllResponseHeaders()),i=j.responseText,c.resolved=!0,i?(c.resolvedContent=i,k.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED,{element:c,resolveObject:e})):(c.resolvedContent=null,k.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED,{element:c,resolveObject:e},new MediaPlayer.vo.Error(null,"Failed loading Xlink element: "+a,null))))},g=function(){m&&(m=!1,k.metricsModel.addHttpRequest("stream",null,"xlink",a,null,null,n,new Date,j.status,null,null,j.getAllResponseHeaders()),f>0?(console.log("Failed loading xLink content: "+a+", retry in "+b+"ms attempts: "+f),f--,setTimeout(function(){d.call(k,a,c,e,f)},b)):(console.log("Failed loading Xlink content: "+a+" no retry attempts left"),k.errHandler.downloadError("xlink",a,j),c.resolvedContent=null,k.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED,{element:c,resolveObject:e},new Error("Failed loading xlink Element: "+a+" no retry attempts left"))))};try{j.onload=h,j.onloadend=g,j.onerror=g,j.open("GET",k.requestModifierExt.modifyRequestURL(a),!0),j.send()}catch(o){console.log("Error"),j.onerror()}};return{errHandler:void 0,metricsModel:void 0,requestModifierExt:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,load:function(b,e,f){b===c?(e.resolvedContent=null,e.resolved=!0,this.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED,{element:e,resolveObject:f})):d.call(this,b,e,f,a)}}},MediaPlayer.dependencies.XlinkLoader.prototype={constructor:MediaPlayer.dependencies.XlinkLoader},MediaPlayer.dependencies.XlinkLoader.eventList={ENAME_XLINKELEMENT_LOADED:"xlinkElementLoaded"},MediaPlayer.dependencies.AbrController=function(){"use strict";var a,b=!0,c={},d={},e={},f={},g={},h={},i=function(a,b){var c;return d[b]=d[b]||{},d[b].hasOwnProperty(a)||(d[b][a]=0),c=d[b][a]},j=function(a,b,c){d[b]=d[b]||{},d[b][a]=c},k=function(a,b){var c;return e[b]=e[b]||{},e[b].hasOwnProperty(a)||(e[b][a]=0),c=e[b][a]},l=function(a,b,c){e[b]=e[b]||{},e[b][a]=c},m=function(a,b,d){c[b]=c[b]||{},c[b][a]=d},n=function(a){return f[a]},o=function(a,b){f[a]=b},p=function(a){return f.hasOwnProperty("max")&&f.max.hasOwnProperty(a)?f.max[a]:0/0},q=function(a,b){f.max=f.max||{},f.max[a]=b},r=function(a,b){var d;return c[b]=c[b]||{},c[b].hasOwnProperty(a)||(c[b][a]=0),d=s.call(this,c[b][a],a)},s=function(a,b){var c=p(b);if(isNaN(c))return a;var d=this.getQualityForBitrate(g[b].getMediaInfo(),c);return Math.min(a,d)},t=function(b){if(0===MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD){var c=this,d=b.data.request.mediaType,e=c.abrRulesCollection.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.ABANDON_FRAGMENT_RULES),f=g[d].getScheduleController(),h=f.getFragmentModel(),i=function(b){function e(b){a=setTimeout(function(){c.setAbandonmentStateFor(b,MediaPlayer.dependencies.AbrController.ALLOW_LOAD)},MediaPlayer.dependencies.AbrController.ABANDON_TIMEOUT)}if(b.confidence===MediaPlayer.rules.SwitchRequest.prototype.STRONG){var g=h.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.LOADING}),i=b.value,j=c.getQualityFor(d,c.streamController.getActiveStreamInfo());j>i&&(h.abortRequests(),c.setAbandonmentStateFor(d,MediaPlayer.dependencies.AbrController.ABANDON_LOAD),c.setPlaybackQuality(d,c.streamController.getActiveStreamInfo(),i),f.replaceCanceledRequests(g),e(d))}};c.rulesController.applyRules(e,g[d],i,b,function(a,b){return b})}};return{log:void 0,abrRulesCollection:void 0,rulesController:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,streamController:void 0,setup:function(){this[MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS]=t},initialize:function(a,b){g[a]=b,h[a]=h[a]||{},h[a].state=MediaPlayer.dependencies.AbrController.ALLOW_LOAD},getAutoSwitchBitrate:function(){return b},setAutoSwitchBitrate:function(a){b=a},getPlaybackQuality:function(a){var c,d,e,f,g=this,m=a.getType(),n=a.getStreamInfo().id,o=function(b){var e=r.call(g,m,n);c=b.value,f=b.confidence,0>c&&(c=0),c>e&&(c=e),d=i(m,n),c===d||h[m].state===MediaPlayer.dependencies.AbrController.ABANDON_LOAD&&c>d||(j(m,n,c),l(m,n,f),g.notify(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED,{mediaType:m,streamInfo:a.getStreamInfo(),oldQuality:d,newQuality:c}))};c=i(m,n),f=k(m,n),b&&(e=g.abrRulesCollection.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES),g.rulesController.applyRules(e,a,o.bind(g),c,function(a,b){return a=a===MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE?0:a,Math.max(a,b)}))},setPlaybackQuality:function(a,b,c){var d=b.id,e=i(a,d),f=null!==c&&!isNaN(c)&&c%1===0;if(!f)throw"argument is not an integer";c!==e&&c>=0&&c<=r.call(this,a,d)&&(j(a,b.id,c),this.notify(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED,{mediaType:a,streamInfo:b,oldQuality:e,newQuality:c}))},setAbandonmentStateFor:function(a,b){h[a].state=b},getAbandonmentStateFor:function(a){return h[a].state},getQualityFor:function(a,b){return i(a,b.id)},getConfidenceFor:function(a,b){return k(a,b.id)},setInitialBitrateFor:function(a,b){o(a,b)},getInitialBitrateFor:function(a){return n(a)},setMaxAllowedBitrateFor:function(a,b){q(a,b)},getMaxAllowedBitrateFor:function(a){return p(a)},getQualityForBitrate:function(a,b){for(var c,d=this.getBitrateList(a),e=d.length,f=0;e>f;f+=1)if(c=d[f],1e3*b<=c.bitrate)return Math.max(f-1,0);return e-1},getBitrateList:function(a){if(!a||!a.bitrateList)return null;for(var b,c=a.bitrateList,d=a.type,e=[],f=0,g=c.length;g>f;f+=1)b=new MediaPlayer.vo.BitrateInfo,b.mediaType=d,b.qualityIndex=f,b.bitrate=c[f],e.push(b);return e},updateTopQualityIndex:function(a){var b,c=a.type,d=a.streamInfo.id;return b=a.trackCount-1,m(c,d,b),b},isPlayingAtTopQuality:function(a){var b,c=this,d=a.id,e=c.getQualityFor("audio",a),f=c.getQualityFor("video",a);return b=e===r.call(this,"audio",d)&&f===r.call(this,"video",d)},getTopQualityIndexFor:r,reset:function(){b=!0,c={},d={},e={},g={},h={},clearTimeout(a),a=null}}},MediaPlayer.dependencies.AbrController.prototype={constructor:MediaPlayer.dependencies.AbrController},MediaPlayer.dependencies.AbrController.eventList={ENAME_QUALITY_CHANGED:"qualityChanged"},MediaPlayer.dependencies.AbrController.DEFAULT_VIDEO_BITRATE=1e3,MediaPlayer.dependencies.AbrController.DEFAULT_AUDIO_BITRATE=100,MediaPlayer.dependencies.AbrController.ABANDON_LOAD="abandonload",MediaPlayer.dependencies.AbrController.ALLOW_LOAD="allowload",MediaPlayer.dependencies.AbrController.ABANDON_TIMEOUT=1e4,MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY=.9,MediaPlayer.dependencies.BufferController=function(){"use strict";var a,b,c,d,e=.5,f=0,g=-1,h=!1,i=0,j=0,k=Number.POSITIVE_INFINITY,l=-1,m=-1,n=null,o=null,p=!1,q=!1,r=!1,s=function(c){if(!c||!a||!this.streamProcessor)return null;var d=null;try{d=this.sourceBufferExt.createSourceBuffer(a,c),d&&d.hasOwnProperty("initialize")&&d.initialize(b,this)}catch(e){this.errHandler.mediaSourceError("Error creating "+b+" source buffer.")}return this.setBuffer(d),M.call(this,this.streamProcessor.getTrackForQuality(f).MSETimeOffset),d},t=function(){var a=this.streamProcessor.getStreamInfo().id,b=this.streamController.getActiveStreamInfo().id;return a===b},u=function(){var a=this.streamProcessor.getFragmentModel().getRequests({state:MediaPlayer.dependencies.FragmentModel.states.LOADING}),c=Q.call(this),d=this.virtualBuffer.getChunks({streamId:c,mediaType:b,segmentType:MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE,quality:g});return g>f&&(v(d,g)||v(a,g))?!1:g!==f},v=function(a,b){var c=0,d=a.length;for(c;d>c;c+=1)if(a[c].quality===b)return!0;return!1},w=function(a){var b,c=this;a.data.fragmentModel===c.streamProcessor.getFragmentModel()&&(c.log("Initialization finished loading"),b=a.data.chunk,this.virtualBuffer.append(b),b.quality===f&&u.call(c)&&$.call(c))},x=function(a){if(a.data.fragmentModel===this.streamProcessor.getFragmentModel()){var b,c=a.data.chunk,d=c.bytes,e=c.quality,f=c.index,g=this.streamProcessor.getFragmentModel().getRequests({state:MediaPlayer.dependencies.FragmentModel.states.EXECUTED,quality:e,index:f})[0],h=this.streamProcessor.getTrackForQuality(e),i=this.manifestModel.getValue(),j=this.adapter.getEventsFor(i,h.mediaInfo,this.streamProcessor),k=this.adapter.getEventsFor(i,h,this.streamProcessor);(j.length>0||k.length>0)&&(b=B.call(this,d,g,j,k),this.streamProcessor.getEventController().addInbandEvents(b)),c.bytes=C.call(this,d),this.virtualBuffer.append(c),O.call(this)}},y=function(a){q=!0,d=a;var b=this,c=a.quality,e=isNaN(a.index);return c!==f&&e||c!==g&&!e?void S.call(b,c,a.index):void b.sourceBufferExt.append(n,a)},z=function(b){if(n===b.data.buffer){this.isBufferingCompleted()&&this.streamProcessor.getStreamInfo().isLast&&this.mediaSourceExt.signalEndOfStream(a);var c,e=this;if(b.error)return b.error.code===MediaPlayer.dependencies.SourceBufferExtensions.QUOTA_EXCEEDED_ERROR_CODE&&(e.virtualBuffer.append(d),k=.8*e.sourceBufferExt.getTotalBufferedTime(n),e.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED,{criticalBufferLevel:k}),G.call(e)),void(q=!1);if(A.call(e),F.call(e)||(e.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED,{criticalBufferLevel:k}),G.call(e)),c=e.sourceBufferExt.getAllRanges(n),c&&c.length>0){var f,g;for(f=0,g=c.length;g>f;f+=1)e.log("Buffered Range: "+c.start(f)+" - "+c.end(f))}e.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED,{quality:d.quality,index:d.index,bufferedRanges:c}),R.call(e,d.quality,d.index)}},A=function(){var a=this,b=a.playbackController.getTime();return i=a.sourceBufferExt.getBufferLength(n,b),a.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED,{bufferLevel:i}),D.call(a),J.call(a),e>i&&L.call(a,!1),!0},B=function(a,b,c,d){var e,f,g,h,i=[],j=0,k=Math.pow(256,2),l=Math.pow(256,3),m=Math.max(isNaN(b.startTime)?0:b.startTime,0),n=[];r=!1,h=c.concat(d);for(var o=0;o<h.length;o++)n[h[o].schemeIdUri]=h[o];for(;j<a.length&&(e=String.fromCharCode(a[j+4],a[j+5],a[j+6],a[j+7]),f=a[j]*l+a[j+1]*k+256*a[j+2]+1*a[j+3],"moov"!=e&&"moof"!=e);){if("emsg"==e){r=!0;for(var p=["","",0,0,0,0,""],q=0,s=j+12;f+j>s;)0===q||1==q||6==q?(0!==a[s]?p[q]+=String.fromCharCode(a[s]):q+=1,s+=1):(p[q]=a[s]*l+a[s+1]*k+256*a[s+2]+1*a[s+3],s+=4,q+=1);g=this.adapter.getEvent(p,n,m),g&&i.push(g)}j+=f}return i},C=function(a){if(!r)return a;for(var b,c,d=a.length,e=0,f=0,g=Math.pow(256,2),h=Math.pow(256,3),i=new Uint8Array(a.length);d>e;){if(b=String.fromCharCode(a[e+4],a[e+5],a[e+6],a[e+7]),c=a[e]*h+a[e+1]*g+256*a[e+2]+1*a[e+3],"emsg"!=b)for(var j=e;e+c>j;j++)i[f]=a[j],f+=1;e+=c}return i.subarray(0,f)},D=function(){var a=E.call(this),b=2*c,d=i-a;d>=b&&!p?(p=!0,this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN)):b/2>d&&p&&(this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED),p=!1,O.call(this))},E=function(){var a=this.metricsModel.getReadOnlyMetricsFor("video"),b=this.metricsExt.getCurrentBufferLevel(a),c=this.metricsModel.getReadOnlyMetricsFor("audio"),d=this.metricsExt.getCurrentBufferLevel(c),e=null;return e=null===b||null===d?null!==d?d.level:null!==b?b.level:null:Math.min(d.level,b.level)},F=function(){var a=this,b=a.sourceBufferExt.getTotalBufferedTime(n);return k>b},G=function(){var b,c,d,e,f,g=this;n&&(b=g.playbackController.getTime(),f=g.streamProcessor.getFragmentModel().getRequests({state:MediaPlayer.dependencies.FragmentModel.states.EXECUTED,time:b})[0],d=f&&!isNaN(f.startTime)?f.startTime:Math.floor(b),e=g.sourceBufferExt.getBufferRange(n,b),null===e&&n.buffered.length>0&&(d=n.buffered.end(n.buffered.length-1)),c=n.buffered.start(0),g.sourceBufferExt.remove(n,c,d,a))},H=function(a){n===a.data.buffer&&(A.call(this),this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED,{from:a.data.from,to:a.data.to,hasEnoughSpaceToAppend:F.call(this)}),F.call(this)||setTimeout(G.bind(this),1e3*c))},I=function(){var a=l===m-1;a&&!h&&(h=!0,this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED))},J=function(){var a=this.playbackController.getTimeToStreamEnd();e>i&&a>c||c>=a&&!h?L.call(this,!1):L.call(this,!0)},K=function(){return o?MediaPlayer.dependencies.BufferController.BUFFER_LOADED:MediaPlayer.dependencies.BufferController.BUFFER_EMPTY},L=function(a){if(o!==a){o=a;var c=K(),d=c===MediaPlayer.dependencies.BufferController.BUFFER_LOADED?MediaPlayer.events.BUFFER_LOADED:MediaPlayer.events.BUFFER_EMPTY;P.call(this),this.eventBus.dispatchEvent({type:d,data:{bufferType:b}}),this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED,{hasSufficientBuffer:a}),this.log(o?"Got enough buffer to start.":"Waiting for more buffer before starting playback.")}},M=function(a){n&&n.timestampOffset!==a&&!isNaN(a)&&(n.timestampOffset=a)},N=function(){if(n){var a=this,b=this.streamProcessor.getScheduleController().getFragmentToLoadCount(),c=this.streamProcessor.getCurrentTrack().fragmentDuration;A.call(a),j=b>0?b*c+i:j,P.call(this),O.call(a)}},O=function(){u.call(this)?$.call(this):V.call(this)},P=function(){if(t.call(this)){this.metricsModel.addBufferState(b,K(),j);var a,c=i;a=this.virtualBuffer.getTotalBufferLevel(this.streamProcessor.getMediaInfo()),a&&(c+=a),this.metricsModel.addBufferLevel(b,new Date,c)}},Q=function(){return this.streamProcessor.getStreamInfo().id},R=function(a,b){q=!1,isNaN(b)?T.call(this,a):U.call(this,b),O.call(this)},S=function(a,b){q=!1,this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED,{quality:a,index:b}),O.call(this)},T=function(a){g=a},U=function(a){l=Math.max(a,l),I.call(this)},V=function(){var a,c=Q.call(this);!n||p||q||u.call(this)||!F.call(this)||(a=this.virtualBuffer.extract({streamId:c,mediaType:b,segmentType:MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE,limit:1})[0],a&&y.call(this,a))},W=function(a){if(!a.error){var b,d=this;M.call(d,a.data.currentRepresentation.MSETimeOffset),b=d.streamProcessor.getStreamInfo().manifestInfo.minBufferTime,c!==b&&(d.setMinBufferTime(b),d.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_MIN_BUFFER_TIME_UPDATED,{minBufferTime:b}))}},X=function(a){var b=this;a.data.fragmentModel===b.streamProcessor.getFragmentModel()&&(m=a.data.request.index,I.call(b))},Y=function(a){if(b===a.data.mediaType&&this.streamProcessor.getStreamInfo().id===a.data.streamInfo.id){var c=this,d=a.data.newQuality;f!==d&&(M.call(c,c.streamProcessor.getTrackForQuality(d).MSETimeOffset),f=d,u.call(c)&&$.call(c))}},Z=function(){P.call(this)},$=function(){var a=this,c=Q.call(a),d={streamId:c,mediaType:b,segmentType:MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE,quality:f},e=a.virtualBuffer.getChunks(d)[0];if(e){if(q||!n)return;y.call(a,e)}else a.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED,{requiredQuality:f})},_=function(){O.call(this)},aa=function(){J.call(this)};return{sourceBufferExt:void 0,eventBus:void 0,bufferMax:void 0,manifestModel:void 0,errHandler:void 0,mediaSourceExt:void 0,metricsModel:void 0,metricsExt:void 0,streamController:void 0,playbackController:void 0,adapter:void 0,log:void 0,abrController:void 0,system:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,virtualBuffer:void 0,setup:function(){this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED]=W,this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED]=w,this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED]=x,this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED]=X,this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED]=Y,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS]=N,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING]=N,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED]=N,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED]=aa,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED]=_,z=z.bind(this),H=H.bind(this),Z=Z.bind(this),this.sourceBufferExt.subscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED,this,z),this.sourceBufferExt.subscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED,this,H),this.virtualBuffer.subscribe(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED,this,Z)},initialize:function(a,c,d){var e=this;b=a,e.setMediaType(b),e.setMediaSource(c),e.streamProcessor=d,e.fragmentController=d.fragmentController,e.scheduleController=d.scheduleController,f=e.abrController.getQualityFor(b,d.getStreamInfo())},createBuffer:s,getStreamProcessor:function(){return this.streamProcessor},setStreamProcessor:function(a){this.streamProcessor=a},getBuffer:function(){return n},setBuffer:function(a){n=a},getBufferLevel:function(){return i},getMinBufferTime:function(){return c},setMinBufferTime:function(a){c=a},getCriticalBufferLevel:function(){return k},setMediaSource:function(b){a=b},isBufferingCompleted:function(){return h},reset:function(b){var e=this;k=Number.POSITIVE_INFINITY,o=null,c=null,g=-1,m=-1,l=-1,f=0,e.sourceBufferExt.unsubscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED,e,z),e.sourceBufferExt.unsubscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED,e,H),d=null,this.virtualBuffer.unsubscribe(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED,e,Z),p=!1,q=!1,b||(e.sourceBufferExt.abort(a,n),e.sourceBufferExt.removeSourceBuffer(a,n)),n=null}}},MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED="required",MediaPlayer.dependencies.BufferController.BUFFER_SIZE_MIN="min",MediaPlayer.dependencies.BufferController.BUFFER_SIZE_INFINITY="infinity",MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME=12,MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD=4,MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY=30,MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY_LONG_FORM=300,MediaPlayer.dependencies.BufferController.LONG_FORM_CONTENT_DURATION_THRESHOLD=600,MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD=20,MediaPlayer.dependencies.BufferController.BUFFER_LOADED="bufferLoaded",MediaPlayer.dependencies.BufferController.BUFFER_EMPTY="bufferStalled",MediaPlayer.dependencies.BufferController.prototype={constructor:MediaPlayer.dependencies.BufferController},MediaPlayer.dependencies.BufferController.eventList={ENAME_BUFFER_LEVEL_STATE_CHANGED:"bufferLevelStateChanged",ENAME_BUFFER_LEVEL_UPDATED:"bufferLevelUpdated",ENAME_QUOTA_EXCEEDED:"quotaExceeded",ENAME_BYTES_APPENDED:"bytesAppended",ENAME_BYTES_REJECTED:"bytesRejected",ENAME_BUFFERING_COMPLETED:"bufferingCompleted",ENAME_BUFFER_CLEARED:"bufferCleared",ENAME_INIT_REQUESTED:"initRequested",ENAME_BUFFER_LEVEL_OUTRUN:"bufferLevelOutrun",ENAME_BUFFER_LEVEL_BALANCED:"bufferLevelBalanced",ENAME_MIN_BUFFER_TIME_UPDATED:"minBufferTimeUpdated"},MediaPlayer.dependencies.EventController=function(){"use strict";var a={},b={},c={},d=null,e=100,f=e/1e3,g="urn:mpeg:dash:event:2012",h=1,i=function(){j(),a=null,b=null,c=null},j=function(){null!==d&&(clearInterval(d),d=null)},k=function(){var a=this;a.log("Start Event Controller"),isNaN(e)||(d=setInterval(n.bind(this),e))},l=function(b){var c=this;if(a={},b)for(var d=0;d<b.length;d++){var e=b[d];a[e.id]=e,c.log("Add inline event with id "+e.id)}c.log("Added "+b.length+" inline events")},m=function(a){for(var c=this,d=0;d<a.length;d++){var e=a[d];e.id in b?c.log("Repeated event with id "+e.id):(b[e.id]=e,c.log("Add inband event with id "+e.id))}},n=function(){o.call(this,b),o.call(this,a),p.call(this)},o=function(a){var b,d=this,e=this.videoModel.getCurrentTime();if(a)for(var i=Object.keys(a),j=0;j<i.length;j++){var k=i[j],l=a[k];void 0!==l&&(b=l.presentationTime/l.eventStream.timescale,(0===b||e>=b&&b+f>e)&&(d.log("Start Event "+k+" at "+e),l.duration>0&&(c[k]=l),l.eventStream.schemeIdUri==g&&l.eventStream.value==h&&q.call(this),delete a[k]))}},p=function(){var a=this;if(c)for(var b=this.videoModel.getCurrentTime(),d=Object.keys(c),e=0;e<d.length;e++){var f=d[e],g=c[f];null!==g&&(g.duration+g.presentationTime)/g.eventStream.timescale<b&&(a.log("Remove Event "+f+" at time "+b),g=null,delete c[f])}},q=function(){var a=this.manifestModel.getValue(),b=a.url;a.hasOwnProperty("Location")&&(b=a.Location),this.log("Refresh manifest @ "+b),this.manifestUpdater.getManifestLoader().load(b)};return{manifestModel:void 0,manifestUpdater:void 0,log:void 0,system:void 0,videoModel:void 0,addInlineEvents:l,addInbandEvents:m,reset:i,clear:j,start:k}},MediaPlayer.dependencies.EventController.prototype={constructor:MediaPlayer.dependencies.EventController},MediaPlayer.dependencies.FragmentController=function(){"use strict";var a=[],b=!1,c=function(b){for(var c=a.length,d=0;c>d;d++)if(a[d].getContext()==b)return a[d];return null},d=function(b,c){var d=this,e=a[0].getContext().streamProcessor,f=e.getStreamInfo().id,g=d.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES);-1!==g.indexOf(this.scheduleRulesCollection.sameTimeRequestRule)&&this.scheduleRulesCollection.sameTimeRequestRule.setFragmentModels(a,f),d.rulesController.applyRules(g,e,c,b,function(a,b){return b})},e=function(a,b,c){var d=new MediaPlayer.vo.DataChunk;return d.streamId=c,d.mediaType=b.mediaType,d.segmentType=b.type,d.start=b.startTime,d.duration=b.duration,d.end=d.start+d.duration,d.bytes=a,d.index=b.index,d.quality=b.quality,d},f=function(a){var b=this,c=a.data.request;b.isInitializationRequest(c)?b.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADING_START,{request:c,fragmentModel:a.sender}):b.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START,{request:c,fragmentModel:a.sender})},g=function(a){var b,c=this,d=a.data.request,f=c.process(a.data.response),g=a.sender.getContext().streamProcessor.getStreamInfo().id,h=this.isInitializationRequest(d),i=h?MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED:MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED;return null===f?void c.log("No "+d.mediaType+" bytes to push."):(b=e.call(this,f,d,g),c.notify(i,{chunk:b,fragmentModel:a.sender}),void k.call(this))},h=function(a){this.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,{request:a.data.request,fragmentModel:a.sender})},i=function(){k.call(this)},j=function(c){var d,e,f,g,h,i=c.value;for(g=0;g<i.length;g+=1)if(e=i[g])for(h=0;h<a.length;h+=1)f=a[h],d=f.getContext().streamProcessor.getType(),e.mediaType===d&&(e instanceof MediaPlayer.vo.FragmentRequest||(e=f.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.PENDING,time:e.startTime})[0]),f.executeRequest(e));b=!1},k=function(a){b||(b=!0,d.call(this,a,j.bind(this)))};return{system:void 0,log:void 0,scheduleRulesCollection:void 0,rulesController:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,setup:function(){this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED]=f,this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED]=g,this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED]=h,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED]=i,this.scheduleRulesCollection.sameTimeRequestRule&&this.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,this.scheduleRulesCollection.sameTimeRequestRule)},process:function(a){var b=null;return null!==a&&void 0!==a&&a.byteLength>0&&(b=new Uint8Array(a)),b},getModel:function(b){if(!b)return null;var d=c(b);return d||(d=this.system.getObject("fragmentModel"),d.setContext(b),a.push(d)),d},detachModel:function(b){var c=a.indexOf(b);c>-1&&a.splice(c,1)},isInitializationRequest:function(a){return a&&a.type&&a.type===MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE},prepareFragmentForLoading:function(a,b){a&&b&&a.addRequest(b)&&k.call(this,b)},executePendingRequests:function(){k.call(this)},reset:function(){a=[],this.scheduleRulesCollection.sameTimeRequestRule&&this.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED,this.scheduleRulesCollection.sameTimeRequestRule)}}},MediaPlayer.dependencies.FragmentController.prototype={constructor:MediaPlayer.dependencies.FragmentController},MediaPlayer.dependencies.FragmentController.eventList={ENAME_STREAM_COMPLETED:"streamCompleted",ENAME_INIT_FRAGMENT_LOADING_START:"initFragmentLoadingStart",ENAME_MEDIA_FRAGMENT_LOADING_START:"mediaFragmentLoadingStart",ENAME_INIT_FRAGMENT_LOADED:"initFragmentLoaded",ENAME_MEDIA_FRAGMENT_LOADED:"mediaFragmentLoaded"},MediaPlayer.dependencies.PlaybackController=function(){"use strict";var a,b,c,d,e=1e3,f=0,g=0/0,h=null,i={},j={},k=0/0,l=function(a){var b,d=parseInt(this.uriQueryFragModel.getURIFragmentData().s);return c?(!isNaN(d)&&d>1262304e3&&(b=d-a.manifestInfo.availableFrom.getTime()/1e3,(b>g||b<g-a.manifestInfo.DVRWindowSize)&&(b=null)),b=b||g):b=!isNaN(d)&&d<a.duration&&d>=0?d:a.start,b},m=function(b){var c,d=this,e=d.metricsModel.getReadOnlyMetricsFor("video")||d.metricsModel.getReadOnlyMetricsFor("audio"),f=d.metricsExt.getCurrentDVRInfo(e),g=f?f.range:null;return g?b>=g.start&&b<=g.end?b:c=Math.max(g.end-2*a.manifestInfo.minBufferTime,g.start):0/0},n=function(){if(null===h){var a=this,b=function(){G.call(a)};h=setInterval(b,e)}},o=function(){clearInterval(h),h=null},p=function(){if(!j[a.id]&&!this.isSeeking()){var b=l.call(this,a);this.log("Starting playback at offset: "+b),this.seek(b)}},q=function(){if(!this.isPaused()&&c&&0!==b.getElement().readyState){var a=this.getTime(),d=m.call(this,a),e=!isNaN(d)&&d!==a;e&&this.seek(d)}},r=function(b){if(!b.error){var c=this.adapter.convertDataToTrack(this.manifestModel.getValue(),b.data.currentRepresentation),d=c.mediaInfo.streamInfo;a.id===d.id&&(a=c.mediaInfo.streamInfo,q.call(this))}},s=function(a){a.error||0===b.getElement().readyState||p.call(this)},t=function(){b&&(b.unlisten("play",v),b.unlisten("playing",w),b.unlisten("pause",x),b.unlisten("error",F),b.unlisten("seeking",y),b.unlisten("seeked",z),b.unlisten("timeupdate",A),b.unlisten("progress",B),b.unlisten("ratechange",C),b.unlisten("loadedmetadata",D),b.unlisten("ended",E))},u=function(){this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY)},v=function(){this.log("<video> play"),q.call(this),n.call(this),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED,{startTime:this.getTime()})},w=function(){this.log("<video> playing"),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PLAYING,{playingTime:this.getTime()})},x=function(){this.log("<video> pause"),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED)},y=function(){this.log("<video> seek"),n.call(this),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING,{seekTime:this.getTime()})},z=function(){this.log("<video> seeked"),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKED)},A=function(){var a=this.getTime();a!==f&&(f=a,this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED,{timeToEnd:this.getTimeToStreamEnd()}))},B=function(){var c,d,e,f=b.getElement().buffered;f.length&&(c=f.length-1,d=f.end(c),e=l.call(this,a)+a.duration-d),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS,{bufferedRanges:b.getElement().buffered,remainingUnbufferedDuration:e})},C=function(){this.log("<video> ratechange: ",this.getPlaybackRate()),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED)},D=function(){this.log("<video> loadedmetadata"),(!c||this.timelineConverter.isTimeSyncCompleted())&&p.call(this),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_METADATA_LOADED),n.call(this)},E=function(){this.log("<video> ended"),o.call(this),this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED)},F=function(a){this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR,{error:a.srcElement.error})},G=function(){this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED,{isDynamic:c,time:new Date})},H=function(b){var c,d=b.data.bufferedRanges,e=a.id,f=this.getTime(),g=b.sender.streamProcessor.getType(),h=this.system.getObject("streamController").getStreamById(a.id),k=i[e];0===b.data.index&&(j[e]=j[e]||{},j[e][g]=!0,j.ready=!(h.hasMedia("audio")&&!j[e].audio||h.hasMedia("video")&&!j[e].video)),d&&d.length&&(c=Math.max(d.start(0),a.start),i[e]=void 0===i[e]?c:Math.max(i[e],c),k===i[e]&&f===k||!j.ready||f>i[e]||this.seek(i[e]))},I=function(c){var d=c.sender.streamProcessor.getType(),e=c.sender.streamProcessor.getStreamInfo();e.id===a.id&&b.setStallState(d,!c.data.hasSufficientBuffer)},J=function(){b.listen("canplay",u),b.listen("play",v),b.listen("playing",w),b.listen("pause",x),b.listen("error",F),b.listen("seeking",y),
b.listen("seeked",z),b.listen("timeupdate",A),b.listen("progress",B),b.listen("ratechange",C),b.listen("loadedmetadata",D),b.listen("ended",E)};return{system:void 0,log:void 0,timelineConverter:void 0,uriQueryFragModel:void 0,metricsModel:void 0,metricsExt:void 0,manifestModel:void 0,manifestExt:void 0,videoModel:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,adapter:void 0,setup:function(){this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED]=r,this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED]=s,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED]=H,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED]=I,u=u.bind(this),v=v.bind(this),w=w.bind(this),x=x.bind(this),F=F.bind(this),y=y.bind(this),z=z.bind(this),A=A.bind(this),B=B.bind(this),C=C.bind(this),D=D.bind(this),E=E.bind(this)},initialize:function(d){b=this.videoModel,a=d,i={},t.call(this),J.call(this),c=a.manifestInfo.isDynamic,g=d.start},getStreamStartTime:l,getTimeToStreamEnd:function(){var c=b.getCurrentTime();return l.call(this,a)+a.duration-c},getStreamId:function(){return a.id},getStreamDuration:function(){return a.duration},getTime:function(){return b.getCurrentTime()},getPlaybackRate:function(){return b.getPlaybackRate()},getPlayedRanges:function(){return b.getElement().played},setLiveStartTime:function(a){g=a},getLiveStartTime:function(){return g},setLiveDelayAttributes:function(a,b){k=a,d=b},getLiveDelay:function(b){var c,e=this.manifestExt.getMpd(this.manifestModel.getValue());return c=d&&e.hasOwnProperty("suggestedPresentationDelay")?e.suggestedPresentationDelay:isNaN(b)?2*a.manifestInfo.minBufferTime:b*k},start:function(){b.play()},isPaused:function(){return b.isPaused()},pause:function(){b&&b.pause()},isSeeking:function(){return b.getElement().seeking},seek:function(a){b&&a!==this.getTime()&&(this.log("Do seek: "+a),b.setCurrentTime(a))},reset:function(){o.call(this),t.call(this),b=null,a=null,f=0,g=0/0,i={},j={},c=void 0,d=void 0,k=0/0}}},MediaPlayer.dependencies.PlaybackController.prototype={constructor:MediaPlayer.dependencies.PlaybackController},MediaPlayer.dependencies.PlaybackController.eventList={ENAME_CAN_PLAY:"canPlay",ENAME_PLAYBACK_STARTED:"playbackStarted",ENAME_PLAYBACK_PLAYING:"playbackPlaying",ENAME_PLAYBACK_STOPPED:"playbackStopped",ENAME_PLAYBACK_PAUSED:"playbackPaused",ENAME_PLAYBACK_ENDED:"playbackEnded",ENAME_PLAYBACK_SEEKING:"playbackSeeking",ENAME_PLAYBACK_SEEKED:"playbackSeeked",ENAME_PLAYBACK_TIME_UPDATED:"playbackTimeUpdated",ENAME_PLAYBACK_PROGRESS:"playbackProgress",ENAME_PLAYBACK_RATE_CHANGED:"playbackRateChanged",ENAME_PLAYBACK_METADATA_LOADED:"playbackMetaDataLoaded",ENAME_PLAYBACK_ERROR:"playbackError",ENAME_WALLCLOCK_TIME_UPDATED:"wallclockTimeUpdated"},MediaPlayer.dependencies.ProtectionController=function(){"use strict";var a,b,c,d=null,e=[],f=[],g=function(a){var b=null,d=a.systemString;return c&&(b=d in c?c[d]:null),b},h=function(a){if(a.error)this.log(a.error);else{var b=a.data;f.push(b.sessionToken),this.protectionExt.requestLicense(this.keySystem,g(this.keySystem),b.message,b.defaultURL,b.sessionToken)}},i=function(a){var b,c=a.error?a.data:a.data.requestData;for(b=0;b<f.length;b++)if(f[b]===c){f.splice(b,1),a.error?this.log("DRM: License request failed! -- "+a.error):(this.log("DRM: License request successful.  Session ID = "+a.data.requestData.getSessionID()),this.updateKeySession(c,a.data.message));break}},j=function(){this.keySystem||(this.keySystem=this.protectionModel.keySystem,this.protectionExt.subscribe(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,this));for(var a=0;a<e.length;a++)this.createKeySession(e[a]);e=[]},k=function(c){if("cenc"!==c.data.initDataType)return void this.log("DRM:  Only 'cenc' initData is supported!  Ignoring initData of type: "+c.data.initDataType);var d=c.data.initData;if(ArrayBuffer.isView(d)&&(d=d.buffer),this.keySystem)this.createKeySession(d);else if(void 0===this.keySystem){this.keySystem=null,e.push(d);try{this.protectionExt.autoSelectKeySystem(this.protectionExt.getSupportedKeySystems(d),this,b,a)}catch(f){this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,"DRM: Unable to select a key system from needkey initData. -- "+f.message)}}else e.push(d)},l=function(a){a.error?this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,"DRM: KeySystem Access Denied! -- "+a.error):this.log("KeySystem Access Granted")},m=function(a){a.error?this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,"DRM: Failed to update license server certificate. -- "+a.error):this.log("DRM: License server certificate successfully updated.")},n=function(a){a.error?this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,"DRM: Failed to create key session. -- "+a.error):this.log("DRM: Session created.  SessionID = "+a.data.getSessionID())},o=function(){this.log("DRM: Key added.")},p=function(a){this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,"DRM: MediaKeyError - sessionId: "+a.data.sessionToken.getSessionID()+".  "+a.data.error)},q=function(a){a.error?this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,"DRM Failed to close key session. -- "+a.error):this.log("DRM: Session closed.  SessionID = "+a.data)},r=function(a){a.error?this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,"DRM: Failed to remove key session. -- "+a.error):this.log("DRM: Session removed.  SessionID = "+a.data)};return{system:void 0,log:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,protectionExt:void 0,keySystem:void 0,sessionType:"temporary",setup:function(){this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE]=h.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED]=j.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE]=l.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY]=k.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED]=m.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED]=o.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR]=p.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED]=n.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED]=q.bind(this),this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED]=r.bind(this),this[MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE]=i.bind(this),d=this.protectionExt.getKeySystems(),this.protectionModel=this.system.getObject("protectionModel"),this.protectionModel.init()},init:function(c,d,e){this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED,this),this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED,this),this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR,this),this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED,this),this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED,this),this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED,this),this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE,this);var f,g;d||e||(f=this.system.getObject("adapter"),g=f.getStreamsInfo(c)[0]),a=d||(g?f.getMediaInfoForType(c,g,"audio"):null),b=e||(g?f.getMediaInfoForType(c,g,"video"):null);var h=b?b:a,i=this,j=function(){i.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY,i),i.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED,i),i.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,i)},k=this.protectionExt.getSupportedKeySystemsFromContentProtection(h.contentProtection);if(k&&k.length>0){var l={};l[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE]=function(a){a.error&&(i.log("DRM: Could not select key system from ContentProtection elements!  Falling back to needkey mechanism..."),j(),i.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED,l))},l[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED]=function(a){if(a.error)i.log("DRM: Could not select key system from ContentProtection elements!  Falling back to needkey mechanism..."),j();else{i.keySystem=i.protectionModel.keySystem,i.protectionExt.subscribe(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,i);for(var b=0;b<k.length;b++)if(i.keySystem===k[b].ks){i.createKeySession(k[b].initData);break}}},this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED,l,void 0,!0),this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,l,void 0,!0),this.protectionExt.autoSelectKeySystem(k,this,b,a)}else j()},teardown:function(){this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE,this),this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED,this),this.keySystem&&this.protectionExt.unsubscribe(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,this),this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED,this),this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED,this),this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR,this),this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED,this),this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED,this),this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED,this),this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,this),this.keySystem=void 0,this.protectionModel.teardown(),this.protectionModel=void 0},requestKeySystemAccess:function(a){this.protectionModel.requestKeySystemAccess(a)},selectKeySystem:function(a){if(this.keySystem)throw new Error("DRM: KeySystem already selected!");this.protectionModel.selectKeySystem(a)},createKeySession:function(a){var b=MediaPlayer.dependencies.protection.CommonEncryption.getPSSHForKeySystem(this.keySystem,a);if(b)try{this.protectionModel.createKeySession(b,this.sessionType)}catch(c){this.notify(MediaPlayer.dependencies.ProtectionController.eventList.ENAME_PROTECTION_ERROR,"Error creating key session! "+c.message)}else this.log("Selected key system is "+this.keySystem.systemString+".  needkey/encrypted event contains no initData corresponding to that key system!")},updateKeySession:function(a,b){this.protectionModel.updateKeySession(a,b)},loadKeySession:function(a){this.protectionModel.loadKeySession(a)},removeKeySession:function(a){this.protectionModel.removeKeySession(a)},closeKeySession:function(a){this.protectionModel.closeKeySession(a)},setServerCertificate:function(a){this.protectionModel.setServerCertificate(a)},setMediaElement:function(a){this.protectionModel.setMediaElement(a)},setSessionType:function(a){this.sessionType=a},setProtectionData:function(a){c=a}}},MediaPlayer.dependencies.ProtectionController.eventList={ENAME_PROTECTION_ERROR:"protectionError"},MediaPlayer.dependencies.ProtectionController.prototype={constructor:MediaPlayer.dependencies.ProtectionController},MediaPlayer.dependencies.ScheduleController=function(){"use strict";var a,b,c,d,e,f=0,g=!0,h=null,i=!1,j=null,k=null,l=!0,m=function(a,b){var c=0,d=null;l===!1&&(d=k.start,c=a.getTime()-d.getTime(),k.duration=c,k.stopreason=b,l=!0)},n=function(){b&&(i=!1,g&&(g=!1),this.log("start"),w.call(this))},o=function(){g&&(r.call(this,e.quality),K.call(this,MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON)),n.call(this)},p=function(a){i||(i=!0,this.log("stop"),a&&c.cancelPendingRequests(),m(new Date,MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON))},q=function(a){var b=this,c=b.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES);b.rulesController.applyRules(c,b.streamProcessor,a,null,function(a,b){return b})},r=function(a){var b,d=this;return b=d.adapter.getInitRequest(d.streamProcessor,a),null!==b&&d.fragmentController.prepareFragmentForLoading(c,b),b},s=function(a){var b=this,c=b.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES);b.rulesController.applyRules(c,b.streamProcessor,a,f,function(a,b){return a=a===MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE?0:a,Math.max(a,b)})},t=function(a){var b,d,f,g=a.length,h=.1;for(f=0;g>f;f+=1)b=a[f],d=b.startTime+b.duration/2+h,b=this.adapter.getFragmentRequestForTime(this.streamProcessor,e,d,{timeThreshold:0,ignoreIsFinished:!0}),this.fragmentController.prepareFragmentForLoading(c,b)},u=function(a){var b=this;return f=a.value,0>=f?void b.fragmentController.executePendingRequests():void q.call(b,v.bind(b))},v=function(a){var b=a.value;null===b||b instanceof MediaPlayer.vo.FragmentRequest||(b=this.adapter.getFragmentRequestForTime(this.streamProcessor,e,b.startTime)),b?(f--,this.fragmentController.prepareFragmentForLoading(c,b)):this.fragmentController.executePendingRequests()},w=function(){var a=(new Date).getTime(),b=h?a-h>c.getLoadingTime():!0;this.abrController.getPlaybackQuality(this.streamProcessor),!b||i||this.playbackController.isPaused()&&this.playbackController.getPlayedRanges().length>0&&(!this.scheduleWhilePaused||d)||(h=a,s.call(this,u.bind(this)))},x=function(a){a.error||(e=this.adapter.convertDataToTrack(this.manifestModel.getValue(),a.data.currentRepresentation))},y=function(a){a.error||(e=this.streamProcessor.getCurrentTrack(),d&&null===this.liveEdgeFinder.getLiveEdge()||(b=!0),b&&o.call(this))},z=function(a){a.data.fragmentModel===this.streamProcessor.getFragmentModel()&&(this.log("Stream is complete"),m(new Date,MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON))},A=function(a){var b=this;a.data.fragmentModel===b.streamProcessor.getFragmentModel()&&w.call(b)},B=function(a){a.error&&p.call(this)},C=function(){L.call(this)},D=function(){p.call(this,!1)},E=function(a){r.call(this,a.data.requiredQuality)},F=function(a){c.removeExecutedRequestsBeforeTime(a.data.to),a.data.hasEnoughSpaceToAppend&&n.call(this)},G=function(a){var b=this;a.data.hasSufficientBuffer||b.playbackController.isSeeking()||(b.log("Stalling Buffer"),m(new Date,MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON))},H=function(){w.call(this)},I=function(){p.call(this,!1)},J=function(b){if(a===b.data.mediaType&&this.streamProcessor.getStreamInfo().id===b.data.streamInfo.id){var d,f=this;if(d=c.cancelPendingRequests(b.data.oldQuality),e=f.streamProcessor.getTrackForQuality(b.data.newQuality),null===e||void 0===e)throw"Unexpected error!";t.call(f,d),m(new Date,MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON)}},K=function(b){var c=new Date,d=this.playbackController.getTime();m(c,MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON),j=this.metricsModel.addPlayList(a,c,d,b)},L=function(){var a=this,b=a.playbackController.getTime(),c=a.playbackController.getPlaybackRate(),d=new Date;l===!0&&e&&j&&(l=!1,k=a.metricsModel.appendPlayListTrace(j,e.id,null,d,b,null,c,null))},M=function(a){var b=this,d=r.call(b,a.data.CCIndex);c.executeRequest(d)},N=function(){n.call(this)},O=function(a){g||c.cancelPendingRequests();var b=this.metricsModel.getMetricsFor("stream"),d=this.metricsExt.getCurrentManifestUpdate(b);this.log("seek: "+a.data.seekTime),K.call(this,MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON),this.metricsModel.updateManifestUpdateInfo(d,{latency:e.DVRWindow.end-this.playbackController.getTime()})},P=function(){L.call(this)},Q=function(){w.call(this)},R=function(a){if(!a.error){var c,d,f=this,g=a.data.liveEdge,h=e.mediaInfo.streamInfo.manifestInfo,i=g-Math.min(f.playbackController.getLiveDelay(e.fragmentDuration),h.DVRWindowSize/2),j=f.metricsModel.getMetricsFor("stream"),k=f.metricsExt.getCurrentManifestUpdate(j),l=f.playbackController.getLiveStartTime();c=f.adapter.getFragmentRequestForTime(f.streamProcessor,e,i,{ignoreIsFinished:!0}),d=c.startTime,(isNaN(l)||d>l)&&f.playbackController.setLiveStartTime(d),f.metricsModel.updateManifestUpdateInfo(k,{currentTime:d,presentationStartTime:g,latency:g-d,clientTimeOffset:f.timelineConverter.getClientTimeOffset()}),b=!0,e&&o.call(f)}};return{log:void 0,system:void 0,metricsModel:void 0,manifestModel:void 0,metricsExt:void 0,scheduleWhilePaused:void 0,timelineConverter:void 0,abrController:void 0,playbackController:void 0,adapter:void 0,scheduleRulesCollection:void 0,rulesController:void 0,numOfParallelRequestAllowed:void 0,setup:function(){this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED]=R,this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED]=J,this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED]=D,this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED]=x,this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED]=y,this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START]=A,this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED]=B,this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED]=z,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED]=F,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED]=C,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED]=G,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED]=H,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED]=E,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED]=I,this[MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED]=M,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED]=N,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING]=O,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED]=P,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED]=Q},initialize:function(b,e){var f=this;a=b,f.setMediaType(a),f.streamProcessor=e,f.fragmentController=e.fragmentController,f.liveEdgeFinder=e.liveEdgeFinder,f.bufferController=e.bufferController,d=e.isDynamic(),c=this.fragmentController.getModel(this),MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD=f.numOfParallelRequestAllowed,f.scheduleRulesCollection.bufferLevelRule&&f.scheduleRulesCollection.bufferLevelRule.setScheduleController(f),f.scheduleRulesCollection.pendingRequestsRule&&f.scheduleRulesCollection.pendingRequestsRule.setScheduleController(f),f.scheduleRulesCollection.playbackTimeRule&&f.scheduleRulesCollection.playbackTimeRule.setScheduleController(f)},getFragmentModel:function(){return c},getFragmentToLoadCount:function(){return f},replaceCanceledRequests:t,reset:function(){var a=this;p.call(a,!0),a.bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN,a.scheduleRulesCollection.bufferLevelRule),a.bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED,a.scheduleRulesCollection.bufferLevelRule),c.abortRequests(),a.fragmentController.detachModel(c),f=0},start:n,stop:p}},MediaPlayer.dependencies.ScheduleController.prototype={constructor:MediaPlayer.dependencies.ScheduleController},MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD=0,MediaPlayer.dependencies.StreamController=function(){"use strict";var a,b,c,d,e,f,g=[],h=.2,i=!0,j=!1,k=!1,l=!1,m=!1,n=function(a){a.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED,this.liveEdgeFinder),a.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED,this)},o=function(a){a.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED,this.liveEdgeFinder),a.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED,this)},p=function(a,b,c){this.eventBus.dispatchEvent({type:a,data:{fromStreamInfo:b?b.getStreamInfo():null,toStreamInfo:c.getStreamInfo()}})},q=function(){a.isActivated()&&j&&0===a.getStreamInfo().index&&(a.startEventController(),i&&this.playbackController.start())},r=function(){j=!0,q.call(this)},s=function(a){var b=a.data.error.code,c="";if(-1!==b){switch(b){case 1:c="MEDIA_ERR_ABORTED";break;case 2:c="MEDIA_ERR_NETWORK";break;case 3:c="MEDIA_ERR_DECODE";break;case 4:c="MEDIA_ERR_SRC_NOT_SUPPORTED";break;case 5:c="MEDIA_ERR_ENCRYPTED"}m=!0,this.log("Video Element Error: "+c),this.log(a.error),this.errHandler.mediaSourceError(c),this.reset()}},t=function(a){var b=this,c=b.videoExt.getPlaybackQuality(b.videoModel.getElement());c&&b.metricsModel.addDroppedFrames("video",c),b.playbackController.isSeeking()||a.data.timeToEnd<h&&this.mediaSourceExt.signalEndOfStream(d)},u=function(){z.call(this,a,x())},v=function(b){var c=y(b.data.seekTime);c&&c!==a&&z.call(this,a,c,b.data.seekTime)},w=function(a){var b=x(),c=a.data.streamInfo.isLast;d&&c&&this.mediaSourceExt.signalEndOfStream(d),b&&b.activate(d)},x=function(){var b=a.getStreamInfo().start,c=a.getStreamInfo().duration;return g.filter(function(a){return a.getStreamInfo().start===b+c})[0]},y=function(a){var b=0,c=null,d=g.length;d>0&&(b+=g[0].getStartTime());for(var e=0;d>e;e++)if(c=g[e],b+=c.getDuration(),b>a)return c;return null},z=function(b,c,d){if(!k&&b&&c&&b!==c){p.call(this,MediaPlayer.events.STREAM_SWITCH_STARTED,b,c),k=!0;var e=this,f=function(){void 0!==d&&e.playbackController.seek(d),e.playbackController.start(),a.startEventController(),k=!1,p.call(e,MediaPlayer.events.STREAM_SWITCH_COMPLETED,b,c)};setTimeout(function(){o.call(e,b),b.deactivate(),a=c,n.call(e,c),e.playbackController.initialize(a.getStreamInfo()),A.call(e,f)},0)}},A=function(b){var c,e=this,f=function(g){e.log("MediaSource is open!"),e.log(g),window.URL.revokeObjectURL(c),d.removeEventListener("sourceopen",f),d.removeEventListener("webkitsourceopen",f),B.call(e),a.activate(d),b&&b()};d?e.mediaSourceExt.detachMediaSource(e.videoModel):d=e.mediaSourceExt.createMediaSource(),d.addEventListener("sourceopen",f,!1),d.addEventListener("webkitsourceopen",f,!1),c=e.mediaSourceExt.attachMediaSource(d,e.videoModel)},B=function(){var b,c,e=this;b=a.getStreamInfo().manifestInfo.duration,c=e.mediaSourceExt.setDuration(d,b),e.log("Duration successfully set to: "+c)},C=function(){var e,f,h,i,j,k,m,o=this,q=o.manifestModel.getValue(),r=o.metricsModel.getMetricsFor("stream"),s=o.metricsExt.getCurrentManifestUpdate(r),t=[];if(q){k=o.adapter.getStreamsInfo(q);try{if(0===k.length)throw new Error("There are no streams");for(o.metricsModel.updateManifestUpdateInfo(s,{currentTime:o.videoModel.getCurrentTime(),buffered:o.videoModel.getElement().buffered,presentationStartTime:k[0].start,clientTimeOffset:o.timelineConverter.getClientTimeOffset()}),l=!0,i=0,f=k.length;f>i;i+=1){for(e=k[i],j=0,h=g.length;h>j;j+=1)g[j].getId()===e.id&&(m=g[j],t.push(m),m.updateData(e));m||(m=o.system.getObject("stream"),m.initialize(e,b,c),m.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED,o),t.push(m),a&&m.updateData(e)),o.metricsModel.addManifestUpdateStreamInfo(s,e.id,e.index,e.start,e.duration),m=null}g=t,a||(a=g[0],p.call(o,MediaPlayer.events.STREAM_SWITCH_STARTED,null,a),o.playbackController.initialize(a.getStreamInfo()),n.call(o,a),p.call(o,MediaPlayer.events.STREAM_SWITCH_COMPLETED,null,a)),d||A.call(this),l=!1,D.call(o)}catch(u){o.errHandler.manifestError(u.message,"nostreamscomposed",q),o.reset()}}},D=function(){if(!l){var a=this,b=g.length,c=0;for(q.call(this),c;b>c;c+=1)if(!g[c].isInitialized())return;a.notify(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED)}},E=function(){D.call(this)},F=function(){C.call(this)},G=function(a){if(a.error)this.reset();else{this.log("Manifest has loaded.");var b=this.manifestExt.getUTCTimingSources(a.data.manifest),c=b.concat(e);this.timeSyncController.initialize(c,f)}};return{system:void 0,videoModel:void 0,manifestUpdater:void 0,manifestLoader:void 0,manifestModel:void 0,manifestExt:void 0,adapter:void 0,playbackController:void 0,log:void 0,metricsModel:void 0,metricsExt:void 0,videoExt:void 0,liveEdgeFinder:void 0,mediaSourceExt:void 0,timelineConverter:void 0,protectionExt:void 0,timeSyncController:void 0,virtualBuffer:void 0,errHandler:void 0,eventBus:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,setup:function(){this[MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED]=G,this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED]=E,this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED]=w,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING]=v,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED]=t,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED]=u,this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED]=F,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY]=r,this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR]=s},getAutoPlay:function(){return i},getActiveStreamInfo:function(){return a?a.getStreamInfo():null},isStreamActive:function(b){return a.getId()===b.id},setUTCTimingSources:function(a,b){e=a,f=b},getStreamById:function(a){return g.filter(function(b){return b.getId()===a})[0]},initialize:function(a,d,e){i=a,b=d,c=e,this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED,this.timelineConverter),this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED,this.liveEdgeFinder),this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED,this),this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED,this.manifestUpdater),this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED,this.manifestUpdater),this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED,this),this.subscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED,this.manifestUpdater),this.manifestUpdater.subscribe(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED,this),this.manifestUpdater.initialize(this.manifestLoader)},load:function(a){this.manifestLoader.load(a)},loadWithManifest:function(a){this.manifestUpdater.setManifest(a)},reset:function(){a&&o.call(this,a),this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED,this.timelineConverter),this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED,this.liveEdgeFinder),this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED,this),this.timeSyncController.reset();for(var e=0,f=g.length;f>e;e++){var h=g[e];h.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED,this),h.reset(m)}g=[],this.unsubscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED,this.manifestUpdater),this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED,this.manifestUpdater),this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED,this.manifestUpdater),this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED,this),this.manifestUpdater.unsubscribe(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED,this),this.manifestUpdater.reset(),this.metricsModel.clearAllCurrentMetrics(),this.manifestModel.setValue(null),this.timelineConverter.reset(),this.liveEdgeFinder.reset(),this.adapter.reset(),this.virtualBuffer.reset(),k=!1,l=!1,a=null,j=!1,m=!1,b=null,c=null,d&&(this.mediaSourceExt.detachMediaSource(this.videoModel),d=null)}}},MediaPlayer.dependencies.StreamController.prototype={constructor:MediaPlayer.dependencies.StreamController},MediaPlayer.dependencies.StreamController.eventList={ENAME_STREAMS_COMPOSED:"streamsComposed"},MediaPlayer.dependencies.TextController=function(){var a=!1,b=null,c=null,d=null,e=function(){this.notify(MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED,{CCIndex:0})},f=function(a){var b=this;a.data.fragmentModel===b.streamProcessor.getFragmentModel()&&a.data.chunk.bytes&&b.sourceBufferExt.append(c,a.data.chunk)};return{sourceBufferExt:void 0,log:void 0,system:void 0,errHandler:void 0,videoModel:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,setup:function(){this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED]=e,this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED]=f},initialize:function(a,b,c){var e=this;d=a,e.setMediaSource(b),e.trackController=c.trackController,e.streamProcessor=c},createBuffer:function(e){try{c=this.sourceBufferExt.createSourceBuffer(b,e),a||(c.hasOwnProperty("initialize")&&c.initialize(d,this),a=!0)}catch(f){this.errHandler.mediaSourceError("Error creating "+d+" source buffer.")}return c},getBuffer:function(){return c},setBuffer:function(a){c=a},setMediaSource:function(a){b=a},reset:function(a){a||(this.sourceBufferExt.abort(b,c),this.sourceBufferExt.removeSourceBuffer(b,c))}}},MediaPlayer.dependencies.TextController.prototype={constructor:MediaPlayer.dependencies.TextController},MediaPlayer.dependencies.TextController.eventList={ENAME_CLOSED_CAPTIONING_REQUESTED:"closedCaptioningRequested"},MediaPlayer.dependencies.XlinkController=function(){"use strict";var a,b,c,d,e="onLoad",f="onActuate",g="Period",h="AdaptationSet",i="EventStream",j="urn:mpeg:dash:resolve-to-zero:2013",k=function(b){var f,h=this;d=new X2JS(a,"",!0),c=b,f=o(c.Period_asArray,c,g,e),l.call(h,f,g,e)},l=function(a,b,c){var d,e,f,g=this,h={};for(h.elements=a,h.type=b,h.resolveType=c,0===h.elements.length&&n.call(g,h),f=0;f<h.elements.length;f+=1)d=h.elements[f],e=-1!==d.url.indexOf("http://")?d.url:d.originalContent.BaseURL+d.url,g.xlinkLoader.load(e,d,h)},m=function(a){var b,c,e,f="<response>",g="</response>",h="";b=a.data.element,c=a.data.resolveObject,b.resolvedContent&&(e=b.resolvedContent.indexOf(">")+1,h=b.resolvedContent.substr(0,e)+f+b.resolvedContent.substr(e)+g,b.resolvedContent=d.xml_str2json(h)),r.call(this,c)&&n.call(this,c)},n=function(a){var b,d,j=[];if(p.call(this,a),a.resolveType===f&&this.notify(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY,{
manifest:c}),a.resolveType===e)switch(a.type){case g:for(b=0;b<c[g+"_asArray"].length;b++)d=c[g+"_asArray"][b],d.hasOwnProperty(h+"_asArray")&&(j=j.concat(o.call(this,d[h+"_asArray"],d,h,e))),d.hasOwnProperty(i+"_asArray")&&(j=j.concat(o.call(this,d[i+"_asArray"],d,i,e)));l.call(this,j,h,e);break;case h:this.notify(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY,{manifest:c})}},o=function(a,b,c,d){var e,f,g,h=[];for(f=a.length-1;f>=0;f-=1)e=a[f],e.hasOwnProperty("xlink:href")&&e["xlink:href"]===j&&a.splice(f,1);for(f=0;f<a.length;f++)e=a[f],e.hasOwnProperty("xlink:href")&&e.hasOwnProperty("xlink:actuate")&&e["xlink:actuate"]===d&&(g=q(e["xlink:href"],b,c,f,d,e),h.push(g));return h},p=function(a){var d,e,f,g,h,i,j=[];for(g=a.elements.length-1;g>=0;g--){if(d=a.elements[g],e=d.type+"_asArray",!d.resolvedContent||s())delete d.originalContent["xlink:actuate"],delete d.originalContent["xlink:href"],j.push(d.originalContent);else if(d.resolvedContent)for(h=0;h<d.resolvedContent[e].length;h++)f=d.resolvedContent[e][h],j.push(f);for(d.parentElement[e].splice(d.index,1),i=0;i<j.length;i++)d.parentElement[e].splice(d.index+i,0,j[i]);j=[]}a.elements.length>0&&b.run(c)},q=function(a,b,c,d,e,f){return{url:a,parentElement:b,type:c,index:d,resolveType:e,originalContent:f,resolvedContent:null,resolved:!1}},r=function(a){var b,c;for(b=0;b<a.elements.length;b++)if(c=a.elements[b],c.resolved===!1)return!1;return!0},s=function(){return!1};return{xlinkLoader:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,setup:function(){m=m.bind(this),this.xlinkLoader.subscribe(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED,this,m)},resolveManifestOnLoad:function(a){k.call(this,a)},setMatchers:function(b){a=b},setIron:function(a){b=a}}},MediaPlayer.dependencies.XlinkController.prototype={constructor:MediaPlayer.dependencies.XlinkController},MediaPlayer.dependencies.XlinkController.eventList={ENAME_XLINK_ALLELEMENTSLOADED:"xlinkAllElementsLoaded",ENAME_XLINK_READY:"xlinkReady"},MediaPlayer.dependencies.MediaSourceExtensions=function(){"use strict"},MediaPlayer.dependencies.MediaSourceExtensions.prototype={constructor:MediaPlayer.dependencies.MediaSourceExtensions,createMediaSource:function(){"use strict";var a="WebKitMediaSource"in window,b="MediaSource"in window;return b?new MediaSource:a?new WebKitMediaSource:null},attachMediaSource:function(a,b){"use strict";var c=window.URL.createObjectURL(a);return b.setSource(c),c},detachMediaSource:function(a){"use strict";a.setSource("")},setDuration:function(a,b){"use strict";return a.duration!=b&&(a.duration=b),a.duration},signalEndOfStream:function(a){"use strict";var b=a.sourceBuffers,c=b.length,d=0;if("open"===a.readyState){for(d;c>d;d+=1)if(b[d].updating)return;a.endOfStream()}}},MediaPlayer.dependencies.ProtectionExtensions=function(){"use strict";this.system=void 0,this.log=void 0,this.keySystems=[],this.notify=void 0,this.subscribe=void 0,this.unsubscribe=void 0,this.clearkeyKeySystem=void 0},MediaPlayer.dependencies.ProtectionExtensions.prototype={constructor:MediaPlayer.dependencies.ProtectionExtensions,setup:function(){var a;a=this.system.getObject("ksPlayReady"),this.keySystems.push(a),a=this.system.getObject("ksWidevine"),this.keySystems.push(a),a=this.system.getObject("ksClearKey"),this.keySystems.push(a),this.clearkeyKeySystem=a},getKeySystems:function(){return this.keySystems},getKeySystemBySystemString:function(a){for(var b=0;b<this.keySystems.length;b++)if(this.keySystems[b].systemString===a)return this.keySystems[b];return null},isClearKey:function(a){return a===this.clearkeyKeySystem},initDataEquals:function(a,b){if(a.byteLength===b.byteLength){for(var c=0;c<a.byteLength;c++)if(a[c]!==b[c])return!1;return!0}return!1},getSupportedKeySystemsFromContentProtection:function(a){var b,c,d,e,f=[];if(a)for(d=0;d<this.keySystems.length;++d)for(c=this.keySystems[d],e=0;e<a.length;++e)if(b=a[e],b.schemeIdUri.toLowerCase()===c.schemeIdURI){var g=c.getInitData(b);g&&f.push({ks:this.keySystems[d],initData:g})}return f},getSupportedKeySystems:function(a){var b,c=[],d=MediaPlayer.dependencies.protection.CommonEncryption.parsePSSHList(a);for(b=0;b<this.keySystems.length;++b)this.keySystems[b].uuid in d&&c.push({ks:this.keySystems[b],initData:d[this.keySystems[b].uuid]});return c},autoSelectKeySystem:function(a,b,c,d){if(0===a.length)throw new Error("DRM system for this content not supported by the player!");var e=[],f=[];c&&f.push(new MediaPlayer.vo.protection.MediaCapability(c.codec)),d&&e.push(new MediaPlayer.vo.protection.MediaCapability(d.codec));for(var g=new MediaPlayer.vo.protection.KeySystemConfiguration(e,f),h=[],i=0;i<a.length;i++)h.push({ks:a[i].ks,configs:[g]});var j=this;!function(a){var b={};b[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE]=function(b){if(a.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,this),b.error)j.log(b.error);else{var c=b.data;j.log("KeySystem Access Granted ("+c.keySystem.systemString+")!"),a.selectKeySystem(c)}},a.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,b),a.requestKeySystemAccess(h)}(b)},requestLicense:function(a,b,c,d,e){var f=null;if(b&&b.hasOwnProperty("drmtoday"))f=this.system.getObject("serverDRMToday");else if("com.widevine.alpha"===a.systemString)f=this.system.getObject("serverWidevine");else if("com.microsoft.playready"===a.systemString)f=this.system.getObject("serverPlayReady");else{if("org.w3.clearkey"!==a.systemString)return void this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,e,new Error("DRM: Unknown key system! -- "+a.keySystemStr));f=this.system.getObject("serverClearKey")}if("org.w3.clearkey"===a.systemString)try{var g=f.getClearKeysFromProtectionData(b,c);if(g){var h=new MediaPlayer.vo.protection.LicenseRequestComplete(g,e);return void this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,h)}}catch(i){return void this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,e,i.message)}var j=new XMLHttpRequest,k=b&&b.laURL&&""!==b.laURL?b.laURL:d,l=this;if(k=f.getServerURLFromMessage(k,c),!k)return void this.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,e,new Error("DRM: No license server URL specified!"));j.open(f.getHTTPMethod(),k,!0),j.responseType=f.getResponseType(a.systemString),j.onload=function(){if(200==this.status){var b=new MediaPlayer.vo.protection.LicenseRequestComplete(f.getLicenseMessage(this.response,a.systemString),e);l.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,b)}else l.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,e,new Error("DRM: "+a.systemString+' update, XHR status is "'+this.statusText+'" ('+this.status+"), expected to be 200. readyState is "+this.readyState)+".  Response is "+(this.response?f.getErrorResponse(this.response,a.systemString):"NONE"))},j.onabort=function(){l.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,e,new Error("DRM: "+a.systemString+' update, XHR aborted. status is "'+this.statusText+'" ('+this.status+"), readyState is "+this.readyState))},j.onerror=function(){l.notify(MediaPlayer.dependencies.protection.KeySystem.eventList.ENAME_LICENSE_REQUEST_COMPLETE,e,new Error("DRM: "+a.systemString+' update, XHR error. status is "'+this.statusText+'" ('+this.status+"), readyState is "+this.readyState))};var m=function(a){var b;if(a)for(b in a)"authorization"===b.toLowerCase()&&(j.withCredentials=!0),j.setRequestHeader(b,a[b])};b&&m(b.httpRequestHeaders),m(a.getRequestHeadersFromMessage(c)),b&&b.withCredentials&&(j.withCredentials=!0),j.send(a.getLicenseRequestFromMessage(c))}},MediaPlayer.dependencies.RequestModifierExtensions=function(){"use strict";return{modifyRequestURL:function(a){return a},modifyRequestHeader:function(a){return a}}},MediaPlayer.dependencies.SourceBufferExtensions=function(){"use strict";this.system=void 0,this.notify=void 0,this.subscribe=void 0,this.unsubscribe=void 0},MediaPlayer.dependencies.SourceBufferExtensions.prototype={constructor:MediaPlayer.dependencies.SourceBufferExtensions,createSourceBuffer:function(a,b){"use strict";var c=this,d=b.codec,e=null;try{e=a.addSourceBuffer(d)}catch(f){if(!b.isText&&-1==d.indexOf('codecs="stpp"'))throw f;e=c.system.getObject("textSourceBuffer")}return e},removeSourceBuffer:function(a,b){"use strict";try{a.removeSourceBuffer(b)}catch(c){}},getBufferRange:function(a,b,c){"use strict";var d,e,f=null,g=0,h=0,i=null,j=null,k=0,l=c||.15;try{f=a.buffered}catch(m){return null}if(null!==f&&void 0!==f){for(e=0,d=f.length;d>e;e+=1)if(g=f.start(e),h=f.end(e),null===i)k=Math.abs(g-b),b>=g&&h>b?(i=g,j=h):l>=k&&(i=g,j=h);else{if(k=g-j,!(l>=k))break;j=h}if(null!==i)return{start:i,end:j}}return null},getAllRanges:function(a){var b=null;try{return b=a.buffered}catch(c){return null}},getTotalBufferedTime:function(a){var b,c,d=this.getAllRanges(a),e=0;if(!d)return e;for(c=0,b=d.length;b>c;c+=1)e+=d.end(c)-d.start(c);return e},getBufferLength:function(a,b,c){"use strict";var d,e,f=this;return d=f.getBufferRange(a,b,c),e=null===d?0:d.end-b},waitForUpdateEnd:function(a,b){"use strict";var c,d=50,e=function(){a.updating||(clearInterval(c),b())},f=function(){a.updating||(a.removeEventListener("updateend",f,!1),b())};if(!a.updating)return void b();if("function"==typeof a.addEventListener)try{a.addEventListener("updateend",f,!1)}catch(g){c=setInterval(e,d)}else c=setInterval(e,d)},append:function(a,b){var c=this,d=b.bytes,e="append"in a?"append":"appendBuffer"in a?"appendBuffer":null;if(e)try{c.waitForUpdateEnd(a,function(){a[e](d,b),c.waitForUpdateEnd(a,function(){c.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED,{buffer:a,bytes:d})})})}catch(f){c.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED,{buffer:a,bytes:d},new MediaPlayer.vo.Error(f.code,f.message,null))}},remove:function(a,b,c,d){var e=this;try{e.waitForUpdateEnd(a,function(){b>=0&&c>b&&"ended"!==d.readyState&&a.remove(b,c),e.waitForUpdateEnd(a,function(){e.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED,{buffer:a,from:b,to:c})})})}catch(f){e.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED,{buffer:a,from:b,to:c},new MediaPlayer.vo.Error(f.code,f.message,null))}},abort:function(a,b){"use strict";try{"open"===a.readyState&&b.abort()}catch(c){}}},MediaPlayer.dependencies.SourceBufferExtensions.QUOTA_EXCEEDED_ERROR_CODE=22,MediaPlayer.dependencies.SourceBufferExtensions.eventList={ENAME_SOURCEBUFFER_REMOVE_COMPLETED:"sourceBufferRemoveCompleted",ENAME_SOURCEBUFFER_APPEND_COMPLETED:"sourceBufferAppendCompleted"},MediaPlayer.utils.TextTrackExtensions=function(){"use strict";var a;return{setup:function(){a=window.VTTCue||window.TextTrackCue},addTextTrack:function(a,b,c,d,e){return this.track=a.addTextTrack("captions",c,d),this.track["default"]=e,this.track.mode="showing",this.video=a,this.addCaptions(0,b),this.track},addCaptions:function(b,c){for(var d in c){var e,f=c[d],g=this.video;"image"==f.type?(e=new a(f.start-b,f.end-b,""),e.image=f.data,e.id=f.id,e.size=0,e.type="image",e.onenter=function(){var a=new Image;a.id="ttmlImage_"+this.id,a.src=this.image,a.className="cue-image",g.parentNode.appendChild(a)},e.onexit=function(){var a,b=g.parentNode.childNodes;for(a=0;a<b.length;a++)b[a].id=="ttmlImage_"+this.id&&g.parentNode.removeChild(b[a])}):(e=new a(f.start-b,f.end-b,f.data),f.styles&&(void 0!==f.styles.align&&e.hasOwnProperty("align")&&(e.align=f.styles.align),void 0!==f.styles.line&&e.hasOwnProperty("line")&&(e.line=f.styles.line),void 0!==f.styles.position&&e.hasOwnProperty("position")&&(e.position=f.styles.position),void 0!==f.styles.size&&e.hasOwnProperty("size")&&(e.size=f.styles.size))),this.track.addCue(e)}},deleteCues:function(a){for(var b=0,c=!1;!c;){if(null!==a.textTracks[b].cues){c=!0;break}b++}var d=a.textTracks[b],e=d.cues,f=e.length-1;for(b=f;b>=0;b--)d.removeCue(e[b]);d.mode="disabled",d["default"]=!1}}},MediaPlayer.dependencies.VideoModelExtensions=function(){"use strict";return{getPlaybackQuality:function(a){var b="webkitDroppedFrameCount"in a,c="getVideoPlaybackQuality"in a,d=null;return c?d=a.getVideoPlaybackQuality():b&&(d={droppedVideoFrames:a.webkitDroppedFrameCount,creationTime:new Date}),d}}},MediaPlayer.dependencies.VideoModelExtensions.prototype={constructor:MediaPlayer.dependencies.VideoModelExtensions},MediaPlayer.dependencies.FragmentModel=function(){"use strict";var a=null,b=[],c=[],d=[],e=[],f=!1,g=function(a){var b=this;b.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED,{request:a}),b.fragmentLoader.load(a)},h=function(a,b){var c=a.indexOf(b);-1!==c&&a.splice(c,1)},i=function(a,b,c){var d,e=a.length-1,f=0/0,g=0/0,h=null;for(d=e;d>=0;d-=1)if(h=a[d],f=h.startTime,g=f+h.duration,c=c||h.duration/2,!isNaN(f)&&!isNaN(g)&&b+c>=f&&g>b-c||isNaN(f)&&isNaN(b))return h;return null},j=function(a,b){return b?b.hasOwnProperty("time")?[i.call(this,a,b.time,b.threshold)]:a.filter(function(a){for(var c in b)if("state"!==c&&b.hasOwnProperty(c)&&a[c]!=b[c])return!1;return!0}):a},k=function(a){var f;switch(a){case MediaPlayer.dependencies.FragmentModel.states.PENDING:f=c;break;case MediaPlayer.dependencies.FragmentModel.states.LOADING:f=d;break;case MediaPlayer.dependencies.FragmentModel.states.EXECUTED:f=b;break;case MediaPlayer.dependencies.FragmentModel.states.REJECTED:f=e;break;default:f=[]}return f},l=function(a,b){if(a){var c=a.mediaType,d=new Date,e=a.type,f=a.startTime,g=a.availabilityStartTime,h=a.duration,i=a.quality,j=a.range;this.metricsModel.addSchedulingInfo(c,d,e,f,g,h,i,j,b)}},m=function(a){var c=a.data.request,e=a.data.response,f=a.error;d.splice(d.indexOf(c),1),e&&!f&&b.push(c),l.call(this,c,f?MediaPlayer.dependencies.FragmentModel.states.FAILED:MediaPlayer.dependencies.FragmentModel.states.EXECUTED),this.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED,{request:c,response:e},f)},n=function(a){var c=this.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.EXECUTED,quality:a.data.quality,index:a.data.index})[0];c&&(h.call(this,b,c),isNaN(a.data.index)||(e.push(c),l.call(this,c,MediaPlayer.dependencies.FragmentModel.states.REJECTED)))},o=function(){f=!0},p=function(){f=!1};return{system:void 0,log:void 0,metricsModel:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,setup:function(){this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN]=o,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED]=p,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED]=n,this[MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED]=m},setLoader:function(a){this.fragmentLoader=a},setContext:function(b){a=b},getContext:function(){return a},getIsPostponed:function(){return f},addRequest:function(a){return!a||this.isFragmentLoadedOrPending(a)?!1:(c.push(a),l.call(this,a,MediaPlayer.dependencies.FragmentModel.states.PENDING),!0)},isFragmentLoadedOrPending:function(a){var e=function(a,b){return"complete"===a.action&&a.action===b.action},f=function(a,b){return a.url===b.url&&a.startTime===b.startTime},g=function(a,b){return isNaN(a.index)&&isNaN(b.index)&&a.quality===b.quality},h=function(b){var c,d,h=!1,i=b.length;for(d=0;i>d;d+=1)if(c=b[d],f(a,c)||g(a,c)||e(a,c)){h=!0;break}return h};return h(c)||h(d)||h(b)},getRequests:function(a){var b,c=[],d=[],e=1;if(!a||!a.state)return c;a.state instanceof Array?(e=a.state.length,b=a.state):b=[a.state];for(var f=0;e>f;f+=1)c=k.call(this,b[f]),d=d.concat(j.call(this,c,a));return d},getLoadingTime:function(){var a,c,d=0;for(c=b.length-1;c>=0;c-=1)if(a=b[c],a.requestEndDate instanceof Date&&a.firstByteDate instanceof Date){d=a.requestEndDate.getTime()-a.firstByteDate.getTime();break}return d},removeExecutedRequest:function(a){h.call(this,b,a)},removeRejectedRequest:function(a){h.call(this,e,a)},removeExecutedRequestsBeforeTime:function(a){var c,d=b.length-1,e=0/0,f=null;for(c=d;c>=0;c-=1)f=b[c],e=f.startTime,!isNaN(e)&&a>e&&h.call(this,b,f)},cancelPendingRequests:function(a){var b=this,d=c,e=d;return c=[],void 0!==a&&(c=d.filter(function(b){return b.quality===a?!1:(e.splice(e.indexOf(b),1),!0)})),e.forEach(function(a){l.call(b,a,MediaPlayer.dependencies.FragmentModel.states.CANCELED)}),e},abortRequests:function(){var a=[];for(this.fragmentLoader.abort();d.length>0;)a.push(d[0]),h.call(this,d,d[0]);return d=[],a},executeRequest:function(a){var e=this,f=c.indexOf(a);if(a&&-1!==f)switch(c.splice(f,1),a.action){case"complete":b.push(a),l.call(e,a,MediaPlayer.dependencies.FragmentModel.states.EXECUTED),e.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED,{request:a});break;case"download":d.push(a),l.call(e,a,MediaPlayer.dependencies.FragmentModel.states.LOADING),g.call(e,a);break;default:this.log("Unknown request action.")}},reset:function(){this.abortRequests(),this.cancelPendingRequests(),a=null,b=[],c=[],d=[],e=[],f=!1}}},MediaPlayer.dependencies.FragmentModel.prototype={constructor:MediaPlayer.dependencies.FragmentModel},MediaPlayer.dependencies.FragmentModel.eventList={ENAME_STREAM_COMPLETED:"streamCompleted",ENAME_FRAGMENT_LOADING_STARTED:"fragmentLoadingStarted",ENAME_FRAGMENT_LOADING_COMPLETED:"fragmentLoadingCompleted"},MediaPlayer.dependencies.FragmentModel.states={PENDING:"pending",LOADING:"loading",EXECUTED:"executed",REJECTED:"rejected",CANCELED:"canceled",FAILED:"failed"},MediaPlayer.models.ManifestModel=function(){"use strict";var a;return{system:void 0,eventBus:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,getValue:function(){return a},setValue:function(b){a=b,this.eventBus.dispatchEvent({type:MediaPlayer.events.MANIFEST_LOADED,data:b}),this.notify(MediaPlayer.models.ManifestModel.eventList.ENAME_MANIFEST_UPDATED,{manifest:b})}}},MediaPlayer.models.ManifestModel.prototype={constructor:MediaPlayer.models.ManifestModel},MediaPlayer.models.ManifestModel.eventList={ENAME_MANIFEST_UPDATED:"manifestUpdated"},MediaPlayer.models.MetricsModel=function(){"use strict";return{system:void 0,eventBus:void 0,adapter:void 0,streamMetrics:{},metricsChanged:function(){this.eventBus.dispatchEvent({type:MediaPlayer.events.METRICS_CHANGED,data:{}})},metricChanged:function(a){this.eventBus.dispatchEvent({type:MediaPlayer.events.METRIC_CHANGED,data:{stream:a}}),this.metricsChanged()},metricUpdated:function(a,b,c){this.eventBus.dispatchEvent({type:MediaPlayer.events.METRIC_UPDATED,data:{stream:a,metric:b,value:c}}),this.metricChanged(a)},metricAdded:function(a,b,c){this.eventBus.dispatchEvent({type:MediaPlayer.events.METRIC_ADDED,data:{stream:a,metric:b,value:c}}),this.metricChanged(a)},clearCurrentMetricsForType:function(a){delete this.streamMetrics[a],this.metricChanged(a)},clearAllCurrentMetrics:function(){var a=this;this.streamMetrics={},this.metricsChanged.call(a)},getReadOnlyMetricsFor:function(a){return this.streamMetrics.hasOwnProperty(a)?this.streamMetrics[a]:null},getMetricsFor:function(a){var b;return this.streamMetrics.hasOwnProperty(a)?b=this.streamMetrics[a]:(b=this.system.getObject("metrics"),this.streamMetrics[a]=b),b},addTcpConnection:function(a,b,c,d,e,f){var g=new MediaPlayer.vo.metrics.TCPConnection;return g.tcpid=b,g.dest=c,g.topen=d,g.tclose=e,g.tconnect=f,this.getMetricsFor(a).TcpList.push(g),this.metricAdded(a,this.adapter.metricsList.TCP_CONNECTION,g),g},addHttpRequest:function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=new MediaPlayer.vo.metrics.HTTPRequest;return n.stream=a,n.tcpid=b,n.type=c,n.url=d,n.actualurl=e,n.range=f,n.trequest=g,n.tresponse=h,n.tfinish=i,n.responsecode=j,n.interval=k,n.mediaduration=l,n.responseHeaders=m,this.getMetricsFor(a).HttpList.push(n),this.metricAdded(a,this.adapter.metricsList.HTTP_REQUEST,n),n},appendHttpTrace:function(a,b,c,d){var e=new MediaPlayer.vo.metrics.HTTPRequest.Trace;return e.s=b,e.d=c,e.b=d,a.trace.push(e),this.metricUpdated(a.stream,this.adapter.metricsList.HTTP_REQUEST_TRACE,a),e},addTrackSwitch:function(a,b,c,d,e){var f=new MediaPlayer.vo.metrics.TrackSwitch;return f.t=b,f.mt=c,f.to=d,f.lto=e,this.getMetricsFor(a).RepSwitchList.push(f),this.metricAdded(a,this.adapter.metricsList.TRACK_SWITCH,f),f},addBufferLevel:function(a,b,c){var d=new MediaPlayer.vo.metrics.BufferLevel;return d.t=b,d.level=c,this.getMetricsFor(a).BufferLevel.push(d),this.metricAdded(a,this.adapter.metricsList.BUFFER_LEVEL,d),d},addBufferState:function(a,b,c){var d=new MediaPlayer.vo.metrics.BufferState;return d.target=c,d.state=b,this.getMetricsFor(a).BufferState.push(d),this.metricAdded(a,this.adapter.metricsList.BUFFER_STATE,d),d},addDVRInfo:function(a,b,c,d){var e=new MediaPlayer.vo.metrics.DVRInfo;return e.time=b,e.range=d,e.manifestInfo=c,this.getMetricsFor(a).DVRInfo.push(e),this.metricAdded(a,this.adapter.metricsList.DVR_INFO,e),e},addDroppedFrames:function(a,b){var c=new MediaPlayer.vo.metrics.DroppedFrames,d=this.getMetricsFor(a).DroppedFrames;return c.time=b.creationTime,c.droppedFrames=b.droppedVideoFrames,d.length>0&&d[d.length-1]==c?d[d.length-1]:(d.push(c),this.metricAdded(a,this.adapter.metricsList.DROPPED_FRAMES,c),c)},addSchedulingInfo:function(a,b,c,d,e,f,g,h,i){var j=new MediaPlayer.vo.metrics.SchedulingInfo;return j.mediaType=a,j.t=b,j.type=c,j.startTime=d,j.availabilityStartTime=e,j.duration=f,j.quality=g,j.range=h,j.state=i,this.getMetricsFor(a).SchedulingInfo.push(j),this.metricAdded(a,this.adapter.metricsList.SCHEDULING_INFO,j),j},addManifestUpdate:function(a,b,c,d,e,f,g,h,i,j){var k=new MediaPlayer.vo.metrics.ManifestUpdate,l=this.getMetricsFor("stream");return k.mediaType=a,k.type=b,k.requestTime=c,k.fetchTime=d,k.availabilityStartTime=e,k.presentationStartTime=f,k.clientTimeOffset=g,k.currentTime=h,k.buffered=i,k.latency=j,l.ManifestUpdate.push(k),this.metricAdded(a,this.adapter.metricsList.MANIFEST_UPDATE,k),k},updateManifestUpdateInfo:function(a,b){if(a){for(var c in b)a[c]=b[c];this.metricUpdated(a.mediaType,this.adapter.metricsList.MANIFEST_UPDATE,a)}},addManifestUpdateStreamInfo:function(a,b,c,d,e){if(a){var f=new MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo;return f.id=b,f.index=c,f.start=d,f.duration=e,a.streamInfo.push(f),this.metricUpdated(a.mediaType,this.adapter.metricsList.MANIFEST_UPDATE_STREAM_INFO,a),f}return null},addManifestUpdateTrackInfo:function(a,b,c,d,e,f,g,h){if(a){var i=new MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo;return i.id=b,i.index=c,i.streamIndex=d,i.mediaType=e,i.startNumber=g,i.fragmentInfoType=h,i.presentationTimeOffset=f,a.trackInfo.push(i),this.metricUpdated(a.mediaType,this.adapter.metricsList.MANIFEST_UPDATE_TRACK_INFO,a),i}return null},addPlayList:function(a,b,c,d){var e=new MediaPlayer.vo.metrics.PlayList;return e.stream=a,e.start=b,e.mstart=c,e.starttype=d,this.getMetricsFor(a).PlayList.push(e),this.metricAdded(a,this.adapter.metricsList.PLAY_LIST,e),e},appendPlayListTrace:function(a,b,c,d,e,f,g,h){var i=new MediaPlayer.vo.metrics.PlayList.Trace;return i.representationid=b,i.subreplevel=c,i.start=d,i.mstart=e,i.duration=f,i.playbackspeed=g,i.stopreason=h,a.trace.push(i),this.metricUpdated(a.stream,this.adapter.metricsList.PLAY_LIST_TRACE,a),i}}},MediaPlayer.models.MetricsModel.prototype={constructor:MediaPlayer.models.MetricsModel},MediaPlayer.models.ProtectionModel={},MediaPlayer.models.ProtectionModel.eventList={ENAME_NEED_KEY:"needkey",ENAME_KEY_SYSTEM_ACCESS_COMPLETE:"keySystemAccessComplete",ENAME_KEY_SYSTEM_SELECTED:"keySystemSelected",ENAME_VIDEO_ELEMENT_SELECTED:"videoElementSelected",ENAME_SERVER_CERTIFICATE_UPDATED:"serverCertificateUpdated",ENAME_KEY_MESSAGE:"keyMessage",ENAME_KEY_ADDED:"keyAdded",ENAME_KEY_ERROR:"keyError",ENAME_KEY_SESSION_CREATED:"keySessionCreated",ENAME_KEY_SESSION_REMOVED:"keySessionRemoved",ENAME_KEY_SESSION_CLOSED:"keySessionClosed",ENAME_KEY_STATUSES_CHANGED:"keyStatusesChanged"},MediaPlayer.models.ProtectionModel_01b=function(){var a,b=null,c=null,d=[],e=[],f=function(){var b=this;return{handleEvent:function(f){var g=null;switch(f.type){case c.needkey:b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY,new MediaPlayer.vo.protection.NeedKey(f.initData,"cenc"));break;case c.keyerror:if(g=h(e,f.sessionId),g||(g=h(d,f.sessionId)),g){var i="";switch(f.errorCode.code){case 1:i+="MEDIA_KEYERR_UNKNOWN - An unspecified error occurred. This value is used for errors that don't match any of the other codes.";break;case 2:i+="MEDIA_KEYERR_CLIENT - The Key System could not be installed or updated.";break;case 3:i+="MEDIA_KEYERR_SERVICE - The message passed into update indicated an error from the license service.";break;case 4:i+="MEDIA_KEYERR_OUTPUT - There is no available output device with the required characteristics for the content protection system.";break;case 5:i+="MEDIA_KEYERR_HARDWARECHANGE - A hardware configuration change caused a content protection error.";break;case 6:i+="MEDIA_KEYERR_DOMAIN - An error occurred in a multi-device domain licensing configuration. The most common error is a failure to join the domain."}i+="  System Code = "+f.systemCode,b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR,new MediaPlayer.vo.protection.KeyError(g,i))}else b.log("No session token found for key error");break;case c.keyadded:g=h(e,f.sessionId),g||(g=h(d,f.sessionId)),g?b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED,g):b.log("No session token found for key added");break;case c.keymessage:a=null!==f.sessionId&&void 0!==f.sessionId,a?(g=h(e,f.sessionId),!g&&d.length>0&&(g=d.shift(),e.push(g),g.sessionID=f.sessionId)):d.length>0&&(g=d.shift(),e.push(g),0!==d.length&&b.errHandler.mediaKeyMessageError("Multiple key sessions were creates with a user-agent that does not support sessionIDs!! Unpredictable behavior ahead!")),g?(g.keyMessage=f.message,b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE,new MediaPlayer.vo.protection.KeyMessage(g,f.message,f.defaultURL))):b.log("No session token found for key message")}}}},g=null,h=function(a,b){if(b&&a){for(var c=a.length,d=0;c>d;d++)if(a[d].sessionID==b)return a[d];return null}return null},i=function(){b.removeEventListener(c.keyerror,g),b.removeEventListener(c.needkey,g),b.removeEventListener(c.keymessage,g),b.removeEventListener(c.keyadded,g)};return{system:void 0,log:void 0,errHandler:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,protectionExt:void 0,keySystem:null,setup:function(){g=f.call(this)},init:function(){var a=document.createElement("video");c=MediaPlayer.models.ProtectionModel_01b.detect(a)},teardown:function(){b&&i();for(var a=0;a<e.length;a++)this.closeKeySession(e[a])},requestKeySystemAccess:function(a){var c=b;c||(c=document.createElement("video"));for(var d=!1,e=0;e<a.length;e++)for(var f=a[e].ks.systemString,g=a[e].configs,h=null,i=null,j=0;j<g.length;j++){var k=g[j].videoCapabilities;if(k&&0!==k.length){i=[];for(var l=0;l<k.length;l++)""!==c.canPlayType(k[l].contentType,f)&&i.push(k[l])}if(!(!h&&!i||h&&0===h.length||i&&0===i.length)){d=!0;var m=new MediaPlayer.vo.protection.KeySystemConfiguration(h,i),n=this.protectionExt.getKeySystemBySystemString(f),o=new MediaPlayer.vo.protection.KeySystemAccess(n,m);this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,o);break}}d||this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,null,"Key system access denied! -- No valid audio/video content configurations detected!")},selectKeySystem:function(a){this.keySystem=a.keySystem,this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED)},setMediaElement:function(a){b&&i(),b=a,b.addEventListener(c.keyerror,g),b.addEventListener(c.needkey,g),b.addEventListener(c.keymessage,g),b.addEventListener(c.keyadded,g),this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_VIDEO_ELEMENT_SELECTED)},createKeySession:function(f){if(!this.keySystem)throw new Error("Can not create sessions until you have selected a key system");var g;for(g=0;g<e.length;g++)if(this.protectionExt.initDataEquals(f,e[g].initData))return;for(g=0;g<d.length;g++)if(this.protectionExt.initDataEquals(f,d[g].initData))return;if(a||0===e.length){var h={prototype:(new MediaPlayer.models.SessionToken).prototype,sessionID:null,initData:f,getSessionID:function(){return this.sessionID}};return d.push(h),b[c.generateKeyRequest](this.keySystem.systemString,new Uint8Array(f)),h}throw new Error("Multiple sessions not allowed!")},updateKeySession:function(a,d){var e=a.sessionID;if(this.protectionExt.isClearKey(this.keySystem))for(var f=0;f<d.keyPairs.length;f++)b[c.addKey](this.keySystem.systemString,d.keyPairs[f].key,d.keyPairs[f].keyID,e);else b[c.addKey](this.keySystem.systemString,d,a.initData,e)},closeKeySession:function(a){b[c.cancelKeyRequest](this.keySystem.systemString,a.sessionID)},setServerCertificate:function(){},loadKeySession:function(){},removeKeySession:function(){}}},MediaPlayer.models.ProtectionModel_01b.prototype={constructor:MediaPlayer.models.ProtectionModel_01b},MediaPlayer.models.ProtectionModel_01b.APIs=[{generateKeyRequest:"generateKeyRequest",addKey:"addKey",cancelKeyRequest:"cancelKeyRequest",needkey:"needkey",keyerror:"keyerror",keyadded:"keyadded",keymessage:"keymessage"},{generateKeyRequest:"webkitGenerateKeyRequest",addKey:"webkitAddKey",cancelKeyRequest:"webkitCancelKeyRequest",needkey:"webkitneedkey",keyerror:"webkitkeyerror",keyadded:"webkitkeyadded",keymessage:"webkitkeymessage"}],MediaPlayer.models.ProtectionModel_01b.detect=function(a){for(var b=MediaPlayer.models.ProtectionModel_01b.APIs,c=0;c<b.length;c++){var d=b[c];if("function"==typeof a[d.generateKeyRequest]&&"function"==typeof a[d.addKey]&&"function"==typeof a[d.cancelKeyRequest])return d}return null},MediaPlayer.models.ProtectionModel_21Jan2015=function(){var a=null,b=null,c=[],d=function(a,b){var c=this;!function(b){var e=a[b].ks,f=a[b].configs;navigator.requestMediaKeySystemAccess(e.systemString,f).then(function(a){var b="function"==typeof a.getConfiguration?a.getConfiguration():null,d=new MediaPlayer.vo.protection.KeySystemAccess(e,b);d.mksa=a,c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,d)})["catch"](function(){++b<a.length?d.call(c,a,b):c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,null,"Key system access denied!")})}(b)},e=function(){var a=this;return{handleEvent:function(b){switch(b.type){case"encrypted":a.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY,new MediaPlayer.vo.protection.NeedKey(b.initData,b.initDataType))}}}},f=null,g=function(a){for(var b=0;b<c.length;b++)if(c[b]===a){c.splice(b,1);break}},h=function(a,b){var d=this,e={prototype:(new MediaPlayer.models.SessionToken).prototype,session:a,initData:b,handleEvent:function(a){switch(a.type){case"keystatuseschange":d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_STATUSES_CHANGED,this);break;case"message":d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE,new MediaPlayer.vo.protection.KeyMessage(this,a.message,void 0,a.messageType))}},getSessionID:function(){return this.session.sessionId},getExpirationTime:function(){return this.session.expiration},getKeyStatuses:function(){return this.session.keyStatuses}};return a.addEventListener("keystatuseschange",e),a.addEventListener("message",e),a.closed.then(function(){g(e),d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED,e.getSessionID())}),c.push(e),e};return{system:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,
protectionExt:void 0,keySystem:null,setup:function(){f=e.call(this)},init:function(){},teardown:function(){a&&(a.removeEventListener("encrypted",f),a.setMediaKeys(null));for(var b=0;b<c.length;b++)this.closeKeySession(c[b])},requestKeySystemAccess:function(a){d.call(this,a,0)},selectKeySystem:function(c){var d=this;c.mksa.createMediaKeys().then(function(e){d.keySystem=c.keySystem,b=e,a&&a.setMediaKeys(b),d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED)})["catch"](function(){d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED,null,"Error selecting keys system ("+c.keySystem.systemString+")! Could not create MediaKeys -- TODO")})},setMediaElement:function(c){a&&a.removeEventListener("encrypted",f),a=c,a.addEventListener("encrypted",f),b&&a.setMediaKeys(b)},setServerCertificate:function(a){if(!this.keySystem||!b)throw new Error("Can not set server certificate until you have selected a key system");var c=this;b.setServerCertificate(a).then(function(){c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED)})["catch"](function(a){c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED,null,"Error updating server certificate -- "+a.name)})},createKeySession:function(a,d){if(!this.keySystem||!b)throw new Error("Can not create sessions until you have selected a key system");for(var e=0;e<c.length;e++)if(this.protectionExt.initDataEquals(a,c[e].initData))return;var f=b.createSession(d),i=h.call(this,f,a),j=this;f.generateRequest("cenc",a).then(function(){j.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED,i)})["catch"](function(a){g(i),j.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED,null,"Error generating key request -- "+a.name)})},updateKeySession:function(a,b){var c=a.session,d=this;this.protectionExt.isClearKey(this.keySystem)&&(b=b.toJWK()),c.update(b)["catch"](function(b){d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR,new MediaPlayer.vo.protection.KeyError(a,"Error sending update() message! "+b.name))})},loadKeySession:function(a){if(!this.keySystem||!b)throw new Error("Can not load sessions until you have selected a key system");var c=b.createSession(),d=this;c.load(a).then(function(b){if(b){var e=h.call(this,c);d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED,e)}else d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED,null,"Could not load session! Invalid Session ID ("+a+")")})["catch"](function(b){d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED,null,"Could not load session ("+a+")! "+b.name)})},removeKeySession:function(a){var b=a.session,c=this;b.remove().then(function(){c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED,a.getSessionID())})["catch"](function(b){c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED,null,"Error removing session ("+a.getSessionID()+"). "+b.name)})},closeKeySession:function(a){var b=a.session;b.removeEventListener("keystatuseschange",a),b.removeEventListener("message",a);var c=this;b.close()["catch"](function(b){c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED,null,"Error closing session ("+a.getSessionID()+") "+b.name)})}}},MediaPlayer.models.ProtectionModel_21Jan2015.detect=function(a){return void 0===a.onencrypted||void 0===a.mediaKeys?!1:void 0===navigator.requestMediaKeySystemAccess||"function"!=typeof navigator.requestMediaKeySystemAccess?!1:!0},MediaPlayer.models.ProtectionModel_21Jan2015.prototype={constructor:MediaPlayer.models.ProtectionModel_21Jan2015},MediaPlayer.models.ProtectionModel_3Feb2014=function(){var a=null,b=null,c=null,d=null,e=[],f=function(){var a=this;return{handleEvent:function(b){switch(b.type){case d.needkey:a.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY,new MediaPlayer.vo.protection.NeedKey(b.initData,"cenc"))}}}},g=null,h=function(){var c=function(){a[d.setMediaKeys](b),this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_VIDEO_ELEMENT_SELECTED)};a.readyState>=1?c.call(this):a.addEventListener("loadedmetadata",c.bind(this))},i=function(a,b){var c=this;return{prototype:(new MediaPlayer.models.SessionToken).prototype,session:a,initData:b,handleEvent:function(a){switch(a.type){case d.error:var b="KeyError";c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR,new MediaPlayer.vo.protection.KeyError(this,b));break;case d.message:c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE,new MediaPlayer.vo.protection.KeyMessage(this,a.message,a.destinationURL));break;case d.ready:c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED,this);break;case d.close:c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED,this.getSessionID())}},getSessionID:function(){return this.session.sessionId}}};return{system:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,protectionExt:void 0,keySystem:null,setup:function(){g=f.call(this)},init:function(){var a=document.createElement("video");d=MediaPlayer.models.ProtectionModel_3Feb2014.detect(a)},teardown:function(){a&&a.removeEventListener(d.needkey,g);for(var b=0;b<e.length;b++)this.closeKeySession(e[b])},requestKeySystemAccess:function(a){for(var b=!1,c=0;c<a.length;c++)for(var e=a[c].ks.systemString,f=a[c].configs,g=null,h=null,i=0;i<f.length;i++){var j=f[i].audioCapabilities,k=f[i].videoCapabilities;if(j&&0!==j.length){g=[];for(var l=0;l<j.length;l++)window[d.MediaKeys].isTypeSupported(e,j[l].contentType)&&g.push(j[l])}if(k&&0!==k.length){h=[];for(var m=0;m<k.length;m++)window[d.MediaKeys].isTypeSupported(e,k[m].contentType)&&h.push(k[m])}if(!(!g&&!h||g&&0===g.length||h&&0===h.length)){b=!0;var n=new MediaPlayer.vo.protection.KeySystemConfiguration(g,h),o=this.protectionExt.getKeySystemBySystemString(e),p=new MediaPlayer.vo.protection.KeySystemAccess(o,n);this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,p);break}}b||this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE,null,"Key system access denied! -- No valid audio/video content configurations detected!")},selectKeySystem:function(e){try{b=e.mediaKeys=new window[d.MediaKeys](e.keySystem.systemString),this.keySystem=e.keySystem,c=e,a&&h.call(this),this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED)}catch(f){this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED,null,"Error selecting keys system ("+this.keySystem.systemString+")! Could not create MediaKeys -- TODO")}},setMediaElement:function(c){a&&a.removeEventListener(d.needkey,g),a=c,a.addEventListener(d.needkey,g),b&&h.call(this)},createKeySession:function(a){if(!this.keySystem||!b||!c)throw new Error("Can not create sessions until you have selected a key system");for(var f=0;f<e.length;f++)if(this.protectionExt.initDataEquals(a,e[f].initData))return;var g=c.ksConfiguration.videoCapabilities[0].contentType,h=b.createSession(g,new Uint8Array(a)),j=i.call(this,h,a);h.addEventListener(d.error,j),h.addEventListener(d.message,j),h.addEventListener(d.ready,j),h.addEventListener(d.close,j),e.push(j),this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED,j)},updateKeySession:function(a,b){var c=a.session;c.update(this.protectionExt.isClearKey(this.keySystem)?new Uint8Array(b.toJWK()):b)},closeKeySession:function(a){var b=a.session;b.removeEventListener(d.error,a),b.removeEventListener(d.message,a),b.removeEventListener(d.ready,a),b.removeEventListener(d.close,a);for(var c=0;c<e.length;c++)if(e[c]===a){e.splice(c,1);break}b[d.release]()},setServerCertificate:function(){},loadKeySession:function(){},removeKeySession:function(){}}},MediaPlayer.models.ProtectionModel_3Feb2014.APIs=[{setMediaKeys:"setMediaKeys",MediaKeys:"MediaKeys",release:"close",needkey:"needkey",error:"keyerror",message:"keymessage",ready:"keyadded",close:"keyclose"},{setMediaKeys:"msSetMediaKeys",MediaKeys:"MSMediaKeys",release:"close",needkey:"msneedkey",error:"mskeyerror",message:"mskeymessage",ready:"mskeyadded",close:"mskeyclose"}],MediaPlayer.models.ProtectionModel_3Feb2014.detect=function(a){for(var b=MediaPlayer.models.ProtectionModel_3Feb2014.APIs,c=0;c<b.length;c++){var d=b[c];if("function"==typeof a[d.setMediaKeys]&&"function"==typeof window[d.MediaKeys])return d}return null},MediaPlayer.models.ProtectionModel_3Feb2014.prototype={constructor:MediaPlayer.models.ProtectionModel_3Feb2014},MediaPlayer.models.URIQueryAndFragmentModel=function(){"use strict";var a=new MediaPlayer.vo.URIFragmentData,b=[],c=function(c){function d(a,b,c,d){var e=d[0].split(/[=]/);return d.push({key:e[0],value:e[1]}),d.shift(),d}function e(a,c,d){return c>0&&(j&&0===b.length?b=d[c].split(/[&]/):k&&(g=d[c].split(/[&]/))),d}if(!c)return null;var f,g=[],h=new RegExp(/[?]/),i=new RegExp(/[#]/),j=h.test(c),k=i.test(c);return f=c.split(/[?#]/).map(e),b.length>0&&(b=b.reduce(d,null)),g.length>0&&(g=g.reduce(d,null),g.forEach(function(b){a[b.key]=b.value})),c};return{parseURI:c,getURIFragmentData:function(){return a},getURIQueryData:function(){return b},reset:function(){a=new MediaPlayer.vo.URIFragmentData,b=[]}}},MediaPlayer.models.URIQueryAndFragmentModel.prototype={constructor:MediaPlayer.models.URIQueryAndFragmentModel},MediaPlayer.models.VideoModel=function(){"use strict";var a,b=[],c=function(){return b.length>0},d=function(c){null===c||a.seeking||(this.setPlaybackRate(0),b[c]!==!0&&(b.push(c),b[c]=!0))},e=function(a){if(null!==a){b[a]=!1;var d=b.indexOf(a);-1!==d&&b.splice(d,1),c()===!1&&this.setPlaybackRate(1)}},f=function(a,b){b?d.call(this,a):e.call(this,a)};return{system:void 0,play:function(){a.play()},pause:function(){a.pause()},isPaused:function(){return a.paused},getPlaybackRate:function(){return a.playbackRate},setPlaybackRate:function(b){!a||a.readyState<2||(a.playbackRate=b)},getCurrentTime:function(){return a.currentTime},setCurrentTime:function(b){if(a.currentTime!=b)try{a.currentTime=b}catch(c){0===a.readyState&&c.code===c.INVALID_STATE_ERR&&setTimeout(function(){a.currentTime=b},400)}},setStallState:function(a,b){f.call(this,a,b)},listen:function(b,c){a.addEventListener(b,c,!1)},unlisten:function(b,c){a.removeEventListener(b,c,!1)},getElement:function(){return a},setElement:function(b){a=b},setSource:function(b){a.src=b}}},MediaPlayer.models.VideoModel.prototype={constructor:MediaPlayer.models.VideoModel},MediaPlayer.dependencies.protection.CommonEncryption={findCencContentProtection:function(a){for(var b=null,c=0;c<a.length;++c){var d=a[c];"urn:mpeg:dash:mp4protection:2011"===d.schemeIdUri.toLowerCase()&&"cenc"===d.value.toLowerCase()&&(b=d)}return b},getPSSHData:function(a){return a.slice(32)},getPSSHForKeySystem:function(a,b){var c=MediaPlayer.dependencies.protection.CommonEncryption.parsePSSHList(b);return c.hasOwnProperty(a.uuid.toLowerCase())?c[a.uuid.toLowerCase()]:null},parseInitDataFromContentProtection:function(a){return"pssh"in a?BASE64.decodeArray(a.pssh.__text).buffer:null},parsePSSHList:function(a){if(null===a)return[];for(var b=new DataView(a),c=!1,d={},e=0;!c;){var f,g,h,i,j,k=e;if(e>=b.buffer.byteLength)break;if(f=b.getUint32(e),g=e+f,e+=4,1886614376===b.getUint32(e))if(e+=4,h=b.getUint8(e),0===h||1===h){e+=1,e+=3,i="";var l,m;for(l=0;4>l;l++)m=b.getUint8(e+l).toString(16),i+=1===m.length?"0"+m:m;for(e+=4,i+="-",l=0;2>l;l++)m=b.getUint8(e+l).toString(16),i+=1===m.length?"0"+m:m;for(e+=2,i+="-",l=0;2>l;l++)m=b.getUint8(e+l).toString(16),i+=1===m.length?"0"+m:m;for(e+=2,i+="-",l=0;2>l;l++)m=b.getUint8(e+l).toString(16),i+=1===m.length?"0"+m:m;for(e+=2,i+="-",l=0;6>l;l++)m=b.getUint8(e+l).toString(16),i+=1===m.length?"0"+m:m;e+=6,i=i.toLowerCase(),j=b.getUint32(e),e+=4,d[i]=b.buffer.slice(k,g),e=g}else e=g;else e=g}return d}},MediaPlayer.dependencies.protection.KeySystem={eventList:{ENAME_LICENSE_REQUEST_COMPLETE:"licenseRequestComplete"}},MediaPlayer.dependencies.protection.KeySystem_Access=function(){"use strict"},MediaPlayer.dependencies.protection.KeySystem_Access.prototype={constructor:MediaPlayer.dependencies.protection.KeySystem_Access},MediaPlayer.dependencies.protection.KeySystem_ClearKey=function(){"use strict";var a="org.w3.clearkey",b="1077efec-c0b2-4d02-ace3-3c1e52e2fb4b";return{system:void 0,schemeIdURI:"urn:uuid:"+b,systemString:a,uuid:b,getInitData:MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection,getRequestHeadersFromMessage:function(){return null},getLicenseRequestFromMessage:function(a){return new Uint8Array(a)}}},MediaPlayer.dependencies.protection.KeySystem_ClearKey.prototype={constructor:MediaPlayer.dependencies.protection.KeySystem_ClearKey},MediaPlayer.dependencies.protection.KeySystem_PlayReady=function(){"use strict";var a="com.microsoft.playready",b="9a04f079-9840-4286-ab92-e65be0885f95",c=function(a){var b,c,d={},e=new DOMParser;b=String.fromCharCode.apply(null,new Uint16Array(a.buffer)),c=e.parseFromString(b,"application/xml");for(var f=c.getElementsByTagName("name"),g=c.getElementsByTagName("value"),h=0;h<f.length;h++)d[f[h].childNodes[0].nodeValue]=g[h].childNodes[0].nodeValue;return d},d=function(a){var b,c,d=new DOMParser,e=null;if(b=String.fromCharCode.apply(null,new Uint16Array(a.buffer)),c=d.parseFromString(b,"application/xml"),c.getElementsByTagName("Challenge")[0]){var f=c.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue;f&&(e=BASE64.decode(f))}return e},e=function(a){var b,c,d,e,f,g=0,h=new Uint8Array([112,115,115,104,0,0,0,0]),i=new Uint8Array([154,4,240,121,152,64,66,134,171,146,230,91,224,136,95,149]),j=null;if("pssh"in a)return MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection(a);if("pro"in a)j=BASE64.decodeArray(a.pro.__text);else{if(!("prheader"in a))return null;j=BASE64.decodeArray(a.prheader.__text)}return b=j.length,c=4+h.length+i.length+4+b,d=new ArrayBuffer(c),e=new Uint8Array(d),f=new DataView(d),f.setUint32(g,c),g+=4,e.set(h,g),g+=h.length,e.set(i,g),g+=i.length,f.setUint32(g,b),g+=4,e.set(j,g),g+=b,e.buffer};return{schemeIdURI:"urn:uuid:"+b,systemString:a,uuid:b,getInitData:e,getRequestHeadersFromMessage:c,getLicenseRequestFromMessage:d}},MediaPlayer.dependencies.protection.KeySystem_PlayReady.prototype={constructor:MediaPlayer.dependencies.protection.KeySystem_PlayReady},MediaPlayer.dependencies.protection.KeySystem_Widevine=function(){"use strict";var a="com.widevine.alpha",b="edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";return{schemeIdURI:"urn:uuid:"+b,systemString:a,uuid:b,getInitData:MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection,getRequestHeadersFromMessage:function(){return null},getLicenseRequestFromMessage:function(a){return new Uint8Array(a)}}},MediaPlayer.dependencies.protection.KeySystem_Widevine.prototype={constructor:MediaPlayer.dependencies.protection.KeySystem_Widevine},MediaPlayer.dependencies.protection.servers.ClearKey=function(){"use strict";return{getServerURLFromMessage:function(a,b){var c=JSON.parse(String.fromCharCode.apply(null,new Uint8Array(b)));a+="/?";for(var d=0;d<c.kids.length;d++)a+=c.kids[d]+"&";return a=a.substring(0,a.length-1)},getHTTPMethod:function(){return"GET"},getResponseType:function(){return"json"},getLicenseMessage:function(a){if(!a.hasOwnProperty("keys"))return null;var b,c=[];for(b=0;b<a.keys.length;b++){var d=a.keys[b],e=d.kid.replace(/=/g,""),f=d.k.replace(/=/g,"");c.push(new MediaPlayer.vo.protection.KeyPair(e,f))}return new MediaPlayer.vo.protection.ClearKeyKeySet(c)},getErrorResponse:function(a){return String.fromCharCode.apply(null,new Uint8Array(a))},getClearKeysFromProtectionData:function(a,b){var c=null;if(a){for(var d=JSON.parse(String.fromCharCode.apply(null,new Uint8Array(b))),e=[],f=0;f<d.kids.length;f++){var g=d.kids[f],h=a.clearkeys.hasOwnProperty(g)?a.clearkeys[g]:null;if(!h)throw new Error("DRM: ClearKey keyID ("+g+") is not known!");e.push(new MediaPlayer.vo.protection.KeyPair(g,h))}c=new MediaPlayer.vo.protection.ClearKeyKeySet(e)}return c}}},MediaPlayer.dependencies.protection.servers.ClearKey.prototype={constructor:MediaPlayer.dependencies.protection.servers.ClearKey},MediaPlayer.dependencies.protection.servers.DRMToday=function(){"use strict";var a={"com.widevine.alpha":{responseType:"json",getLicenseMessage:function(a){return new Uint8Array(BASE64.decodeArray(a.license))},getErrorResponse:function(a){return a}},"com.microsoft.playready":{responseType:"arraybuffer",getLicenseMessage:function(a){return new Uint8Array(a)},getErrorResponse:function(a){return String.fromCharCode.apply(null,new Uint8Array(a))}}};return{getServerURLFromMessage:function(a){return a},getHTTPMethod:function(){return"POST"},getResponseType:function(b){return a[b].responseType},getLicenseMessage:function(b,c){return a[c].getLicenseMessage(b)},getErrorResponse:function(b,c){return a[c].getErrorResponse(b)}}},MediaPlayer.dependencies.protection.servers.DRMToday.prototype={constructor:MediaPlayer.dependencies.protection.servers.DRMToday},MediaPlayer.dependencies.protection.servers.PlayReady=function(){"use strict";return{getServerURLFromMessage:function(a){return a},getHTTPMethod:function(){return"POST"},getResponseType:function(){return"arraybuffer"},getLicenseMessage:function(a){return new Uint8Array(a)},getErrorResponse:function(a){return String.fromCharCode.apply(null,new Uint8Array(a))}}},MediaPlayer.dependencies.protection.servers.PlayReady.prototype={constructor:MediaPlayer.dependencies.protection.servers.PlayReady},MediaPlayer.dependencies.protection.servers.Widevine=function(){"use strict";return{getServerURLFromMessage:function(a){return a},getHTTPMethod:function(){return"POST"},getResponseType:function(){return"arraybuffer"},getLicenseMessage:function(a){return new Uint8Array(a)},getErrorResponse:function(a){return String.fromCharCode.apply(null,new Uint8Array(a))}}},MediaPlayer.dependencies.protection.servers.Widevine.prototype={constructor:MediaPlayer.dependencies.protection.servers.Widevine},MediaPlayer.rules.ABRRulesCollection=function(){"use strict";var a=[],b=[];return{insufficientBufferRule:void 0,bufferOccupancyRule:void 0,throughputRule:void 0,abandonRequestRule:void 0,getRules:function(c){switch(c){case MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES:return a;case MediaPlayer.rules.ABRRulesCollection.prototype.ABANDON_FRAGMENT_RULES:return b;default:return null}},setup:function(){a.push(this.insufficientBufferRule),a.push(this.throughputRule),a.push(this.bufferOccupancyRule),b.push(this.abandonRequestRule)}}},MediaPlayer.rules.ABRRulesCollection.prototype={constructor:MediaPlayer.rules.ABRRulesCollection,QUALITY_SWITCH_RULES:"qualitySwitchRules",ABANDON_FRAGMENT_RULES:"abandonFragmentRules"},MediaPlayer.rules.AbandonRequestsRule=function(){"use strict";var a=500,b=1.5,c={},d={},e=function(a,b){c[a]=c[a]||{},c[a][b]=c[a][b]||{}};return{metricsExt:void 0,log:void 0,execute:function(f,g){var h,i=(new Date).getTime(),j=f.getMediaInfo(),k=j.type,l=f.getCurrentValue(),m=f.getTrackInfo(),n=l.data.request,o=f.getStreamProcessor().getABRController(),p=new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,MediaPlayer.rules.SwitchRequest.prototype.WEAK);if(!isNaN(n.index)){if(e(k,n.index),h=c[k][n.index],null===h||null===n.firstByteDate||d.hasOwnProperty(h.id))return void g(p);if(void 0===h.firstByteTime&&(h.firstByteTime=n.firstByteDate.getTime(),h.segmentDuration=n.duration,h.bytesTotal=n.bytesTotal,h.id=n.index),h.bytesLoaded=n.bytesLoaded,h.elapsedTime=i-h.firstByteTime,h.bytesLoaded<h.bytesTotal&&h.elapsedTime>=a){if(h.measuredBandwidthInKbps=Math.round(8*h.bytesLoaded/h.elapsedTime),h.estimatedTimeOfDownload=(8*h.bytesTotal*.001/h.measuredBandwidthInKbps).toFixed(2),h.estimatedTimeOfDownload<h.segmentDuration*b||0===m.quality)return void g(p);if(!d.hasOwnProperty(h.id)){var q=o.getQualityForBitrate(j,h.measuredBandwidthInKbps*MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY);p=new MediaPlayer.rules.SwitchRequest(q,MediaPlayer.rules.SwitchRequest.prototype.STRONG),d[h.id]=h,this.log("AbandonRequestsRule ( ",k,"frag id",h.id,") is asking to abandon and switch to quality to ",q," measured bandwidth was",h.measuredBandwidthInKbps),delete c[k][h.id]}}else h.bytesLoaded===h.bytesTotal&&delete c[k][h.id]}g(p)},reset:function(){c={},d={}}}},MediaPlayer.rules.AbandonRequestsRule.prototype={constructor:MediaPlayer.rules.AbandonRequestsRule},MediaPlayer.rules.BufferOccupancyRule=function(){"use strict";var a=0;return{log:void 0,metricsModel:void 0,execute:function(b,c){var d=this,e=(new Date).getTime()/1e3,f=b.getMediaInfo(),g=b.getTrackInfo(),h=f.type,i=isNaN(g.fragmentDuration)?2:g.fragmentDuration/2,j=b.getCurrentValue(),k=b.getStreamProcessor(),l=k.getABRController(),m=this.metricsModel.getReadOnlyMetricsFor(h),n=m.BufferLevel.length>0?m.BufferLevel[m.BufferLevel.length-1]:null,o=m.BufferState.length>0?m.BufferState[m.BufferState.length-1]:null,p=!1,q=f.trackCount-1,r=new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,MediaPlayer.rules.SwitchRequest.prototype.WEAK);return i>e-a||l.getAbandonmentStateFor(h)===MediaPlayer.dependencies.AbrController.ABANDON_LOAD?void c(r):(null!==n&&null!==o&&n.level>o.target&&(p=n.level-o.target>MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD,p&&f.trackCount>1&&(r=new MediaPlayer.rules.SwitchRequest(q,MediaPlayer.rules.SwitchRequest.prototype.STRONG))),r.value!==MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE&&r.value!==j&&d.log("BufferOccupancyRule requesting switch to index: ",r.value,"type: ",h," Priority: ",r.priority===MediaPlayer.rules.SwitchRequest.prototype.DEFAULT?"Default":r.priority===MediaPlayer.rules.SwitchRequest.prototype.STRONG?"Strong":"Weak"),void c(r))},reset:function(){a=0}}},MediaPlayer.rules.BufferOccupancyRule.prototype={constructor:MediaPlayer.rules.BufferOccupancyRule},MediaPlayer.rules.InsufficientBufferRule=function(){"use strict";var a={},b=0,c=1e3,d=function(b,c){a[b]=a[b]||{},a[b].state=c,c!==MediaPlayer.dependencies.BufferController.BUFFER_LOADED||a[b].firstBufferLoadedEvent||(a[b].firstBufferLoadedEvent=!0)},e=function(){a={}};return{log:void 0,metricsModel:void 0,playbackController:void 0,setup:function(){this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING]=e},execute:function(e,f){var g=this,h=(new Date).getTime(),i=e.getMediaInfo().type,j=e.getCurrentValue(),k=g.metricsModel.getReadOnlyMetricsFor(i),l=k.BufferState.length>0?k.BufferState[k.BufferState.length-1]:null,m=new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,MediaPlayer.rules.SwitchRequest.prototype.WEAK);return c>h-b||null===l?void f(m):(d(i,l.state),l.state===MediaPlayer.dependencies.BufferController.BUFFER_EMPTY&&void 0!==a[i].firstBufferLoadedEvent&&(m=new MediaPlayer.rules.SwitchRequest(0,MediaPlayer.rules.SwitchRequest.prototype.STRONG)),m.value!==MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE&&m.value!==j&&g.log("InsufficientBufferRule requesting switch to index: ",m.value,"type: ",i," Priority: ",m.priority===MediaPlayer.rules.SwitchRequest.prototype.DEFAULT?"Default":m.priority===MediaPlayer.rules.SwitchRequest.prototype.STRONG?"Strong":"Weak"),b=h,void f(m))},reset:function(){a={},b=0}}},MediaPlayer.rules.InsufficientBufferRule.prototype={constructor:MediaPlayer.rules.InsufficientBufferRule},MediaPlayer.rules.ThroughputRule=function(){"use strict";var a=[],b=0,c=2,d=3,e=function(b,c){a[b]=a[b]||[],c!==1/0&&c!==a[b][a[b].length-1]&&a[b].push(c)},f=function(b,e){var f=0,g=e?c:d,h=a[b],i=h.length;if(g=g>i?i:g,i>0){for(var j=i-g,k=0,l=j;i>l;l++)k+=h[l];f=k/g}return h.length>g&&h.shift(),f*MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY};return{log:void 0,metricsExt:void 0,metricsModel:void 0,manifestExt:void 0,manifestModel:void 0,execute:function(a,c){var d,g,h,i=this,j=(new Date).getTime()/1e3,k=a.getMediaInfo(),l=k.type,m=a.getCurrentValue(),n=a.getTrackInfo(),o=i.metricsModel.getReadOnlyMetricsFor(l),p=a.getStreamProcessor(),q=p.getABRController(),r=p.isDynamic(),s=i.metricsExt.getCurrentHttpRequest(o),t=isNaN(n.fragmentDuration)?2:n.fragmentDuration/2,u=o.BufferState.length>0?o.BufferState[o.BufferState.length-1]:null,v=o.BufferLevel.length>0?o.BufferLevel[o.BufferLevel.length-1]:null,w=new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,MediaPlayer.rules.SwitchRequest.prototype.WEAK);if(t>j-b||!o||null===s||s.type!==MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE||null===u||null===v)return void c(w);if(d=(s.tfinish.getTime()-s.tresponse.getTime())/1e3,h=Math.round(8*s.trace[s.trace.length-1].b/d),e(l,h),g=Math.round(f(l,r)),q.getAbandonmentStateFor(l)!==MediaPlayer.dependencies.AbrController.ABANDON_LOAD){if(u.state===MediaPlayer.dependencies.BufferController.BUFFER_LOADED&&(v.level>=2*MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD||r)){var x=q.getQualityForBitrate(k,g/1e3);w=new MediaPlayer.rules.SwitchRequest(x,MediaPlayer.rules.SwitchRequest.prototype.DEFAULT)}w.value!==MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE&&w.value!==m&&i.log("ThroughputRule requesting switch to index: ",w.value,"type: ",l," Priority: ",w.priority===MediaPlayer.rules.SwitchRequest.prototype.DEFAULT?"Default":w.priority===MediaPlayer.rules.SwitchRequest.prototype.STRONG?"Strong":"Weak","Average throughput",Math.round(g/1024),"kbps")}c(w)},reset:function(){a=[],b=0}}},MediaPlayer.rules.ThroughputRule.prototype={constructor:MediaPlayer.rules.ThroughputRule},MediaPlayer.rules.RulesContext=function(a,b){"use strict";var c=a.getCurrentTrack(),d=a;return{getStreamInfo:function(){return c.mediaInfo.streamInfo},getMediaInfo:function(){return c.mediaInfo},getTrackInfo:function(){return c},getCurrentValue:function(){return b},getManifestInfo:function(){return c.mediaInfo.streamInfo.manifestInfo},getStreamProcessor:function(){return d}}},MediaPlayer.rules.RulesContext.prototype={constructor:MediaPlayer.rules.RulesContext},MediaPlayer.rules.RulesController=function(){"use strict";var a={},b=["execute"],c=function(a){return a===this.SCHEDULING_RULE||a===this.ABR_RULE},d=function(a){var c=b.length,d=0;for(d;c>d;d+=1)if(!a.hasOwnProperty(b[d]))return!1;return!0},e=function(a,b){return new MediaPlayer.rules.RulesContext(a,b)},f=function(a){var b=a.execute.bind(a);return a.execute=function(c,d){var e=function(b){d.call(a,new MediaPlayer.rules.SwitchRequest(b.value,b.priority))};b(c,e)},"function"!=typeof a.reset&&(a.reset=function(){}),a},g=function(a,b,c){var e,g,h,i,j,k;for(g in b)if(i=b[g],j=i.length)for(k=0;j>k;k+=1)e=i[k],d.call(this,e)&&(e=f.call(this,e),h=a.getRules(g),c&&(c=!1,h.length=0),this.system.injectInto(e),h.push(e))};return{system:void 0,log:void 0,SCHEDULING_RULE:0,ABR_RULE:1,SYNC_RULE:2,initialize:function(){a[this.ABR_RULE]=this.system.getObject("abrRulesCollection"),a[this.SCHEDULING_RULE]=this.system.getObject("scheduleRulesCollection"),a[this.SYNC_RULE]=this.system.getObject("synchronizationRulesCollection")},setRules:function(b,d){c.call(this,b)&&d&&g.call(this,a[b],d,!0)},addRules:function(b,d){c.call(this,b)&&d&&g.call(this,a[b],d,!1)},applyRules:function(a,b,c,f,g){var h,i,j=a.length,k=j,l={},m=e.call(this,b,f),n=function(a){var b,d;a.value!==MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE&&(l[a.priority]=g(l[a.priority],a.value)),--j||(l[MediaPlayer.rules.SwitchRequest.prototype.WEAK]!==MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE&&(d=MediaPlayer.rules.SwitchRequest.prototype.WEAK,b=l[MediaPlayer.rules.SwitchRequest.prototype.WEAK]),l[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT]!==MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE&&(d=MediaPlayer.rules.SwitchRequest.prototype.DEFAULT,b=l[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT]),l[MediaPlayer.rules.SwitchRequest.prototype.STRONG]!==MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE&&(d=MediaPlayer.rules.SwitchRequest.prototype.STRONG,b=l[MediaPlayer.rules.SwitchRequest.prototype.STRONG]),d!=MediaPlayer.rules.SwitchRequest.prototype.STRONG&&d!=MediaPlayer.rules.SwitchRequest.prototype.WEAK&&(d=MediaPlayer.rules.SwitchRequest.prototype.DEFAULT),c({value:void 0!==b?b:f,confidence:d}))};for(l[MediaPlayer.rules.SwitchRequest.prototype.STRONG]=MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,l[MediaPlayer.rules.SwitchRequest.prototype.WEAK]=MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,l[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT]=MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,i=0;k>i;i+=1)h=a[i],d.call(this,h)?h.execute(m,n):j--},reset:function(){var b,c,d=a[this.ABR_RULE],e=a[this.SCHEDULING_RULE],f=a[this.SYNC_RULE],g=(d.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES)||[]).concat(e.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES)||[]).concat(e.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES)||[]).concat(e.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES)||[]).concat(f.getRules(MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES)||[]).concat(f.getRules(MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES)||[]),h=g.length;for(c=0;h>c;c+=1)b=g[c],"function"==typeof b.reset&&b.reset();a={}}}},MediaPlayer.rules.RulesController.prototype={constructor:MediaPlayer.rules.RulesController},MediaPlayer.rules.BufferLevelRule=function(){"use strict";var a={},b={},c={},d=function(a){var b=this.metricsExt.getCurrentHttpRequest(a);return null!==b?(b.tresponse.getTime()-b.trequest.getTime())/1e3:0},e=function(a,b,c){var d;return d=c?this.playbackController.getLiveDelay():isNaN(b)||MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME<b&&b>a?Math.max(MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME,a):a>=b?Math.min(b,MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME):Math.min(b,a)},f=function(a,b,c){var f=this,g=c.bufferController.getCriticalBufferLevel(),h=f.metricsModel.getReadOnlyMetricsFor("video"),i=f.metricsModel.getReadOnlyMetricsFor("audio"),j=e.call(this,c.bufferController.getMinBufferTime(),b,a),k=j,l=c.bufferController.bufferMax,m=0;return l===MediaPlayer.dependencies.BufferController.BUFFER_SIZE_MIN?m=j:l===MediaPlayer.dependencies.BufferController.BUFFER_SIZE_INFINITY?m=b:l===MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED&&(!a&&f.abrController.isPlayingAtTopQuality(c.streamProcessor.getStreamInfo())&&(k=MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY),m=k+Math.max(d.call(f,h),d.call(f,i))),m=Math.min(m,g)},g=function(a,c){return b[a]&&b[a][c]},h=function(b,c){return a[b]&&a[b][c]},i=function(a){var c=a.data.fragmentModel.getContext().streamProcessor.getStreamInfo().id;b[c]=b[c]||{},b[c][a.data.request.mediaType]=!0},j=function(b){var c=b.sender.streamProcessor.getStreamInfo().id;a[c]=a[c]||{},a[c][b.sender.streamProcessor.getType()]=!0},k=function(b){var c=b.sender.streamProcessor.getStreamInfo().id;a[c]=a[c]||{},a[c][b.sender.streamProcessor.getType()]=!1};return{metricsExt:void 0,metricsModel:void 0,abrController:void 0,playbackController:void 0,setup:function(){this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN]=j,this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED]=k,this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED]=i},setScheduleController:function(a){var b=a.streamProcessor.getStreamInfo().id;c[b]=c[b]||{},c[b][a.streamProcessor.getType()]=a},execute:function(a,b){var d=a.getStreamInfo(),e=d.id,i=a.getMediaInfo().type;if(h(e,i))return void b(new MediaPlayer.rules.SwitchRequest(0,MediaPlayer.rules.SwitchRequest.prototype.STRONG));

var j,k=this.metricsModel.getReadOnlyMetricsFor(i),l=this.metricsExt.getCurrentBufferLevel(k)?this.metricsExt.getCurrentBufferLevel(k).level:0,m=c[e][i],n=m.streamProcessor.getCurrentTrack(),o=m.streamProcessor.isDynamic(),p=this.metricsExt.getCurrentPlaybackRate(k),q=d.manifestInfo.duration,r=l/Math.max(p,1),s=n.fragmentDuration,t=this.playbackController.getTime(),u=o?Number.POSITIVE_INFINITY:q-t,v=Math.min(f.call(this,o,q,m),u),w=Math.max(v-r,0);j=Math.ceil(w/s),r>=u&&!g(e,i)&&(j=j||1),b(new MediaPlayer.rules.SwitchRequest(j,MediaPlayer.rules.SwitchRequest.prototype.DEFAULT))},reset:function(){a={},b={},c={}}}},MediaPlayer.rules.BufferLevelRule.prototype={constructor:MediaPlayer.rules.BufferLevelRule},MediaPlayer.rules.PendingRequestsRule=function(){"use strict";var a=3,b={};return{metricsExt:void 0,setScheduleController:function(a){var c=a.streamProcessor.getStreamInfo().id;b[c]=b[c]||{},b[c][a.streamProcessor.getType()]=a},execute:function(c,d){var e=c.getMediaInfo().type,f=c.getStreamInfo().id,g=c.getCurrentValue(),h=b[f][e],i=h.getFragmentModel(),j=i.getRequests({state:[MediaPlayer.dependencies.FragmentModel.states.PENDING,MediaPlayer.dependencies.FragmentModel.states.LOADING]}),k=i.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.REJECTED}),l=k.length,m=j.length,n=Math.max(g-m,0);return l>0?void d(new MediaPlayer.rules.SwitchRequest(l,MediaPlayer.rules.SwitchRequest.prototype.DEFAULT)):m>a?void d(new MediaPlayer.rules.SwitchRequest(0,MediaPlayer.rules.SwitchRequest.prototype.DEFAULT)):0===g?void d(new MediaPlayer.rules.SwitchRequest(n,MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE)):void d(new MediaPlayer.rules.SwitchRequest(n,MediaPlayer.rules.SwitchRequest.prototype.DEFAULT))},reset:function(){b={}}}},MediaPlayer.rules.PendingRequestsRule.prototype={constructor:MediaPlayer.rules.PendingRequestsRule},MediaPlayer.rules.PlaybackTimeRule=function(){"use strict";var a={},b={},c=function(b){setTimeout(function(){var c=b.data.seekTime;a.audio=c,a.video=c,a.fragmentedText=c},0)};return{adapter:void 0,sourceBufferExt:void 0,playbackController:void 0,setup:function(){this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING]=c},setScheduleController:function(a){var c=a.streamProcessor.getStreamInfo().id;b[c]=b[c]||{},b[c][a.streamProcessor.getType()]=a},execute:function(c,d){var e,f,g=c.getMediaInfo().type,h=c.getStreamInfo().id,i=b[h][g],j=.1,k=b[h][g].streamProcessor,l=k.getCurrentTrack(),m=a?a[g]:null,n=void 0!==m&&null!==m,o=n?MediaPlayer.rules.SwitchRequest.prototype.STRONG:MediaPlayer.rules.SwitchRequest.prototype.DEFAULT,p=i.getFragmentModel().getRequests({state:MediaPlayer.dependencies.FragmentModel.states.REJECTED})[0],q=!!p&&!n,r=this.adapter.getIndexHandlerTime(k),s=this.playbackController.getTime(),t=p?p.startTime+p.duration:null,u=!n&&p&&(t>s&&p.startTime<=r||isNaN(r)),v=k.bufferController.getBuffer(),w=null;if(e=n?m:u?p.startTime:r,p&&i.getFragmentModel().removeRejectedRequest(p),isNaN(e))return void d(new MediaPlayer.rules.SwitchRequest(null,o));for(n&&(a[g]=null),v&&(w=this.sourceBufferExt.getBufferRange(k.bufferController.getBuffer(),e),null!==w&&(e=w.end)),f=this.adapter.getFragmentRequestForTime(k,l,e,{keepIdx:q}),u&&f&&f.index!==p.index&&(f=this.adapter.getFragmentRequestForTime(k,l,p.startTime+p.duration/2+j,{keepIdx:q,timeThreshold:0}));f&&k.getFragmentModel().isFragmentLoadedOrPending(f);){if("complete"===f.action){f=null,this.adapter.setIndexHandlerTime(k,0/0);break}f=this.adapter.getNextFragmentRequest(k,l)}f&&!u&&this.adapter.setIndexHandlerTime(k,f.startTime+f.duration),d(new MediaPlayer.rules.SwitchRequest(f,o))},reset:function(){a={},b={}}}},MediaPlayer.rules.PlaybackTimeRule.prototype={constructor:MediaPlayer.rules.PlaybackTimeRule},MediaPlayer.rules.SameTimeRequestRule=function(){"use strict";var a={},b=function(a,b){var c,e,f,g,h,i=0,j=a.length;for(i;j>i;i+=1)for(f=a[i].getRequests({state:MediaPlayer.dependencies.FragmentModel.states.PENDING}),d.call(this,f,"index"),g=0,h=f.length;h>g;g++){if(c=f[g],isNaN(c.startTime)&&"complete"!==c.action){e=c;break}c.startTime>b&&(!e||c.startTime<e.startTime)&&(e=c)}return e||c},c=function(a,b){var c,d,e=a.length,f=null;for(d=0;e>d;d+=1)c=a[d].getRequests({state:MediaPlayer.dependencies.FragmentModel.states.PENDING,time:b})[0],c&&(!f||c.startTime>f.startTime)&&(f=c);return f},d=function(a,b){var c=function(a,c){return a[b]<c[b]||isNaN(a[b])&&"complete"!==a.action?-1:a[b]>c[b]?1:0};a.sort(c)},e=function(b,c){return a[b]&&a[b][c]?a[b][c]:0/0},f=function(b){var c=b.data.fragmentModel,d=b.data.request,e=c.getContext().streamProcessor.getStreamInfo().id,f=d.mediaType;a[e]=a[e]||{},a[e][f]=d.index-1};return{playbackController:void 0,setup:function(){this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED]=f},setFragmentModels:function(a,b){this.fragmentModels=this.fragmentModels||{},this.fragmentModels[b]=a},execute:function(a,d){var f,g,h,i,j,k,l,m,n,o=a.getStreamInfo().id,p=a.getCurrentValue(),q=MediaPlayer.rules.SwitchRequest.prototype.DEFAULT,r=this.fragmentModels[o],s=new Date,t=null,u=r?r.length:null,v=!1,w=[];if(!r||!u)return void d(new MediaPlayer.rules.SwitchRequest([],q));if(k=this.playbackController.getTime(),l=c(r,k),j=l||b(r,k)||p,!j)return void d(new MediaPlayer.rules.SwitchRequest([],q));for(i=0;u>i;i+=1)if(g=r[i],f=g.getContext().streamProcessor.getType(),("video"===f||"audio"===f||"fragmentedText"===f)&&(m=g.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.PENDING}),n=g.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.LOADING}).length,!g.getIsPostponed()||isNaN(j.startTime))){if(n>MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD)return void d(new MediaPlayer.rules.SwitchRequest([],q));if(t=t||(j===l?k:j.startTime),-1===m.indexOf(j)){if(h=g.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.PENDING,time:t})[0],h||0!==j.index||(h=m.filter(function(a){return a.index===j.index})[0]),h)w.push(h);else if(h=g.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.LOADING,time:t})[0]||g.getRequests({state:MediaPlayer.dependencies.FragmentModel.states.EXECUTED,time:t})[0],!h&&j.index!==e.call(this,o,j.mediaType)){v=!0;break}}else w.push(j)}return w=w.filter(function(a){return"complete"===a.action||s.getTime()>=a.availabilityStartTime.getTime()}),v?void d(new MediaPlayer.rules.SwitchRequest([],q)):void d(new MediaPlayer.rules.SwitchRequest(w,q))},reset:function(){a={}}}},MediaPlayer.rules.SameTimeRequestRule.prototype={constructor:MediaPlayer.rules.SameTimeRequestRule},MediaPlayer.rules.ScheduleRulesCollection=function(){"use strict";var a=[],b=[],c=[];return{bufferLevelRule:void 0,pendingRequestsRule:void 0,playbackTimeRule:void 0,sameTimeRequestRule:void 0,getRules:function(d){switch(d){case MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES:return a;case MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES:return c;case MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES:return b;default:return null}},setup:function(){a.push(this.bufferLevelRule),a.push(this.pendingRequestsRule),c.push(this.playbackTimeRule),b.push(this.sameTimeRequestRule)}}},MediaPlayer.rules.ScheduleRulesCollection.prototype={constructor:MediaPlayer.rules.ScheduleRulesCollection,FRAGMENTS_TO_SCHEDULE_RULES:"fragmentsToScheduleRules",NEXT_FRAGMENT_RULES:"nextFragmentRules",FRAGMENTS_TO_EXECUTE_RULES:"fragmentsToExecuteRules"},MediaPlayer.rules.SwitchRequest=function(a,b){"use strict";this.value=a,this.priority=b,void 0===this.value&&(this.value=999),void 0===this.priority&&(this.priority=.5)},MediaPlayer.rules.SwitchRequest.prototype={constructor:MediaPlayer.rules.SwitchRequest,NO_CHANGE:999,DEFAULT:.5,STRONG:1,WEAK:0},MediaPlayer.rules.LiveEdgeBinarySearchRule=function(){"use strict";var a,b,c,d=43200,e=0/0,f=null,g=0/0,h=null,i=!1,j=0/0,k=MediaPlayer.rules.SwitchRequest.prototype.DEFAULT,l=function(a,d,e,f){var g,i=this;if(null===f)g=i.adapter.generateFragmentRequestForTime(c,h,a),l.call(i,a,d,e,g);else{var j=function(c){b.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED,i,j),c.data.exists?d.call(i,c.data.request,a):e.call(i,c.data.request,a)};b.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED,i,j),b.checkForExistence(f)}},m=function(b,d){var j,p,q;return i?void o.call(this,!1,d):(q=d-e,j=q>0?e-q:e+Math.abs(q)+g,void(j<f.start&&j>f.end?a(new MediaPlayer.rules.SwitchRequest(null,k)):(p=this.adapter.getFragmentRequestForTime(c,h,j,{ignoreIsFinished:!0}),l.call(this,j,n,m,p))))},n=function(b,d){var m,n,p=b.startTime,q=this;if(!i){if(!h.fragmentDuration)return void a(new MediaPlayer.rules.SwitchRequest(p,k));if(i=!0,f.end=p+2*g,d===e)return n=d+j,m=q.adapter.getFragmentRequestForTime(c,h,n,{ignoreIsFinished:!0}),void l.call(q,n,function(){o.call(q,!0,n)},function(){a(new MediaPlayer.rules.SwitchRequest(n,k))},m)}o.call(this,!0,d)},o=function(b,d){var e,g,i;b?f.start=d:f.end=d,e=Math.floor(f.end-f.start)<=j,e?a(new MediaPlayer.rules.SwitchRequest(b?d:d-j,k)):(i=(f.start+f.end)/2,g=this.adapter.getFragmentRequestForTime(c,h,i,{ignoreIsFinished:!0}),l.call(this,i,n,m,g))};return{metricsExt:void 0,adapter:void 0,timelineConverter:void 0,execute:function(i,o){var p,q,r=this;if(a=o,c=i.getStreamProcessor(),b=c.getFragmentLoader(),h=i.getTrackInfo(),j=h.fragmentDuration,q=h.DVRWindow,e=q.end,h.useCalculatedLiveEdgeTime){var s=r.timelineConverter.getExpectedLiveEdge();return r.timelineConverter.setExpectedLiveEdge(e),void a(new MediaPlayer.rules.SwitchRequest(s,k))}f={start:Math.max(0,e-d),end:e+d},g=Math.floor((q.end-q.start)/2),p=r.adapter.getFragmentRequestForTime(c,h,e,{ignoreIsFinished:!0}),l.call(r,e,n,m,p)},reset:function(){e=0/0,f=null,g=0/0,h=null,i=!1,j=0/0,c=null,b=null}}},MediaPlayer.rules.LiveEdgeBinarySearchRule.prototype={constructor:MediaPlayer.rules.LiveEdgeBinarySearchRule},MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule=function(){"use strict";return{timelineConverter:void 0,execute:function(a,b){var c=a.getTrackInfo(),d=c.DVRWindow.end,e=MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;if(c.useCalculatedLiveEdgeTime){var f=this.timelineConverter.getExpectedLiveEdge();this.timelineConverter.setExpectedLiveEdge(d),this.timelineConverter.setTimeSyncCompleted(!1),b(new MediaPlayer.rules.SwitchRequest(f,e))}else b(new MediaPlayer.rules.SwitchRequest(d,e))}}},MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule.prototype={constructor:MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule},MediaPlayer.rules.SynchronizationRulesCollection=function(){"use strict";var a=[],b=[];return{liveEdgeBinarySearchRule:void 0,liveEdgeWithTimeSynchronizationRule:void 0,getRules:function(c){switch(c){case MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES:return a;case MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES:return b;default:return null}},setup:function(){a.push(this.liveEdgeWithTimeSynchronizationRule),b.push(this.liveEdgeBinarySearchRule)}}},MediaPlayer.rules.SynchronizationRulesCollection.prototype={constructor:MediaPlayer.rules.SynchronizationRulesCollection,TIME_SYNCHRONIZED_RULES:"withAccurateTimeSourceRules",BEST_GUESS_RULES:"bestGuestRules"},MediaPlayer.utils.Capabilities=function(){"use strict"},MediaPlayer.utils.Capabilities.prototype={constructor:MediaPlayer.utils.Capabilities,system:void 0,log:void 0,supportsMediaSource:function(){"use strict";var a="WebKitMediaSource"in window,b="MediaSource"in window;return a||b},supportsEncryptedMedia:function(){return this.system.hasMapping("protectionModel")},supportsCodec:function(a,b){"use strict";if(!(a instanceof HTMLMediaElement))throw"element must be of type HTMLMediaElement.";var c=a.canPlayType(b);return"probably"===c||"maybe"===c}},MediaPlayer.utils.CustomTimeRanges=function(){return{customTimeRangeArray:[],length:0,add:function(a,b){var c=0;for(c=0;c<this.customTimeRangeArray.length&&a>this.customTimeRangeArray[c].start;c++);for(this.customTimeRangeArray.splice(c,0,{start:a,end:b}),c=0;c<this.customTimeRangeArray.length-1;c++)this.mergeRanges(c,c+1)&&c--;this.length=this.customTimeRangeArray.length},remove:function(a,b){for(var c=0;c<this.customTimeRangeArray.length;c++)if(a<=this.customTimeRangeArray[c].start&&b>=this.customTimeRangeArray[c].end)this.customTimeRangeArray.splice(c,1),c--;else{if(a>this.customTimeRangeArray[c].start&&b<this.customTimeRangeArray[c].end){this.customTimeRangeArray.splice(c+1,0,{start:b,end:this.customTimeRangeArray[c].end}),this.customTimeRangeArray[c].end=a;break}a>this.customTimeRangeArray[c].start&&a<this.customTimeRangeArray[c].end?this.customTimeRangeArray[c].end=a:b>this.customTimeRangeArray[c].start&&b<this.customTimeRangeArray[c].end&&(this.customTimeRangeArray[c].start=b)}this.length=this.customTimeRangeArray.length},mergeRanges:function(a,b){var c=this.customTimeRangeArray[a],d=this.customTimeRangeArray[b];return c.start<=d.start&&d.start<=c.end&&c.end<=d.end?(c.end=d.end,this.customTimeRangeArray.splice(b,1),!0):d.start<=c.start&&c.start<=d.end&&d.end<=c.end?(c.start=d.start,this.customTimeRangeArray.splice(b,1),!0):d.start<=c.start&&c.start<=d.end&&c.end<=d.end?(this.customTimeRangeArray.splice(a,1),!0):c.start<=d.start&&d.start<=c.end&&d.end<=c.end?(this.customTimeRangeArray.splice(b,1),!0):!1},start:function(a){return this.customTimeRangeArray[a].start},end:function(a){return this.customTimeRangeArray[a].end}}},MediaPlayer.utils.CustomTimeRanges.prototype={constructor:MediaPlayer.utils.CustomTimeRanges},MediaPlayer.utils.DOMStorage=function(){var a=!0,b=function(){["video","audio"].forEach(function(b){if(void 0===this.abrController.getInitialBitrateFor(b)){if(this.isSupported(MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL)&&a){var c=MediaPlayer.utils.DOMStorage["LOCAL_STORAGE_"+b.toUpperCase()+"_BITRATE_KEY"],d=JSON.parse(localStorage.getItem(c))||{},e=(new Date).getTime()-parseInt(d.timestamp)>=MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_BITRATE_EXPIRATION||!1,f=parseInt(d.bitrate);isNaN(f)||e?e&&localStorage.removeItem(c):(this.abrController.setInitialBitrateFor(b,f),this.log("Last bitrate played for "+b+" was "+f))}void 0===this.abrController.getInitialBitrateFor(b)&&this.abrController.setInitialBitrateFor(b,MediaPlayer.dependencies.AbrController["DEFAULT_"+b.toUpperCase()+"_BITRATE"])}},this)};return{system:void 0,log:void 0,abrController:void 0,checkInitialBitrate:b,enableLastBitrateCaching:function(b,c){a=b,void 0===c||isNaN(c)||"number"!=typeof c||(MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_BITRATE_EXPIRATION=c)},isSupported:function(a){return a===MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL?window.localStorage||!1:a===MediaPlayer.utils.DOMStorage.STORAGE_TYPE_SESSION?window.sessionStorage||!1:!1}}},MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_VIDEO_BITRATE_KEY="dashjs_vbitrate",MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_AUDIO_BITRATE_KEY="dashjs_abitrate",MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_BITRATE_EXPIRATION=36e4,MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL="local",MediaPlayer.utils.DOMStorage.STORAGE_TYPE_SESSION="session",MediaPlayer.utils.DOMStorage.prototype={constructor:MediaPlayer.utils.DOMStorage},MediaPlayer.utils.Debug=function(){"use strict";var a,b=!0,c=!1,d=!1,e=(new Date).getTime();return{system:void 0,eventBus:void 0,setup:function(){this.system.mapValue("log",this.log),a=this.eventBus},setLogTimestampVisible:function(a){c=a},showCalleeName:function(a){d=a},setLogToBrowserConsole:function(a){b=a},getLogToBrowserConsole:function(){return b},log:function(){var f="",g=null;c&&(g=(new Date).getTime(),f+="["+(g-e)+"]"),d&&this.getName&&(f+="["+this.getName()+"]"),this.getMediaType&&this.getMediaType()&&(f+="["+this.getMediaType()+"]"),f.length>0&&(f+=" "),Array.apply(null,arguments).forEach(function(a){f+=a+" "}),b&&console.log(f),a.dispatchEvent({type:"log",message:f})}}},MediaPlayer.utils.EventBus=function(){"use strict";var a,b=function(b,c){var d=(c?"1":"0")+b;return d in a||(a[d]=[]),a[d]},c=function(){a={}};return c(),{addEventListener:function(a,c,d){var e=b(a,d),f=e.indexOf(c);-1===f&&e.push(c)},removeEventListener:function(a,c,d){var e=b(a,d),f=e.indexOf(c);-1!==f&&e.splice(f,1)},dispatchEvent:function(a){for(var c=b(a.type,!1).slice(),d=0;d<c.length;d++)c[d].call(this,a);return!a.defaultPrevented}}},MediaPlayer.utils.VirtualBuffer=function(){var a={},b=function(a,b){var c=function(a,c){return a[b]<c[b]?-1:a[b]>c[b]?1:0};a.sort(c)},c=function(b){var c=b.streamId,d=b.mediaType;return a[c]?a[c][d]:null},d=function(){var a={};return a.audio={buffered:new MediaPlayer.utils.CustomTimeRanges},a.audio[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE]=[],a.audio[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE]=[],a.video={buffered:new MediaPlayer.utils.CustomTimeRanges},a.video[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE]=[],a.video[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE]=[],a.fragmentedText={buffered:new MediaPlayer.utils.CustomTimeRanges},a.fragmentedText[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE]=[],a.fragmentedText[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE]=[],a};return{system:void 0,sourceBufferExt:void 0,notify:void 0,subscribe:void 0,unsubscribe:void 0,append:function(c){var e=c.streamId,f=c.mediaType,g=c.segmentType,h=c.start,i=c.end;a[e]=a[e]||d(),a[e][f][g].push(c),b(a[e][f][g],"index"),isNaN(h)||isNaN(i)||(a[e][f].buffered.add(h,i),this.notify(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED,{chunk:c}))},getChunks:function(a){var b=c.call(this,a),d=a.segmentType,e=a.removeOrigin,f=a.limit||Number.POSITIVE_INFINITY,g=0,h=[];return b?(delete a.streamId,delete a.mediaType,delete a.segmentType,delete a.removeOrigin,delete a.limit,h=b[d].filter(function(c,d,h){if(g>=f)return!1;for(var i in a)if(a.hasOwnProperty(i)&&c[i]!=a[i])return!1;return e&&(b.buffered.remove(c.start,c.end),h.splice(d,1)),g+=1,!0})):h},extract:function(a){return a.removeOrigin=!0,this.getChunks(a)},getTotalBufferLevel:function(b){var c=b.type,d=0;for(var e in a)a.hasOwnProperty(e)&&(d+=this.sourceBufferExt.getTotalBufferedTime(a[e][c]));return d},reset:function(){a={}}}},MediaPlayer.utils.VirtualBuffer.prototype={constructor:MediaPlayer.utils.VirtualBuffer},MediaPlayer.utils.VirtualBuffer.eventList={CHUNK_APPENDED:"chunkAppended"},MediaPlayer.vo.BitrateInfo=function(){"use strict";this.mediaType=null,this.bitrate=null,this.qualityIndex=0/0},MediaPlayer.vo.BitrateInfo.prototype={constructor:MediaPlayer.vo.BitrateInfo},MediaPlayer.vo.DataChunk=function(){"use strict";this.streamId=null,this.mediaType=null,this.segmentType=null,this.quality=0/0,this.index=0/0,this.bytes=null,this.start=0/0,this.end=0/0,this.duration=0/0},MediaPlayer.vo.DataChunk.prototype={constructor:MediaPlayer.vo.DataChunk},MediaPlayer.vo.Error=function(a,b,c){"use strict";this.code=a||null,this.message=b||null,this.data=c||null},MediaPlayer.vo.Error.prototype={constructor:MediaPlayer.vo.Error},MediaPlayer.vo.Event=function(){"use strict";this.type=null,this.sender=null,this.data=null,this.error=null,this.timestamp=0/0},MediaPlayer.vo.Event.prototype={constructor:MediaPlayer.vo.Event},MediaPlayer.vo.FragmentRequest=function(){"use strict";this.action="download",this.startTime=0/0,this.mediaType=null,this.type=null,this.duration=0/0,this.timescale=0/0,this.range=null,this.url=null,this.requestStartDate=null,this.firstByteDate=null,this.requestEndDate=null,this.quality=0/0,this.index=0/0,this.availabilityStartTime=null,this.availabilityEndTime=null,this.wallStartTime=null,this.bytesLoaded=0/0,this.bytesTotal=0/0},MediaPlayer.vo.FragmentRequest.prototype={constructor:MediaPlayer.vo.FragmentRequest,ACTION_DOWNLOAD:"download",ACTION_COMPLETE:"complete"},MediaPlayer.vo.ManifestInfo=function(){"use strict";this.DVRWindowSize=0/0,this.loadedTime=null,this.availableFrom=null,this.minBufferTime=0/0,this.duration=0/0,this.isDynamic=!1,this.maxFragmentDuration=null},MediaPlayer.vo.ManifestInfo.prototype={constructor:MediaPlayer.vo.ManifestInfo},MediaPlayer.vo.MediaInfo=function(){"use strict";this.id=null,this.index=null,this.type=null,this.streamInfo=null,this.trackCount=0,this.lang=null,this.codec=null,this.mimeType=null,this.contentProtection=null,this.isText=!1,this.KID=null,this.bitrateList=null},MediaPlayer.vo.MediaInfo.prototype={constructor:MediaPlayer.vo.MediaInfo},MediaPlayer.models.MetricsList=function(){"use strict";return{TcpList:[],HttpList:[],RepSwitchList:[],BufferLevel:[],BufferState:[],PlayList:[],DroppedFrames:[],SchedulingInfo:[],DVRInfo:[],ManifestUpdate:[]}},MediaPlayer.models.MetricsList.prototype={constructor:MediaPlayer.models.MetricsList},MediaPlayer.vo.StreamInfo=function(){"use strict";this.id=null,this.index=null,this.start=0/0,this.duration=0/0,this.manifestInfo=null,this.isLast=!0},MediaPlayer.vo.StreamInfo.prototype={constructor:MediaPlayer.vo.StreamInfo},MediaPlayer.vo.TrackInfo=function(){"use strict";this.id=null,this.quality=null,this.DVRWindow=null,this.fragmentDuration=null,this.mediaInfo=null,this.MSETimeOffset=null},MediaPlayer.vo.TrackInfo.prototype={constructor:MediaPlayer.vo.TrackInfo},MediaPlayer.vo.URIFragmentData=function(){"use strict";this.t=null,this.xywh=null,this.track=null,this.id=null,this.s=null},MediaPlayer.vo.URIFragmentData.prototype={constructor:MediaPlayer.vo.URIFragmentData},MediaPlayer.vo.metrics.BufferLevel=function(){"use strict";this.t=null,this.level=null},MediaPlayer.vo.metrics.BufferLevel.prototype={constructor:MediaPlayer.vo.metrics.BufferLevel},MediaPlayer.vo.metrics.BufferState=function(){"use strict";this.target=null,this.state=MediaPlayer.dependencies.BufferController.BUFFER_EMPTY},MediaPlayer.vo.metrics.BufferState.prototype={constructor:MediaPlayer.vo.metrics.BufferState},MediaPlayer.vo.metrics.DVRInfo=function(){"use strict";this.time=null,this.range=null,this.manifestInfo=null},MediaPlayer.vo.metrics.DVRInfo.prototype={constructor:MediaPlayer.vo.metrics.DVRInfo},MediaPlayer.vo.metrics.DroppedFrames=function(){"use strict";this.time=null,this.droppedFrames=null},MediaPlayer.vo.metrics.DroppedFrames.prototype={constructor:MediaPlayer.vo.metrics.DroppedFrames},MediaPlayer.vo.metrics.HTTPRequest=function(){"use strict";this.stream=null,this.tcpid=null,this.type=null,this.url=null,this.actualurl=null,this.range=null,this.trequest=null,this.tresponse=null,this.tfinish=null,this.responsecode=null,this.interval=null,this.mediaduration=null,this.responseHeaders=null,this.trace=[]},MediaPlayer.vo.metrics.HTTPRequest.prototype={constructor:MediaPlayer.vo.metrics.HTTPRequest},MediaPlayer.vo.metrics.HTTPRequest.Trace=function(){"use strict";this.s=null,this.d=null,this.b=[]},MediaPlayer.vo.metrics.HTTPRequest.Trace.prototype={constructor:MediaPlayer.vo.metrics.HTTPRequest.Trace},MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE="Media Segment",MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE="Initialization Segment",MediaPlayer.vo.metrics.HTTPRequest.MPD_TYPE="MPD",MediaPlayer.vo.metrics.ManifestUpdate=function(){"use strict";this.mediaType=null,this.type=null,this.requestTime=null,this.fetchTime=null,this.availabilityStartTime=null,this.presentationStartTime=0,this.clientTimeOffset=0,this.currentTime=null,this.buffered=null,this.latency=0,this.streamInfo=[],this.trackInfo=[]},MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo=function(){"use strict";this.id=null,this.index=null,this.start=null,this.duration=null},MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo=function(){"use strict";this.id=null,this.index=null,this.mediaType=null,this.streamIndex=null,this.presentationTimeOffset=null,this.startNumber=null,this.fragmentInfoType=null},MediaPlayer.vo.metrics.ManifestUpdate.prototype={constructor:MediaPlayer.vo.metrics.ManifestUpdate},MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo.prototype={constructor:MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo},MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo.prototype={constructor:MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo},MediaPlayer.vo.metrics.PlayList=function(){"use strict";this.stream=null,this.start=null,this.mstart=null,this.starttype=null,this.trace=[]},MediaPlayer.vo.metrics.PlayList.Trace=function(){"use strict";this.representationid=null,this.subreplevel=null,this.start=null,this.mstart=null,this.duration=null,this.playbackspeed=null,this.stopreason=null},MediaPlayer.vo.metrics.PlayList.prototype={constructor:MediaPlayer.vo.metrics.PlayList},MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON="initial_start",MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON="seek",MediaPlayer.vo.metrics.PlayList.Trace.prototype={constructor:MediaPlayer.vo.metrics.PlayList.Trace()},MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON="user_request",MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON="representation_switch",MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON="end_of_content",MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON="rebuffering",MediaPlayer.vo.metrics.TrackSwitch=function(){"use strict";this.t=null,this.mt=null,this.to=null,this.lto=null},MediaPlayer.vo.metrics.TrackSwitch.prototype={constructor:MediaPlayer.vo.metrics.TrackSwitch},MediaPlayer.vo.metrics.SchedulingInfo=function(){"use strict";this.mediaType=null,this.t=null,this.type=null,this.startTime=null,this.availabilityStartTime=null,this.duration=null,this.quality=null,this.range=null,this.state=null},MediaPlayer.vo.metrics.SchedulingInfo.prototype={constructor:MediaPlayer.vo.metrics.SchedulingInfo},MediaPlayer.vo.metrics.TCPConnection=function(){"use strict";this.tcpid=null,this.dest=null,this.topen=null,this.tclose=null,this.tconnect=null},MediaPlayer.vo.metrics.TCPConnection.prototype={constructor:MediaPlayer.vo.metrics.TCPConnection},MediaPlayer.vo.protection.ClearKeyKeySet=function(a,b){if(b&&"persistent"!==b&&"temporary"!==b)throw new Error("Invalid ClearKey key set type!  Must be one of 'persistent' or 'temporary'");this.keyPairs=a,this.type=b,this.toJWK=function(){var a,b=this.keyPairs.length,c={};for(c.keys=[],a=0;b>a;a++){var d={kty:"oct",alg:"A128KW",kid:this.keyPairs[a].keyID,k:this.keyPairs[a].key};c.keys.push(d)}this.type&&(c.type=this.type);var e=JSON.stringify(c),f=e.length,g=new ArrayBuffer(f),h=new Uint8Array(g);for(a=0;f>a;a++)h[a]=e.charCodeAt(a);return g}},MediaPlayer.vo.protection.ClearKeyKeySet.prototype={constructor:MediaPlayer.vo.protection.ClearKeyKeySet},MediaPlayer.vo.protection.KeyError=function(a,b){"use strict";this.sessionToken=a,this.error=b},MediaPlayer.vo.protection.KeyError.prototype={constructor:MediaPlayer.vo.protection.KeyError},MediaPlayer.vo.protection.KeyMessage=function(a,b,c,d){"use strict";this.sessionToken=a,this.message=b,this.defaultURL=c,this.messageType=d},MediaPlayer.vo.protection.KeyMessage.prototype={constructor:MediaPlayer.vo.protection.KeyMessage},MediaPlayer.vo.protection.KeyPair=function(a,b){"use strict";this.keyID=a,this.key=b},MediaPlayer.vo.protection.KeyPair.prototype={constructor:MediaPlayer.vo.protection.KeyPair},MediaPlayer.vo.protection.KeySystemAccess=function(a,b){this.keySystem=a,this.ksConfiguration=b},MediaPlayer.vo.protection.KeySystemAccess.prototype={constructor:MediaPlayer.vo.protection.KeySystemAccess},MediaPlayer.vo.protection.KeySystemConfiguration=function(a,b,c,d){this.initDataTypes=["cenc"],this.audioCapabilities=a,this.videoCapabilities=b,this.distinctiveIdentifier=c,this.persistentState=d},MediaPlayer.vo.protection.KeySystemConfiguration.prototype={constructor:MediaPlayer.vo.protection.KeySystemConfiguration},MediaPlayer.vo.protection.LicenseRequestComplete=function(a,b){"use strict";this.message=a,this.requestData=b},MediaPlayer.vo.protection.LicenseRequestComplete.prototype={constructor:MediaPlayer.vo.protection.LicenseRequestComplete},MediaPlayer.vo.protection.MediaCapability=function(a,b){this.contentType=a,this.robustness=b},MediaPlayer.vo.protection.MediaCapability.prototype={constructor:MediaPlayer.vo.protection.MediaCapability},MediaPlayer.vo.protection.NeedKey=function(a,b){this.initData=a,this.initDataType=b},MediaPlayer.vo.protection.NeedKey.prototype={constructor:MediaPlayer.vo.protection.NeedKey},MediaPlayer.vo.protection.ProtectionData=function(a,b,c){this.laURL=a,this.httpRequestHeaders=b,this.clearkeys=c},MediaPlayer.vo.protection.ProtectionData.prototype={constructor:MediaPlayer.vo.protection.ProtectionData},MediaPlayer.models.SessionToken=function(){"use strict"},MediaPlayer.models.SessionToken.prototype={initData:null,getSessionID:function(){return""},getExpirationTime:function(){return 0/0},getKeyStatuses:function(){return null}};
},{}],3:[function(_dereq_,module,exports){
var extend = _dereq_("xtend")

module.exports = DeepMerge

function DeepMerge(merger) {
    return deepmerge

    function deepmerge(target, source, key) {
        if (Array.isArray(source) && Array.isArray(target)) {
            return merger(target, source, key)
        } else if (isObject(source) && isObject(target)) {
            var result = extend({}, target)
            Object.keys(source).forEach(merge)
            return result
        } else {
            return merger(target, source, key)
        }

        function merge(key) {
            var sourceValue = source[key]
            var targetValue = target[key]

            if (!(key in target)) {
                if (isObject(sourceValue)) {
                    result[key] = deepmerge({}, sourceValue, key)
                } else {
                    result[key] = sourceValue
                }
            } else {
                result[key] = deepmerge(targetValue, sourceValue, key)
            }
        }
    }
}

function isObject(x) {
    return typeof x === "object" && x !== null
}

},{"xtend":4}],4:[function(_dereq_,module,exports){
module.exports = extend

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i],
            keys = Object.keys(source)

        for (var j = 0; j < keys.length; j++) {
            var name = keys[j]
            target[name] = source[name]
        }
    }

    return target
}
},{}],5:[function(_dereq_,module,exports){

},{}],6:[function(_dereq_,module,exports){
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent	= function(){}
MicroEvent.prototype	= {
	bind	: function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	},
	unbind	: function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin	= function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
	}
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent
}

},{}],7:[function(_dereq_,module,exports){
// main function
var zpad = function (n, m, c) {
  if (!m) m = zpad._amount;
  if (!c) c = zpad._character;
  if (m < 1) m = 1;
  n = "" + n;
  m -= n.length;
  while (m-- > 0) n = c + n;
  return n;
}

// properties
zpad._amount = 2;
zpad._character = '0';

// 'amount' getter/setter
zpad.amount = function (m) {
  if (m) {
    zpad._amount = m;
    return zpad; // return main function for chaining
  } else {
    return zpad._amount;
  }
}

// 'character' getter/setter
zpad.character = function (c) {
  if (c) {
    zpad._character = c;
    return zpad; // return main function for chaining
  } else {
    return zpad._character;
  }
}

module.exports = zpad;
},{}],8:[function(_dereq_,module,exports){
/**
 * @module liveplayer
 */

var MicroEvent = _dereq_('microevent');
var EventEmitter = _dereq_('./util/EventEmitter');
var LivePlayerUtil = _dereq_('./util/LivePlayerUtil');
var Logger = _dereq_('./logging/Logger');

/**
 * Public player API
 *
 * @class LivePlayer
 * @extends EventEmitter
 * @constructor
 * @param {Array} videoHandlers Array of available video handlers
 * @param {DOMElement} elem DOM element
 * @param {Object} options Object that can be passed to set the options of the LivePlayer
 * @param {Int} [options.loglevel=0] The loglevel can be set from 0 to 4. Defaults to <code>0</code>. 
 * @param {Boolean} [options.autoplay=false] If <code>true</code> the video will play automatically when loaded. Defaults to <code>false</code>
 * @param {Boolean} [options.mute=false] If <code>true</code> the video sound will be muted when the player is initiated. Defaults to <code>false</code>
 * @param {Boolean} [options.vod=false] If <code>true</code> the player will assume the video is "video on demand", meaning the controlbar will not be shown. Defaults to <code>false</code>
 * @param {Number} [options.bufferTime=4] Buffer length used for the video stream (Flash).
 * @param {String} [options.scaleMode] If set to <code>stretch</code> the video will fill the whole containing element. 
 * @param {Object} [options.ui] An object that controls the LivePlayer graphical user interface
 * @param {Boolean} [options.ui.enabled=true] If <code>false</code> the user interface wil be deactivated. Defaults to <code>true</code>
 * @param {Boolean} [options.ui.videoControls=true] If <code>false</code> the play/pause, stop and volume controls will be deactivated and hidden. Defaults to <code>true</code>
 * @param {Boolean} [options.ui.fullscreen] If <code>false</code> the fullscreen button wil be hidden. Defaults to <code>true</code>
 * @param {Int} [options.ui.controlBarDelay] Sets the number of seconds the mouse have to be inactive before the user interface is hidden. Defaults to <code>3</code>. 
 * @param {Object} [options.simpleBitrate] If {{simpleBitrate}} is truthy the player the "simple bitrate mode" is activeted. "Simple bitrate mode" can be used for dynamic bitrate switcing using SMIL. In this mode the player will take the highest and the lowest of the available bitrates and name the lowest "SD" and the higest "HD". By default the player will prioritize the HD bitrate, and will not switch bitrate unless the use explicitly asks it to. 
 * @param {Boolean} [options.simpleBitrate.SDpriority=false] If <code>SDpriority<code> is <code>true</code> the player will prioritize the SD bitrate, and will not switch bitrate unless the use explicitly asks it to.
 * @param {Object} [options.simpleBitrate.button] In "simple bitrate mode" the bitrate selector in the user interface can be altered by setting it's text and background picture. This is done by passing either a <code>button.text</code> or a <code>button.img</code> key-value pair with the text or path to the image.
 * @param {String} [options.simpleBitrate.button.text] This option will set the text of the bitrate selector in the user interface. The bitrate selector will not change it's text when another bitrate is selected when this options is set.
 * @param {String} [options.simpleBitrate.button.img] This option will set the <code>background-picture</code> css property of the bitrate selector. This options should thus be the path to the wanted image file. There has not been set any programatic restrictions on the picture, one should therefore ensure that the picture is of a proper size and format.
 * @param {Boolean} [options.loop=false] If set to <code>true</code> the player will loop the video.
 * @param {Int} [options.loadTimeout=false] if set LivePlayer will throw an error after <code>loadTimeout</code> seconds
 **/

/**
 * @event buffering is fired when the video is buffering. This does not necessarily mean that the video is ready to play.
 * @param seconds The number of seconds loaded to the buffer
 */

/**
 * @event error Is fired when an error occurs in the player
 * @param {String} msg A message that describes the error
 */

/**
 * @event timeupdate Is fired when the current time of the video is updated. Normally when the video is playing or a sepcific time is set
 * @param {Number} currentTime  The current playback time in seconds 
 */

/**
 * @event volumechange is fired when the volume is changed
 * @param {Number} volume The volume after the change
 */

/**
 * @event playing is fired when the video is playing
 */

/**
 * @event stopped is fired when the playback is stopped
 */

/**
 * @event paused is fired when the playback is paused
 */

/**
 * @event stream-loaded is fired when the the videohandler says the stream is loaded and can be played
 */

/**
 * @event lp:mousemove is fired when the mouse cursor is moved over the player
 * @param {Object} [evt] An object containing attributes related to the mouse event
 * @param {Number} mouseX The x coordinate of the mouse cursor
 * @param {Number} mouseY The y coordinate of the mouse cursor  
 */

var LivePlayer = EventEmitter.extend({
  init: function (videoHandlers, elem, options, version) {
    this.version = version;
    this.logger = new Logger('LivePlayer', options.loglevel);
    this.logger.debug('using version ' + version + ' of LivePlayer');
    this.logger.debug('Initializing player');
    this.duration = false;
    this.audioVolume = 100;
    this.videoHandlers = videoHandlers;
    this.activeVideoHandler = null;
    this.element = elem;
    this.boundingBox = elem.getBoundingClientRect();
    this.layers = {};
    this.sourceBlacklist = {};
    this.originalClassName = this.element.className;
    this.element.className = (this.originalClassName + " liveplayer").trim();
    this.videoElement = document.createElement('div');
    this.element.appendChild(this.videoElement);
    this.options = options;
    var videoTags = this.element.parentNode.getElementsByTagName('video');
    if (videoTags.length > 0) {
      this.logger.debug('Found video element, detecting sources');
      this.placeholderElement = videoTags[0];
      this.element.parentNode.removeChild(this.placeholderElement);
      this.loadPosterImageFromPlaceholder();
      this.loadStreamFromPlaceholder();
    }
  },

  /**
   * Check if the given stream is supported
   *
   * @method canHandleStream
   * @param {String} url Stream URL
   * @param {String} mimeType Stream MimeType
   * @return {Boolean} <code>true</code> if supported, <code>false</code> otherwise
   */
  canHandleStream: function (url, mimeType) {
    var possibleHandlers = this.videoHandlers.filter(function (handler) {
      return handler.canHandleStream(url, mimeType);
    });
    return (possibleHandlers.length > 0);
  },

  loadPosterImageFromPlaceholder: function () {
    if (this.placeholderElement.attributes.poster) {
      this.setPoster(this.placeholderElement.attributes.poster.value);
    }
  },

  loadStreamFromPlaceholder: function () {
    var self = this;
    var metadata = {};
    var sources = this.placeholderElement.getElementsByTagName('source');
    var streams = [].map.call(sources, function (source) {
      var options = {};
      options.includesAppInstance = source.getAttribute('data-includes-app-instance');
      return {
        url: source.getAttribute('src'),
        type: source.type,
        options: options
      };
    });

    var playableStreams = streams.filter(function (stream) {
      var canHandle = self.canHandleStream(stream.url, stream.type);
      canHandle = canHandle && !self.sourceBlacklist[stream.url];
      return canHandle;
    });

    if (playableStreams.length > 0) {
      this.load(playableStreams[0].url,
                playableStreams[0].type,
                metadata,
                null,
                playableStreams[0].options);
      this.activeVideoHandler.bindOnce('error', function () {
        self.sourceBlacklist[playableStreams[0].url] = true;
        self._resetActiveVideoHandler();
        setTimeout(function () {
          self.loadStreamFromPlaceholder();
        }, 500);
      });
      if(self.options.loadTimeout) {
        var errorTimer = setTimeout(function() {
          self.trigger('error', 'unable to load the video after ' + 
                       self.options.loadTimeout + ' seconds');
        }, self.options.loadTimeout * 1000);
        self.bind('stream-loaded', function() {
          window.clearTimeout(errorTimer);
        });
      }
    } else {
      setTimeout(function () {
        self.trigger('error', 'No playable sources found in video element');
      }, 0);
    }
  },

  _resetActiveVideoHandler: function () {
    this.activeVideoHandler.remove();
    this.element.removeChild(this.videoElement);
    this.videoElement = document.createElement('div');
    this.element.appendChild(this.videoElement);
    this.activeVideoHandler = undefined;
  },

  isRemoved: function() {
    return this.removed;
  },

  isPaused: function() {
    return this.paused;
  },

  /**
   * Load stream from URL
   *
   * @method load
   * @param {String} url Stream URL
   * @param {String} mimeType Stream MimeType
   * @param {Object} metadata Stream metadata
   * @param {Function} cb Function to be called when stream has been loaded
   * @param {Object} options Optional parameters to pass into video handler
   */
  load: function (url, mimeType, metadata, cb, options) {
    var self = this;

    this.logger.info('Loading stream (' + mimeType + '): ' + url);

    if (this.activeVideoHandler) {
      this._resetActiveVideoHandler();
    }
    var possibleHandlers = this.videoHandlers.filter(function (handler) {
      return handler.canHandleStream(url, mimeType);
    });

    if (possibleHandlers.length === 0) {
      this.trigger('error', 'Unable to handle the stream at: ' + url);
      return;
    }

    this.activeVideoHandler = new possibleHandlers[0](this.videoElement, function () {
      self.activeVideoHandler.setParent(self);
      self.activeVideoHandler.bindOnce('stream-loaded', function (url) {
        self.setMetadata(metadata);
        if (self.getOption('autoplay')) {
          setTimeout(function () {
            self.play();
          }, 0);
        }
        if (localStorage.getItem('livePlayerVolume')) {
          self.setVolume(localStorage.getItem('livePlayerVolume'));
        }
        if (self.getOption('loop')) {
          self.activeVideoHandler.setLooping(true);
        }
        if (self.getOption('mute') && !localStorage.getItem('livePlayerVolume')) { 
          self.setVolume(0);
        }
        if (typeof cb === 'function') {
          cb();
        }
      });
      self.activeVideoHandler.load(url, mimeType, options);
      self.activeVideoHandler.setVolume(self.audioVolume);
      self.duration = self.activeVideoHandler.getDuration();
      self.activeVideoHandler.bind('connection-lost', self.reconnect.bind(self));
      setTimeout(function() {
        self.trigger('video-handler-loaded');
      }, 0);
    }, this);
  },

  reconnect: function() {
    var self = this;
    var videoHandler = this.activeVideoHandler;
    var time = Date.now();
    var tryReconnect = true;
    var milisecondsToQuit = 30000;
    videoHandler.logger.info('Connection lost. Trying to reconnect for ' + 
                     milisecondsToQuit/1000 + " seconds");
    var intervalID = window.setInterval(function() {
      if(tryReconnect) {
        self.loadStreamFromPlaceholder();
        if(Date.now() > (milisecondsToQuit + time)) {
          tryReconnect = false;
          videoHandler.logger.info("Could not reconnect");
          clearInterval(intervalID);  
        }          
      } else {
        clearInterval(intervalID);  
      }
    }, 5000);
    self.bindOnce('stream-loaded', function () {
        videoHandler.logger.info("Stream reloaded");
        tryReconnect = false; 
        clearInterval(intervalID);  
    });
  },

  /**
   * Set video metadata
   *
   * @method setMetadata
   * @param {Object} metadata Meta information for the video
   */
  setMetadata: function (metadata) {
    this.metadata = metadata;
    this.trigger('set-metadata', metadata);
  },

  /**
   * Get video metadata
   *
   * @method getMetadata
   * @return {Object} Meta information for the video
   */
  getMetadata: function () {
    return this.metadata;
  },

  /**
   * Start playback
   *
   * @method play
   */
  play: function () {
    if (this.activeVideoHandler) {
      this.paused = false;
      this.activeVideoHandler.play();
      LivePlayerUtil.toggleFullscreen(this.element);
    }
  },

  /**
   * Pause playback
   *
   * @method pause
   */
  pause: function() {
    if (this.activeVideoHandler) {
      this.paused = true;
      this.activeVideoHandler.pause();
      LivePlayerUtil.toggleFullscreen(this.element);
    }
  },

  /**
   * Stop playback
   *
   * @method stop
   */
  stop: function () {
    if (this.activeVideoHandler) {
      this.activeVideoHandler.stop();
    }
  },

  /**
   * Set audio volume
   *
   * @method setVolume
   * @param {Number} volume Audio volume (0-100)
   */
  setVolume: function (volume) {
    this.audioVolume = volume;
    if (this.activeVideoHandler) {
      this.activeVideoHandler.setVolume(volume);
    }
    localStorage.setItem('livePlayerVolume', volume);
  },

  /**
   * Get current audio volume
   *
   * @method getVolume
   * @return {Number} Audio volume (0-100)
   */
  getVolume: function () {
    return this.audioVolume;
  },

  /**
   * Set the desired buffer length
   * Currently only supported for Flash streams
   *
   * @method setBufferTime
   * @param {Number} bufferTime Desired buffer length
   */
  setBufferTime: function (bufferTime) {
    if (this.activeVideoHandler) {
      this.activeVideoHandler.setBufferTime(bufferTime);
    }
  },

  /**
   * Get the desired buffer length
   *
   * @method getBufferTime
   * @return {Number} Desired buffer length
   */
  getBufferTime: function () {
    if (this.activeVideoHandler) {
      return this.activeVideoHandler.getBufferTime();
    }
  },

  /**
   * Checks if the loaded stream has multiple bitrates available.
   *
   * @method isMultiBitrate
   * @return {Boolean}
   */
  isMultiBitrate: function () {
    if (this.activeVideoHandler) {
      return this.activeVideoHandler.isMultiBitrate();
    }
    return false;
  },

  /**
   * Returns an array of available bitrates for the active stream.
   *
   * @method getAvailableBitrates
   * @return {Array} Available bitrates
   */
  getAvailableBitrates: function () {
    if (this.activeVideoHandler) {
      return this.activeVideoHandler.getAvailableBitrates();
    }
    return null;
  },

  /**
   * Returns the index of the active bitrate.
   *
   * @method getActiveBitrateIdx
   * @return {Number} Bitrate index
   */
  getActiveBitrateIdx: function () {
    if (this.activeVideoHandler) {
      return this.activeVideoHandler.getActiveBitrateIdx();
    }
    return null;
  },

  /**
   * Returns the index of the active bitrate for the automatic bitrate switcher.
   *
   * @method getActiveAutoBitrateIdx
   * @return {Number} Bitrate index
   */
  getActiveAutoBitrateIdx: function () {
    if (this.activeVideoHandler) {
      return this.activeVideoHandler.getActiveAutoBitrateIdx();
    }
    return null;
  },

  /**
   * Sets the active bitrate to the given index.
   *
   * @method setActiveBitrateIdx
   * @param {Number} index Bitrate index
   */
  setActiveBitrateIdx: function (index) {
    if (this.activeVideoHandler) {
      this.activeVideoHandler.setActiveBitrateIdx(index);
    }
  },

  /**
   * Set the URL to be used for the video poster image
   *
   * @method setPoster
   * @param {String} posterUrl Poster image URL
   */
  setPoster: function (posterUrl) {
    this.posterUrl = posterUrl;
    this.trigger('poster-added', this.posterUrl);
  },

  /**
   * check if the stream supports setting the volume of individual audio channels.
   *
   * @method cancontrolindividualaudiochannels
   * @return {Boolean}
   */
  canControlIndividualAudioChannels: function () {
    if(this.activeVideoHandler) {
      return this.activeVideoHandler.canControlIndividualAudioChannels();
    }
  },
  
  /**
   * check if the stream is seekbale / On demand
   *
   * @method isVod
   * @return {Boolean}
   */
  isVod: function () {
    if(this.activeVideoHandler){
      return this.activeVideoHandler.isVod();
    }
  },

  /**
   * Set volume of the left audio channel
   *
   * @method setVolumeLeft
   * @param {Number} volume Audio volume level (0-100)
   */
  setVolumeLeft: function (volume) {
    this.activeVideoHandler.setVolumeLeft(volume);
  },

  /**
   * Set volume of the right audio channel
   *
   * @method setVolumeRight
   * @param {Number} volume Audio volume level (0-100)
   */
  setVolumeRight: function (volume) {
    this.activeVideoHandler.setVolumeRight(volume);
  },

  /**
   * Get the URL for the current poster image
   *
   * @method getPoster
   * @return {String} Poster image URL
   */
  getPoster: function () {
    return this.posterUrl;
  },

  /**
   * Add a layer on top of the player
   *
   * @method addLayer
   * @param {String} name Name for the layer
   * @param {Component} layer Layer object
   */
  addLayer: function (name, layer) {
    this.layers[name] = layer;
    this.layers[name].render(this.element);
  },

  /**
   * Remove a layer
   *
   * @method removeLayer
   * @param {String} name Name of the layer to be removed
   */
  removeLayer: function (name) {
    this.layers[name].remove();
    delete this.layers[name];
  },

  /**
   * Check if the player has a given layer
   *
   * @method hasLayer
   * @param {String} name Name of the layer to check for
   */
  hasLayer: function(name) {
    if(this.layers[name]) {
      return true;
    }
    return false;
  },

  /**
   * Toggle fullscreen mode
   *
   * @method toggleFullscreen
   */
  toggleFullscreen: function () {
    LivePlayerUtil.toggleFullscreen(this.element);
  },

  /**
   * Remove the player
   *
   * @method remove
   */
  remove: function () {
    this.trigger('remove');
    this.activeVideoHandler.remove();
    this.element.removeChild(this.videoElement);
    this.element.appendChild(this.placeholderElement);
    this.element.className = this.originalClassName;
    this.removed = true;
  },

  /**
   * Add an option
   *
   * @method getOption
   */
  getOption: function (option) {
    return this.options[option];
  },

  /* jshint ignore:start */
  /**
   * set an option by passing the name of the option and an object or single value.  
   *
   * @method setOption
   * @param {Object} [options] Object that can be passed to set the options of the LivePlayer
   * @param {Int} [options.loglevel=0] The loglevel can be set from 0 to 4. Defaults to <code>0</code>. 
   * @param {Boolean} [options.autoplay=false] If <code>true</code> the video will play automatically when loaded. Defaults to <code>false</code>
   * @param {Boolean} [options.mute=false] If <code>true</code> the video sound will be muted when the player is initiated. Defaults to <code>false</code>
   * @param {Object} [options.ui] An object that controls the LivePlayer graphical user interface
   * @param {Boolean} [options.ui.enabled=true] If <code>false</code> the user interface wil be deactivated. Defaults to <code>true</code>
   * @param {Boolean} [options.ui.videoControls=true] If <code>false</code> the play/pause, stop and volume controls will be deactivated and hidden. Defaults to <code>true</code>
   * @param {Boolean} [options.ui.fullscreen] If <code>false</code> the fullscreen button wil be hidden. Defaults to <code>true</code>
   * @param {Int} [options.ui.controlBarDelay] Sets the number of seconds the mouse have to be inactive before the user interface is hidden. Defaults to <code>3</code>. 
   * @example
   *  <code>setOption('mute', true);</code>
   *
   *or</br>

   *<code>
   *  setOption('ui',{
   *   enabled: true,
   *   fullscreen: false 
   *  });
   *</code>
   */
   /* jshint ignore:end */
  setOption: function (optionName, optionObj) {
    this.options[optionName] = optionObj;
  }, 

  /**
   * Returns the name of the activeVideoHandler
   *
   * @method getActiveVideoHandler
   *
   */
  getActiveVideoHandler: function() {
    return this.activeVideoHandler.getName();
  },

  /**
   * return the videoElement
   *
   * @method getVideoElement
   */
  getVideoElement: function() {
    return this.videoElement;
  },

  /**
   * return video duration or false
   *
   * @method getDuration
   */
  getDuration: function() {
    if(this.activeVideoHandler.getDuration) {
      return this.activeVideoHandler.getDuration();
    }
    return false;
  },

  /**
   * set the current playback time of the video
   *
   * @method setCurrentTime
   */
  setCurrentTime: function(time) {
    this.activeVideoHandler.setCurrentTime(time);
  },  

  /**
   * gets the current playback time
   *
   * @method getCurrentTime
   */
  getCurrentTime: function() {
    return this.activeVideoHandler.getCurrentTime();
  },

  /**
   * return the playback state
   *
   * @method getPlayState
   */
  getPlayState: function() {
    return this.activeVideoHandler.getPlayState();
  },

  /**
   * returns the info related to the video
   *
   * @method getInfo
   */
  getInfo: function() {
    if (this.activeVideoHandler) {
      return this.activeVideoHandler.getInfo();
    }
  },

  /**
   * return the version number of LivePlayer as a string
   *
   * @method getVersion
   * @return {String} version number
   */
  getVersion: function() {
    if(this.version) {
      return this.version;
    }
  },

  /**
   * set the scalmode of the video
   *
   * @method setScaleMode
   * @param {String} mode "stretch" or "letterbox"
   */
  setScaleMode: function(mode) {
    if (this.activeVideoHandler) {
      this.activeVideoHandler.setScaleMode(mode);
    }
  },

  /**
  * remove control bar component
  *
  * @method removeControlbarComponent
  * @param {String} component
  */
  removeControlbarComponent: function(compName) {
    var controlBar = this.controlBar;
    var children = controlBar.children;
    var controlBarRight;
    controlBar.children.forEach(function(child) {
      if(child.name === 'control-bar-right') {
        controlBarRight = child;
        children = children.concat(controlBarRight.children);
      }
    });

    function hasName(object) {
      if('name' in object && object.name === compName) {
        return true;
      }
      return false;
    } 
    var component = children.filter(hasName)[0];

    if(this.hasLayer('ui') && component) {
      component.remove();
    } else {
      this.logger.error('unable to remove "' + compName + '"');
      console.log('These are the available components: ');
      children.forEach(function(child) {
        if(child.name) {
          console.log(child.name);
        }
        else{
          console.log(child);
        }
      });
    }
  }, 

  /**
   * get array of controlbar component names
   *
   * @method listControlbarComponents
   * @return {Array}
   */
  listControlbarComponents: function() {
    var array = [];
    var controlBar = this.controlBar;
    var children = controlBar.children;
    var controlBarRight;
    controlBar.children.forEach(function(child) {
      if(child.name === 'control-bar-right') {
        controlBarRight = child;
        children = children.concat(controlBarRight.children);
      }
    });
    children.forEach(function(child) {
      if(child.name) {
        array.push(child.name);
      }
    });
    return array;
  },

  /**
  * get stream edge server IP
  *
  * @method getEdgeServerIp
  */
  getEdgeServerIp: function() {
    if (this.activeVideoHandler) {
      return this.activeVideoHandler.getEdgeServerIp();
    }
  }

});

module.exports = LivePlayer;

},{"./logging/Logger":11,"./util/EventEmitter":32,"./util/LivePlayerUtil":34,"microevent":6}],9:[function(_dereq_,module,exports){
/**
 * @module liveplayer
 */

var EventEmitter = _dereq_('./util/EventEmitter');
var Logger = _dereq_('./logging/Logger');

/**
 * Extensible base class for video handlers
 *
 * @constructor
 * @param {DOMElement} elem A reference to the DOM element to be controlled by the handler
 * @param {Function} readyCb Callback to run when the handler is ready
 * @param {LivePlayer} player Instance of LivePlayer
 * @class VideoHandlerBase
 * @extends EventEmitter
 */
var VideoHandlerBase = EventEmitter.extend({
  init: function (elem, readyCb, player) {
    var self = this;
    var loglevel = player.getOption('loglevel');
    this.logger = new Logger(this.getName().toUpperCase() + ' VideoHandler', loglevel);
    this.logger.debug('Initializing video handler');

    this.bind('error', function (error) {
      self.logger.error(error);
    });
  },

  /**
   * Load stream from URL.<br />
   * <em>Must be overriden by subclass.</em>
   *
   * @method load
   * @param {String} url Stream URL
   * @param {String} type Stream MimeType
   * @param {Object} options Options to pass to video handler
   */
  load: function (url, type, options) {
    var self = this;
    this.logger.info('Attempting to load stream (' + type + '): ' + url);
    this.bindOnce('Stream-loaded', function () {
      self.logger.info('Stream loaded successfully (' + type + '): ' + url);
    });
  },

  /**
   * Start playback of stream.<br />
   * <em>Must be overriden by subclass.</em>
   *
   * @method play
   */
  play: function () {
    throw Error('Play method not implemented by \'' + this.getName() + '\' handler.');
  },

  /**
   * Pause playback
   * <em>Must be overriden by subclass.</em>
   *
   * @method pause
   */
  pause: function () {
    throw Error('Pause method not implemented by \'' + this.getName() + '\' handler.');
  },

  /**
   * Stop playback of stream.<br />
   * <em>Must be overriden by subclass.</em>
   *
   * @method stop
   */
  stop: function () {
    throw Error('Stop method not implemented by \'' + this.getName() + '\' handler.');
  },

  /**
   * Set audio volume for stream.<br />
   * <em>Must be overriden by subclass.</em>
   *
   * @method setVolume
   * @param {Number} volume Audio volume level (0-100)
   */
  setVolume: function (volume) {
    throw Error('SetVolume method not implemented by \'' + this.getName() + '\' handler.');
  },

  /**
   * Get audio volume for stream.<br />
   * <em>Must be overriden by subclass.</em>
   *
   * @method getVolume
   * @return {Number} Audio volume level (0-100)
   */
  getVolume: function () {
    throw Error('GetVolume method not implemented by \'' + this.getName() + '\' handler.');
  },

  /**
   * Remove the video handler.<br />
   * <em>Must be overriden by subclass.</em>
   *
   * @method remove
   */
  remove: function () {
    throw Error('Remove method not implemented by \'' + this.getName() + '\' handler.');
  },

  /**
   * Check if the stream supports setting the volume of individual audio channels.
   *
   * @method canControlIndividualAudioChannels
   * @return {Boolean}
   */
  canControlIndividualAudioChannels: function () {
    return false;
  },

  /**
   * Set volume of the left audio channel
   *
   * @method setVolumeLeft
   * @param {Number} volume Audio volume level (0-100)
   */
  setVolumeLeft: function (volume) {
  },

  /**
   * Set volume of the right audio channel
   *
   * @method setVolumeRight
   * @param {Number} volume Audio volume level (0-100)
   */
  setVolumeRight: function (volume) {
  },

  /**
   * Set the desired buffer length
   *
   * @method setBufferTime
   * @param {Number} bufferTime Desired buffer length
   */
  setBufferTime: function (bufferTime) {
  },

  /**
   * Get the desired buffer length of the player
   *
   * @method getBufferTime
   * @return {Number} Desired buffer length
   */
  getBufferTime: function () {
  },

  /**
   * Checks if the loaded stream has multiple bitrates available.
   *
   * @method isMultiBitrate
   * @return {Boolean}
   */
  isMultiBitrate: function () {
    return false;
  },

  /**
   * Returns an array of available bitrates for the active stream.
   *
   * @method getAvailableBitrates
   * @return {Array} Available bitrates
   */
  getAvailableBitrates: function () {
    return null;
  },

  /**
   * Returns the index of the active bitrate.
   *
   * @method getActiveBitrateIdx
   * @return {Number} Bitrate index
   */
  getActiveBitrateIdx: function () {
    return null;
  },

  /**
   * Returns the index of the active bitrate for the automatic bitrate switcher.
   *
   * @method getActiveAutoBitrateIdx
   * @return {Number} Bitrate index
   */
  getActiveAutoBitrateIdx: function () {
    return null;
  },

  /**
   * Set active bitrate index.
   *
   * @method setActiveBitrateIdx
   * @param {Number} idx Bitrate index
   */
  setActiveBitrateIdx: function (idx) {
    return;
  },

  /**
   * Get the name of the video handler.<br />
   * <em>Must be overriden by subclass.</em>
   *
   * @method getName
   * @return {String} Name of video handler
   */
  getName: function () {
    return 'base';
  },

  /**
   * Returns info like bandwidth and bitrate
   * if defined in videohandler. Otherwise returns an empty object.
   *
   * @method getInfo
   */
  getInfo: function() {
    return {};
  },

 /**
  * Set the attribute to true to make the video loop.
  *
  * @method setLooping
  * @param {Boolean}
  */
  setLooping:  function (willLoop) {
  },

 /**
  * Check if the stream looping feature is active.
  *
  * @method isLooping
  * @param {Boolean}
  */
  isLooping:  function (willLoop) {
    return false;
  },

  /**
   *  Check if the video is a recording / seekable.
   *
   *  @method isVod
   *  @return {Boolean} <code>true</code> is suported, <code>false</code> otherwise.
   *  @static
   */
  isVod: function () {
    return false;
  },

  /**
   *  Get duration of video in seconds,
   *  if any is found.
   *
   *  @method getDuration
   *  @returns Number
   *  @static
   */
  getDuration: function () {
    return false;
  },

  /**
   * Get current time of video if it's video on demand.
   *
   * @method getCurrentTime
   * @returns Number
   * @static
   */
  getCurrentTime: function () {
    return false;
  },

  /**
   * Sets the current playback time.
   *
   * @method setCurrentTime
   * @param Number
   * @static
   */
  setCurrentTime: function (seconds) {
    return false;
  }
});

/**
 * Check if this video handler is supported on the current platform.
 *
 * @method isSupportedByPlatform
 * @return {Boolean} <code>true</code> if supported, <code>false</code> otherwise.
 * @static
 */
VideoHandlerBase.isSupportedByPlatform = function () {
  return false;
};

/**
 * Check if this video handler can handle the provided stream.
 *
 * @method canHandleStream
 * @param {String} url Stream URL
 * @param {String} type Stream MimeType
 * @return {Boolean} <code>true</code> if supported, <code>false</code> otherwise.
 * @static
 */
VideoHandlerBase.canHandleStream = function (url, type) {
  return false;
};

/**
 * set the scalmode of the video
 *
 * @method setScaleMode
 * @param {String} mode letterbox or stretch
 * @return {void}
 * @static
 */
VideoHandlerBase.setScaleMode = function (mode) {
  return false;
};

/**
 * get Stream edge server IP
 *
 * @method getEdgeServerIp
 * @return {String}
 * @static
 */

VideoHandlerBase.getEdgeServerIp = function () {
  return false;
};

module.exports = VideoHandlerBase;

},{"./logging/Logger":11,"./util/EventEmitter":32}],10:[function(_dereq_,module,exports){
/**
 * @module liveplayer
 */

/**
 * @class _global
 */

var DeepMerge = _dereq_('deep-merge');
var LivePlayer = _dereq_('./LivePlayer');
var LivePlayerUI = _dereq_('./ui/LivePlayerUI');
var Logger = _dereq_('./logging/Logger');

var version = '1.4.7';

var videoHandlers = {
  html5: _dereq_('./videohandlers/HTML5'),
  dash: _dereq_('./videohandlers/Dash'),
  flash: _dereq_('./videohandlers/Flash')
};

var merge = DeepMerge(function (a, b) {
  return b;
});

/**
 * Bootstrap function for LivePlayer
 * @method liveplayer
 * @param {string|DOMElement} elementId DOM element ID or DOMElement
 * @param {Object} options Optional parameters for LivePlayer initialization
 * @return {LivePlayer} Instance of LivePlayer class
 */
var liveplayer = function (id, options, readyCb) {
  options = options || {};
  var logger = new Logger('liveplayer()', options.loglevel || 0);
  logger.debug('Running bootstrap function');

var element = getHTMLElement(id);

  var defaultOptions = {
    videoHandlers: ['html5', 'flash'],
    swf: '/srplayer.swf',
    loglevel: 0,
    autoplay: false,
    loop: false,
    mute: false,
    vod: null,
    bufferTime: 4.5,
    scaleMode: false,
    edgeServerIpDetection: false,
    ui: {
      enabled: true,
      videoControls : true,
      fullscreen : true,
      controlBarHideDelay: 3
    },
    simpleBitrate: false,
    loadTimeout: false
  };

  var currentOptions = merge(defaultOptions, options);

  logger.debug('Discovering supported video handlers for platform');
  
  var supportedVideoHandlers = currentOptions.videoHandlers.filter(function (handler) {
    if (!videoHandlers[handler]) {
      return false;
    } else {
      return videoHandlers[handler].isSupportedByPlatform();
    }
  });
  
  logger.debug('Found ' + supportedVideoHandlers.length + ' supported video handlers');

  supportedVideoHandlers = supportedVideoHandlers.map(function (handler) {
    return videoHandlers[handler];
  });

  var playerElement = document.createElement('div');
  element.appendChild(playerElement);
  var livePlayer = new LivePlayer(
    supportedVideoHandlers, 
    playerElement, 
    currentOptions, 
    version);
  if(currentOptions.ui.enabled) {
    var ui = new LivePlayerUI(livePlayer);
    livePlayer.bind('video-handler-loaded', function() {
      livePlayer.addLayer('ui', ui);
    });
  }

  return livePlayer;
};

var getHTMLElement = function (id) {
  if (id.nodeType) {
    return id;
  } else if (document.getElementById(id)) {
    return document.getElementById(id);
  } else {
    throw new Error('No valid DOM element or element ID specified.');
  }
};

module.exports = liveplayer;

(function (ELEMENT) {
	ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector || function matches(selector) {
		var
		element = this,
		elements = (element.document || element.ownerDocument).querySelectorAll(selector),
		index = 0;

		while (elements[index] && elements[index] !== element) {
			++index;
		}

		return elements[index] ? true : false;
	};

	ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		var element = this;

		while (element) {
			if (element.matches(selector)) {
				break;
			}

			element = element.parentElement;
		}

		return element;
	};
}(Element.prototype));

/*!
 * A polyfill for Webkit's window.getMatchedCSSRules, based on
 * https://gist.github.com/ydaniv/3033012
 *
 * @author: Yehonatan Daniv
 * @author: ssafejava
 * @author: Christian "Schepp" Schaefer <schaepp@gmx.de>
 *
 */

'use strict';

(function () {
	// polyfill window.getMatchedCSSRules() in FireFox 6+
	if (typeof window.getMatchedCSSRules === 'function') {
		return;
	}

	var ELEMENT_RE = /[\w-]+/g,
		ID_RE = /#[\w-]+/g,
		CLASS_RE = /\.[\w-]+/g,
		ATTR_RE = /\[[^\]]+\]/g,
		// :not() pseudo-class does not add to specificity, but its content does as if it was outside it
		PSEUDO_CLASSES_RE = /\:(?!not)[\w-]+(\(.*\))?/g,
		PSEUDO_ELEMENTS_RE = /\:\:?(after|before|first-letter|first-line|selection)/g;

	// convert an array-like object to array
	var toArray = function (list) {
		var items = [];
		var i = 0;
		var listLength = list.length;

		for (; i < listLength; i++) {
			items.push(list[i]);
		}

		return items;
	};

	// get host of stylesheet
	var getCSSHost = function (href) {
		var fakeLinkOfSheet = document.createElement('a');

		fakeLinkOfSheet.href = href;

		return fakeLinkOfSheet.host;
	};

	// handles extraction of `cssRules` as an `Array` from a stylesheet or something that behaves the same
	var getSheetRules = function (stylesheet) {
		var sheetMedia = stylesheet.media && stylesheet.media.mediaText;
		var sheetHost;

		// if this sheet is cross-origin and option is set skip it
		if (objectFit.disableCrossDomain == 'true') {
			sheetHost = getCSSHost(stylesheet.href);

			if ((sheetHost !== window.location.host)) {
				return [];
			}
		}


		// if this sheet is disabled skip it
		if (stylesheet.disabled) {
			return [];
		}

		if (!window.matchMedia) {
			if (sheetMedia && sheetMedia.length) {
				return [];
			}
		}
		// if this sheet's media is specified and doesn't match the viewport then skip it
		else if (sheetMedia && sheetMedia.length && ! window.matchMedia(sheetMedia).matches) {
			return [];
		}

		// get the style rules of this sheet
		return toArray(stylesheet.cssRules);
	};

	var _find = function (string, re) {
		var matches = string.match(re);

		return re ? re.length : 0;
	};

	// calculates the specificity of a given `selector`
	var calculateScore = function (selector) {
		var score = [0, 0, 0];
		var parts = selector.split(' ');
		var part;
		var match;

		//TODO: clean the ':not' part since the last ELEMENT_RE will pick it up
		while (part = parts.shift(), typeof part === 'string') {
			// find all pseudo-elements
			match = _find(part, PSEUDO_ELEMENTS_RE);
			score[2] = match;
			// and remove them
			match && (part = part.replace(PSEUDO_ELEMENTS_RE, ''));
			// find all pseudo-classes
			match = _find(part, PSEUDO_CLASSES_RE);
			score[1] = match;
			// and remove them
			match && (part = part.replace(PSEUDO_CLASSES_RE, ''));
			// find all attributes
			match = _find(part, ATTR_RE);
			score[1] += match;
			// and remove them
			match && (part = part.replace(ATTR_RE, ''));
			// find all IDs
			match = _find(part, ID_RE);
			score[0] = match;
			// and remove them
			match && (part = part.replace(ID_RE, ''));
			// find all classes
			match = _find(part, CLASS_RE);
			score[1] += match;
			// and remove them
			match && (part = part.replace(CLASS_RE, ''));
			// find all elements
			score[2] += _find(part, ELEMENT_RE);
		}

		return parseInt(score.join(''), 10);
	};

	// returns the heights possible specificity score an element can get from a give rule's selectorText
	var getSpecificityScore = function (element, selectorText) {
		var selectors = selectorText.split(','),
			selector, score, result = 0;

		while (selector = selectors.shift()) {
			if (element.closest(selector)) {
				score = calculateScore(selector);
				result = score > result ? score : result;
			}
		}

		return result;
	};

	var sortBySpecificity = function (element, rules) {
		// comparing function that sorts CSSStyleRules according to specificity of their `selectorText`
		var compareSpecificity = function (a, b) {
			return getSpecificityScore(element, b.selectorText) - getSpecificityScore(element, a.selectorText);
		};

		return rules.sort(compareSpecificity);
	};

	//TODO: not supporting 2nd argument for selecting pseudo elements
	//TODO: not supporting 3rd argument for checking author style sheets only
	window.getMatchedCSSRules = function (element) {  /*, pseudo, author_only*/
		var styleSheets;
		var result = [];
		var sheet;
		var rules;
		var rule;

		// get stylesheets and convert to a regular Array
		styleSheets = toArray(window.document.styleSheets);

		// assuming the browser hands us stylesheets in order of appearance
		// we iterate them from the beginning to follow proper cascade order
		while (sheet = styleSheets.shift()) {
			// get the style rules of this sheet
			rules = getSheetRules(sheet);

			// loop the rules in order of appearance
			while (rule = rules.shift()) {
				// if this is an @import rule
				if (rule.styleSheet) {
					// insert the imported stylesheet's rules at the beginning of this stylesheet's rules
					rules = getSheetRules(rule.styleSheet).concat(rules);
					// and skip this rule
					continue;
				}
				// if there's no stylesheet attribute BUT there IS a media attribute it's a media rule
				else if (rule.media) {
					// insert the contained rules of this media rule to the beginning of this stylesheet's rules
					rules = getSheetRules(rule).concat(rules);
					// and skip it
					continue;
				}

				// check if this element matches this rule's selector
				if (element.closest(rule.selectorText)) {
					// push the rule to the results set
					result.push(rule);
				}
			}
		}
		// sort according to specificity
		return sortBySpecificity(element, result);
	};
}());

/*
 * raf.js
 * https://github.com/ngryman/raf.js
 *
 * original requestAnimationFrame polyfill by Erik Möller
 * inspired from paul_irish gist and post
 *
 * Copyright (c) 2013 ngryman
 * Licensed under the MIT license.
 */

(function(window) {
	var lastTime = 0,
		vendors = ['webkit', 'moz'],
		requestAnimationFrame = window.requestAnimationFrame,
		cancelAnimationFrame = window.cancelAnimationFrame,
		i = vendors.length;

	// try to un-prefix existing raf
	while (--i >= 0 && !requestAnimationFrame) {
		requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
		cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'];
	}

	// polyfill with setTimeout fallback
	// heavily inspired from @darius gist mod: https://gist.github.com/paulirish/1579671#comment-837945
	if (!requestAnimationFrame || !cancelAnimationFrame) {
		requestAnimationFrame = function(callback) {
			var now = +new Date(), nextTime = Math.max(lastTime + 16, now);
			return setTimeout(function() {
				callback(lastTime = nextTime);
			}, nextTime - now);
		};

		cancelAnimationFrame = clearTimeout;
	}

	// export to window
	window.requestAnimationFrame = requestAnimationFrame;
	window.cancelAnimationFrame = cancelAnimationFrame;
}(window));

/*!
 * Polyfill CSS object-fit
 * http://helloanselm.com/object-fit
 *
 * @author: Anselm Hannemann <hello@anselm-hannemann.com>
 * @author: Christian "Schepp" Schaefer <schaepp@gmx.de>
 * @version: 0.3.4
 *
 */

(function (global) {

	'use strict';

	// Storage variable
	var objectFit = {};

	objectFit._debug = false;

	objectFit.observer = null;

	objectFit.disableCrossDomain = 'false';

	objectFit.getComputedStyle = function(element, context) {
		context = context || window;

		if (context.getComputedStyle) {
			return context.getComputedStyle(element, null);
		}
		else {
			return element.currentStyle;
		}
	};

	objectFit.getDefaultComputedStyle = function(element){
		var newelement = element.cloneNode(true);
		var styles = {};
		var iframe = document.createElement('iframe');
		document.body.appendChild(iframe);
		iframe.contentWindow.document.open();
		iframe.contentWindow.document.write('<body></body>');
		iframe.contentWindow.document.body.appendChild(newelement);
		iframe.contentWindow.document.close();

		var defaultElement = iframe.contentWindow.document.querySelectorAll(element.nodeName.toLowerCase())[0];
		var defaultComputedStyle = this.getComputedStyle(defaultElement, iframe.contentWindow);
		var value;
		var property;

		for (property in defaultComputedStyle) {
			if (defaultComputedStyle.getPropertyValue === true) {
				value = defaultComputedStyle.getPropertyValue(property);
			} else {
				value = defaultComputedStyle[property];
			}

			if (value !== null) {
				switch (property) {
					default:
						styles[property] = value;
					break;

					case 'width':
					case 'height':
					case 'minWidth':
					case 'minHeight':
					case 'maxWidth':
					case 'maxHeight':
					break;
				}
			}
		}

		document.body.removeChild(iframe);

		return styles;
	};

	objectFit.getMatchedStyle = function(element, property){
		// element property has highest priority
		var val = null;
		var inlineval = null;

		if (element.style.getPropertyValue) {
			inlineval = element.style.getPropertyValue(property);
		} else if (element.currentStyle) {
			inlineval = element.currentStyle[property];
		}

		// get matched rules
		var rules = window.getMatchedCSSRules(element);
		var i = rules.length;
		var r;
		var important;

		if (i) {
			// iterate the rules backwards
			// rules are ordered by priority, highest last
			for (; i --> 0;) {
				r = rules[i];
				important = r.style.getPropertyPriority(property);

				// if set, only reset if important
				if (val === null || important) {
					val = r.style.getPropertyValue(property);

					// done if important
					if (important) {
						break;
					}
				}
			}
		}

		// if it's important, we are done
		if (!val && inlineval !== null) {
			val = inlineval;
		}

		return val;
	};

	// Detects orientation
	objectFit.orientation = function(replacedElement) {
		if (replacedElement.parentNode && replacedElement.parentNode.nodeName.toLowerCase() === 'x-object-fit') {
			var width = replacedElement.naturalWidth || replacedElement.clientWidth;
			var height = replacedElement.naturalHeight || replacedElement.clientHeight;
			var parentWidth = replacedElement.parentNode.clientWidth;
			var parentHeight = replacedElement.parentNode.clientHeight;

			if (!height || width / height > parentWidth / parentHeight) {
				if (replacedElement.getAttribute('data-x-object-relation') !== 'wider') {
					replacedElement.setAttribute('data-x-object-relation','wider');
					replacedElement.className = 'x-object-fit-wider';

					if (this._debug && window.console) {
						console.log('x-object-fit-wider');
					}
				}
			} else {
				if (replacedElement.getAttribute('data-x-object-relation') !== 'taller') {
					replacedElement.setAttribute('data-x-object-relation','taller');
					replacedElement.className = 'x-object-fit-taller';

					if (this._debug && window.console) {
						console.log('x-object-fit-taller');
					}
				}
			}
		}
	};

	objectFit.process = function(args) {
		if (!args.selector || !args.replacedElements) {
			return;
		}

		// Set option objectFit.disableCrossDomain
		objectFit.disableCrossDomain = args.disableCrossDomain || 'false';

		// Set option fit-type
		args.fittype = args.fittype || 'none';

		switch (args.fittype) {
			default:
				return;

			case 'none':
			case 'fill':
			case 'contain':
			case 'cover':
			break;
		}

		// Set option replacedElements
		var replacedElements = args.replacedElements;

		if(!replacedElements.length) {
			return;
		}

		for (var i = 0, replacedElementsLength = replacedElements.length; i < replacedElementsLength; i++) {
			this.processElement(replacedElements[i], args);
		}
	};

	objectFit.processElement = function(replacedElement, args) {
		var property;
		var value;
		var replacedElementStyles = objectFit.getComputedStyle(replacedElement);
		var replacedElementDefaultStyles = objectFit.getDefaultComputedStyle(replacedElement);
		var wrapperElement = document.createElement('x-object-fit');

		if (objectFit._debug && window.console) {
			console.log('Applying to WRAPPER-------------------------------------------------------');
		}

		for (property in replacedElementStyles) {
			switch (property) {
				default:
					value = objectFit.getMatchedStyle(replacedElement, property);

					if (value !== null && value !== '') {
						if (objectFit._debug && window.console) {
							console.log(property + ': ' + value);
						}

						wrapperElement.style[property] = value;
					}
				break;

				case 'length':
				case 'parentRule':
				break;
			}
		}

		if (objectFit._debug && window.console) {
			console.log('Applying to REPLACED ELEMENT-------------------------------------------------------');
		}
		for (property in replacedElementDefaultStyles) {
			switch (property) {
				default:
					value = replacedElementDefaultStyles[property];

					if (objectFit._debug && window.console && value !== '') {
						console.log(property + ': ' + value);

						if (replacedElement.style[property] === undefined) {
							console.log('Indexed style properties (`' + property + '`) not supported in: ' + window.navigator.userAgent);
						}
					}

					if (replacedElement.style[property]) {
						replacedElement.style[property] = value; // should work in Firefox 35+ and all other browsers
					} else {
						replacedElement.style.property = value;
					}
				break;

				case 'length':
				case 'parentRule':
				break;
			}
		}

		wrapperElement.setAttribute('class','x-object-fit-' + args.fittype);
		replacedElement.parentNode.insertBefore(wrapperElement, replacedElement);
		wrapperElement.appendChild(replacedElement);

		objectFit.orientation(replacedElement);

		var resizeTimer = null;
		var resizeAction = function () {
			if (resizeTimer !== null) {
				window.cancelAnimationFrame(resizeTimer);
			}
			resizeTimer = window.requestAnimationFrame(function(){
				objectFit.orientation(replacedElement);
			});
		};

		switch (args.fittype) {
			default:
			break;

			case 'contain':
			case 'cover':
				if (window.addEventListener) {
					replacedElement.addEventListener('load', resizeAction, false);
					window.addEventListener('resize', resizeAction, false);
					window.addEventListener('orientationchange', resizeAction, false);
				} else {
					replacedElement.attachEvent('onload', resizeAction);
					window.attachEvent('onresize', resizeAction);
				}
			break;
		}
	};

	objectFit.listen = function (args) {
		var domInsertedAction = function (element){
			var i = 0;
			var argsLength = args.length;

			for (; i < argsLength; i++) {
				if ((element.mozMatchesSelector && element.mozMatchesSelector(args[i].selector)) ||
					(element.msMatchesSelector && element.msMatchesSelector(args[i].selector)) ||
					(element.oMatchesSelector && element.oMatchesSelector(args[i].selector)) ||
					(element.webkitMatchesSelector && element.webkitMatchesSelector(args[i].selector))
				) {
					args[i].replacedElements = [element];
					objectFit.process(args[i]);

					if (objectFit._debug && window.console) {
						console.log('Matching node inserted: ' + element.nodeName);
					}
				}
			}
		};

		var domInsertedObserverFunction = function (element) {
			objectFit.observer.disconnect();
			domInsertedAction(element);
			objectFit.observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
		};

		var domInsertedEventFunction = function (event) {
			window.removeEventListener('DOMNodeInserted', domInsertedEventFunction, false);
			domInsertedAction(event.target);
			window.addEventListener('DOMNodeInserted', domInsertedEventFunction, false);
		};

		var domRemovedAction = function (element) {
			if (element.nodeName.toLowerCase() === 'x-object-fit') {
				element.parentNode.removeChild(element);

				if (objectFit._debug && window.console) {
					console.log('Matching node removed: ' + element.nodeName);
				}
			}
		};

		var domRemovedObserverFunction = function (element) {
			objectFit.observer.disconnect();
			domRemovedAction(element);
			objectFit.observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
		};

		var domRemovedEventFunction = function (event) {
			window.removeEventListener('DOMNodeRemoved', domRemovedEventFunction, false);
			domRemovedAction(event.target.parentNode);
			window.addEventListener('DOMNodeRemoved', domRemovedEventFunction, false);
		};

		if (window.MutationObserver) {
			if (objectFit._debug && window.console) {
				console.log('DOM MutationObserver');
			}

			this.observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.addedNodes && mutation.addedNodes.length) {
						var nodes = mutation.addedNodes;
						for (var i = 0, nodesLength = nodes.length; i < nodesLength; i++) {
							domInsertedObserverFunction(nodes[i]);
						}
					}
					if (mutation.removedNodes && mutation.removedNodes.length) {
						domRemovedObserverFunction(mutation.target);
					}
				});
			});

			this.observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
		} else if (window.addEventListener) {
			if (objectFit._debug && window.console) {
				console.log('DOM Mutation Events');
			}

			window.addEventListener('DOMNodeInserted', domInsertedEventFunction, false);
			window.addEventListener('DOMNodeRemoved', domRemovedEventFunction, false);
		}
	};

	objectFit.init = function (args) {
		if (!args) {
			return;
		}

		if (!(args instanceof Array)) {
			args = [args];
		}

		var i = 0;
		var argsLength = args.length;

		for (; i < argsLength; i++) {
			args[i].replacedElements = document.querySelectorAll(args[i].selector);
			this.process(args[i]);
		}

		this.listen(args);
	};

	objectFit.polyfill = function (args) {
		if('objectFit' in document.documentElement.style === false) {
			if (objectFit._debug && window.console) {
				console.log('object-fit not natively supported');
			}

			// If the library is loaded after document onload event
			if (document.readyState === 'complete') {
				objectFit.init(args);
			} else {
				// Otherwise attach event listeners
				if (window.addEventListener) {
					window.addEventListener('load', function(){
						objectFit.init(args);
					}, false);
				} else {
					window.attachEvent('onload', function(){
						objectFit.init(args);
					});
				}
			}
		} else {
			if (objectFit._debug && window.console) {
				console.log('object-fit natively supported');
			}
		}
	};

	/*
	 * AMD, module loader, global registration
	 */

	// Expose modal for loaders that implement the Node module pattern.
	if (typeof module === 'object' && module && typeof module.exports === 'object') {
		module.exports = objectFit;

	// Register as an AMD module
	} else if (typeof define === 'function' && define.amd) {
		define([], function () { return objectFit; });

	// Export into global space
	} else if (typeof global === 'object' && typeof global.document === 'object') {
		global.objectFit = objectFit;
	}

}(window));

},{"./LivePlayer":8,"./logging/Logger":11,"./ui/LivePlayerUI":15,"./videohandlers/Dash":36,"./videohandlers/Flash":37,"./videohandlers/HTML5":38,"deep-merge":3}],11:[function(_dereq_,module,exports){
/**
 * @module liveplayer.logging
 */

var Class = _dereq_('../util/Class');

var loglevel = {
  'ERROR': 1,
  'WARNING': 2,
  'INFO': 3,
  'DEBUG': 4
};

/**
 * Logger class
 *
 * @class Logger
 * @constructor
 * @extends Class
 */
var Logger = Class.extend({
  init: function (component, loglevel) {
    this.format = "%time: [%level][%component] %message";
    this.component = component;
    this.loglevel = loglevel || 0;
  },

  _formatMessage: function (time, level, message) {
    var fmtMsg = this.format.replace('%time', time);
    fmtMsg = fmtMsg.replace('%component', this.component);
    fmtMsg = fmtMsg.replace('%level', level);
    fmtMsg = fmtMsg.replace('%message', message);
    return fmtMsg;
  },

  _log: function (level, message) {
    var time = new Date().toTimeString();
    console.log(this._formatMessage(time, level, message));
  },

  _err: function (message) {
    var time = new Date().toTimeString();
    console.error(this._formatMessage(time, 'ERROR', message));
  },

  /**
   * Log debug information
   *
   * @method debug
   * @param {DOMElement} message Message to log
   */
  debug: function (message) {
    if (this.loglevel >= loglevel.DEBUG) {
      this._log('DEBUG', message);
    }
  },

  /**
   * Log information
   *
   * @method info
   * @param {DOMElement} message Message to log
   */
  info: function (message) {
    if (this.loglevel >= loglevel.INFO) {
      this._log('INFO', message);
    }
  },

  /**
   * Log warning information
   *
   * @method warn
   * @param {DOMElement} message Message to log
   */
  warn: function (message) {
    if (this.loglevel >= loglevel.WARNING) {
      this._log('WARNING', message);
    }
  },

  /**
   * Log error information
   *
   * @method error
   * @param {DOMElement} message Message to log
   */
  error: function (message) {
    if (this.loglevel >= loglevel.ERROR) {
      this._err(message);
    }
  }
});

module.exports = Logger;

},{"../util/Class":31}],12:[function(_dereq_,module,exports){
/**
 * @module liveplayer
 */

var EventEmitter = _dereq_('../util/EventEmitter');

/**
 * Base class for LivePlayer UI components
 *
 * @class Component
 * @constructor
 * @extends EventEmitter
 */
var Component = EventEmitter.extend({
  init: function () {
    this.element = document.createElement('div');
  },

  /**
   * Attach component to parent element
   *
   * @method render
   * @param {DOMElement} parentElem Parent element
   */
  render: function (parentElem) {
    parentElem.appendChild(this.element);
  },

  /**
   * Remove component from parent element
   *
   * @method remove
   */
  remove: function () {
    var parent = this.element.parentNode;
    if (parent) {
      parent.removeChild(this.element);
    }
  }
});

module.exports = Component;

},{"../util/EventEmitter":32}],13:[function(_dereq_,module,exports){
var Component = _dereq_('./Component');

var Container = Component.extend({
  init: function () {
    this._super();
    this.children = [];
  },

  addComponent: function (component) {
    this.children.push(component);
  },

  removeComponent: function (component) {
    component.remove();
  },

  render: function (parentElem) {
    var self = this;
    this.children.forEach(function (comp) {
      comp.render(self.element);
    });
    this._super(parentElem);
  },

  remove: function () {
    this.children.forEach(function (comp) {
      comp.remove();
    });
    this._super();
  }
});

module.exports = Container;

},{"./Component":12}],14:[function(_dereq_,module,exports){
var Component = _dereq_('./Component');

var ErrorMessageBox = Component.extend({
  init: function (player) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'error-message-box';

    this.player.bind('error', function (msg) {
      self.element.innerHTML = msg;
    });

    this.player.bind('playing', function (msg) {
      self.element.innerHTML = '';
    });
  }
});

module.exports = ErrorMessageBox;

},{"./Component":12}],15:[function(_dereq_,module,exports){
var Logger = _dereq_('../logging/Logger.js');
var Container = _dereq_('./Container');
var ControlBarContainer = _dereq_('./control-bar/ControlBarContainer');
var ErrorMessageBox = _dereq_('./ErrorMessageBox');
var PosterImage = _dereq_('./PosterImage');
var Spinner = _dereq_('./Spinner');
var PercentLoaded = _dereq_('./PercentLoaded');

var LivePlayerUI = Container.extend({
  init: function (player) {
    this._super();
    var self = this;
    this.logger = new Logger('LivePlayerUI', player.getOption('loglevel'));
    this.logger.debug('Initializing UI');
    this.player = player;
    this.element.className = 'liveplayer-ui';
    this.player.bind('remove', function () { self.remove(); });

    var options = player.getOption('ui');

    if(options.fullscreen){
      this.element.addEventListener('dblclick', function (evt) {
        self.player.trigger('ui:dblclick', evt);
        self.player.toggleFullscreen();
        evt.preventDefault();
      });
    }

    this.element.addEventListener('mousemove', function (evt) {
      var evtObj = {
        mouseX: evt.clientX,
        mouseY: evt.clientY
      };
      self.player.trigger('lp:mousemove', evtObj);
    });

    this.player.bind('mousemove', function(evt) {
      self.player.trigger('lp:mousemove', evt);
    });

    this.addComponent(new ErrorMessageBox(this.player));
    this.addComponent(new Spinner(this.player));
    if(this.player.isVod()) {
      this.addComponent(new PercentLoaded(this.player));
    }
    if (options.videoControls) {
      this.addComponent(new ControlBarContainer(this.player));
    }

    var posterUrl = this.player.getPoster();
    if (posterUrl) {
      this.addComponent(new PosterImage(this.player));
    }
    this.player.bind('poster-added', function () {
      var posterImage = new PosterImage(self.player);
      self.addComponent(new PosterImage(self.player));
      posterImage.render(self.element);
    });
  }
});

module.exports = LivePlayerUI;

},{"../logging/Logger.js":11,"./Container":13,"./ErrorMessageBox":14,"./PercentLoaded":16,"./PosterImage":17,"./Spinner":18,"./control-bar/ControlBarContainer":21}],16:[function(_dereq_,module,exports){
var Component = _dereq_('./Component');

var PercentLoaded = Component.extend({
  init: function(player) {
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'percent-loaded';
    this.element.style.display = 'none';
    this.element.innerHTML = '0 %';
    
    this.player.bind('play', function() {
      self.element.style.display = 'block';
    });
    
    this.player.bind('paused', function() {
      self.element.style.display = 'block';
    });
    
    this.player.bind('stopped', function() {
      self.element.style.display = 'block';
    });

    this.player.bind('playing', function() {
      self.element.style.display = 'none';
    });
  
    this.player.bindOnce('progress', function() {
      window.setTimeout(function(){ 
        var buffered;
        if (self.player.activeVideoHandler.videoElement.buffered &&
            self.player.activeVideoHandler.videoElement) {
          buffered = self.player.activeVideoHandler.videoElement.buffered;
        }
        var bufferedTime;
        if(buffered.length - 1 > 0){
          bufferedTime = buffered.end(buffered.length -1);
        }
        if(bufferedTime == self.player.duration) {
            self.element.innerHTML = '100%';
        }
      }, 100);
    }); 
    
    this.player.bind('progress', function(buffered) {
      if (buffered && self.player.duration > 0) {
        var percent = Math.floor((buffered / self.player.duration) * 100);
        self.element.innerHTML = percent + '%';
      }
    });
  }
});

module.exports = PercentLoaded;

},{"./Component":12}],17:[function(_dereq_,module,exports){
var Component = _dereq_('./Component');

var PosterImage = Component.extend({
  init: function (player, posterUrl) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'poster-image';
    this.imageTag = document.createElement('img');
    this.imageTag.src = this.player.getPoster();
    this.element.appendChild(this.imageTag);

    this.player.bind('playing', function () {
      self.element.style.display = 'none';
    });
    this.player.bind('stopped', function () {
      self.element.style.display = 'block';
    });
  }
});

module.exports = PosterImage;

},{"./Component":12}],18:[function(_dereq_,module,exports){
var Component = _dereq_('./Component');

var Spinner = Component.extend({
  init: function (player) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'spinner';
    this.element.style.display = 'block';

    this.player.bind('play', function() {
      self.element.style.display = 'block';
    });

    this.player.bind('media-player-state-change', function(state) {
      if (state === 'playing') {
        self.element.style.display = 'none';
      } else if (state === 'buffering' || 
                 state === 'stopped' || 
                 state === 'paused') {
        self.element.style.display = 'block';
      }
    });
  }
});

module.exports = Spinner;

},{"./Component":12}],19:[function(_dereq_,module,exports){
var Component = _dereq_('../Component');

var BitrateSelector = Component.extend({
  init: function(player) {
    var self = this;
    this._super();
    this.player = player;
    this.name = 'bitrate-selector';
    this.element.className = 'bitrate-selector';
    this.element.style.display = 'none';
    this.currentBitrate = document.createElement('div');
    this.currentBitrate.className = 'current';
    this.currentBitrate.innerHTML = 'Auto';
    this.bitrateList = document.createElement('div');
    this.bitrateList.className = 'available';
    this.element.appendChild(this.currentBitrate);
    this.element.appendChild(this.bitrateList);

    this.player.bind('is-multibitrate-change', function (isMultiBitrate) {
      if (isMultiBitrate) {
        self.currentBitrateIdx = self.player.getActiveBitrateIdx();
        self.availableBitrates = self.player.getAvailableBitrates();
        self.generateBitrateList();
        self.updateCurrentBitrate();
        self.element.style.display = 'inline-block';
      } else {
        self.element.style.display = 'none';
      }
    });

    this.player.bind('bitrate-switched', function (idx) {
      if (idx !== self.currentBitrateIdx) {
        return;
      }
      self.switching = false;
      self.generateBitrateList();
      self.updateCurrentBitrate();
    });

    this.player.bind('bitrate-switching', function (idx) {
      self.switching = true;
      self.currentBitrate.innerHTML = 'switching...';
      self.currentBitrateIdx = idx;
      self.availableBitrates = self.player.getAvailableBitrates();
      if (self.currentBitrateIdx === -1) {
        self.updateCurrentBitrate();
        self.switching = false;
      }
      self.generateBitrateList();
    });
  },

  generateBitrateList: function () {
    var self = this;
    this.bitrateList.innerHTML = '';
    var ul = document.createElement('ul');
    var bitrates = this.player.getAvailableBitrates();
    /* jshint ignore:start */
    for (var i = bitrates.length-1; i >= 0; i--) {
      (function () {
        var idx = i;
        var li = document.createElement('li');
        li.className = 'bitrate';
        if (idx === self.currentBitrateIdx) {
          li.className += ' active';
        } else {
          if (!self.switching) {
            li.addEventListener('click', function () {
              self.player.setActiveBitrateIdx(idx);
            });
          } else {
            li.className += ' disabled';
          }
        }
        if(bitrates[i] > 999) {
          li.innerHTML = (bitrates[i] / 1000).toFixed(1) + ' Mbps';
        } else {
          li.innerHTML = Math.floor(bitrates[i]) + ' kbps';
        }
        ul.appendChild(li);
      }());
    }
    /* jshint ignore:end */
    var li = document.createElement('li');
    li.className = 'bitrate';
    if (-1 === this.currentBitrateIdx) {
      li.className += ' active';
    } else {
      if (!self.switching) {
        li.addEventListener('click', function () {
          self.player.setActiveBitrateIdx(-1);
        });
      } else {
        li.className += ' disabled';
      }
    }
    li.innerHTML = 'Auto';
    ul.appendChild(li);
    this.bitrateList.appendChild(ul);
  },

  updateCurrentBitrate: function () {
    console.log('bitrateSelector: updateCurrentBitrate');
    var idx = this.currentBitrateIdx;
    var string = '';
    if (idx === -1) {
      string += 'Auto';
    } else if (this.availableBitrates[idx] > 999) {
      string += (this.availableBitrates[idx] / 1000).toFixed(1) + ' Mbps';
    } else {
      string += this.availableBitrates[idx] + ' kbps';
    }
    this.currentBitrate.innerHTML = string;
  }
});

module.exports = BitrateSelector;

},{"../Component":12}],20:[function(_dereq_,module,exports){
var bowser = _dereq_('bowser');

var Container = _dereq_('../Container');
var PlayButton = _dereq_('./PlayButton');
var StopButton = _dereq_('./StopButton');
var ControlBarRight = _dereq_('./ControlBarRight');
var SeekBar = _dereq_('./SeekBar');
var PlaybackTime = _dereq_('./PlaybackTime');

var ControlBar = Container.extend({
  init: function(player) {
    this._super();
    var self = this,
    timeoutID = null,
    mouseIsOverControls = false;
    this.player = player;
    this.element = document.createElement('div');
    self.element.className = 'control-bar';
    this.player.controlBar = self;
    
    if(self.player.isVod()) {
      self.element.classList.add('vod');
    }
    
    this.hideControls = function() {
      self.element.classList.add('hidden');
    };

    this.setHideTimeout = function() {
      window.clearTimeout(timeoutID);
      var hideDelay = self.player.getOption('ui').controlBarHideDelay * 1000;
      timeoutID = window.setTimeout(self.hideControls, hideDelay);
    };

    this.element.addEventListener('mouseenter', function() {
      self.element.classList.remove('hidden');
      mouseIsOverControls = true;
      window.clearTimeout(timeoutID);
    });

    this.player.bind('lp:mousemove', function(){
      if(!mouseIsOverControls){
        self.element.classList.remove('hidden');
        self.setHideTimeout();
      }
    });

    this.element.addEventListener('mouseleave', function() {
      mouseIsOverControls = false;
      self.setHideTimeout();
    });

    this.player.bind('playing', function(){
      self.setHideTimeout();
    });

    this.element.addEventListener('mouseleave', function() {
      mouseIsOverControls = false;
      self.setHideTimeout();
    });

    this.player.bind('playing', function(){
      self.setHideTimeout();
    });

    this.player.bind('media-player-state-change', function(state) {
      if (state === 'playing') {
        self.player.duration = self.player.getDuration();
        if(self.player.isVod() && !document.getElementById('playback-time')) {
          var seekBar = new SeekBar(self.player);
          var playbackTime = new PlaybackTime(self.player);
          self.addComponent(playbackTime);
          self.addComponent(seekBar);
          seekBar.render(self.element);
          playbackTime.render(self.element);
        }
      }
    });

    this.addComponent(new PlayButton(this.player));
    this.addComponent(new ControlBarRight(this.player));
  }
});

module.exports = ControlBar;

},{"../Container":13,"./ControlBarRight":22,"./PlayButton":25,"./PlaybackTime":26,"./SeekBar":27,"./StopButton":29,"bowser":1}],21:[function(_dereq_,module,exports){
var Container = _dereq_('../Container');
var ControlBar = _dereq_('./ControlBar');

var ControlBarContainer = Container.extend({
  init: function(player) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    self.element.className = 'control-bar-container';
    
    if(self.player.isVod()){
      self.element.classList.add('vod');
    }
    this.addComponent(new ControlBar(this.player));
  }
});

module.exports = ControlBarContainer;

},{"../Container":13,"./ControlBar":20}],22:[function(_dereq_,module,exports){
var bowser = _dereq_('bowser');

var Container = _dereq_('../Container');
var FullscreenButton = _dereq_('./FullscreenButton');
var VolumeSlider = _dereq_('./VolumeSlider');
var MuteButton = _dereq_('./MuteButton');
var BitrateSelector = _dereq_('./BitrateSelector');
var SimpleBitrateSelector = _dereq_('./SimpleBitrateSelector');
var SeekBar = _dereq_('./SeekBar');

var ControlBarRight = Container.extend({
  init: function(player) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'control-bar-right';
    this.name = 'control-bar-right';

    if(this.player.options.simpleBitrate) {
      this.addComponent(new SimpleBitrateSelector(this.player));
    } else {
      this.addComponent(new BitrateSelector(this.player));
    }
    this.addComponent(new MuteButton(this.player));
    if (!(bowser.browser.msie && bowser.browser.version < 10)) {
      this.addComponent(new VolumeSlider(this.player));
    }
    if (player.getOption('ui').fullscreen) {
      this.addComponent(new FullscreenButton(this.player));
    }
    
  }
});

module.exports = ControlBarRight;

},{"../Container":13,"./BitrateSelector":19,"./FullscreenButton":23,"./MuteButton":24,"./SeekBar":27,"./SimpleBitrateSelector":28,"./VolumeSlider":30,"bowser":1}],23:[function(_dereq_,module,exports){
var Component = _dereq_('../Component');
var supportsFullscreen = _dereq_('../../util/supportsFullscreen');

var FullscreenButton = Component.extend({
  init: function (player) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'mega-octicon octicon-screen-full full-screen-button';
    this.showFullscreenButton = false;
    this.name = "full-screen-button";

    this.element.addEventListener('click', function () {
      self.player.toggleFullscreen();
    });

    if(supportsFullscreen()){
      this.element.style.display = 'inline-block'; 
    } else {
      this.element.style.display = 'none';
    }

  }
});

module.exports = FullscreenButton;

},{"../../util/supportsFullscreen":35,"../Component":12}],24:[function(_dereq_,module,exports){
var Component = _dereq_('../Component');

var MuteButton = Component.extend({
  init: function(player) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'mega-octicon octicon-unmute mute-button';
    this.prevVolume = this.player.getVolume();
    this.name = 'mute-button';

    this.player.bind('volumechange', function() {
      if(self.player.getVolume() > 0) {
        self.prevVolume = self.player.audioVolume;
        self.element.className = 'mega-octicon octicon-unmute';
      }else{
        self.element.className = 'mega-octicon octicon-mute';
      }
    });

    this.element.addEventListener('click', function() {
      self.toggleMute();
    });
  },

  toggleMute: function () {
    var self = this;
    if(self.player.getVolume() === 0) {
      self.player.setVolume(self.prevVolume);
    }else{
      self.player.setVolume(0);
    }
  }
});

module.exports = MuteButton;

},{"../Component":12}],25:[function(_dereq_,module,exports){
var Component = _dereq_('../Component');

var PlayButton = Component.extend({
  init: function (player) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'mega-octicon octicon-playback-play play-button';
    this.name = 'play-button';

    this.togglePlaying = function () {
      self.player.play();
    };

    this.player.bind('playing', function () {
      self.element.className = 'mega-octicon octicon-playback-pause';
      if (self.player.isVod()) {
        self.togglePlaying = function () {
          self.player.pause();
        };
      } else {
        self.togglePlaying = function () {
          self.player.stop();
        };
      }
    });

    this.player.bind('stopped', function () {
      self.element.className = 'mega-octicon octicon-playback-play';
      self.togglePlaying = function () {
        self.player.play();
      };
    });

    this.player.bind('paused', function () {
      self.element.className = 'mega-octicon octicon-playback-play';
      self.togglePlaying = function () {
        self.player.play();
      };
    });

    this.element.addEventListener('click', function () {
      self.togglePlaying();
    });
  }
});

module.exports = PlayButton;

},{"../Component":12}],26:[function(_dereq_,module,exports){
/**
 * playback time for video on demand
 */
var Component = _dereq_('../Component');
var zpad = _dereq_('zpad');

var PlaybackTime = Component.extend({
  init: function(player) {
    this._super();
    var self = this;
    this.player = player;
    this.element = document.createElement('div');
    this.element.id = 'playback-time';
    this.name = 'playback-time';

    this.formatTime = function(seconds) {
      var hours = zpad(parseInt( seconds / 3600 ) % 24);
      var minutes = zpad(parseInt( seconds / 60 ) % 60);
      var secs = zpad(seconds % 60);
      var str = hours + ':' + minutes + ':' + secs;

      return str;
    };

    this.player.bind('timeupdate', function(time){
      self.element.innerHTML = self.formatTime(Math.floor(time)) +
        ' / ' +
        self.formatTime(Math.floor(self.player.duration));
    });
  }
});

module.exports = PlaybackTime;

},{"../Component":12,"zpad":7}],27:[function(_dereq_,module,exports){
var Component = _dereq_('../Component');
var zpad = _dereq_('zpad');

var SeekBar = Component.extend({
  init: function(player) {
    this._super();
    var self = this;
    var timeHandleMousedown = false;
    this.name = 'seek-bar';
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'seekBar';
    this.bufferBar = document.createElement('div');
    this.bufferBar.className = 'bufferBar';
    this.bufferAmount = document.createElement('span');
    this.bufferAmount.id = 'buffered-amount';
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'progressBar';
    this.progressAmount = document.createElement('span');
    this.progressAmount.id = 'progress-amount';
    this.timeHandle = document.createElement('span');
    this.timeHandle.id = 'time-handle';
    this.timeDisplay = document.createElement('span');
    this.timeDisplay.id = 'time-display';
    this.timeDisplay.classList.add('hidden');

    this.timeHandle.appendChild(this.timeDisplay);
    this.progressAmount.appendChild(this.timeHandle);
    this.bufferBar.appendChild(this.bufferAmount);
    this.progressBar.appendChild(this.progressAmount);

    this.element.appendChild(this.bufferBar);
    this.element.appendChild(this.progressBar);
    
    this.formatTime = function(seconds) {
      var hours = zpad(parseInt( seconds / 3600 ) % 24);
      var minutes = zpad(parseInt( seconds / 60 ) % 60);
      var secs = zpad(seconds % 60);
      str = hours + ':' + minutes + ':' + secs;
      return str;
    };
    
    // If the video is already buffered
    var buffered = this.player.activeVideoHandler.videoElement.buffered;
    var bufferedTime = buffered.end(buffered.length -1);
    if(bufferedTime == this.player.duration) {
        self.bufferAmount.style.width = "100%";
    }

    // buffer bar
    this.player.bind('progress', function(buffered) {
      if(self.player.duration > 0) {
        self.bufferAmount.style.width = (buffered / self.player.duration) * 100 + "%";
      }
    });
    
    // time bar
    this.player.bind('timeupdate', function(currentTime) {
      if(!timeHandleMousedown) {
        self.progressAmount.style.width = 
          ((currentTime / self.player.duration) * 100) + "%";
      }
      self.timeDisplay.innerHTML = self.formatTime(Math.floor(currentTime));
    });
    
    // mouse events
    function mouseEventHandler(evt) {
      if((evt.clientX - self.progressBar.getBoundingClientRect().left) - 
         (self.element.offsetWidth * 0.01) < self.element.getBoundingClientRect().right ||
         (evt.clientX - self.progressBar.getBoundingClientRect().left) - 
         (self.element.offsetWidth * 0.01) > 0
        ){
        var mouseXinPlayer = evt.clientX - self.progressBar.getBoundingClientRect().left;
        self.player.setCurrentTime(
          self.player.duration * 
         (mouseXinPlayer / self.progressBar.clientWidth)
        );
      }
    }
    
    this.timeHandle.addEventListener('mousedown', function(evt) {
      timeHandleMousedown = true;
    });
    
    this.timeHandle.addEventListener('mouseup', function(evt) {
      self.timeDisplay.classList.add('hidden');
    });

    this.timeHandle.addEventListener('mouseover', function(evt) {
      self.timeDisplay.classList.remove('hidden');
    });
    
    this.player.bind('lp:mousemove', function(evtObj) {
      if(timeHandleMousedown) {
        var mouseXinPlayer = evtObj.mouseX - self.progressBar.getBoundingClientRect().left;
        self.progressAmount.style.width = 
          (mouseXinPlayer / self.progressBar.clientWidth) * 100 + '%';
        self.player.setCurrentTime(self.player.getDuration() * 
                                  (mouseXinPlayer / self.progressBar.clientWidth));
        self.timeDisplay.classList.remove('hidden');
      }
    });

    document.addEventListener('mouseup', function(evt) {
      if(timeHandleMousedown) {
        timeHandleMousedown = false;
        mouseEventHandler(evt);
        window.setTimeout(function(){
          self.timeDisplay.classList.add('hidden');
        },2000);
      }
    });

    this.element.addEventListener('mousedown', function(evt){
      mouseEventHandler(evt);
    });

    this.bufferAmount.addEventListener('mousedown', function(evt) {
      mouseEventHandler(evt);
    });

    this.progressAmount.addEventListener('mousedown', function(evt) {
      mouseEventHandler(evt);
    });

    this.element.addEventListener('mousemove', function(evt) {
      var evtObj = {
        mouseX: evt.clientX,
        mouseY: evt.clientY
      };
      self.player.trigger('mouse-move', evtObj);
    });

  }
});

module.exports = SeekBar;

},{"../Component":12,"zpad":7}],28:[function(_dereq_,module,exports){
var Component = _dereq_('../Component');

var SimpleBitrateSelector = Component.extend({
  init: function(player) {
    var self = this;
    this._super();
    this.name = 'bitrate-selector';
    this.player = player;
    this.options = player.options;
    this.element.className = 'bitrate-selector';
    this.element.style.display = 'none';
    this.currentBitrate = document.createElement('div');
    this.currentBitrate.className = 'current';
    this.currentBitrate.innerHTML = 'Auto';
    this.bitrateList = document.createElement('div');
    this.bitrateList.className = 'available';
    this.element.appendChild(this.currentBitrate);
    this.element.appendChild(this.bitrateList);

    if(this.options.simpleBitrate && this.options.simpleBitrate.button) {
      if(this.options.simpleBitrate.button.img) {
        this.element.style.background =
          'url(' + this.options.simpleBitrate.button.img + ')';
      }
    }

    if(this.options.simpleBitrate && this.options.simpleBitrate.SDpriority) {
      this.player.setActiveBitrateIdx(0);
    } else if (this.options.simpleBitrate) {
      this.player.setActiveBitrateIdx(1);
    } 

    this.player.bind('is-multibitrate-change', function (isMultiBitrate) {
      if (isMultiBitrate) {
        self.currentBitrateIdx = self.player.getActiveBitrateIdx();
        self.availableBitrates = self.player.getAvailableBitrates();
        self.generateBitrateList();
        self.updateCurrentBitrate();
        self.element.style.display = 'inline-block';
      } else {
        self.element.style.display = 'none';
      }
    });

    this.player.bind('bitrate-switched', function (idx) {
      if (idx !== self.currentBitrateIdx) {
        return;
      }
      self.switching = false;
      self.generateBitrateList();
      self.updateCurrentBitrate();
    });

    this.player.bind('bitrate-switching', function (idx) {
      self.switching = true;
      self.currentBitrate.innerHTML = "switching...";
      self.currentBitrateIdx = idx;
      self.availableBitrates = self.player.getAvailableBitrates();
      if (self.currentBitrateIdx === -1) {
        self.updateCurrentBitrate();
        self.switching = false;
      }
      self.generateBitrateList();
    });
  },

  generateBitrateList: function () {
    var self = this;
    this.bitrateList.innerHTML = '';
    var ul = document.createElement('ul');
    var bitrates = this.player.getAvailableBitrates();
    birates = bitrates.sort(function(a,b) {
      if (a < b) {
        return -1;
      }
      if(a > b) {
        return 1;
      }
      return 0;
    });
    /* jshint ignore:start */
    for (var i = bitrates.length-1; i >= 0; i--) {
      (function () {
        var idx = i;
        var li = document.createElement('li');
        li.className = 'bitrate';
        if (idx === self.currentBitrateIdx) {
          li.className += ' active';
        } else {
          if (!self.switching) {
            li.addEventListener('click', function () {
              self.player.setActiveBitrateIdx(idx);
            });
          } else {
            li.className += ' disabled';
          }
        }
        if(self.options.simpleBitrate && i === 0) {
          li.innerHTML = 'SD';
        } else if (self.options.simpleBitrate && i === 1) {
          li.innerHTML = 'HD';
        }
        ul.appendChild(li);
      }());
    }
    /* jshint ignore:end */
    var li = document.createElement('li');
    li.className = 'bitrate';
    if (-1 === this.currentBitrateIdx) {
      li.className += ' active';
    } else {
      if (!self.switching) {
        li.addEventListener('click', function () {
          self.player.setActiveBitrateIdx(-1);
        });
      } else {
        li.className += ' disabled';
      }
    }
    ul.appendChild(li);
    this.bitrateList.appendChild(ul);
  },

  updateCurrentBitrate: function () {
    var idx = this.currentBitrateIdx;
    var string = '';
    if(idx === 0) {
      string = 'SD'; 
    } else if(idx === 1) {
      string = 'HD';
    } else if(idx === -1) {
      string += ' Auto';
    } else {
      string = 'Auto';
    }
    this.currentBitrate.innerHTML = string;
  }
});

module.exports = SimpleBitrateSelector;

},{"../Component":12}],29:[function(_dereq_,module,exports){
var Component = _dereq_('../Component');

var StopButton = Component.extend({
  init: function (player) {
    this._super();
    var self = this;
    this.name = 'stop-button';
    this.player = player;
    this.element = document.createElement('div');
    this.element.className = 'mega-octicon octicon-primitive-square stop-button';

    this.element.addEventListener('click', function () {
      self.player.stop();
    });
  }
});

module.exports = StopButton;

},{"../Component":12}],30:[function(_dereq_,module,exports){
var Component = _dereq_('../Component');

var VolumeSlider = Component.extend({
  init: function(player) {
    this._super();
    var self = this;
    this.name = 'volume-slider';
    this.player = player;
    this.element = document.createElement('input');
    this.element.type = 'range';
    this.element.min = '0';
    this.element.max = '100';
    this.element.step = '1';
    this.element.value = this.player.getVolume();
    this.element.className = 'volumeSlider volume-slider';

    this.setVolume = function(volume) {
      self.player.setVolume(volume);
    };

    this.element.addEventListener('change', function(){
      self.player.setVolume(self.element.value);
    });

    this.player.bind('volumechange', function() {
      self.element.value = self.player.getVolume();
    });
  }
});

module.exports = VolumeSlider;

},{"../Component":12}],31:[function(_dereq_,module,exports){
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
var initializing = false, fnTest = /xyz/.test(function(){var xyz;}) ? /\b_super\b/ : /.*/;

// The base Class implementation (does nothing)
var Class = function(){};

// Create a new Class that inherits from this class
Class.extend = function(prop) {
  var _super = this.prototype;

  // Instantiate a base class (but only create the instance,
  // don't run the init constructor)
  initializing = true;
  var prototype = new this();
  initializing = false;

  /*jshint -W083 */
  // Copy the properties over onto the new prototype
  for (var name in prop) {
    // Check if we're overwriting an existing function
    prototype[name] = typeof prop[name] == "function" &&
      typeof _super[name] == "function" && fnTest.test(prop[name]) ?
      (function(name, fn){
      return function() {
        var tmp = this._super;

        // Add a new ._super() method that is the same method
        // but on the super-class
        this._super = _super[name];

        // The method only need to be bound temporarily, so we
        // remove it when we're done executing
        var ret = fn.apply(this, arguments);
        this._super = tmp;

        return ret;
      };
    })(name, prop[name]) :
      prop[name];
  }

  // The dummy class constructor
  function Class() {
    // All construction is actually done in the init method
    if ( !initializing && this.init )
      this.init.apply(this, arguments);
  }

  // Populate our constructed prototype object
  Class.prototype = prototype;

  // Enforce the constructor to be what we expect
  Class.prototype.constructor = Class;

  // And make this class extendable
  Class.extend = arguments.callee;

  return Class;
};

module.exports = Class;

},{}],32:[function(_dereq_,module,exports){
/**
 * LivePlayer utility classes & functions
 * @module liveplayer
 * @submodule util
 */

var MicroEvent = _dereq_('microevent');
var Class = _dereq_('./Class');

/**
 * EventEmitter with support for event bubbling.
 * Based on <a href="http://notes.jetienne.com/2011/03/22/microeventjs.html">MicroEvent</a>.
 *
 * @class EventEmitter
 */

/**
 * Bind callback to event type.
 *
 * @method bind
 * @param {String} event The event name to bind to
 * @param {Function} callback
 */

/**
 * Remove callback for event type.
 *
 * @method unbind
 * @param {String} event Event name
 * @param {Function} callback
 */

var EventEmitter = Class.extend({
  /**
   * Set parent for event emitter. (To allow bubbling of events)
   *
   * @method setParent
   * @param {EventEmitter} parent The element to bubble events to
   */
  setParent: function(parent) {
     this.parent = parent;
  },

  /**
   * Listen for first occurence of an event type.
   *
   * @method bindOnce
   * @param {string} event The event name to listen to
   * @param {Function} callback
   */
  bindOnce: function(event, callback) {
    this.bind(event, function proxy () {
      callback.apply([].concat(arguments));
      this.unbind(event, proxy);
    });
  }
});

MicroEvent.mixin(EventEmitter);

/**
 * Trigger event
 *
 * @method trigger
 * @param {String} event Event name
 * @param {Any} [parameters]*
 */
EventEmitter.prototype.trigger = function(evt){
  MicroEvent.prototype.trigger.apply(this, arguments);
  if(this.parent) {
    this.parent.trigger.apply(this.parent, arguments);
  } 
};

module.exports = EventEmitter;

},{"./Class":31,"microevent":6}],33:[function(_dereq_,module,exports){
/*
Copyright (c) Copyright (c) 2007, Carl S. Yestrau All rights reserved.
Code licensed under the BSD License: http://www.featureblend.com/license.txt
Version: 1.0.4
*/
/* jshint ignore:start */
var FlashDetect = new function(){
    var self = this;
    self.installed = false;
    self.raw = "";
    self.major = -1;
    self.minor = -1;
    self.revision = -1;
    self.revisionStr = "";
    var activeXDetectRules = [
        {
            "name":"ShockwaveFlash.ShockwaveFlash.7",
            "version":function(obj){
                return getActiveXVersion(obj);
            }
        },
        {
            "name":"ShockwaveFlash.ShockwaveFlash.6",
            "version":function(obj){
                var version = "6,0,21";
                try{
                    obj.AllowScriptAccess = "always";
                    version = getActiveXVersion(obj);
                }catch(err){}
                return version;
            }
        },
        {
            "name":"ShockwaveFlash.ShockwaveFlash",
            "version":function(obj){
                return getActiveXVersion(obj);
            }
        }
    ];
    /**
     * Extract the ActiveX version of the plugin.
     * 
     * @param {Object} The flash ActiveX object.
     * @type String
     */
    var getActiveXVersion = function(activeXObj){
        var version = -1;
        try{
            version = activeXObj.GetVariable("$version");
        }catch(err){}
        return version;
    };
    /**
     * Try and retrieve an ActiveX object having a specified name.
     * 
     * @param {String} name The ActiveX object name lookup.
     * @return One of ActiveX object or a simple object having an attribute of activeXError with a value of true.
     * @type Object
     */
    var getActiveXObject = function(name){
        var obj = -1;
        try{
            obj = new ActiveXObject(name);
        }catch(err){
            obj = {activeXError:true};
        }
        return obj;
    };
    /**
     * Parse an ActiveX $version string into an object.
     * 
     * @param {String} str The ActiveX Object GetVariable($version) return value. 
     * @return An object having raw, major, minor, revision and revisionStr attributes.
     * @type Object
     */
    var parseActiveXVersion = function(str){
        var versionArray = str.split(",");//replace with regex
        return {
            "raw":str,
            "major":parseInt(versionArray[0].split(" ")[1], 10),
            "minor":parseInt(versionArray[1], 10),
            "revision":parseInt(versionArray[2], 10),
            "revisionStr":versionArray[2]
        };
    };
    /**
     * Parse a standard enabledPlugin.description into an object.
     * 
     * @param {String} str The enabledPlugin.description value.
     * @return An object having raw, major, minor, revision and revisionStr attributes.
     * @type Object
     */
    var parseStandardVersion = function(str){
        var descParts = str.split(/ +/);
        var majorMinor = descParts[2].split(/\./);
        var revisionStr = descParts[3];
        return {
            "raw":str,
            "major":parseInt(majorMinor[0], 10),
            "minor":parseInt(majorMinor[1], 10), 
            "revisionStr":revisionStr,
            "revision":parseRevisionStrToInt(revisionStr)
        };
    };
    /**
     * Parse the plugin revision string into an integer.
     * 
     * @param {String} The revision in string format.
     * @type Number
     */
    var parseRevisionStrToInt = function(str){
        return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
    };
    /**
     * Is the major version greater than or equal to a specified version.
     * 
     * @param {Number} version The minimum required major version.
     * @type Boolean
     */
    self.majorAtLeast = function(version){
        return self.major >= version;
    };
    /**
     * Is the minor version greater than or equal to a specified version.
     * 
     * @param {Number} version The minimum required minor version.
     * @type Boolean
     */
    self.minorAtLeast = function(version){
        return self.minor >= version;
    };
    /**
     * Is the revision version greater than or equal to a specified version.
     * 
     * @param {Number} version The minimum required revision version.
     * @type Boolean
     */
    self.revisionAtLeast = function(version){
        return self.revision >= version;
    };
    /**
     * Is the version greater than or equal to a specified major, minor and revision.
     * 
     * @param {Number} major The minimum required major version.
     * @param {Number} (Optional) minor The minimum required minor version.
     * @param {Number} (Optional) revision The minimum required revision version.
     * @type Boolean
     */
    self.versionAtLeast = function(major){
        var properties = [self.major, self.minor, self.revision];
        var len = Math.min(properties.length, arguments.length);
        for(var i=0; i<len; i++){
            if(properties[i]>=arguments[i]){
                if(i+1<len && properties[i]==arguments[i]){
                    continue;
                }else{
                    return true;
                }
            }else{
                return false;
            }
        }
    };
    /**
     * Constructor, sets raw, major, minor, revisionStr, revision and installed public properties.
     */
    self.FlashDetect = function(){
        if(navigator.plugins && navigator.plugins.length>0){
            var type = 'application/x-shockwave-flash';
            var mimeTypes = navigator.mimeTypes;
            if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
                var version = mimeTypes[type].enabledPlugin.description;
                var versionObj = parseStandardVersion(version);
                self.raw = versionObj.raw;
                self.major = versionObj.major;
                self.minor = versionObj.minor; 
                self.revisionStr = versionObj.revisionStr;
                self.revision = versionObj.revision;
                self.installed = true;
            }
        }else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
            var version = -1;
            for(var i=0; i<activeXDetectRules.length && version==-1; i++){
                var obj = getActiveXObject(activeXDetectRules[i].name);
                if(!obj.activeXError){
                    self.installed = true;
                    version = activeXDetectRules[i].version(obj);
                    if(version!=-1){
                        var versionObj = parseActiveXVersion(version);
                        self.raw = versionObj.raw;
                        self.major = versionObj.major;
                        self.minor = versionObj.minor; 
                        self.revision = versionObj.revision;
                        self.revisionStr = versionObj.revisionStr;
                    }
                }
            }
        }
    }();
};
FlashDetect.JS_RELEASE = "1.0.4";
/* jshint ignore:end */

module.exports = FlashDetect;

},{}],34:[function(_dereq_,module,exports){
var LivePlayerUtil = {
  getRandomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  toggleFullscreen: function (elem) {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement ) {  
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
};

module.exports = LivePlayerUtil;

},{}],35:[function(_dereq_,module,exports){
var supportsFullscreen = function() {
  var elem = document.createElement('div');
  if (elem.requestFullscreen) {
    return true;
  } else if (elem.msRequestFullscreen) {
    return true;
  } else if (elem.mozRequestFullScreen) {
    return true;
  } else if (elem.webkitRequestFullscreen) {
    return true;
  } else {
    return false;
  }
};

module.exports = supportsFullscreen;

},{}],36:[function(_dereq_,module,exports){
var VideoHandlerBase = _dereq_('../VideoHandlerBase');
window.dijon = _dereq_('dashjs').dijon;

var Dash = VideoHandlerBase.extend({
  init: function (elem, readyCb, player) {
    var self = this;
    this.player = player;
    this._super(elem, readyCb, player);
    this.element = elem;
    this.videoElement = document.createElement('video');
    this.activeBitrateIdx = -1;
    this.activeBitrate = false;
    elem.className = 'dash';
    elem.appendChild(this.videoElement);
    this.playState = false;
    this.videoElement.addEventListener('volumechange', function(){
      self.trigger('volumechange', self.getVolume());
    });
    
    this.videoElement.addEventListener('playing', function() {
      self.playState = 'playing';
      self.trigger('media-player-state-change', 'playing');
      self.trigger('playing');
    });
    
    this.videoElement.addEventListener('pause', function() {
      self.playState = 'stopped';
      self.trigger('media-player-state-change', 'stopped');
      self.trigger('stopped');
    });
    
    this.videoElement.addEventListener('error', function(evt){
      if (evt.target.src) {
        self.trigger('error', 'Unable to load: ' + evt.target.src);
      } else {
        self.trigger('error', 'Unable to load video');
      }
    }, true);
    
    this.videoElement.addEventListener('canplaythrough', function(evt){
      self.trigger('stream-loaded', evt.target.currentSrc);
      self.trigger('is-multibitrate-change', self.isMultiBitrate());
    });
    
    this.videoElement.addEventListener('loadstart', function() {
      self.trigger('loadstart');
    });
    
    this.videoElement.addEventListener('play', function() {
      self.playState = 'playing';
      self.trigger('play');
    });
    
    this.videoElement.addEventListener('progress', function(evt) {
      if((evt.target.buffered.length - 1) >= 0) {
        self.trigger('progress', 
                     evt.target.buffered.end(evt.target.buffered.length - 1));
      }
    });
    
    this.videoElement.addEventListener('timeupdate', function(evt) {
      self.trigger('timeupdate', evt.target.currentTime);
    });

    this.dashContext = new window.Dash.di.DashContext();
    this.dashPlayer = new window.MediaPlayer(this.dashContext);
    this.dashPlayer.startup();
    this.dashPlayer.setAutoPlay(false);
    this.dashPlayer.debug.setLogToBrowserConsole(false);
    this.dashPlayer.attachView(this.videoElement);

    window.setTimeout(function() {
      self.dashPlayer.addEventListener(MediaPlayer.events.METRIC_CHANGED, function(ev) {
        console.log(self.activeBitrateIdx, self.dashPlayer.getQualityFor('video'));
        if(self.activeBitrateIdx !== self.dashPlayer.getQualityFor('video')) {
          var idx = self.getActiveBitrateIdx();
          self.trigger('bitrate-switched', idx);
        } else {
          console.log('Dash activeBitrateIdx', self.getActiveBitrateIdx());
          //self.activeBitrate = self.getAvailableBitrates;
        }
      });
    }, 500);
    
    document.addEventListener('mousemove', function(evt) {
        var evtObj = {
          mouseX: evt.clientX,
          mouseY: evt.mouseY
        };
        self.trigger('mouse-move', evtObj);
      });

    if (typeof readyCb === 'function') {
      setTimeout(readyCb, 0);
    }
  },

  load: function (url, type) {
    this._super(url, type);
    this.dashPlayer.attachSource(url);
  },

  play: function () {
    this.videoElement.play();
  },

  pause: function() {
    this.videoElement.pause();
  },

  // no stop method on the <video> element
  stop: function () {
    this.videoElement.pause();
    this.videoElement.currentTime = 0;
  },

  setVolume: function (volume) {
    this.videoElement.volume = volume/100;
  },

  getVolume: function () {
    return this.videoElement.volume*100;
  },

  getCurrentTime: function () {
   return this.videoElement.currentTime;
  },

  remove: function () {
    this.element.removeChild(this.videoElement);
  },

  getName: function () {
    return 'dash';
  },

  setLooping: function(willLoop) {
    this.videoElement.setAttribute('loop', 'true');
  },

  isVod: function () {
    if(this.player.options.vod === null) {
      if (this.videoElement.seekable) {
        return true;
      } else {
        return false;
      }
    } else {
      return this.player.options.vod;
    }
  },

  getDuration: function () {
    if(this.videoElement) {
      return this.videoElement.duration;
    }
  },

  setCurrentTime: function (seconds) {
    if(this.videoElement) {
      this.videoElement.currentTime = seconds;
    }
  },

  getPlayState : function () {
    return this.playState;
  },

  getDashDebug: function () {
    return this.dashPlayer.getDebug();
  },

  isMultiBitrate: function () {
    if (this.dashPlayer.getBitrateInfoListFor('video').length > 1) {
      return true;
    }else{
      return false;
    }
  },

  getAvailableBitrates: function() {
    var infoList = this.dashPlayer.getBitrateInfoListFor('video');
    var array = [];
    for(var i = 0; i < infoList.length; i++) {
      array.push(Math.round(infoList[i].bitrate / 1000));
    }
    return array;
  },

  getSelectedBitrateIndex: function() {
    var infoList = this.dashPlayer.getBitrateInfoListFor('video');
    var activeBitRate = this.dashPlayer.getQualityFor('video');
    for(var i = 0; i < infoList.length; i++) {
      if(infoList[i] === activeBitRate) {
        return i;
      }
    }
  },
  
  setActiveBitrateIdx: function (idx) {
    var bitrate;
    if (idx === -1) {
      bitrate = 'Auto';
    } else {
      bitrate = this.getAvailableBitrates()[idx] + ' kbit/s';
    }
    this.logger.debug('Bitrate switching to ' + bitrate);
    this.trigger('bitrate-switching', idx);
    this.activeBitrateIdx = idx;
    this.setSelectedBitrateIndex(idx);
  },

  setSelectedBitrateIndex: function(idx) {
    if(idx === -1) {
      this.logger.debug('Enabling auto switching');
      if(!this.dashPlayer.getAutoSwitchQuality()) {
        this.dashPlayer.setAutoSwitchQuality(true);
      }
    } else {
      if(this.dashPlayer.getAutoSwitchQuality()) {
        this.logger.debug('Disabling auto switching');
        this.dashPlayer.setAutoSwitchQuality(false);
      }
      this.activeBitrateIdx = idx;
      this.dashPlayer.setQualityFor('video', idx);
    }
  },

  getActiveBitrateIdx: function () {
    return this.activeBitrateIdx;
  }
});

Dash.isSupportedByPlatform = function () {
  return !!document.createElement('video').canPlayType;
};

Dash.canHandleStream = function (url, type) {
  if (type === 'application/dash+xml') {
    return true;
  } else {
    var re = new RegExp('^http(s)?://.*(mpd)');
    return re.test(url);
  }
};

module.exports = Dash;

},{"../VideoHandlerBase":9,"dashjs":2}],37:[function(_dereq_,module,exports){
var srplayer = window.srplayer = _dereq_('../../vendor/srplayer/srplayer');
var FlashDetect = _dereq_('../util/FlashDetect');
var VideoHandlerBase = _dereq_('../VideoHandlerBase');
var LivePlayerUtil = _dereq_('../util/LivePlayerUtil');

var Flash = VideoHandlerBase.extend({
  init: function (elem, readyCb, player) {
    var self = this;
    this._super(elem, readyCb, player);
    this.elem = elem;
    this.player = player;
    this.activeBitrateIdx = -1;
    elem.id = 'srplayer-' + LivePlayerUtil.getRandomInt(1, 100000);
    elem.className = 'flash';
    this.srplayer = srplayer(elem.id);
    this.srplayer.setup({
      swf: this.player.getOption('swf'),
      edgeServerIpDetection: this.player.getOption('edgeServerIpDetection'),
      autoDynamicStreamSwitch: this.player.getOption('simpleBitrate')
    });

    if(this.player.hasLayer('ui')) {
      this.player.removeLayer('ui');
    }

    this.srplayer.bind('player-init', readyCb);

    this.srplayer.bind('media-state-change', function (state) {
      if (state === 'playing' || state === 'stopped' || state === 'paused') {
        self.trigger(state);
      }
    });

    this.srplayer.bind('media-player-state-change', function(state) {
      self.trigger('media-player-state-change', state);
      self.trigger(state);
    });

    this.srplayer.bind('media-error', function (error) {
      self.trigger('error', error);
    });

    this.srplayer.bind('current-time-update', function (time) {
      self.trigger('timeupdate', time);
    });

    this.srplayer.bind('volume-change', function (volume) {
      self.trigger('volumechange', self.getVolume());
    });

    this.srplayer.bind('is-dynamic-change', function (isDynamic) {
      self.trigger('is-multibitrate-change', isDynamic);
    });

    this.srplayer.bind('bitrate-switch', function (bitrateIdx) {
      var bitrate = self.getAvailableBitrates()[bitrateIdx];
      self.logger.debug('Switched bitrate to ' + bitrate + ' kbit/s');
      self.trigger('bitrate-switched', bitrateIdx);
    });

    this.srplayer.bind('sr:mousemove', function(mouseX, mouseY){
      var evtObj = {
        mouseX: mouseX,
        mouseY: mouseY
      };
      self.trigger('mouse-move', evtObj);
    });

    this.srplayer.bind('current-time-change', function (currentTime){
      self.trigger('current-time-change', currentTime);
    }); 

    this.srplayer.bind('can-seek-change', function (canSeek){
      self.trigger('can-seek-change', canSeek);
    });

    this.srplayer.bind('connection-lost', function (){
      self.trigger('connection-lost');
    });

    this.srplayer.bind('smil-parse-error', function (){
      self.logger.error('SMIL parse error. The SMIL file is empty or not in the correct format');
      self.trigger('smil-parse-error');
    });
  },

  _fetchStream: function(url, type, options) {
    var self = this;
    var smilRe = /smil/;
    var hlsRe = /x-mpegURL/;
    this.currentUrl = url;
    this.activeStream = {
      type: type,
      options: options
    };
    if (smilRe.test(type)) {
      this.logger.debug('SMIL source detected');
      this.srplayer.load({ url: url, type: 'smil', bufferTime: options.bufferTime });
    } else if (hlsRe.test(type)) {
      this.logger.debug('HLS source detected');
      this.srplayer.load({ url: url, type: 'hls', bufferTime: options.bufferTime });
    } else {
      var includesApp = !!options.includesAppInstance;
      this.logger.debug('RTMP source detected');
      this.logger.debug('Option includesApplicationInstance = ' + includesApp);
      this.srplayer.load({ url: url, type: 'auto', includesApplicationInstance: includesApp, bufferTime: options.bufferTime });
    }
  },

  load: function (url, type, options) {
    var self = this;
    var loadOptions = options || {};
    loadOptions.bufferTime = loadOptions.bufferTime || this.player.getOption('bufferTime');
    this._super(url, type);
    this._fetchStream(url, type, loadOptions);
    this.trigger('loadstart');
    this.srplayer.bind('can-play-change', function canPlayChangeHandler(canPlay) {
      if (canPlay) {
        self.srplayer.unbind('can-play-change', canPlayChangeHandler);
        self.trigger('stream-loaded', url);
      }
    });
    if(this.player.getOption('scaleMode')) {
      this.setScaleMode(this.player.getOption('scaleMode'));
    }
  },

  play: function () {
    this.trigger('play');
    this.srplayer.play();
  },

  pause: function () {
    this.srplayer.pause();
  }, 

  stop: function () {
    this.srplayer.stop();
  },

  setVolume: function (volume) {
    this.srplayer.setVolume(volume/100);
  },

  getVolume: function () {
    return this.srplayer.getVolume()*100;
  },

  setBufferTime: function (bufferTime) {
    this.srplayer.setBufferTime(bufferTime);
  },

  getBufferTime: function () {
    return this.srplayer.getBufferTime();
  },

  remove: function () {
    this.srplayer.remove();
  },

  isMultiBitrate: function () {
    return this.srplayer.isMultiBitrate();
  },

  getAvailableBitrates: function () {
    return this.srplayer.getAvailableBitrates();
  },

  getActiveBitrateIdx: function () {
    return this.activeBitrateIdx;
  },

  getActiveAutoBitrateIdx: function () {
    return this.srplayer.getSelectedBitrateIndex();
  },

  setActiveBitrateIdx: function (idx) {
    var bitrate;
    if (idx === -1) {
      bitrate = 'Auto';
    } else {
      bitrate = this.getAvailableBitrates()[idx] + ' kbit/s';
    }
    this.logger.debug('Bitrate switching to ' + bitrate);
    this.trigger('bitrate-switching', idx);
    this.activeBitrateIdx = idx;
    this.srplayer.setSelectedBitrateIndex(idx);
  },

  canControlIndividualAudioChannels: function () {
    return true;
  },

  setVolumeLeft: function (volume) {
    this.srplayer.setVolumeLeft(volume);
  },

  setVolumeRight: function (volume) {
    this.srplayer.setVolumeRight(volume);
  },

  getName: function () {
    return 'flash';
  },

  getInfo: function () {
    return this.srplayer.getInfo();
  },

  setLooping: function (willLoop) {
    this.srplayer.setLooping(willLoop);
  },

  isLooping: function () {
    return this.srplayer.isLooping();
  },

  isVod: function () {
    if(this.player.options.vod !== null) {
      return this.player.options.vod;
    }   
    return this.srplayer.isVod();
  },

  getDuration: function () {
    return this.srplayer.getDuration();
  },

  setCurrentTime: function (seconds) {
    this.srplayer.setCurrentTime(seconds);
  },

  getPlayState: function () {
    return this.srplayer.getPlayState();
  },

  setScaleMode: function (mode) {
    this.srplayer.setScaleMode(mode);
  },

  getEdgeServerIp: function () {
    return this.srplayer.getEdgeServerIp();
  }
});

Flash.isSupportedByPlatform = function () {
  return FlashDetect.versionAtLeast(9);
};

Flash.canHandleStream = function (url, type) {
  var protocolRe = /rtmp|rtsp|flv|mp4/;
  var typeRe = /smil|rtmp|flv|x-mpegURL|mp4/;
  return protocolRe.test(url) || typeRe.test(type);
};

module.exports = Flash;

},{"../../vendor/srplayer/srplayer":39,"../VideoHandlerBase":9,"../util/FlashDetect":33,"../util/LivePlayerUtil":34}],38:[function(_dereq_,module,exports){
var VideoHandlerBase = _dereq_('../VideoHandlerBase');

var HTML5 = VideoHandlerBase.extend({
  init: function (elem, readyCb, player) {
    var self = this;
    this.player = player;
    this._super(elem, readyCb, player);
    this.element = elem;
    this.videoElement = document.createElement('video');
    elem.className = 'html5';
    elem.appendChild(this.videoElement);
    this.playState = false;

    if(this.player.getOption('scaleMode')) {
      this.setScaleMode(this.player.getOption('scaleMode'));
    }

    this.videoElement.addEventListener('volumechange', function(){
      self.trigger('volumechange', self.getVolume());
    });

    this.videoElement.addEventListener('playing', function() {
      self.playState = 'playing';
      self.trigger('media-player-state-change', 'playing');
      self.trigger('playing');
    });
    
    this.videoElement.addEventListener('pause', function() {
      self.playState = 'stopped';
      self.trigger('media-player-state-change', 'stopped');
      self.trigger('stopped');
    });
    
    this.videoElement.addEventListener('error', function(evt){
      if (evt.target.src) {
        self.trigger('error', 'Unable to load: ' + evt.target.src);
      } else {
        self.trigger('error', 'Unable to load video');
      }
    }, true);
    
    this.videoElement.addEventListener('canplaythrough', function(evt){
      self.trigger('stream-loaded', evt.target.currentSrc);
    });
    
    this.videoElement.addEventListener('loadstart', function() {
      self.trigger('loadstart');
    });
    
    this.videoElement.addEventListener('play', function() {
      self.playState = 'playing';
      self.trigger('play');
    });
    
    this.videoElement.addEventListener('progress', function(evt) {
      if((evt.target.buffered.length - 1) >= 0) {
        self.trigger('progress', 
                     evt.target.buffered.end(evt.target.buffered.length - 1));
      }        
      // Hack to make sure Firefox gets the message that the video is loaded to the buffer
      if(evt.target.buffered.length > 0) {
        if( evt.target.buffered.end(evt.target.buffered.length - 1) === self.videoElement.duration) {
          window.setTimeout(function() {
            if (evt.target) {
              self.trigger('progress', evt.target.buffered.end(evt.target.buffered.length - 1));
            }
          }, 500);
        }
      }
    });
    
    this.videoElement.addEventListener('timeupdate', function(evt) {
      self.trigger('timeupdate', evt.target.currentTime);
    });
    
    document.addEventListener('mousemove', function(evt) {
      var evtObj = {
        mouseX: evt.clientX,
        mouseY: evt.mouseY
      };
      self.trigger('mouse-move', evtObj);
    });

    if (typeof readyCb === 'function') {
      setTimeout(readyCb, 0);
    }
  },

  load: function (url, type) {
    this._super(url, type);
    this.currentUrl = url;
    var source = document.createElement('source');
    source.src = url;
    if (type) {
      source.type = type;
    }
    this.videoElement.appendChild(source);
    this.videoElement.load(); // Needed for iOS
  },

  play: function () {
    this.videoElement.play();
  },

  pause: function() {
    this.videoElement.pause();
  },

  // no stop method on the <video> element
  stop: function () {
    this.videoElement.pause();
    this.videoElement.currentTime = 0;
  },

  setVolume: function (volume) {
    this.videoElement.volume = volume/100;
  },

  getVolume: function () {
    return this.videoElement.volume*100;
  },

  getCurrentTime: function () {
    if(this.videoElement) {
      return this.videoElement.currentTime;
    }
  },

  remove: function () {
    this.element.removeChild(this.videoElement);
  },

  getName: function () {
    return 'html5';
  },

  setLooping: function(willLoop) {
    this.videoElement.setAttribute('loop', 'true');
  },

  isVod: function () {
    if(this.player.options.vod === null) {
      if (this.videoElement.seekable) {
        return true;
      } else {
        return false;
      }
    } else {
      return this.player.options.vod;
    }
  },

  getDuration: function () {
    if(this.videoElement) {
      return this.videoElement.duration;
    }
  },

  setCurrentTime: function (seconds) {
    if(this.videoElement) {
      this.videoElement.currentTime = seconds;
    }
  },

  getPlayState: function () {
    return this.playState;
  },

  setScaleMode: function (mode) {
    if(mode === 'stretch') {
      this.videoElement.classList.add('stretch');
      objectFit.polyfill({
        selector: 'video',
        fittype: 'cover'
      });
    } else if (mode === 'letterbox') {
      objectFit.polyfill({
        selector: 'video',
        fittype: 'contain'
      });
    }
  },

  getEdgeServerIp: function () {
    return false;
  }
});

HTML5.isSupportedByPlatform = function () {
  return !!document.createElement('video').canPlayType;
};

HTML5.canHandleStream = function (url, type) {
  var video = document.createElement('video');
  if(type){
    return (video.canPlayType(type) !== '');
  }else{
    var re = new RegExp('^http(s)?://.*(ogg|mp4|webm|avi|mpeg)');
    return re.test(url);
  }
};


module.exports = HTML5;

},{"../VideoHandlerBase":9}],39:[function(_dereq_,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.srplayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 * 
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/

var MicroEvent	= function(){}
MicroEvent.prototype	= {
	bind	: function(event, fct){
		this._events = this._events || {};
		this._events[event] = this._events[event]	|| [];
		this._events[event].push(fct);
	},
	unbind	: function(event, fct){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger	: function(event /* , args... */){
		this._events = this._events || {};
		if( event in this._events === false  )	return;
		for(var i = 0; i < this._events[event].length; i++){
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1))
		}
	}
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin	= function(destObject){
	var props	= ['bind', 'unbind', 'trigger'];
	for(var i = 0; i < props.length; i ++){
		destObject.prototype[props[i]]	= MicroEvent.prototype[props[i]];
	}
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= MicroEvent
}

},{}],2:[function(_dereq_,module,exports){
/*!    SWFObject v2.3.20120118 <http://github.com/swfobject/swfobject>
    is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

(function (root, factory) {
    if (typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && typeof define.amd !== 'undefined') {
        define(factory);
    } else {
        root.swfobject = factory();
    }
}(this, function () {

    var UNDEF = "undefined",
        OBJECT = "object",
        SHOCKWAVE_FLASH = "Shockwave Flash",
        SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
        FLASH_MIME_TYPE = "application/x-shockwave-flash",
        EXPRESS_INSTALL_ID = "SWFObjectExprInst",
        ON_READY_STATE_CHANGE = "onreadystatechange",

        win = window,
        doc = document,
        nav = navigator,

        plugin = false,
        domLoadFnArr = [],
        regObjArr = [],
        objIdArr = [],
        listenersArr = [],
        storedFbContent,
        storedFbContentId,
        storedCallbackFn,
        storedCallbackObj,
        isDomLoaded = false,
        isExpressInstallActive = false,
        dynamicStylesheet,
        dynamicStylesheetMedia,
        autoHideShow = true,
        encodeURI_enabled = false,

    /* Centralized function for browser feature detection
        - User agent string detection is only used when no good alternative is possible
        - Is executed directly for optimal performance
    */
    ua = function() {
        var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
            u = nav.userAgent.toLowerCase(),
            p = nav.platform.toLowerCase(),
            windows = p ? /win/.test(p) : /win/.test(u),
            mac = p ? /mac/.test(p) : /mac/.test(u),
            webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
            ie = nav.appName === "Microsoft Internet Explorer",
            playerVersion = [0,0,0],
            d = null;
        if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
            d = nav.plugins[SHOCKWAVE_FLASH].description;
            // nav.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
            if (d && (typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)){
                plugin = true;
                ie = false; // cascaded feature detection for Internet Explorer
                d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                playerVersion[0] = toInt(d.replace(/^(.*)\..*$/, "$1"));
                playerVersion[1] = toInt(d.replace(/^.*\.(.*)\s.*$/, "$1"));
                playerVersion[2] = /[a-zA-Z]/.test(d) ? toInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0;
            }
        }
        else if (typeof win.ActiveXObject != UNDEF) {
            try {
                var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                if (a) { // a will return null when ActiveX is disabled
                    d = a.GetVariable("$version");
                    if (d) {
                        ie = true; // cascaded feature detection for Internet Explorer
                        d = d.split(" ")[1].split(",");
                        playerVersion = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
                    }
                }
            }
            catch(e) {}
        }
        return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
    }(),

    /* Cross-browser onDomLoad
        - Will fire an event as soon as the DOM of a web page is loaded
        - Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
        - Regular onload serves as fallback
    */
    onDomLoad = function() {
        if (!ua.w3) { return; }
        if ((typeof doc.readyState != UNDEF && (doc.readyState === "complete" || doc.readyState === "interactive")) || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically
            callDomLoadFunctions();
        }
        if (!isDomLoaded) {
            if (typeof doc.addEventListener != UNDEF) {
                doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
            }
            if (ua.ie) {
                doc.attachEvent(ON_READY_STATE_CHANGE, function detach() {
                    if (doc.readyState == "complete") {
                        doc.detachEvent(ON_READY_STATE_CHANGE, detach);
                        callDomLoadFunctions();
                    }
                });
                if (win == top) { // if not inside an iframe
                    (function checkDomLoadedIE(){
                        if (isDomLoaded) { return; }
                        try {
                            doc.documentElement.doScroll("left");
                        }
                        catch(e) {
                            setTimeout(checkDomLoadedIE, 0);
                            return;
                        }
                        callDomLoadFunctions();
                    }());
                }
            }
            if (ua.wk) {
                (function checkDomLoadedWK(){
                    if (isDomLoaded) { return; }
                    if (!/loaded|complete/.test(doc.readyState)) {
                        setTimeout(checkDomLoadedWK, 0);
                        return;
                    }
                    callDomLoadFunctions();
                }());
            }
        }
    }();

    function callDomLoadFunctions() {
        if (isDomLoaded || !document.getElementsByTagName("body")[0]) { return; }
        try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
            var t, span = createElement("span");
            span.style.display = "none"; //hide the span in case someone has styled spans via CSS
            t = doc.getElementsByTagName("body")[0].appendChild(span);
            t.parentNode.removeChild(t);
            t = null; //clear the variables
            span = null;
        }
        catch (e) { return; }
        isDomLoaded = true;
        var dl = domLoadFnArr.length;
        for (var i = 0; i < dl; i++) {
            domLoadFnArr[i]();
        }
    }

    function addDomLoadEvent(fn) {
        if (isDomLoaded) {
            fn();
        }
        else {
            domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
        }
    }

    /* Cross-browser onload
        - Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
        - Will fire an event as soon as a web page including all of its assets are loaded
     */
    function addLoadEvent(fn) {
        if (typeof win.addEventListener != UNDEF) {
            win.addEventListener("load", fn, false);
        }
        else if (typeof doc.addEventListener != UNDEF) {
            doc.addEventListener("load", fn, false);
        }
        else if (typeof win.attachEvent != UNDEF) {
            addListener(win, "onload", fn);
        }
        else if (typeof win.onload == "function") {
            var fnOld = win.onload;
            win.onload = function() {
                fnOld();
                fn();
            };
        }
        else {
            win.onload = fn;
        }
    }


    /* Detect the Flash Player version for non-Internet Explorer browsers
        - Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
          a. Both release and build numbers can be detected
          b. Avoid wrong descriptions by corrupt installers provided by Adobe
          c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
        - Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
    */
    function testPlayerVersion() {
        var b = doc.getElementsByTagName("body")[0];
        var o = createElement(OBJECT);
        o.setAttribute("style", "visibility: hidden;");
        o.setAttribute("type", FLASH_MIME_TYPE);
        var t = b.appendChild(o);
        if (t) {
            var counter = 0;
            (function checkGetVariable(){
                if (typeof t.GetVariable != UNDEF) {
                    try {
                        var d = t.GetVariable("$version");
                        if (d) {
                            d = d.split(" ")[1].split(",");
                            ua.pv = [toInt(d[0]), toInt(d[1]), toInt(d[2])];
                        }
                    } catch(e){
                        //t.GetVariable("$version") is known to fail in Flash Player 8 on Firefox
                        //If this error is encountered, assume FP8 or lower. Time to upgrade.
                        ua.pv = [8,0,0];
                    }
                }
                else if (counter < 10) {
                    counter++;
                    setTimeout(checkGetVariable, 10);
                    return;
                }
                b.removeChild(o);
                t = null;
                matchVersions();
            }());
        }
        else {
            matchVersions();
        }
    }

    /* Perform Flash Player and SWF version matching; static publishing only
    */
    function matchVersions() {
        var rl = regObjArr.length;
        if (rl > 0) {
            for (var i = 0; i < rl; i++) { // for each registered object element
                var id = regObjArr[i].id;
                var cb = regObjArr[i].callbackFn;
                var cbObj = {success:false, id:id};
                if (ua.pv[0] > 0) {
                    var obj = getElementById(id);
                    if (obj) {
                        if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
                            setVisibility(id, true);
                            if (cb) {
                                cbObj.success = true;
                                cbObj.ref = getObjectById(id);
                                cbObj.id = id;
                                cb(cbObj);
                            }
                        }
                        else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
                            var att = {};
                            att.data = regObjArr[i].expressInstall;
                            att.width = obj.getAttribute("width") || "0";
                            att.height = obj.getAttribute("height") || "0";
                            if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
                            if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
                            // parse HTML object param element's name-value pairs
                            var par = {};
                            var p = obj.getElementsByTagName("param");
                            var pl = p.length;
                            for (var j = 0; j < pl; j++) {
                                if (p[j].getAttribute("name").toLowerCase() != "movie") {
                                    par[p[j].getAttribute("name")] = p[j].getAttribute("value");
                                }
                            }
                            showExpressInstall(att, par, id, cb);
                        }
                        else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display fallback content instead of SWF
                            displayFbContent(obj);
                            if (cb) { cb(cbObj); }
                        }
                    }
                }
                else {    // if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or fallback content)
                    setVisibility(id, true);
                    if (cb) {
                        var o = getObjectById(id); // test whether there is an HTML object element or not
                        if (o && typeof o.SetVariable != UNDEF) {
                            cbObj.success = true;
                            cbObj.ref = o;
                            cbObj.id = o.id;
                        }
                        cb(cbObj);
                    }
                }
            }
        }
    }

    /* Main function
        - Will preferably execute onDomLoad, otherwise onload (as a fallback)
    */
    domLoadFnArr[0] = function (){
        if (plugin) {
            testPlayerVersion();
        }
        else {
            matchVersions();
        }
    };

    function getObjectById(objectIdStr) {

        var r = null,
            o = getElementById(objectIdStr);

        if (o && o.nodeName.toUpperCase() === "OBJECT") {

            //If targeted object is valid Flash file
            if (typeof o.SetVariable !== UNDEF){

                r = o;

            } else {

                //If SetVariable is not working on targeted object but a nested object is
                //available, assume classic nested object markup. Return nested object.

                //If SetVariable is not working on targeted object and there is no nested object,
                //return the original object anyway. This is probably new simplified markup.

                r = o.getElementsByTagName(OBJECT)[0] || o;

            }

        }

        return r;

    }

    /* Requirements for Adobe Express Install
        - only one instance can be active at a time
        - fp 6.0.65 or higher
        - Win/Mac OS only
        - no Webkit engines older than version 312
    */
    function canExpressInstall() {
        return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
    }

    /* Show the Adobe Express Install dialog
        - Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
    */
    function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {

        var obj = getElementById(replaceElemIdStr);

        //Ensure that replaceElemIdStr is really a string and not an element
        replaceElemIdStr = getId(replaceElemIdStr);

        isExpressInstallActive = true;
        storedCallbackFn = callbackFn || null;
        storedCallbackObj = {success:false, id:replaceElemIdStr};

        if (obj) {
            if (obj.nodeName.toUpperCase() == "OBJECT") { // static publishing
                storedFbContent = abstractFbContent(obj);
                storedFbContentId = null;
            }
            else { // dynamic publishing
                storedFbContent = obj;
                storedFbContentId = replaceElemIdStr;
            }
            att.id = EXPRESS_INSTALL_ID;
            if (typeof att.width == UNDEF || (!/%$/.test(att.width) && toInt(att.width) < 310)) { att.width = "310"; }
            if (typeof att.height == UNDEF || (!/%$/.test(att.height) && toInt(att.height) < 137)) { att.height = "137"; }
            doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
            var pt = ua.ie ? "ActiveX" : "PlugIn",
                fv = "MMredirectURL=" + encodeURIComponent(win.location.toString().replace(/&/g,"%26")) + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
            if (typeof par.flashvars != UNDEF) {
                par.flashvars += "&" + fv;
            }
            else {
                par.flashvars = fv;
            }
            // IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
            // because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
            if (ua.ie && obj.readyState != 4) {
                var newObj = createElement("div");
                replaceElemIdStr += "SWFObjectNew";
                newObj.setAttribute("id", replaceElemIdStr);
                obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
                obj.style.display = "none";
                removeSWF(obj); //removeSWF accepts elements now
            }
            createSWF(att, par, replaceElemIdStr);
        }
    }

    /* Functions to abstract and display fallback content
    */
    function displayFbContent(obj) {
        if (ua.ie && obj.readyState != 4) {
            // IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
            // because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
            obj.style.display = "none";
            var el = createElement("div");
            obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the fallback content
            el.parentNode.replaceChild(abstractFbContent(obj), el);
            removeSWF(obj); //removeSWF accepts elements now
        }
        else {
            obj.parentNode.replaceChild(abstractFbContent(obj), obj);
        }
    }

    function abstractFbContent(obj) {
        var ac = createElement("div");
        if (ua.win && ua.ie) {
            ac.innerHTML = obj.innerHTML;
        }
        else {
            var nestedObj = obj.getElementsByTagName(OBJECT)[0];
            if (nestedObj) {
                var c = nestedObj.childNodes;
                if (c) {
                    var cl = c.length;
                    for (var i = 0; i < cl; i++) {
                        if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
                            ac.appendChild(c[i].cloneNode(true));
                        }
                    }
                }
            }
        }
        return ac;
    }


    function createIeObject(url, param_str){
        var div = createElement("div");
        div.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" +url + "'>" + param_str + "</object>";
        return div.firstChild;
    }

    /* Cross-browser dynamic SWF creation
    */
    function createSWF(attObj, parObj, id) {

        var r, el = getElementById(id);

        id = getId(id); // ensure id is truly an ID and not an element

        if (ua.wk && ua.wk < 312) { return r; }

        if (el) {

            var o = (ua.ie) ? createElement("div") : createElement(OBJECT),
                attr,
                attr_lower,
                param;

            if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the fallback content
                attObj.id = id;
            }

            //Add params
            for (param in parObj) {
                //filter out prototype additions from other potential libraries and IE specific param element
                if (parObj.hasOwnProperty(param) && param.toLowerCase() !== "movie") {
                    createObjParam(o, param, parObj[param]);
                }
            }

            //Create IE object, complete with param nodes
            if(ua.ie){ o = createIeObject(attObj.data, o.innerHTML); }

            //Add attributes to object
            for (attr in attObj) {
                if (attObj.hasOwnProperty(attr)) { // filter out prototype additions from other potential libraries

                    attr_lower = attr.toLowerCase();

                    // 'class' is an ECMA4 reserved keyword
                    if (attr_lower === "styleclass") {
                        o.setAttribute("class", attObj[attr]);
                    } else if (attr_lower !== "classid" && attr_lower !== "data") {
                        o.setAttribute(attr, attObj[attr]);
                    }

                }
            }

            if (ua.ie) {

                objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)

            } else {

                o.setAttribute("type", FLASH_MIME_TYPE);
                o.setAttribute("data", attObj.data);

            }

            el.parentNode.replaceChild(o, el);
            r = o;

        }
        return r;
    }


    function createObjParam(el, pName, pValue) {
        var p = createElement("param");
        p.setAttribute("name", pName);
        p.setAttribute("value", pValue);
        el.appendChild(p);
    }

    /* Cross-browser SWF removal
        - Especially needed to safely and completely remove a SWF in Internet Explorer
    */
    function removeSWF(id) {
        var obj = getElementById(id);
        if (obj && obj.nodeName.toUpperCase() == "OBJECT") {
            if (ua.ie) {
                obj.style.display = "none";
                (function removeSWFInIE(){
                    if (obj.readyState == 4) {
						//This step prevents memory leaks in Internet Explorer
			            for (var i in obj) {
			                if (typeof obj[i] == "function") {
			                    obj[i] = null;
			                }
			            }
			            obj.parentNode.removeChild(obj);
                    } else {
                        setTimeout(removeSWFInIE, 10);
                    }
                }());
            }
            else {
                obj.parentNode.removeChild(obj);
            }
        }
    }

    function isElement(id){
        return (id && id.nodeType && id.nodeType === 1);
    }

    function getId(thing){
        return (isElement(thing)) ? thing.id : thing;
    }

    /* Functions to optimize JavaScript compression
    */
    function getElementById(id) {

        //Allow users to pass an element OR an element's ID
        if(isElement(id)){ return id; }

        var el = null;
        try {
            el = doc.getElementById(id);
        }
        catch (e) {}
        return el;
    }

    function createElement(el) {
        return doc.createElement(el);
    }

    //To aid compression; replaces 14 instances of pareseInt with radix
    function toInt(str){
        return parseInt(str, 10);
    }

    /* Updated attachEvent function for Internet Explorer
        - Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
    */
    function addListener(target, eventType, fn) {
        target.attachEvent(eventType, fn);
        listenersArr[listenersArr.length] = [target, eventType, fn];
    }

    /* Flash Player and SWF content version matching
    */
    function hasPlayerVersion(rv) {
        rv += ""; //Coerce number to string, if needed.
        var pv = ua.pv, v = rv.split(".");
        v[0] = toInt(v[0]);
        v[1] = toInt(v[1]) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
        v[2] = toInt(v[2]) || 0;
        return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
    }

    /* Cross-browser dynamic CSS creation
        - Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
    */
    function createCSS(sel, decl, media, newStyle) {
        var h = doc.getElementsByTagName("head")[0];
        if (!h) { return; } // to also support badly authored HTML pages that lack a head element
        var m = (typeof media == "string") ? media : "screen";
        if (newStyle) {
            dynamicStylesheet = null;
            dynamicStylesheetMedia = null;
        }
        if (!dynamicStylesheet || dynamicStylesheetMedia != m) {
            // create dynamic stylesheet + get a global reference to it
            var s = createElement("style");
            s.setAttribute("type", "text/css");
            s.setAttribute("media", m);
            dynamicStylesheet = h.appendChild(s);
            if (ua.ie && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
                dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
            }
            dynamicStylesheetMedia = m;
        }
        // add style rule
        if(dynamicStylesheet){
            if (typeof dynamicStylesheet.addRule != UNDEF) {
                dynamicStylesheet.addRule(sel, decl);
            } else if (typeof doc.createTextNode != UNDEF) {
                dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
            }
        }
    }

    function setVisibility(id, isVisible) {
        if (!autoHideShow) { return; }
        var v = isVisible ? "visible" : "hidden",
            el = getElementById(id);
        if (isDomLoaded && el) {
            el.style.visibility = v;
        } else if(typeof id === "string"){
            createCSS("#" + id, "visibility:" + v);
        }
    }

    /* Filter to avoid XSS attacks
    */
    function urlEncodeIfNecessary(s) {
        var regex = /[\\\"<>\.;]/;
        var hasBadChars = regex.exec(s) != null;
        return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
    }

    /* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
    */
    var cleanup = function() {
        if (ua.ie) {
            window.attachEvent("onunload", function() {
                // remove listeners to avoid memory leaks
                var ll = listenersArr.length;
                for (var i = 0; i < ll; i++) {
                    listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
                }
                // cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
                var il = objIdArr.length;
                for (var j = 0; j < il; j++) {
                    removeSWF(objIdArr[j]);
                }
                // cleanup library's main closures to avoid memory leaks
                for (var k in ua) {
                    ua[k] = null;
                }
                ua = null;
                if( typeof swfobject !== "undefined" ){
	                for (var l in swfobject) {
	                    swfobject[l] = null;
	                }
	                swfobject = null;
                }
            });
        }
    }();

    return {
        /* Public API
            - Reference: http://code.google.com/p/swfobject/wiki/documentation
        */
        registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
            if (ua.w3 && objectIdStr && swfVersionStr) {
                var regObj = {};
                regObj.id = objectIdStr;
                regObj.swfVersion = swfVersionStr;
                regObj.expressInstall = xiSwfUrlStr;
                regObj.callbackFn = callbackFn;
                regObjArr[regObjArr.length] = regObj;
                setVisibility(objectIdStr, false);
            }
            else if (callbackFn) {
                callbackFn({success:false, id:objectIdStr});
            }
        },

        getObjectById: function(objectIdStr) {
            if (ua.w3) {
                return getObjectById(objectIdStr);
            }
        },

        embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {

            var id = getId(replaceElemIdStr),
                callbackObj = {success:false, id:id};

            if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
                setVisibility(id, false);
                addDomLoadEvent(function() {
                    widthStr += ""; // auto-convert to string
                    heightStr += "";
                    var att = {};
                    if (attObj && typeof attObj === OBJECT) {
                        for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
                            att[i] = attObj[i];
                        }
                    }
                    att.data = swfUrlStr;
                    att.width = widthStr;
                    att.height = heightStr;
                    var par = {};
                    if (parObj && typeof parObj === OBJECT) {
                        for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
                            par[j] = parObj[j];
                        }
                    }
                    if (flashvarsObj && typeof flashvarsObj === OBJECT) {
                        for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
                            if(flashvarsObj.hasOwnProperty(k)){

                                var key = (encodeURI_enabled) ? encodeURIComponent(k) : k,
                                    value = (encodeURI_enabled) ? encodeURIComponent(flashvarsObj[k]) : flashvarsObj[k];

                                if (typeof par.flashvars != UNDEF) {
                                    par.flashvars += "&" + key + "=" + value;
                                }
                                else {
                                    par.flashvars = key + "=" + value;
                                }

                            }
                        }
                    }
                    if (hasPlayerVersion(swfVersionStr)) { // create SWF
                        var obj = createSWF(att, par, replaceElemIdStr);
                        if (att.id == id) {
                            setVisibility(id, true);
                        }
                        callbackObj.success = true;
                        callbackObj.ref = obj;
                        callbackObj.id = obj.id;
                    }
                    else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
                        att.data = xiSwfUrlStr;
                        showExpressInstall(att, par, replaceElemIdStr, callbackFn);
                        return;
                    }
                    else { // show fallback content
                        setVisibility(id, true);
                    }
                    if (callbackFn) { callbackFn(callbackObj); }
                });
            }
            else if (callbackFn) { callbackFn(callbackObj);    }
        },

        switchOffAutoHideShow: function() {
            autoHideShow = false;
        },

        enableUriEncoding: function (bool) {
            encodeURI_enabled = (typeof bool === UNDEF) ? true : bool;
        },

        ua: ua,

        getFlashPlayerVersion: function() {
            return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
        },

        hasFlashPlayerVersion: hasPlayerVersion,

        createSWF: function(attObj, parObj, replaceElemIdStr) {
            if (ua.w3) {
                return createSWF(attObj, parObj, replaceElemIdStr);
            }
            else {
                return undefined;
            }
        },

        showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
            if (ua.w3 && canExpressInstall()) {
                showExpressInstall(att, par, replaceElemIdStr, callbackFn);
            }
        },

        removeSWF: function(objElemIdStr) {
            if (ua.w3) {
                removeSWF(objElemIdStr);
            }
        },

        createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
            if (ua.w3) {
                createCSS(selStr, declStr, mediaStr, newStyleBoolean);
            }
        },

        addDomLoadEvent: addDomLoadEvent,

        addLoadEvent: addLoadEvent,

        getQueryParamValue: function(param) {
            var q = doc.location.search || doc.location.hash;
            if (q) {
                if (/\?/.test(q)) { q = q.split("?")[1]; } // strip question mark
                if (param == null) {
                    return urlEncodeIfNecessary(q);
                }
                var pairs = q.split("&");
                for (var i = 0; i < pairs.length; i++) {
                    if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
                        return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
                    }
                }
            }
            return "";
        },

        // For internal usage only
        expressInstallCallback: function() {
            if (isExpressInstallActive) {
                var obj = getElementById(EXPRESS_INSTALL_ID);
                if (obj && storedFbContent) {
                    obj.parentNode.replaceChild(storedFbContent, obj);
                    if (storedFbContentId) {
                        setVisibility(storedFbContentId, true);
                        if (ua.ie) { storedFbContent.style.display = "block"; }
                    }
                    if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
                }
                isExpressInstallActive = false;
            }
        },

		version: "2.3"

    };
}));

},{}],3:[function(_dereq_,module,exports){
var MicroEvent = _dereq_('microevent');
var swfobject = _dereq_('swfobject-amd');

/**
* Creates a SRPlayer element.
*
* @constructor
*/
var SRPlayer = function (elementId) {
  this.elementId = elementId;
  this.element = document.getElementById(this.elementId);
  this.swfId = elementId + '-swf';
  this.mediaStateListeners = {};
};

SRPlayer.prototype = {
  /**
   * Media source for SRPlayer.
   * @typedef {Object} SRMedia
   * @property {string} url Url of the media resource.
   * @property {string} type Type of the resource.
   *
   * @example <caption>Media types</caption>
   * * smil
   */

  /**
   * Configuration for SRPlayer.
   * @typedef {Object} SRConfig
   * @property {SRMedia} source Media source.
   * @property {boolean} smoothing Enable interpolation when scaling media element. Default: true.
   * @property {number} buffertime Desired buffertime of the player. Default: 2.
   * @property {boolean} autoRestart Media will automatically restart on errors when set to true. Default: true.
   * @property {boolean} autoStart Media will automatically start when player is initialized. Default: true.
   * @property {boolean} loop Media will automatically restart when playback is completed. Default: false.
   * @property {string} swf Path to srplayer.swf. Default: './srplayer.swf'.
   */

  /**
   * Initialize the player.
   *
   * @param {SRConfig} config Object containing configuration options.
   */
  setup: function (config) {
    var _this = this;
    var flashVars = {
      smoothing: config.videoSmoothing !== false || false,
      buffertime: config.bufferTime || 2,
      id: this.elementId,
      edgeServerIpDetection: config.edgeServerIpDetection || false,
      autoDynamicStreamSwitch: config.autoDynamicStreamSwitch ? false : true 
    };
    var flashParams = {
      AllowScriptAccess: 'always',
      wmode: 'opaque'
    };

    var setSwf = function (ev) {
      _this._swf = ev.ref;
    };

    this.element.innerHTML = '';
    var swfPlaceholder = document.createElement('div');
    swfPlaceholder.id = this.swfId;
    this.element.appendChild(swfPlaceholder);

    swfobject.embedSWF(config.swf || './srplayer.swf', 
                       this.swfId,
                       '100%',
                       '100%',
                       '11.2.0',
                       '',
                       flashVars,
                       flashParams,
                       null,
                       setSwf);
  },

  /**
   * Initialize player. Triggered by AS3 code.
   */
  init: function () {
    this.swf = this._swf;
    this.trigger('player-init');
  },

  /**
   * Remove the player from the DOM.
   */
  remove: function () {
    this.element.innerHTML = '';
    window.clearInterval(this.debugInterval);
    delete srplayer.players[this.elementId];
  },

  /**
   * Returns the bitrate of the current media stream.
   *
   * @return {number} The current bitrate.
   */
  getSelectedBitrate: function () {
    if (!this.swf) {
      return 0;
    } else {
      return this.swf.getSelectedBitrate();
    }
  },

  /**
   * Returns the bitrate index of the current media stream.
   *
   * @return {number} The current bitrate index.
   */
  getSelectedBitrateIndex: function () {
    if (!this.swf) {
      return -1;
    } else {
      return this.swf.getSelectedBitrateIndex();
    }
  },

  /**
   * Sets the bitrate index of the current media stream.
   *
   * @param {number} idx The new bitrate index.
   */
  setSelectedBitrateIndex: function (idx) {
    if (this.swf) {
      this.swf.setSelectedBitrateIndex(idx);
    }
  },

  /**
   * Check if the current stream is dynamic
   *
   * @return {boolean}
   */
  isMultiBitrate: function () {
    if (!this.swf) {
      return false;
    } else {
      return this.swf.isMultiBitrate();
    }
  },

  /**
   * Returns the available bitrates for the current media stream
   *
   * @return {array} The available bitrates
   */
  getAvailableBitrates: function () {
    if (!this.swf) {
      return [];
    } else {
      return this.swf.getAvailableBitrates();
    }
  },

  /**
   * Returns the state of the player.
   *
   * @return {string} The current player state.
   */
  getState: function () {
    if (!this.swf) {
      return 'uninitialized';
    } else {
      return this.swf.getState();
    }
  },

  /**
   * Returns the mute status of the player.
   *
   * @return {boolean} True if muted, false otherwise.
   */
  getMuted: function () {
    if (!this.swf) {
      return false;
    } else {
      return this.swf.getMuted();
    }
  },

  /**
   * Set the mute status of the player.
   *
   * @param {boolean} muted True for muted, false otherwise.
   */
  setMuted: function (muted) {
    if (this.swf) {
      this.swf.setMuted(muted);
    }
  },

  /**
   * Returns the desired buffer length of the player.
   *
   * @return {number} Buffer length
   */
  getBufferTime: function () {
    if (!this.swf) {
      return false;
    } else {
      return this.swf.getBufferTime();
    }
  },

  /**
   * Set the desired buffer length of the player.
   *
   * @param {boolean} bufferTime Desired buffer length
   */
  setBufferTime: function (bufferTime) {
    if (this.swf) {
      this.swf.setBufferTime(bufferTime);
    }
  },

  /**
   * Set the audio volume for the left channel.
   *
   * @param {number} volume Volume level, between 0 and 1.
   */
  setVolumeLeft: function (volume) {
    if (this.swf) {
      this.swf.setVolumeLeft(volume);
    }
  },

  /**
   * Set the audio volume for the right channel.
   *
   * @param {number} volume Volume level, between 0 and 1.
   */
  setVolumeRight: function (volume) {
    if (this.swf) {
      this.swf.setVolumeRight(volume);
    }
  },

  /**
   * Set the audio volume of the player.
   *
   * @param {number} volume Volume level, between 0 and 1.
   */
  setVolume: function (volume) {
    if (this.swf) {
      this.swf.setVolume(volume);
    }
  },

  /**
   * Get the audio volume of the player.
   *
   * @return {number} Volume level, between 0 and 1.
   */
  getVolume: function () {
    if (this.swf) {
      return this.swf.getVolume();
    }
  },

  /**
   * Returns some general information about the internal state of the player.
   *
   * @return {object} Object containing information about bandwidth, buffer fill ratio etc.
   */
  getInfo: function () {
    if (!this.swf) {
      return null;
    } else {
      var info = this.swf.getInfo();
      if (info.metadata) {
        info.metadata = JSON.parse(info.metadata);
      }
      return info;
    }
  },

  /**
   * Start playback.
   */
  play: function () {
    if (this.swf) {
      this.swf.playVideo();
    }
  },

  /**
   * Pause playback
   */
  pause: function () {
    if (this.swf) {
      this.swf.pauseVideo();
    }
  },

  /**
   * Stop playback.
   */
  stop: function () {
    if (this.swf) {
      this.swf.stopVideo();
    }
  },

  /**
   * Load a new stream.
   *
   * @param {object} options Object describing the source to be loaded.
   */
  load: function (options, cb) {
    if (this.swf) {
      this.swf.load(options);
    }
  },

  /**
   * Check if the video is Vod using the mediaElement.canSeek attribute
   *
   */
  isVod: function () {
    if (this.swf) {
      return this.swf.isVod();
    }
  },

  canSeek: function () {
    if (this.swf) {
      return this.swf.canSeek();
    }
  },

  /**
   * return current playback time
   */
  getCurrentTime: function () {
    if (this.swf) {
      return this.swf.getCurrentTime();
    }
  },

  /**
   * set current playback time
   */
  setCurrentTime: function (seconds) {
    if(this.swf) {
      this.swf.setCurrentTime(seconds);
    }
  },

  /**
   * return video duration
   */
  getDuration: function () {
    if (this.swf) {
      return this.swf.getDuration();
    }
  },

  /**
   * return play state
   */
  getPlayState: function () {
    if(this.swf) {
      return this.swf.getPlayState();
    }
  },

  /**
   * return load state
   */
  getLoadState: function () {
    if(this.swf) {
      return this.swf.getLoadState();
    }
  },

  /**
   * return the canPlay property of the mediaplayer
   *
   * @return {boolean}
   */
  canPlay: function () {
    if(this.swf) {
      return this.swf.canPlay();
    }
  },

  /**
   * set if the video should play again after it finishes playback
   *
   * @param {boolean}
   */
  setLooping: function (willLoop) {
    if(this.swf) {
      this.swf.setLooping(willLoop);
    }
  },

  /**
   * set if the video should play again after it finishes playback
   *
   * @return {boolean}
   */
  isLooping: function () {
    if(this.swf) {
      return this.swf.isLooping();
    }
  },

  /** 
   * set the scale mode to either stretch or letterbox mode
   *
   * @return {void}
   */
  setScaleMode: function (mode) {
    if(this.swf) {
      this.swf.setScaleMode(mode);
    }
  },

  /**
   * get the IP of streams edge server
   *
   * @return String
   */
  getEdgeServerIp: function () {
    if(this.swf) {
      return this.swf.getEdgeServerIp();
    }
  }
};

MicroEvent.mixin(SRPlayer);

module.exports = SRPlayer;

},{"microevent":1,"swfobject-amd":2}],4:[function(_dereq_,module,exports){
var SRPlayer = _dereq_('./SRPlayer');

/**
 * Creates or retrieves a SRPlayer instance with the given container ID.
 *
 * @param {string} elementId Id of the container element.
 * @return {srplayer.SRPlayer} The SRPlayer with the given container ID.
 */
var srplayer = function (elementId) {
  if (!elementId) {
    for (var elId in srplayer.players) {
      return srplayer.players[elId];
    }
  }
  if (srplayer.players[elementId]) {
    return srplayer.players[elementId];
  } else {
    return srplayer.players[elementId] = new SRPlayer(elementId);
  }
};

srplayer.players = srplayer.players || {};

srplayer.triggerMediaStateChange = function (id, state) {
  srplayer.players[id].trigger('media-state-change', state);
};

srplayer.triggerCurrentTimeChange = function (id, currentTime) {
  srplayer.players[id].trigger('current-time-change', currentTime);
};

srplayer.triggerCanSeekChange = function (id, canSeek) {
  srplayer.players[id].trigger('can-seek-change', canSeek);
};

srplayer.triggerMediaPlayerStateChange = function (id, state) {
  srplayer.players[id].trigger('media-player-state-change', state);
};

srplayer.triggerBufferChange = function (id, bufferTime, bytesLoaded, isBuffering) {
  srplayer.players[id].trigger('buffer-time-change', bufferTime, bytesLoaded, isBuffering);
}

srplayer.triggerVolumeChange = function (id, volume) {
  srplayer.players[id].trigger('volume-change', volume);
};

srplayer.triggerCanPlayChange = function (id, canPlay) {
  srplayer.players[id].trigger('can-play-change', canPlay);
};

srplayer.triggerMediaError = function (id, errorMsg) {
  if(!errorMsg == "NetConnection.Connect.Closed") {
    srplayer.players[id].trigger('media-error', errorMsg);
  }
};

srplayer.triggerPlayerInit = function (id) {
  srplayer.players[id].init();
};

srplayer.triggerBitrateSwitch = function (id, bitrateIdx) {
  srplayer.players[id].trigger('bitrate-switch', bitrateIdx);
};

srplayer.triggerBitrateSwitching = function (id, bitrateIdx) {
  srplayer.players[id].trigger('bitrate-switching', bitrateIdx);
};

srplayer.triggerIsDynamicStreamChange = function (id, isDynamic) {
  srplayer.players[id].trigger('is-dynamic-change', isDynamic);
};

srplayer.triggerMouseMove = function (id, mouseX, mouseY) {
  srplayer.players[id].trigger('sr:mousemove', mouseX, mouseY);
};

srplayer.triggerCurrentTimeChange = function (id, time) {
  srplayer.players[id].trigger('current-time-update', time);
};

srplayer.connectionLost = function (id) {
  srplayer.players[id].trigger('connection-lost');
};

srplayer.smilParseError = function (id) {
  srplayer.players[id].trigger('smil-parse-error');
};

module.exports = srplayer;

},{"./SRPlayer":3}]},{},[4])(4)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./SRPlayer":5,"microevent":6,"swfobject-amd":5}]},{},[10])
(10)
});