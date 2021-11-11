import IPedido from "./IPedido";

export default interface IDescuento {
    pedidos: IPedido[];
    formaDePago: string;

    getDiscount(
        pedidos: IPedido[],
        formaDePago?: string,
    ): number;
}
