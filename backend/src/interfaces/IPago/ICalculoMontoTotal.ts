import IPedido from "../ICompra/IPedido";

export default interface ICalculoMontoTotal {
    pedido: IPedido;

    procesar():number
    procesarConDescuento():number
}
