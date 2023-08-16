import createError from 'http-errors';


export default class ApiError {
  constructor({status = 0}) {
    const result = createError(status ? status: 404);    
    this.status  = result.status;
    this.message = result.message;
    this.stack   = result;
  }

};