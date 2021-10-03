export default class Notification {
    public key: string;
    public type: string;
    public title: string;
    public message: string;
    public dismissed: boolean;

    constructor(type: string, title: string, message: string) {
        this.key = Math.floor((new Date().getTime() + Math.random())).toString();
        this.type = type;
        this.title = title;
        this.message = message;
        this.dismissed = false;
    }  
}
