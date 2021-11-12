import ClienteComun from "./classes/Cliente/ClienteComun";
import ClienteFederado from "./classes/Cliente/ClienteFederado";
import IPedido from "./interfaces/ICompra/IPedido";
import Bicicleta from "./classes/Bicicleta/Bicicleta";
import IBicicleta from "./interfaces/IBicicleta/IBicicleta";
import Pedido from "./classes/Compra/Pedido";
import IDireccionEnvio from "./interfaces/ICompra/IDireccionEnvio";
import DireccionEnvio from "./classes/Cliente/DireccionEnvio";
import StockBicicleta from "./classes/Bicicleta/StockBicicleta";
import IStockBicicleta from "./interfaces/IBicicleta/IStockBicicleta";
import Pago from "./classes/Pago/Pago";
import DescuentoPago from "./classes/Pago/DescuentoPago";
import IClienteComun from "./interfaces/ICliente/IClienteComun";
import IClienteFederado from "./interfaces/ICliente/IClienteFederado";
import IPago from "./interfaces/IPago/IPago";
import IDescuentoPago from "./interfaces/IPago/IDescuentoPago";
import TarjetaDebito from "./classes/Pago/TarjetaPago/TarjetaDebito";
import ITarjetaCredito from "./interfaces/IPago/ITarjetaPago/ITarjetaCredito";
import ITarjetaDebito from "./interfaces/IPago/ITarjetaPago/ITarjetaDebito";
import TarjetaCredito from "./classes/Pago/TarjetaPago/TarjetaCredito";
import Compra from "./classes/Compra/Compra";

// import {direccionesMock} from "./constants/cliente/direccionesMock";

class App {
}

console.log("armando el flujo e interacción entre clases");

let pedidos: IPedido[] = [],
    //
    currentDir: IDireccionEnvio,
    currentCustomer: IClienteComun | IClienteFederado,
    currentCustomerType: string,
    // comun

    selectedBike: IBicicleta, // para crear el pedido en caso de  haber stock
    selectedQuantity: number, // para crear el pedido en caso de haber stock
    currentStockOfThisBike: number, // para calculo stock
    currentOrder: IPedido,
    currentPaymentDetails: IPago,
    currentCardData: ITarjetaCredito | ITarjetaDebito,
    currentMontoTotal: number,
    currentDescuento: IDescuentoPago,
    currentTotalAmountToPay: number;

// ----------------------------------------------------------------------------
// 1] Cliente:
// ----------------------------------------------------------------------------

// 1a) - crear nuevo "cliente comun"
// ---------------------------------------
// carga una direccion
currentDir = new DireccionEnvio('Pergamino', 'Centenario', 'Estrada', 2249, 'PB', '4');

currentCustomer = new ClienteComun(
    'nombre1',
    'ape1',
    'tipo1',
    '08/02/1990',
    34572323,
    currentDir
);

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
selectedBike = new Bicicleta(
    'marca1',
    'modelo1',
    'rodado1',
    'tipo1',
    'especialidad1',
);
selectedQuantity = 5;

// 2b) - validar stock del pedido antes de ser creado
// ---------------------------------------
currentStockOfThisBike = new StockBicicleta(selectedBike).getCurrentStock();

if (currentStockOfThisBike > 0 &&
    selectedQuantity <= currentStockOfThisBike) {

    // 2c) - (SI) --> crear y añadir "pedido" a lista pedidos
    // ---------------------------------------
    currentStockOfThisBike = currentStockOfThisBike - selectedQuantity;
    // currentPrice = new PrecioBicicleta
    currentOrder = new Pedido(selectedBike, 5);
    pedidos.push(currentOrder);
} else {
    // 2d) - (NO) --> informar falta de stock
    // ---------------------------------------
    console.log(`No hay stock disponible para ${selectedBike.marca} | ${selectedBike.modelo} | ${selectedBike.especialidad}, vuelva a intentar con otro producto o cantidad diferente`);
}

// ----------------------------------------------------------------------------
// 3] Pago:
// ----------------------------------------------------------------------------

// cargar datos de forma de pago
// ---------------------------------------

// PAGO EFECTIVO
currentPaymentDetails = new Pago('tarjeta')
// PAGO DEBITO
currentCardData = new TarjetaDebito('4652 2564 8999 8644')
currentPaymentDetails = new Pago('tarjeta', currentCardData)
// PAGO CREDITO
currentCardData = new TarjetaCredito('4652 2564 8999 8644', '05/24')
currentPaymentDetails = new Pago('tarjeta', currentCardData)

// ----------------------------------------------------------------------------
// 4] DescuentoPago segun "cliente, especialidad bici y forma pago"
// ----------------------------------------------------------------------------

// calcular "total a pagar"
// ---------------------------------------
currentCustomerType = currentCustomer.constructor.name;
console.log('currentCustomerType', currentCustomerType);

switch (currentCustomerType) {
    case('ClienteFederado'):
        console.log(`El tipo de cliente es ${currentCustomerType} por tanto se procesara descuento si aplica`)
        currentDescuento = new DescuentoPago(pedidos,currentCustomerType, currentPaymentDetails.formaDePago); //100*0.25
        currentMontoTotal = currentDescuento.getTotalWithDiscount();
            // currentTotalAmountToPay - currentDescuento;//100-(100*0.25)
        break;
    case('ClienteComun'):
        break;
    default:
        console.error(`tipo de cliente actual ${currentCustomerType} no es válido`);
}

// ----------------------------------------------------------------------------
// 5] Compra:
// ----------------------------------------------------------------------------
// const compra = new Compra(current)
// procesar la compra pasando los "datos de compra"
// ---------------------------------------


export default new App();
