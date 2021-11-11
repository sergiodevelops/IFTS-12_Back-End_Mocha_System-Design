//responsabilidad: almacenar datos de bicicleta deseada

import IBicicleta from "../interfaces/IBicicleta";

export default class Bicicleta implements IBicicleta{
    private _marca: string;
    private _modelo: string;
    private _rodado: string;
    private _tipo: string;
    private _especialidad: string;

    constructor(
        marca: string,
        modelo: string,
        rodado: string,
        tipo: string,
        especialidad: string,
    ) {
        this._marca = marca;
        this._modelo = modelo;
        this._rodado = rodado;
        this._tipo = tipo;
        this._especialidad = especialidad;
    }

    get marca(): string {
        return this._marca;
    }

    set marca(value: string) {
        this._marca = value;
    }

    get modelo(): string {
        return this._modelo;
    }

    set modelo(value: string) {
        this._modelo = value;
    }

    get rodado(): string {
        return this._rodado;
    }

    set rodado(value: string) {
        this._rodado = value;
    }

    get tipo(): string {
        return this._tipo;
    }

    set tipo(value: string) {
        this._tipo = value;
    }

    get especialidad(): string {
        return this._especialidad;
    }

    set especialidad(value: string) {
        this._especialidad = value;
    }
}
