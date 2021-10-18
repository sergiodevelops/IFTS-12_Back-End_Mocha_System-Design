import Cliente from "./Cliente";

export default class ClienteFederado extends Cliente {
    private matricula: number;
    private agrupacion: string;

    constructor(
        nombre: string,
        apellido: string,
        tipo: string,
        fechaNacimiento: string,
        dni: number,
        matricula: number,
        agrupacion: string,
    ) {
        super(
            nombre,
            apellido,
            tipo,
            fechaNacimiento,
            dni,
        )
        this.matricula = matricula;
        this.agrupacion = agrupacion;
    }

    update(clienteFederado: ClienteFederado): void {
        this.update(clienteFederado)
    };

    read(): ClienteFederado {
        return this;
    };
}
