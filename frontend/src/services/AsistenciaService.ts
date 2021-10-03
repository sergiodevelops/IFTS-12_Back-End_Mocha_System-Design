export default class AsistenciaService {
    private static readonly API_HOST: string = process.env.REACT_APP_API_HOST || "";
    private static readonly API_RESOURCE: string = "asistencias";

    private api_url: string;
    private headers: Headers;

    constructor() {
        this.api_url = `${AsistenciaService.API_HOST}`;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }

    public async createBulk(asistencias: any) {
        const url = `${this.api_url}/${AsistenciaService.API_RESOURCE}/bulk`;

        const params = {
            method: "POST",                
            headers: this.headers,
            body: JSON.stringify(asistencias)
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
