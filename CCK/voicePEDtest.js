
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


//SERIAL
let serial; // variable to hold an instance of the serialport library
// var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
let portName = '/dev/ttyACM0';  // For linux 
// Set Arduino on Serial.begin(9600) to nor change the value of baudrate
let inData;  // for incoming serial data

//LECTURA ARDUINO
let end = 10;
let val0, val1, val2, val3, val4, val5;   //numero del valor de EMF 
let serialEMF = []; //valor EMF en String (del Serial)
// let txt=(random(0, 8)); // Erro: random is not defined 


//timer
let time;
let wait = 2000;
let time2;
let wait2 = 100000;


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

let frase, frase2, frase_say;
let say;
let count;
let voiceIndex;
let voiceSpeed;

// int[] valores; // que hace esto?


//VOICES
var iptr = 0; // a counter for the words

var myVoice = new p5.Speech(); // new P5.Speech object
let voicesX = ['Google français', 'Google español', 'Google español de Estados Unidos'];
    

function setup() {
createCanvas(500, 500);
    // valores = new int [2]; //que hace esto?

// -------------------SERIAL P5js

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
//   var portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open(portName);

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
//   serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);


// ------------------   SERIAL pre-v

//   String portName = Serial.list()[3];
//   // println(portName);
//   port = new Serial(this, portName, 9600);
//   port.clear();  // function from serial library that throws out the first reading, in case we started reading in the middle of a string from Arduino
//   serial = port.readStringUntil(end); // function that reads the string from serial port until a println and then assigns string to our string variable (called 'serial')
//   serial = null;

//   time = millis();//store the current time

//   time2 = millis();//store the current time

// ------------------   END SERIAL pre-v


//TIME
time = millis();//store the current time  // where are these variables?
time2 = millis();//store the current time // where are these variables?

}


function draw() {
// TEST
// mousePressed(); auto repeat //Iterates in the word array. Test

//TEST SERIAL
background(0);
  fill(255);
  text("sensor value: " + SENSORS_VALUE_T0_DISPLAY, 30, 30);


//PRE-V

//console.log("draw: " + txt);

//Que hace este codigo?
 
  if (millis() - time2 >= wait2) {
    txt = int(random(0, 8));
    console.log("update: "+txt);
    time2 = millis();//also update the stored time
  }

  //LECTURA SERIAL
  /*******************************************************/
//   if ( port.available() > 0) {  
//     serial = port.readStringUntil(end);
//     if (serial != null) {
//       String[] a = split(serial, ',');

//       val0 =int(float(trim(a[0])));
//       //println("Col2: "+val0);

//       val1 =int(float(trim(a[1])));
//       //println("Col3: "+val1);

//       valores[0] = val0;
//       valores[1] = val1;
//       println("valores: "+valores[0]+" "+valores[1]);

//       //CODIGO COLUMNA 1 
//       int columna = int(random(1, 2));
//       leer_columna(columna, valores[columna]);
//       //println("col: "+columna);
//     }
//   }
/*******************************************************/
  


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
// String mix_text(RiString rs,int val) {
//     String palabra="";
//     int cont = rs.length();
//     //console.log (cont);
//     if (val >=30 && val<40) {
//       palabra = rs.charAt(cont-1);
//     } else 
//     if (val>=40 && val <60) {
//       int ran1 = int(random(cont));
//       int ran2 = int(random(cont));
//       if (ran1!= ran2) {
//         rs.replaceChar((cont-ran1), rs.charAt(ran2));
//       }
//       palabra = rs.text();
//       println(palabra);
//     }  
//     if (val >=50) {
//       rs.insertWord( int(random(5)), comodines[int(random(1, 11))]);
//       palabra = rs.text();
  
//       //revisar corte
//       if (cont>10) {
//         palabra = rs.substring(0, 9);
//       }
//     } 
  
//     //console.log(palabra);
  
//     return palabra;
//   }


//   void leer_columna (int col, int val) {
//     frase = new RiString(textos_columnas[txt]);
  
//     if (val>30) {
//       say = mix_text(frase, val); //llamada a funcion mix_text
//       voiceSpeed =int(random(30, 200));
//       frase_say = new RiString(say);
      
  
//       if (frase_say.length()>100) {
//         say = frase_say.substring(0, 100);
//       }
//       wait = int ((frase_say.length()/10)*800);
      
//       //println(wait);
//     } else {
//       //reset
//       reset_columna(col);
//     }
  
//     if (millis() - time >= wait) {
//       TextToSpeech.say(say, TextToSpeech.voices[int(random(1, 5))], voiceSpeed);
//       println(say);
//       time = millis();//also update the stored time
//     }
//   }

//   void reset_columna(int col) {
//     say = textos_columnas[txt];
//     voiceSpeed = 150;
//     wait = int(random(5000, 10000));
//   }


//     // this sends the "say" command to the terminal with the appropriate args
//     static void say(String script, String voice, int speed) {
//         try {
//           Runtime.getRuntime().exec(new String[] {"say", "-v", voice, "[[rate " + speed + "]]" + script});
//         }
//         catch (IOException e) {
//           System.err.println("IOException");
//         }
//       }
    
//       // Overload the say method so we can call it with fewer arguments and basic defaults
//       static void say(String script) {
//         // 200 seems like a resonable default speed
//         say(script, MONICA, 200);
//       }
//     }




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
  var currentString = serial.readStringUntil("\r\n");
  console.log(currentString);
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
    console.log(theerror);
  }

  // Connected to our serial device
function gotOpen() {
    console.log("Serial Port is open!");
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