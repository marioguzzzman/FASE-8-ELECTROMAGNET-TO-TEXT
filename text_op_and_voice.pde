import processing.serial.*; //LECTURA ARDUINO
import rita.*; //TEXT ANALISIS --> refe: https://rednoise.org/rita/reference/index.php

//LECTURA ARDUINO
Serial port;  
int end = 10;
int val0, val1, val2, val3, val4, val5;   //numero del valor de EMF  
String serial; //valor EMF en String (del Serial)

// TEXT ANALISIS
String fonemas, pos="", word="";
StringDict tagsDict;

// TEXT TO SPEECH
String script = "ssss supresión del ornnnnnnna aaaa ato";
int voiceIndex;
int voiceSpeed;


void setup() {
  size(200, 200);
  String portName = Serial.list()[3];
  // println(portName);

  port = new Serial(this, portName, 9600);
  port.clear();  // function from serial library that throws out the first reading, in case we started reading in the middle of a string from Arduino
  serial = port.readStringUntil(end); // function that reads the string from serial port until a println and then assigns string to our string variable (called 'serial')
  serial = null;
}

void draw() {

  //LECTURA SERIAL
  /*******************************************************/
  if ( port.available() > 0) {  
    serial = port.readStringUntil(end);
    if (serial != null) {
      String[] a = split(serial, ',');

      val0 =int(float(trim(a[0])));
      // println(val0);

      val1 =int(float(trim(a[1])));
      //  println(val1);
      /*******************************************************/



      //TEXT TRANSFORM : convierte un texto normal en texto sin sentido
      /*******************************************************/
      /* FUNCIONAMIENTO posible:
      definir 5 funciones dentro de la libreria rita, 
      por ej: replaceChar(), replaceFirst(), RiTa.randomItem(), concat(), slice() 
      tomar un fragmento de texto y aplicarle, seleccionado por EMF random, alguna de estas.
      
      */
      word="la casa es linda";
      fonemas = RiTa.getPhonemes(word);
      String[] tags = RiTa.getPosTags(word, true);
      //pos = tagName(tags[0]);

      println(fonemas);

      /*******************************************************/



      //TEXT TO SPEECH: declamación del nuevo texto
      /*******************************************************/
      /* FUNCIONAMIENTO
       - cada VOICE se activa según el valor de columna que llega.
       - la SPEED se modifica según algo del valor de entrada
       - el SCRIPT viene dado por el análisis del texto 
       que también es modificado por la EMF
       */

      // PARA DECIR ALGO:
      /* PONER DENTRO DE UNA FUNCIÓN?
       // set the voice based on mouse y
       voiceIndex = round(map(mouseY, 0, height, 0, TextToSpeech.voices.length - 1));
       //set the vooice speed based on mouse X
       voiceSpeed = mouseX;
       
       TextToSpeech.say(script, TextToSpeech.voices[voiceIndex], voiceSpeed);
       */
      /*******************************************************/
    }
  }
}




/**********************************************************************
 ****************************** EXTRAS *********************************
 ***********************************************************************/


// the text to speech class
import java.io.IOException;

static class TextToSpeech extends Object {

  // Store the voices, makes for nice auto-complete in Eclipse

  //AGREGAR VOCES LATINAS Y FRANCESAS

  // male voices
  static final String ALEX = "Alex";
  static final String BRUCE = "Bruce";
  static final String FRED = "Fred";
  static final String JUNIOR = "Junior";
  static final String RALPH = "Ralph";

  // female voices
  static final String PAULINA = "Paulina";
  static final String KATHY = "Kathy";
  static final String PRINCESS = "Princess";
  static final String VICKI = "Vicki";
  static final String VICTORIA = "Victoria";

  // novelty voices
  static final String ALBERT = "Albert";
  static final String BAD_NEWS = "Bad News";
  static final String BAHH = "Bahh";
  static final String BELLS = "Bells";
  static final String BOING = "Boing";
  static final String BUBBLES = "Bubbles";
  static final String CELLOS = "Cellos";
  static final String DERANGED = "Deranged";
  static final String GOOD_NEWS = "Good News";
  static final String HYSTERICAL = "Hysterical";
  static final String PIPE_ORGAN = "Pipe Organ";
  static final String TRINOIDS = "Trinoids";
  static final String WHISPER = "Whisper";
  static final String ZARVOX = "Zarvox";

  // throw them in an array so we can iterate over them / pick at random
  static String[] voices = {
    ALEX, BRUCE, FRED, JUNIOR, RALPH, PAULINA, KATHY, 
    PRINCESS, VICKI, VICTORIA, ALBERT, BAD_NEWS, BAHH, 
    BELLS, BOING, BUBBLES, CELLOS, DERANGED, GOOD_NEWS, 
    HYSTERICAL, PIPE_ORGAN, TRINOIDS, WHISPER, ZARVOX
  };

  // this sends the "say" command to the terminal with the appropriate args
  static void say(String script, String voice, int speed) {
    try {
      Runtime.getRuntime().exec(new String[] {"say", "-v", voice, "[[rate " + speed + "]]" + script});
    }
    catch (IOException e) {
      System.err.println("IOException");
    }
  }

  // Overload the say method so we can call it with fewer arguments and basic defaults
  static void say(String script) {
    // 200 seems like a resonable default speed
    say(script, ALEX, 200);
  }
}
