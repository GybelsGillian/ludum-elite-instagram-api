// #region ***  Global variables                           ***********

let isEventListenerAdded = false;
let lastClick = false;
let lastActive = false;

let screenWidth = window.innerWidth;
let slideCntnrWidth = 0;
let slideWidth = 0;
let itemWidth = 0;
let slideGap = 0;
let maxItems = 0;
let maxClicks = 0;
let lastSlideWidth = 0;
let stepsSlide = 0;
let remainingSteps = 0;
let remainingWidth = 0;
let newDirection = '';

let touchStartX = 0;
let touchEndX = 0;

const arrItems = [
    {
        name: 'Beetle Bot',
        img: 'beetle-bot.webp',
    },
    {
        name: 'Presentation',
        img: 'presentation.webp',
    },
    {
        name: 'Shooting Heavy Cover',
        img: 'shooting-heavy-cover.webp',
    },
   {
        name: 'Spherebot',
        img: 'spherebot.webp',
    },
    {
        name: 'Tank Taupe',
        img: 'tank-taupe.webp',
    },
    {
        name: 'Thumbnail',
        img: 'thumbnail.webp',
    },
]

// #endregion

// #region ***  DOM references                           ***********

// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showSlide = () => {
    let output = ''

    for (const item of arrItems) {
        output += `
        <a href="https://dronetanks.com/devlog.html?project=${item.name}" target="_blank" class="c-project__slide-item js-slide-item">
            <img class="c-project__slide-item-img" src="./images/art/${item.img}" alt="${item.name}">
        </a>
        `;
    }

    document.querySelector('.js-slide').innerHTML = output;
    listenToSlideByTouch();
}

const showSlideEvent = (direction) => {
    const slideBtns = document.querySelector('.js-slide-btns');
   
    if (direction === 'next') {
        slideBtns.dataset.steps = parseInt(slideBtns.dataset.steps) + 1;
        stepsSlide ++;
        newDirection = 'next';
    }

    if (direction === 'prev') {
        slideBtns.dataset.steps = parseInt(slideBtns.dataset.steps) - 1;
        stepsSlide --;
        newDirection = 'prev';
    }

    getWidths()
}

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********



// #endregion

// #region ***  Data Access - get___                     ***********

const getWidths = () => {
    const prevBtn = document.querySelector('.js-slide-btn[data-flow="prev"]');
    const nextBtn = document.querySelector('.js-slide-btn[data-flow="next"]');
    const slideCntnr = document.querySelector('.js-slide-cntnr');
    const slide = document.querySelector('.js-slide');
    const slideItem = document.querySelector('.js-slide-item');
    
    screenWidth = window.innerWidth;
    slideCntnrWidth = slideCntnr.offsetWidth;
    slideWidth = slide.offsetWidth;
    console.log(`slide.offsetWidth: ${slide.offsetWidth}`)
    itemWidth = (slideItem.offsetWidth === 2)? slideCntnrWidth : slideItem.offsetWidth;
    console.log(`slideItem.offsetWidth: ${slideItem.offsetWidth}`)
    slideGap = (screenWidth <= 768)? 24 : 24;
    
    let itemWidthCount = 0;
    for (let i = 1; i < arrItems.length; i++) {
        itemWidthCount += itemWidth;

        const totalGap = (i - 1) * slideGap;
        const remaining = slideCntnrWidth - itemWidthCount - totalGap;

        if (remaining < 0) {
            maxItems = i - 1;
            break;
        }
    }
    maxClicks = arrItems.length - maxItems;
    document.documentElement.style.setProperty('--slide-cntnr-width', `${slideCntnrWidth}px`);

    console.log(`Steps slide: ${stepsSlide}`)
    remainingSteps = (arrItems.length) - stepsSlide
    console.log(`Remaining steps: ${remainingSteps}`)
    remainingWidth = remainingSteps * itemWidth + (remainingSteps - 1) * slideGap;
    console.log(`remainingWidth: ${remainingWidth}`)
    console.log(`slideCntnrWidth: ${slideCntnrWidth}`)
    console.log(`Itemwidth: ${itemWidth}`)

    // Buttons update

    if (stepsSlide > 0) {
        prevBtn.classList.remove('c-project__slide-btn--dsbld');
        
    } else {
        prevBtn.classList.add('c-project__slide-btn--dsbld');
    }

    // Slide update

    
    if (remainingWidth < slideCntnrWidth && stepsSlide > 0) {
        slide.style.marginLeft = `-${(itemWidth * arrItems.length - slideCntnrWidth) + 24 * (arrItems.length - 1)}px`
        nextBtn.classList.add('c-project__slide-btn--dsbld');

    } else {
        slide.style.marginLeft = `-${stepsSlide * (itemWidth + slideGap)}px`;
        nextBtn.classList.remove('c-project__slide-btn--dsbld');
    }

    if (screenWidth <= 768) {
        if (stepsSlide === maxClicks) {
            nextBtn.classList.add('c-project__slide-btn--dsbld');
            
        }
    }

    listentToSlide();
};

// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listentToSlide = () => {
    const btns = document.querySelectorAll('.js-slide-btn');
    
    if (!isEventListenerAdded) {
        for (const btn of btns) {
            btn.addEventListener('click', (e) => {
                showSlideEvent(e.currentTarget.dataset.flow);
            });
        }
        isEventListenerAdded = true;
    }
};

const listenToSlideByTouch = () => {
    const slideCntnr = document.querySelector('.js-slide-cntnr');
    slideCntnr.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
    });

    slideCntnr.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance < 0 && stepsSlide < maxClicks) {
                showSlideEvent('next');
            } else if (swipeDistance > 0 && stepsSlide > 0) {
                showSlideEvent('prev');
            }
        }
    });
}

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const initSlide = () => {
    showSlide();
    getWidths();

    window.addEventListener('resize', getWidths);
};

document.addEventListener('DOMContentLoaded', initSlide);

// #endregion

