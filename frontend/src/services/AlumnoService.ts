import BaseService from "./BaseService";

export default class AlumnoService extends BaseService {
    private static readonly API_RESOURCE: string = "alumnos";

    constructor() {
        super(AlumnoService.API_RESOURCE);
    }
}
