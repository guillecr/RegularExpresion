Analizator = function(){
    this.REGEX;
    this.modificadores;
    this.analizarOld=function(mensaje,regular,modi){
        console.log("Funcion analizar OLD. Mensaje: "+mensaje+" // regular: "+regular+" // modi: "+modi);
        rg = new RegExp(regular,modi);
        return mensaje.match(rg);
    };
    
    // Metodo no usado
    this.analizar=function(mensaje,regular,modi){
        console.log("Funcion analizar. Mensaje: "+mensaje+" // regular: "+regular+" // modi: "+modi);
        var rg = new RegExp(regular,modi);
        var resultado="";
        
        if(typeof regular === "string"){
            console.log("Es una cadena de texto");
            resultado = mensaje.match(rg);

        }else if(typeof regular === 'object'){
            console.log('Es un objeto');
            
            for(var i in regular){
                rg = new RegExp(regular[i],modi);
                var aux = mensaje.match(rg);
                if (aux !== null){
                    resultado += ' / '+ aux + '/';
                }
            }
        }
        return resultado;
    };
};


