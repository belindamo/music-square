


/* ------------ Main Logic START ------------ */

const STARTING_SQUARES_PER_ROW = 20;

// constants that we're not using yet
let IS_PLAYING = false; // whether it's playing


$(window).on('load', initializeGame);

function initializeGame() {
  const gridWidth = $(".grid-container").width();
  const gridHeight = $(".grid-container").height();
  
  let grid = new Grid('.grid', gridWidth, gridHeight, STARTING_SQUARES_PER_ROW);  
  // do things to grid
  
  document.addEventListener('keyup', (e) => {
    if (e.code === "Space") {
      playbackMusic();
    }
  });
  
}


// This function is called when color picker's color changes
function changedPickedColor() {

}


// var playButton = document.getElementById("play");
// var isPlaying = false;
// playButton.addEventListener("click", () => {
//   isPlaying = !isPlaying;
//   if (isPlaying) {

//   } else {

//   }
// })
// I like to log the data to the console for quick debugging
// console.log(gridData);
// console.log(d3);



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


