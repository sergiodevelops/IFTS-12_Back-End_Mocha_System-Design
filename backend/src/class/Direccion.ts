import Cliente from "./Cliente";

export default class Direccion {
    private calle: string;
    private altura: number;
    private barrio: string;
    private ciudad: string;

    constructor(
        calle: string,
        altura: number,
        barrio: string,
        ciudad: string,
    ) {
        this.calle = calle;
        this.altura = altura;
        this.barrio = barrio;
        this.ciudad = ciudad;
    }

    create(): void {};
    read(): Direccion {
        return this;
    };
    update(direccion: Direccion): void {
        this.update(direccion)
    };
    delete(): void {};
}
