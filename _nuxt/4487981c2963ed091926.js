(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{354:function(t,e,r){var content=r(458);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(25).default)("0d1fea3e",content,!0,{sourceMap:!1})},457:function(t,e,r){"use strict";var o=r(354);r.n(o).a},458:function(t,e,r){(e=r(24)(!1)).push([t.i,".navbar-offset{margin-top:100px!important}.md-form{margin-top:0!important;margin-bottom:0!important}",""]),t.exports=e},468:function(t,e,r){"use strict";r.r(e);r(26),r(181),r(56),r(180),r(87),r(116),r(27),r(41);var o=r(7),n=r(15),c=r(385),l=r.n(c),d=r(452),m=r(453),v=r.n(m),_=r(454),h=r.n(_),f=r(455),y=r.n(f),w=r(456),C=r.n(w),k={name:"ListOfValues",components:{mdbContainer:n.mdbContainer,mdbRow:n.mdbRow,mdbCol:n.mdbCol,mdbIcon:n.mdbIcon,mdbInput:n.mdbInput,mdbCard:n.mdbCard,mdbCardText:n.mdbCardText,mdbCardBody:n.mdbCardBody,mdbCardTitle:n.mdbCardTitle,mdbBtn:n.mdbBtn,mdbModal:n.mdbModal,mdbModalHeader:n.mdbModalHeader,mdbModalBody:n.mdbModalBody,mdbModalFooter:n.mdbModalFooter,TextHighlight:d.a,mdbSpinner:n.mdbSpinner,Paginate:y.a,JsonCSV:C.a},directives:{mdbClipboard:n.mdbClipboard},fetch:function(){this.loadArticles()},mounted:function(){this.$store.dispatch("ui/setSidebarVisibility",!0)},data:function(t){return{value:this.$route.query.q&&""!==this.$route.query.q?this.$route.query.q:"",query:"",modal:!1,helpModal:!1,citationObj:"",citation_content:"",articles:[],articles_count:0,sort:"",url:"https://cyber-guard.github.io/corruption-client/",loading:!1}},fetchOnServer:!1,watchQuery:["q"],methods:{download:function(){var t=new h.a,e=this.$refs.content.innerHTML;t.fromHTML(e,15,15,{width:170}),t.save("sample.pdf")},citeFormat:function(t,template){var e={format:"text",lang:"en-US"};template&&(e.template=template),this.citation_content=this.citationObj.format(t,e)},citation:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function r(){var cite;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,l.a.async(t);case 2:cite=r.sent,e.modal=!0,e.citationObj=cite,e.citation_content=cite.format("bibliography",{format:"text",template:"apa",lang:"en-US"});case 6:case"end":return r.stop()}}),r)})))()},loadArticles:v.a.debounce(function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(e){var r,o,n,c,l,d,data,m;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={Citations:"Citations_gte",Title:"Title_contains",Abstract:"Abstract_contains",Authors:"Authors_contains",Source:"Source_contains",Type:"Type_contains",Subject:"Subject_contains",Years:"Year",Year:"Year"},o=this.value.match(/\\?.|^$/g).reduce((function(p,t){return'"'===t?p.quote^=1:p.quote||" "!==t?p.a[p.a.length-1]+=t.replace(/\\(.)/,"$1"):p.a.push(""),p}),{a:[""]}).a,20,n=10*e||0,c=this.sort||"Year:desc",l="",d={_limit:20,_start:n,_sort:c},o&&o.length&&o.forEach((function(t){var e=t.split(":");if(e[1]&&e[0]in r)if(e[1].match("-")&&"Years"===e[0]){var o=e[1].split("-");d.Year_gte=o[0],d.Year_lte=o[1]}else d[r[e[0]]]=e[1];else l+=e[0]?e[0]+" ":""})),d.Abstract_contains=d.Abstract_contains||l,d.Title_contains=d.Title_contains||l,this.query=l,this.loading=!0,t.next=14,this.$axios.$get("/articles",{params:d});case 14:return data=t.sent,t.next=17,this.$axios.$get("/articles/count",{params:d});case 17:m=t.sent,this.articles_count=m,this.articles=data,this.loading=!1;case 21:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}(),500)}},x=(r(457),r(23)),component=Object(x.a)(k,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("mdb-container",{staticClass:"navbar-offset",attrs:{fluid:""}},[r("mdb-row",[r("mdb-col",{attrs:{col:"10"}},[r("mdb-card",[r("mdb-row",[r("mdb-col",{attrs:{col:""}},[r("mdb-input",{staticClass:"p-2 m-2",attrs:{label:"Search..."},on:{change:t.loadArticles},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),t._v(" "),r("mdb-col",{staticClass:"d-flex align-items-stretch",attrs:{col:"auto"}},[r("button",{staticClass:"btn btn-primary btn-lg m-0",attrs:{type:"button"},on:{click:function(e){t.helpModal=!0}}},[r("mdb-icon",{attrs:{icon:"question"}})],1)]),t._v(" "),r("mdb-col",{staticClass:"d-flex align-items-stretch",attrs:{col:"auto"}},[r("json-CSV",{staticClass:"btn btn-primary btn-lg m-0",attrs:{data:t.articles}},[r("mdb-icon",{attrs:{icon:"file-csv"}}),t._v("\n              Export page\n            ")],1)],1)],1)],1)],1),t._v(" "),r("mdb-col",{staticClass:"d-flex align-items-stretch",attrs:{col:"2"}},[r("mdb-card",{staticClass:"text-center",staticStyle:{width:"100%"}},[r("mdb-row",[r("mdb-col",{staticClass:"p-2"},[t._v("\n            Results\n          ")]),t._v(" "),r("mdb-col",{staticClass:"p-2"},[t._v("\n            "+t._s(t.articles_count)+"\n          ")])],1)],1)],1)],1),t._v(" "),t.loading?r("mdb-row",[r("mdb-col",{staticClass:"pt-5 text-center",attrs:{col:"12"}},[r("mdb-spinner")],1)],1):t._l(t.articles,(function(article){return r("mdb-row",{key:article.Id,ref:"content",refInFor:!0,staticClass:"item"},[r("mdb-col",{attrs:{col:"12"}},[r("mdb-card",{staticClass:"mt-2"},[r("mdb-card-body",{attrs:{cascade:""}},[r("mdb-row",[r("mdb-col",{attrs:{col:"8"}},[r("a",{staticClass:"d-inline-flex",attrs:{target:"_blank",href:"https://doi.org/"+article.doi}},[r("mdb-card-title",[r("strong",[t.query?r("text-highlight",{attrs:{queries:t.query}},[t._v("\n                      "+t._s(article.Title)+"\n                    ")]):r("div",[t._v("\n                      "+t._s(article.Title)+"\n                    ")])],1)])],1),t._v(" "),r("br"),t._v(" "),r("a",{attrs:{href:"#!"},on:{click:function(e){t.value='Authors:"'+article.Authors+'"'}}},[t._v("\n                "+t._s(article.Authors)+"\n              ")]),t._v("\n              |\n              "),r("a",{attrs:{href:"#!"},on:{click:function(e){t.value='Year:"'+article.Year+'"'}}},[t._v("\n                "+t._s(article.Year)+"\n              ")]),t._v("\n              |\n              "),r("a",{attrs:{href:"#!"},on:{click:function(e){t.value='Source:"'+article.Source+'"'}}},[t._v("\n                "+t._s(article.Source)+"\n              ")]),t._v(" "),r("mdb-card-text",[t.query?r("text-highlight",{attrs:{queries:t.query}},[r("div",{staticClass:"text-justify"},[t._v(t._s(article.Abstract))])]):r("div",[r("div",{staticClass:"text-justify"},[t._v(t._s(article.Abstract))])])],1)],1),t._v(" "),r("mdb-col",{staticClass:"text-right",attrs:{col:"4"}},[r("mdb-row",[r("mdb-col",{attrs:{col:"6"}},[r("strong",[t._v("Subject")])]),t._v(" "),r("mdb-col",{attrs:{col:"6"}},[t._v("\n                  "+t._s(article.Subject)+"\n                ")])],1),t._v(" "),r("mdb-row",[r("mdb-col",{attrs:{col:"6"}},[r("strong",[t._v("Type")])]),t._v(" "),r("mdb-col",{attrs:{col:"6"}},[t._v("\n                  "+t._s(article.Type)+"\n                ")])],1),t._v(" "),r("mdb-row",[r("mdb-col",{attrs:{col:"6"}},[r("strong",[t._v("Citations")])]),t._v(" "),r("mdb-col",{attrs:{col:"6"}},[t._v("\n                  "+t._s(article.Citations)+"\n                ")])],1),t._v(" "),r("mdb-row",[r("mdb-col",{attrs:{col:"6"}},[r("strong",[t._v("Keywords")])]),t._v(" "),r("mdb-col",{attrs:{col:"6"}},[t._v("\n                  "+t._s(article.keywords)+"\n                ")])],1),t._v(" "),r("mdb-row",{staticClass:"mt-2"},[r("mdb-col",{attrs:{col:"6"}},[r("strong",[t._v("Share")])]),t._v(" "),r("mdb-col",{attrs:{col:"6"}},[r("ShareNetwork",{staticClass:"px-2 fa-lg li-ic",attrs:{network:"linkedin",url:t.url,title:article.Title}},[r("mdb-icon",{attrs:{fab:"",icon:"linkedin"}})],1),t._v(" "),r("ShareNetwork",{staticClass:"px-2 fa-lg li-ic",attrs:{network:"twitter",url:t.url,title:article.Title}},[r("mdb-icon",{attrs:{fab:"",icon:"twitter"}})],1),t._v(" "),r("ShareNetwork",{staticClass:"px-2 fa-lg li-ic",attrs:{network:"facebook",url:t.url,title:article.Title}},[r("mdb-icon",{attrs:{fab:"",icon:"facebook"}})],1)],1)],1),t._v(" "),r("mdb-row",{staticClass:"mt-2"},[r("mdb-col",{staticClass:"text-right",attrs:{col:""}},[r("mdb-btn",{attrs:{tag:"a",gradient:"blue",target:"_blank",href:"https://openaccessbutton.org/?id="+article.doi}},[t._v("Open "),r("mdb-icon",{attrs:{icon:"unlock-alt"}}),t._v(" Access")],1)],1),t._v(" "),r("mdb-col",{staticClass:"text-right",attrs:{col:""}},[r("button",{staticClass:"btn btn-primary",attrs:{disabled:t.loading},on:{click:function(e){return t.citation(article.doi)}}},[t._v("\n                    Citation\n                  ")])])],1)],1)],1)],1)],1)],1)],1)})),t._v(" "),r("mdb-row",{staticClass:"my-2"},[r("mdb-col",{attrs:{col:"12"}},[r("paginate",{attrs:{"page-count":Math.floor(t.articles_count/20),"click-handler":t.loadArticles,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item","page-link-class":"page-link","prev-class":"page-item","next-class":"page-item","prev-link-class":"page-link","next-link-class":"page-link","active-class":"active text-primary primary"}})],1)],1),t._v(" "),r("mdb-modal",{attrs:{show:t.modal,centered:!0,size:"lg"},on:{close:function(e){t.modal=!1}}},[r("mdb-modal-header"),t._v(" "),r("mdb-modal-body",[r("mdb-input",{attrs:{type:"textarea",value:t.citation_content,rows:"6"}}),t._v(" "),r("mdb-btn",{attrs:{color:"primary"},on:{click:function(e){return t.citeFormat("bibliography","apa")}}},[t._v("APA")]),t._v(" "),r("mdb-btn",{attrs:{color:"primary"},on:{click:function(e){return t.citeFormat("bibliography","vancouver")}}},[t._v("Vancouver")]),t._v(" "),r("mdb-btn",{attrs:{color:"primary"},on:{click:function(e){return t.citeFormat("bibtex")}}},[t._v("BibTex")]),t._v(" "),r("mdb-btn",{attrs:{color:"primary"},on:{click:function(e){return t.citeFormat("data")}}},[t._v("JSON")])],1),t._v(" "),r("mdb-modal-footer",[r("mdb-btn",{directives:[{name:"mdb-clipboard",rawName:"v-mdb-clipboard",value:t.citation_content,expression:"citation_content"}]},[t._v("Copy")])],1)],1),t._v(" "),r("mdb-modal",{staticClass:"navbar-offset",attrs:{"remove-backdrop":"",show:t.helpModal},on:{close:function(e){t.helpModal=!1}}},[r("mdb-modal-header",[r("mdb-modal-title",[t._v("Search Queries")])],1),t._v(" "),r("mdb-modal-body",[t._v('\n      Title:keyword | Title:"multiple keywords"'),r("br"),t._v('\n      Abstract:keyword | Abstract:"multiple keywords"'),r("br"),t._v('\n      Authors:keyword | Authors:"multiple keywords"'),r("br"),t._v('\n      Source:keyword | Source:"multiple keywords"'),r("br"),t._v('\n      Subject:keyword | Subject:"multiple keywords"'),r("br"),t._v("\n      Year:from year"),r("br"),t._v("\n      Citations:minimum count"),r("br")]),t._v(" "),r("mdb-modal-footer",[r("mdb-btn",{nativeOn:{click:function(e){t.helpModal=!1}}},[t._v("Close")])],1)],1)],2)}),[],!1,null,null,null);e.default=component.exports}}]);