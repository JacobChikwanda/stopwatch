// GLOBALS
const buttons = document.getElementsByClassName('button');
const [mainCounterRef1, mainCounterRef2, changingCounterRef] = [document.getElementById('main-display1'), document.getElementById('main-display2'), document.getElementById('counter-display')];
const APPEARANCE_SETTING_NAME = 'two-note-stopwatch';


// Adjustable App Elements
const appBody = document.body;
const stopWatchBody = document.getElementById('stopwatch-body');
const stopWatchScreen = document.getElementById('stopwatch-screen');
const textElem = document.getElementsByTagName('h4');
const stopWatchPauseButton = document.getElementById('pause');
const stopWatchSettingButton = document.getElementById('settings');
const stopWatchPlayButton = document.getElementById('play');

const adjElements = [textElem, stopWatchPauseButton, stopWatchSettingButton, stopWatchPlayButton]

let [mainCounter1, mainCounter2, changingCounter] = [0, 0, 0];
let intervalID = null;

// Looks
const constantLook = {
    watchBody: ['white', '#77a0ca'],
    screenColor: ['black', 'white'],
    buttonColor: ['black', 'black', 'black'],
    appColor: '#f3f3f3',
    rest: 'black'
}

let personalizedLook = null || {};


// FUNCTIONS

const startTimer = () => {
    intervalID = setInterval(() => {
        if (changingCounter >= 60) {
            if (mainCounter2 >= 60) {
                mainCounter1++;
                mainCounterRef1.innerText = `${mainCounter1} min`
                mainCounter2 = 0;
            }
            mainCounter2++;
            mainCounterRef2.innerText = `${mainCounter2} sec`
            changingCounter = 0;
        }
        changingCounterRef.innerText = changingCounter;
        changingCounter++;
    }, 15);
}

const stopTimer = () => {
    clearInterval(intervalID);
}

const setActiveButton = (clickedButton) => {
    
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        
        if (clickedButton === button.id) {
            button.classList.add('active-button')
        } else {
            button.classList.remove('active-button')
        }
        
    }
}

const reset = () => {
    stopTimer()
    mainCounter1 = 0
    mainCounter2 = 0 
    changingCounter = 0
    mainCounterRef1.innerText = `${0} min`
    mainCounterRef2.innerText = `${0} sec`
    changingCounterRef.innerText = 0;
}

const handleClick = ({ clickedButton }) => {
    switch (clickedButton) {
        case 'pause':
            setActiveButton('pause');
            stopTimer();
            break;
        case 'settings':
            setActiveButton('settings');
            reset()
            break;
        case 'play':
            setActiveButton('play');
            startTimer();
            break;
        default:
            break;
    }
}

for (const button of buttons) {
    button.addEventListener('click', () => {
        handleClick({ clickedButton: button.id})
    })
}

// Update functions

const fieldsEmpty = () => {
    // Check if any input is empty
    const userInputs = document.getElementsByClassName('input');
    console.log(userInputs);
    for (const input of userInputs) {
        if (!input.value) {
            alert('Some values not set.')
            return 1;
        }
    }

    return 0;
}

const updateColors = () => {
    const watchGradients = [];
    const screenColors = [];
    const buttonColors = [];

    let colorCount = 0;

    const inputs = document.getElementsByClassName('adjustables');

    for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];

        if (element.id === 'watch-body-color') {
            const gradients = document.getElementsByClassName('gradient');
            
            for (const color of gradients) {
                watchGradients.push(color.value)
            }

            personalizedLook['watchBody'] = watchGradients;



            stopWatchBody.style.background = `radial-gradient(${watchGradients[0]}, ${watchGradients[1]})`;
        } else if (element.id === 'screen-color') {
            const colors = document.getElementsByClassName('screen-color');
            
            for (const color of colors) {
                screenColors.push(color.value);
            }

            personalizedLook['screenColor'] = screenColors;
            
            stopWatchScreen.style.borderColor = screenColors[0];
            stopWatchScreen.style.backgroundColor = screenColors[1];
        } else if (element.id === 'app-color') {
            appBody.style.backgroundColor = element.value;
            personalizedLook['appColor'] = element.value;
        } else if (element.id === 'watch-pause-buttons') {
            const colors = document.getElementsByClassName('adjustable-buttons');
            
            for (const color of colors) {
                buttonColors.push(color.value)
            }

            personalizedLook['buttonColor'] = buttonColors;
            stopWatchPauseButton.style.color = buttonColors[0];
            stopWatchSettingButton.style.color = buttonColors[1];
            stopWatchPlayButton.style.color = buttonColors[2];
        } else {
            if (colorCount === 0) {
                for (const text of adjElements[colorCount]) {
                    text.style.color = element.value
                }
            } else {
                adjElements[colorCount].style.color = element.value;
            }
            personalizedLook['rest'] = element.value;
            colorCount++;
        }
    }
}

const updateDefault = () => {
    let colorCount = 0;

    const inputs = document.getElementsByClassName('adjustables');

    for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];

        if (element.id === 'watch-body-color') {

            const gradients = document.getElementsByClassName('gradient');

            if (personalizedLook['watchBody']) {
                gradients[0].value = personalizedLook['watchBody'][0] ? personalizedLook['watchBody'][0] : constantLook['watchBody'][0]
                gradients[1].value = personalizedLook['watchBody'][1] ? personalizedLook['watchBody'][1] : constantLook['watchBody'][1]

                // Update
                stopWatchBody.style.background = `radial-gradient(${gradients[0].value}, ${gradients[1].value})`;
            } else {
                gradients[0].value = constantLook['watchBody'][0]
                gradients[1].value = constantLook['watchBody'][1]

                // Update
                stopWatchBody.style.background = `radial-gradient(${constantLook.watchBody[0]}, ${constantLook.watchBody[1]})`;
            }
            
        
        } else if (element.id === 'screen-color') {

            const colors = document.getElementsByClassName('screen-color');

            if (personalizedLook['screenColor']) {
                colors[0].value = personalizedLook['screenColor'][0] ? personalizedLook['screenColor'][0] : constantLook['screenColor'][0]
                colors[1].value = personalizedLook['screenColor'][1] ? personalizedLook['screenColor'][1] : constantLook['screenColor'][1]

                // Update
                stopWatchScreen.style.borderColor = colors[0].value;
                stopWatchScreen.style.backgroundColor = colors[1].value;
            } else {
                colors[0].value = constantLook['screenColor'][0]
                colors[1].value = constantLook['screenColor'][1]

                // Update
                stopWatchScreen.style.borderColor = constantLook.screenColor[0];
                stopWatchScreen.style.backgroundColor = constantLook.screenColor[1];
            }
            
        } else if (element.id === 'app-color') {
            
            if (personalizedLook['appColor']) {
                element.value = personalizedLook['appColor'] ? personalizedLook['appColor'] : constantLook['appColor'];

                // Update
                appBody.style.backgroundColor = element.value;
            } else {
                element.value = constantLook.appColor

                // Update
                appBody.style.backgroundColor = constantLook.appColor;
            }
        } else if (element.id === 'watch-pause-buttons') {
            
            const btnColors = document.getElementsByClassName('adjustable-buttons');

            if (personalizedLook['buttonColor']) {
                btnColors[0].value = personalizedLook['buttonColor'][0] ? personalizedLook['buttonColor'][0] : constantLook['buttonColor'][0]
                btnColors[1].value = personalizedLook['buttonColor'][1] ? personalizedLook['buttonColor'][1] : constantLook['buttonColor'][1]
                btnColors[2].value = personalizedLook['buttonColor'][2] ? personalizedLook['buttonColor'][2] : constantLook['buttonColor'][2]

                // Update
                stopWatchPauseButton.style.color = btnColors[0].value;
                stopWatchSettingButton.style.color = btnColors[1].value;
                stopWatchPlayButton.style.color = btnColors[2].value;
            } else {
                btnColors[0].value = constantLook['buttonColor'][0]
                btnColors[1].value = constantLook['buttonColor'][1]
                btnColors[2].value = constantLook['buttonColor'][2]

                // Update
                stopWatchPauseButton.style.color = constantLook.buttonColor[0];
                stopWatchSettingButton.style.color = constantLook.buttonColor[1];
                stopWatchPlayButton.style.color = constantLook.buttonColor[2];
            }
        } else {
            
            if (personalizedLook['rest']) {
                element.value = personalizedLook['rest'] ? personalizedLook['rest'] : constantLook['rest']

                // Update
                if (colorCount === 0) {
                    for (const text of adjElements[colorCount]) {
                        text.style.color = element.value;
                    }
                } else {
                    adjElements[colorCount].style.color = element.value;
                }

            } else {
                element.value = constantLook.rest
                if (colorCount === 0) {
                    for (const text of adjElements[colorCount]) {
                        text.style.color = constantLook.rest
                    }
                } else {
                    adjElements[colorCount].style.color = constantLook.rest;
                }
            }
            
            colorCount++;
        }
    }
}

// On load
const dataFromStorage = localStorage.getItem(APPEARANCE_SETTING_NAME);
if (dataFromStorage) {
    personalizedLook = JSON.parse(dataFromStorage)
}

// Configure App
updateDefault();

// Save Appearance Permanenetly
document.getElementById('save')
.addEventListener('click', () => {
    updateColors();
    localStorage.setItem(APPEARANCE_SETTING_NAME, JSON.stringify(personalizedLook));
})

// Handle Modal Close & Open
const modal = document.getElementById('stopwatch-tune');

document.getElementById('close-icon')
.addEventListener('click', () => {
    modal.classList.add('closeSlide')
})

document.getElementById('cog')
.addEventListener('click', () => {
    modal.classList.remove('closeSlide')
})