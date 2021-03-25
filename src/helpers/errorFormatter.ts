import { ValidationError } from 'express-validator';

const errorFormatter = ({ msg }: ValidationError): string => {
	return `${msg}`;
};

export default errorFormatter;
