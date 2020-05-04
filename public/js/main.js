


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
let pickedColor; // {Object|undefined} - with keys for hex, hue, saturation, value
let grid; // {Grid|undefined}

let isPlaying = false; // {Boolean} - whether it's playing back


/* ------------ INITIALIZE ------------ */

$(window).on('load', initializeGame);

function initializeGame() {
  
  /* Global variable stuff */
  pickedColor = {hex: '#84DCCF', hsv: hexToHSVFromHS('#84DCCF')};
  $('#playSoundOnColorPick').prop('checked', playSoundOnColorPick);
  
  /* Event listener stuff */
  $('#playSoundOnColorPick').change(togglePlaySoundOnColorPick);
  document.addEventListener('keyup', onKeyUp);

  /* Grid stuff */
  const gridWidth = $('.grid-container').width();
  const gridHeight = $('.grid-container').height();
  
  grid = new Grid('.grid', pickedColor, gridWidth, gridHeight, STARTING_SQUARES_PER_ROW);  
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
    playSound(pickedColor, 500);
  }
}

function togglePlaySoundOnColorPick() {
  playSoundOnColorPick = !playSoundOnColorPick;
  $('#playSoundOnColorPick').prop('checked', playSoundOnColorPick);
}

function onKeyUp(e) {
  if (e.code === 'Space') {
    playbackMusic();
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

/**
 * 
 * @param {Object} color 
 * @param {Number} duration - in milliseconds, to play
 */
function playSound(color, duration) {

}

/**
 * Plays it left to right
 * @param {*} data 
 */
function playbackMusic(data) {
  let AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioCtx = new AudioContext();
  let oscillatorNode = audioCtx.createOscillator();
  oscillatorNode.type = 'triangle';
  oscillatorNode.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
  oscillatorNode.connect(audioCtx.destination);
  oscillatorNode.start();
//   var gainNode = audioCtx.createGain();
//   var finish = audioCtx.destination;
}

