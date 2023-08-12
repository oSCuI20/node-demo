import express from 'express';

import APPServer from './app-server';
import router    from './router';


const server = new APPServer(express());

server.setRouter(router);
server.errorHandler();
server.listen();
server.connect();
