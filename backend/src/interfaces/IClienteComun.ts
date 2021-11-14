import IDireccionEnvio from "./IDireccionEnvio";
import ICliente from "./ICliente";

export default interface IClienteComun extends ICliente{
    direccion: IDireccionEnvio,
}
