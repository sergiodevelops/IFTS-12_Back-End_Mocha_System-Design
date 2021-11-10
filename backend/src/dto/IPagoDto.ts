import IBicicletaDto from "./IBicicletaDto";
import ITarjetaDto from "./ITarjetaDto";

export default interface IPagoDto {
    tarjeta: ITarjetaDto | undefined;
    fechaPago: string;
    descuento: number;
    saldo: number;
}
