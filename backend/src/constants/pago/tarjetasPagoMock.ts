import IDatosTarjetaCredito
    from "../../interfaces/IPago/ITarjetaPago/IDatosTarjetaCredito";
import IDatosTarjetaDebito from "../../interfaces/IPago/ITarjetaPago/IDatosTarjetaDebito";

export const tarjetasPagoMock: (IDatosTarjetaDebito | IDatosTarjetaCredito)[] = [
    {
        numeroTarjeta: "", //debito
    },
    {
        numeroTarjeta: "", //credito
        fechaVencimiento: "",
    },
];
