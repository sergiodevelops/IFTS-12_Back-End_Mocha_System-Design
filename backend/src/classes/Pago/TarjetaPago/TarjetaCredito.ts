//responsabilidad: almacenar datos de tarjeta para el pago
import ITarjetaCredito from "../../../interfaces/IPago/ITarjetaPago/ITarjetaCredito";
import TarjetaPago from "./TarjetaPago";

export default class TarjetaCredito extends TarjetaPago implements ITarjetaCredito {
    private _fechaVencimiento: string;

    constructor(
        numeroTarjeta: string,
        fechaVencimiento: string
    ) {
        super(numeroTarjeta);
        this._fechaVencimiento = fechaVencimiento;
    }

    get fechaVencimiento(): string {
        return this._fechaVencimiento;
    }

    set fechaVencimiento(value: string) {
        this._fechaVencimiento = value;
    }
}
