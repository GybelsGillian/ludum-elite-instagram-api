'use strict';

// #region *** Global Variables - variables                   ***********

const arrTeam = [
    {
        name: 'Tristan',
        img: 'tristan-portret-art.webp',
        role: 'CEO & VFX Artist',
        description: 'Tristan is the CEO and VFX artist behind Ludum Elite. He oversees the creative team, ensuring that the game is visually appealing and engaging.'
    },
    {
        name: 'Sam',
        img: 'sam-portret.webp',
        role: 'Game Designer & Team Lead',
        description: 'Sam is the game designer and team lead behind Ludum Elite. He oversees the game development process, ensuring that the game is fun and engaging.'
    },
    {
        name: 'Abbi',
        img: 'abbi-portret.webp',
        role: 'Animation Artist',
        description: 'Abbi is an animation artist who brings characters and environments to life through her stunning animations. Her attention to detail and creativity make the gaming world feel dynamic and vibrant.'
    },
    {
        name: 'Daniel',
        img: 'daniel-portret.webp',
        role: 'Game Developer',
        description: 'Daniel is a game developer with expertise in programming and game mechanics. He is responsible for implementing the technical aspects of the game, ensuring smooth gameplay and functionality.'
    },
    {
        name: 'Quintin',
        img: 'quintin-portret.webp',
        role: 'Rigging Artist',
        description: 'Quintin is a rigging artist who specializes in creating skeletal structures for characters and objects. His work allows for realistic movement and animation, enhancing the overall gaming experience.'
    },
    {
        name: 'Catharina',
        img: 'catharina-portret.webp',
        role: '3D Artist',
        description: 'Catharina is a 3D artist with expertise in character design and animation. She creates stunning characters and environments that make the gaming world come to life.'
    },
    {
        name: 'Mileman',
        img: '',
        role: 'Programmer (student)',
        description: ''
    },
    {
        name: 'Carlos',
        img: '',
        role: 'Programmer',
        description: ''
    },
    {
        name: 'Liorenc',
        img: '',
        role: 'Audio Artist',
        description: ''
    },
];

let teamLoaded = false;
let teamScreenWidth = 0;
let teamSlideCntnrWidth = 0;
let teamSlideWidth = 0;
let teamSlideItemWidth = 0;
let teamSlideGap = 24;
let teamTotalItems = arrTeam.length;
let teamSlideMarginLeft = 0;
let teamScrollOffset = 0;
let lastScrollStep = 0; // ← houdt bij hoeveel de vorige stap was bij 'next'
let wasAtRightEnd = false;



// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showTeam = () => {
    let htmlOutput = '';
    const delayStep = 100;
    let delay = 0 - delayStep;

    for (const member of arrTeam) {
        delay += delayStep;

        htmlOutput += `
            <div class="c-team__mmbr js-team-mmbr" data-aos>
                <img class="c-team__mmbr-img" src="./images/photos/${(member.img)? member.img : 'placeholder-portret.webp'}" alt="${member.name}">
                <div class="c-team__mmbr-info">
                    <h3 class="c-team__mmbr-name">
                        <span class="c-team__mmbr-name-span">${member.name}</span>
                    </h3>
                    <div class="c-team__mmbr-dtls-cntnr">
                        <div class="c-team__mmbr-dtls">
                            <p class="c-team__mmbr-role">${member.role}</p>
                            <p class="c-team__mmbr-dscrptn">${member.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    document.querySelector('.js-team').innerHTML = htmlOutput;
    teamLoaded = true;
};

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********

const slideHandler = (flow) => {
    const teamSlide = document.querySelector('.js-team');
    const fullStep = teamSlideItemWidth + teamSlideGap;
    const maxScroll = teamSlide.scrollWidth - teamSlideCntnrWidth;

    if (flow === 'next') {
        const remainingScroll = maxScroll - teamScrollOffset;
        const step = Math.min(fullStep, remainingScroll);
        teamScrollOffset += step;
        lastScrollStep = step; // Onthoud hoeveel er effectief gescrold werd
    } else if (flow === 'prev') {
        let step;
        if (teamScrollOffset + teamSlideCntnrWidth >= teamSlideWidth) {
            // Als we volledig rechts stonden, gebruik de laatst bekende stap
            step = lastScrollStep;
        } else {
            // Normaal gedrag
            step = Math.min(fullStep, teamScrollOffset);
        }

        teamScrollOffset -= step;
        lastScrollStep = fullStep; // Reset naar normale stap
    }

    teamScrollOffset = Math.max(0, Math.min(teamScrollOffset, maxScroll)); // Clamp waarde
    teamSlide.style.marginLeft = `-${teamScrollOffset}px`;

    handleSlideBtns();
};


const handleSlideBtns = () => {
    const prevBtn = document.querySelector('.js-slide-btn-team[data-flow="prev"]');
    const nextBtn = document.querySelector('.js-slide-btn-team[data-flow="next"]');
    const teamWrapper = document.querySelector('.js-team-cntnr');
    const maxScroll = document.querySelector('.js-team').scrollWidth - teamSlideCntnrWidth;

    prevBtn.classList.toggle('c-team__slide-btn--dsbld', teamScrollOffset <= 0);
    nextBtn.classList.toggle('c-team__slide-btn--dsbld', teamScrollOffset >= maxScroll);

    // Clip-path aanpassen
    if (teamScrollOffset >= maxScroll - 1) {
        teamWrapper.style.clipPath = 'inset(-.5rem 0rem -1.5rem -.75rem)';
    } else {
        teamWrapper.style.clipPath = 'inset(-.5rem 0rem -1.5rem -1.25rem)';
    }
};


const adjustScrollOffsetToSnap = () => {
    const fullStep = teamSlideItemWidth + teamSlideGap;
    const maxScroll = teamSlideWidth - teamSlideCntnrWidth;

    let steps = Math.round(teamScrollOffset / fullStep);
    teamScrollOffset = steps * fullStep;

    if (teamScrollOffset > maxScroll) {
        teamScrollOffset = maxScroll;
    }
    if (teamScrollOffset < 0) {
        teamScrollOffset = 0;
    }

    document.querySelector('.js-team').style.marginLeft = `-${teamScrollOffset}px`;
    handleSlideBtns();
};

// #endregion

// #region ***  Data Access - get___                     ***********

const getSlideStylings = () => {
    const teamSlide = document.querySelector('.js-team');

    // Als de vorige waarden 0 zijn, zitten we in de initiële load
    const isInitialLoad = teamSlideCntnrWidth === 0 || teamSlideWidth === 0;

    // Bewaar oude waarden
    const prevCntnrWidth = teamSlideCntnrWidth;
    const prevSlideWidth = teamSlideWidth;
    const prevMaxScroll = prevSlideWidth - prevCntnrWidth;

    // Herbereken met nieuwe afmetingen
    teamSlideCntnrWidth = document.querySelector('.js-team-cntnr').offsetWidth;
    teamSlideWidth = teamSlide.scrollWidth;
    teamSlideItemWidth = document.querySelector('.js-team-mmbr').offsetWidth;

    const newMaxScroll = teamSlideWidth - teamSlideCntnrWidth;

    if (!isInitialLoad && teamScrollOffset >= prevMaxScroll - 1) {
        teamScrollOffset = newMaxScroll;
    } else {
        adjustScrollOffsetToSnap();
    }

    teamSlide.style.marginLeft = `-${teamScrollOffset}px`;
    handleSlideBtns();
};






// #endregion

// #region ***  Event Listeners - listenTo___            ***********

const listenToSlideTeam = () => {
    const slideBtns = document.querySelectorAll('.js-slide-btn-team');

    for (const btn of slideBtns) {
        btn.addEventListener('click', (e) => {
            slideHandler(e.currentTarget.dataset.flow);
        });
    }    
};

// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const initTeam = () => {
    showTeam();

    if (teamLoaded) {
        getSlideStylings();
        listenToSlideTeam();
    }
};

window.addEventListener('resize', getSlideStylings);
document.addEventListener('DOMContentLoaded', initTeam);

// #endregion
