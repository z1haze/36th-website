const Vue = require('vue').default;
const Vuex = require('vuex');

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentUser: null,
        questions  : [
            {
                title: 'What is your Xbox Live Gamertag?',
                type : 'text'
            },
            {
                title: 'How did you hear about our unit?',
                type : 'textarea'
            },
            {
                title: 'Have you ever participated in a MilSim before? <strong>If yes, please explain the circumstance for your leaving.</strong>',
                type : 'textarea'
            },
            {
                title: 'Are you currently serving or have you served in the United States Armed Forces? If yes, state your branch/rank/MOS.',
                type : 'textarea'
            },
            {
                title      : 'Are you able to communicate your absences at least 24 hours before any scheduled event?',
                type       : 'select',
                placeholder: 'Choose...',
                options    : [
                    'Yes',
                    'No',
                ]
            },
            {
                title: 'What days and times are you available to game?',
                type : 'textarea'
            },
            {
                title: 'What timezone do you reside in?',
                type : 'text'
            },
            {
                title   : 'What are your top 2 preferred classes?',
                type    : 'checkbox',
                messages: {
                    valueMissing: 'Please select exactly 2 options'
                },
                rules: {
                    min: 2,
                    max: 2
                },
                options: [
                    'Assault',
                    'Medic',
                    'Recon',
                    'Support'
                ]
            },
            {
                title: 'What do you feel is the best thing you can contribute to this community?',
                type : 'text'
            },
            {
                title      : 'If a leadership opportunity opens up, would you be interested?',
                type       : 'select',
                placeholder: 'Choose...',
                options    : [
                    'Yes',
                    'No'
                ]
            },
            {
                title: 'What is your personal definition of "communication"?',
                type : 'textarea',
            },
            {
                title: 'What is your personal definition of "integrity"?',
                type : 'textarea',
            },
            {
                title: 'What is your personal definition of "a good leader"?',
                type : 'textarea',
            },
            {
                title: 'Will you be getting Battlefield 2042? Do you already have an Xbox Series X/S?',
                type : 'textarea',
            }
        ]
    },
    mutations: {
        SET: (state, {obj, key, val}) => {
            Vue.set(obj || state, key, val);
        }
    },
    actions: {},
    getters: {}
});

module.exports = store;
