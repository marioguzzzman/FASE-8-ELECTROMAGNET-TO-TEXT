// Aaron ALAI EMF Detector May 28th 2009 VERSION 1.1
// aaronalai1@gmail.com
// contains code for averaging sensor data

#define sample 300                    //this is how many samples the device takes per reading
//more information for #define http://arduino.cc/en/Reference/Define
int inPin = 5;                                  //analog 5
float val;                                         //where to store info from analog 5
int pin11 = 11;                              //output of red led

int array1[sample];                      //creates an array with number of elements equal to "sample"
//more information about arrays http://arduino.cc/en/Reference/Array


unsigned long averaging;         //the program uses this variable to store the sum of each array it makes


void setup() {

  Serial.begin (9600);

}

void loop() {

  for (int i = 0; i < sample; i++) {            //this code tells the program to fill each element in the array we made with
    array1[i] = analogRead(inPin);       //information from the antenna wire coming out of the Arduino
    averaging += array1[i];                      //more information about for loops http://arduino.cc/en/Reference/For
  }                                                               //the averaging line is simply saying: add averaging to whatever is in array position i
  //averaging += array[i] is the same as averaging = averaging + array[i]
  //for more information about += http://arduino.cc/en/Reference/IncrementCompound



  val = averaging / sample;                   //here the program takes the sum of all numbers in array1, and divides by the number of elements "sample"

  val = constrain(val, 0, 100);               //this constrains the variable value to between two numbers 0 and 100
  val = map(val, 0, 100, 0, 255);      //for more information about constrain http://arduino.cc/en/Reference/Constrain
  analogWrite(pin11, val);                //the map statement tells the program to map out 0-100 to 0-255, 255 is
  //the threashold of analogWrite for more information about map http://arduino.cc/en/Reference/Map
  averaging = 0;                                 //this line of code sets averaging back to zero so it can be used again

Serial.println (val);

/////sonido
if (val > 0){
// turn off tone function for pin 8:
  noTone(8);
  // play a note on pin 6 for 200 ms:
  tone(6, 440, val);
  delay(val*2 +100 );

  // turn off tone function for pin 6:
  noTone(6);
  // play a note on pin 7 for 500 ms:
  tone(7, 494, val);
  delay(val + 200);

  // turn off tone function for pin 7:
  noTone(7);
  // play a note on pin 8 for 500 ms:
  tone(8, 523, val);
  delay(val + 150);
}
}
