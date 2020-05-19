Analizator = function(){
    this.REGEX;
    this.modificadores;
    this.analizar=function(mensaje,regular,modi){
        console.log("Funcion analizar. Mensaje: "+mensaje+" // regular: "+regular+" // modi: "+modi);
        rg = new RegExp(regular,modi);
        return mensaje.match(rg);
    }
    this.countAnalizar=function(mensaje,regular,modi){
        console.log("Funcion contar. Mensaje: "+mensaje+" // regular: "+regular+" // modi: "+modi);
        rg = new RegExp(regular,modi);
        return mensaje.match(rg).length;
    }
}


