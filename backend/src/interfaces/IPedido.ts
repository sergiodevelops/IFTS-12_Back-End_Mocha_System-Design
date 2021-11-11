import IBicicleta from "./IBicicleta";
// lo que solicita el cliente
export default interface IPedido {
    bicicleta: IBicicleta;
    cantidad: number;
}
