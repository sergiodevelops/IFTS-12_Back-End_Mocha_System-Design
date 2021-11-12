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
import PrecioBicicleta from "./classes/Bicicleta/PrecioBicicleta";

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

    selectedBicicleta: IBicicleta, // para crear el pedido en caso de  haber stock
    selectedQuantity: number, // para crear el pedido en caso de haber stock
    currentStockOfThisBike: number, // para calculo stock
    currentPriceOfThisBike: number, // para calculo stock
    currentPedido: IPedido,
    currentPago: IPago,
    currentTarjeta: ITarjetaCredito | ITarjetaDebito,
    currentMontoTotal: number,
    currentDescuentoPago: IDescuentoPago,
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
selectedBicicleta = new Bicicleta(
    'marca1',
    'modelo1',
    'rodado1',
    'tipo1',
    'especialidad1',
);
selectedQuantity = 5;

// 2b) - validar stock del pedido antes de ser creado
// ---------------------------------------

// pedimos que stock disponible hay
const stockBicicleta = new StockBicicleta(selectedBicicleta);
currentStockOfThisBike = stockBicicleta.stock;

if (!!currentStockOfThisBike && selectedQuantity <= currentStockOfThisBike) {
    // recien si hay stock me traigo el precio de la bici seleccionada
    const precioBicicleta = new PrecioBicicleta(selectedBicicleta);
    currentPriceOfThisBike = precioBicicleta.precio;

    // 2c) - (SI) --> crear y añadir "pedido" a lista pedidos
    // ---------------------------------------
    currentStockOfThisBike = currentStockOfThisBike - selectedQuantity;
    currentPedido = new Pedido(selectedBicicleta, selectedQuantity, currentPrice);
    pedidos.push(currentPedido);
    const stockRestante = currentStockOfThisBike-selectedQuantity;
    stockBicicleta.stock(stockRestante);
} else {
    // 2d) - (NO) --> informar falta de stock
    // ---------------------------------------
    console.log(`No hay stock disponible para ${selectedBicicleta.marca} | ${selectedBicicleta.modelo} | ${selectedBicicleta.especialidad}, vuelva a intentar con otro producto o cantidad diferente`);
}

// ----------------------------------------------------------------------------
// 3] Pago:
// ----------------------------------------------------------------------------

// cargar datos de forma de pago
// ---------------------------------------

// PAGO EFECTIVO
currentPago = new Pago('tarjeta')
// PAGO DEBITO
currentTarjeta = new TarjetaDebito('4652 2564 8999 8644')
currentPago = new Pago('tarjeta', currentTarjeta)
// PAGO CREDITO
currentTarjeta = new TarjetaCredito('4652 2564 8999 8644', '05/24')
currentPago = new Pago('tarjeta', currentTarjeta)

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
        currentDescuentoPago = new DescuentoPago(pedidos,currentCustomerType, currentPago.formaDePago); //100*0.25
        currentMontoTotal = currentDescuentoPago.getTotalWithDiscount();
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
