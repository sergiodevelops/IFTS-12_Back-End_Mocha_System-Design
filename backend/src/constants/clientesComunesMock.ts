import IClienteComun from "../interfaces/IClienteComun";
import IClienteFederado from "../interfaces/IClienteFederado";
import {direccionesMock} from './direccionesMock'

export const clientesComunesMock: IClienteComun[] = [
    {
        nombre: "Sergio Ariel",
        apellido: "Juárez",
        dni: 34572333,
        fechaNacimiento: "08/02/1990",
        direccion: direccionesMock[0],
    },
    {
        nombre: "Sergio Ariel",
        apellido: "Juárez",
        dni: 31388722,
        fechaNacimiento: "08/02/1990",
        direccion: direccionesMock[1],
    },
    {
        nombre: "Danlois R.",
        apellido: "Tovar Tarazona",
        dni: 31388712,
        fechaNacimiento: "09/03/1992",
        direccion: direccionesMock[3],
    },
];
