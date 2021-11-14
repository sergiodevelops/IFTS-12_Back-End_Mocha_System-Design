import IDatosTarjetaDebito from "./IDatosTarjetaDebito";
import IDatosTarjetaCredito from "./IDatosTarjetaCredito";

export default interface IDatosPago {
    formaDePago: string;
    tarjeta?: boolean | IDatosTarjetaDebito | IDatosTarjetaCredito;
}
