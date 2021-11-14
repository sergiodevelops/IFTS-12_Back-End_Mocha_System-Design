import IBicicleta from "../interfaces/IBicicleta";
import {especialidadesEnum} from "./especialidadesEnum";
import IStockBicicleta from "../interfaces/IStockBicicleta";
import IPrecioBicicleta from "../interfaces/IPrecioBicicleta";
import {bicicletasMock} from "./bicicletasMock";
import IProducto from "../interfaces/IProducto";

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
