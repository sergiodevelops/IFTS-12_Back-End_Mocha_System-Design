import IBicicleta from "../../interfaces/IBicicleta/IBicicleta";
import {especialidadesEnum} from "./especialidadesEnum";
import IStockBicicleta from "../../interfaces/IBicicleta/IStockBicicleta";
import IPrecioBicicleta from "../../interfaces/IBicicleta/IPrecioBicicleta";
import {bicicletasMock} from "./bicicletasMock";
import IProducto from "../../interfaces/ICompra/IProducto";

export const productosMock: IProducto[] = [
    {
        item: bicicletasMock[0],
        stock: 5,
    },
    {
        item: bicicletasMock[1],
        stock: 21,
    },
    {
        item: bicicletasMock[2],
        stock: 22,
    },
    {
        item: bicicletasMock[3],
        stock: 23,
    },
];
