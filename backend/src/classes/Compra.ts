//responsabilidad: almacenar datos para hacer la compra
import IPedido from "../interfaces/IPedido";
import IClienteFederado from "../interfaces/IClienteFederado";
import IClienteComun from "../interfaces/IClienteComun";
import ICompra from "../interfaces/ICompra";

export default class Compra implements ICompra {
    private _cliente: IClienteFederado | IClienteComun;
    private _pedidos: IPedido[];
    private _conEnvio: boolean;
    private _pago: string;

    constructor(
        cliente: IClienteFederado | IClienteComun,
        pedidos: IPedido[],
        conEnvio: boolean,
        pago: string,
    ) {
        this._cliente = cliente;
        this._pedidos = pedidos;
        this._conEnvio = conEnvio;
        this._pago = pago;
    }

    get cliente(): IClienteFederado | IClienteComun {
        return this._cliente;
    }

    set cliente(value: IClienteFederado | IClienteComun) {
        this._cliente = value;
    }

    get pedidos(): IPedido[] {
        return this._pedidos;
    }

    set pedidos(value: IPedido[]) {
        this._pedidos = value;
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

    public procesar = () =>{};
}
