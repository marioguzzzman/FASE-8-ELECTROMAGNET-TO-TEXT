import rita.*;
import processing.serial.*; //LECTURA ARDUINO

//timer
int time;
int wait = 2000;
int time2;
int wait2 = 100000;



//LECTURA ARDUINO
Serial port;  
int end = 10;
int val0, val1, val2, val3, val4, val5;   //numero del valor de EMF  
String serial; //valor EMF en String (del Serial)
int txt=int(random(0, 8));

//CREATE TEXT

// TEXTOS
String[] comodines = { "electromagnético", "claridad", "técnica", "moral", "fábula", "luz", "mesura", "medida", "ciencia", "deber", "responsabilidad"}; 
String[] textos_columnas = { 
  "lo que está en juego son los procedimientos", 
  "aquellos que están fuera del palacio pueden ver lo que pasa dentro", 
  "invasión permanente que instituya nuevas formas de hacer", 
  "mantener abierto el espacio de la institución", 
  "una superficie total de tres mil metros cuadrados", 
  "el estilo de los edificios responde al neoclasicismo francés", 
  "¿Qué es el Neoclasicismo?", 
  "Cielito, ciclo que sí, digo cese la pendencia, ya reventó la coyunda, y viva la Independencia."}; 


// TEXT TO SPEECH
RiString frase, frase2, frase_say;
String say;
int count;
int voiceIndex;
int voiceSpeed;

int[] valores;

void setup() {
  valores = new int [2];

  String portName = Serial.list()[3];
  // println(portName);
  port = new Serial(this, portName, 9600);
  port.clear();  // function from serial library that throws out the first reading, in case we started reading in the middle of a string from Arduino
  serial = port.readStringUntil(end); // function that reads the string from serial port until a println and then assigns string to our string variable (called 'serial')
  serial = null;

  time = millis();//store the current time

  time2 = millis();//store the current time


  //count = RiTa.getWordCount(frase.text());
  //println(count);
  //println(frase.words()[4]);



  /*
  frase.removeChar(2);
   frase.replaceChar(2,"h");
   frase2 = frase.slice(1,3);
   frase.replaceFirst(frase2, "cu");
   */
}

void draw() {
      //println("draw: "+txt);

  if (millis() - time2 >= wait2) {
    txt = int(random(0, 8));
    println("update: "+txt);
    time2 = millis();//also update the stored time // esto resetea
  }
  //LECTURA SERIAL
  /*******************************************************/
  if ( port.available() > 0) {  
    serial = port.readStringUntil(end);
    if (serial != null) {
      String[] a = split(serial, ',');

      val0 =int(float(trim(a[0]))); // castear
      //println("Col2: "+val0);

      val1 =int(float(trim(a[1])));
      //println("Col3: "+val1);

      valores[0] = val0;  // volver a poner dentro de array valores
      valores[1] = val1;
      println("valores: "+valores[0]+" "+valores[1]);

      //CODIGO COLUMNA 1 
      int columna = int(random(1, 2));
      leer_columna(columna, valores[columna]);  /// tiene un error  ??? quizas cambiamos valores[columna] solo por el valor de la comlumna
      //println("col: "+columna);
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




// cuanto mas campo magnetico menos se entiende
String mix_text(RiString rs, int val) {
  String palabra="";
  int cont = rs.length(); // longitud de la palabra
  //println (cont);
  if (val >=30 && val<40) { // inderta caracters
    palabra = rs.charAt(cont-1); // posicion maximo menos uno. casa seria s, solo agarra la s, carater en la posicion 3, quita un caracter pero en sonido cambia
  } else 
  if (val>= 40 && val < 60) { // si es entre 40 y 60, intercambia elementos
    int ran1 = int(random(cont)); // numero al azar del maximo de caracteres
    int ran2 = int(random(cont)); // numero al azar del maximo de caracteres
    if (ran1!= ran2) { // si son distintos intercambio las posiones reemplazo uno de los dos
      rs.replaceChar((cont-ran1), rs.charAt(ran2)); //reemplazo (largo de palabra menos random 1, random 2 de la palabra misma)
 
    }
    palabra = rs.text(); // palabra es palabra modificada
    println(palabra);
  }  
  if (val >=50) { // mayor o igual que 50 inserta un comodin dentro de palabra 
    rs.insertWord( int(random(5)), comodines[int(random(1, 11))]); //inserta un comodin dentro de la palabra
    palabra = rs.text(); // vuelve a definir palabra

    //revisar corte
    if (cont>10) { // si el largo de la alabra es mauor que 10, lo recort a 9.
      palabra = rs.substring(0, 9);
    }
  } 

  //println(palabra);

  return palabra;
}

// problema en contar columnas desde 0 y valores desde 1
void leer_columna (int col, int val) {
  frase = new RiString(textos_columnas[txt]);

  if (val>30) { // dejo anotado el valor que testie    si es entre 30 y 40 // si es mayor que 30 hace cosas
    say = mix_text(frase, val); //llamada a funcion mix_text, say solo entonces solo la construccion de la palabra.
    voiceSpeed =int(random(30, 200));
    frase_say = new RiString(say); // la frase que va a leer la compu
    

    if (frase_say.length()>100) { // si la frase es mayor que 100
      say = frase_say.substring(0, 100); // la recorta
    }
    wait = int ((frase_say.length()/10)*800); //tiempo para hacer tiempo no monotono. largo de la palabra entre 10*800, para no superponer lecturas
    
    //println(wait);
  } else { // si es mejor que 30 resetear
    //reset
    reset_columna(col);
  }

// contador
  if (millis() - time >= wait) { // aca siempre cambia wait.
    TextToSpeech.say(say, TextToSpeech.voices[int(random(1, 5))], voiceSpeed); // cada tanto tiempo habla
    println(say);
    time = millis();//also update the stored time // actualiza el tiempo
  }
}

void reset_columna(int col) { // dice un texto segun un banco de datos, sin alteraciones
  say = textos_columnas[txt]; // guarda en say una de las frases
  voiceSpeed = 150; 
  wait = int(random(5000, 10000)); // una espera en normal
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
      Runtime.getRuntime().exec(new String[] {"say", "-v", voice, "[[rate " + speed + "]]" + script});
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