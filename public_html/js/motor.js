/**============================================
 *   Programa de analisis de texto
 * 
 *   AUTOR: Guillermo Casas
 *   Versión: 24-05-20
 * ============================================
 */

// VARIABLES DE SESIÓN
// Contenedor del texto
let IDtext  = document.getElementById('texto'); 

// Salidas de resultados
let Sfech   = document.getElementById('salFech');
let Semail  = document.getElementById('salEmail');
let Sname   = document.getElementById('salName');
let Stipol  = document.getElementById('salTipol');
let Ssum    = document.getElementById('salSum');

// Librería de contenedores de salidas
var salidas = [Sfech,Semail,Sname,Stipol,Ssum];

// Objeto analizador
var analitc = new Analizator();

// Variable donde almacenamos las RegEx del servidor
var regexJ; 

// Valor del modificador en todas las consultas
let modi = 'gi';

/**
 * Función para obtener los RegEx del .json del servidor.
 * Lo almacenaremos en la variable regexJ (ya definida)
 */
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

/**
 * Funcion que nos devuelve el contenido de una lista en formato 
 * String con el separador indicado
 * 
 * @param {type} arr Lista con los valores a trasformar
 * @param {type} sepa Caracter separador
 * @returns {String|preFormat.text} String con la lista
 */
var preFormat = function(arr,sepa=','){
    var text="";
    sepa = sepa+" ";
    for(i in arr){
        text += arr[i]+sepa;
    }
    text = text.substr(0,(text.length-sepa.length));
    return text;
}

/**
 * Función principal. Se iniciará al pulsar un botón. Se enviará como parámetro 
 * el código numérico del botón.
 * En función del código de botón se decodifica al nombre de la lista a la que
 * pertenecen en el regex.json (en la lista deCode) y en función de que lista a la que pertenezca
 * se ejecutará la función:
 * - Extracción de las palabras coincidentes
 * - Análisis tipológico del texto
 * - Suma de los números existente en el texto
 * @param {Numeric} ty Código numérico del botón
 */
var aniButt = function(ty){
    console.log('Ejecucion funcion principal (aniButt). Codigo: ' + ty);
    // Decodificamos el ty al nombre clave del JSON
    var deTy = regexJ.deCode[ty];
    // Definimos e iniciamos la variable de salida
    var Msalida="";
    
    // Elección de la ejecución en función de la lista seleccionada
    if(deTy === "fecha" || deTy === "email" || deTy === "nombre"){  
        Msalida = analitc.analizarComp(IDtext.value,regexJ[deTy],modi);
    }else if(deTy === "tipologia"){
        Msalida = analitc.analiTipolo(IDtext.value,regexJ[deTy]);
    }else if(deTy === "suma"){
        Msalida = analitc.analiSum(IDtext.value);
    }
    
    // Si es un array, le damos nosotros la forma de salida
    if(typeof Msalida === 'object'){Msalida = preFormat(Msalida);}
    
    // Si el resultado es nulo, corregimos el mensaje a un mensaje estandar
    if(Msalida === null || Msalida.length<1){
        Msalida="Sin resultados";
    }

    salidas[ty].innerHTML = Msalida;
};

// Evento para cargar la librería de RegEx del archivo .json
document.addEventListener('onload',lecturaJSON());