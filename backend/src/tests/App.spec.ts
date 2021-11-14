import {equal} from "assert";
import {
    crearClienteComun,
    crearClienteFederado, crearDatosPago,
    crearTarjetaCredito,
    crearTarjetaDebito,
} from "../App";

describe("Typescript usage suite", () => {
    it("should be able to execute a test", () => {
        equal(true, true);
    });
});

describe("Tests unitarios 'compra de bicicletas'", () => {

    describe("Tests 'creación de objetos'", () => {
        it("Test 'crear ClienteComun'", () => {
            equal(crearClienteComun().constructor.name, 'ClienteComun');
        });
        it("Test 'crear ClienteFederado'", () => {
            equal(crearClienteFederado().constructor.name, 'ClienteFederado');
        });
        it("Test 'crear DatosTarjetaDebito'", () => {
            equal(crearTarjetaDebito().constructor.name, 'DatosTarjetaDebito');
        });
        it("Test 'crear DatosTarjetaCredito'", () => {
            equal(crearTarjetaCredito().constructor.name, 'DatosTarjetaCredito');
        });
        it("Test 'crear DatosPago'", () => {
            equal(crearDatosPago().constructor.name, 'DatosPago');
        });
    });

    describe("Tests 'calculo descuentos'", () => {
        it("Test 'ssssssssss'", () => {
            equal(crearClienteComun().constructor.name, 'ClienteComun');
        });

    });
});