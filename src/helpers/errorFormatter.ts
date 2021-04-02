import { ValidationError } from "express-validator";

function errorFormatter({ msg }: ValidationError) {
  return `${msg}`;
}

export default errorFormatter;
