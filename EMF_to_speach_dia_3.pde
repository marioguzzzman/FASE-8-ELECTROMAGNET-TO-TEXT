import rita.*;
import processing.serial.*; //LECTURA ARDUINO

//timer
int time;
int wait = 2000;

//LECTURA ARDUINO
Serial port;  
int end = 10;
int val0, val1, val2, val3, val4, val5;   //numero del valor de EMF  
String serial; //valor EMF en String (del Serial)


//CREATE TEXT

// lista de palabras comodines
String[] comodines = { 
  "electromagnético", "claridad", "técnica", "moral", "fábula", "luz", "mesura", "medida", "ciencia", "deber", "responsabilidad"
}; 


// TEXT TO SPEECH
RiString frase, frase2, frase_say;
String say;
int count;
int voiceIndex;
int voiceSpeed;

void setup() {
  String portName = Serial.list()[3];
  // println(portName);
  port = new Serial(this, portName, 9600);
  port.clear();  // function from serial library that throws out the first reading, in case we started reading in the middle of a string from Arduino
  serial = port.readStringUntil(end); // function that reads the string from serial port until a println and then assigns string to our string variable (called 'serial')
  serial = null;

  time = millis();//store the current time




  //String texto = "Lo que está en juego son los procedimientos y los protocolos que pueden mantener abierto el espacio de la institución y no sólo como un desafío de transparencia de acuerdo al cual aquellos que están fuera del palacio pueden ver lo que pasa dentro, sino más bien para permitir una invasión permanente que instituya nuevas formas de hacer.";
  String texto = "Lo que está en juego son los procedimientos";
  String texto2 = "Lo que está en juego";

  frase = new RiString(texto);
  frase2 = new RiString(texto2);

  //count = RiTa.getWordCount(frase.text());
  //println(count);
  //println(frase.words()[4]);



  /*
  frase.removeChar(2);
   frase.replaceChar(2,"h");
   frase2 = frase.slice(1,3);
   frase.replaceFirst(frase2, "cu");
   */
  // println(frase.text());
  //println(frase2);
}

void draw() {

  //LECTURA SERIAL
  /*******************************************************/
  if ( port.available() > 0) {  
    serial = port.readStringUntil(end);
    if (serial != null) {
      String[] a = split(serial, ',');

      val0 =int(float(trim(a[0])));
      //  println(val0);

      val1 =int(float(trim(a[1])));
      println(val1);


      if (val1>20) {
        say = mix_text(frase, val1);
        voiceSpeed =int(random(30, 200));
        frase_say = new RiString(say);


        if (frase_say.length()>100) {
          say = frase_say.substring(0, 100);
        }
        wait = int ((frase_say.length()/10)*800);
        //println(wait);
      }
    } else {
      //reset
      say = frase.text();
      voiceSpeed = 150;
      wait = int(random(5000, 10000));
    }

    if (millis() - time >= wait) {
      TextToSpeech.say(say, TextToSpeech.voices[int(random(1, 5))], voiceSpeed);
      time = millis();//also update the stored time
    }
  }
}
/*******************************************************/





//frase.analyze();
//say = frase.words()[int(map(mouseY, 0, height, 0, count-1))];
//frase = new RiString (say);
//say = mix_text(frase, int(random(100)));
//println(say);
//voiceSpeed = int(random(30, 150));


void mouseClicked() {
  TextToSpeech.say(say, TextToSpeech.voices[int(random(1, 5))], voiceSpeed);
} 


// cuanto mas campo magnetico menos se entiende
String mix_text(RiString rs, int val) {
  String palabra="";
  int cont = rs.length();
  //println (cont);

  if (val>20 && val <60) {
    int ran1 = int(random(cont));
    int ran2 = int(random(cont));
    if (ran1!= ran2) {
      rs.replaceChar((cont-ran1), rs.charAt(ran2));
    }
    palabra = rs.text();
  } else if (val >=60) {
    rs.insertWord( int(random(5)), comodines[int(random(1, 11))]);
    palabra = rs.text();

    if (cont>10) {
      palabra = rs.substring(0, 9);
    }
  } else {
    palabra = rs.charAt(cont-1);
  }

  println(palabra);

  return palabra;
}


// the text to speech class
import java.io.IOException;

static class TextToSpeech extends Object {

  // Store the voices, makes for nice auto-complete in Eclipse

  //VOCES ESPAÑOLAS, LATINAS Y FRANCESAS
  /*
España: Monica, Jorge
   Argentina: Diego
   Colombia: Carlos, Soledad
   Mexico: Angelica, Juan, Paulina
   Canada (fr): Amelie, Chantal, Nicolas
   Francia: Audrey, Aurelie, Thomas
   extra:
   Ingles (india): Veena
   Italia; Alice, Federica, Paola, Luca
   */

  // castellano
  static final String MONICA = "Monica";
  static final String DIEGO = "Diego";
  static final String PAULINA = "Paulina";

  // frances

  static final String AMELIE = "Amelie";
  static final String THOMAS = "Thomas";

  // novelty voices
  /*
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
   */

  // throw them in an array so we can iterate over them / pick at random
  static String[] voices = {
    MONICA, DIEGO, PAULINA, AMELIE, THOMAS,
  };

  /*
ALBERT, BAD_NEWS, BAHH, 
   BELLS, BOING, BUBBLES, 
   CELLOS, DERANGED, GOOD_NEWS, 
   HYSTERICAL, PIPE_ORGAN, TRINOIDS, WHISPER, ZARVOX
   */
  // this sends the "say" command to the terminal with the appropriate args
  static void say(String script, String voice, int speed) {
    try {
      Runtime.getRuntime().exec(new String[] {
        "say", "-v", voice, "[[rate " + speed + "]]" + script
      }
      );
    }
    catch (IOException e) {
      System.err.println("IOException");
    }
  }

  // Overload the say method so we can call it with fewer arguments and basic defaults
  static void say(String script) {
    // 200 seems like a resonable default speed
    say(script, MONICA, 200);
  }
}
