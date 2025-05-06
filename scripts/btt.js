'use strict';

// #region ***  DOM references                           ***********
// #endregion

// #region ***  Callback-Visualisation - show___         ***********
// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********
// #endregion

// #region ***  Event Listeners - listenTo___            ***********$

const listenToscrollPage = () => {
    const bttButton = document.querySelector('.js-btt');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const halfViewportHeight = window.innerHeight / 2;

        if (scrollY > halfViewportHeight) {
            bttButton.style.opacity = '.8';
            bttButton.style.pointerEvents = 'all';
        } else {
            bttButton.style.opacity = '0';
            bttButton.style.pointerEvents = 'none';
        }
    });
}

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const initBtt = () => {
    listenToscrollPage();
}

document.addEventListener('DOMContentLoaded',initBtt);

// #endregion