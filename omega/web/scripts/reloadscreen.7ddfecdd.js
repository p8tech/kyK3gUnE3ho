"use strict";function triggerReloadScreen(duration){window.setInterval(function(){var inner=document.getElementById("loader-wrapper");"loader-wrapper"===inner.className&&(inner.className+=" showreload")},duration)}window.setInterval(function(){var el=document.getElementById("loading-screen"),style=el&&window.getComputedStyle(el);"block"===(style&&style.getPropertyValue("display"))?triggerReloadScreen(6e4):(document.getElementById("loader-wrapper")||{}).className="loader-wrapper"},5e3),setTimeout(function(){var reloadbtn=document.getElementById("btn-reloadpage"),inner=document.getElementById("loader-wrapper");reloadbtn&&reloadbtn.addEventListener("click",function(e){inner.className="loader-wrapper",window.location.reload()},!1)},5e3);