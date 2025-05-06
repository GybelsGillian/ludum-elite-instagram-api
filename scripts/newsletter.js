document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.querySelector('.js-form-cntnr');
    const originalContent = formContainer.innerHTML;
  
    function attachFormListener() {
      const form = document.getElementById('nwslttr-form');
  
      if (!form) return;
  
      form.addEventListener('submit', function (e) {
        e.preventDefault();
  
        if (!form.checkValidity()) {
          return;
        }
  
        // Toon loader
        formContainer.innerHTML = `
        <div class="c-nwslttr__mssg-cntnr">
          <span class="c-nwslttr__loader c-loader"></span>
          <p class="c-nwslttr__mssg">Sending...</p>
        </div>`;
  
        const formData = new FormData(form);
  
        fetch(form.action, {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            if (data.result === 'success') {
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
  
              // Na 10 seconden fade out en toon originele form met fade-in
              setTimeout(() => {
                const successMessage = document.getElementById('success-message');
  
                if (successMessage) {
                  // Force reflow om overgang te laten werken
                  void successMessage.offsetWidth;
  
                  successMessage.classList.remove('fade-in');
                  successMessage.classList.add('fade-out');
  
                  // Wacht totdat de fade-out is afgerond en toon het formulier opnieuw
                  setTimeout(() => {
                    formContainer.innerHTML = originalContent;
  
                    const newForm = formContainer.querySelector('form');
                    if (newForm) {
                      newForm.classList.add('fade-in');
                    }
  
                    attachFormListener();
                  }, 500); // Wacht op de fade-out animatie
                }
              }, 6000);
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
      });
    }
  
    // Start
    attachFormListener();
  });
  