import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from './routes';

class App {
	private app: express.Application;

    private static readonly APP_PORT: number = 3000;  

    constructor() {
		this.initServer();
		this.listenServer();
	}
	
	private initServer(): void {
		this.app = express();

		this.app.use(bodyParser.json());
		this.app.use(cors());
		this.app.use(bodyParser.urlencoded({
			extended: true
		}));

		this.app.use('/api', router);

		this.app.get('/', function(req, res){
			res.send('Hello World!')
		});
	}

	private listenServer(): void {
		this.app.listen(App.APP_PORT, () => console.info(`Server started on *:${App.APP_PORT}`));		
	}
}

export default new App();
