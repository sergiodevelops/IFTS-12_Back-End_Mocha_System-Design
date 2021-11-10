export default class Tarjeta {
    private _esCredito: boolean;
    private _numero: number;
    private _vencimiento: string;

    constructor(esCredito: boolean, numero: number, vencimiento: string) {
        this._esCredito = esCredito;
        this._numero = numero;
        this._vencimiento = vencimiento;
    }

    get esCredito(): boolean {
        return this._esCredito;
    }

    set esCredito(value: boolean) {
        this._esCredito = value;
    }

    get numero(): number {
        return this._numero;
    }

    set numero(value: number) {
        this._numero = value;
    }

    get vencimiento(): string {
        return this._vencimiento;
    }

    set vencimiento(value: string) {
        this._vencimiento = value;
    }
}
