(window.webpackJsonp=window.webpackJsonp||[]).push([["home"],{a378:function(t,a,n){},bb51:function(t,a,n){"use strict";n.r(a);var e=(n("96cf"),n("1da1")),i={data:function(){return{articles:[],pagination:{totalPage:1,currentPage:1}}},methods:{fetchData:function(){var t=this;return Object(e.a)(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("/articles/".concat(t.pagination.currentPage));case 2:n=a.sent,t.articles=n.data.list,t.pagination.totalPage=n.data.totalPage,t.pagination.currentPage=n.data.currentPage;case 6:case"end":return a.stop()}}),a)})))()},goToPage:function(t){var a=this;return Object(e.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a.pagination.currentPage=t,a.fetchData();case 2:case"end":return n.stop()}}),n)})))()},prev:function(){1!=this.pagination.currentPage&&(this.pagination.currentPage--,this.fetchData())},next:function(){this.pagination.currentPage!=this.pagination.totalPage&&(this.pagination.currentPage++,this.fetchData())}},created:function(){this.fetchData()}},s=(n("bc4f"),n("2877")),r=Object(s.a)(i,(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"main-container mb-9"},[n("div",{staticClass:"post-container d-flex flex-wrap jc-center ai-center"},t._l(t.articles,(function(a,e){return n("div",{key:e},[n("div",{staticClass:"show home-art"},[n("router-link",{staticClass:"top mt-10 mx-8 mb-0 hand",style:{"background-image":"url("+a.icon+")"},attrs:{tag:"div",to:"/article/list/"+a._id}}),n("div",{staticClass:"bg-postcolor pt-8 mx-8 title"},[n("router-link",{staticClass:"fs-xxl jc-center d-flex flex-wrap hand text-grey-1",attrs:{tag:"span",to:"/article/list/"+a._id}},[t._v(t._s(a.title))]),n("div",{staticClass:"d-flex mt-4 p-7 text-grey-1"},[n("i",{staticClass:"iconfont icon-xinzengyudingicon- pr-2"}),n("span",{staticClass:"fs-sm"},[t._v(" "+t._s(t._f("date")(a.createdAt,"YYYY-MM-DD"))+" ")]),n("i",{staticClass:"iconfont icon-inbox1 pl-9"}),n("router-link",{staticClass:"fs-sm pl-2 mr-6 hand",attrs:{tag:"span",to:"/tags"}},[t._v(t._s(a.categories[0].name))]),n("i",{staticClass:"iconfont icon-love- text-red hand"})],1)],1)],1)])})),0),n("div",{staticClass:"my-10"},[n("div",{staticClass:"page-navigator d-flex jc-center"},[n("div",{staticClass:"mx-4 hand fs-md",class:{current:1==t.pagination.currentPage}},[n("a",{attrs:{"data-hover":"首页"},on:{click:function(a){return t.goToPage(1)}}},[n("span",{staticClass:"text-grey-1"},[t._v("首页")])])]),n("div",{staticClass:"mx-4 hand fs-md"},[n("a",{on:{click:function(a){return t.prev()}}},[n("span",{staticClass:"text-grey-1"},[t._v("«")])])]),t._l(t.pagination.totalPage,(function(a){return n("div",{key:a,staticClass:"mx-4 hand fs-md",class:{current:a==t.pagination.currentPage}},[n("a",{staticClass:"text-grey-1",attrs:{"data-hover":a},on:{click:function(n){return t.goToPage(a)}}},[t._v(t._s(a))])])})),n("div",{staticClass:"mx-4 hand fs-md"},[n("a",{on:{click:function(a){return t.next()}}},[n("span",{staticClass:"text-grey-1"},[t._v("»")])])]),n("div",{staticClass:"mx-4 hand fs-md",class:{current:t.pagination.totalPage==t.pagination.currentPage}},[n("a",{attrs:{"data-hover":"末页"},on:{click:function(a){return t.goToPage(t.pagination.totalPage)}}},[n("span",{staticClass:"text-grey-1"},[t._v("末页")])])]),n("div",{staticClass:"current mx-4 fs-md"},[n("span",{staticClass:"text-grey-1"},[t._v(" 第"+t._s(t.pagination.currentPage)+"页 / 共"+t._s(t.pagination.totalPage)+"页 ")])])],2)])])}),[],!1,null,"29d5c7a4",null);a.default=r.exports},bc4f:function(t,a,n){"use strict";var e=n("a378");n.n(e).a}}]);