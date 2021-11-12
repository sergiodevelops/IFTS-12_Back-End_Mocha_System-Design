export default interface IDireccionEnvio {
    ciudad: string;
    barrio: string;
    calle: string;
    altura: number;
    piso?: string | undefined;
    dpto?: string | undefined;
}
