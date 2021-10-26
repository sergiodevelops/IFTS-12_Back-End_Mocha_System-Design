import Tarjeta from './Tarjeta';

export default class Pago {
    private _tarjeta: Tarjeta;
    private _conTarjeta: boolean;
    private _fechaPago: string;
    private _descuento: number;
    private _saldo: number;

    constructor(
        tarjeta: Tarjeta,
        conTarjeta: boolean,
        fechaPago: string,
        descuento: number,
        saldo: number,
    ) {
        this._tarjeta = tarjeta;
        this._conTarjeta = conTarjeta;
        this._fechaPago = fechaPago;
        this._descuento = descuento;
        this._saldo = saldo;
    }

    get tarjeta(): Tarjeta {
        return this._tarjeta;
    }

    set tarjeta(value: Tarjeta) {
        this._tarjeta = value;
    }

    get conTarjeta(): boolean {
        return this._conTarjeta;
    }

    set conTarjeta(value: boolean) {
        this._conTarjeta = value;
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
