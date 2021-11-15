//responsabilidad: almacenar datos para hacer la compra
import IPedido from "../interfaces/IPedido";
import ICompra from "../interfaces/ICompra";
import CalculoMontoTotal from "./CalculoMontoTotal";

export default class Compra implements ICompra {
    private _pedidos: IPedido[];
    private _conEnvio?: boolean;

    constructor(pedidos: IPedido[], conEnvio?: boolean) {
        this._pedidos = pedidos;
        this._conEnvio = !!conEnvio;
    }

    get pedidos(): IPedido[] {
        return this._pedidos;
    }

    set pedidos(value: IPedido[]) {
        this._pedidos = value;
    }

    get conEnvio(): boolean {
        return !!this._conEnvio;
    }

    set conEnvio(value: boolean) {
        this._conEnvio = value;
    }

    public imprimir = () => {
        if (!!this._pedidos.length) {
            let totalCompra = 0, totalCompraConDescuento = 0;
            this._pedidos.forEach((pedido: IPedido, index: number) => {
                const calculoMontoTotal = new CalculoMontoTotal(pedido)
                const totPedido = calculoMontoTotal.procesar();
                totalCompra += totPedido;
                const totPedidoConDescuento = calculoMontoTotal.procesarConDescuento();
                totalCompraConDescuento += totPedidoConDescuento;
                console.log(`
Pedido ${index + 1}: 
Bici "${pedido.bicicleta.especialidad}" | Cantidad "${pedido.cantidad}"
Total pedido = ${totPedido.toFixed(2)}`);
                console.log(totPedidoConDescuento ? `Total pedido CON DESCUENTO! = ${totPedidoConDescuento.toFixed(2)}` : '-----no se aplica descuentos-----');
                console.log(totPedido - totPedidoConDescuento > 0 ? `Se aplico un descuento de $${(totPedido - totPedidoConDescuento).toFixed(2)} (pesos argentinos)` : '');
            });

            console.log(`
*******************************
Compra: TOTAL con y sin descuento
*******************************`);

            console.log(`Total compra sin descuento = ${totalCompra}`);
            totalCompraConDescuento && console.log(`Total compra CON DESCUENTO! = ${totalCompraConDescuento}`);
        } else {
            console.log('No existen pedidos cargados aun para hacer la compra');
        }
        return (!!this._pedidos.length);
    }; //  muestra datos actualizados de compra actual

    public procesar = (pedidos: IPedido[], conEnvio?: boolean): boolean => {
        console.log()
        this._pedidos = pedidos;
        this._conEnvio = !!conEnvio;
        !!pedidos.length ?
            console.log('La compra ha sido procesada con exito')
            :
            console.log('La compra no pudo ser procesada, intente nuevamente mas tarde');
        return (!!pedidos.length);
    }; // procesa la compra
}
