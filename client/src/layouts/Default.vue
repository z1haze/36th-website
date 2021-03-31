<template>
    <div>
        <main-nav />

        <main>
            <slot />
        </main>

        <site-footer />
    </div>
</template>

<script>
import MainNav from '../components/MainNav';
import SiteFooter from '../components/SiteFooter';

export default {
    components: {
        MainNav,
        SiteFooter
    }
};
</script>