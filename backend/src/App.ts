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
    currentCustomer: IClienteComun | IClienteFederado, // para almacenar cliente
    currentCustomerType: string, // para almacenar cliente
    // comun

    desiredBike: IBicicleta, // para crear el pedido en caso de  haber stock
    desiredQuantity: number, // para crear el pedido en caso de haber stock
    currentStockOfThisBike: IStockBicicleta, // para calculo stock
    currentOrder: IPedido,
    currentPaymentDetails: IPago,
    currentCardData: ITarjeta,
    currentCalculoMontoTotal: IDescuento,
    currentTotalAmountToPay: number;

// ----------------------------------------------------------------------------
// 1] Cliente:
// ----------------------------------------------------------------------------

// 1a) - crear nuevo "cliente comun"
// ---------------------------------------
currentDir = new Direccion('Estrada', 2240, 'Centenario', 'Pergamino');
currentCustomer = new ClienteComun(
    'nombre1',
    'ape1',
    'tipo1',
    '08/02/1990',
    34572323,

    currentDir);

// 1b) - crear nuevo "cliente federado"
// ---------------------------------------
currentCustomer = new ClienteFederado(
    'nombre2',
    'ape2',
    'tipo2',
    '08/02/1990',
    34572323,

    18253,
    'Capos del rocket');

// ----------------------------------------------------------------------------
// 2] Pedido y validación Stock:
// ----------------------------------------------------------------------------

// 2a) - establecer pedido (producto y cantidad deseada)
// ---------------------------------------
desiredBike = new Bicicleta(
    'marca1',
    'modelo1',
    'rodado1',
    'tipo1',
    'especialidad1');
desiredQuantity = 5;

// 2b) - validar stock del pedido antes de ser creado
// ---------------------------------------
currentStockOfThisBike = new StockBicicleta(desiredBike, desiredQuantity);
if (currentStockOfThisBike.stock > 0 &&
    desiredQuantity <= currentStockOfThisBike.stock) {

    // 2c) - (SI) --> crear y añadir "pedido" a lista pedidos
    // ---------------------------------------
    currentStockOfThisBike.stock = currentStockOfThisBike.stock - desiredQuantity;
    currentOrder = new Pedido(desiredBike, 5);
    pedidos.push(currentOrder);
} else {
    // 2d) - (NO) --> informar falta de stock
    // ---------------------------------------
    console.log(`No hay stock disponible para ${desiredBike.marca} | ${desiredBike.modelo} | ${desiredBike.especialidad}, vuelva a intentar con otro producto o cantidad diferente`);
}

// ----------------------------------------------------------------------------
// 3] Pago:
// ----------------------------------------------------------------------------

// cargar datos de forma de pago
// ---------------------------------------
currentPaymentDetails = new Pago('efectivo', undefined)
currentCardData = new Tarjeta('debito', '4652 2564 8999 8644', '05/25')
currentPaymentDetails = new Pago('tarjeta', undefined)

// ----------------------------------------------------------------------------
// 4] Descuento segun "tipo cliente, especialidad, formaDePago pago"
// ----------------------------------------------------------------------------

// calcular "total a pagar"
// ---------------------------------------
currentCustomerType = currentCustomer.constructor.name;
console.log('currentCustomerType',currentCustomerType);

if(currentCustomerType === 'ClienteFederado'){
    console.log(`El tipo de cliente es ${currentCustomerType} por tanto se procesara descuento si aplica`)
    currentCalculoMontoTotal = new Descuento();
    currentTotalAmountToPay = currentCalculoMontoTotal.getDiscount(pedidos, currentPaymentDetails.formaDePago);
}

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
