//responsabilidad: calcular descuento segun condiciones
import ICalculoMontoTotal from "../../interfaces/IPago/ICalculoMontoTotal";
import IPedido from "../../interfaces/ICompra/IPedido";
import {especialidadesEnum} from "../../constants/bicicleta/especialidadesEnum";
import {tiposDeClienteEnum} from "../../constants/cliente/tiposDeClienteEnum";
import PrecioBicicleta from "../Bicicleta/PrecioBicicleta";
import {formasDePagoEnum} from "../../constants/pago/formasDePagoEnum";

export default class CalculoMontoTotal implements ICalculoMontoTotal {
    private _tipoDeCliente: string;
    private _formaDePago: string;
    private _especialidadBicicleta: string;
    private _pedidos: IPedido[];

    constructor(tipoDeCliente: string, formaDePago: string, especialidadBicicleta: string, pedidos: IPedido[]) {
        this._tipoDeCliente = tipoDeCliente;
        this._formaDePago = formaDePago;
        this._especialidadBicicleta = especialidadBicicleta;
        this._pedidos = pedidos;
    }

    get tipoDeCliente(): string {
        return this._tipoDeCliente;
    }

    set tipoDeCliente(value: string) {
        this._tipoDeCliente = value;
    }

    get formaDePago(): string {
        return this._formaDePago;
    }

    set formaDePago(value: string) {
        this._formaDePago = value;
    }

    get especialidadBicicleta(): string {
        return this._especialidadBicicleta;
    }

    set especialidadBicicleta(value: string) {
        this._especialidadBicicleta = value;
    }

    get pedidos(): IPedido[] {
        return this._pedidos;
    }

    set pedidos(value: IPedido[]) {
        this._pedidos = value;
    }

    public procesar = () => {
        let subTotalCompet: number = 0,
            subTotalSport: number = 0,
            subTotalOtros: number = 0;
        //filtra por COMPETICION
        this._pedidos
            .filter((pedido) =>
                pedido.bicicleta.especialidad === especialidadesEnum.COMPETICION)
            //acumula subtotales de pedidos COMPETICION
            .map((pedido) => {
                const precioBicicleta = new PrecioBicicleta(pedido.bicicleta)
                subTotalSport += (pedido.cantidad * precioBicicleta.precio)
            });
        //filtra por SPORT
        this._pedidos
            .filter((pedido) =>
                pedido.bicicleta.especialidad === especialidadesEnum.SPORT)
            //acumula subtotales de pedidos SPORT
            .map((pedido) => {
                const precioBicicleta = new PrecioBicicleta(pedido.bicicleta)
                subTotalCompet += (pedido.cantidad * precioBicicleta.precio)
            });
        //filtra por EL RESTO de bicis
        this._pedidos
            .filter((pedido) =>
                pedido.bicicleta.especialidad !== especialidadesEnum.COMPETICION
                &&
                pedido.bicicleta.especialidad !== especialidadesEnum.SPORT)
            //acumula subtotales de EL RESTO de pedidos
            .map((pedido) => {
                const precioBicicleta = new PrecioBicicleta(pedido.bicicleta)
                subTotalOtros += (pedido.cantidad * precioBicicleta.precio)
            });

        if(tiposDeClienteEnum.FEDERADO){
            if(this._formaDePago === formasDePagoEnum.EFECTIVO){
                subTotalCompet *= 0.25;
            }
            subTotalSport *= 0.10;
        }
        return(subTotalCompet+subTotalSport+subTotalOtros);
    }
}
