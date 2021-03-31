<template>
    <div>
        <component :is="layout">
            <transition :name="transitionName">
                <router-view />
            </transition>

            <vue-progress-bar />
        </component>
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            transitionName: 'fade'
        };
    },

    computed: {
        layout () {
            return this.$route.meta.layout || 'default';
        }
    }
};
</script>