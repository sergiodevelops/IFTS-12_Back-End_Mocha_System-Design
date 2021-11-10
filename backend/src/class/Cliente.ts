export default abstract class Cliente {
    private _nombre: string;
    private _apellido: string;
    private _tipo: string;
    private _fechaNacimiento: string;
    private _dni: number;

    constructor(
        nombre: string,
        apellido: string,
        tipo: string,
        fechaNacimiento: string,
        dni: number,
    ) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._tipo = tipo;
        this._fechaNacimiento = fechaNacimiento;
        this._dni = dni;
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

    get tipo(): string {
        return this._tipo;
    }

    set tipo(value: string) {
        this._tipo = value;
    }

    get fechaNacimiento(): string {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(value: string) {
        this._fechaNacimiento = value;
    }

    get dni(): number {
        return this._dni;
    }

    set dni(value: number) {
        this._dni = value;
    }
}
