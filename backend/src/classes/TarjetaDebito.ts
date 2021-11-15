//responsabilidad: almacenar datos de tarjeta para el pago
import Tarjeta from "./Tarjeta";
import ITarjetaDebito
    from "../interfaces/ITarjetaDebito";

export default class TarjetaDebito extends Tarjeta implements ITarjetaDebito{
    constructor(numeroTarjeta: string) {
        super(numeroTarjeta);
    }
}
