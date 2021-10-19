import Cliente from "./Cliente";

export default class Tarjeta {
    private esCredito: boolean;
    private numero: number;
    private vencimiento: string;

    constructor(
        esCredito: boolean,
        numero: number,
        vencimiento: string,
    ) {
        this.esCredito = esCredito;
        this.numero = numero;
        this.vencimiento = vencimiento;
    }

    /*create():void;
    read(): Pedido {
        return this;
    };
    update(): void {};
    delete():void{};*/
}
