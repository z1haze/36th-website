export default ({next, store, permission}) => {
    if (!store.state.currentUser) {
        return next({name: 'login'});
    }

    const can = store.getters.hasPermission(permission);

    if (can) {
        return next();
    } else {
        return next({name: 'no-permission'});
    }
};