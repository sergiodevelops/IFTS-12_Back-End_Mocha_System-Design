//responsabilidad: almacenar datos de cliente si es federado

import Cliente from './Cliente';
import IClienteFederado from "../../interfaces/ICliente/IClienteFederado";

export default class ClienteFederado extends Cliente implements IClienteFederado{
    private _matricula: number;
    private _agrupacion: string;

    constructor(nombre: string, apellido: string, dni: number, fechaNacimiento: string, matricula: number, agrupacion: string) {
        super(nombre, apellido, dni, fechaNacimiento);
        this._matricula = matricula;
        this._agrupacion = agrupacion;
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
