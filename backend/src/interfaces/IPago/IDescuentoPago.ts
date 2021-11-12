import IPedido from "../ICompra/IPedido";

export default interface IDescuentoPago {
    pedidos: IPedido[];
    formaDePago: string;

    getDiscount(
        pedidos: IPedido[],
        formaDePago?: string,
    ): number;
}
