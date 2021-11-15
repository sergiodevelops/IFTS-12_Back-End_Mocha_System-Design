import IPedido from "./IPedido";

export default interface ICompra {
    pedidos: IPedido[];
    conEnvio?: boolean;

    actualizar(): boolean;
    procesar(): boolean;
}
