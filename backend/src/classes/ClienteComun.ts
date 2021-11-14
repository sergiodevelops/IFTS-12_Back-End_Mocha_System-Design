//responsabilidad: almacenar datos de cliente si es comun
import Cliente from './Cliente';
import IDireccionEnvio from "../interfaces/IDireccionEnvio";
import IClienteComun from "../interfaces/IClienteComun";

export default class ClienteComun extends Cliente implements IClienteComun{
    private _direccion: IDireccionEnvio;

    constructor(
        nombre: string,
        apellido: string,
        dni: number,
        fechaNacimiento: string,
        direccion: IDireccionEnvio
    ) {
        super(nombre, apellido, dni, fechaNacimiento);
        this._direccion = direccion;
    }

    get nombre(): string {
        return super.nombre;
    }

    set nombre(value: string) {
        super.nombre = value;
    }

    get apellido(): string {
        return super.apellido;
    }

    set apellido(value: string) {
        super.apellido = value;
    }

    get dni(): number {
        return super.dni;
    }

    set dni(value: number) {
        super.dni = value;
    }

    get fechaNacimiento(): string {
        return super.fechaNacimiento;
    }

    set fechaNacimiento(value: string) {
        super.fechaNacimiento = value;
    }

    get direccion(): IDireccionEnvio {
        return this._direccion;
    }

    set direccion(value: IDireccionEnvio) {
        this._direccion = value;
    }
}
