//responsabilidad: almacenar datos para hacer la compra
import IPedido from "../interfaces/IPedido";
import ICompra from "../interfaces/ICompra";

export default class Compra implements ICompra {
    private _pedidos: IPedido[];
    private _conEnvio?: boolean | undefined;

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

    public getTotalSinDescuento(): number {
        let montoTotalSinDescuento = 0;
        this._pedidos.forEach((pedido: IPedido) => {
            montoTotalSinDescuento += pedido.getTotalSinDescuento();
        });
        return montoTotalSinDescuento;
    }

    public getTotalConDescuento(): number {
        let montoTotalConDescuento = 0;
        this._pedidos.forEach((pedido: IPedido) => {
            montoTotalConDescuento += pedido.getTotalConDescuento();
        });
        return montoTotalConDescuento;
    }

    public imprimir = () => {
        if (!!this._pedidos.length) {
            this._pedidos.forEach((pedido: IPedido, index: number) => {
                console.log(`
                Pedido << ${index + 1} >>`)
                console.log(`Cliente: "${pedido.cliente.constructor.name}"`);
                console.log(`Bici: "${pedido.bicicleta.especialidad}"`);
                console.log(`Cantidad: "${pedido.cantidad}"`);
                console.log(`Forma de pago: "${pedido.datosPago.formaDePago}"
                `);
                console.log(`Total pedido ${index + 1} "SIN" descuento = ${pedido.getTotalSinDescuento().toFixed(2)}`);
                console.log(`Total pedido ${index + 1} "CON" descuento = ${pedido.getTotalConDescuento().toFixed(2)}`);
            });
            console.log(`
Total de pedidos hechos fueron --> "${this._pedidos.length}"`);
            console.log("monto Total de la COMPRA Sin Descuento", this.getTotalSinDescuento().toFixed(2));
            console.log("monto Total de la COMPRA Con Descuento", this.getTotalConDescuento().toFixed(2));
        } else {
            console.log('No existen pedidos cargados aun para hacer la compra');
        }
        return (!!this._pedidos.length);
    }; //  muestra datos actualizados de compra actual

    public procesar = (pedidos: IPedido[], conEnvio?: boolean | undefined): boolean => {
        console.log('...procesando compra')
        this._pedidos = pedidos;
        this._conEnvio = !!conEnvio;
        !!pedidos.length ?
            console.log('La compra ha sido procesada con exito'):
            console.log('La compra no pudo ser procesada, intente nuevamente mas tarde');
        return (!!pedidos.length);
    }; // procesa la compra FICTICIO no real
}
