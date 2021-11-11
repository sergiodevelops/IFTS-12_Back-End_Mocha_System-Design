//responsabilidad: almacenar pedido a ser agregado en la compra

import IPedido from "../interfaces/IPedido";
import IBicicleta from "../interfaces/IBicicleta";

export default class Pedido implements IPedido{
    private _bicicleta: IBicicleta;
    private _cantidad: number;

    constructor(bicicleta: IBicicleta, cantidad: number) {
        this._bicicleta = bicicleta;
        this._cantidad = cantidad;
    }

    get bicicleta(): IBicicleta {
        return this._bicicleta;
    }

    set bicicleta(value: IBicicleta) {
        this._bicicleta = value;
    }

    get cantidad(): number {
        return this._cantidad;
    }

    set cantidad(value: number) {
        this._cantidad = value;
    }
}
