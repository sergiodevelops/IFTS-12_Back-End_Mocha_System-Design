import ITarjetaCredito
    from "../../interfaces/IPago/ITarjetaPago/ITarjetaCredito";
import ITarjetaDebito from "../../interfaces/IPago/ITarjetaPago/ITarjetaDebito";

export const tarjetasPagoMock: (ITarjetaDebito | ITarjetaCredito)[] = [
    {
        numeroTarjeta: "", //debito
    },
    {
        numeroTarjeta: "", //credito
        fechaVencimiento: "",
    },
];
