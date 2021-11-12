import IPedido from "../ICompra/IPedido";

export default interface IDescuentoPago {
    pedidos: IPedido[];
    formaDePago: string;
    customerType: string;
    // subtotalesDescuento: {filtros: [], subTotalDescuento: number}; //TODO
    totalDescuento: number;

    getTotalWithDiscount(): number;

    updateTotalWithDiscount(
        pedidos: IPedido[],
        formaDePago?: string,
    ): number;
}
