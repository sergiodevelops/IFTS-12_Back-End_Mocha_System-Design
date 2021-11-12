import IBicicleta from "../IBicicleta/IBicicleta";

// lo que solicita el cliente (producto y cantidad)
export default interface IPedido {
    bicicleta: IBicicleta;
    cantidad: number;
}
