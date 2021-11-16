//responsabilidad: calcular descuento segun condiciones
import IMontoTotal from "../interfaces/ICalculoMontoTotal";
import IPedido from "../interfaces/IPedido";
import {tiposDeClienteEnum} from "../constants/tiposDeClienteEnum";
import {especialidadesEnum} from "../constants/especialidadesEnum";
import {formasDePagoEnum} from "../constants/formasDePagoEnum";

export default class MontoTotal implements IMontoTotal {
    private _pedido: IPedido;

    constructor(pedido: IPedido) {
        this._pedido = pedido;
    }

    get pedido(): IPedido {
        return this._pedido;
    }

    set pedido(value: IPedido) {
        this._pedido = value;
    }

    public procesar = () => {
        let subtotal = this._pedido.cantidad * this._pedido.bicicleta.precio;
        return subtotal;
    }

    public procesarConDescuento = () => {
        if (this._pedido.cliente.constructor.name === tiposDeClienteEnum.FEDERADO) {
            let subtotal = this.procesar();
            if (this._pedido.bicicleta.especialidad === especialidadesEnum.COMPETICION
                &&
                this._pedido.datosPago.formaDePago === formasDePagoEnum.EFECTIVO) {
                console.log("FEDERADO && EFECTIVO && COMPETICION  --> descuento 25%");
                subtotal = subtotal - subtotal * 0.25;
                return subtotal;
            }
            if (this._pedido.bicicleta.especialidad === especialidadesEnum.SPORT) {
                console.log("FEDERADO && SPORT --> descuento 10%");
                subtotal = subtotal - subtotal * 0.10;
                return subtotal;
            }
        }
        return 0;
    }
}
