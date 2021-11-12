import IPedido from "../ICompra/IPedido";

export default interface IUnificadorPedidos {
    pedidos: IPedido[];

    getGroupList(): IPedido[][];
}
