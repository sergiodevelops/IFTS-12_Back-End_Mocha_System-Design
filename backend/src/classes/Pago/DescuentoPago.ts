//responsabilidad: calcular descuento segun condiciones
import IPedido from "../../interfaces/ICompra/IPedido";
import IDescuentoPago from "../../interfaces/IPago/IDescuentoPago";
import {formasDePagoEnum} from "../../constants/pago/formasDePagoEnum";
import {especialidadesEnum} from "../../constants/bicicleta/especialidadesEnum";

export default class DescuentoPago implements IDescuentoPago {

    private _pedidos: IPedido[];
    private _formaDePago: string;
    private _customerType: string;
    // private _subtotalesDescuento: { filtros: []; subTotalDescuento: number }; //TODO
    private _totalDescuento: number;

    constructor(
        pedidos: IPedido[],
        formaDePago: string,
        customerType: string,
    ) {
        this._pedidos = pedidos;
        this._formaDePago = formaDePago;
        this._customerType = customerType;
    }

    get pedidos(): IPedido[] {
        return this._pedidos;
    }

    set pedidos(value: IPedido[]) {
        this._pedidos = value;
    }

    get customerType(): string {
        return this._customerType;
    }

    set customerType(value: string) {
        this._customerType = value;
    }

    get formaDePago(): string {
        return this._formaDePago;
    }

    set formaDePago(value: string) {
        this._formaDePago = value;
    }

    /*
     get subtotales(): { filtros: []; subTotalDescuento: number } {
     return this._subtotales;
     }

     set subtotales(value: { filtros: []; subTotalDescuento: number }) {
     this._subtotales = value;
     }
     */

    get totalDescuento(): number {
        return this._totalDescuento;
    }

    set totalDescuento(value: number) {
        this._totalDescuento = value;
    }

    public getTotalWithDiscount(): number {
        if (!!this.pedidos && this.customerType === 'ClienteFederado') {
            //agrupa por cada tipo de variante a lista
            const reducer = (acumValue:any, currValue:any) => acumValue + currValue;
            const subTotalCompeticion = this.pedidos
                .map((pedido: IPedido)=> {
                        if(pedido.bicicleta.especialidad === especialidadesEnum.COMPETICION &&
                        this.formaDePago === formasDePagoEnum.EFECTIVO) {
                            // return(pedido.cantidad*pedido.bicicleta.precio)
                        }
                    }
                )
                .reduce(reducer);
        }
        return 0;
    }

    public updateTotalWithDiscount = (
        currentPedidos: IPedido[],
        newMetodoPago?: string
    ): number => {
        this._pedidos = currentPedidos;
        this._formaDePago = !!newMetodoPago ? newMetodoPago : this._formaDePago;
        return 0;
    }
}
