(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["colored-pixels"],{a201:function(e,n,r){"use strict";r.r(n);var o=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",{ref:"root"},[r("svg",{staticClass:"h-screen w-screen"},e._l(e.numRows,(function(n){return r("g",{key:n+"_g_row",attrs:{transform:"translate("+-e.squareEdge/2+","+(e.squareEdge*(n-1)-5)+")"}},e._l(e.numColumns,(function(o){return r("rect",{key:o+"_rect",attrs:{x:e.squareEdge*(o-.5),y:e.squareEdge/2,width:e.squareEdge,height:e.squareEdge,fill:e.squareColors[n-1][o-1]}})})),0)})),0)])},t=[],s=(r("99af"),r("6929")),u=r.n(s),a=function(){return Math.round(255*Math.random())},l={name:"ColoredPixels",data:function(){return{numRows:null,numColumns:null,squareEdge:10,squareColors:null}},mounted:function(){var e=this,n=function(){e.numColumns=Math.ceil(e.$refs.root.offsetWidth/e.squareEdge),e.numRows=Math.ceil(e.$refs.root.offsetHeight/e.squareEdge)},r=function(){for(var n=[],r=0;r<e.numRows;r++){n[r]=[];for(var o=0;o<e.numColumns;o++)n[r][o]=u()("rgb(".concat(a(),",").concat(a(),",").concat(a(),")")).rgb().string()}e.squareColors=n,setTimeout(e.genColors,2e3)};n(),r(),window.onresize=function(){n(),r()}},beforeDestroy:function(){window.onresize=null}},i=l,c=r("2877"),f=Object(c["a"])(i,o,t,!1,null,null,null);n["default"]=f.exports}}]);
//# sourceMappingURL=colored-pixels.cc149560.js.map