//responsabilidad: almacenar dirección del cliente si es comun

import IDireccionEnvio from "../../interfaces/ICompra/IDireccionEnvio";

export default class DireccionEnvio implements IDireccionEnvio {
    private _ciudad: string;
    private _barrio: string;
    private _calle: string;
    private _altura: number;
    private _piso: string | undefined;
    private _dpto: string | undefined;


    constructor(
        ciudad: string,
        barrio: string,
        calle: string,
        altura: number,
        piso?: string | undefined,
        dpto?: string | undefined
    ) {
        this._ciudad = ciudad;
        this._barrio = barrio;
        this._calle = calle;
        this._altura = altura;
        this._piso = piso;
        this._dpto = dpto;
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

    get piso(): string | undefined {
        return this._piso;
    }

    set piso(value: string | undefined) {
        this._piso = value;
    }

    get dpto(): string | undefined {
        return this._dpto;
    }

    set dpto(value: string | undefined) {
        this._dpto = value;
    }
}
