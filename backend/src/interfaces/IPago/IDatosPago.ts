import IDatosTarjetaDebito from "./ITarjetaPago/IDatosTarjetaDebito";
import IDatosTarjetaCredito from "./ITarjetaPago/IDatosTarjetaCredito";

export default interface IDatosPago {
    formaDePago: string;
    tarjeta?: boolean | IDatosTarjetaDebito | IDatosTarjetaCredito;
}
