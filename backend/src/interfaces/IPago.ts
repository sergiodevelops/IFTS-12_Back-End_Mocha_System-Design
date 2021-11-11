import ITarjeta from "./ITarjeta";

export default interface IPago {
    metodo: string;
    tarjeta?: ITarjeta | undefined;
}
