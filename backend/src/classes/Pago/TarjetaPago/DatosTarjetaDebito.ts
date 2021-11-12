//responsabilidad: almacenar datos de tarjeta para el pago
import DatosTarjetaPago from "./DatosTarjetaPago";
import IDatosTarjetaDebito
    from "../../../interfaces/IPago/ITarjetaPago/IDatosTarjetaDebito";

export default class DatosTarjetaDebito extends DatosTarjetaPago implements IDatosTarjetaDebito{
    constructor(numeroTarjeta: string) {
        super(numeroTarjeta);
    }
}
