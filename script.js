const pianoKeyClass = "piano-key"
const buttonActiveClass = 'btn-active'

function playAudio(src) {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
}

function addActive(element) {
    element.classList.add('piano-key-active')
}

const piano = document.querySelector('.piano');
const whiteKeys = document.querySelectorAll(' .piano > .piano-key')
const sharpKeys = document.querySelectorAll(".sharp")
const keys = document.querySelectorAll(".piano-key")

//Click to play music
piano.addEventListener("click", (event) => {
    if (event.target.classList.contains(pianoKeyClass)) {
        const note = event.target.dataset.note;
        const link = `assets/audio/${note}.mp3`;
        playAudio(link);
        addActive(event.target)
    }
})

//Playing music with the left mouse button pressed
let isDown = false;

piano.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains(pianoKeyClass)) {
        isDown = true;
    }
})

piano.addEventListener('mousemove', (event) => {
    let isActive = event.target.classList.contains('piano-key-active')
    if (isDown && !isActive) {
        const note = event.target.dataset.note;
        const link = `assets/audio/${note}.mp3`;
        playAudio(link);
        addActive(event.target);
    }
})

window.addEventListener('mouseup', (event) => {
    isDown = false;
})

//Matching audio links to keys of the keyboard
function matchLinksAndKeys(keyList, keyMatching) {
    keyList.forEach(keyListElement => {
        const letter = keyListElement.dataset.letter;
        const note = keyListElement.dataset.note
        const url = `assets/audio/${note}.mp3`;
        keyMatching[url] = letter;
    })
    return keyMatching;
}

let whiteKeyMatching = {};
let sharpKeyMatching = {};

matchLinksAndKeys(whiteKeys, whiteKeyMatching);
matchLinksAndKeys(sharpKeys, sharpKeyMatching);

//Playing audio on the keyboard 
function playAudioOnKeyboard(keyMatching, keyList, event) {
    for (let url in keyMatching) {
        if (event.code === `Key${keyMatching[url]}`) {
            playAudio(url);
            keyList.forEach(keyListElement => {
                if (keyMatching[url] === keyListElement.dataset.letter) {
                    addActive(keyListElement)
                }
            })
        }
    }
}

window.addEventListener('keydown', (event) => {
    playAudioOnKeyboard(whiteKeyMatching, whiteKeys, event);
    playAudioOnKeyboard(sharpKeyMatching, sharpKeys, event);
})

//Switch piano
const buttonSwichingNotes = document.querySelector('.btn-notes');
const buttonSwichingLetters = document.querySelector('.btn-letters')

buttonSwichingNotes.addEventListener('click', (event) => {
    event.target.classList.add(buttonActiveClass)
    buttonSwichingLetters.classList.remove(buttonActiveClass)
    keys.forEach(key => {
        key.classList.remove('switch');
    })
})

buttonSwichingLetters.addEventListener('click', (event) => {
    event.target.classList.add(buttonActiveClass)
    buttonSwichingNotes.classList.remove(buttonActiveClass)
    keys.forEach(key => {
        key.classList.add('switch');
    })
})

//Stop animation after click
function removeTransition(element) {
    if (element.propertyName !== 'transform') return;
    this.classList.remove('piano-key-active')
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition))

//Switch fullscreen
const fullScreenButton = document.querySelector('.fullscreen')
const elem = document.documentElement;

fullScreenButton.addEventListener('click', activateFullscreen)
fullScreenButton.addEventListener('click', exitFullscreen)

fullScreenButton.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        exitFullscreen()
    }
})

function activateFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();        // W3C spec
    }
    else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();     // Firefox
    }
    else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();  // Safari
    }
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();      // IE/Edge
    }
};

function exitFullscreen() {
    if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};


