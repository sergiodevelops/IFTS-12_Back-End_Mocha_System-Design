import ClienteComun from "./classes/ClienteComun";
import ClienteFederado from "./classes/ClienteFederado";
import IPedido from "./interfaces/IPedido";
import Bicicleta from "./classes/Bicicleta";
import IBicicleta from "./interfaces/IBicicleta";
import Pedido from "./classes/Pedido";
import IDireccion from "./interfaces/IDireccion";
import Direccion from "./classes/Direccion";
import StockBicicleta from "./classes/StockBicicleta";
import IStockBicicleta from "./interfaces/IStockBicicleta";
import Pago from "./classes/Pago";
import Descuento from "./classes/Descuento";
import IClienteComun from "./interfaces/IClienteComun";
import IClienteFederado from "./interfaces/IClienteFederado";
import IPago from "./interfaces/IPago";
import IDescuento from "./interfaces/IDescuento";
import ITarjeta from "./interfaces/ITarjeta";
import Tarjeta from "./classes/Tarjeta";

class App {
}

console.log("armando el flujo e interacción entre clases");

let pedidos: IPedido[] = [],
    currentDir: IDireccion, // para poder crear el cliente comun
    currentClient: IClienteComun | IClienteFederado, // para almacenar cliente
    currentClientType: string, // para almacenar cliente
    // comun

    bicicletaDeseada: IBicicleta, // para poder crear el pedido en caso de
                                  // haber stock
    cantidadDeseada: number, // para poder crear el pedido en caso de haber
                             // stock
    currentStockBici: IStockBicicleta, // para calculo stock
    currentPedido: IPedido,
    currentDatosPago: IPago,
    currentTarjeta: ITarjeta,
    currentMontoTotal: IDescuento;

// ----------------------------------------------------------------------------
// 1a - crear nuevo "cliente comun" //registra cliente comun
// ----------------------------------------------------------------------------

currentDir = new Direccion('Estrada', 2240, 'Centenario', 'Pergamino');
console.log('crear "currentDir" (para cliente comun) de tipo', currentDir.constructor.name)
currentClient = new ClienteComun(
    'nombre1',
    'ape1',
    'tipo1',
    '08/02/1990',
    34572323,

    currentDir);
console.log('crear "currentClientCom" de tipo', currentClient.constructor.name)

// ----------------------------------------------------------------------------
// 1b - crear nuevo "cliente federado" //registra cliente federado
// ----------------------------------------------------------------------------

currentClient = new ClienteFederado(
    'nombre2',
    'ape2',
    'tipo2',
    '08/02/1990',
    34572323,

    18253,
    'Capos del rocket');
console.log('crear "currentClientFede" de tipo', currentClient.constructor.name)

// asignamos cliente que vamos a probar
currentClientType = currentClient.constructor.name;
// currentClient = currentClientFede;

// ----------------------------------------------------------------------------
// 2a - cargar producto y cantidad deseada //edición pedido 1
// ----------------------------------------------------------------------------

bicicletaDeseada = new Bicicleta(
    'marca1',
    'modelo1',
    'rodado1',
    'tipo1',
    'especialidad1');
console.log('crear "currentBici" de tipo', bicicletaDeseada.constructor.name)
cantidadDeseada = 5;

// ----------------------------------------------------------------------------
// 2b - validar si "hay stock" //validación pedido 1
// ----------------------------------------------------------------------------

currentStockBici = new StockBicicleta(bicicletaDeseada, cantidadDeseada);
console.log('crear "currentStockBici" de tipo', currentStockBici.constructor.name)
if (currentStockBici.stock > 0 && cantidadDeseada <= currentStockBici.stock) {

    // --------------------------------------
    // 3a - crear nuevo "pedido" //creación de pedido
    // --------------------------------------

    currentPedido = new Pedido(bicicletaDeseada, 5);

    // --------------------------------------
    // 3b - añadir nuevo "pedido" a la "compra en proceso" (lista pedidos)
    // //adición de pedido --------------------------------------

    pedidos.push(currentPedido);
} else {

    // --------------------------------------
    // 3c - informar si no hay stock disponible para la cantidad solicitada
    // //rechazo de pedido --------------------------------------

    console.log(`No hay stock disponible para ${bicicletaDeseada.marca} | ${bicicletaDeseada.modelo} | ${bicicletaDeseada.especialidad}, vuelva a intentar con otro producto o cantidad diferente`);
}

// ----------------------------------------------------------------------------
// 3 - cargar datos de forma de pago // creación de pago
// ----------------------------------------------------------------------------
currentDatosPago = new Pago('efectivo', undefined)

currentTarjeta = new Tarjeta('debito','4652 2564 8999 8644','05/25')
currentDatosPago = new Pago('tarjeta', undefined)

// ----------------------------------------------------------------------------
// 4a - calcular "subtotal con descuento" filtrando por "especialidad
// competición && pago efectivo"
// ----------------------------------------------------------------------------
currentMontoTotal = new Descuento(currentClientType, currentDatosPago.metodoPago,pedidos);
//si hay algun cambio se debe actualizar el monto total por ende
// let updateOk = currentMontoTotal.update(currentClientType, currentDatosPago.metodoPago)
// currentMontoTotal = currentMontoTotal.update(currentClientType, currentDatosPago.metodoPago,pedidos)

// ----------------------------------------------------------------------------
// 4a - calcular "subtotal con descuento" filtrando por "especialidad
// competición && pago efectivo"
// ----------------------------------------------------------------------------
let subTotalPedidos;

// ----------------------------------------------------------------------------
// 4b - calcular "subtotal con descuento" filtrando por "especialidad sport"
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// 4c - calcular "subtotal sin descuento" filtrando por "restante"
// ----------------------------------------------------------------------------


export default new App();
