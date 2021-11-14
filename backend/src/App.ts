import ClienteComun from "./classes/Cliente/ClienteComun";
import ClienteFederado from "./classes/Cliente/ClienteFederado";
import IPedido from "./interfaces/ICompra/IPedido";
import IBicicleta from "./interfaces/IBicicleta/IBicicleta";
import Pedido from "./classes/Compra/Pedido";
import DireccionEnvio from "./classes/Cliente/DireccionEnvio";
import StockBicicleta from "./classes/Bicicleta/StockBicicleta";
import DatosPago from "./classes/Pago/DatosPago";
import CalculoMontoTotal from "./classes/Pago/CalculoMontoTotal";
import IClienteComun from "./interfaces/ICliente/IClienteComun";
import IClienteFederado from "./interfaces/ICliente/IClienteFederado";
import IDatosPago from "./interfaces/IPago/IDatosPago";
import DatosTarjetaDebito from "./classes/Pago/TarjetaPago/DatosTarjetaDebito";
import IDatosTarjetaCredito
    from "./interfaces/IPago/ITarjetaPago/IDatosTarjetaCredito";
import IDatosTarjetaDebito
    from "./interfaces/IPago/ITarjetaPago/IDatosTarjetaDebito";
import DatosTarjetaCredito
    from "./classes/Pago/TarjetaPago/DatosTarjetaCredito";
import {bicicletasMock} from "./constants/bicicleta/bicicletasMock";
import {clientesFederadosMock} from "./constants/cliente/clientesFederadosMock";
import {clientesComunesMock} from "./constants/cliente/clientesComunesMock";
import {direccionesMock} from "./constants/cliente/direccionesMock";
import {tarjetasDebitoMock} from "./constants/pago/tarjetasDebitoMock";
import {tarjetasCreditoMock} from "./constants/pago/tarjetasCreditoMock";
import IStockBicicleta from "./interfaces/IBicicleta/IStockBicicleta";
import {formasDePagoEnum} from "./constants/pago/formasDePagoEnum";

let pedidos: IPedido[] = [],
    cliente: IClienteComun | IClienteFederado,
    tarjeta: IDatosTarjetaDebito | IDatosTarjetaCredito | boolean,
    formaDePago: string,
    datosPago: IDatosPago,
    stockBicicleta: IStockBicicleta;

console.log(`
*****************
 INICIANDO BACKEND 
"node && typescript"
*****************`);

console.log(`
*******************************
CREAR CLIENTES
*******************************`);

export function crearClienteComun() {
    const clienteComunMock = clientesComunesMock[0];
    const direccionEnvioMock = direccionesMock[0]; // opciones 0 a 3
    return new ClienteComun(
        clienteComunMock.nombre,
        clienteComunMock.apellido,
        clienteComunMock.dni,
        clienteComunMock.fechaNacimiento,
        new DireccionEnvio(
            direccionEnvioMock.ciudad,
            direccionEnvioMock.barrio,
            direccionEnvioMock.calle,
            direccionEnvioMock.altura,
            direccionEnvioMock.piso,
            direccionEnvioMock.departamento,
        ),
    );
}
export function crearClienteFederado() {
    const clienteFederadoMock = clientesFederadosMock[0]; // opciones 0 a 3
    return new ClienteFederado(
        clienteFederadoMock.nombre,
        clienteFederadoMock.apellido,
        clienteFederadoMock.dni,
        clienteFederadoMock.fechaNacimiento,
        clienteFederadoMock.matricula,
        clienteFederadoMock.agrupacion,
    );
}

// crear clientes
const clienteComun = crearClienteComun();
const clienteFederado = crearClienteFederado();

cliente = clienteFederado;
cliente = clienteComun;

console.log(`Tipo: ${cliente.constructor.name}`);
console.log(Object.entries(cliente))

console.log(`
*******************************
DEFINIR DATOS DE PAGO
*******************************`);

export function crearTarjetaDebito() {
    const tarjetaDebitoMock = tarjetasDebitoMock[0];
    return new DatosTarjetaDebito(
        tarjetaDebitoMock.numeroTarjeta,
    );
}
export function crearTarjetaCredito() {
    const tarjetaCreditoMock = tarjetasCreditoMock[0];
    return new DatosTarjetaCredito(
        tarjetaCreditoMock.numeroTarjeta,
        tarjetaCreditoMock.fechaVencimiento,
    );
}

// crear tarjetas
const tarjetaDebito = crearTarjetaDebito();
const tarjetaCredito = crearTarjetaCredito();

export function crearDatosPago() {
    formaDePago = formasDePagoEnum.EFECTIVO;
    formaDePago = formasDePagoEnum.DEBITO;
    formaDePago = formasDePagoEnum.CREDITO;
    tarjeta = tarjetaDebito;
    tarjeta = tarjetaCredito;
    tarjeta = false;

    return new DatosPago(
        formaDePago,
        tarjeta,
    );
}

// crear datos de pago
datosPago = crearDatosPago();

console.log(`Tipo: ${datosPago.formaDePago}`);
console.log(Object.entries(datosPago))

console.log(`
*******************************
Pedidos: SUBTOTALES con y sin descuentos
*******************************`);

const validacionPedido = (bici: IBicicleta, cantidad: number) => {
    stockBicicleta = new StockBicicleta(bici);
    return (stockBicicleta.stock > 0 &&
        stockBicicleta.stock >= cantidad &&
        bici.precio);
}
const bici1 = bicicletasMock[0]; // opciones 0 a 3
const cantidadBici1 = 1;
validacionPedido(bici1, cantidadBici1) &&
pedidos.push(new Pedido(cliente, datosPago, bici1, cantidadBici1));
const bici2 = bicicletasMock[1]; // opciones 0 a 3
const cantidadBici2 = 1;
validacionPedido(bici2, cantidadBici2) &&
pedidos.push(new Pedido(cliente, datosPago, bici2, cantidadBici2));
const bici3 = bicicletasMock[2]; // opciones 0 a 3
const cantidadBici3 = 1;
validacionPedido(bici3, cantidadBici3) &&
pedidos.push(new Pedido(cliente, datosPago, bici3, cantidadBici3));
const bici4 = bici3;
const cantidadBici4 = cantidadBici3;
validacionPedido(bici4, cantidadBici4) &&
pedidos.push(new Pedido(cliente, datosPago, bici4, cantidadBici4));

let totalCompra = 0;
let totalCompraConDescuento = 0;
pedidos.forEach((pedido: IPedido, index: number) => {
    const calculoMontoTotal = new CalculoMontoTotal(pedido)
    const totPedido = calculoMontoTotal.procesar();
    totalCompra += totPedido;
    const totPedidoConDescuento = calculoMontoTotal.procesarConDescuento();
    totalCompraConDescuento += totPedidoConDescuento;
    console.log(
`Pedido ${index + 1}: 
Bici "${pedido.bicicleta.especialidad}" | Cantidad "${pedido.cantidad}"
Total pedido = ${totPedido}`);
console.log(totPedidoConDescuento ? `Total pedido CON DESCUENTO! = ${totPedidoConDescuento}`:'')
});

console.log(`
*******************************
Compra: TOTAL con y sin descuento
*******************************`);

console.log(`Total compra sin descuento = ${totalCompra}`);
totalCompraConDescuento && console.log(`Total compra CON DESCUENTO! = ${totalCompraConDescuento}`);

class App {
}

export default new App();
