"use strict";

function mostrarDatoEnId (idElemento, valor) {
    let dato = document.getElementById (idElemento);
    dato.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    //Creo los elementos
    //Primero creo los div
    
    
    let divGasto = document.createElement("div");
    let divGastoDescripcion = document.createElement("div");
    let divGastoFecha = document.createElement("div");
    let divGastoValor = document.createElement("div");
    let divGastoEtiquetas = document.createElement("div");
    
    //Creo el elemento donde insertar el html
    let elementoInsertar = document.getElementById (idElemento);


    //Asigno clase a los div
    divGasto.classList.add ("gasto");
    divGastoDescripcion.classList.add ("gasto-descripcion");
    divGastoFecha.classList.add ("gasto-fecha");
    divGastoValor.classList.add ("gasto-valor");
    divGastoEtiquetas.classList.add ("gasto-etiquetas");
    
    divGastoDescripcion.textContent = gasto.descripcion;
    divGastoFecha.textContent =  gasto.fecha;
    divGastoValor.textContent = gasto.valor;
    
    divGasto.append (divGastoDescripcion);
    divGasto.append (divGastoFecha);
    divGasto.append (divGastoValor);
    divGasto.append (divGastoEtiquetas);

    
    
    elementoInsertar.append (divGasto); 
    
    //Creo los span
    for (let item of gasto.etiquetas) {
        let spanGastoEtiqueta = document.createElement("span");
        spanGastoEtiqueta.classList.add ("gasto-etiquetas-etiqueta");
        spanGastoEtiqueta.textContent = item;
        divGastoEtiquetas.append (spanGastoEtiqueta);
    }

}

function mostrarGastosAgrupadosWeb() {

}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}