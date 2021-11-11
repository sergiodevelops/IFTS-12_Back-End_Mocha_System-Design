import ITarjeta from "./ITarjeta";

export default interface IPago {
    formaDePago: string;
    tarjeta?: ITarjeta | undefined;
}
