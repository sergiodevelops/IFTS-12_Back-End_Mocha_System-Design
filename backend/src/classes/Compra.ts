//responsabilidad: almacenar datos para hacer la compra
import IPedido from "../interfaces/IPedido";
import ICompra from "../interfaces/ICompra";

export default class Compra implements ICompra {
    private _pedidos: IPedido[];
    private _conEnvio?: boolean;

    constructor(pedidos: IPedido[], conEnvio?: boolean) {
        this._pedidos = pedidos;
        this._conEnvio = conEnvio ? conEnvio : false;
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

    public actualizar = () => {return false}; // muestra datos actualizados de compra actual
    public procesar = () => {return false}; // procesa la compra
}
