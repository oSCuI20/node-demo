import morgan      from 'morgan';
import helmet      from 'helmet';
import cors        from 'cors';

import config from "./../config";



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

  app.options('/*', async (request, response, next) => {
    if (!(request.method in ['GET', 'PUT', 'POST', 'DELETE'])) {
      console.log(`request method is ${request.method}`);
    }
  });
}