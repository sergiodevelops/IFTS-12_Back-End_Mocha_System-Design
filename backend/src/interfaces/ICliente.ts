import Cliente from "../class/Cliente";

export default interface ICliente {
    nombre: string;
    apellido: string;
    tipo: string;
    fechaNacimiento: string;
    dni: number;
}
