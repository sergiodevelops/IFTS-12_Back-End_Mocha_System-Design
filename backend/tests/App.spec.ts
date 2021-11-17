import {equal} from "assert";
import {
    crearClienteComun,
    crearClienteFederado,
    crearTarjetaCredito,
    crearTarjetaDebito,
    crearDatosPago,
    crearCompra,
} from "../src/App";
import {bicicletasMock} from "../src/constants/bicicletasMock";
import {clientesFederadosMock} from "../src/constants/clientesFederadosMock";
import {pagosMock} from "../src/constants/pagosMock";
import {pedidosMock} from "../src/constants/pedidosMock";
import Compra from "../src/classes/Compra";
import Pedido from "../src/classes/Pedido";

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
                new Pedido(
                    clientesFederadosMock[0],
                    pagosMock[0],
                    bicicletasMock[0],
                    1,
                ).constructor.name,
                'Pedido',
                '\n' + objectDataTypeFails('Pedido')
            );
        });
        it(objectDataTypeDescribeMsg('Compra'), () => {
            equal(
                crearCompra(pedidosMock).constructor.name,
                'Compra',
                '\n' + objectDataTypeFails('Compra')
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

        it(validatorsDescribeMsg('Validador de Pedido'), () => {
            equal(
                typeof(new Pedido(
                        clientesFederadosMock[0],
                        pagosMock[0],
                        bicicletasMock[0],
                        1,
                    ).validar()),
                'boolean',
                '\n' + validatorsFails('boolean')
            );
        });

        it(validatorsDescribeMsg('Validadar que funcione bien cuando FALTA Stock para la bicicleta solicitada'), () => {
            // new StockBicicleta(bicicletasMock[0]);
            equal(
                new Pedido(
                    clientesFederadosMock[0],
                    pagosMock[0],
                    bicicletasMock[0],
                    100000000000000,
                ).validar(),
                false,
                '\n' + validatorsFails('false')
            );
        });
    });

    describe('Test correct operations of calculators', () => {
        const calculatorsDescribeMsg = (objectType: string) => {
            return (`when the "${objectType}" method is executed`)
        };
        const calculatorsFails = (resultType: number) => {
            return (`The expected calculated result is --> "${resultType}"`)
        };

        describe('Test correct operations when calculate "Monto total PEDIDO CON DESCUENTO and..."', () => {

            it(calculatorsDescribeMsg('...is "federado" && "compet" && "efectivo SI" [pedido mock 0]'), () => {
                // federado && compet && "efectivo SI" [pedido mock 0]
                const montoTotalCase0 = new Pedido(
                    pedidosMock[0].cliente,
                    pedidosMock[0].datosPago,
                    pedidosMock[0].bicicleta,
                    pedidosMock[0].cantidad,
                );
                const expectedResult = montoTotalCase0.getTotalSinDescuento() || 75000;
                equal(
                    montoTotalCase0.getTotalConDescuento(),
                    expectedResult,
                    '\n' + calculatorsFails(expectedResult)
                );
            });

            it(calculatorsDescribeMsg('...is "federado" && "compet" && "efectivo NO" [pedido mock 1]'), () => {
                // federado && compet && "efectivo NO" [pedido mock 1]
                const montoTotalCase1 = new Pedido(
                    pedidosMock[1].cliente,
                    pedidosMock[1].datosPago,
                    pedidosMock[1].bicicleta,
                    pedidosMock[1].cantidad,
                );
                const expectedResult = montoTotalCase1.getTotalSinDescuento() || 100000;
                equal(
                    montoTotalCase1.getTotalConDescuento(),
                    expectedResult,
                    '\n' + calculatorsFails(expectedResult)
                );
            });

            it(calculatorsDescribeMsg('...is "federado" && "sport" && "cualquier pago" [pedido mock 2]'), () => {
                // federado && sport [pedido mock 2]
                const montoTotalCase2 = new Pedido(
                    pedidosMock[2].cliente,
                    pedidosMock[2].datosPago,
                    pedidosMock[2].bicicleta,
                    pedidosMock[2].cantidad,
                );
                const expectedResult = montoTotalCase2.getTotalSinDescuento() || 90000;
                equal(
                    montoTotalCase2.getTotalConDescuento(),
                    expectedResult,
                    '\n' + calculatorsFails(expectedResult)
                );
            });

            it(calculatorsDescribeMsg('...is "comun" && "sport" && "cualquier pago" [pedido mock 3]'), () => {
                // comun && sport [pedido mock 3]
                const montoTotalCase3 = new Pedido(
                    pedidosMock[3].cliente,
                    pedidosMock[3].datosPago,
                    pedidosMock[3].bicicleta,
                    pedidosMock[3].cantidad,
                );
                const expectedResult = montoTotalCase3.getTotalSinDescuento() || 100000;
                equal(
                    montoTotalCase3.getTotalConDescuento(),
                    expectedResult,
                    '\n' + calculatorsFails(expectedResult)
                );
            });
        });

        describe('Test correct operations when calculate "Monto total COMPRA and..."', () => {
            //extra 5 pedidos = 500.000
            it(calculatorsDescribeMsg('...is "descuento NO APLICADO" [pedido mock]'), () => {
                // federado && compet && "efectivo SI" [pedido mock 0]
                const montoTotalCase0 = new Compra(pedidosMock);
                const expectedResult = 500000;
                equal(
                    montoTotalCase0.getTotalSinDescuento(),
                    expectedResult,
                    '\n' + calculatorsFails(expectedResult)
                );
            });

            it(calculatorsDescribeMsg('...is "descuento SI APLICADO" [pedido mock]'), () => {
                // federado && compet && "efectivo SI" [pedido mock 0]
                const montoTotalCase1 = new Compra(pedidosMock);
                const expectedResult = 500000;
                equal(
                    montoTotalCase1.getTotalConDescuento(),
                    expectedResult,
                    '\n' + calculatorsFails(expectedResult)
                );
            });
        });
    });
});
