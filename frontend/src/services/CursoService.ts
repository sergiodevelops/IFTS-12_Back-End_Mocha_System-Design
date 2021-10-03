import BaseService from "./BaseService";

export default class CursoService extends BaseService {
    private static readonly API_RESOURCE: string = "cursos";

    constructor() {
        super(CursoService.API_RESOURCE);
    }

    public async getEvaluaciones() {
        const url = `${this.getApiUrl()}/${this.getResource()}/evaluaciones/all`;

        window.open(url, '_blank');
    }

    public async getEvaluacionesByCurso(cursoId: any) {
        const url = `${this.getApiUrl()}/${this.getResource()}/evaluaciones/${cursoId}`;

        window.open(url, '_blank');
    }
}
