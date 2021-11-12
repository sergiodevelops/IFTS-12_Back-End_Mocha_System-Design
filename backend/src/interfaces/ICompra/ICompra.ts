import IClienteFederado from "../ICliente/IClienteFederado";
import IClienteComun from "../ICliente/IClienteComun";
import IPedido from "./IPedido";

export default interface ICompra {
    cliente: IClienteFederado | IClienteComun;
    pedidos: IPedido[];
    conEnvio: boolean;
    pago: string;

    procesar():void;
}
