import IDireccion from "./IDireccion";

export default interface IClienteComun {
    nombre: string,
    apellido: string,
    tipo: string,
    fechaNacimiento: string,
    dni: number,
    direccion: IDireccion,
}
