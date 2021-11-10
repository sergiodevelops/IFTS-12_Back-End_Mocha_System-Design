import IBicicleta from "./IBicicleta";

export default interface IClienteFederado {
    id: string;
    bicicleta: IBicicleta;
    cantidad: number;
}
