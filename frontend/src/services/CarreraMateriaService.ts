export default class CarreraMateriaService {
    private static readonly API_HOST: string = process.env.REACT_APP_API_HOST || "";
    private static readonly API_RESOURCE: string = "carreras_materias";

    private api_url: string;
    private headers: Headers;

    constructor() {
        this.api_url = `${CarreraMateriaService.API_HOST}`;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }

    public async list() {
        const url = `${this.api_url}/${CarreraMateriaService.API_RESOURCE}`;

        const params = {
            method: "GET",                
            headers: this.headers,
        };

        const results: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (results.errors) throw Error(results.errors.details);

        return results.data;
    }

    public async read(id: number) {
        const url = `${this.api_url}/${CarreraMateriaService.API_RESOURCE}/${id}`;

        const params = {
            method: "GET",                
            headers: this.headers,
        };

        const results: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (results.errors) throw Error(results.errors.details);

        return results.data;
    }

    public async delete(carreraMateriaId: any) {
        const url = `${this.api_url}/${CarreraMateriaService.API_RESOURCE}/${carreraMateriaId}`;

        const params = {
            method: "DELETE",                        
            headers: this.headers,
        };

        const results: any = await fetch(url, params)
        .catch((error) => { 
            console.log(error);
        });
        
        if (results.status >= 400) throw Error("Error");

        return results;
    }

    public async create(carreraMateria: any) {
        const url = `${this.api_url}/${CarreraMateriaService.API_RESOURCE}`;

        const params = {
            method: "POST",                
            headers: this.headers,
            body: JSON.stringify(carreraMateria)
        };

        const results: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (results.errors) throw Error(results.errors.details);

        return results.data;
    }
    
    public async listByQuery(query: any) {
        const url = `${this.api_url}/${CarreraMateriaService.API_RESOURCE}?carrera_id=${query.carrera_id}`;

        const params = {
            method: "GET",                
            headers: this.headers,
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
