(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"059d08e1bc37d5281f5a":function(e,t,n){(e.exports=n("c138e55a31f3f8960e99")(!1)).push([e.i,'.highlight:hover{cursor:pointer;background-color:#f5f5f5}.deleteButton{background-color:#ff1744;flex:1 1 auto;min-width:150px;padding:8px;border:0 solid #f7f7f7;text-align:center;text-transform:uppercase;position:relative;overflow:hidden;transition:.3s;border-radius:10px;color:#fff}.deleteButton:after{position:absolute;transition:.3s;content:"";width:0;left:50%;bottom:0;height:3px;background:#f7f7f7}.deleteButton:hover{cursor:pointer}.deleteButton:hover:after{width:100%;left:0}.pulse-loading span{display:inline-block;width:10px;height:10px;border-radius:100%;background-color:#fff;opacity:0;margin:0 2px}.pulse-loading span:first-child{animation:opacityChange 1s ease-in-out infinite}.pulse-loading span:nth-child(2){animation:opacityChange 1s ease-in-out .33s infinite}.pulse-loading span:nth-child(3){animation:opacityChange 1s ease-in-out .66s infinite}@keyframes opacityChange{0%,to{opacity:0}60%{opacity:1}}',""])},"1bc064093f827a5ce36e":function(e,t,n){var o=n("059d08e1bc37d5281f5a");"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("1e4534d1d62a11482e97")(o,r);o.locals&&(e.exports=o.locals)},"1e579025aece93aebe67":function(e,t,n){"use strict";var o=n("8e6d34d5e2b1c9c449c0");Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.default}});var r=o(n("2949ae7dfd9d84c736e1"))},"2949ae7dfd9d84c736e1":function(e,t,n){"use strict";var o=n("8e6d34d5e2b1c9c449c0");Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.styles=void 0;var r=o(n("2c62cf50f9b98ad5e2af")),a=o(n("8af190b70a6bc55c6f1b")),i=(o(n("8a2d1b95e05b6a321e74")),o(n("4a683f0a5e64e66a8eb9"))),c=o(n("921c0b8c557fe6ba5da8")),s={root:{}};function l(e){return a.default.createElement(c.default,(0,r.default)({component:"p",variant:"subheading",color:"textSecondary"},e))}t.styles=s,l.propTypes={};var u=(0,i.default)(s,{name:"MuiDialogContentText"})(l);t.default=u},bb0b99d2a1af9ef6a835:function(e,t,n){"use strict";n.r(t);var o,r=n("8af190b70a6bc55c6f1b"),a=n.n(r),i=n("d7dd51e1bf6bfc2c9c3d"),c=n("0d7f0986bcd2f33d8a2a"),s=n("ab4cb61bcb2dc161defb"),l=n("2aea235afd5c55b8b19b"),u=n.n(l),f=n("eacaf7f7f6a0d4f50d5f"),d=n("cb49635b1e03f4e732ca"),p=n("a462ee32e1c725be9534"),b=n("d043e26c5c08dfa76c0b"),m=n("26139f95396dbdbb49e2"),h=n("90b6168ae9ef7572daca"),v=n("0ceb7ba6e72e3675adfe"),y=n.n(v),g=n("5d8a14b3bc829c726b3d"),C=n("e68eb59aa96fc65ab714"),w=n.n(C),O=(o="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,n,r){var a=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&a)for(var c in a)void 0===t[c]&&(t[c]=a[c]);else t||(t=a||{});if(1===i)t.children=r;else if(i>1){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+3];t.children=s}return{$$typeof:o,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}),j=function(e){var t=e.customers,n=e.onClick;return O(y.a,{filterable:!0,defaultFilterMethod:function(e,t){return String(t[e.id])===e.value},data:t,columns:[{Header:"Name",accessor:"name",Cell:function(e){var t=[{name:"Edit Customer",onClick:function(){return n(e.original.id)}}];return O(f.a,{menus:t},void 0,function(t){return O("div",{role:"button"},void 0,e.value," ",O(w.a,{style:{fontSize:"16px"},className:"highlight",onClick:t}))})},filterMethod:function(e,t){return Object(g.a)(t,e.value,{keys:["name"]})},filterAll:!0},{Header:"Address",accessor:"address",filterMethod:function(e,t){return Object(g.a)(t,e.value,{keys:["address"]})},filterAll:!0},{Header:"Phone",accessor:"phone",filterMethod:function(e,t){return Object(g.a)(t,e.value,{keys:["address"]})},filterAll:!0}]})},S=n("677f6304e7e2a01ca497"),x=n.n(S),k=n("edc5ec6b13db97ea0a32"),P=n("711f9393a7bdb8588a8c"),_=n("344634a02b5227339006"),E=n("618a09cae216a492531b"),A=n("9908bed6c94172e45a7c"),N=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,o,r){var a=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&a)for(var c in a)void 0===n[c]&&(n[c]=a[c]);else n||(n=a||{});if(1===i)n.children=r;else if(i>1){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+3];n.children=s}return{$$typeof:e,type:t,key:void 0===o?null:""+o,ref:null,props:n,_owner:null}}}(),F=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();function T(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var R=function(e){function t(){var e,n,o,r,a,i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var c=arguments.length,s=Array(c),l=0;l<c;l++)s[l]=arguments[l];return n=o=T(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),o.state={loading:!1},o.handleFormSubmit=(r=regeneratorRuntime.mark(function e(t){var n,r,a,c,s;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.props,r=n.addCustomer,a=n.onClose,c=n.reset,o.setState({loading:!0}),e.prev=2,e.next=5,r(t.toObject(),function(){a(),c(),o.setState({loading:!1})});case 5:e.next=12;break;case 7:e.prev=7,e.t0=e.catch(2),s=e.t0.response,o.setState({loading:!1}),s.data.error.errors.forEach(function(e){throw new k.SubmissionError((t={},n=e.path,o=e.message,n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o,t));var t,n,o});case 12:case"end":return e.stop()}},e,i,[[2,7]])}),a=function(){var e=r.apply(this,arguments);return new Promise(function(t,n){return function o(r,a){try{var i=e[r](a),c=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(c).then(function(e){o("next",e)},function(e){o("throw",e)});t(c)}("next")})},function(e){return a.apply(this,arguments)}),T(o,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r["Component"]),F(t,[{key:"render",value:function(){var e=this.props,t=e.onClose,n=e.handleSubmit;return N("section",{},void 0,N(x.a,{visible:this.props.visible,width:"60%",height:"80%",effect:"fadeInUp"},void 0,N("div",{className:"d-flex justify-content-between"},void 0,N("h2",{className:"pl-5 pt-3"},void 0,"Add Customer"),N(u.a,{color:"secondary",onClick:function(){return t()}},void 0,N(P.Clear,{}))),N("hr",{className:"m-0"}),N("div",{className:"m-4",style:{height:"80%",padding:"0 3%"}},void 0,N("form",{className:"add-product-form",onSubmit:n(this.handleFormSubmit)},void 0,N(k.Field,{name:"name",component:_.a,label:"Name",type:"text"}),N(k.Field,{name:"address",component:_.a,label:"Address",type:"text"}),N(k.Field,{name:"phone",component:_.a,label:"Phone",type:"text"}),N(E.a,{name:"Add Customer",isLoading:this.state.loading})))))}}]),t}();var V=Object(k.reduxForm)({form:"addcustomer",validate:function(e){var t=e.toObject(),n=t.name,o=t.address,r=t.phone,a={};return n||(a.name="Please enter a name"),o||(a.address="Please enter a address"),r||(a.unit="Please enter a phone number"),a}}),$=Object(i.connect)(function(e){return{formStates:Object(k.getFormValues)("addcustomer")(e)}},{addCustomer:A.a}),M=Object(s.compose)(V,$)(R),D=n("d41784b1a447dc61195d"),I=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,o,r){var a=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&a)for(var c in a)void 0===n[c]&&(n[c]=a[c]);else n||(n=a||{});if(1===i)n.children=r;else if(i>1){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+3];n.children=s}return{$$typeof:e,type:t,key:void 0===o?null:""+o,ref:null,props:n,_owner:null}}}(),B=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();function H(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function o(r,a){try{var i=t[r](a),c=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(c).then(function(e){o("next",e)},function(e){o("throw",e)});e(c)}("next")})}}function L(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var Y=function(e){function t(){var e,n,o,r,a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var i=arguments.length,c=Array(i),s=0;s<i;s++)c[s]=arguments[s];return n=o=L(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),o.state={loading:!1},o.handleFormSubmit=(r=H(regeneratorRuntime.mark(function e(t){var n,r,i,c,s,l;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=o.props,r=n.editCustomer,i=n.onClose,c=n.reset,s=n.customer,o.setState({loading:!0}),e.prev=2,e.next=5,r(s.id,t.toObject(),function(){i(),c(),o.setState({loading:!1})});case 5:e.next=12;break;case 7:e.prev=7,e.t0=e.catch(2),l=e.t0.response,o.setState({loading:!1}),l.data.error.errors.forEach(function(e){throw new k.SubmissionError((t={},n=e.path,o=e.message,n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o,t));var t,n,o});case 12:case"end":return e.stop()}},e,a,[[2,7]])})),function(e){return r.apply(this,arguments)}),o.handleDelete=H(regeneratorRuntime.mark(function e(){var t,n,r,i,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.props,n=t.deleteCustomer,r=t.onClose,i=t.reset,c=t.customer,o.setState({loading:!0}),e.next=4,n(c.id);case 4:r(),i(),o.setState({loading:!1});case 7:case"end":return e.stop()}},e,a)})),L(o,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r["Component"]),B(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.onClose,o=t.handleSubmit,r=t.visible,a=t.customer;return I("section",{},void 0,I(x.a,{visible:r,width:"60%",height:"80%",effect:"fadeInUp"},void 0,I("div",{className:"d-flex justify-content-between"},void 0,I("h2",{className:"pl-5 pt-3"},void 0,"Edit ",a&&a.name),I(u.a,{color:"secondary",onClick:function(){return n()}},void 0,I(P.Clear,{}))),I("hr",{className:"m-0"}),I("div",{className:"m-4",style:{height:"80%",padding:"0 3%"}},void 0,I("form",{className:"add-customer-form",onSubmit:o(this.handleFormSubmit)},void 0,I(k.Field,{name:"name",component:_.a,label:"Name",type:"text"}),I(k.Field,{name:"address",component:_.a,label:"Address",type:"text"}),I(k.Field,{name:"phone",component:_.a,label:"Phone",type:"text"}),I("div",{className:"d-flex justify-content-between"},void 0,I(E.a,{name:"Edit Customer",isLoading:this.state.loading}),I(D.a,{title:"Are you sure?",content:"this cannot be undone",onYes:this.handleDelete},void 0,function(t){return I(E.a,{className:"deleteButton",name:"Delete Customer",isLoading:e.state.loading,click:t,type:"button"})}))))))}}]),t}();var z=Object(k.reduxForm)({form:"editcustomer",enableReinitialize:!0,validate:function(e){var t=e.toObject(),n=t.name,o=t.address,r=t.phone,a={};return n||(a.name="Please enter a name"),o||(a.address="Please enter a address"),r||(a.unit="Please enter a phone number"),a}}),J=Object(i.connect)(function(e,t){return{formStates:Object(k.getFormValues)("editcustomer")(e),initialValues:t.customer}},{editCustomer:A.c,deleteCustomer:A.b}),U=Object(s.compose)(J,z)(Y);n("1bc064093f827a5ce36e");n.d(t,"CustomerPage",function(){return Q});var q=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,n,o,r){var a=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&a)for(var c in a)void 0===n[c]&&(n[c]=a[c]);else n||(n=a||{});if(1===i)n.children=r;else if(i>1){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+3];n.children=s}return{$$typeof:e,type:t,key:void 0===o?null:""+o,ref:null,props:n,_owner:null}}}(),G=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();function K(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var Q=function(e){function t(){var e,n,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,a=Array(r),i=0;i<r;i++)a[i]=arguments[i];return n=o=K(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),o.state={modalAddCustomerVisible:!1,modalEditCustomerVisible:!1,editCustomerId:""},K(o,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.a.Component),G(t,[{key:"componentDidMount",value:function(){(0,this.props.getCustomers)()}},{key:"render",value:function(){var e=this,t=this.props.customers,n=this.state,o=n.modalAddCustomerVisible,r=n.modalEditCustomerVisible,a=n.editCustomerId,i=[{name:"Add Customer",onClick:function(){e.setState({modalAddCustomerVisible:!0})}}];return q("div",{},void 0,q(c.Helmet,{},void 0,q("title",{},void 0,"Customer"),q("meta",{name:"description",content:"Description of CustomerPage"})),q(p.a,{},void 0,q(d.a,{xs:12,sm:12,md:12},void 0,q(M,{onClose:function(){return e.setState({modalAddCustomerVisible:!1})},visible:o}),q(U,{onClose:function(){return e.setState({modalEditCustomerVisible:!1})},visible:r,customer:t.find(function(e){return e.id===a})}),q(b.a,{},void 0,q(m.a,{color:"primary"},void 0,q("h4",{className:"m-0"},void 0,"Customer")),q(h.a,{},void 0,q(f.a,{menus:i},void 0,function(e){return q(u.a,{color:"primary",onClick:e,className:"mb-3"},void 0,"Customer Menu")}),q(j,{customers:t,onClick:function(t){return e.setState({modalEditCustomerVisible:!0,editCustomerId:t})}}))))))}}]),t}(),W=Object(i.connect)(function(e){return{customers:e.get("customers")}},{getCustomers:A.d});t.default=Object(s.compose)(W)(Q)},d41784b1a447dc61195d:function(e,t,n){"use strict";var o,r=n("8af190b70a6bc55c6f1b"),a=n.n(r),i=n("2aea235afd5c55b8b19b"),c=n.n(i),s=n("e727e731a9bed8ec3c2a"),l=n.n(s),u=n("10e4c616cb3b01bafafd"),f=n.n(u),d=n("1551459233b95bf53af9"),p=n.n(d),b=n("1e579025aece93aebe67"),m=n.n(b),h=n("eb6b79030a47f0b10efc"),v=n.n(h),y=(o="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,n,r){var a=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&a)for(var c in a)void 0===t[c]&&(t[c]=a[c]);else t||(t=a||{});if(1===i)t.children=r;else if(i>1){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+3];t.children=s}return{$$typeof:o,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}),g=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();function C(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var w=function(e){function t(){var e,n,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r=arguments.length,a=Array(r),i=0;i<r;i++)a[i]=arguments[i];return n=o=C(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(a))),o.state={open:!1},o.handleClickOpen=function(){o.setState({open:!0})},o.handleClose=function(){o.setState({open:!1})},C(o,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.a.Component),g(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.title,o=t.content,r=t.noText,a=t.yesText,i=t.onYes;return y("div",{},void 0,this.props.children(this.handleClickOpen),y(l.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},void 0,y(v.a,{id:"alert-dialog-title"},void 0,n),y(p.a,{},void 0,y(m.a,{id:"alert-dialog-description"},void 0,o)),y(f.a,{},void 0,y(c.a,{onClick:this.handleClose,color:"primary"},void 0,r),y(c.a,{onClick:function(){e.handleClose(),i()},color:"secondary"},void 0,a))))}}]),t}();w.defaultProps={onYes:function(){},noText:"Cancel",yesText:"Ok"},t.a=w}}]);