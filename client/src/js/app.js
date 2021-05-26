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
    }
});

console.log('Loaded! 😀'); // eslint-disable-line no-console