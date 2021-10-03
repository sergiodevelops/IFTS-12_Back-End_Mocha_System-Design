import BaseService from "./BaseService";

export default class MateriaService extends BaseService {
    private static readonly API_RESOURCE: string = "materias";

    constructor() {
        super(MateriaService.API_RESOURCE);
    }
}
