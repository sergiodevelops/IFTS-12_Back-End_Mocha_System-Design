import BaseService from "./BaseService";

export default class TurnoService extends BaseService {
    private static readonly API_RESOURCE: string = "turnos";

    constructor() {
        super(TurnoService.API_RESOURCE);
    }
}
