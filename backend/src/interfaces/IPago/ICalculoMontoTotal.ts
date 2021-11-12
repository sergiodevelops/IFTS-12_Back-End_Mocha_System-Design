import IPedido from "../ICompra/IPedido";

export default interface ICalculoMontoTotal {
    tipoDeCliente: string;
    formaDePago: string;
    especialidadBicicleta: string;
    pedidos: IPedido[];

    procesar():number
}
