'use strict';

// #region ***  DOM references                           ***********

const createFitCaption = (caption) => {
  const maxLength = 50;

  if (caption.length > maxLength) {
    return caption.substring(0, maxLength) + '...';
  }

  return caption;
};

const createFormattedDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('nl-BE', options);
};

const updateSliderButtons = (slider, btnPrev, btnNext) => {
  const scrollLeft = slider.scrollLeft;
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

  // Prev button
  if (scrollLeft <= 0) {
    btnPrev.classList.add('c-scls__slide-btn--dsbld');
  } else {
    btnPrev.classList.remove('c-scls__slide-btn--dsbld');
  }

  // Next button
  if (scrollLeft >= maxScrollLeft - 1) {
    btnNext.classList.add('c-scls__slide-btn--dsbld');
  } else {
    btnNext.classList.remove('c-scls__slide-btn--dsbld');
  }
};

// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showInstagramPosts = (data) => {
  console.log('showInstagramPosts', data);
  let htmlOutput = '';
  const delayStep = 100;
  let delay = 0 - delayStep;
  
  for (const post of data) {
    const isVideo = post.media_url.includes('.mp4');
    delay += delayStep;
  
    htmlOutput += `
    <a class="c-scls__insta-item" href="${post.permalink}" target="_blank" data-aos="fade-left" data-aos-duration="750" data-aos-delay="${delay}">
      <header class="c-scls__insta-hdr">
        <div class="c-scls__insta-avtr-cntnr">
          <img class="c-scls__insta-avtr" src="./images/icons/insta-profile.webp" alt="DronTanks Instagram Avatar" />
        </div>
        <h4 class="c-scls__insta-hdng" href="https://www.instagram.com/dronetanks/" target="_blank">DroneTanks</h4>
      </header>

      ${isVideo ? `<video class="c-scls__insta-vid" src="${post.media_url}" muted playsinline preload="metadata" loop autoplay loading="lazy"></video>` : `<img class="c-scls__insta-img" src="${post.media_url}" alt="${post.caption || ''}" />`}

      <div class="c-scls__insta-dtls">
        <ul class="c-scls__insta-dtls-list">
          <li class="c-scls__insta-dtls-item">
            <i class="c-scls__insta-dtls-icon c-scls__insta-dtls-icon--heart bi-suit-heart-fill"></i>
            ${post.like_count}
          </li>
          <li class="c-scls__insta-dtls-item">
            <i class="c-scls__insta-dtls-icon c-scls__insta-dtls-icon--comment bi-chat-left-text-fill"></i>
            ${post.comments_count}
          </li>
        </ul>
        <h5 class="c-scls__insta-dtls-hdng">${createFitCaption(post.caption)}</h5>
        <p class="c-scls__insta-dtls-date">${createFormattedDate(post.timestamp)}</p>              
      </div>
    </a>
    `;
  }

  document.querySelector('.js-instagram-posts').innerHTML = htmlOutput;
  listenToSlider();
};
  
// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********

const scrollSliderByStep = (slider, direction) => {
  const item = slider.querySelector('.c-scls__insta-item');
  const itemWidth = item?.offsetWidth || 200;
  const gap = 24; // Gap uit CSS
  const scrollStep = itemWidth + gap;

  slider.scrollBy({ left: direction * scrollStep, behavior: 'smooth' });
};

// #endregion

// #region ***  Data Access - get___                     ***********

const getInstagramPosts = async () => {
    const apiUrl = 'https://ludum-elite-instagram-api.onrender.com/instagram';
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      if (json && Array.isArray(json.data)) {
        console.log('✅ Live data opgehaald');
        showInstagramPosts(json.data);

        // POST function to local-instagram-data.json
      } else {
        throw new Error('❌ Geen geldige data in API response.');
      }
    } catch (err) {
      console.warn('⚠️ Live fetch mislukt, probeer lokale fallback...', err);
      try {
        const fallback = await fetch('./json/local-instagram-data.json');
        const fallbackData = await fallback.json();
        console.log('📦 Lokale fallback-data gebruikt');
        showInstagramPosts(fallbackData.data);
      } catch (fallbackErr) {
        console.error('❌ Ook fallback faalt:', fallbackErr);
      }
    }
};
  
// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listenToSlider = () => {
  const slider = document.querySelector('.js-instagram-posts');
  const btnPrev = document.querySelector('.js-slide-btn-insta[data-flow="prev"]');
  const btnNext = document.querySelector('.js-slide-btn-insta[data-flow="next"]');

  if (!slider || !btnPrev || !btnNext) return;

  // Init button state
  updateSliderButtons(slider, btnPrev, btnNext);

  // Listen to scroll
  slider.addEventListener('scroll', () => updateSliderButtons(slider, btnPrev, btnNext));

  // Listen to buttons
  btnNext.addEventListener('click', () => scrollSliderByStep(slider, 1));
  btnPrev.addEventListener('click', () => scrollSliderByStep(slider, -1));
};

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const initInstagram = () => {
    getInstagramPosts();
}

document.addEventListener('DOMContentLoaded',initInstagram);

// #endregion