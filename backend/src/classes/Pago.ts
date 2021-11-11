//responsabilidad: almacenar preferencias de pago del cliente

import ITarjeta from '../interfaces/ITarjeta';
import IPago from "../interfaces/IPago";

export default class Pago implements IPago{

    private _metodoPago: string;
    private _tarjeta?: ITarjeta | undefined;

    constructor(
        metodoPago: string,
        tarjeta: ITarjeta | undefined,
    ) {
        this._metodoPago = metodoPago;
        this._tarjeta = tarjeta;
    }

    get metodo(): string {
        return this._metodoPago;
    }

    set metodo(value: string) {
        this._metodoPago = value;
    }

    get tarjeta(): ITarjeta | undefined {
        return this._tarjeta;
    }

    set tarjeta(value: ITarjeta | undefined) {
        this._tarjeta = value;
    }
}
