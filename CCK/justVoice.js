
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


	var iptr = 0; // a counter for the words

    var myVoice = new p5.Speech(); // new P5.Speech object


    let voicesX = ['Google français', 'Google español', 'Google español de Estados Unidos'];
    

function setup() {
    noCanvas();


}


function draw() {

    // mousePressed(); auto repeat

}


function mousePressed()
{
    // if in bounds:
        // randomize voice and speak word:
        myVoice.setVoice(Math.floor(random(voicesX.length)));
        myVoice.speak(comodines[iptr]);
        iptr = (iptr+1) % comodines.length; // increment

}