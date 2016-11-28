// Aaron ALAI EMF Detector May 28th 2009 VERSION 1.1
// aaronalai1@gmail.com
// contains code for averaging sensor data

//*****Cada entrada analógica sería una columna, falta ver como tener conectados todos los arduinos al mismo puerto.

#define sample 300                    //this is how many samples the device takes per reading

int inPin0 = 0;                                  //analog 0
int inPin1 = 1;                                  //analog 1
int inPin2 = 2;                                  //analog 2
int inPin3 = 3;                                  //analog 3
int inPin4 = 4;                                  //analog 4
int inPin5 = 5;                                  //analog 5

int val0 = 0;                                         //where to store info from analog 0
// agregar mas
int val5 = 0;                                         //where to store info from analog 5

int array5[sample];                      //creates an array with number of elements equal to "sample"
unsigned long averaging5;         //the program uses this variable to store the sum of each array it makes

void setup() {
  Serial.begin (9600);
}

void loop() {

//solo para la entrada 5 faltaría hacerlo para las demás
  for (int i = 0; i < sample; i++) {            //this code tells the program to fill each element in the array we made with
    array5[i] = analogRead(inPin5);       //information from the antenna wire coming out of the Arduino
    averaging5 += array5[i];                      //more information about for loops http://arduino.cc/en/Reference/For
  }  
//the averaging line is simply saying: add averaging to whatever is in array position i
  //averaging += array[i] is the same as averaging = averaging + array[i]
  //for more information about += http://arduino.cc/en/Reference/IncrementCompound

  val5 = averaging5 / sample;                   //here the program takes the sum of all numbers in array1, and divides by the number of elements "sample"

  val5 = constrain(val5, 0, 100);               //this constrains the variable value to between two numbers 0 and 100
  //val = map(val, 0, 200, 0, 255);     
  averaging5 = 0;                                 //this line of code sets averaging back to zero so it can be used again

  Serial.print(val0, DEC); 
  Serial.print(",");
//faltaría pasar todas las entradas, cada entrada es una columna
  Serial.print(val5, DEC);
  Serial.println();
  
  delay(100); // ver si es necesario
}
