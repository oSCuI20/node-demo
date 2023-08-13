import * as http   from 'http';
import db          from 'mongoose';

import config       from './config/index';
import {
  errorHandler, 
  apiErrorHandler 
}                   from './utils/error-handler';



export default class APPServer {
  
    constructor({app = undefined}) {
      this._app = app();

      this._app.use(app.json());      
      this._app.use(app.urlencoded({extended: false}));

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

    setMiddleware(middleware) {
      middleware(this._app);
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