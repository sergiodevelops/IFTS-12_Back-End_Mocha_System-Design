import ITarjetaDebito from "./ITarjetaPago/ITarjetaDebito";
import ITarjetaCredito from "./ITarjetaPago/ITarjetaCredito";

export default interface IDatosPago {
    formaDePago: string;
    tarjeta?: undefined | ITarjetaDebito | ITarjetaCredito;
}
