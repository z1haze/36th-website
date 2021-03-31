import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

import middlewarePipeline from './middleware-pipeline';
import hasPermission from './middleware/has-permission';

Vue.use(VueRouter);

const routes = [
    {
        path     : '/',
        name     : 'home',
        component: () => import('./pages/Home'),
        meta     : {
            layout: 'empty'
        }
    }
];

const router = new VueRouter({
    mode           : 'history',
    routes,
    linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware && !to.meta.permission) {
        return next();
    }

    const middleware = to.meta.middleware || [];

    const context = {
        to,
        from,
        next,
        store
    };

    if (to.meta.permission) {
        context.permission = to.meta.permission;
        middleware.unshift(hasPermission);
    }

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    });
});

export default router;