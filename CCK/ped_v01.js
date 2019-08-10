// GENERAL WORKING AND TESTING BRANCH 

//Instructions to run
// In terminal enter the folder in which the code is hosted
// python3 -m http.server
// http://localhost:8000/  //works best with this. Does not work with Firefox

//You have to click on the screen to be able to hear the background sounds


//DIVS
// let myDiv;
// let myDivGen;\

//Add processing serial

//Add times

//add lectura arduino


//TEXT

// let resultsReady = false;

//parameters for "terminal" text
let terminalF;
let subtitleF;
let posXte;
let posYtextT;
let w;
let h;

let textSpeed = 0;

//CREAR TEXTOS

// TEXTOS
let comodines = [ 
    "electromagnético", "claridad", "técnica", "moral", "fábula", "luz", "mesura", "medida", "ciencia", "deber", "responsabilidad"
];

let textos_columnas = [ 
  "lo que está en juego son los procedimientos", 
  "aquellos que están fuera del palacio pueden ver lo que pasa dentro", 
  "invasión permanente que instituya nuevas formas de hacer", 
  "mantener abierto el espacio de la institución", 
  "una superficie total de tres mil metros cuadrados", 
  "el estilo de los edificios responde al neoclasicismo francés", 
  "¿Qué es el Neoclasicismo?", 
  "Cielito, ciclo que sí, digo cese la pendencia, ya reventó la coyunda, y viva la Independencia."
]; 

// TEXT TO SPEECH

// http://ability.nyu.edu/p5.js-speech/ 
// https://github.com/IDMNYU/p5.js-speech
var myVoice = new p5.Speech(); // new P5.Speech object
let voice = 'Google français';
let voicesX = ['Google français', 'Google español', 'Google español de Estados Unidos'];

// LIST OF VOICES
// Google Deutsch
// Google US English
// Google UK English Female
// Google UK English Male
// Google español
// Google español de Estados Unidos
// Google français 
// Google हिन्दी
// Google Bahasa Indonesia
// Google italiano
// Google 日本語
// Google 한국의
// Google Nederlands
// Google polski
// Google português do Brasil
// Google русский
// Google 普通话（中国大陆）
// Google 粤語（香港）
// Google 國語（臺灣）

//FROM PREVIOUS PROJECT FILE



function setup() {

    createCanvas(windowWidth, windowHeight);

    
    // DO SOME DIVS
    // myDiv = createDiv('...'); //create only one Div so we can see only one result
    // // myDiv.parent('#wraper');
    // myDivGen = createDiv('...'); //create only one Div so we can see only one result

}

function draw() {

    background(0);
    touchStarted();

    // DoText();
    talk();


//PAST STRUCTURE

    // // ENABLE AUDIOCONTEXT REQUIREMENT FOR BROWSER
    // textAlign(CENTER);
    // fill(0);
    // if (getAudioContext().state !== 'running') {
    //     text('click to start audio', width / 2, height / 2);
    // } else {
    //     // text('audio is enabled', width/2, height/2);
    // }


    // if (resultsReady) {
       
    //     // console.log(rnnSub);
    // }


} //--------------END DRAW


//-----------------------------------------TALK // the text to speech class
function talk() {
    myVoice.setVoice(voice); //change here
    myVoice.speak(textos_columnas);  // change here put text

    myVoice.setRate(.8); // speed of speach
    myVoice.setPitch(.5); //.9 es mas agudo,
    myVoice.setVolume(.5);

    // myVoice.setRate(.8); // speed of speach (.1 lento, .9 rapido)

    // //siempre empieza con un standard y despues cambia a este valor
    // myVoice.setPitch(.9); //.9 es mas agudo, .1 es mas grave y computarizadp
    // myVoice.setVolume(.3);

    //add voice castellano
    //add voice frances
    // maybe change the pitch to generate different voices


}

//--------------------------------------BACKGROUND SOUND
//Use this function to enable sound in chrome.
// https://p5js.org/reference/#/p5.sound/getAudioContext

function touchStarted() {

    // //Simple code
    // if (getAudioContext().state !== 'running') {
    //     getAudioContext().resume();
    //   }
    //   sounds[1].play();
    //   sounds[1].setVolume(.5);


    // COMPLEX CODE CHANGING SONGS
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
    // sound1.loop();
}



//------------------------------------------------SOUND FOR VIDEO
function videoSound() {
    videos[whichVideo].volume(0);
}



//-------------------------------------------------TEXT DISPLAY

function DoText() {

    // TERMINAL TEXT
    posXtextT = windowWidth - (windowWidth - 100);
    posYtextT = windowHeight - 600;
    w = 325;
    h = 400;
    color = 250;


    textAlign(LEFT);
    textFont("Ubuntu Mono");

    textSize(17);
    fill(color);
    noStroke();
    textLeading(30);


    let sourceText = 'Generating text ' + '...';

    // Speed of the text being generated

    if (textSpeed < sourceText.length) {
        textSpeed += 0.3;
    } else {
        textSpeed = 0;
        textSpeed += 0.3;
    }

    //CODE TO SIMULATE WRITING

    var startWriting = 0;
    // var left = startWriting - textSpeed ;
    var right = startWriting + textSpeed;
    text(sourceText.substring(startWriting, right + 1), posXtextT, posYtextT + 100, w, h);


    //this is static text
    // text(sourceText, posXtextT, posYtextT + 100, w, h);

}

//------------------------------------------WINDOW SIZE ELEMENTS

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}