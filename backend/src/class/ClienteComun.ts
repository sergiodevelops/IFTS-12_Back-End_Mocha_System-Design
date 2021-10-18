import Cliente from "./Cliente";
import Direccion from "./Direccion";

export default class ClienteComun extends Cliente {
    private direccion: Direccion;

    constructor(
        nombre: string,
        apellido: string,
        tipo: string,
        fechaNacimiento: string,
        dni: number,
        direccion: Direccion,
    ) {
        super(
            nombre,
            apellido,
            tipo,
            fechaNacimiento,
            dni,
        )
        this.direccion = direccion;
    }

    update(clienteComun: ClienteComun): void {
        this.update(clienteComun)
    };

    read(): ClienteComun {
        return this;
    };
}
