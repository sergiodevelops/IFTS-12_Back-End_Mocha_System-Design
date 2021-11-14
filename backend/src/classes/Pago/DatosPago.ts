//responsabilidad: almacenar preferencias de pago del cliente
import IDatosPago from "../../interfaces/IPago/IDatosPago";
import IDatosTarjetaCredito
    from "../../interfaces/IPago/ITarjetaPago/IDatosTarjetaCredito";
import IDatosTarjetaDebito from "../../interfaces/IPago/ITarjetaPago/IDatosTarjetaDebito";
import {formasDePagoEnum} from "../../constants/pago/formasDePagoEnum";

export default class DatosPago implements IDatosPago{
    private _formaDePago: string;
    private _tarjeta?: boolean | IDatosTarjetaDebito | IDatosTarjetaCredito;

    constructor(
        formaDePago: string,
        tarjeta?: boolean | IDatosTarjetaDebito | IDatosTarjetaCredito,
    ) {
        this._formaDePago = tarjeta ? formaDePago : formasDePagoEnum.EFECTIVO;
        this._tarjeta = tarjeta ? tarjeta : false;
    }

    get formaDePago(): string {
        return this._formaDePago;
    }

    set formaDePago(value: string) {
        this._formaDePago = value;
    }

    get tarjeta(): boolean | IDatosTarjetaDebito | IDatosTarjetaCredito {
        if(this._tarjeta) return this._tarjeta;
        return false;
    }

    set tarjeta(value: boolean | IDatosTarjetaDebito | IDatosTarjetaCredito) {
        this._tarjeta = typeof(value) !== "boolean" ? value : false;
    }
}
