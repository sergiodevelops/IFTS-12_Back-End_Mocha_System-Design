import ICliente from "./ICliente";

export default interface IClienteFederado extends ICliente{
    matricula: number,
    agrupacion: string,
}
