//responsabilidad: almacenar preferencias de pago del cliente
import IDatosTarjetaPago from '../../interfaces/IPago/ITarjetaPago/IDatosTarjetaPago';
import IDatosPago from "../../interfaces/IPago/IDatosPago";
import IDatosTarjetaCredito
    from "../../interfaces/IPago/ITarjetaPago/IDatosTarjetaCredito";
import IDatosTarjetaDebito from "../../interfaces/IPago/ITarjetaPago/IDatosTarjetaDebito";

export default class DatosPago implements IDatosPago{
    private _formaDePago: string;
    private _tarjeta?: undefined | IDatosTarjetaDebito | IDatosTarjetaCredito;

    constructor(
        formaDePago: string,
        tarjeta?: undefined | IDatosTarjetaDebito | IDatosTarjetaCredito,
    ) {
        this._formaDePago = formaDePago;
        this._tarjeta = tarjeta;
    }

    get formaDePago(): string {
        return this._formaDePago;
    }

    set formaDePago(value: string) {
        this._formaDePago = value;
    }

    get tarjeta(): IDatosTarjetaDebito | IDatosTarjetaCredito | undefined {
        return this._tarjeta;
    }

    set tarjeta(value: IDatosTarjetaDebito | IDatosTarjetaCredito | undefined) {
        this._tarjeta = value;
    }
}
