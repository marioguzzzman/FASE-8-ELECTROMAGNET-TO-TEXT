
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

let frase;
let frase 2;
let frase_say;
let count;

let voiceIndex;
let voiceSpeed;

// int[] valores; // que hace esto?


//VOICES
var iptr = 0; // a counter for the words

var myVoice = new p5.Speech(); // new P5.Speech object
let voicesX = ['Google français', 'Google español', 'Google español de Estados Unidos'];
    

function setup() {
    noCanvas();

    // valores = new int [2]; //que hace esto?

//SERIAL 

//   String portName = Serial.list()[3];
//   // println(portName);
//   port = new Serial(this, portName, 9600);
//   port.clear();  // function from serial library that throws out the first reading, in case we started reading in the middle of a string from Arduino
//   serial = port.readStringUntil(end); // function that reads the string from serial port until a println and then assigns string to our string variable (called 'serial')
//   serial = null;

//   time = millis();//store the current time

//   time2 = millis();//store the current time

//TIME
time = millis();//store the current time  // where are these variables?
time2 = millis();//store the current time // where are these variables?

}


function draw() {
// TEST
// mousePressed(); auto repeat //Iterates in the word array. Test


//PRE-V

//console.log("draw: " + txt);

//Que hace este codigo?
 
  if (millis() - time2 >= wait2) {
    txt = int(random(0, 8));
    println("update: "+txt);
    time2 = millis();//also update the stored time
  }

  //LECTURA SERIAL
  /*******************************************************/
  if ( port.available() > 0) {  
    serial = port.readStringUntil(end);
    if (serial != null) {
      String[] a = split(serial, ',');

      val0 =int(float(trim(a[0])));
      //println("Col2: "+val0);

      val1 =int(float(trim(a[1])));
      //println("Col3: "+val1);

      valores[0] = val0;
      valores[1] = val1;
      println("valores: "+valores[0]+" "+valores[1]);

      //CODIGO COLUMNA 1 
      int columna = int(random(1, 2));
      leer_columna(columna, valores[columna]);
      //println("col: "+columna);
    }
  }
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
String mix_text(RiString rs,int val) {
    String palabra="";
    int cont = rs.length();
    //console.log (cont);
    if (val >=30 && val<40) {
      palabra = rs.charAt(cont-1);
    } else 
    if (val>=40 && val <60) {
      int ran1 = int(random(cont));
      int ran2 = int(random(cont));
      if (ran1!= ran2) {
        rs.replaceChar((cont-ran1), rs.charAt(ran2));
      }
      palabra = rs.text();
      println(palabra);
    }  
    if (val >=50) {
      rs.insertWord( int(random(5)), comodines[int(random(1, 11))]);
      palabra = rs.text();
  
      //revisar corte
      if (cont>10) {
        palabra = rs.substring(0, 9);
      }
    } 
  
    //console.log(palabra);
  
    return palabra;
  }


  void leer_columna (int col, int val) {
    frase = new RiString(textos_columnas[txt]);
  
    if (val>30) {
      say = mix_text(frase, val); //llamada a funcion mix_text
      voiceSpeed =int(random(30, 200));
      frase_say = new RiString(say);
      
  
      if (frase_say.length()>100) {
        say = frase_say.substring(0, 100);
      }
      wait = int ((frase_say.length()/10)*800);
      
      //println(wait);
    } else {
      //reset
      reset_columna(col);
    }
  
    if (millis() - time >= wait) {
      TextToSpeech.say(say, TextToSpeech.voices[int(random(1, 5))], voiceSpeed);
      println(say);
      time = millis();//also update the stored time
    }
  }

  void reset_columna(int col) {
    say = textos_columnas[txt];
    voiceSpeed = 150;
    wait = int(random(5000, 10000));
  }


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