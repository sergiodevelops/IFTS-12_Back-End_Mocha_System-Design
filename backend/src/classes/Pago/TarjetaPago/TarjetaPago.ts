//responsabilidad: almacenar datos de tarjeta para el pago

import ITarjetaPago from "../../../interfaces/IPago/ITarjetaPago/ITarjetaPago";

export default abstract class TarjetaPago implements ITarjetaPago{
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
