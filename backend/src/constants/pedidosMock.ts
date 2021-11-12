import IPedido from "../interfaces/ICompra/IPedido";
import {bicicletasMock} from "./bicicleta/bicicletasMock";

export const pedidosMock: IPedido[] = [
    {
        bicicleta: bicicletasMock[0],//Competición
        cantidad: 5,
    },
    {
        bicicleta: bicicletasMock[1],//Sport
        cantidad: 3,
    },
    {
        bicicleta: bicicletasMock[2],//Común
        cantidad: 4,
    },
];
