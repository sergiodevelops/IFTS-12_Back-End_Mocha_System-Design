//responsabilidad: almacenar datos de cliente si es comun

import Cliente from './Cliente';
import IDireccionEnvio from "../../interfaces/ICompra/IDireccionEnvio";
import IClienteComun from "../../interfaces/ICliente/IClienteComun";

export default class ClienteComun extends Cliente implements IClienteComun{
    private _direccion: IDireccionEnvio;

    constructor(
        nombre: string,
        apellido: string,
        tipo: string,
        fechaNacimiento: string,
        dni: number,

        direccion: IDireccionEnvio,
    ) {
        super(nombre, apellido, fechaNacimiento, dni);

        this._direccion = direccion;
    }

    get direccion(): IDireccionEnvio {
        return this._direccion;
    }

    set direccion(value: IDireccionEnvio) {
        this._direccion = value;
    }
}
