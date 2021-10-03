import BaseService from "./BaseService";

export default class CursoAlumnoService extends BaseService {
    private static readonly API_RESOURCE: string = "cursos_alumnos";
    private static readonly HOST: string = process.env.REACT_APP_API_HOST || "";

    private url: string;
    private headers_url: Headers;

    constructor() {
        super(CursoAlumnoService.API_RESOURCE);

        this.url = `${CursoAlumnoService.HOST}`;
        this.headers_url = new Headers();
        this.headers_url.set('Content-Type', 'application/json');
    }

    public async listByQuery(query: any) {
        const url = `${this.url}/${this.getResource()}?curso_id=${query.curso_id}`;

        const params = {
            method: "GET",                
            headers: this.headers_url,
        };

        const results: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (results.errors) throw Error(results.errors.details);

        return results.data;
    }
}
