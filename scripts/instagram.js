'use strict';

// #region ***  DOM references                           ***********
// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showInstagramPosts = (data) => {
    console.log(data);
} 

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********

const getInstagramPosts = async () => {
    const url = 'http://localhost:3000/instagram';
    try {
      const response = await fetch(url);
      const json = await response.json();
      showInstagramPosts(json.data);
    } catch (err) {
      console.error('❌ Fout bij ophalen van Instagram posts:', err);
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