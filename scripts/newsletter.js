'use strict';

// #region *** DOM references                           ***********

let formContainer;
let originalContent;

// #endregion

// #region *** Callback-Visualisation - show___         ***********

const showLoading = () => {
  formContainer.innerHTML = `
    <div class="c-nwslttr__mssg-cntnr">
      <span class="c-nwslttr__loader c-loader"></span>
      <p class="c-nwslttr__mssg">Sending...</p>
    </div>`;
};

const showSuccess = () => {  
  formContainer.innerHTML = `
    <div id="success-message" class="c-nwslttr__mssg-cntnr fade-in">
      <div id="lottie-animation" class="c-nwslttr__mssg-lottie"></div>
      <p class="c-nwslttr__mssg">Your subscription has been confirmed! We will keep you updated on our latest news.</p>
    </div>`;

  if (window.lottie) {
    const animation = lottie.loadAnimation({
      container: document.getElementById('lottie-animation'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'json/success.json',
    });

    animation.addEventListener('complete', function () {
      animation.goToAndStop(animation.totalFrames, true);
    });
  } else {
    console.error('Lottie library is niet geladen.');
  }

  setTimeout(() => {
    const successMessage = document.getElementById('success-message');

    if (successMessage) {
      void successMessage.offsetWidth;
      successMessage.classList.remove('fade-in');
      successMessage.classList.add('fade-out');

      setTimeout(() => {
        formContainer.innerHTML = originalContent;
        const newForm = formContainer.querySelector('form');
        if (newForm) {
          newForm.classList.add('fade-in');
        }
        attachFormListener();
        listenToClickSubmitButton();
      }, 500);
    }
  }, 4000);
};

const showPopupMessage = (messageText, type) => {
  const popupMessage = document.querySelector('.js-popup-mssg');

  const htmlOutput = `
  <div class="c-popup-mssg__cntnr c-popup-mssg__cntnr--${type} js-popup-mssg-cntnr">
    <span class="c-popup-mssg__txt">${messageText}</span>
    <svg class="c-popup-mssg__svg js-popup-mssg-closebtn" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg>
  </div>
  `;

  popupMessage.innerHTML = htmlOutput;
  popupMessage.style.opacity = '1';
  popupMessage.style.transform = 'translateY(0)';
  popupMessage.style.transition = 'all 0.1s ease-out';

  listenToClosePopupMessage(popupMessage);
}

// #endregion

// #region *** Callback-No Visualisation - callback___  ***********

const handleSubmit = (form) => {
  if (!form.checkValidity()) return;

  showLoading();

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.result === 'success') {
        showSuccess();
        showPopupMessage('Subscription confirmed!', 'success');
        
      } else {
        formContainer.innerHTML = originalContent;
        attachFormListener();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      formContainer.innerHTML = originalContent;
      attachFormListener();
    });
};

// #endregion

// #region *** Event Listeners - listenTo___            ***********

const attachFormListener = () => {
  const form = document.getElementById('nwslttr-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleSubmit(form);
  });
};

const listenToClosePopupMessage = (popupMessage) => {
  const closePopup = () => {
    popupMessage.style.transition = 'all 0.3s ease-out';
    popupMessage.style.transform = 'translateY(-4rem)';
    popupMessage.style.opacity = '0';

    setTimeout(() => {
      popupMessage.innerHTML = '';
    }, 300);
  };

  // Klik op sluitknop
  const closeBtn = document.querySelector('.js-popup-mssg-closebtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }

  // Automatisch sluiten na 5 seconden
  setTimeout(closePopup, 5000);
};


const listenToClickSubmitButton = () => {
  const submitButton = document.querySelector('.js-nwslttr-btn');
  const input = document.querySelector('.js-nwslttr-input');

  submitButton.addEventListener('click', () => {
    if (input.value === '') {
      showPopupMessage('Please enter your email address.', 'error');
      input.classList.add('c-nwslttr__form-inpt--error');

    } else if (!input.checkValidity()) {
      showPopupMessage('Please enter a valid email address.', 'error');
      input.classList.add('c-nwslttr__form-inpt--error');
      
    }
  });

  input.addEventListener('input', () => {
    input.classList.remove('c-nwslttr__form-inpt--error');
  });
}

// #endregion

// #region *** Init / DOMContentLoaded                  ***********

const initNewsletterForm = () => {
  formContainer = document.querySelector('.js-form-cntnr');
  originalContent = formContainer.innerHTML;
  attachFormListener();
  listenToClickSubmitButton();
};

document.addEventListener('DOMContentLoaded', initNewsletterForm);

// #endregion
