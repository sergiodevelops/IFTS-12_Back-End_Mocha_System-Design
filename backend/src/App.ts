import ClienteComun from "./classes/ClienteComun";
import ClienteFederado from "./classes/ClienteFederado";
import IPedido from "./interfaces/IPedido";
import IBicicleta from "./interfaces/IBicicleta";
import Pedido from "./classes/Pedido";
import DireccionEnvio from "./classes/DireccionEnvio";
import StockBicicleta from "./classes/StockBicicleta";
import DatosPago from "./classes/DatosPago";
import CalculoMontoTotal from "./classes/CalculoMontoTotal";
import IClienteComun from "./interfaces/IClienteComun";
import IClienteFederado from "./interfaces/IClienteFederado";
import IDatosPago from "./interfaces/IDatosPago";
import TarjetaDebito from "./classes/TarjetaDebito";
import ITarjetaCredito
    from "./interfaces/ITarjetaCredito";
import ITarjetaDebito
    from "./interfaces/ITarjetaDebito";
import TarjetaCredito
    from "./classes/TarjetaCredito";
import {bicicletasMock} from "./constants/bicicletasMock";
import {clientesFederadosMock} from "./constants/clientesFederadosMock";
import {clientesComunesMock} from "./constants/clientesComunesMock";
import {direccionesMock} from "./constants/direccionesMock";
import {tarjetasDebitoMock} from "./constants/tarjetasDebitoMock";
import {tarjetasCreditoMock} from "./constants/tarjetasCreditoMock";
import {formasDePagoEnum} from "./constants/formasDePagoEnum";
import Compra from "./classes/Compra";

let pedidos: IPedido[] = [],
    cliente: IClienteComun | IClienteFederado,
    tarjeta: ITarjetaDebito | ITarjetaCredito | boolean,
    formaDePago: string,
    datosPago: IDatosPago;

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
            // direccionEnvioMock.piso,
            // direccionEnvioMock.departamento,
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
const conEnvio = true;
const clienteFederado = crearClienteFederado();

cliente = clienteFederado;
// cliente = clienteComun;

console.log(`Tipo: ${cliente.constructor.name}`);
console.log(Object.entries(cliente))

console.log(`
*******************************
DEFINIR DATOS DE PAGO
*******************************`);

export function crearTarjetaDebito() {
    const tarjetaDebitoMock = tarjetasDebitoMock[0];
    return new TarjetaDebito(
        tarjetaDebitoMock.numeroTarjeta,
    );
}

export function crearTarjetaCredito() {
    const tarjetaCreditoMock = tarjetasCreditoMock[0];
    return new TarjetaCredito(
        tarjetaCreditoMock.numeroTarjeta,
        tarjetaCreditoMock.fechaVencimiento,
    );
}

// crear tarjetas
const tarjetaDebito = crearTarjetaDebito();
const tarjetaCredito = crearTarjetaCredito();

export function crearDatosPago() {
    formaDePago = formasDePagoEnum.DEBITO;
    tarjeta = tarjetaDebito;
    // formaDePago = formasDePagoEnum.CREDITO;
    // tarjeta = tarjetaCredito;
    // formaDePago = formasDePagoEnum.EFECTIVO;
    // tarjeta = false;

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

export const validacionPedido = (bici: IBicicleta, cantidad: number) => {
    const stockBicicleta = new StockBicicleta(bici);
    return (stockBicicleta.stock > 0 &&
        stockBicicleta.stock >= cantidad &&
        !!bici.precio);
}
const bici1 = bicicletasMock[0]; // opciones 0 a 3
const cantidadBici1 = 1;

export function crearPedido(
    cliente: IClienteComun | IClienteFederado,
    datosPago: IDatosPago,
    bici: IBicicleta,
    cantidad: number
) {
    return (new Pedido(cliente, datosPago, bici, cantidad));
}

validacionPedido(bici1, cantidadBici1) &&
pedidos.push(crearPedido(cliente, datosPago, bici1, cantidadBici1));
const bici2 = bicicletasMock[1]; // opciones 0 a 3
const cantidadBici2 = 1;
validacionPedido(bici2, cantidadBici2) &&
pedidos.push(crearPedido(cliente, datosPago, bici2, cantidadBici2));
const bici3 = bicicletasMock[2]; // opciones 0 a 3
const cantidadBici3 = 1;
validacionPedido(bici3, cantidadBici3) &&
pedidos.push(crearPedido(cliente, datosPago, bici3, cantidadBici3));
const bici4 = bici3;
const cantidadBici4 = cantidadBici3;
validacionPedido(bici4, cantidadBici4) &&
pedidos.push(crearPedido(cliente, datosPago, bici4, cantidadBici4));


const compra = new Compra(pedidos, conEnvio);
// procesar la compra
compra.procesar(pedidos, conEnvio);
// imprimir la compra
compra.imprimir();



class App {
}

export default new App();
