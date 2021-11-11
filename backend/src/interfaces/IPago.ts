import IBicicleta from "./IBicicleta";
import ITarjeta from "./ITarjeta";

export default interface IPago {
    metodoPago: string;
    tarjeta?: ITarjeta | undefined;
}
