import ClienteComun from "./class/ClienteComun";
import ClienteFederado from "./class/ClienteFederado";
import IPedido from "./interface/IPedido";
import Bicicleta from "./class/Bicicleta";
import IBicicleta from "./interface/IBicicleta";
import Pedido from "./class/Pedido";
import IDireccion from "./interface/IDireccion";
import Direccion from "./class/Direccion";
import IClienteComunDto from "./dto/IClienteComunDto";
import IClienteFederadoDto from "./dto/IClienteFederadoDto";

class App {
}

console.log("armando el flujo e interacción entre clases");

function getCurrentStock() { // TODO ver este tema de stock
    return 50;
}
let pedidos: IPedido[] = [],
    currentClientCom: IClienteComunDto,
    currentClientFede: IClienteFederadoDto,
    currentDir: IDireccion,
    currentPedido: IPedido,
    currentBici: IBicicleta,
    hayStockDisponible: boolean = false,
    currentCantidadSolicitada: number = 0,
    currentStock: number; // TODO ver este tema de stock

// 1 registrar Cliente que hara la compra

// 1A solicita direccion
currentDir = new Direccion('Estrada', 2240, 'Centenario', 'Pergamino');
// 1B solicita tipo y crea
currentClientCom = new ClienteComun('nombre1', 'ape1', 'tipo1', '08/02/1990', 34572323, currentDir);
currentClientFede = new ClienteFederado('nombre2', 'ape2', 'tipo2', '08/02/1990', 34572323, 18253, 'Capos del rocket');

// 2 crear y acumular "pedidos" (a su vez cada pedido verifica si cantidad esta disponible en stock)
// currentStock = getCurrentStock() || 0; // TODO ver este tema de stock

// PEDIDO N°1
//crear bici
currentBici = new Bicicleta('marca1', 'modelo1', 'rodado1', 'tipo1', 'especialidad1');
// cargar cantidad solicitada
currentCantidadSolicitada = 5;
// verificar stock
hayStockDisponible = currentBici.stock > 0 && currentCantidadSolicitada <= currentBici.stock;
if(hayStockDisponible) {
    // SI hay stock crear cargar este pedido,
    currentPedido = new Pedido(currentBici,5);
    pedidos.push(currentPedido);
} else {
    // si NO hay stock limpiar avisar que no hay para este producto y cantidad elegidos)
    console.log(`No hay stock disponible para ${currentBici.marca} | ${currentBici.modelo} | ${currentBici.especialidad}`);
}

// carga pedido 2
currentBici = new Bicicleta('marca2', 'modelo2', 'rodado2', 'tipo2', 'especialidad2', currentStock);
hayStock = currentBici.stock > 0;

currentPedido = new Pedido(currentBici,3);
pedidos.push(currentPedido);

currentBici = new Bicicleta('marca3', 'modelo3', 'rodado3', 'tipo3', 'especialidad3', currentStock);
currentPedido = new Pedido(currentBici,4);
pedidos.push(currentPedido);

export default new App();
