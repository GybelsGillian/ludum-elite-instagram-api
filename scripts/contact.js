// #region ***  Global variables                         ***********

// #endregion

// #region ***  DOM references                           ***********
// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showErrorMessage = (formGroup, formType) => {
    console.log('showErrorMessage', formGroup, formType);
    formGroup.querySelector('.js-form-error').innerHTML = `Please enter a valid ${formType}`;
}

const showModal = () => {
    const modal = document.querySelector('.js-modal');
    const modalCard = modal.querySelector('.js-modal-card');

    modalCard.style.transition = 'all 0.3s ease-out';
    modal.style.transition = 'all 0.3s ease-out';
    modal.style.opacity = '1';
    modalCard.style.transform = 'scale(1)';

    // Lottie animatie
    const lottiePlayer = modal.querySelector('.js-lottie-player');
    lottiePlayer.stop();
    lottiePlayer.play();

    // Auto sluiten na delay
    setTimeout(() => {
        modalCard.style.transition = 'all 0.1s ease-out';
        modalCard.style.transform = 'scale(0)';
        setTimeout(() => {
            modal.style.transition = 'all 0.1s ease-out';
            modal.style.opacity = '0';
        }, 100);
        
    }, 5000);

    listenToCloseModal();
}

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********

const getReason = () => {
    const reason = getQueryStringValue('reason');
    const select = document.querySelector('.js-form-slct');
    
    if (reason) {
        for (const option of document.querySelectorAll('.js-form-optn')) {
            let valid = false

            if (option.value === reason) {
                option.selected = true;
                select.classList.remove('c-cntct__form-slct--empty');
                valid = true;
            } else {
                valid = false;
            }

            
        }

    } else {
        select.classList.add('c-cntct__form-slct--empty');
    }

    listenToSelect(select);
    listenToSubmit();
}

const getQueryStringValue = (key) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(key);
};

const getFormSuccess = () => {
    const formSucces = getQueryStringValue('success');

    if (formSucces === 'true') {
        showModal();
    }
}

// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listenToSelect = () => {
    const select = document.querySelector('.js-form-slct');
    select.addEventListener('change', () => {        
        if (select.value === '') {
            select.classList.add('c-cntct__form-slct--empty');

        } else {
            select.classList.remove('c-cntct__form-slct--empty');
        }
    })
}

const listenToSubmit = () => {
    const form = document.querySelector('.js-form');
    const formBtn = document.querySelector('.js-submit');
    const arrFormGroups = document.querySelectorAll('.js-form-grp');

    form.addEventListener('submit', (e) => {
        let isValid = true;

        // Verwijder foutklassen en error-spans
        for (const formGroup of arrFormGroups) {
            const input = formGroup.querySelector('.js-form-field');
            input.classList.remove('c-cntct__item-error');
            const errorEl = formGroup.querySelector('.js-form-error');
            if (errorEl) errorEl.textContent = '';
        }

        // Validatie van inhoud (zonder errors tonen)
        for (const formGroup of arrFormGroups) {
            const input = formGroup.querySelector('.js-form-field');
            const value = input.value.trim();

            if (value === '') {
                isValid = false;
            }
        }

        if (!isValid) {
            e.preventDefault();
        } else {
            setTimeout(() => {
                form.reset();
                showModal(); // jouw custom bedankmodal
            }, 1000);
        }
    });

    // Click event (onder de submit!) – enkel voor visuele feedback
    formBtn.addEventListener('click', (e) => {
        for (const formGroup of arrFormGroups) {
            const formField = formGroup.querySelector('.js-form-field');
            const formValue = formField.value;

            if (formValue.trim() === '') {
                formField.classList.add('c-cntct__item-error');
                showErrorMessage(formGroup, formGroup.dataset.formType);
            }
        }
    });
};

const listenToClickFields = () => {
    const arrFormGroups = document.querySelectorAll('.js-form-grp');

    for (const formGroup of arrFormGroups) {
        const formField = formGroup.querySelector('.js-form-field');
        formField.addEventListener('click', () => {
            formField.classList.remove('c-cntct__item-error');
            formGroup.querySelector('.js-form-error').innerHTML = '';
        });
    }
}

const listenToCloseModal = () => {
    const modal = document.querySelector('.js-modal');
    const closeBtn = document.querySelector('.js-modal-close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

const listenToAttchment = () => {
    const attachBtn = document.querySelector('.js-form-attach');
    const attachName = document.querySelector('.js-form-attach-name');

    attachBtn.addEventListener('change', () => {
        attachName.innerHTML = `<i class="c-cntct__form-attach-name-icon bi-trash3 js-attach-delete"></i>${attachBtn.files[0].name}`;

        listenToAttachmentDelete();
    })
}

const listenToAttachmentDelete = () => {
    const attachDeleteBtn = document.querySelector('.js-attach-delete');
    attachDeleteBtn.addEventListener('click', () => {
        document.querySelector('.js-form-attach').value = '';
        document.querySelector('.js-form-attach-name').innerHTML = 'Max file size: 5MB';
    })
}

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const initContact = () => {
    getReason();
    listenToSelect();
    listenToClickFields();
    getFormSuccess();
    listenToAttchment();
}

document.addEventListener('DOMContentLoaded', initContact);

// #endregion