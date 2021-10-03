export default class BaseService {
    private static readonly API_HOST: string = process.env.REACT_APP_API_HOST || "";

    private api_url: string;
    private headers: Headers;
    private resource: string;

    constructor(resource: string) {
        this.resource = resource;
        this.api_url = `${BaseService.API_HOST}`;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }

    public getApiUrl() {
        return this.api_url;
    }

    public getResource() {
        return this.resource;
    }
    
    public getHeaders() {
        return this.headers;
    }

    public async list() {
        const url = `${this.api_url}/${this.getResource()}`;

        const params = {
            method: "GET",                
            headers: this.headers,
        };

        const results: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });
        
        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return [];
        }

        return results.data;
    }

    public async create(baseModel: any) {
        const url = `${this.api_url}/${this.getResource()}`;

        const params = {
            method: "POST",                
            headers: this.headers,
            body: JSON.stringify(baseModel)
        };

        const results: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return null;
        }

        return results.data;
    }

    public async read(baseModelId: number) {
        const url = `${this.api_url}/${this.getResource()}/${baseModelId}`;

        const params = {
            method: "GET",                
            headers: this.headers,
        };

        const results: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return null;
        }
        
        return results.data;
    }

    public async delete(baseModelId: number) {
        const url = `${this.api_url}/${this.getResource()}/${baseModelId}`;

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

    public async update(baseModelId: number, baseModel: any) {
        const url = `${this.api_url}/${this.getResource()}/${baseModelId}`;

        const params = {
            method: "PUT",                
            headers: this.headers,
            body: JSON.stringify(baseModel)
        };

        const results: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return null;
        }
        
        return results.data;
    }
}
