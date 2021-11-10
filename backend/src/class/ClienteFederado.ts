import Cliente from './Cliente';
import IClienteFederado from "../interface/IClienteFederado";

export default class ClienteFederado extends Cliente implements IClienteFederado{
    private _matricula: number;
    private _agrupacion: string;

    constructor(
        nombre: string,
        apellido: string,
        tipo: string,
        fechaNacimiento: string,
        dni: number,
        matricula: number,
        agrupacion: string,
    ) {
        super(nombre, apellido, tipo, fechaNacimiento, dni);

        this._matricula = matricula;
        this._agrupacion = agrupacion;
    }

    get matricula(): number {
        return this._matricula;
    }

    set matricula(value: number) {
        this._matricula = value;
    }

    get agrupacion(): string {
        return this._agrupacion;
    }

    set agrupacion(value: string) {
        this._agrupacion = value;
    }
}
