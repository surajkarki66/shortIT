import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
	keepAlive: true,
	socketTimeoutMS: 3000,
	connectTimeoutMS: 3000,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;

const NODE_ENV = process.env.NODE_ENV;
const CLIENT_URL = process.env.CLIENT_URL;
const DATABASE = process.env.database;

const MONGO = {
	host: MONGO_HOST,
	password: MONGO_PASSWORD,
	username: MONGO_USERNAME,
	options: MONGO_OPTIONS,
	url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${DATABASE}`,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT,
};

const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL;

const config = {
	mongo: MONGO,
	server: SERVER,
	env: NODE_ENV,
	url: CLIENT_URL,
	db: DATABASE,
	jwtSecret: JWT_SECRET,
	baseUrl: BASE_URL,
};

export default config;
