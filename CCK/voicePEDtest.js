
// THINGS WE NEED TO RUN THIS 

// 1. python3 
// 2. node.js 
// 3. serial comunication 

    // P5js Serial Server or Serial Control GUI Version

        // p5.serialcontrol (GUI version). 
        // https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
        // Or 
        // P5.serialserver (command line version)
        // sudo npm install -g p5.serialserver
        // Run = p5serial

     // P5js Serial Port Library for microcontroller

        // https://github.com/p5-serial/p5.serialport
        // https://raw.githubusercontent.com/p5-serial/p5.serialport/master/lib/p5.serialport.js


//TO RUN ON MARIO'S COMPUTER
//1. Python server 
// python3 -m http.server
//2. Serial communication
// run PATH
// run command


//TIMER 
let time;
let wait = 2000;
let time2;
let wait2 = 5000; //100000 // que mide este valor?

//SERIAL
// Reference:
// https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/

let serial; // variable to hold an instance of the serialport library
// var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
let portName = '/dev/ttyACM0';  // For linux 
// Set Arduino on Serial.begin(9600) to nor change the value of baudrate
// let portName = '10.17.34.128'; // fill in your own IP address in place of the one shown here
let currentString;  // for incoming serial data

//LECTURA ARDUINO
let end = 10; // porque hasta 10?
let val0;   // valor individual de lectura de EMF de las columnas
let val1;   // valor individual de lectura de EMF de las columnas

let EMFrawValues;
// String serial; //valor EMF en String (del Serial) // pre-code
let allColumnsEMF = [];
let eachColumnEMF = [];

let openPort; // no se si funca TODO:TESTEAR



// TEXTOS

// TODO: testear si funca lo del math floor
let txt = Math.floor(Math.random(0, 8)); //txt asigna un texto a la lectura en voz alta si los valores son menores a 

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


//RITA
let rs = new RiString(); // main object
let frase = new RiString();
let frase2 = new RiString();
let frase_say = new RiString();

let count; // contador de longitud de palabra, // RENAME TO WordLengthVal


//VOICES
let iptr = 0; // a counter for the words - used for TESTING

let myVoice = new p5.Speech(); // new P5.Speech object
let voicesX = ['Google français', 'Google español', 'Google español de Estados Unidos'];

let voiceIndex;
let voiceSpeed;


// TEXT TO SPEECH
let say;


function setup() {
createCanvas(500, 500);

// -------------------SERIAL P5js

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
//   var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it

  serial.open(portName); // Arduino's serial port

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
//   serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData); // prints = currentString

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);


// ------------------   SERIAL pre-v
//CHANGED FOR P5js LIBRARY

//   String portName = Serial.list()[3];
//   // println(portName);
//   port = new Serial(this, portName, 9600);
//   port.clear();  // function from serial library that throws out the first reading, in case we started reading in the middle of a string from Arduino
//   serial = port.readStringUntil(end); // function that reads the string from serial port until a println and then assigns string to our string variable (called 'serial')
//   serial = null;

//   time = millis();//store the current time
//   time2 = millis();//store the current time
// ------------------   END SERIAL pre-v

//TIME // Counter for triggering events
time = millis(); // what event?
time2 = millis(); // what evet?
// console.log('time: ' + time );


  /* TESTING PHRASES?
  frase.removeChar(2);
   frase.replaceChar(2,"h");
   frase2 = frase.slice(1,3);
   frase.replaceFirst(frase2, "cu");
   */

}

 //TEST
 let dummyValue1;
 let dummyValue2;
 let dummyValueGen;


function draw() {
// TEST
// mousePressed(); auto repeat //Iterates in the word array. Test

//TEST SERIAL
// background(0, 50);
//   fill(255);
//   text("sensor value: " + currentString, 30, 30);
//   console.log('current string :' + currentString);


//TEST SERIAL NON SERIAL
background(0, 50);
  fill(255);
//   console.log('current string :' + currentString);



//PRE-V

// SET A DEFAULT TEXT TO SAY
if (millis() - time2 >= wait2) {
  txt = Math.floor(random(0, 8));
  console.log("UPDATE txt No: " + txt);
  time2 = millis();//also update the stored time
}
//console.log("draw: " + txt);


  //LECTURA SERIAL
  /*******************************************************/

  if (serial.available() > 0) {  //this works
    var data = serial.read();
    // ellipse(50,50,data,data); // display para testear que recibimos data
    console.log('Entro a Lectura serial');

    // if (serial != null) {

    let arduinoValues = currentString;

    text("Arduino Values: " + arduinoValues, 30, 30);

    EMFrawValues = String(arduinoValues);
    allColumnsEMF = EMFrawValues.split(","); 

    eachColumnEMF[0] = allColumnsEMF[0]; 
    // console.log("EMFcolumn 0: " + eachColumnEMF[0]);
    eachColumnEMF[1] = allColumnsEMF[1]; 
    // console.log("EMFcolumn 1: " + eachColumnEMF[1]);

    //LECTURA DE COLUMNAS
    let columnNumber = Math.floor(random(0, 2)); 
    leer_columna(columnNumber, eachColumnEMF[columnNumber]);
    console.log("Col No: " + columnNumber + " valor: " + eachColumnEMF[columnNumber]);

    // }

    // -----------------   TEST WITHOUT ARDUINO // AKA PHANTOM COLUMNS
  } else {

        // console.log('Entro a Phantom Columns');


    waitTest = 500;

    //TEST
    if (millis() - time2 >= waitTest) { // create dummy values
      // if (frameCount == 15) {
    dummyValue1 = Math.floor(random(0, 100));
    dummyValue2 = Math.floor(random(0, 100));
    dummyValueGen = dummyValue1 + "," + dummyValue2;
  }  //end wait

    text("sensor value dummy: " + dummyValueGen, 30, 80);

    EMFrawValues = String(dummyValueGen); //needed to create a string object in order to split.
    // console.log('raw values: ' + EMFrawValues)
    allColumnsEMF = EMFrawValues.split(","); //needed to assign split to another variable

    eachColumnEMF[0] = allColumnsEMF[0]; 
    // console.log("EMFcolumn 0: " + eachColumnEMF[0]);
    
    eachColumnEMF[1] = allColumnsEMF[1]; 
    // console.log("EMFcolumn 1: " + eachColumnEMF[1]);

    //LECTURA DE COLUMNAS
    let columnNumber = Math.floor(random(0, 2)); 
    leer_columna(columnNumber, eachColumnEMF[columnNumber]);
    console.log("Col No: " + columnNumber + " valor: " + eachColumnEMF[columnNumber]);


  }

/*******************************************************/
  
// text("sensor value: " + palabra, 30, 60);



} // END OF DRAW

// TEST VOICE
function mousePressed()
{
    // if in bounds:
        // randomize voice and speak word:
        myVoice.setVoice(Math.floor(random(voicesX.length)));
        myVoice.speak(comodines[iptr]);
        iptr = (iptr+1) % comodines.length; // increment
}


// cuanto mas campo magnetico menos se entiende
function mix_text(rs, val) {
//TODO: cambiar rs por fraseRS
  
    let palabra = "";
    let cont = rs.length(); // longitud de la palabra
    //console.log(cont);

    //INSERTA CARACTERES
    if (val >= 30 && val < 40) {
      palabra = rs.charAt(cont-1); //Palabra = Elige un caracter = longitud de los caracteres menos 1. 
    } else 

    //INTERCAMBIA CARACTERES
    if (val >= 40 && val < 60) { // si el valor es entre 40 y 60, intercambia elementos
       let ran1 = Math.floor(Math.random(cont)); 
       let ran2 = Math.floor(Math.random(cont)); 

      if (ran1 != ran2) { // si son distintos intercambio las posiones,  reemplazo uno de los dos

        rs.replaceChar((cont-ran1), rs.charAt(ran2)); //reemplazo (largo de palabra menos random 1, random 2 de la palabra misma)
      }
      palabra = rs.text(); // palabra = palabra modificada
      console.log(palabra);
    //   println(palabra);

    }  // --- END INTERCAMBIO CARACTERES 


    // COMODIN DENTRO DE PALABRA
    if (val >=50) { // mayor o igual que 50 inserta un comodin dentro de palabra 
      rs.insertWord( Math.floor(Math.random(5)), comodines[Math.floor(Math.random(5))]);
      palabra = rs.text();

      //revisar corte
      if (cont>10) {
        palabra = rs.substring(0, 9);
      }
    } // --- END COMODIN DENTRO DE PALABRA  
  
    //console.log(palabra);
  
    return palabra;
  }


  //MAIN FUNCTION TO MANAGE EMF READING AND TEXT GENERATION
  function leer_columna(col, val){
    frase = new RiString(textos_columnas[txt]); // frase es igual al texto de una columna al azar

    //TODO: cambiar frase por fraseRS

   //MIX TEXT
    if (val > 30) { //Si EMF es mayor que 30 entonces..
      say = mix_text(frase, val); // Say es igual a la frase de las columnas + mix_text?

      // Velocidad de la voz
      // TODO: AGREGAR ACA INSTANCIA DE FUNCION DE VOZ 
      voiceSpeed = Math.floor(Math.random(30, 200)); // TODO: testear que funcione
      frase_say = new RiString(say); // Enunca la frase
      
      //Recorte de frase
      if (frase_say.length()>100) { //Si la frase a decir es mayor que 100
        say = frase_say.substring(0, 100); //Recorta la frase
      }

      //No uniformidad de la lectura
      wait = frase_say.length()/10 * 800; //tiempo para que la lectura no sea monotona = argo de la palabra entre 10*800, para no superponer lecturas.
      
      //console.log(wait);

    } else {// Si el valor es mejor a 30 reseteamos columna
      //reset
      reset_columna(col);
    }
  
    //PREVIOS SKETCH --> CHANGE TO P5js SPEECH TO TEXT
    // if (millis() - time >= wait) {
    //   TextToSpeech.say(say, TextToSpeech.voices[Math.floor(Math.random(1, 5))], voiceSpeed);
    //   console.log(say);
    //   time = millis();//also update the stored time
    // }


    // SPEAK EVERY CERTAIN AMOUNT OF TIME
    if (millis() - time >= wait) {
        myVoice.setVoice(Math.floor(random(voicesX.length)));
        myVoice.speak(say);
        // TODO: Flata agregarle voice speed
        console.log("speak_amount_time: " + say);
        time = millis();//also update the stored time
      }

  } // END LEER COLUMNA

  // SAY TEXT ACCORDING TO OUR DATA BASE
  function reset_columna(col) {
    say = textos_columnas[txt]; // guarda en say una de las frases
    voiceSpeed = 150;
    wait = int(random(5000, 10000)); // set wait
  }


    // // this sends the "say" command to the terminal with the appropriate args
    // function say( script,  voice, speed) {
    //     try {
    //       Runtime.getRuntime().exec(new String[] {"say", "-v", voice, "[[rate " + speed + "]]" + script});
    //     }
    //     catch (IOException e) {
    //       System.err.println("IOException");
    //     }
    //   }
    
    //   // Overload the say method so we can call it with fewer arguments and basic defaults
    //   static void say(String script) {
    //     // 200 seems like a resonable default speed
    //     say(script, MONICA, 200);
    //   }
    // }




//------ SERIAL PORT FUNCTIONS
 
// We are connected and ready to go
function serverConnected() {
    console.log("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// There is data available to work with from the serial port
function gotData() {
    currentString = serial.readStringUntil("\r\n");
//   console.log(currentString);
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
    console.log(theerror);
  }

  // Connected to our serial device
function gotOpen() {
    console.log("Serial Port is open!");
    var openPort = new Boolean(true);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

//------ SERIAL PORT FUNCTIONS END