'use strict';

// #region ***  DOM references                           ***********

const createFitCaption = (caption) => {
        const maxLength = 50;
        if (caption.length > maxLength) {
            return caption.substring(0, maxLength) + '...';
        }
        return caption;
    };

// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showInstagramPosts = (data) => {
    let htmlOutput = '';
  
    for (const post of data) {
      const isVideo = post.media_url.includes('.mp4');
  
      htmlOutput += `
        <a class="c-scls__insta-item" href="${post.permalink}" target="_blank">
            <div class="c-scls__insta-hdr">
                <div class="c-scls__insta-avtr-cntnr">
                    <img class="c-scls__insta-avtr" src="./images/icons/insta-profile.webp" alt="DronTanks Instagram Avatar" />
                </div>
                <h4 class="c-scls__insta-hdng" href="https://www.instagram.com/dronetanks/" target="_blank">DroneTanks</h4>
            </div>

            ${isVideo ? `<video class="c-scls__insta-vid" src="${post.media_url}" muted playsinline preload="metadata" loop autoplay></video>` : `<img class="c-scls__insta-img" src="${post.media_url}" alt="${post.caption || ''}" />`}

            <div class="c-scls__insta-dtls">
                <h5 class="c-scls__insta-dtls-hdng">${createFitCaption(post.caption)}</h5>
                <p class="c-scls__insta-dtls-txt">${post.timestamp}</p>
                <p class="c-scls__insta-dtls-txt">${post.like_count}</p>
                <p class="c-scls__insta-dtls-txt">${post.comments_count}</p>
            </div>
        </a>
      `;
    }
  
    document.querySelector('.js-instagram-posts').innerHTML = htmlOutput;
  };
  
  

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
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
// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const initInstagram = () => {
    getInstagramPosts();
}

document.addEventListener('DOMContentLoaded',initInstagram);

// #endregion