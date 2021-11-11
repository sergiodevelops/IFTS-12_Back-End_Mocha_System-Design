//responsabilidad: calcular descuento segun condiciones

import IPedido from "../interfaces/IPedido";
import IDescuento from "../interfaces/IDescuento";

export default class Descuento implements IDescuento {

    private _tipoCliente: string;
    private _pedidos: IPedido[];
    private _metodoPago: string;

    get tipoCliente(): string {
        return this._tipoCliente;
    }

    set tipoCliente(value: string) {
        this._tipoCliente = value;
    }

    get pedidos(): IPedido[] {
        return this._pedidos;
    }

    set pedidos(value: IPedido[]) {
        this._pedidos = value;
    }

    get metodoPago(): string {
        return this._metodoPago;
    }

    set metodoPago(value: string) {
        this._metodoPago = value;
    }

    public getDiscount=(
        pedidos: IPedido[],
        newMetodoPago?: string
    ): number =>{
        this._pedidos = pedidos;
        this._metodoPago = !!newMetodoPago ? newMetodoPago : this._metodoPago;
        return 0;
    }
}
