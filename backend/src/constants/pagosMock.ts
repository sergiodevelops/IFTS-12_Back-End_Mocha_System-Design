import IDatosPago from "../interfaces/IDatosPago";
import {tarjetasDebitoMock} from "./tarjetasDebitoMock";
import {formasDePagoEnum} from "./formasDePagoEnum";

export const pagosMock: IDatosPago[] = [
    {
        formaDePago: formasDePagoEnum.EFECTIVO,
        tarjeta: undefined
    },
    {
        formaDePago: formasDePagoEnum.DEBITO,
        tarjeta: tarjetasDebitoMock[0]
    },
    {
        formaDePago: formasDePagoEnum.CREDITO,
        tarjeta: tarjetasDebitoMock[1]
    },
];
