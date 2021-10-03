export default class EvaluacionService {
    private static readonly API_HOST: string = process.env.REACT_APP_API_HOST || "";
    private static readonly API_RESOURCE: string = "evaluaciones";

    private api_url: string;
    private headers: Headers;

    constructor() {
        this.api_url = `${EvaluacionService.API_HOST}`;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }

    public async createBulk(evaluaciones: any) {
        const url = `${this.api_url}/${EvaluacionService.API_RESOURCE}/bulk`;

        const params = {
            method: "POST",                
            headers: this.headers,
            body: JSON.stringify(evaluaciones)
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
