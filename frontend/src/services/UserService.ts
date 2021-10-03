export default class UserService {
    private static readonly API_HOST: string = process.env.REACT_APP_API_HOST || "";
    private static readonly API_RESOURCE: string = "usuarios";

    private api_url: string;
    private headers: Headers;

    constructor() {
        this.api_url = `${UserService.API_HOST}`;
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');
    }

    public async signIn(username: string, password: string) {
        const url = `${this.api_url}/${UserService.API_RESOURCE}/signin`;

        const params = {
            method: "POST",                
            headers: this.headers,
            body: JSON.stringify({username, password})
        };

        const signInResult: any = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => {             
            console.log(error);
        });

        if (signInResult.errors) throw Error(signInResult.errors.details);

        return signInResult.data;
    }
}
