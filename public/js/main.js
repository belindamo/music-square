


/**
 * Music Square's main logic.
 * Includes initialization code,  event handlers,  and audio handlers
 * 
 * Copyright beems 2020 - don't steal my code without my consent, you dam hooligans
 */

// -------- CONSTANTS --------
const STARTING_SQUARES_PER_ROW = 20;


// -------- GLOBALS -------
let isLoggedIn = false;
let playSoundOnColorPick = true; // {Boolean}
let playSoundOnDraw = true; // {Boolean}
let pickedColor; // {Object|undefined} - with keys for hex, hue, saturation, value
let grid; // {Grid|undefined}

let isPlaying = false; // {Boolean} - whether it's playing back
let audioCtx = null; // {AudioContext|null}
let squareDuration = 200;

/* ------------ INITIALIZE ------------ */

$(window).on('load', initializeGame);

function initializeGame() {
  
  /* Global variable stuff */
  pickedColor = {hex: '#84DCCF', hsv: hexToHSVFromHS('#84DCCF')};
  $('#playSoundOnColorPick').prop('checked', playSoundOnColorPick);
  $('#playSoundOnDraw').prop('checked', playSoundOnDraw);
  
  /* Event listener stuff */
  $('#playSoundOnColorPick').change(togglePlaySoundOnColorPick);
  $('#playSoundOnDraw').change(togglePlaySoundOnDraw);
  document.addEventListener('keyup', onKeyUp);

  /* Grid stuff */
  const gridWidth = $('.grid-container').width();
  const gridHeight = $('.grid-container').height();
  
  grid = new Grid('.grid', pickedColor, playSound, gridWidth, gridHeight, STARTING_SQUARES_PER_ROW);  
}

/* ------------ EVENT LISTENERS ------------ */

// Event listeners, written in during initialization

/**
 * This function is called when color picker's color changes
 */
function changePickedColor(picker) {
  pickedColor = {
    hex: picker.toHEXString(),
    hsv: picker.hsv
  };
  grid.updateColorToDraw(pickedColor);
  if (playSoundOnColorPick) {
    playSound(pickedColor, 0, 0.2);
  }
}

function togglePlaySoundOnColorPick() {
  playSoundOnColorPick = !playSoundOnColorPick;
  $('#playSoundOnColorPick').prop('checked', playSoundOnColorPick);
}

function togglePlaySoundOnDraw() {
  playSoundOnDraw = !playSoundOnDraw;
  $('#playSoundOnDraw').prop('checked', playSoundOnDraw);  
}

function onKeyUp(e) {
  if (e.code === 'Space') {
    playbackMusic(grid.gridData);
  }
}

// Event listeners, written directly into HTML 

function handleKeyUpLogin(e) {
  if (e.keyCode === 13) {
    handleLogin();
  }
}

function handleButtonLogin() {
  $('#loginButton').addClass('selected-button');
  handleLogin();
}

function handleLogin() {
  const username = $('#login').val();
  if (username.length > 0) {
    if (dummyUsersData.users.includes(username)) {
      isLoggedIn = true;
    } else {
      dummyUsersData.users.push(username);
    }
    $("#right-sidebar").html(`
      <h2>Welcome, ${username}!</h2>
      <button id="#logout" onclick=handleLogout()>Logout</button>
    `);
  } else {
    alert("Oops. Please give a valid username!");
  }
}

function handleLogout() {
  isLoggedIn = false;
  $("#right-sidebar").html(`
    <p> username? <input id="login" onkeyup="handleKeyUpLogin()"/> </p>
    <button id="loginButton" onclick="handleLogin()">Leggo</button>
  `);  
}


/* ------------ AUDIO HANDLERS ------------ */

let song = [];

// by 27.70 degrees, starting at 0. That means 13 notes, aka
// a whole octave in half notes.
// Range: Middle C4 - C5.
// https://pages.mtu.edu/~suits/notefreqs.html
const notes = [
  261.63,
  277.18,
  293.66,
  311.13,
  329.63,
  349.23,
  369.99,
  392.00,
  415.30,
  440.00,
  466.16,
  493.88,
  523.25
]

/**
 * x = panning
 * y = time (for now)
 * hue = frequency
 * saturation = reverb (less saturation = more reverb)
 * value = ...octave?
 * @param {Object} color 
 * @param {Number} startTime - time from when code executes, to when it plays. in seconds
 * @param {Number} duration -  to play. in seconds
 */
function playSound(color, startTime, duration) {
  
  const hue = color.hsv[0];
  const saturation = color.hsv[1];

  var AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext({
    latencyHint: 'interactive',
    sampleRate: 48000,
  });

  // var gainNode = audioCtx.createGain();
  let oscillatorNode = audioCtx.createOscillator();
  oscillatorNode.type = 'triangle';
  
  let gainNode = audioCtx.createGain();
  oscillatorNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.setValueAtTime(-1, audioCtx.currentTime);

  const frequency = notes[ Math.floor(hue/ 27.70) ];

  console.log(audioCtx.currentTime);
  
  startTime = audioCtx.currentTime + startTime;
  gainNode.gain.setValueAtTime(0.01, startTime)
  oscillatorNode.frequency.setValueAtTime(frequency, startTime); // value in hertz
  oscillatorNode.connect(audioCtx.destination);
  oscillatorNode.start();
  gainNode.gain.setValueAtTime(0, startTime + duration - 0.01);
  oscillatorNode.stop(startTime + duration);
}

/**
 * Plays it left to right
 * @param {*} data 
 */
function playbackMusic(data) {
  const musicalStatement = [];

  // filter out to necessities
  for (var row = 0; row < data.length; row++) {
    musicalStatement.push([]);
    for (var col = 0; col < data[0].length; col++) {
      if (data[row][col].hex != '#FFFFFF') {
        const color = {
          hex: data[row][col].hex,
          hsv: data[row][col].hsv
        };
        musicalStatement[row].push(color);
      }
    }
  }

  // each row is an array of notes to play back
  musicalStatement.forEach((row, i) => {
    row.forEach((color) => {
      playSound(color, i * 0.3, 0.3)
    })
  })
}