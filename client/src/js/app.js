const bs = require('bootstrap');

const {WOW} = require('wowjs');

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

console.log('Loaded! 😀'); // eslint-disable-line no-console