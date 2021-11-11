//responsabilidad: almacenar datos de tarjeta para el pago

import ITarjeta from "../interfaces/ITarjeta";

export default class Tarjeta implements ITarjeta {
    private _tipo: string;
    private _numeroTarjeta: string;
    private _fechaVencimiento: string;

    constructor(
        tipo: string,
        numeroTarjeta: string,
        fechaVencimiento: string
    ) {
        this._tipo = tipo;
        this._numeroTarjeta = numeroTarjeta;
        this._fechaVencimiento = fechaVencimiento;
    }

    get tipo(): string {
        return this._tipo;
    }

    set tipo(value: string) {
        this._tipo = value;
    }

    get numeroTarjeta(): string {
        return this._numeroTarjeta;
    }

    set numeroTarjeta(value: string) {
        this._numeroTarjeta = value;
    }

    get fechaVencimiento(): string {
        return this._fechaVencimiento;
    }

    set fechaVencimiento(value: string) {
        this._fechaVencimiento = value;
    }
}
