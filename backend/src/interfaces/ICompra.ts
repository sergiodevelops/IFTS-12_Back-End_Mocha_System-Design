import IClienteFederado from "./IClienteFederado";
import IClienteComun from "./IClienteComun";
import IPedido from "./IPedido";

export default interface ICompra {
    cliente: IClienteFederado | IClienteComun;
    pedidos: IPedido[];
    conEnvio: boolean;
    pago: string;

    procesar():void;
}
