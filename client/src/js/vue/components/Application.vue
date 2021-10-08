<template>
    <div id="application-vue" class="col-12 col-xl-6">
        <template v-if="loaded">
            <application-submitted v-if="submitted" />

            <application-form v-else-if="currentUser && currentUser.canApply" @submit="submitApplication" />

            <div v-else class="alert alert-info mb-xl-5">
                <h5 class="font-secondary text-uppercase fw-bold">
                    You are unable to apply to our unit at this time
                </h5>

                <p class="mb-2">
                    This is due to at least one of the following reasons:
                </p>

                <ul class="mb-3">
                    <li>You have not yet joined the Fighting 36th Discord. Join <a :href="discordInvite">here</a>.</li>
                    <li>You already have a pending application.</li>
                    <li>Your previous application has been rejected, and you may not yet reapply.</li>
                    <li>You are already a member of The Fighting 36th. Why are you even here?</li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
import {mapState} from 'vuex';

import ApplicationSubmitted from './ApplicationSubmitted';
import ApplicationForm from './ApplicationForm';

export default {
    components: {
        ApplicationSubmitted,
        ApplicationForm
    },

    data () {
        return {
            loaded       : false,
            submitted    : false,
            discordInvite: process.env.DISCORD_INVITE_URL
        };
    },

    computed: {
        ...mapState(['questions', 'currentUser'])
    },

    async mounted () {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        // without a code, we cant fetch the user info, so we need to send them to discord to get us a code
        if (!code) {
            window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.APPLY_URL)}&response_type=code&scope=identify`;

            return;
        }

        // attempt to login the user with the provided code, but if the code fails, reload the application page
        try {
            const {data} = await this.axios.post('/login', {code, redirect: process.env.APPLY_URL});

            this.$store.commit('SET', {
                key: 'currentUser',
                val: data
            });
        } catch (e) {
            window.location.href = '/apply';

            return;
        }

        this.loaded = true;
    },

    methods: {
        submitApplication () {
            // simulate submission of application
            setTimeout(() => {
                this.submitted = true;
            }, 250);
        }
    }
};
</script>