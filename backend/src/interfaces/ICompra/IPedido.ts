import IBicicleta from "../IBicicleta/IBicicleta";
import IClienteComun from "../ICliente/IClienteComun";
import IClienteFederado from "../ICliente/IClienteFederado";
import IDatosPago from "../IPago/IDatosPago";

// lo que solicita el cliente (item y cantidad)
export default interface IPedido {
    cliente: IClienteComun | IClienteFederado;
    datosPago: IDatosPago;
    bicicleta: IBicicleta;
    cantidad: number;
}
