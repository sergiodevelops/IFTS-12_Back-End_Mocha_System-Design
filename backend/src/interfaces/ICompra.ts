import IPedido from "./IPedido";

export default interface ICompra {
    pedidos: IPedido[];
    conEnvio?: boolean;

    imprimir(): boolean;
    procesar(pedidos: IPedido[],conEnvio?:boolean): boolean;
}
