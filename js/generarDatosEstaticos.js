"use strict";

//Importo módulos
import * as gesGastosWeb from "./gestionPresupuestoWeb.js";
import * as gesGastos from "./gestionPresupuesto.js";

//Actualizo presupuesto a 1500
gesGastos.actualizarPresupuesto (1500);

//Muestro presupuesto en el id 'presupuesto'
gesGastosWeb.mostrarDatoEnId ("presupuesto",gesGastos.mostrarPresupuesto());

//Creo nuevos gastos
let gasto1 = new gesGastos.CrearGasto ("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesGastos.CrearGasto ("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesGastos.CrearGasto ("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesGastos.CrearGasto ("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesGastos.CrearGasto ("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesGastos.CrearGasto ("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//Añado los gastos
gesGastos.anyadirGasto (gasto1);
gesGastos.anyadirGasto (gasto2);
gesGastos.anyadirGasto (gasto3);
gesGastos.anyadirGasto (gasto4);
gesGastos.anyadirGasto (gasto5);
gesGastos.anyadirGasto (gasto6);

//Muestro los gastos totales en div#gastos-totales
gesGastosWeb.mostrarDatoEnId ("gastos-totales",gesGastos.calcularTotalGastos());

//Muestro el balance total en div#balance-total
gesGastosWeb.mostrarDatoEnId ("balance-total",gesGastos.calcularBalance());

//Muestro el listado completo de gastos en div#listado-gastos-completo
gesGastosWeb.mostrarGastoWeb("listado-gastos-completo", gasto1);
gesGastosWeb.mostrarGastoWeb("listado-gastos-completo", gasto2);
gesGastosWeb.mostrarGastoWeb("listado-gastos-completo", gasto3);
gesGastosWeb.mostrarGastoWeb("listado-gastos-completo", gasto4);
gesGastosWeb.mostrarGastoWeb("listado-gastos-completo", gasto5);
gesGastosWeb.mostrarGastoWeb("listado-gastos-completo", gasto6);

//Muestro el listado de gastos realizados en septiembre de 2021 en div#listado-gastos-filtrado-1

//Filtro los gastos desde septiembre 2021
let gastosDesdeSeptiembre = gesGastos.filtrarGastos ({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});

//Muestro todos los gastos desde septiembre de 2021
for (let item of gastosDesdeSeptiembre) {
    gesGastosWeb.mostrarGastoWeb ("listado-gastos-filtrado-1", item);
}


//Muestro el listado de gastos de más de 50€ en div#listado-gastos-filtrado-2

//Filtro los gastos mayores a 50
let gastosMas50 = gesGastos.filtrarGastos({valorMinimo: 50});

//Muestro los gastos superiores a 50
for (let item of gastosMas50) {
    gesGastosWeb.mostrarGastoWeb ("listado-gastos-filtrado-2", item);
}

//Mostrar el listado de gastos de más de 200€ con etiqueta seguros en div#listado-gastos-filtrado-3

//Filtro gastos mayores a 200 y con etiqueta seguros
let gastosMas200EtiquetaSeguros = gesGastos.filtrarGastos ({valorMinimo: 200, etiquetasTiene: ["seguros"]});

//Muestro los gastos mayores a 200 y con etiqueta seguros
for (let item of gastosMas200EtiquetaSeguros) {
    gesGastosWeb.mostrarGastoWeb ("listado-gastos-filtrado-3",item);
}

//Mostrar el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€ en div#listado-gastos-filtrado-4

//Filtro el listado de gastos que tengan las etiquetas comida o transporte de menos de 50€
let gastosMenos50EtiquetaComidaTransporte = gesGastos.filtrarGastos ({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]});

//Muestro listado de gastos que tengan las etiquetas comida o transporte de menos de 50€
for (let item of gastosMenos50EtiquetaComidaTransporte) {
    gesGastosWeb.mostrarGastoWeb ("listado-gastos-filtrado-4", item);
}

//Muestro el total de gastos agrupados por día en div#agrupacion-dia

//Filtro el total de gastos agrupados por día, mes y año respectivamente
let gastosAgrupadosDia = gesGastos.agruparGastos ("dia");
let gastosAgrupadosMes = gesGastos.agruparGastos ("mes");
let gastosAgrupadosAnyo = gesGastos.agruparGastos ("anyo");

//Muestro el total de gastos agrupados por día, mes y año respectivamente
gesGastosWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gastosAgrupadosDia,"día");
gesGastosWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gastosAgrupadosMes,"mes");
gesGastosWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastosAgrupadosAnyo,"año");