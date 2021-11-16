import IPedido from "./IPedido";

export default interface ICompra {
    pedidos: IPedido[],
    conEnvio?: boolean | undefined,

    imprimir(): boolean,
    procesar(pedidos: IPedido[],conEnvio?:boolean | undefined): boolean,
}
