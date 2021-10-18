export default class Bicicleta {
    private marca: string;
    private modelo: string;
    private rodado: string;
    private tipo: string;
    private especialidad: string;
    private stock: number;

    constructor(
        marca: string,
        modelo: string,
        rodado: string,
        tipo: string,
        especialidad: string,
        stock: number,
    ) {
        this.marca = marca;
        this.modelo = modelo;
        this.rodado = rodado;
        this.tipo = tipo;
        this.especialidad = especialidad;
        this.stock = stock;
    }

    read(): Bicicleta {
        return this;
    };
}
