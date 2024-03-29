require('regenerator-runtime/runtime');

const {WOW} = require('wowjs');
const Swiper = require('swiper/bundle').default;

// wow js stuff w/animate.css
const wow = new WOW({
    boxClass    : 'wow',
    animateClass: 'animated',
    offset      : 0,
    mobile      : false,
    live        : true
});

wow.init();

// initialize sliders
new Swiper('.swiper-container', {
    loop         : true,
    slidesPerView: 5,
    speed        : 1000,

    autoplay: {
        delay: 8000,
    },

    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1200: {
            slidesPerView: 3
        },
        1400: {
            slidesPerView: 5
        }
    }
});

// mobile hamburger class toggle
document.getElementById('hamburger').addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('open');
    document.querySelector('#site-header').classList.toggle('open');
});

// preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('hide');

    setTimeout(() => {
        preloader.classList.add('d-none');
    }, 750); // matches opacity transition
});

// init form handling
require('./util/forms').init();

// image lazy loading
require('./util/lazyload')();

console.log('Loaded! 😀'); // eslint-disable-line no-console