const axios = require('axios');

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

    if (!isValid) {
        const firstError = form.querySelector(':invalid');

        if (firstError) {
            firstError.scrollIntoView({block: 'center'});
            firstError.focus({preventScroll: true});
        }
    }

    return isValid;
}

/**
 * Validation of checkbox elements is difficult, especially when there are multiple options.
 * This is a helper method that attempts to abstract some of that bullshit away
 *
 * @param field
 */
function validateCheckboxField (field) {
    const checkboxFields = field.form.elements[field.name];
    const selections = [];

    checkboxFields.forEach((field) => {
        if (field.checked) {
            selections.push(field.value);
        }
    });

    const firstCheckbox = checkboxFields[0];
    const min = parseInt(firstCheckbox.dataset.min) || 0;
    const max = parseInt(firstCheckbox.dataset.max) || 0;

    // handle invalid case
    if (selections.length < min || selections.length > max) {
        let feedbackEl = firstCheckbox.parentElement.parentElement.querySelector('.feedback');

        // make feedback element exists
        if (!feedbackEl) {
            feedbackEl = document.createElement('div');
            feedbackEl.classList.add('feedback');
            feedbackEl.innerHTML = firstCheckbox.dataset.missingError || 'This field is required.';

            firstCheckbox.parentElement.parentElement.insertBefore(feedbackEl, firstCheckbox.parentElement.parentElement.children[1]);
        }

        feedbackEl.classList.add('d-block');
    } else {
        const feedbackEl = firstCheckbox.parentElement.parentElement.querySelector('.feedback');

        if (feedbackEl) {
            feedbackEl.classList.remove('d-block');
        }
    }
}

function validateField (field) {
    if (field.type === 'checkbox') {
        validateCheckboxField(field);
    } else {
        let feedbackEl = field.nextElementSibling;

        if (!feedbackEl || !feedbackEl.classList.contains('feedback')) {
            feedbackEl = document.createElement('div');
            feedbackEl.classList.add('feedback');

            // insert the feedback element directly after the input
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
}

/**
 * Setup form handling for a form
 *
 * @param form
 * @param cb
 */
function setupForm (form, cb) {
    form.setAttribute('novalidate', true);

    form.addEventListener('submit', async (event) => {
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

        form.classList.add('submitted');

        // do async things
        if (typeof cb === 'function') {
            cb();
        }
    });
}

module.exports = {
    /**
     * Initialize our forms
     */
    init: () => {
        const contactForm = document.getElementById('contact-form');

        // contact us form
        if (contactForm) {
            setupForm(contactForm, () => {
                const formData = new URLSearchParams(new FormData(contactForm)).toString();

                axios.post(contactForm.getAttribute('action'), formData)
                    .then(() => {
                        const alert = contactForm.querySelector('.alert-success');
                        contactForm.querySelector('.alert-danger').classList.add('d-none');

                        alert.classList.remove('d-none');
                        alert.scrollIntoView({block: 'center'});
                    })
                    .catch(() => {
                        const alert = contactForm.querySelector('.alert-danger');
                        contactForm.querySelector('.alert-success').classList.add('d-none');

                        alert.classList.remove('d-none');
                        alert.scrollIntoView({block: 'center'});
                    });
            });
        }
    },

    setupForm
};