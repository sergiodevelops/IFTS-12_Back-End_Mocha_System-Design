import ITarjeta from '../interfaces/ITarjeta';
import IPago from "../interfaces/IPago";

export default class Pago implements IPago{
    private _tarjeta: ITarjeta | undefined;
    private _fechaPago: string;
    private _descuento: number;
    private _saldo: number;

    constructor(
        tarjeta: ITarjeta,
        fechaPago: string,
        descuento: number,
        saldo: number,
    ) {
        this._tarjeta = tarjeta;
        this._fechaPago = fechaPago;
        this._descuento = descuento;
        this._saldo = saldo;
    }

    get tarjeta(): ITarjeta | undefined {
        return this._tarjeta;
    }

    set tarjeta(value: ITarjeta | undefined) {
        this._tarjeta = value;
    }

    get fechaPago(): string {
        return this._fechaPago;
    }

    set fechaPago(value: string) {
        this._fechaPago = value;
    }

    get descuento(): number {
        return this._descuento;
    }

    set descuento(value: number) {
        this._descuento = value;
    }

    get saldo(): number {
        return this._saldo;
    }

    set saldo(value: number) {
        this._saldo = value;
    }
}
