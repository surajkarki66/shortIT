import mongoose from 'mongoose';

import config from '../configs/config';
import logger from './logger';

const connectDB = async (): Promise<void> => {
	try {
		const result = await mongoose.connect(config.mongo.url, config.mongo.options);
		if (result) {
			logger.info(`MongoDB Connected: ${result.connection.host}`);
		}
	} catch (error) {
		logger.error('Server', error.message, error);
	}
};
export default connectDB;
