import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentUser: null
    },

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
        init: ({commit}) => new Promise((resolve) => setTimeout(function () {
            commit('SET', {
                key: 'currentUser',
                val: {roles: []}
            });

            resolve();
        }, 1000))
    },

    getters: {
        hasPermission: (state) => (permission) => {
            if (!state.currentUser) {
                return false;
            }

            return state.currentUser.roles.some((role) => {
                /* eslint-disable camelcase */
                return role.permissions.some(({permission_id}) => {
                    return permission === permission_id;
                });
                /* eslint-enable camelcase */
            });
        },
    }
});

export default store;