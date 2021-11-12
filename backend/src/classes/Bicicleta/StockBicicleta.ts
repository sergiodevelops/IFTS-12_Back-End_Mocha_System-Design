//responsabilidad: informar stock de bicicleta deseada

/*
 "de la bicicleta se conoce" dice el enunciado, lo cual no deja explicito
 la consigna si es obligación o no que el atributo stock este dentro o
 no de la clase Bicicleta por lo cual se procede a separar en esta clase
 el stock del producto para mantenerlo separado y poder validar el mismo
 */

import IBicicleta from "../../interfaces/IBicicleta/IBicicleta";
import IStockBicicleta from "../../interfaces/IBicicleta/IStockBicicleta";
// nos asocia producto con pedido
export default class StockBicicleta implements IStockBicicleta {

    private _bicicleta: IBicicleta;
    private _stock: number;

    constructor(
        bicicleta: IBicicleta,
        stock: number,
    ) {
        this._bicicleta = bicicleta;
        this._stock = stock;
    }

    get bicicleta(): IBicicleta {
        return this._bicicleta;
    }

    set bicicleta(value: IBicicleta) {
        this._bicicleta = value;
    }

    get stock(): number {
        return this._stock;
    }

    set stock(value: number) {
        this._stock = value;
    }
}
