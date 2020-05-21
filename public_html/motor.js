// VARIABLES DE SESION
let IDtext = document.getElementById('texto');
let Sfech = document.getElementById('salFech');
let Semail = document.getElementById('salEmail');
let Sname = document.getElementById('salName');
let Stipol = document.getElementById('salTipol');
let Ssum = document.getElementById('salSum');
var salidas = [Sfech,Semail,Sname,Stipol,Ssum];
var analitc = new Analizator();
var regexJ;

let modi = 'gi';

var lecturaJSON = function(){
    fetch('regexJ.json')
        .then(function(response){
            return response.json();
        })
        .then(function(jsonR){
            console.log(jsonR);
            regexJ = jsonR;
        }
    );
};

var aniButt = function(ty){
    console.log('ejecucion funcion aniButt');
    // decodificamos el ty al nombre clave del JSON 
    var n = regexJ.deCode[ty];
    console.log("Tipo de elementos: " + typeof regexJ[n]);
    // Extraemos el resultado del Regular expresion
    var Msalida = analitc.analizar(IDtext.value,regexJ[n],modi);
     
    if( ty == 4 ){
        var numS = analitc.analizar(IDtext.value,regexJ[n],modi);
        var operacion = '';
        for(var i in numS){
            operacion += '+' + numS[i];
        }
        Msalida = eval(operacion);
    }
    salidas[ty].innerHTML = Msalida;
};

document.addEventListener('onload',lecturaJSON());