const bs = require('bootstrap');
const {WOW} = require('wowjs');
const Swiper = require('swiper/bundle').default;

[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    .map((el) => new bs.Popover(el));

const wow = new WOW({
    boxClass    : 'wow',
    animateClass: 'animated',
    offset      : 0,
    mobile      : false,
    live        : true
});

wow.init();

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

document.getElementById('hamburger').addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('open');
    document.querySelector('#site-header').classList.toggle('open');
});

console.log('Loaded! 😀'); // eslint-disable-line no-console