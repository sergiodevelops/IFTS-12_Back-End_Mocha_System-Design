import IPedido from "./IPedido";

export default interface ICalculoMontoTotal {
    pedido: IPedido;

    procesar():number
    procesarConDescuento():number
}
