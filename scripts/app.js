// #region ***  Global variables                           ***********

let crslActive = true;

const arrCrslItems = [
    {
        title: 'Ludum Elite Studio',
        img: './images/photos/ludum-elite-ai.png',
        txt: 'photo 1',
    },
    {
        title: 'Tristan Speaking',
        img: './images/photos/tristan-speaking.png',
        txt: 'photo 2',
    },
    {
        title: 'Images',
        img: './images/photos/ludumelite-studio.webp',
        txt: 'photo 3',
    },
    {
        title: 'Team Working',
        img: './images/photos/team-working.jpg',
        txt: 'photo 4',
    },
    
]

// #endregion

// #region ***  DOM references                           ***********

const createCrslNr = (flow, to) => {
    if (flow === 'next') {
        return to + 1;
    }

    if (flow === 'prev') {
        return to - 1;
    }
}

const updateCrsl = (flow, to) => {
    const toNr = parseInt(to);
    const newToNr = createCrslNr(flow, toNr);

    const prevItem = document.querySelector('.js-crsl-prev');
    const leftItem = document.querySelector('.js-crsl-left');
    const rightItem = document.querySelector('.js-crsl-right');
    const nextItem = document.querySelector('.js-crsl-next');

    const prevBtn = document.querySelector('.js-crls-btn[data-flow="prev"]');
    const nextBtn = document.querySelector('.js-crls-btn[data-flow="next"]');

    if (flow === 'next') {
        prevBtn.dataset.to = newToNr - 3;
        nextBtn.dataset.to = newToNr;

        if (nextBtn.dataset.to > arrCrslItems.length - 1) {
            nextBtn.classList.add('c-about__crsl-btn--dsbld');
        } else {
            nextBtn.classList.remove('c-about__crsl-btn--dsbld');
        }

        if (prevBtn.dataset.to < 0) {
            prevBtn.classList.add('c-about__crsl-btn--dsbld');
        } else {
            prevBtn.classList.remove('c-about__crsl-btn--dsbld');
        }

        document.querySelector('.js-crsl-img-next').src = arrCrslItems[toNr].img;
        nextItem.style.right = '0';
        rightItem.style.right = 'calc(50% + .75rem)';
        leftItem.style.left = 'calc(-50% - .75rem)';

        setTimeout(() => {
            for (const item of [prevItem, leftItem, rightItem, nextItem]) {
                item.style.transition = 'none';
            }

            leftItem.dataset.item = newToNr - 2;
            rightItem.dataset.item = newToNr - 1;

            prevItem.querySelector('.js-crsl-img-prev').src = '';
            leftItem.querySelector('.js-crsl-img-left').src = arrCrslItems[newToNr - 2].img;
            rightItem.querySelector('.js-crsl-img-right').src = arrCrslItems[newToNr - 1].img;
            nextItem.querySelector('.js-crsl-img-next').src = '';

            prevItem.style.left = 'calc(-50% - .75rem)';
            leftItem.style.left = '0';
            rightItem.style.right = '0';
            nextItem.style.right = 'calc(-50% - .75rem)';

        }, 300);
    }

    if (flow === 'prev') {
        prevBtn.dataset.to = newToNr;
        nextBtn.dataset.to = newToNr + 3;

        if (nextBtn.dataset.to > arrCrslItems.length - 1) {
            nextBtn.classList.add('c-about__crsl-btn--dsbld');
        } else {
            nextBtn.classList.remove('c-about__crsl-btn--dsbld');
        }

        if (prevBtn.dataset.to < 0) {
            prevBtn.classList.add('c-about__crsl-btn--dsbld');
        } else {
            prevBtn.classList.remove('c-about__crsl-btn--dsbld');
        }

        document.querySelector('.js-crsl-img-prev').src = arrCrslItems[toNr].img;
        prevItem.style.left = '0';
        leftItem.style.left = 'calc(50% + .75rem)';
        rightItem.style.right = 'calc(-50% - .75rem)';

        setTimeout(() => {
            for (const item of [prevItem, leftItem, rightItem, nextItem]) {
                item.style.transition = 'none';
            }

            leftItem.dataset.item = newToNr + 1;
            rightItem.dataset.item = newToNr + 2;

            prevItem.querySelector('.js-crsl-img-prev').src = '';
            leftItem.querySelector('.js-crsl-img-left').src = arrCrslItems[newToNr + 1].img;
            rightItem.querySelector('.js-crsl-img-right').src = arrCrslItems[newToNr + 2].img;
            nextItem.querySelector('.js-crsl-img-next').src = '';

            prevItem.style.left = 'calc(-50% - .75rem)';
            leftItem.style.left = '0';
            rightItem.style.right = '0';
            nextItem.style.right = 'calc(-50% - .75rem)';

        }, 300);  
    }
}

// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showCrls = () => {
    const htmlPrevBtn = document.querySelector('.js-crls-btn[data-flow="prev"]');
    const htmlNextBtn = document.querySelector('.js-crls-btn[data-flow="next"]');

    if (crslActive) {
        htmlPrevBtn.dataset.to = -1;
        htmlNextBtn.dataset.to = 2;

        document.querySelector('.js-crsl-left').dataset.item = 0;
        document.querySelector('.js-crsl-right').dataset.item = 1;
    }

    if (parseInt(htmlPrevBtn.dataset.to) < 0) {
        htmlPrevBtn.classList.add('c-about__crsl-btn--dsbld');
    } else {
        htmlPrevBtn.classList.remove('c-about__crsl-btn--dsbld');
    }

    if (parseInt(htmlNextBtn.dataset.to) > arrCrslItems.length - 1) {
        htmlNextBtn.classList.add('c-about__crsl-btn--dsbld');
    } else {
        htmlNextBtn.classList.remove('c-about__crsl-btn--dsbld');
    }

    const leftItem = document.querySelector('.js-crsl-left');
    const rightItem = document.querySelector('.js-crsl-right');

    const prevNr = parseInt(htmlPrevBtn.dataset.to);
    const nextNr = parseInt(htmlNextBtn.dataset.to);
    const leftNr = prevNr + 1;
    const rightNr = nextNr - 1;

    leftItem.querySelector('.js-crsl-img-left').src = arrCrslItems[leftNr].img;
    rightItem.querySelector('.js-crsl-img-right').src = arrCrslItems[rightNr].img;

    listenToCrls();
}

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********
// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listenToCrls = () => {
    const htmlBtns = document.querySelectorAll('.js-crls-btn');

    for (const btn of htmlBtns) {
        btn.addEventListener('click', (e) => {
            for (const item of document.querySelectorAll('.js-crsl-item')) {
                item.style.transition = 'all .3s ease-in-out';
            }

            updateCrsl(e.currentTarget.dataset.flow, e.currentTarget.dataset.to);
        })
    }
}

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const init = () => {
    showCrls()
}

document.addEventListener('DOMContentLoaded',init);

// #endregion

// <!-- <div class="col-lg-7">
//                         <div class="c-about__crsl-cntnr">
//                             <div class="c-about__crsl-btn js-crls-btn" data-to="" data-flow="prev">
//                                 <svg class="c-about__crsl-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
//                                     <path class="c-about__crsl-btn-path" fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
//                                 </svg>
//                             </div>

//                             <div class="c-about__crsl-items js-crsl-items">
//                                 <div class="c-about__crsl-item c-about__crsl-item--prev js-crsl-item js-crsl-prev">
//                                     <img class="c-about__crsl-img js-crsl-img-prev" src="./images/textures/pcture-placeholder.webp" alt="Placeholder image">
//                                 </div>
//                                 <div class="c-about__crsl-item c-about__crsl-item--left js-crsl-item js-crsl-left" data-item="">
//                                     <img class="c-about__crsl-img js-crsl-img-left" src="./images/textures/pcture-placeholder.webp" alt="Placeholder image">
//                                 </div>
//                                 <div class="c-about__crsl-item c-about__crsl-item--right js-crsl-item js-crsl-right" data-item="">
//                                     <img class="c-about__crsl-img js-crsl-img-right" src="./images/textures/pcture-placeholder.webp" alt="Placeholder image">
//                                 </div>
//                                 <div class="c-about__crsl-item c-about__crsl-item--next js-crsl-item js-crsl-next">
//                                     <img class="c-about__crsl-img js-crsl-img-next" src="./images/textures/pcture-placeholder.webp" alt="Placeholder image">
//                                 </div>
//                             </div>

//                             <div class="c-about__crsl-btn js-crls-btn" data-to="" data-flow="next">
//                                 <svg class="c-about__crsl-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
//                                     <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>