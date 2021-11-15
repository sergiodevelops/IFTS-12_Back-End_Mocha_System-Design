//responsabilidad: almacenar preferencias de pago del cliente
import IDatosPago from "../interfaces/IDatosPago";
import ITarjetaCredito
    from "../interfaces/ITarjetaCredito";
import ITarjetaDebito from "../interfaces/ITarjetaDebito";
import {formasDePagoEnum} from "../constants/formasDePagoEnum";

export default class DatosPago implements IDatosPago{
    private _formaDePago: string;
    private _tarjeta?: boolean | ITarjetaDebito | ITarjetaCredito;

    constructor(
        formaDePago: string,
        tarjeta?: boolean | ITarjetaDebito | ITarjetaCredito,
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

    get tarjeta(): boolean | ITarjetaDebito | ITarjetaCredito {
        if(this._tarjeta) return this._tarjeta;
        return false;
    }

    set tarjeta(value: boolean | ITarjetaDebito | ITarjetaCredito) {
        this._tarjeta = typeof(value) !== "boolean" ? value : false;
    }
}
