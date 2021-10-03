import BaseService from "./BaseService";

export default class CorrelativaService extends BaseService {
    private static readonly API_RESOURCE: string = "correlativas";

    constructor() {
        super(CorrelativaService.API_RESOURCE);
    }

    public async createBulk(carreraMateriaId: number, correlativas: any) {
        const url = `${this.getApiUrl()}/${this.getResource()}/${carreraMateriaId}`;

        const params = {
            method: "POST",                
            headers: this.getHeaders(),
            body: JSON.stringify(correlativas)
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
