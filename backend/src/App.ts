import ClienteComun from "./classes/Cliente/ClienteComun";
import ClienteFederado from "./classes/Cliente/ClienteFederado";
import IPedido from "./interfaces/ICompra/IPedido";
import Bicicleta from "./classes/Bicicleta/Bicicleta";
import IBicicleta from "./interfaces/IBicicleta/IBicicleta";
import Pedido from "./classes/Compra/Pedido";
import IDireccionEnvio from "./interfaces/ICompra/IDireccionEnvio";
import DireccionEnvio from "./classes/Cliente/DireccionEnvio";
import StockBicicleta from "./classes/Bicicleta/StockBicicleta";
import DatosPago from "./classes/Pago/DatosPago";
import CalculoMontoTotal from "./classes/Pago/CalculoMontoTotal";
import IClienteComun from "./interfaces/ICliente/IClienteComun";
import IClienteFederado from "./interfaces/ICliente/IClienteFederado";
import IDatosPago from "./interfaces/IPago/IDatosPago";
import IUnificadorPedidos from "./interfaces/IPago/IUnificadorPedidos";
import DatosTarjetaDebito from "./classes/Pago/TarjetaPago/DatosTarjetaDebito";
import IDatosTarjetaCredito from "./interfaces/IPago/ITarjetaPago/IDatosTarjetaCredito";
import IDatosTarjetaDebito from "./interfaces/IPago/ITarjetaPago/IDatosTarjetaDebito";
import DatosTarjetaCredito from "./classes/Pago/TarjetaPago/DatosTarjetaCredito";
import {formasDePagoEnum} from "./constants/pago/formasDePagoEnum";
import UnificadorPedidos from "./classes/Pago/UnificadorPedidos";
import {bicicletasMock} from "./constants/bicicleta/bicicletasMock";
import {especialidadesEnum} from "./constants/bicicleta/especialidadesEnum";

// import {direccionesMock} from "./constants/cliente/direccionesMock";

class App {
}

console.log("INICIANDO PRUEBA");

let pedidos: IPedido[] = [],
    direccionEnvio: IDireccionEnvio,
    cliente: IClienteComun | IClienteFederado,
    bicicletaPedida: IBicicleta,
    cantidadPedida: number,
    datosPago: IDatosPago,
    datosTarjeta: IDatosTarjetaCredito | IDatosTarjetaDebito,
    currentMontoTotal: number,
    currentDescuentoPago: IUnificadorPedidos;


// ----------------------------------------------------------------------------
// 1] Cliente:
// ----------------------------------------------------------------------------
// 1a) - crear nuevo "cliente comun"
// ---------------------------------------
// carga una direccion
direccionEnvio = new DireccionEnvio('Pergamino', 'Centenario', 'Estrada', 2249, 'PB', '4');

cliente = new ClienteComun(
    'nombre1',
    'ape1',
    'tipo1',
    '08/02/1990',
    34572323,
    direccionEnvio,
);

// 1b) - crear nuevo "cliente federado"
// ---------------------------------------
cliente = new ClienteFederado(
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
// const bici1 = bicicletasMock[0];
bicicletaPedida = new Bicicleta(
    'Marca 1',
    'Modelo 1',
    'rodado1',
    'tipo1',
    especialidadesEnum.COMPETICION,
);
cantidadPedida = 5;

// 2b) - validar stock del pedido antes de ser creado
// ---------------------------------------
// pedimos la cantidad de stock disponible para esta bicicleta deseada
const stockBicicleta = new StockBicicleta(bicicletaPedida);
if (stockBicicleta.stock > 0 && cantidadPedida <= stockBicicleta.stock) {
    // 2c) - (SI) --> crear y añadir "pedido" a lista pedidos
    // ---------------------------------------
    const pedido = new Pedido(bicicletaPedida, cantidadPedida);
    pedidos.push(pedido);
    stockBicicleta.stock = stockBicicleta.stock - cantidadPedida;
    console.log(`pedidos = ${pedidos}, fueron cargados con exito`);
} else {
    // 2d) - (NO) --> informar falta de stock
    // ---------------------------------------
    console.log(`No hay stock disponible para ${bicicletaPedida.marca} | ${bicicletaPedida.modelo} | ${bicicletaPedida.especialidad}, vuelva a intentar con otro producto o cantidad diferente`);
}


// ----------------------------------------------------------------------------
// 3] DatosPago:
// ----------------------------------------------------------------------------
// cargar datos de forma de pago
// ---------------------------------------
// PAGO EFECTIVO
datosPago = new DatosPago(formasDePagoEnum.EFECTIVO)
// PAGO DEBITO
datosTarjeta = new DatosTarjetaDebito('4652 2564 8999 8644')
datosPago = new DatosPago(formasDePagoEnum.DEBITO, datosTarjeta)
// PAGO CREDITO
datosTarjeta = new DatosTarjetaCredito('1164 2247 4678 2784', '05/24')
datosPago = new DatosPago(formasDePagoEnum.CREDITO, datosTarjeta)

// ----------------------------------------------------------------------------
// 4] Obtener subtotales con descuento si aplica
// ----------------------------------------------------------------------------
// calcular "subtotal sin descuento por cada especialidad de bicicleta"
// ---------------------------------------
// const gruposPorEspecialidad = new UnificadorPedidos(pedidos).getGroupList();
const totalConDescuento = new CalculoMontoTotal(
    cliente.constructor.name, //tipo de cliente
    datosPago.formaDePago, // forma de pago
    bicicletaPedida.especialidad, // especialidad de bici
    pedidos, //pedidos seleccionados
).procesar();

// ----------------------------------------------------------------------------
// 4] CalculoMontoTotal segun "cliente, especialidad bici y forma pago"
// ----------------------------------------------------------------------------
// calcular "total a pagar"
// ---------------------------------------
const currentCustomerType = cliente.constructor.name;
switch (currentCustomerType) {
    case('ClienteFederado'):
        console.log(`El tipo de cliente es ${currentCustomerType} por tanto se procesara un descuento segun condiciones`)
        // currentDescuentoPago = new CalculoMontoTotal(pedidos,currentCustomerType, datosPago.formaDePago); //100*0.25
        // currentMontoTotal = currentDescuentoPago.getGroupList();
            // currentTotalAmountToPay - currentDescuento;//100-(100*0.25)
        break;
    case('ClienteComun'):
        console.log(`El tipo de cliente es ${currentCustomerType} por tanto no se procesara descuento`)
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
