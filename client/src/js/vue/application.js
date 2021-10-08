const {default: Vue} = require("vue");
const store = require("./stores/application");
const {default: App} = require("./components/Application");

const {default: VueAxios} = require("vue-axios");
const axios = require("axios");

Vue.use(VueAxios, axios);

module.exports = () => {
    new Vue({
        store,
        render: h => h(App),
    }).$mount('#application-vue');
}