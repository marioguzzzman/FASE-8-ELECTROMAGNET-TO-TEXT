// Aaron ALAI EMF Detector May 28th 2009 VERSION 1.1
// aaronalai1@gmail.com
// contains code for averaging sensor data



#define sample 300                    //this is how many samples the device takes per reading
//more information for #define http://arduino.cc/en/Reference/Define

//int inPin0 = 0;   //analog 0
int inPin1 = 1;     //analog 1
int inPin2 = 2;     //analog 2
int inPin3 = 3;     //analog 3 //Using this
int inPin4 = 4;     //analog 4
int inPin5 = 5;     //analog 5 //Using this

//int val0 = 0;   //where to store info from analog 0
int val1 = 1;     //where to store info from analog 0
int val2 = 2;     //where to store info from analog 0
int val3 = 3;     //where to store info from analog 3  //Using this
int val4 = 4;     //where to store info from analog 0
int val5 = 5;     //where to store info from analog 5  //Using this

int pin11 = 11;                              //output of red led

//int array0[sample];                       //creates an array with number of elements equal to "sample"
int array1[sample];                      //creates an array with number of elements equal to "sample"
int array2[sample];                      //creates an array with number of elements equal to "sample"
int array3[sample];                      //creates an array with number of elements equal to "sample"
int array4[sample];                      //creates an array with number of elements equal to "sample"
int array5[sample];                      //creates an array with number of elements equal to "sample"
//more information about arrays http://arduino.cc/en/Reference/Array


//unsigned long averaging0;         //the program uses this variable to store the sum of each array it makes
unsigned long averaging1;         //the program uses this variable to store the sum of each array it makes
unsigned long averaging2;         //the program uses this variable to store the sum of each array it makes
unsigned long averaging3;         //the program uses this variable to store the sum of each array it makes
unsigned long averaging4;         //the program uses this variable to store the sum of each array it makes
unsigned long averaging5;         //the program uses this variable to store the sum of each array it makes


void setup() {

  Serial.begin (9600);

}

void loop() {

  for (int i = 0; i < sample; i++) {            //this code tells the program to fill each element in the array we made with
  /*  array0[i] = analogRead(inPin0);       //information from the antenna wire coming out of the Arduino
    averaging0 += array0[i]; */   
 //   array1[i] = analogRead(inPin1);       //information from the antenna wire coming out of the Arduino
 //  averaging1 += array1[i];   
//   array2[i] = analogRead(inPin2);       //information from the antenna wire coming out of the Arduino
 //   averaging2 += array2[i];    
    array3[i] = analogRead(inPin3);       //information from the antenna wire coming out of the Arduino
    averaging3 += array3[i];    
 //   array4[i] = analogRead(inPin4);       //information from the antenna wire coming out of the Arduino
 //   averaging4 += array4[i];    
    array5[i] = analogRead(inPin5);       //information from the antenna wire coming out of the Arduino
    averaging5 += array5[i];      //more information about for loops http://arduino.cc/en/Reference/For
 
}                                                               //the averaging line is simply saying: add averaging to whatever is in array position i
  //averaging += array[i] is the same as averaging = averaging + array[i]
  //for more information about += http://arduino.cc/en/Reference/IncrementCompound



//  val0 = averaging0 / sample;    //here the program takes the sum of all numbers in array1, and divides by the number of elements "sample"
// val1 = averaging1 / sample;     //here the program takes the sum of all numbers in array1, and divides by the number of elements "sample"
//  val2 = averaging2 / sample;    //here the program takes the sum of all numbers in array1, and divides by the number of elements "sample"  
  val3 = averaging3 / sample;      //here the program takes the sum of all numbers in array1, and divides by the number of elements "sample"
 // val4 = averaging4 / sample;    //here the program takes the sum of all numbers in array1, and divides by the number of elements "sample"
  val5 = averaging5 / sample;      //here the program takes the sum of all numbers in array1, and divides by the number of elements "sample"

//  val1 = map(val1, 0, 250, 0, 100);      //for more information about constrain http://arduino.cc/en/Reference/Constrain
//  val2 = map(val2, 0, 250, 0, 100);      //for more information about constrain http://arduino.cc/en/Reference/Constrain
 val3 = map(val3, 150, 300, 0, 100);      //for more information about constrain http://arduino.cc/en/Reference/Constrain
//  val4 = map(val4, 0, 250, 0, 100);      //for more information about constrain http://arduino.cc/en/Reference/Constrain
 val5 = map(val5, 150, 300, 0, 100);      //for more information about constrain http://arduino.cc/en/Reference/Constrain


//  val0 = constrain(val0, 0, 100);               //this constrains the variable value to between two numbers 0 and 100
//  val1 = constrain(val1, 0, 100);               //this constrains the variable value to between two numbers 0 and 100
//  val2 = constrain(val2, 0, 100);               //this constrains the variable value to between two numbers 0 and 100
  val3 = constrain(val3, 0, 100);               //this constrains the variable value to between two numbers 0 and 100
 // val4 = constrain(val4, 0, 100);               //this constrains the variable value to between two numbers 0 and 100
  val5 = constrain(val5, 0, 100);               //this constrains the variable value to between two numbers 0 and 100


  //analogWrite(pin11, val);                //the map statement tells the program to map out 0-100 to 0-255, 255 is
  //the threashold of analogWrite for more information about map http://arduino.cc/en/Reference/Map
 
  //averaging0 = 0;      //this line of code sets averaging back to zero so it can be used again
 // averaging1 = 0;                                 //this line of code sets averaging back to zero so it can be used again
//  averaging2 = 0;                                 //this line of code sets averaging back to zero so it can be used again
  averaging3 = 0;                                 //this line of code sets averaging back to zero so it can be used again
 // averaging4 = 0;                                 //this line of code sets averaging back to zero so it can be used again
  averaging5 = 0;                                 //this line of code sets averaging back to zero so it can be used again


 // Serial.print(val0, DEC); 
 // Serial.print(",");
 // Serial.print(val1, DEC); 
 // Serial.print(",");
 // Serial.print(val2, DEC); 
 //Serial.print(",");
  Serial.print(val3, DEC); 
  Serial.print(",");
 // Serial.print(val4, DEC); 
 // Serial.print(",");
  Serial.print(val5, DEC);
  Serial.println();

  delay(100);

/*
  /////sonido
  if (val5 > 0 && val5!=255){
    // turn off tone function for pin 8:
    noTone(8);
    // play a note on pin 6 for 200 ms:
    tone(6, val5*2 +100, val5);
    delay(val5*2 +100 );

    // turn off tone function for pin 6:
    noTone(6);
    // play a note on pin 7 for 500 ms:
    tone(7, val5*3 + 200, val5);
    delay(val5 + 200);

    // turn off tone function for pin 7:
    noTone(7);
    // play a note on pin 8 for 500 ms:
    tone(8, val5*4 +300, val5);
    delay(val5 + 150);
    
  }
  */

}
