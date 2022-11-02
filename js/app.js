// GLOBALS
const buttons = document.getElementsByClassName('button');
const [mainCounterRef1, mainCounterRef2, changingCounterRef] = [document.getElementById('main-display1'), document.getElementById('main-display2'), document.getElementById('counter-display')];

const updateBtn = document.getElementById('update');
const stopWatchBody = document.getElementById('stopwatch-body');

let [mainCounter1, mainCounter2, changingCounter] = [0, 0, 0];
let intervalID = null;

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

