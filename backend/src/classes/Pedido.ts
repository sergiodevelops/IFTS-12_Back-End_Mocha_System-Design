//responsabilidad: almacenar pedido a ser agregado en la compra
import IPedido from "../interfaces/IPedido";
import IBicicleta from "../interfaces/IBicicleta";
import IClienteComun from "../interfaces/IClienteComun";
import IDatosPago from "../interfaces/IDatosPago";
import IClienteFederado from "../interfaces/IClienteFederado";

export default class Pedido implements IPedido {
    private _cliente: IClienteComun | IClienteFederado;
    private _datosPago: IDatosPago;
    private _bicicleta: IBicicleta;
    private _cantidad: number;

    constructor(
        cliente: IClienteComun | IClienteFederado,
        datosPago: IDatosPago,
        bicicleta: IBicicleta,
        cantidad: number,
    ) {
        this._cliente = cliente;
        this._datosPago = datosPago;
        this._bicicleta = bicicleta;
        this._cantidad = cantidad;
    }

    get cliente(): IClienteComun | IClienteFederado {
        return this._cliente;
    }

    set cliente(value: IClienteComun | IClienteFederado) {
        this._cliente = value;
    }

    get datosPago(): IDatosPago {
        return this._datosPago;
    }

    set datosPago(value: IDatosPago) {
        this._datosPago = value;
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
