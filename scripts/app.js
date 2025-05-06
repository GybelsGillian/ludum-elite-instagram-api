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