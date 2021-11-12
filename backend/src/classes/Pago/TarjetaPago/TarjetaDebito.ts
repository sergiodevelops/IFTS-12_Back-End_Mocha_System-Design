//responsabilidad: almacenar datos de tarjeta para el pago
import TarjetaPago from "./TarjetaPago";
import ITarjetaDebito
    from "../../../interfaces/IPago/ITarjetaPago/ITarjetaDebito";

export default class TarjetaDebito extends TarjetaPago implements ITarjetaDebito{
    constructor(numeroTarjeta: string) {
        super(numeroTarjeta);
    }
}
