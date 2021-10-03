import BaseService from "./BaseService";

export default class DocenteService extends BaseService {
    private static readonly API_RESOURCE: string = "docentes";

    constructor() {
        super(DocenteService.API_RESOURCE);
    }
}
