import express from 'express';

import APPServer  from './app-server';
import middleware from './middleware';
import router     from './router';


const server = new APPServer({app: express});

server.setMiddleware(middleware);
server.setRouter(router);
server.errorHandler();
server.listen();
server.connect();
