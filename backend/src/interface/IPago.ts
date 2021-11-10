import IBicicleta from "./IBicicleta";
import ITarjeta from "./ITarjeta";

export default interface IPago {
    tarjeta: ITarjeta | undefined;
    fechaPago: string;
    descuento: number;
    saldo: number;
}
