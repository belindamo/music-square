


/**
 * Music Square's main logic.
 * Includes initialization code,  event handlers,  and audio handlers
 * 
 * Copyright beems 2020 - don't steal my code without my consent, you dam hooligans
 */

// -------- CONSTANTS --------
const STARTING_SQUARES_PER_ROW = 20;
let IS_PLAYING = false; // {Boolean} - whether it's playing back
let IS_LOGGED_IN = false;
let playSoundOnColorPick = true; // {Boolean}
let pickedColor; // {String|undefined}
let grid; // {Grid|undefined}


/* ------------ INITIALIZE ------------ */

$(window).on('load', initializeGame);

function initializeGame() {
  
  /* Global variable stuff */
  pickedColor = $('#colorPicker').val();
  $('#playSoundOnColorPick').prop('checked', playSoundOnColorPick);
  
  /* Event listener stuff */
  $('#colorPicker').change(changePickedColor);
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
function changePickedColor() {
  pickedColor = $(this).val();
  grid.updateColorToDraw(`#${pickedColor}`);
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
      IS_LOGGED_IN = true;
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
  IS_LOGGED_IN = false;
  $("#right-sidebar").html(`
    <p> username? <input id="login" onkeyup="handleKeyUpLogin()"/> </p>
    <button id="loginButton" onclick="handleLogin()">Leggo</button>
  `);  
}


/* ------------ AUDIO HANDLERS ------------ */

function playbackMusic() {

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

