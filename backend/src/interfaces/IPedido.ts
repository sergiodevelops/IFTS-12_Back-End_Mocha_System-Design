import IBicicleta from "./IBicicleta";

export default interface IPedido {
    id: string;
    bicicleta: IBicicleta;
    cantidad: number;
}
