import Bicicleta from "./Bicicleta";

export default class Pedido {
    private id: string;
    private bicicleta: Bicicleta;
    private cantidad: number;

    constructor(
        id: string,
        bicicleta: Bicicleta,
        cantidad: number,
    ) {
        this.id = id;
        this.bicicleta = bicicleta;
        this.cantidad = cantidad;
    }
    /*create():void;
    read(): Pedido {
        return this;
    };
    update(): void {};
    delete():void{};*/
}
