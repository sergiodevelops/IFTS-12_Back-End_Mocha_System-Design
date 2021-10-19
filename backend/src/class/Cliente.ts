import ICliente from "../interfaces/ICliente";

export default class Cliente implements ICliente {
    private nombre: string;
    private apellido: string;
    private tipo: string;
    private fechaNacimiento: string;
    private dni: number;

    constructor(
        nombre: string,
        apellido: string,
        tipo: string,
        fechaNacimiento: string,
        dni: number,
    ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipo = tipo;
        this.fechaNacimiento = fechaNacimiento;
        this.dni = dni;
    }

    read(): Cliente{return this};
}
