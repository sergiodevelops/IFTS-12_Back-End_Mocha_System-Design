import IBicicleta from "./IBicicleta";
// el stock que hay disponible para lo que solicita el cliente
export default interface IStockBicicleta {
    bicicleta: IBicicleta,
    stock: number,

    getCurrentStock(): number,
}