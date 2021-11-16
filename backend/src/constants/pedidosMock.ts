import IPedido from "../interfaces/IPedido";
import {pagosMock} from "./pagosMock";
import {clientesFederadosMock} from "./clientesFederadosMock";
import {bicicletasMock} from "./bicicletasMock";
import {clientesComunesMock} from "./clientesComunesMock";
import Pedido from "../classes/Pedido";

export const pedidosMock: IPedido[] = [
    // fede && compet && "efectivo SI" [0]
    {
        bicicleta: bicicletasMock[0], //compet
        cantidad: 1,
        cliente: clientesFederadosMock[0], //fede
        datosPago: pagosMock[0],
        getTotalSinDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalSinDescuento();
        },
        getTotalConDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalConDescuento();
        },
    },
    // fede && compet && "efectivo NO" [1]
    {
        bicicleta: bicicletasMock[0], //compet
        cantidad: 1,
        cliente: clientesFederadosMock[0], //fede
        datosPago: pagosMock[1], //debito
        getTotalSinDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalSinDescuento();
        },
        getTotalConDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalConDescuento();
        },
    },
    // fede && sport [2]
    {
        bicicleta: bicicletasMock[1], //sport
        cantidad: 1,
        cliente: clientesFederadosMock[0], //fede
        datosPago: pagosMock[0],
        getTotalSinDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalSinDescuento();
        },
        getTotalConDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalConDescuento();
        },
    },
    // comun && sport [3]
    {
        bicicleta: bicicletasMock[1], //sport
        cantidad: 1,
        cliente: clientesComunesMock[0], //comun
        datosPago: pagosMock[0],
        getTotalSinDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalSinDescuento();
        },
        getTotalConDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalConDescuento();
        },
    },
    //extra 5 pedidos = 500.000
    {
        bicicleta: bicicletasMock[1], //sport
        cantidad: 1,
        cliente: clientesComunesMock[0], //comun
        datosPago: pagosMock[0],
        getTotalSinDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalSinDescuento();
        },
        getTotalConDescuento(): number {
            return new Pedido(this.cliente, this.datosPago, this.bicicleta, this.cantidad).getTotalConDescuento();
        },
    },
];
