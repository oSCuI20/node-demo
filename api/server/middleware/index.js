import morgan      from 'morgan';
import helmet      from 'helmet';
import cors        from 'cors';
import jwt         from 'jsonwebtoken';

import config   from './../config';
import ApiError from './../utils/api-error';


export default function middleware(app) {
  app.use(morgan('dev'));

  app.use(helmet({
    xPoweredBy: true,
    strictTransportSecurity: {
      maxAge: 86400,
      includeSubDomains: false,
    },
    contentSecurityPolicy: true,
    xXssProtection: true,
  }));

  app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    preflightContinue: false,
  }));

  /*
   * Redirect 301 when trailing slash at end
   */
  app.use('/', async function(request, response, next) {
    if (request._parsedUrl.pathname.slice(-1) === '/') {
      let redirect = request._parsedUrl.pathname.slice(0, -1);
      if (request._parsedUrl.search) {
        redirect += request._parsedUrl.search;
      }

      response.redirect(301, redirect);
      return ;
    }
    
    next();
  });

  /*
   * Allowed http methods
   */
  app.use('/', async function(request, response, next) {
    try {
      if (['GET', 'PUT', 'POST', 'DELETE'].indexOf(request.method) < 0) {
        throw new ApiError({status: 405});
      }
  
      next();
    } catch (err) { next(err); }
  });

  /*
   * Authorization middleware
   */
  app.use(config.app.authorization, async function(request, response, next) {
    try {
      if (config.app.authorization.indexOf(request.originalUrl) >= 0) {
        if (typeof request.headers.authorization === 'undefined') {
          throw new ApiError({status: 401});
        }
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, config.app.jwt_secret);
      }
      next();
    } catch (err) { 
      let stack = err;
      if (!(err instanceof ApiError)) {
        stack = new ApiError({status: 403});
        stack.stack = err;
      }
      next(stack); 
    }
  });
}