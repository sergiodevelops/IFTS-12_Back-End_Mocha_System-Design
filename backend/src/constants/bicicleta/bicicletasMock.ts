import IBicicleta from "../../interfaces/IBicicleta/IBicicleta";
import {especialidadesEnum} from "./especialidadesEnum";

export const bicicletasMock: IBicicleta[] = [
    {
        especialidad: especialidadesEnum.COMPETICION,
        marca: "Marca 1",
        modelo: "Modelo 1",
        rodado: "28",
        tipo: "MTB"
    },
    {
        especialidad: especialidadesEnum.SPORT,
        marca: "Marca 2",
        modelo: "Modelo 2",
        rodado: "28",
        tipo: "Ruta"
    },
    {
        especialidad: especialidadesEnum.COMUN,
        marca: "Marca 3",
        modelo: "Modelo 3",
        rodado: "28",
        tipo: "Triatlon"
    },
    {
        especialidad: "Común",
        marca: "Marca 4",
        modelo: "Modelo 4",
        rodado: "28",
        tipo: "Playera"
    },
];
