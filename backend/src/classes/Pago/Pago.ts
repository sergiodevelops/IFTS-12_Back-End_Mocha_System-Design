//responsabilidad: almacenar preferencias de pago del cliente

import ITarjetaPago from '../../interfaces/IPago/ITarjetaPago/ITarjetaPago';
import IPago from "../../interfaces/IPago/IPago";

export default class Pago implements IPago{

    private _formaDePago: string;
    private _tarjeta?: ITarjetaPago | undefined;

    constructor(
        formaDePago: string,
        tarjeta: ITarjetaPago | undefined,
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

    get tarjeta(): ITarjetaPago | undefined {
        return this._tarjeta;
    }

    set tarjeta(value: ITarjetaPago | undefined) {
        this._tarjeta = value;
    }
}
