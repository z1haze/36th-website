module.exports = () => {
    document.addEventListener('DOMContentLoaded', function () {
        let lazyloadThrottleTimeout;

        function lazyload () {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            const lazyloadImages = document.querySelectorAll('img.lazy');

            lazyloadThrottleTimeout = setTimeout(function () {
                const scrollTop = window.pageYOffset;
                const offset = 500;

                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop + offset)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');

                        img.addEventListener('error', () => {
                            img.setAttribute('src', '/img/basic.png');
                        });
                    }
                });

                if (lazyloadImages.length === 0) {
                    document.removeEventListener('scroll', lazyload);
                    window.removeEventListener('resize', lazyload);
                    window.removeEventListener('orientationChange', lazyload);
                }
            }, 20);
        }

        lazyload();

        document.addEventListener('scroll', lazyload);
        window.addEventListener('resize', lazyload);
        window.addEventListener('orientationChange', lazyload);
    });
};