import Tarjeta from './Tarjeta';

export default class Pago {
    private tarjeta: Tarjeta;
    private conTarjeta: boolean;
    private fechaPago: string;
    private descuento: number;
    private saldo: number;

    constructor(
        tarjeta: Tarjeta,
        conTarjeta: boolean,
        fechaPago: string,
        descuento: number,
        saldo: number,
    ) {
        this.tarjeta = tarjeta;
        this.conTarjeta = conTarjeta;
        this.fechaPago = fechaPago;
        this.descuento = descuento;
        this.saldo = saldo;
    }

    /*create():void;
    read(): Pedido {
        return this;
    };
    update(): void {};
    descontar25():void{};
    descontar10():void{};*/
}
