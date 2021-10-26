import Bicicleta from './Bicicleta';
import Cliente from './Cliente';
import ClienteFederado from './ClienteFederado';
import ClienteComun from './ClienteComun';
import Pedido from './Pedido';

export default class Compra {
    private _cliente: ClienteFederado | ClienteComun;
    private _pedido: Pedido;
    private _conEnvio: boolean;
    private _pago: string;

    constructor(
        cliente: ClienteFederado | ClienteComun,
        pedido: Pedido,
        conEnvio: boolean,
        pago: string,
    ) {
        this._cliente = cliente;
        this._pedido = pedido;
        this._conEnvio = conEnvio;
        this._pago = pago;
    }

    get cliente(): ClienteFederado | ClienteComun {
        return this._cliente;
    }

    set cliente(value: ClienteFederado | ClienteComun) {
        this._cliente = value;
    }

    get pedido(): Pedido {
        return this._pedido;
    }

    set pedido(value: Pedido) {
        this._pedido = value;
    }

    get conEnvio(): boolean {
        return this._conEnvio;
    }

    set conEnvio(value: boolean) {
        this._conEnvio = value;
    }

    get pago(): string {
        return this._pago;
    }

    set pago(value: string) {
        this._pago = value;
    }
}
