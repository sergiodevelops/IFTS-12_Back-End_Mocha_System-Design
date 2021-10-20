import Bicicleta from './Bicicleta';

export default class Pedido {
    private _id: string;
    private _bicicleta: Bicicleta;
    private _cantidad: number;

    constructor(id: string, bicicleta: Bicicleta, cantidad: number) {
        this._id = id;
        this._bicicleta = bicicleta;
        this._cantidad = cantidad;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get bicicleta(): Bicicleta {
        return this._bicicleta;
    }

    set bicicleta(value: Bicicleta) {
        this._bicicleta = value;
    }

    get cantidad(): number {
        return this._cantidad;
    }

    set cantidad(value: number) {
        this._cantidad = value;
    }
}
