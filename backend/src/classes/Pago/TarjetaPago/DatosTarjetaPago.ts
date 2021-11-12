//responsabilidad: almacenar datos de tarjeta para el pago

import IDatosTarjetaPago from "../../../interfaces/IPago/ITarjetaPago/IDatosTarjetaPago";

export default abstract class DatosTarjetaPago implements IDatosTarjetaPago{
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
