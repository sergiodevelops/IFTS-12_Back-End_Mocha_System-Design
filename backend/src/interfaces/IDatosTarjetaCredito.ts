import IDatosTarjetaPago from "./IDatosTarjetaPago";

export default interface IDatosTarjetaCredito extends IDatosTarjetaPago{
    fechaVencimiento: string;
}
