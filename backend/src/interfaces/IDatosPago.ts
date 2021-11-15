import ITarjetaDebito from "./ITarjetaDebito";
import ITarjetaCredito from "./ITarjetaCredito";

export default interface IDatosPago {
    formaDePago: string;
    tarjeta?: boolean | ITarjetaDebito | ITarjetaCredito;
}
