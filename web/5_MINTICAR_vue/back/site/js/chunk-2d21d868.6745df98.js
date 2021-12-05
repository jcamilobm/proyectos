(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d868"],{d259:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("h1",[t._v("Gestión del Catálogo")]),e("v-container",[e("v-row",[e("v-col",{staticClass:"d-flex align-center",attrs:{cols:"12",lg:"5"}},[e("v-text-field",{attrs:{label:"Busqueda"},model:{value:t.busqueda,callback:function(a){t.busqueda=a},expression:"busqueda"}},[e("v-icon",{attrs:{slot:"append",color:"red"},slot:"append"},[t._v(" mdi-magnify ")])],1)],1),e("v-col",{staticClass:"d-flex align-center justify-end",attrs:{cols:"1"}},[e("v-icon",[t._v("mdi-currency-usd")])],1),e("v-col",{attrs:{cols:"12",lg:"6"}},[e("v-container",{attrs:{fluid:""}},[e("v-card",{attrs:{flat:"",color:"transparent"}},[e("v-card-text",[e("v-row",[e("v-col",{staticClass:"px-4"},[e("v-range-slider",{staticClass:"align-center",attrs:{max:t.precioMax,min:t.precioMin,"hide-details":"",step:"10000"},scopedSlots:t._u([{key:"prepend",fn:function(){return[e("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"70px"},attrs:{value:t.range[0],"hide-details":"","single-line":"",type:"number"},on:{change:function(a){return t.$set(t.range,0,a)}}})]},proxy:!0},{key:"append",fn:function(){return[e("v-text-field",{staticClass:"mt-0 pt-0",staticStyle:{width:"75px"},attrs:{value:t.range[1],"hide-details":"","single-line":"",type:"number"},on:{change:function(a){return t.$set(t.range,1,a)}}})]},proxy:!0}]),model:{value:t.range,callback:function(a){t.range=a},expression:"range"}})],1)],1)],1)],1)],1)],1)],1)],1),e("v-container",[e("v-btn",{attrs:{elevation:"2",bottom:"",right:"",fixed:"",fab:"",to:"/admin/gestioncatalogo/agregarcarro"}},[e("v-icon",[t._v("mdi-plus")])],1),e("v-row",t._l(t.filtrarCarros,(function(a,i){return e("v-col",{key:a.code,attrs:{sm:"6",md:"4",lg:"3",xs:"12"}},[e("v-card",{staticClass:"mx-auto my-12",attrs:{"max-width":"400px"}},[e("v-img",{staticClass:"blue--text align-end",attrs:{height:"150px",src:a.img}}),e("v-divider",{attrs:{inset:""}}),e("v-card-title",{staticClass:"d-flex justify-center"},[t._v(t._s(a.name))]),e("v-card-text",{staticClass:"d-flex justify-center"},[e("v-chip",{staticClass:"ma-2",attrs:{color:"orange","text-color":"white"}},[e("strong",[t._v(" $ "+t._s(a.price)+" ")]),t._v(" / DIA ")])],1),e("v-divider",{staticClass:"mx-4"}),e("v-card-title",{staticClass:"d-flex justify-center"},[t._v("Stock: "+t._s(a.stock))]),e("v-card-actions",[e("v-btn",{attrs:{color:"orange lighten-2",text:""}},[t._v(" Explorar ")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(t){a.showInfo=!a.showInfo}}},[e("v-icon",[t._v(t._s(a.showInfo?"mdi-chevron-up":"mdi-chevron-down"))])],1)],1),e("v-expand-transition",[e("div",{directives:[{name:"show",rawName:"v-show",value:a.showInfo,expression:"car.showInfo"}]},[e("v-divider"),e("v-card-text",[e("v-chip",{staticClass:"mr-2 mb-2"},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-engine ")]),t._v(" "+t._s(a.tipo)+" ")],1),e("v-chip",{staticClass:"mr-2 mb-2"},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-briefcase ")]),t._v(" Maletas: "+t._s(a.numeroMaletas)+" ")],1),e("v-chip",{staticClass:"mr-2 mb-2"},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-account-settings ")]),t._v(" Personas: "+t._s(a.numeroPersonas)+" ")],1),e("v-chip",{staticClass:"mr-2 mb-2"},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-air-conditioner ")]),t._v(" Aire : "+t._s(a.aire)+" ")],1)],1)],1)]),e("v-card-actions",{staticClass:"d-flex justify-center"},[e("v-btn",{attrs:{color:"success",dark:""},on:{click:function(e){return t.editar(a._id)}}},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-pencil ")]),t._v(" Editar ")],1),e("v-row",{attrs:{justify:"center"}},[e("v-btn",{attrs:{color:"red",dark:""},on:{click:function(e){return e.stopPropagation(),t.eliminar(a._id,i)}}},[e("v-icon",{attrs:{left:""}},[t._v(" mdi-delete ")]),t._v(" Eliminar ")],1),e("v-dialog",{attrs:{"max-width":"250"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("v-card",{staticClass:"r"},[e("v-card-title",{staticClass:"text-h5"},[t._v(" Estás seguro ? ")]),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(a){t.dialog=!1}}},[t._v(" Cancelar ")]),e("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(a){return t.confirmarEliminacion()}}},[t._v(" Eliminar ")])],1)],1)],1)],1)],1)],1)],1)})),1)],1)],1)},r=[],n=(e("a434"),e("4de4"),e("caad"),e("2532"),e("b0c0"),e("bfac")),s={data:function(){return{dialog:!1,id_temporal:"",i_temporal:"",busqueda:"",precioMin:1e4,precioMax:2e5,range:[1e5,2e5],cars:[]}},created:function(){var t=this;Object(n["c"])().then((function(a){console.log(a.data),t.cars=a.data})).catch((function(t){return console.error(t)}))},methods:{eliminar:function(t,a){this.dialog=!0,this.id_temporal=t,this.i_temporal=a},confirmarEliminacion:function(){var t=this;this.dialog=!1,Object(n["b"])(this.id_temporal).then((function(){t.cars.splice(t.i_temporal,1)})).catch((function(t){return console.error(t)}))},editar:function(t){this.$router.push("/cars/".concat(t))}},computed:{filtrarCarros:function(){var t=this;return this.cars.filter((function(a){return a.price>=t.range[0]&&a.price<=t.range[1]&&a.name.toLowerCase().includes(t.busqueda)}))}}},c=s,o=e("2877"),l=e("6544"),d=e.n(l),v=e("8336"),u=e("b0af"),f=e("99d9"),p=e("cc20"),m=e("62ad"),g=e("a523"),h=e("169a"),_=e("ce7e"),x=e("0789"),b=e("132d"),C=e("adda"),w=e("5963"),k=e("0fd9"),y=e("2fa4"),V=e("8654"),j=Object(o["a"])(c,i,r,!1,null,null,null);a["default"]=j.exports;d()(j,{VBtn:v["a"],VCard:u["a"],VCardActions:f["a"],VCardText:f["c"],VCardTitle:f["d"],VChip:p["a"],VCol:m["a"],VContainer:g["a"],VDialog:h["a"],VDivider:_["a"],VExpandTransition:x["a"],VIcon:b["a"],VImg:C["a"],VRangeSlider:w["a"],VRow:k["a"],VSpacer:y["a"],VTextField:V["a"]})}}]);
//# sourceMappingURL=chunk-2d21d868.6745df98.js.map