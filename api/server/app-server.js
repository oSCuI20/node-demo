import express     from 'express';
import helmet      from 'helmet';
import cors        from 'cors';
import * as http   from 'http';
import createError from 'http-errors';
import morgan      from 'morgan';
import db          from 'mongoose';

import config       from './config/index';
import {
  errorHandler, 
  apiErrorHandler 
}                   from './utils/error-handler';



export default class APPServer {
  
    constructor(app) {
      this._app = app;

      this._app.use(helmet({
        xPoweredBy: true,
        strictTransportSecurity: {
          maxAge: 86400,
          includeSubDomains: false,
        },
        contentSecurityPolicy: true,
        xXssProtection: true,
      }));
      this._app.use(morgan('dev'));
      this._app.use(express.json());      
      this._app.use(express.urlencoded({extended: false}));
      this._app.use(cors({
        allowedHeaders: ["Content-Type", "Token", "Authorization"],
        exposedHeaders: ["Token", "Authorization"],
        origin: "*",
        methods: ["GET, HEAD, PUT, PATCH, POST, DELETE"],
        preflightContinue: false,
      }));
    }
    
    async connect() {
      await db.connect(
        `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.name}`,
        config.mongodb.options,
        connected => console.info('database connection successful'),
        disconnected => console.info('database disconnect sucessful'),
        error => console.error(error),
      );
    }

    setRouter(endpoints) {
      endpoints(this._app);
    }

    errorHandler() {
      this._app.use(errorHandler);
      this._app.use(apiErrorHandler);
    }
  
    listen() {
      const _server = http.createServer(this._app);
      _server.listen(config.app.port);
      _server.on('error', (error) => {
        if (error.syscall !== 'listen') {
          throw error;
        }
  
        let bind = typeof port === 'string' 
          ? `Pipe ${config.app.port}` 
          : `Port ${config.app.port}`
        
        let message = undefined;
        switch (error.code) {
          case 'EACCES':
            message = `${bind} requires elevated privileges`;
            break;
          case 'EADDRINUSE':
            message = `${bind} is already in use`;
            break;        
        }
  
        if (message) {
          console.error(message);
          process.exit(1);
        }
  
        throw error;
      });
      
      _server.on('listening', () => {
        const addr = _server.address();
        const bind = typeof addr === 'string' 
          ? `pipe ${addr}`
          : `port ${addr.port}`
        
        console.info(`server listening on ${bind}`);
      });
    }
  };