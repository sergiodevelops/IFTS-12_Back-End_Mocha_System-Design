import ITarjetaPago from "./ITarjetaPago/ITarjetaPago";
import ITarjetaDebito from "./ITarjetaPago/ITarjetaDebito";
import ITarjetaCredito from "./ITarjetaPago/ITarjetaCredito";

export default interface IPago {
    formaDePago: string;
    tarjeta?: undefined | ITarjetaDebito | ITarjetaCredito;
}
