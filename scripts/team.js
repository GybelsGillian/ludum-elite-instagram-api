'use strict';

// #region *** Global Variables - variables                   ***********

const arrTeam = [
    {
        name: 'Sam',
        img: 'sam-portret.webp',
        role: 'Game Designer',
        description: 'Sam is a game designer with a passion for creating engaging and immersive gaming experiences. He has a knack for storytelling and level design, ensuring that players are captivated from start to finish.'
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
]

// #endregion

// #region ***  DOM references                           ***********
// #endregion

// #region ***  Callback-Visualisation - show___         ***********

const showTeam = () => {
    let htmlOutput = '';
    const delayStep = 100;
    let delay = 0 - delayStep;

    for (const member of arrTeam) {
        delay += delayStep;

        htmlOutput += `
        <div class="col-3" data-aos="fade-left" data-aos-duration="750" data-aos-delay="${delay}">
            <div class="c-team__mmbr">
                <img class="c-team__mmbr-img" src="images/photos/${member.img}" alt="${member.name}">
                <div class="c-team__mmbr-info">
                    <h3 class="c-team__mmbr-name">${member.name}</h3>
                    <div class="c-team__mmbr-dscrptn-cntnr">
                        <p class="c-team__mmbr-role">${member.role}</p>
                        <p class="c-team__mmbr-dscrptn">${member.description}</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    document.querySelector('.js-team').innerHTML = htmlOutput;

}

// #endregion

// #region ***  Callback-No Visualisation - callback___  ***********
// #endregion

// #region ***  Data Access - get___                     ***********
// #endregion

// #region ***  Event Listeners - listenTo___            ***********
// #endregion

// #region ***  Init / DOMContentLoaded                  ***********

const initTeam = () => {
    showTeam();

}

document.addEventListener('DOMContentLoaded', initTeam);

// #endregion