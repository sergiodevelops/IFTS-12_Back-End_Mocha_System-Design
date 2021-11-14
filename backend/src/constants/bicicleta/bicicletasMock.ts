import IBicicleta from "../../interfaces/IBicicleta/IBicicleta";
import {especialidadesEnum} from "./especialidadesEnum";

export const bicicletasMock: IBicicleta[] = [
    // COMPETICION MTB
    {
        especialidad: especialidadesEnum.COMPETICION,
        marca: "Marca 1",
        modelo: "Modelo 1",
        rodado: "28",
        tipo: "MTB",
        precio: 45366,
    },
    // SPORT Ruta
    {
        especialidad: especialidadesEnum.SPORT,
        marca: "Marca 2",
        modelo: "Modelo 2",
        rodado: "28",
        tipo: "Ruta",
        precio: 45366,
    },
    // COMUN Triatlon
    {
        especialidad: especialidadesEnum.COMUN,
        marca: "Marca 3",
        modelo: "Modelo 3",
        rodado: "28",
        tipo: "Triatlon",
        precio: 45366,
    },
    // COMUN Playera
    {
        especialidad: especialidadesEnum.COMUN,
        marca: "Marca 4",
        modelo: "Modelo 4",
        rodado: "28",
        tipo: "Playera",
        precio: 45366,
    },
];
