import Cliente from './Cliente';
import Direccion from './Direccion';

export default class ClienteComun extends Cliente {
    private _direccion: Direccion;

    constructor(
        nombre: string,
        apellido: string,
        tipo: string,
        fechaNacimiento: string,
        dni: number,

        direccion: Direccion,
    ) {
        super(nombre, apellido, tipo, fechaNacimiento, dni);

        this._direccion = direccion;
    }

    get direccion(): Direccion {
        return this._direccion;
    }

    set direccion(value: Direccion) {
        this._direccion = value;
    }
}
