//responsabilidad: almacenar datos de tarjeta para el pago
import IDatosTarjetaCredito from "../../../interfaces/IPago/ITarjetaPago/IDatosTarjetaCredito";
import DatosTarjetaPago from "./DatosTarjetaPago";

export default class DatosTarjetaCredito extends DatosTarjetaPago implements IDatosTarjetaCredito {
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
