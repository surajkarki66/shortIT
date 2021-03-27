import path from 'path';
import express from 'express';
import { Application } from 'express';

import logger from './utils/logger';
import apiErrorHandler from './errors/apiErrorHandler';
import userRoutes from './routes/user';

class App {
	private app: Application;
	private host: string;
	private port: number;

	constructor(appInit: { port: number; host: string; middleWares: any }) {
		this.app = express();
		this.port = appInit.port;
		this.host = appInit.host;

		this.middlewares(appInit.middleWares);
		this.routes();
	}
	private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
		middleWares.forEach((middleWare) => {
			this.app.use(middleWare);
		});
	}
	private routes() {
		// Static routes
		this.app.use('/uploads', express.static(path.join(__dirname + '/../public/uploads')));

		// Normal Routes
		this.app.use('/api/users', userRoutes);

		// Error Handler Route
		this.app.use(apiErrorHandler);
	}

	public listen(): void {
		this.app.listen(this.port, () => {
			logger.info(`Server listening on ${this.host}:${this.port}.`);
		});
	}
}

export default App;
