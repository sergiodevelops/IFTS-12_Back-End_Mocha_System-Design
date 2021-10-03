import BaseService from "./BaseService";

export default class CarreraService extends BaseService {
    private static readonly API_RESOURCE: string = "carreras";

    constructor() {
        super(CarreraService.API_RESOURCE);
    }
}
