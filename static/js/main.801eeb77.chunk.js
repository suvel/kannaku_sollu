(this["webpackJsonpkannaku-react"]=this["webpackJsonpkannaku-react"]||[]).push([[0],{49:function(e,t,n){},50:function(e,t,n){},53:function(e,t,n){},54:function(e,t,n){},56:function(e,t,n){},59:function(e,t,n){},60:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},64:function(e,t,n){},65:function(e,t,n){},66:function(e,t,n){},67:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){},70:function(e,t,n){},71:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var c=n(2),a=n.n(c),r=n(14),o=n.n(r),i=(n(49),n(3)),s=n(4),l=n(44),d=(n(50),n(1)),u=["name","variant","customClass"],j=function(e){var t=e.name,n=e.variant,c=void 0===n?"solid":n,a=e.customClass,r=Object(l.a)(e,u);return Object(d.jsx)("button",Object(s.a)(Object(s.a)({className:"btn ".concat(c," ").concat(a)},r),{},{children:t}))},b=n(12),m=(n(53),function(e){var t=e.number,n=e.description,c=e.children,a=e.goToNxtStep,r=e.currentStep,o=e.show,i=t<4&&r==t,s=Object(b.useSpring)({repeat:!0,cancel:r<t,to:[{opacity:1,transform:"translateX(0px)"}],from:{opacity:0,transform:"translateX(-500px)"},delay:500}),l=Object(b.useSpring)({repeat:!0,cancel:r<t,to:[{opacity:1,transform:"translateX(0px)"}],from:{opacity:0,transform:"translateX(-500px)"},delay:250}),u=Object(b.useSpring)({repeat:!0,cancel:r<t,to:[{opacity:1,transform:"translateY(0px)"}],from:{opacity:0,transform:"translateY(-500px)"},delay:250});return o&&Object(d.jsxs)("div",{className:"step step".concat(t),children:[Object(d.jsx)(b.animated.div,{style:s,className:"step__desc",children:n}),Object(d.jsxs)("div",{className:"step__head",children:[Object(d.jsx)(b.animated.div,{style:l,className:"step__stringno",children:"Step ".concat(t)}),Object(d.jsx)(b.animated.div,{style:u,className:"step__bigno",children:Object(d.jsx)("div",{className:"step__no",children:t})})]}),Object(d.jsxs)(b.animated.div,{style:u,className:"step__main",children:[c,Object(d.jsx)("div",{className:"step__next-action show_".concat(i),children:Object(d.jsx)(j,{name:"What Next \ud83e\udd37\u200d\u2640\ufe0f?",onClick:function(){return a(t+1)},variant:"solid"})})]})]},t)}),O=(n(54),n(42));n(56);var p=function(e){var t=e.columns,n=e.data,c=e.style;t.unshift({Header:"#",accessor:"sno"});var a,r=Object(O.useTable)({columns:t,data:(a=n,a.map((function(e,t){return Object(s.a)(Object(s.a)({},e),{},{sno:t+1})})))}),o=r.getTableProps,i=r.getTableBodyProps,l=r.headerGroups,u=r.rows,j=r.prepareRow;return Object(d.jsxs)("table",Object(s.a)(Object(s.a)({style:c},o()),{},{children:[Object(d.jsx)("thead",{children:l.map((function(e){return Object(d.jsx)("tr",Object(s.a)(Object(s.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(d.jsx)("th",Object(s.a)(Object(s.a)({},e.getHeaderProps()),{},{children:e.render("Header")}))}))}))}))}),Object(d.jsx)("tbody",Object(s.a)(Object(s.a)({},i()),{},{children:u.map((function(e,t){return j(e),Object(d.jsx)("tr",Object(s.a)(Object(s.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(d.jsx)("td",Object(s.a)(Object(s.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))},h=n(5),f=n(7),x=n(43),v=n.n(x),g=function(){return v()()},N=function(){function e(t,n,c){Object(h.a)(this,e),this.icon=n,this.prdName=t,this.prdPrice=c}return Object(f.a)(e,[{key:"getProduct",value:function(){return{id:g(),icon:this.icon,prdName:this.prdName,prdPrice:this.prdPrice}}}]),e}(),_=function(e){var t=[];return e.forEach((function(e){var n=new N(e.prdName,e.icon,e.prdPrice);t.push(n.getProduct())})),t},w=function(){function e(t){Object(h.a)(this,e),this.memName=t}return Object(f.a)(e,[{key:"getMember",value:function(){return{id:g(),memName:this.memName}}}]),e}(),C=function(e){var t=[];return e.forEach((function(e){var n=new w(e.memName);t.push(n.getMember())})),t},y=n(35),S=(n(58),{products:_([{icon:"\ud83c\udf6a",prdName:"Butter Biscuit",prdPrice:"10"},{icon:"\ud83c\udf4e",prdName:"Apple",prdPrice:"20"},{icon:"\ud83d\udeac",prdName:"Cigaret",prdPrice:"18"},{icon:"\u2615",prdName:"Coffee",prdPrice:"10"}]),members:C([{memName:"Drake Remorey"}]),shares:[],billName:"Untitled Bill"}),E="SET_PROD",P="SET_MEMBER",M="SET_SHARE";function k(e,t){switch(t.type){case E:return Object(s.a)(Object(s.a)({},e),{},{products:t.value});case P:return Object(s.a)(Object(s.a)({},e),{},{members:t.value});case M:return Object(s.a)(Object(s.a)({},e),{},{shares:t.value});default:throw new Error}}var A=Object(c.createContext)(),R=function(e){var t=e.children,n=Object(c.useReducer)(k,S),a=Object(i.a)(n,2),r=a[0],o=a[1];return Object(d.jsxs)(A.Provider,{value:{state:r,dispatch:o,notify:function(e){return Object(y.b)(e)}},children:[t,Object(d.jsx)(y.a,{})]})},T=(n(59),function(e){var t=e.onClick;return Object(d.jsx)("button",{className:"remove-btn",onClick:t,children:"\u274c"})}),I=function(e){var t=e.toggleAddPrdModal,n=Object(c.useContext)(A),r=n.state,o=n.dispatch,i=a.a.useMemo((function(){return[{Header:"ICON",accessor:"icon"},{Header:"PROD NAME",accessor:"prdName"},{Header:"PRICE",accessor:"prdPrice"},{Header:"ACTION",Cell:function(e){var t=e.cell;return Object(d.jsx)(T,{onClick:function(){return function(e){var t=e.row.original.id,n=r.products.filter((function(e){return e.id!==t}));o({type:E,value:n})}(t)}})}}]}),[r.products]),s=a.a.useMemo((function(){return(null===r||void 0===r?void 0:r.products)||[]}),[r]);return Object(d.jsxs)("div",{className:"step1",children:[Object(d.jsx)(p,{style:{width:"600px"},columns:i,data:s}),Object(d.jsx)("div",{className:"step1__action",children:Object(d.jsx)(j,{onClick:function(){return t(!0)},name:"Add",variant:"solid"})})]})},B=(n(60),function(e){var t=e.toggleAddMemberModal,n=Object(c.useContext)(A),r=n.state,o=n.dispatch,i=a.a.useMemo((function(){return[{Header:"NAME",accessor:"memName"},{Header:"ACTION",Cell:function(e){var t=e.cell;return Object(d.jsx)(T,{onClick:function(){return function(e){var t=e.row.original.id,n=r.members.filter((function(e){return e.id!==t}));o({type:P,value:n})}(t)}})}}]}),[r.members]);return Object(d.jsxs)("div",{className:"step2",children:[Object(d.jsx)(p,{columns:i,data:null===r||void 0===r?void 0:r.members}),Object(d.jsx)("div",{className:"step2__action",children:Object(d.jsx)(j,{onClick:function(){return t(!0)},name:"Add",variant:"solid"})})]})}),H=(n(61),n(62),function(e){var t=Object.assign({},e);return Object(d.jsx)(j,Object(s.a)({name:"\ud83d\udd01 Refresh",variant:"outlined",customClass:"refresh-btn"},t))}),D=function(e,t){var n=e.split("+"),c=0;return n.forEach((function(e){if(""!==e){var n=e.split("x"),a=Object(i.a)(n,2),r=a[0],o=a[1],s=t.find((function(e){return e.icon==o})).prdPrice;c+=r*s}})),c},F=function(e){var t=e.toggleAddToBillModal,n=Object(c.useContext)(A),r=n.state,o=n.dispatch,s=n.notify,l=a.a.useMemo((function(){return[{Header:"MEMBER",accessor:"memName"},{Header:"PROD EXP",accessor:"prodExp"},{Header:"TOTAL",accessor:"total"}]}),[]);return Object(d.jsxs)("div",{className:"step3",children:[Object(d.jsx)(H,{onClick:function(){var e=r.members,t=r.products,n=r.shares,c=[],a=[],l=e.map((function(e){return e.id}));n.forEach((function(e){l.includes(e.memId)?c.push(e):a.push(e)})),c.forEach((function(e){var n=e.prodExp.split("+"),c=[];n.forEach((function(e){var n=e.split("x"),a=Object(i.a)(n,2),r=(a[0],a[1]);t.find((function(e){return e.icon===r}))&&c.push(e)})),e.prodExp=c.join("+"),e.total=D(e.prodExp,t)})),a&&a.length>0&&function(e){e.map((function(e){return e.memName})).forEach((function(e){return s("".concat(e," removed"))}))}(a),o({type:M,value:c})}}),Object(d.jsx)(p,{columns:l,data:null===r||void 0===r?void 0:r.shares}),Object(d.jsx)("div",{className:"step3__action",children:Object(d.jsx)(j,{onClick:function(){return t(!0)},name:"Add",variant:"solid"})})]})},X=(n(63),function(e,t,n){var c=new Date,a="".concat(c.getDate(),"-").concat(c.getMonth()+1,"-").concat(c.getFullYear()),r=function(){var e="",n=0;return t.forEach((function(t,c){e=e.concat("\n            [".concat(c+1,"]\n            \n\n             _Member Name_:\t").concat(t.memName,"\n\n             _Products_:\t").concat(t.prodExp,"\n\n             _Member total_:\t").concat(t.total,"\n\n            \n\n            ")),n+=t.total})),{billString:e,billTotal:n}}(),o=r.billString,i=r.billTotal;return"".concat(e,"\n\n        date:").concat(a,"\n").concat(o,"\n\n        [Bill Total]\n\t").concat(i,"\n\n        products dictionary:\n\n").concat(function(){var e="";return n.forEach((function(t){e=e.concat(" \t[".concat(t.icon,"]: ").concat(t.prdName," - ").concat(t.prdPrice,"\n"))})),e}())}),L=function(){var e=Object(c.useContext)(A).state,t=Object(c.useState)({name:e.billName,shares:e.shares,products:e.products}),n=Object(i.a)(t,2),a=n[0],r=n[1];return Object(d.jsxs)("div",{className:"bill-print",children:[Object(d.jsxs)("div",{className:"bill-print__action",children:[Object(d.jsx)(j,{onClick:function(){var e=document.createRange();e.selectNode(document.getElementById("bill-text")),window.getSelection().removeAllRanges(),window.getSelection().addRange(e),document.execCommand("copy"),window.getSelection().removeAllRanges(),alert("copied!")},name:"Copy",variant:"solid"}),Object(d.jsx)(j,{onClick:function(){r({name:e.billName,shares:e.shares,products:e.products})},name:"Re-print",variant:"outlined"})]}),Object(d.jsx)("div",{id:"bill-text",className:"bill-pint__text",children:X(a.name,a.shares,a.products)})]})},G=n(8),Y=n(24),J=(n(64),function(e){var t=e.children,n=e.show;return Object(b.useTransition)(n,{from:{opacity:0,transform:"scale(0) translate(-100%, -100%)"},enter:{opacity:1,transform:"scale(1) translate(-50%, -50%)"},leave:{opacity:0,transform:"scale(0) translate(-100%, -100%)"},config:b.config.gentle})((function(e,n){return n&&Object(d.jsx)(b.animated.div,{style:e,className:"modal__container",children:t})}))}),K=(n(65),n(66),function(e){var t=e.children;return Object(d.jsx)("div",{className:"form__title",children:t})}),U=function(e){var t=e.children;return Object(d.jsx)("div",{className:"form__input-group",children:t})},W=function(e){var t=e.children;return Object(d.jsx)("div",{className:"form__action",children:t})},Q=function(e){var t=e.children;return Object(d.jsx)("div",{className:"row",children:t})},q=function(e){var t=e.children;return Object(d.jsx)("div",{className:"col",children:t})},z=function(e){var t=e.label,n=e.component;return Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("label",{children:t}),n]})},V=function(e){var t=e.children;return Object(d.jsx)("div",{className:"form",children:t})},Z={icon:"",prdName:"",prdPrice:""},$=function(e){var t=e.show,n=e.toggleShow,a=Object(c.useContext)(A),r=a.state,o=a.dispatch,l=Object(c.useState)(Z),u=Object(i.a)(l,2),b=u[0],m=u[1],O=function(e,t){var n=e.target.value;m((function(e){return Object(s.a)(Object(s.a)({},e),{},Object(Y.a)({},t,n))}))};return Object(d.jsx)(J,{show:t,children:Object(d.jsx)("div",{className:"add-product-modal___container",children:Object(d.jsxs)(V,{children:[Object(d.jsx)(K,{children:"Add Product"}),Object(d.jsxs)(U,{children:[Object(d.jsx)(Q,{children:Object(d.jsx)(q,{children:Object(d.jsx)(z,{label:"NAME",component:Object(d.jsx)("input",{value:b.name,onChange:function(e){O(e,"prdName")}})})})}),Object(d.jsxs)(Q,{children:[Object(d.jsx)(q,{children:Object(d.jsx)(z,{label:"ICON",component:Object(d.jsx)("input",{value:b.icon,onChange:function(e){O(e,"icon")}})})}),Object(d.jsx)(q,{children:Object(d.jsx)(z,{label:"PRICE",component:Object(d.jsx)("input",{value:b.price,onChange:function(e){O(e,"prdPrice")}})})})]})]}),Object(d.jsxs)(W,{children:[Object(d.jsx)(j,{onClick:function(){var e=new N(b.prdName,b.icon,b.prdPrice),t=[].concat(Object(G.a)(r.products),[e.getProduct()]);o({type:E,value:t}),n(!1),m(Z)},name:"Submit",variant:"solid"}),Object(d.jsx)(j,{onClick:function(){return n(!1)},name:"Cancel",variant:"outlined"})]})]})})})},ee=(n(67),function(e){var t=e.show,n=e.toggleShow,a=Object(c.useState)(""),r=Object(i.a)(a,2),o=r[0],s=r[1],l=Object(c.useContext)(A),u=l.state,b=l.dispatch;return Object(d.jsx)(J,{show:t,children:Object(d.jsx)("div",{className:"add-member-modal___container",children:Object(d.jsxs)(V,{children:[Object(d.jsx)(K,{children:"Add Member"}),Object(d.jsx)(U,{children:Object(d.jsx)(Q,{children:Object(d.jsx)(q,{children:Object(d.jsx)(z,{label:"NAME",component:Object(d.jsx)("input",{value:o,onChange:function(e){var t=e.target.value;s(t)}})})})})}),Object(d.jsxs)(W,{children:[Object(d.jsx)(j,{onClick:function(){var e=new w(o),t=[].concat(Object(G.a)(u.members),[e.getMember()]);b({type:P,value:t}),n(!1),s("")},name:"Submit",variant:"solid"}),Object(d.jsx)(j,{onClick:function(){return n(!1)},name:"Cancel",variant:"outlined"})]})]})})})}),te=(n(68),function(e){var t=e.options,n=e.value,c=e.onChange;return Object(d.jsxs)("div",{className:"varExpIp",children:[Object(d.jsx)("input",{className:"varExpIp__input",value:n,onChange:function(e){var t=e.target.value;c(t)}}),Object(d.jsx)("select",{className:"varExpIp__select",onChange:function(e){var t=n.trim(),a=e.target.value,r=t?"".concat(t,"+1x").concat(a):"1x".concat(a);c(r)},children:null===t||void 0===t?void 0:t.map((function(e){return Object(d.jsx)("option",{children:e})}))})]})}),ne=(n(69),function(e){var t=e.show,n=e.toggleShow,a=Object(c.useContext)(A),r=a.state,o=a.dispatch,s=Object(c.useState)(""),l=Object(i.a)(s,2),u=l[0],b=l[1],m=Object(c.useState)(0),O=Object(i.a)(m,2),p=O[0],h=O[1];return Object(d.jsx)(J,{show:t,children:Object(d.jsx)("div",{className:"add-to-bill-modal___container",children:Object(d.jsxs)(V,{children:[Object(d.jsx)(K,{children:"Add To Bill"}),Object(d.jsxs)(U,{children:[Object(d.jsx)(Q,{children:Object(d.jsx)(q,{children:Object(d.jsx)(z,{label:"MEMBER",component:Object(d.jsxs)("select",{value:p,onChange:function(e){h(e.target.value)},children:[Object(d.jsx)("option",{value:"",selected:!0,children:"Select Member"}),(null===r||void 0===r?void 0:r.members).map((function(e,t){return Object(d.jsx)("option",{value:t,children:"".concat(e.memName)})}))]})})})}),Object(d.jsx)(Q,{children:Object(d.jsx)(q,{children:Object(d.jsx)(z,{label:"PRODUCT EXPRESSION",component:Object(d.jsx)(te,{options:r.products.map((function(e){return e.icon})),value:u,onChange:b})})})})]}),Object(d.jsxs)(W,{children:[Object(d.jsx)(j,{onClick:function(){var e={memId:r.members[p].id,memName:r.members[p].memName,prodExp:u,total:D(u,r.products)},t=[].concat(Object(G.a)(r.shares),[e]);o({type:M,value:t}),b(""),h(0),n(!1)},name:"Submit",variant:"solid"}),Object(d.jsx)(j,{onClick:function(){return n(!1)},name:"Cancel",variant:"outlined"})]})]})})})}),ce=(n(70),function(e){var t=e.show,n=e.toggleShow;return Object(d.jsx)(J,{show:t,children:Object(d.jsxs)("div",{className:"welcome-modal__container",children:[Object(d.jsx)("div",{className:"welcome-modal__content",children:"Welcome\ud83c\udf89 to Kannaku Sollu , here we have simplifed the way you bill your friends\ud83d\udc68\u200d\ud83c\udfeb\ud83d\udc68\u200d\ud83d\udd27\ud83d\udc68\u200d\ud83c\udfa4\ud83d\udc68\u200d\ud83d\ude92\ud83d\udc70\ud83e\uddb8\u200d\u2642\ufe0f."}),Object(d.jsx)("div",{className:"welcome-modal__action",children:Object(d.jsx)(j,{onClick:function(){n(!1)},name:"Start Billing"})})]})})}),ae=(n(71),n(33)),re=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(!1),o=Object(i.a)(r,2),s=o[0],l=o[1],u=Object(c.useState)(!1),j=Object(i.a)(u,2),b=j[0],O=j[1],p=Object(c.useState)(1),h=Object(i.a)(p,2),f=h[0],x=h[1],v=Object(c.useState)(!0),g=Object(i.a)(v,2),N=g[0],_=g[1],w=Object(c.useMemo)((function(){var e=function(e){return f>=e};return[{no:1,show:e(1),description:"Let\u2019s start adding Products \ud83c\udf89",component:Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(I,{toggleAddPrdModal:a}),Object(d.jsx)($,{show:n,toggleShow:a})]})},{no:2,show:e(2),description:"Greater!..\ud83d\ude0a, now add the Members.",component:Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(B,{toggleAddMemberModal:l}),Object(d.jsx)(ee,{show:s,toggleShow:l})]})},{no:3,show:e(3),description:"OK!..., Let\u2019s now starting billing them\ud83e\udd11.",component:Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(F,{toggleAddToBillModal:O}),Object(d.jsx)(ne,{show:b,toggleShow:O})]})},{no:4,show:e(4),description:"Let\u2019s make some money ...\ud83d\udcb8",component:Object(d.jsx)(L,{})}]}),[n,s,b,f]),C=function(e){x(e),ae.scroller.scrollTo("step-".concat(e),{duration:800,delay:0,smooth:"easeInOutQuart"})};return Object(d.jsxs)(d.Fragment,{children:[null===w||void 0===w?void 0:w.map((function(e,t){return Object(d.jsx)(ae.Element,{name:"step-".concat(e.no),children:Object(d.jsx)(m,{number:e.no,description:e.description,goToNxtStep:C,show:e.show,currentStep:f,children:e.component})},t)})),Object(d.jsx)(ce,{show:N,toggleShow:_})]})},oe=n.p+"static/media/logo.4e4c5c77.png",ie=(n(82),function(){return Object(d.jsx)("div",{className:"landingComponent",children:Object(d.jsx)("img",{src:oe})})});n(83);var se=function(){return Object(d.jsxs)("div",{className:"container",children:[Object(d.jsx)("div",{className:"header",children:Object(d.jsx)(ie,{})}),Object(d.jsx)("div",{className:"mainbody",children:Object(d.jsx)(R,{children:Object(d.jsx)(re,{})})})]})};o.a.render(Object(d.jsx)(se,{}),document.getElementById("root"))}},[[84,1,2]]]);
//# sourceMappingURL=main.801eeb77.chunk.js.map