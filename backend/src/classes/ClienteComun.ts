//responsabilidad: almacenar datos de cliente si es comun

import Cliente from './Cliente';
import IDireccion from "../interfaces/IDireccion";
import IClienteComun from "../interfaces/IClienteComun";

export default class ClienteComun extends Cliente implements IClienteComun{
    private _direccion: IDireccion;

    constructor(
        nombre: string,
        apellido: string,
        tipo: string,
        fechaNacimiento: string,
        dni: number,

        direccion: IDireccion,
    ) {
        super(nombre, apellido, fechaNacimiento, dni);

        this._direccion = direccion;
    }

    get direccion(): IDireccion {
        return this._direccion;
    }

    set direccion(value: IDireccion) {
        this._direccion = value;
    }
}
