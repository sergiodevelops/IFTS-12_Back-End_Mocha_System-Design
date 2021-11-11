//responsabilidad: almacenar preferencias de pago del cliente

import ITarjeta from '../interfaces/ITarjeta';
import IPago from "../interfaces/IPago";

export default class Pago implements IPago{

    private _formaDePago: string;
    private _tarjeta?: ITarjeta | undefined;

    constructor(
        formaDePago: string,
        tarjeta: ITarjeta | undefined,
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

    get tarjeta(): ITarjeta | undefined {
        return this._tarjeta;
    }

    set tarjeta(value: ITarjeta | undefined) {
        this._tarjeta = value;
    }
}
