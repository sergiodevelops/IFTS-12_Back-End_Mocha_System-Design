import IBicicleta from "./IBicicleta";

// el precio que tiene el producto que solicita el cliente
export default interface IPrecioBicicleta {
    bicicleta: IBicicleta;
    precio: number;
}