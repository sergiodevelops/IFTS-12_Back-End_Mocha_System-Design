//responsabilidad: informar precio de bicicleta deseada
import IBicicleta from "../../interfaces/IBicicleta/IBicicleta";
import IPrecioBicicleta from "../../interfaces/IBicicleta/IPrecioBicicleta";
import {productosMock} from "../../constants/bicicleta/productosMock";

export default class PrecioBicicleta implements IPrecioBicicleta {
    private _bicicleta: IBicicleta;
    private _precio: number;

    constructor(
        bicicleta: IBicicleta,
    ) {
        this._bicicleta = bicicleta;
        this._precio = productosMock.find((bici)=>
            bici.bicicleta === this._bicicleta)?.precio || 0;
    }

    get bicicleta(): IBicicleta {
        return this._bicicleta;
    }

    set bicicleta(value: IBicicleta) {
        this._bicicleta = value;
    }

    get precio(): number {
        return this._precio;
    }

    set precio(value: number) {
        this._precio = value;
    }

    public getCurrentStock=()=>{
        this._precio = productosMock.find((bici)=>bici.bicicleta === this._bicicleta)?.precio || 0;
    }
}
