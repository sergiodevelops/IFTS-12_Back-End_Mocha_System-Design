//responsabilidad: calcular descuento segun condiciones

import IPedido from "../interfaces/IPedido";
import IDescuento from "../interfaces/IDescuento";

export default class Descuento implements IDescuento {

    private _tipoCliente: string;
    private _pedidosCargados: IPedido[];
    private _metodoPago: string;

    constructor(
        tipoCliente: string,
        metodoPago: string,
        pedidosCargados: IPedido[],
    ) {
        this._tipoCliente = tipoCliente;
        this._pedidosCargados = pedidosCargados;
        this._metodoPago = metodoPago;
    }


    get tipoCliente(): string {
        return this._tipoCliente;
    }

    set tipoCliente(value: string) {
        this._tipoCliente = value;
    }

    get pedidosCargados(): IPedido[] {
        return this._pedidosCargados;
    }

    set pedidosCargados(value: IPedido[]) {
        this._pedidosCargados = value;
    }

    get metodoPago(): string {
        return this._metodoPago;
    }

    set metodoPago(value: string) {
        this._metodoPago = value;
    }

    public getMontoConDescuento=(
        tipoCliente: string,
        newPedidosCargados: IPedido[],
        newMetodoPago?: string
    ): number =>{
        this._tipoCliente = tipoCliente;
        this._pedidosCargados = newPedidosCargados;
        this._metodoPago = !!newMetodoPago ? newMetodoPago : this._metodoPago;
        return 0;
    }

    public updateMontoConDescuento=(
        tipoCliente: string,
        newPedidosCargados: IPedido[],
        newMetodoPago?: string
    ): number =>{
        this._tipoCliente = tipoCliente;
        this._pedidosCargados = newPedidosCargados;
        this._metodoPago = !!newMetodoPago ? newMetodoPago : this._metodoPago;
        return 0;
    }
}
