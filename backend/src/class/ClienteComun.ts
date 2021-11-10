import Cliente from './Cliente';
import IDireccion from "../interface/IDireccion";
import IClienteComun from "../interface/IClienteComun";

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
        super(nombre, apellido, tipo, fechaNacimiento, dni);

        this._direccion = direccion;
    }

    get direccion(): IDireccion {
        return this._direccion;
    }

    set direccion(value: IDireccion) {
        this._direccion = value;
    }
}
