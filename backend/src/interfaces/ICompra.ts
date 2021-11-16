import IPedido from "./IPedido";

export default interface ICompra {
    pedidos: IPedido[],
    conEnvio?: boolean | undefined,

    getTotalSinDescuento(): number,
    getTotalConDescuento(): number,
    imprimir(): boolean,
    procesar(pedidos: IPedido[],conEnvio?:boolean | undefined): boolean,
}
