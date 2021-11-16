import IBicicleta from "./IBicicleta";
import IClienteComun from "./IClienteComun";
import IClienteFederado from "./IClienteFederado";
import IDatosPago from "./IDatosPago";

// lo que solicita el cliente (item y cantidad)
export default interface IPedido {
    cliente: IClienteComun | IClienteFederado,
    datosPago: IDatosPago,
    bicicleta: IBicicleta,
    cantidad: number,
}
