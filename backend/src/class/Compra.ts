import Bicicleta from './Bicicleta';
import Cliente from './Cliente';
import ClienteFederado from './ClienteFederado';
import ClienteComun from './ClienteComun';
import Pedido from './Pedido';

export default class Compra {
    private cliente: ClienteFederado | ClienteComun;
    private pedido: Pedido;
    private conEnvio: boolean;
    private pago: string;

    constructor(
        cliente: ClienteFederado | ClienteComun,
        pedido: Pedido,
        conEnvio: boolean,
        pago: string,
    ) {
        this.cliente = cliente;
        this.pedido = pedido;
        this.conEnvio = conEnvio;
        this.pago = pago;
    }

    /*create():void;
    read(): Compra {
        return this;
    };
    update(): void {};
    delete():void{};*/
}
