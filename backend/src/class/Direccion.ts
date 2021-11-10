import IDireccion from "../interfaces/IDireccion";

export default class Direccion implements IDireccion{
    private _calle: string;
    private _altura: number;
    private _barrio: string;
    private _ciudad: string;

    constructor(calle: string, altura: number, barrio: string, ciudad: string) {
        this._calle = calle;
        this._altura = altura;
        this._barrio = barrio;
        this._ciudad = ciudad;
    }

    get calle(): string {
        return this._calle;
    }

    set calle(value: string) {
        this._calle = value;
    }

    get altura(): number {
        return this._altura;
    }

    set altura(value: number) {
        this._altura = value;
    }

    get barrio(): string {
        return this._barrio;
    }

    set barrio(value: string) {
        this._barrio = value;
    }

    get ciudad(): string {
        return this._ciudad;
    }

    set ciudad(value: string) {
        this._ciudad = value;
    }
}
