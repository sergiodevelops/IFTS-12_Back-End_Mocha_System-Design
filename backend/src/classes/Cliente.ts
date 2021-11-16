//responsabilidad: heredar estructura base de cliente

import ICliente from "../interfaces/ICliente";

export default abstract class Cliente implements ICliente {
    private _nombre: string;
    private _apellido: string;
    private _dni: number;
    private _fechaNacimiento: string;

    constructor(nombre: string, apellido: string, dni: number, fechaNacimiento: string) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._fechaNacimiento = fechaNacimiento;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(value: string) {
        this._nombre = value;
    }

    get apellido(): string {
        return this._apellido;
    }

    set apellido(value: string) {
        this._apellido = value;
    }

    get dni(): number {
        return this._dni;
    }

    set dni(value: number) {
        this._dni = value;
    }

    get fechaNacimiento(): string {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(value: string) {
        this._fechaNacimiento = value;
    }
}
