import ITarjetaPago from "./ITarjetaPago/ITarjetaPago";

export default interface IPago {
    formaDePago: string;
    tarjeta?: ITarjetaPago | undefined;
}
