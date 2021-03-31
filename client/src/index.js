import Vue from 'vue';

import Default from './layouts/Default';
import Empty from './layouts/Empty';
import App from './App';

Vue.component('Default', Default);
Vue.component('Empty', Empty);

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueProgressBar from 'vue-progressbar';
import router from './router';
import store from './store';

Vue.use(VueAxios, axios);
Vue.use(VueProgressBar, {
    color      : '#bffaf3',
    failedColor: '#874b4b',
    thickness  : '5px',
    transition : {
        speed      : '0.2s',
        opacity    : '0.6s',
        termination: 300
    },
    autoRevert: true,
    location  : 'top',
    inverse   : false
});

require('bootstrap');
require('regenerator-runtime/runtime');

store.dispatch('init')
    .then(() => {
        const app = new Vue({
            router,
            store,
            render: h => h(App),
        }).$mount('#app');

        Vue.axios.interceptors.request.use((config) => {
            app.$Progress.start();

            return config;
        });

        Vue.axios.interceptors.response.use((response) => {
            app.$Progress.finish();

            return response;
        }, (error) => {
            app.$Progress.fail();

            switch (error.response.status) {
                case 401:
                    app.$store.commit('DELETE', {
                        key: 'currentUser'
                    });

                    app.$router.push('/login');
                    break;
                case 404:
                    app.$router.push('/not-found');
                    break;
                case 500:
                    app.$router.push('/error');
                    break;
                default:
                    throw error;
            }
        });
    });