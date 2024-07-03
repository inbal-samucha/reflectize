import { CustomError } from "./CustomError";

export default class ServerError extends CustomError {
  private static readonly _statusCode = 500;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: {[key: string]: any}

  constructor(params?: {code?: number, message?: string, logging?: boolean, context?: {[key:string]: any}}){
    const { code, message, logging } = params || {};

    super(message || 'Internal Server Error');
    this._code = code || ServerError._statusCode;
    this._logging = logging || false;
    this._context = params?.context || {}; 

    Object.setPrototypeOf(this, ServerError.prototype);
  }

  get errors(){
    return [{ message: this.message, context: this._context}];
  }

  get logging(){
    return this._logging;
  }

  get statusCode(){
    return this._code;
  }
}