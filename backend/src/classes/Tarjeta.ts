//responsabilidad: almacenar datos de tarjeta para el pago

import ITarjeta from "../interfaces/ITarjeta";

export default abstract class Tarjeta implements ITarjeta{
    private _numeroTarjeta: string;

    protected constructor(
        numeroTarjeta: string,
    ) {
        this._numeroTarjeta = numeroTarjeta;
    }

    get numeroTarjeta(): string {
        return this._numeroTarjeta;
    }

    set numeroTarjeta(value: string) {
        this._numeroTarjeta = value;
    }
}
