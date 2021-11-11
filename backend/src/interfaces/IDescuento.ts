import IPedido from "./IPedido";

export default interface IDescuento {
    pedidos: IPedido[];
    metodoPago: string;

    getDiscount(
        pedidos: IPedido[],
        metodoPago?: string,
    ): number;
}
