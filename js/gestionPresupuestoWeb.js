"use strict";
import * as gesPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId (idElemento, valor) {
    let dato = document.getElementById (idElemento);
    dato.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    //Creo los elementos
    //Primero creo los div    
    
    let divGasto = document.createElement("div");
    let divGastoDescripcion = document.createElement("div");
    let divGastoValor = document.createElement("div");
    let divGastoFecha = document.createElement("div");    
    let divGastoEtiquetas = document.createElement("div");
    
    //Creo el elemento donde insertar el html
    let elementoInsertar = document.getElementById (idElemento);


    //Asigno clase a los div
    divGasto.classList.add ("gasto");
    divGastoDescripcion.classList.add ("gasto-descripcion");
    divGastoValor.classList.add ("gasto-valor");
    divGastoFecha.classList.add ("gasto-fecha");    
    divGastoEtiquetas.classList.add ("gasto-etiquetas");

    let mesString = (parseInt (new Date(gasto.fecha).getMonth()) + 1 < 10) ? "0" + (parseInt(new Date(gasto.fecha).getMonth()) + 1).toString() : (parseInt(new Date(gasto.fecha).getMonth()) + 1).toString();
    let diaString = (parseInt (new Date(gasto.fecha).getDate()) <10) ? "0" + new Date(gasto.fecha).getDate() : new Date(gasto.fecha).getDate();
    let fechaString = new Date(gasto.fecha).getFullYear() + "-" + mesString + "-" + diaString; 
    

    /*let mesString = (parseInt (new Date(gasto.fecha).getMonth()) < 10) ? "0" + new Date(gasto.fecha).getMonth() : new Date(gasto.fecha).getMonth();
    let diaString = (parseInt (new Date(gasto.fecha).getDate()) <10) ? "0" + new Date(gasto.fecha).getDate() : new Date(gasto.fecha).getDate();
    let fechaString = new Date(gasto.fecha).getFullYear() + "-" + mesString + "-" + diaString;  */

    divGastoDescripcion.textContent = gasto.descripcion;
    divGastoFecha.textContent = fechaString;
    divGastoValor.textContent = gasto.valor;
    
    

    divGasto.append (divGastoDescripcion);
    divGasto.append (divGastoValor);
    divGasto.append (divGastoFecha);    
    divGasto.append (divGastoEtiquetas);

    
    
    elementoInsertar.append (divGasto); 
    //Creo los span
    for (let item of gasto.etiquetas) {
        let spanGastoEtiqueta = document.createElement ("span");
        spanGastoEtiqueta.classList.add ("gasto-etiquetas-etiqueta");
        spanGastoEtiqueta.textContent = item;
        divGastoEtiquetas.append (spanGastoEtiqueta);        

        //Genero nuevo objeto BorrarEtiquetasHandle
        let accionBorrarEtiqueta = new BorrarEtiquetasHandle();
        //Asigno objeto gasto a accionBorrarEtiqueta
        accionBorrarEtiqueta.gasto = gasto;
        //Añado el eventListener para asociar la etiqueta con el evento BorrarEtiquetasHandle
        spanGastoEtiqueta.addEventListener ("click", accionBorrarEtiqueta);        
    }

    //Creo los botones Editar y Borrar respectivamente
    let botonEditar = document.createElement ("button");
    botonEditar.classList.add ("gasto-editar");
    botonEditar.innerText = "Editar";

    let botonBorrar = document.createElement ("button");
    botonBorrar.classList.add ("gasto-borrar");
    botonBorrar.innerText = "Borrar";

    let botonBorrarAPI = document.createElement ("button");
    botonBorrarAPI.classList.add ("gasto-borrar-api");
    botonBorrarAPI.innerText = "Borrar (API)";

    let botonEditarForm = document.createElement ("button");
    botonEditarForm.classList.add ("gasto-editar-formulario");
    botonEditarForm.innerText = "Editar (formulario)";

    divGasto.append (botonEditar);
    divGasto.append (botonBorrar);
    divGasto.append (botonBorrarAPI);
    divGasto.append (botonEditarForm);

    //Genero nuevo objeto EditarHandle
    let accionEditar = new EditarHandle();
    //Le asigno nueva propiedad gasto, apuntando a gasto
    accionEditar.gasto = gasto;

    //Asocio el click del botón Editar, con eventListener, al objeto EditHandle
    botonEditar.addEventListener ("click", accionEditar);

    //Genero nuevo objeto EditarHandleFormulario
    let accionEditarFormulario = new EditarHandleFormulario();
    //Le asigno la nueva propiedad gasto, apuntando a gasto
    accionEditarFormulario.gasto = gasto;

    //Asocio el click del botón EditarForm al objeto EditarHandleFormulario
    botonEditarForm.addEventListener ("click", accionEditarFormulario);

    //Genero nuevo objeto BorrarHandle
    let accionBorrar = new BorrarHandle();
    //Le asigno nueva propiedad gasto, apuntando a gastos
    accionBorrar.gasto = gasto;

    //Asocio el click del botón Borrar, con eventListener, al objeto BorrarHandler
    botonBorrar.addEventListener ("click", accionBorrar); 

    //Genero nuevo objeto BorrarHandleAPI
    let accionBorrarAPI = new BorrarHandleApi;
    //Le asigno nueva propiedad gasto, apuntando a gasto
    accionBorrarAPI.gasto = gasto;

    //Asocio el click del botón Borrar, con eventListener, al objeto BorrarHandler
    botonBorrarAPI.addEventListener ("click", accionBorrarAPI); 
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    //Creo elementos
    let divAgrupacion = document.createElement ("div");
    let h1Periodo = document.createElement ("h1");    

    //Asigno clases
    divAgrupacion.classList.add ("agrupacion");


    h1Periodo.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.append (h1Periodo);


    //Creo el elemento donde insertar el html
    let elementoInsertar = document.getElementById (idElemento);
    
    for (let item in agrup) {
        let propiedad = item;
        let valor = agrup[item];

        //Creo elementos
        let divAgrupacionDato = document.createElement ("div");    
        let spanAgrupacionDatoClave = document.createElement ("span");
        let spanAgrupacionDatoValor = document.createElement ("span");
        
        //Asigno clases
        divAgrupacionDato.classList.add ("agrupacion-dato");
        spanAgrupacionDatoClave.classList.add ("agrupacion-dato-clave");
        spanAgrupacionDatoValor.classList.add ("agrupacion-dato-valor");
    
        spanAgrupacionDatoClave.textContent = propiedad;
        spanAgrupacionDatoValor.textContent = valor;
        
        divAgrupacionDato.append (spanAgrupacionDatoClave);
        divAgrupacionDato.append (spanAgrupacionDatoValor);
        divAgrupacion.append (divAgrupacionDato);
    }

    
    elementoInsertar.append (divAgrupacion);
}

function repintar() {
    //Creo variables con elementos a utilizar

    let divPresupuesto = document.getElementById ("presupuesto");
    let divGastosTotales = document.getElementById ("gastos-totales");
    let divBalanceTotal = document.getElementById ("balance-total");

    let divListadoGastosCompleto = document.getElementById ("listado-gastos-completo");

    mostrarDatoEnId (divPresupuesto.id, gesPresupuesto.mostrarPresupuesto ());
    mostrarDatoEnId (divGastosTotales.id, gesPresupuesto.calcularTotalGastos());
    mostrarDatoEnId (divBalanceTotal.id, gesPresupuesto.calcularBalance());

    //Borro contenido
    divListadoGastosCompleto.innerHTML = "";

    let gastos = gesPresupuesto.listarGastos();

    for (let item of gastos) {
        mostrarGastoWeb(divListadoGastosCompleto.id, item);
    }  

}

/*

let botonActualizoPresupuesto = document.getElementById ("actualizarpresupuesto");

botonActualizoPresupuesto.addEventListener ("click", function (e) {
    console.log (e);
    
    let nuevoPresupuesto = parseFloat(prompt ("Nuevo presupuesto"));

    gesPresupuesto.actualizarPresupuesto (nuevoPresupuesto);
    repintar();
});
*/

/*let botonActualizoPresupuesto = document.getElementById ("actualizarpresupuesto");

botonActualizoPresupuesto.addEventListener ("click", function (e) {
    console.log (e);
    e.preventDefault();
    let nuevoPresupuesto = parseFloat(prompt ("Nuevo presupuesto"));
    gesPresupuesto.actualizarPresupuesto (nuevoPresupuesto);
    repintar();
});*/




//Manejadora de eventos para el botón 'Actualizar presupuesto'
function actualizarPresupuestoWeb () {
        let nuevoPresupuesto = parseFloat(prompt ("Nuevo presupuesto"));
        gesPresupuesto.actualizarPresupuesto (nuevoPresupuesto);

        repintar();

}

let botonActualizoPresupuesto = document.getElementById ("actualizarpresupuesto");    

botonActualizoPresupuesto.addEventListener ("click", actualizarPresupuestoWeb);

//Manejadora de eventos para el botón 'Añadir gasto'
function nuevoGastoWeb () {
    let descripcionGasto = prompt ("Descripción del gasto");
    let valorGasto = parseFloat(prompt ("Valor del gasto"));
    let fechaGasto = prompt ("Fecha del gasto (formato 'yyyy-mm-dd'");
    let etiquetasGasto =  prompt ("Etiquetas (separadas por ,");

    //Separo el string de etiquetas por , y lo meto en un arrayEtiquetasGasto
    let arrayEtiquetasGasto = etiquetasGasto.split(",");

    //El array arrayEtiquetasGasto es de tipo rest, por eso pongo los ..., para que meta cada elemento del array como un parámetro
    let gastoAnyadir = new gesPresupuesto.CrearGasto (descripcionGasto, valorGasto, fechaGasto, ...arrayEtiquetasGasto);
        
    gesPresupuesto.anyadirGasto (gastoAnyadir);

    repintar();

}

//Manejadora de eventos para el botón 'Añadir gasto'
function nuevoGastoWebFormulario (event) {
    //Clono la plantilla
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

    //Obtengo el formulario (sólo hayt uno)
    let formulario = plantillaFormulario.querySelector("form");

    //Obtengo 'controlesprincipales', donde añadiré el formulario
    let controlesPrincipales = document.getElementById("controlesprincipales");

    //Añado el formulario a 'controlesprincipales'
    controlesPrincipales.append (formulario);

    //Inhabilito el botón 'anyadirgasto-formulario' para no ir abriendo un formulario tras otro indefinidamente
    let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
    botonAnyadirGastoFormulario.disabled = true;
    
    //Asocio el submit (click en el botóin 'Enviar' o pulsar 'Enter') del formulario a la función manejadora 'cargarNuevoGasto'
    formulario.addEventListener ("submit", cargarNuevoGastoFormulario);

    //Asocio el botón 'Cancelar'a la función manejadora 'CancelarNuevoGastoFormulario'
    let botonCancelar = formulario.querySelector (".cancelar");
    let accionCancelar = new CancelarNuevoGastoFormulario();
    //Asigno como propiedad el evento que abre el formulario asociado al boton 'anyadirgasto-formulario'
    //me será útil para poder reactivar dicho botón
    accionCancelar.botonActivar = event;
    botonCancelar.addEventListener ("click", accionCancelar);


    let botonEnviarAPI = formulario.querySelector(".gasto-enviar-api");
    let accionEnviarAPI = new enviarGastosApi();
    botonEnviarAPI.addEventListener ("click", accionEnviarAPI);
}


function cargarNuevoGastoFormulario(event) {
    event.preventDefault();
    let descripcionGasto = event.currentTarget.querySelector("#descripcion").value;
    let valorGasto = event.currentTarget.querySelector("#valor").value;
    let fechaGasto = event.currentTarget.querySelector("#fecha").value;    
    let etiquetasGasto = event.currentTarget.querySelector("#etiquetas").value.split(",");
    
    let gastoAnyadir = new gesPresupuesto.CrearGasto (descripcionGasto, valorGasto, fechaGasto, ...etiquetasGasto);
    gesPresupuesto.anyadirGasto (gastoAnyadir);
    event.currentTarget.remove();
    document.getElementById ("anyadirgasto-formulario").disabled = false;
    repintar();
}

function filtrarGastosWeb (event) {
    event.preventDefault();
    
    //Asigno el formulario para filtrar a la variable 'formulario'
    let formulario = event.currentTarget;

    //Genero el objeto filtro asignándole los valores que haya en el formulario de filtrar
    let filtro = {
        descripcionContiene : formulario.querySelector ("#formulario-filtrado-descripcion").value,
        valorMinimo : formulario.querySelector ("#formulario-filtrado-valor-minimo").value,
        valorMaximo : formulario.querySelector ("#formulario-filtrado-valor-maximo").value,
        fechaDesde : formulario.querySelector ("#formulario-filtrado-fecha-desde").value,
        fechaHasta : formulario.querySelector ("#formulario-filtrado-fecha-hasta").value,
        etiquetasTiene : gesPresupuesto.transformarListadoEtiquetas(formulario.querySelector ("#formulario-filtrado-etiquetas-tiene").value),
    }
    
    //Asigno los datos filtrados a la variable 'gastosFiltrados'
    let gastosFiltrados = gesPresupuesto.filtrarGastos (filtro);

    //Vacío el contenido de #listado-gastos-completo antes de mostrar los valores filtrados
    document.getElementById("listado-gastos-completo").innerHTML = "";

    //Recorro la variable 'gastosFiltrados' y voy mostrando cada uno de los gastos
    for (let item of gastosFiltrados) {
        mostrarGastoWeb("listado-gastos-completo", item);
    }  
}

function guardarGastosWeb (event) {
    //Obtengo los gastos
    let gastosGuardar = gesPresupuesto.listarGastos();
    
    //Convierto el array de gastos a JSON
    localStorage.GestorGastosDWEC = JSON.stringify (gastosGuardar);
}

function cargarGastosWeb (event) {
    let gastosRecuperados = localStorage.GestorGastosDWEC;

    //Si existe GestorGastosDWEC tomo el array generado; si no existe (es undefined) entonces paso un array vacío.
    if (gastosRecuperados == undefined) {
        gastosRecuperados = [];
    }
    else {
        gastosRecuperados = JSON.parse(gastosRecuperados);
    }

    //Cargo los gastos recuperados y vuelvo a pintar la pantalla con los gastos
    gesPresupuesto.cargarGastos(gastosRecuperados);
    repintar();
}
/*function cancelarCargarNuevoGastoFormulario (event) {
    document.getElementById ("anyadirgasto-formulario").disabled = false;
    let botonCan = event.target;
    console.log (botonCan);
    let accionCancelar = new CancelarNuevoGastoFormulario();
    accionCancelar.formulario = event.target.form; 
    botonCan.addEventListener ("click",accionCancelar);

}*/

//Asocio el click en el botón '#anyadirgasto-formulario' a la función manejadora 'nuevoGastoWebFormulario'
let anyadirGastoBoton = document.getElementById ("anyadirgasto-formulario");
anyadirGastoBoton.addEventListener ("click", nuevoGastoWebFormulario);

//Asocio el click en el botón '#anyadirgasto' a la función manejadora 'nuevoGastoWeb'
let botonAnyadirGasto = document.getElementById ("anyadirgasto");
botonAnyadirGasto.addEventListener ("click", nuevoGastoWeb);

//Asocio el submit que pueda realizar en '#formulario-filtrado' a la función manejadora 'filtrarGastosWeb'
let formularioFiltrado = document.getElementById ("formulario-filtrado");
formularioFiltrado.addEventListener ("submit",filtrarGastosWeb);

//Asocio el click en el botón '#guardar-gastos' a la funcion manejadora 'guardarGastosWeb'
let guardarGasto = document.getElementById ("guardar-gastos");
guardarGasto.addEventListener ("click",guardarGastosWeb);

//Asocio el click en el botón '#cargar-gastos' a la función manejadora 'cargarGastosWeb'
let cargarTodosGastos = document.getElementById ("cargar-gastos");
cargarTodosGastos.addEventListener ("click",cargarGastosWeb);

//Asocio el click en el botón '#cargar-gastos-api' a la función manejadora 'cargarGastosApi'
let cargarTodosGastosApi = document.getElementById ("cargar-gastos-api");
cargarTodosGastosApi.addEventListener ("click",CargarGastosApi);

//Asocio el botón 'Cancelar'a la función manejadora 'CancelarNuevoGastoFormulario'
/*let botonCancelar = formulario.querySelector (".cancelar");
let accionCancelar = new CancelarNuevoGastoFormulario();*/
//Asigno como propiedad el evento que abre el formulario asociado al boton 'anyadirgasto-formulario'
//me será útil para poder reactivar dicho botón
/*accionCancelar.botonActivar = event;
botonCancelar.addEventListener ("click", accionCancelar);*/


//Manejadora de eventos para editar un gasto
function EditarHandle () {
    this.handleEvent = function (event) {
        
        let nuevaDescripcion = prompt ("Escribe la nueva descripción", this.gasto.descripcion);
        let nuevoValor = parseFloat (prompt ("Escribe el nuevo valor",this.gasto.valor));
        let nuevaFecha = prompt ("Escribe la nueva fecha (yyyy-mm-dd", this.gasto.fecha);
        let nuevasEtiquetas = prompt ("Escribe las nuevas etiquetas separadas por ',' sí es más de una.", this.gasto.etiquetas);
        let arrayNuevasEtiquetas = nuevasEtiquetas.split (",");

        this.gasto.actualizarDescripcion (nuevaDescripcion);
        this.gasto.actualizarValor (nuevoValor);
        this.gasto.actualizarFecha (nuevaFecha);        
        this.gasto.anyadirEtiquetas (...arrayNuevasEtiquetas);

        repintar();
    }
}

//Manejadora de eventos para editar un gasto
function ActualizarGastoHandle () {
    this.handleEvent = function (event) {
        event.preventDefault();        
        console.log (event.currentTarget);
        this.gasto.actualizarDescripcion (event.currentTarget.descripcion.value);
        this.gasto.actualizarValor (event.currentTarget.valor.value);
        this.gasto.actualizarFecha (event.currentTarget.fecha.value); 
        let arrayEtiquetas = event.currentTarget.etiquetas.value.split (",");
        this.gasto.anyadirEtiquetas (...arrayEtiquetas);
        event.currentTarget.remove();
        repintar();        
    }
}

//Manejadora de eventos para editar un gasto
function EditarHandleFormulario () {
    this.handleEvent = function (event) {
        event.preventDefault();
        /*let mes = (fechaAux.getMonth().toString().length == 1) ? "0" + fechaAux.getMonth() : fechaAux.getMonth();
        let dia = (fechaAux.getDate().toString().length == 1) ? "0" + fechaAux.getDate() : fechaAux.getDate();*/
        let mes = (parseInt(new Date(this.gasto.fecha).getMonth() + 1) < 10) ? "0" + (parseInt(new Date(this.gasto.fecha).getMonth() + 1)).toString() : (parseInt(new Date(this.gasto.fecha).getMonth() + 1)).toString();
        let dia = (parseInt(new Date(this.gasto.fecha).getDate()) <10) ? "0" + parseInt(new Date(this.gasto.fecha).getDate()).toString() : parseInt(new Date(this.gasto.fecha).getDate()).toString();
        
        let fechaUsar = parseInt(new Date(this.gasto.fecha).getFullYear().toString()) + "-" + mes + "-" + dia;
       

        //Clono la plantilla
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);

        //Obtengo el formulario (sólo hay uno)
        let formulario = plantillaFormulario.querySelector("form");

        //Obtengo 'controlesprincipales', donde añadiré el formulario ¡¡FINALMENTE NO LO USO!!
        //let controlesPrincipales = document.getElementById("controlesprincipales");

        //Obtengo el nodo que contiene el botón y el resto de elementos del DIV gasto y es ahí donde introduzco el formulario
        let controlesPrincipales = event.target.parentNode;

        //Añado el formulario a 'controlesprincipales'
        controlesPrincipales.append (formulario);
        
        //Asigno al formulario los valores del objeto
        formulario.descripcion.value = this.gasto.descripcion;
        formulario.valor.value = this.gasto.valor;
        formulario.fecha.value = fechaUsar;
        formulario.etiquetas.value = this.gasto.etiquetas;
        
        //Inhabilito el botón 'anyadirgasto-formulario'
        event.currentTarget.disabled = true;

        //Asocio el botón 'Cancelar'a la función manejadora 'CancelarNuevoGastoFormulario'
        let botonCancelar = formulario.querySelector (".cancelar");
        let accionCancelar = new CancelarNuevoGastoFormulario();
        
        //Asigno como propiedad el evento que abre el formulario asociado al boton 'anyadirgasto-formulario'
        //me será útil para poder reactivar dicho botón
        accionCancelar.botonActivar = event;
        botonCancelar.addEventListener ("click", accionCancelar);
        
        let botonEnviarApi = formulario.querySelector (".gasto-enviar-api");
        let accionEnviarApi = new modificarGastosApi(formulario);
        
        accionEnviarApi.gasto = this.gasto;
        

        let actualizar = new ActualizarGastoHandle();
        actualizar.gasto = this.gasto;        
        
        botonEnviarApi.addEventListener ("click", accionEnviarApi);
        
        formulario.addEventListener ("submit", actualizar);
        
    }
}

function BorrarHandle () {
    this.handleEvent = function (event) {
        gesPresupuesto.borrarGasto (this.gasto.id);  
        repintar();
    }    
}

function BorrarEtiquetasHandle () {
    this.handleEvent = function (event) {
        //Busco la etiqueta por el nombre pues es lo que utilizo para luego poder borrarla
        this.gasto.borrarEtiquetas (event.target.innerHTML);
        repintar();
    }
}


function CancelarNuevoGastoFormulario () {
    this.handleEvent = function (event) {
        //Busco el boton 'anyadirgasto-formulario' partiendo de this. Previamente asigno 'event' a 'botonActivar'
        this.botonActivar.target.disabled = false;
        event.currentTarget.form.remove();
        
    }
}

function enviarGastosApi() {
    this.handleEvent = async function (event) {
        event.preventDefault();
        let nombreUsuario = document.getElementById ("nombre_usuario");
        let url1 = new URL ("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario.value);

        let descripcionGasto = document.querySelector("#descripcion").value;
        let valorGasto = document.querySelector("#valor").value;
        let fechaGasto = document.querySelector("#fecha").value;    
        let etiquetasGasto = document.querySelector("#etiquetas").value.split(",");
        let usuario = document.querySelector("#nombre_usuario").value;


        let mesString = (parseInt (new Date(fechaGasto).getMonth()) < 10) ? "0" + (parseInt(new Date(fechaGasto).getMonth()) + 1).toString() : (parseInt(new Date(fechaGasto).getMonth()) + 1).toString();
        let diaString = (parseInt (new Date(fechaGasto).getDate()) <10) ? "0" + new Date(fechaGasto).getDate() : new Date(fechaGasto).getDate();
        let fechaString = new Date(fechaGasto).getFullYear() + "-" + mesString + "-" + diaString; 

        console.log (fechaString); 

        //Monto el objeto newGasto que luego pasaré en formato JSON 
        let newGasto = {
            "valor" : valorGasto, 
            "descripcion" : descripcionGasto,
            "usuario" : usuario, 
            "fecha" : fechaString, 
            "etiquetas" : etiquetasGasto,
        }


        let respuesta = await fetch (url1, {
            //Método POST
            method: "POST",
            //Cabeceras
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            //Datos ya convertidos a JSON
            body: JSON.stringify (newGasto)
        });

        if (respuesta.ok) {
            console.log ("Gasto añadido.");
        }
        else {
            console.log ("No se ha podido añadir el gasto.")
        }
        
         CargarGastosApi();    
    }
}

//Le paso el parámetro formulario para poder acceder a los elementos del formulario
function modificarGastosApi(formulario) {
    this.handleEvent = async function (event) {
        event.preventDefault();
        let nombreUsuario = document.getElementById ("nombre_usuario");
        //Obtengo el gastoId para poder modificar
        let gastoId = this.gasto.gastoId;

        let url1 = new URL ("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario.value + "/" + gastoId);

        let descripcionGasto = formulario.descripcion.value;
        let valorGasto = formulario.valor.value;
        let fechaGasto = formulario.fecha.value;    
        let etiquetasGasto = formulario.etiquetas.value.split (",");
        let usuario = document.querySelector("#nombre_usuario").value;


        let mesString = (parseInt (new Date(fechaGasto).getMonth()) < 10) ? "0" + (parseInt(new Date(fechaGasto).getMonth()) + 1).toString() : (parseInt(new Date(fechaGasto).getMonth()) + 1).toString();
        let diaString = (parseInt (new Date(fechaGasto).getDate()) <10) ? "0" + new Date(fechaGasto).getDate() : new Date(fechaGasto).getDate();
        let fechaString = new Date(fechaGasto).getFullYear() + "-" + mesString + "-" + diaString; 

        //Monto el objeto newGasto que luego pasaré en formato JSON
        let newGasto = {
            "valor" : valorGasto, 
            "descripcion" : descripcionGasto,
            "usuario" : usuario, 
            "fecha" : fechaString, 
            "etiquetas" : etiquetasGasto,
        }


        let respuesta = await fetch (url1, {
            //Método PUT
            method: "PUT",
            //Cabeceras
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            //Datos ya convertidos a JSON
            body: JSON.stringify (newGasto)
        });

        if (respuesta.ok) {
            console.log ("Gasto modificado.");
        }
        else {
            console.log ("No se ha podido modificar el gasto.")
        }
        
         CargarGastosApi();    
    }
}

function BorrarHandleApi () {
    this.handleEvent = async function (event) {
        event.preventDefault();
        let nombreUsuario = document.getElementById ("nombre_usuario");  
        //Obtengo el gastoId para poder borrar
        let gastoId = this.gasto.gastoId;
        //let gastoId = "79c69239-3132-45d1-9021-41195fee45b8";

        let url1 = new URL ("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario.value + "/" + gastoId);
        

        let respuesta1 = await fetch (url1);

        if (respuesta1.ok) {
                let respuesta = await fetch (url1, { method: "DELETE"});
                
                if (respuesta.ok) {
                    console.log("Gasto borrado");
                }
                else {
                    console.log ("No se ha podido borrar el gastp");
                }
        }
        CargarGastosApi();
    }
}

async function CargarGastosApi () {
    
    let nombreUsuario = document.getElementById ("nombre_usuario");
    let url1 = new URL ("https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario.value);
    //let url1 = "https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/" + nombreUsuario.value;
    
    let respuesta = await fetch (url1); 
    //Si es ok la promesa de respuesta entonces guardo en datos la promesa de respuesta.json() en datos y los cargo en la web
    //si no es ok, muestro mensaje de error
    if (respuesta.ok) {
        let datos = await respuesta.json();
        gesPresupuesto.cargarGastos(datos);
        repintar();
    }
    else {
        console.log ("Error al obtener la respuesta");
    }
    repintar();

}



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}