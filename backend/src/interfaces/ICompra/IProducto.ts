import {bicicletasMock} from "../../constants/bicicleta/bicicletasMock";
import IBicicleta from "../IBicicleta/IBicicleta";

export default interface IProducto{
    bicicleta: IBicicleta,
    precio: number,
    stock: number,

}