// VARIABLES DE SESION
let IDtext = document.getElementById('texto');
let Sfech = document.getElementById('salFech');
let Semail = document.getElementById('salEmail');
let Sname = document.getElementById('salName');
let Stipol = document.getElementById('salTipol');
let Ssum = document.getElementById('salSum');
var salidas = [Sfech,Semail,Sname,Stipol,Ssum];
var analitc = new Analizator();

// Regular expresion prehechas
let regexS = [
    '\\d{1,2}[/-]\\d{1,2}[/-]\\d{2,4}', // Fechas
    '\\w*@\\w*.\\w*',                   // Correo
    'Guille\\w*',          // nombres
    'bueno',                            // tipologia
    '\\d+'                              // Suma
]
var test = function(){
    for (cont in salidas){
        salidas[cont].innerHTML=cont;
    }
}

var aniButt = function(ty){
    console.log('ejecucion funcion aniButt');
    var Msalida = analitc.analizar(IDtext.value,regexS[ty],"gi");
    
    if( ty == 4 ){
        var numS = analitc.analizar(IDtext.value,regexS[ty],"gi");
        var suma;
        var operacion = '';
        for(i in numS){
            operacion += '+' + numS[i];
        }
        Msalida = eval(operacion);
    }
    salidas[ty].innerHTML = Msalida;
}
document.addEventListener('onload',test());