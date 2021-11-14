//responsabilidad: calcular descuento segun condiciones
import ICalculoMontoTotal from "../../interfaces/IPago/ICalculoMontoTotal";
import IPedido from "../../interfaces/ICompra/IPedido";
import {tiposDeClienteEnum} from "../../constants/cliente/tiposDeClienteEnum";
import {especialidadesEnum} from "../../constants/bicicleta/especialidadesEnum";
import {formasDePagoEnum} from "../../constants/pago/formasDePagoEnum";

export default class CalculoMontoTotal implements ICalculoMontoTotal {
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
                this._pedido.datosPago.formaDePago === formasDePagoEnum.EFECTIVO){
                console.log("FEDERADO y EFECTIVO y COMPETICION");
                subtotal = subtotal - subtotal*0.25;
                return subtotal;
            }
            if (this._pedido.bicicleta.especialidad === especialidadesEnum.SPORT){
                console.log("FEDERADO y SPORT");
                subtotal = subtotal - subtotal*0.10;
                return subtotal;
            }
        }
        return 0;
    }
}
