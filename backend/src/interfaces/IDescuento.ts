import IPedido from "./IPedido";

export default interface IDescuento {
    tipoCliente: string;
    metodoPago: string;
    pedidosCargados: IPedido[];

    getMontoConDescuento(
        tipoCliente: string,
        newPedidosCargados: IPedido[],
        newMetodoPago?: string,
    ): number;

    updateMontoConDescuento(
        tipoCliente: string,
        newPedidosCargados: IPedido[],
        newMetodoPago?: string,
    ): number;
}
