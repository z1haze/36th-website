import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},

    mutations: {
        SET: (state, {obj, key, val}) => {
            Vue.set(obj || state, key, val);
        },

        PUSH: (state, {obj, key, val}) => {
            (obj || (state[key])).push(val);
        },

        SPLICE: (state, {obj, key, index, length = 1, val}) => {
            if (val) {
                (obj || state[key]).splice(index, length, val);
            } else {
                (obj || state[key]).splice(index, length);
            }
        },

        DELETE: (state, {obj, key}) => {
            Vue.delete(obj || state, key);
        }
    },

    actions: {
        init: () => null
    },

    getters: {}
});

export default store;