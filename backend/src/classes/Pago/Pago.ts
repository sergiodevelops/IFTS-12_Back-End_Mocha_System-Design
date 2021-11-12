//responsabilidad: almacenar preferencias de pago del cliente
import ITarjetaPago from '../../interfaces/IPago/ITarjetaPago/ITarjetaPago';
import IPago from "../../interfaces/IPago/IPago";
import ITarjetaCredito
    from "../../interfaces/IPago/ITarjetaPago/ITarjetaCredito";
import ITarjetaDebito from "../../interfaces/IPago/ITarjetaPago/ITarjetaDebito";

export default class Pago implements IPago{
    private _formaDePago: string;
    private _tarjeta?: undefined | ITarjetaDebito | ITarjetaCredito;

    constructor(
        formaDePago: string,
        tarjeta?: undefined | ITarjetaDebito | ITarjetaCredito,
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

    get tarjeta(): ITarjetaDebito | ITarjetaCredito | undefined {
        return this._tarjeta;
    }

    set tarjeta(value: ITarjetaDebito | ITarjetaCredito | undefined) {
        this._tarjeta = value;
    }
}
