//responsabilidad: calcular descuento segun condiciones
import IPedido from "../../interfaces/ICompra/IPedido";
import IUnificadorPedidos from "../../interfaces/IPago/IUnificadorPedidos";
import {especialidadesEnum} from "../../constants/bicicleta/especialidadesEnum";

export default class UnificadorPedidos implements IUnificadorPedidos {
    private _pedidos: IPedido[];

    constructor(
        pedidos: IPedido[],
    ) {
        this._pedidos = pedidos;
    }

    get pedidos(): IPedido[] {
        return this._pedidos;
    }

    set pedidos(value: IPedido[]) {
        this._pedidos = value;
    }

    public getGroupList(): IPedido[][] {
        // let subTotalSport = 0;
        const sportGroup = this._pedidos
            .filter((pedido)=>
            pedido.bicicleta.especialidad === especialidadesEnum.SPORT)
            // .map((pedido)=> {
            //     const precioBicicleta = new PrecioBicicleta(pedido.item)
            //     subTotalSport += (pedido.cantidad * precioBicicleta.precio)
            // });

        // let subTotalCompet = 0;
        const competGroup = this._pedidos
            .filter((pedido)=>
            pedido.bicicleta.especialidad === especialidadesEnum.SPORT)
            // .map((pedido)=> {
            //     const precioBicicleta = new PrecioBicicleta(pedido.item)
            //     subTotalCompet += (pedido.cantidad * precioBicicleta.precio)
            // });

        // let subTotalOtros = 0;
        const otrosGroup = this._pedidos
            .filter((pedido)=>
            pedido.bicicleta.especialidad === especialidadesEnum.SPORT)
            // .map((pedido)=> {
            //     const precioBicicleta = new PrecioBicicleta(pedido.item)
            //     subTotalOtros += (pedido.cantidad * precioBicicleta.precio)
            // });

        return ([sportGroup,competGroup,otrosGroup]);
    }

}
