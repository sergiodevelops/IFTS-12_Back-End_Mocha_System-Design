import IClienteComun from "../../interfaces/ICliente/IClienteComun";
import IClienteFederado from "../../interfaces/ICliente/IClienteFederado";
import {direccionesMock} from './direccionesMock'

export const tarjetasPagoMock: (IClienteComun | IClienteFederado)[] = [
    {
        apellido: "",
        dni: 0,
        fechaNacimiento: "",
        nombre: "",

        matricula: 0,
        agrupacion: "",
    },
    {
        apellido: "",
        dni: 0,
        fechaNacimiento: "",
        nombre: "",

        direccion: direccionesMock[0],
    },
];
