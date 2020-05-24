Analizator = function(){   
    // =====================================
    // ========= MÉTODOS PROPIOS ===========
    // =====================================
    
    /**
     * Analizador básico. Devuelve el resultado de un análisis de expresión regular
     * de un texto
     * @param {String} mensaje Texto a analizar
     * @param {String} regular Expresion regular que buscar en mensaje
     * @param {String} modi Modificadores [i,g,l]
     * @returns {Array} Lista de las expresiones encontradas
     */
    this.analiBasic=function(mensaje,regular,modi){
        var rg = new RegExp(regular,modi);
        return mensaje.match(rg);
    }
    
    /**
     * Analizador completo. Si se entrega una expresión regular a analizar su
     * ejecución ser la del analizador básico. Si se entrega una lista de expresiones regulares,
     * recorrera esa lista y entregará una lista con todos los resultados obtenidos
     * @param {String} mensaje Texto a analizar
     * @param {Array|String} regular Expresion/es regular que buscar en mensaje
     * @param {String} modi Modificadores [i,g,l]
     * @returns {Array} Lista de las expresiones encontradas
     */
    this.analizarComp=function(mensaje,regular,modi="gi"){
        var resultado;
        
        if(typeof regular === "string"){
            console.log("Es una cadena de texto");
            resultado = this.analiBasic(mensaje,regular,modi);

        }else if(typeof regular === 'object'){
            console.log('Es un objeto');
            resultado=[];
            for(var i in regular){
                aux = this.analiBasic(mensaje,regular[i],modi);
                if(aux !== null){
                    resultado = resultado.concat(aux);
                }
            }
        }
        console.log("Resultado: " + resultado);
        return resultado;
    };
    
    /**
     * Método para obtener la suma de todos los números encontrados en un texto
     * @param {String} mensaje Texto a analizar
     * @param {String} regular Números que buscar en mensaje
     * @param {String} modi Modificadores [i,g,l]
     * @returns {Number} Suma de los números encontrados
     */
    this.analiSum = function(mensaje,regular="\\d+",modi="gi"){
        console.log("Método de análisis de suma");
        console.log("Regular: " + regular + " / Modi: " + modi);
        var numS = this.analiBasic(mensaje,regular,modi);
        var operacion = "0";
        var resultado;
        for(var i in numS){
            operacion += '+' + numS[i];
        }
        console.log("Operación: " + operacion);
        try{
            resultado = eval(operacion);
        }catch(Exeption){
            resultado = 0;
        }
        return resultado;
    };
    
    /**
     * Método para analizar grupos de expresiones por separado. Devolverá un texto
     * ya formateado:<br><br>
     * Nombre de lista
     * <ui>
     *      <li>Palabras encontradas</li>
     *      <li>Número de palabras encontradas</li>
     *      <li>% encontradas / Total encontradas</li>
     *      <li>% Encontradas / Total de palabras </li>
     * </ui>
     * @param {String} mensaje Mensaje a analizar
     * @param {Array} regular Listas de RegEx
     * @param {String} modi Modificadores
     * @returns {String} Resultado ya formateado del análisis
     */
    this.analiTipolo = function(mensaje,regular,modi="gi"){
        // Variables locales
        var listas = Object.keys(regular);
        var resultados = [];
        var Snombres = [];
        var salida="";
        for (var i in listas){
            resultados[i] = this.analizarComp(mensaje,regular[listas[i]],modi);
            Snombres[i] = preFormat(resultados[i]);
        }
        
        var palabTotal = mensaje.split(" ").length;
        var palabEncont = resultados[0].length + resultados[1].length;
        
        for (var i in resultados){
            var porcEncon = (100*resultados[i].length/palabEncont).toFixed(2);
            var porcTotal = (100*resultados[i].length/palabTotal).toFixed(2);
            if(isNaN(porcEncon)){porcEncon=0;}
            if(isNaN(porcTotal)){porcTotal=0;}
            
            salida+="<u>Palabras: <i>" + listas[i] + "</i></u>" +
                    "<ui>"+ 
                    "<li><b>Palabras encontradas:</b> " + Snombres[i] +
                    "<li><b>Número de palabras encontradas:</b> "+ resultados[i].length + "</li>" +
                    "<li><b>% Encontradas / Total encontradas: </b> "+ porcEncon + "%</li>" +
                    "<li><b>% Encontradas / Total:</b> " + porcTotal + "%</li>" +
                    "</ui><br>"
            ;
        }
        return salida;
    };
};