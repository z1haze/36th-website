function validateForm (form) {
    let isValid = true;

    if (form.tagName.toLowerCase() !== 'form' || !(event)) {
        return isValid;
    }

    if (!form.checkValidity()) {
        isValid = false;
    }

    for (let i = 0; i < form.elements.length; i++) {
        const field = form.elements[i];

        if (field.tagName.toLowerCase() !== 'button') {
            validateField(field);
        }
    }

    form.classList.add('validated');

    return isValid;
}

function validateField (field) {
    let feedbackEl = field.nextElementSibling;

    // make feedback element exists
    if (!feedbackEl || !feedbackEl.classList.contains('feedback')) {
        feedbackEl = document.createElement('div');
        feedbackEl.classList.add('feedback');

        field.parentNode.insertBefore(feedbackEl, field.nextSibling);
    }

    if (field.validity.valueMissing) {
        feedbackEl.innerHTML = field.dataset.missingError || field.validationMessage;
    } else if (field.validity.tooShort) {
        feedbackEl.innerHTML = field.dataset.rangeError || field.validationMessage;
    } else if (field.validity.patternMismatch) {
        feedbackEl.innerHTML = field.dataset.patternError || field.validationMessage;
    }
}

module.exports = {
    init: () => {
        const contactForm = document.getElementById('contact-form');

        contactForm.setAttribute('novalidate', true);
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // prevent multiple submissions
            if (event.currentTarget.classList.contains('submitted')) {
                return false;
            }

            const isValid = validateForm(event.currentTarget);

            // hide any alerts
            event.currentTarget.querySelectorAll('.alert').forEach((el) => el.classList.add('d-none'));

            if (!isValid) {
                return false;
            }

            // do async things

            // show success
            event.currentTarget.querySelector('.alert-success').classList.remove('d-none');
            event.currentTarget.classList.add('submitted');
        });
    }
};