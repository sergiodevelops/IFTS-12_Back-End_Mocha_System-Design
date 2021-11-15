import assert, {equal} from "assert";
import {
    crearClienteComun,
    crearClienteFederado,
    crearTarjetaCredito,
    crearTarjetaDebito,
    crearDatosPago,
    validacionPedido, crearPedido,
} from "../src/App";
import {bicicletasMock} from "../src/constants/bicicletasMock";
import {clientesFederadosMock} from "../src/constants/clientesFederadosMock";
import {pagosMock} from "../src/constants/pagosMock";

describe("Typescript usage suite", () => {
    it("should be able to execute a test", () => {
        equal(true, true);
    });
});

describe("Unit tests for purchasing bicycles", () => {

    describe('Test to return a correct data type', () => {
        const objectDataTypeDescribeMsg = (objectType: string) => {
            return (`when the "${objectType}" object is created`)
        };
        const objectDataTypeFails = (objectType: string) => {
            return (`The expected data type is a "${objectType}"`)
        };

        it(objectDataTypeDescribeMsg('ClienteComun'), () => {
            equal(
                crearClienteComun().constructor.name,
                'ClienteComun',
                '\n' + objectDataTypeFails('ClienteComun')
            );
        });
        it(objectDataTypeDescribeMsg('ClienteFederado'), () => {
            equal(
                crearClienteFederado().constructor.name,
                'ClienteFederado',
                '\n' + objectDataTypeFails('ClienteFederado')
            );
        });
        it(objectDataTypeDescribeMsg('TarjetaDebito'), () => {
            equal(
                crearTarjetaDebito().constructor.name,
                'TarjetaDebito',
                '\n' + objectDataTypeFails('TarjetaDebito')
            );
        });
        it(objectDataTypeDescribeMsg('TarjetaCredito'), () => {
            equal(
                crearTarjetaCredito().constructor.name,
                'TarjetaCredito',
                '\n' + objectDataTypeFails('TarjetaCredito')
            );
        });
        it(objectDataTypeDescribeMsg('DatosPago'), () => {
            equal(
                crearDatosPago().constructor.name,
                'DatosPago',
                '\n' + objectDataTypeFails('DatosPago')
            );
        });
        it(objectDataTypeDescribeMsg('Pedido'), () => {
            equal(
                crearPedido(
                    clientesFederadosMock[0],
                    pagosMock[0],
                    bicicletasMock[0],
                    1,
                ).constructor.name,
                'Pedido',
                '\n' + objectDataTypeFails('Pedido')
            );
        });
    });

    describe('Test correct operations of validators', () => {
        const validatorsDescribeMsg = (objectType: string) => {
            return (`when the "${objectType}" method is executed`)
        };
        const validatorsFails = (objectType: string) => {
            return (`The expected validation result is a "${objectType}"`)
        };

        it(validatorsDescribeMsg('validacionPedido'), () => {
            equal(
                typeof(validacionPedido(bicicletasMock[0],1)),
                'boolean',
                '\n' + validatorsFails('boolean')
            );
        });
    })
});
