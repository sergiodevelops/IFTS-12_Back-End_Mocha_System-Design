import IClienteFederadoDto from "./IClienteFederadoDto";
import IClienteComunDto from "./IClienteComunDto";
import IPedidoDto from "./IPedidoDto";

export default interface ICompraDto {
    cliente: IClienteFederadoDto | IClienteComunDto;
    pedido: IPedidoDto;
    conEnvio: boolean;
    pago: string;
}
