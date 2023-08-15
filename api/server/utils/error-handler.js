
const errorHandler = (error, request, response, next) => {
  
  console.log(error);

  let result = undefined;

  if (typeof error === 'object' && error.name === 'MongoError') {
    if (error.code === 11000) {
      let msg = [];
      for (let key in error.keyValue) {
        msg.push(`${key} '${error.keyValue[key]}' already exists`);
      }
      
      result = { status: 409, message: msg.join(',') };
    }
  }

  next(result ? result: error);
};

const apiErrorHandler = (error, request, response, next) => {
  response.locals.message = error.message;
  response.locals.error = error;
  
  error.status = error.status || 500;
  response
    .status(error.status || 500)
    .send(error);
};


export {
  errorHandler,
  apiErrorHandler
}
