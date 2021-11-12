import IBicicleta from "../../interfaces/IBicicleta/IBicicleta";
import {especialidadesEnum} from "./especialidadesEnum";
import IStockBicicleta from "../../interfaces/IBicicleta/IStockBicicleta";
import IPrecioBicicleta from "../../interfaces/IBicicleta/IPrecioBicicleta";
import {bicicletasMock} from "./bicicletasMock";
import IProducto from "../../interfaces/ICompra/IProducto";

export const productosMock: IProducto[] = [
    {
        bicicleta: bicicletasMock[0],
        precio: 35200,
        stock: 5,
    },
    {
        bicicleta: bicicletasMock[1],
        precio: 41300,
        stock: 21,
    },
    {
        bicicleta: bicicletasMock[2],
        precio: 46800,
        stock: 22,
    },
    {
        bicicleta: bicicletasMock[3],
        precio: 51355,
        stock: 23,
    },
];
