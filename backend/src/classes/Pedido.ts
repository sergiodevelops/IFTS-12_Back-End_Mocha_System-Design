//responsabilidad: almacenar pedido a ser agregado en la compra
import IPedido from "../interfaces/IPedido";
import IBicicleta from "../interfaces/IBicicleta";
import IClienteComun from "../interfaces/IClienteComun";
import IDatosPago from "../interfaces/IDatosPago";
import IClienteFederado from "../interfaces/IClienteFederado";
import {tiposDeClienteEnum} from "../constants/tiposDeClienteEnum";
import {especialidadesEnum} from "../constants/especialidadesEnum";
import {formasDePagoEnum} from "../constants/formasDePagoEnum";

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

    public getTotalConDescuento(): number {
        let subtotal = this.getTotalSinDescuento();
        if (this._cliente.constructor.name === tiposDeClienteEnum.FEDERADO) {
            if (this._bicicleta.especialidad === especialidadesEnum.COMPETICION
                &&
                this._datosPago.formaDePago === formasDePagoEnum.EFECTIVO) {
                console.log("FEDERADO && EFECTIVO && COMPETICION  --> descuento 25%");
                subtotal = subtotal - subtotal * 0.25;
            }
            if (this._bicicleta.especialidad === especialidadesEnum.SPORT) {
                console.log("FEDERADO && SPORT --> descuento 10%");
                subtotal = subtotal - subtotal * 0.10;
            }
        }
        return subtotal;
    }

    public getTotalSinDescuento(): number {
        let subtotal = this._cantidad * this._bicicleta.precio;
        return subtotal;
    }
}
