import express from 'express';

import { UserController, UsersController } from '.';
import { ApiError } from './../../utils/api-error';

// Endpoints /users, /user, /user/:id
// TODO: manage response

module.exports = () => {
  const router = express.Router();

  router.get('/', async (request, response, next) => {
    try {
      const {page = 1, limit = 10} = request.query;
      const users = new UsersController({page: page, limit: limit});
      const result = await users.find();

      response.json({result: result, page: page, limit: limit});
    
    } catch (err) { next(err); }
  });


  router.get('/:id', async (request, response, next) => {
    try {
      const user = new UserController({username: request.params.id});
      const result = await user.select();

      response.json(result);
    
    } catch (err) { next(err); }
  });


  router.post('/', async (request, response, next) => {
    try {
      const user = new UserController({values: request.body});
      const result = await user.save();

      response.json(result);
    
    } catch (err) { next(err); }  
  });


  router.post('/:id', async (request, response, next) => {
    try {
      if (!request.headers.authorization) {
        throw new ApiError({status: 401});
      }

      const user = new UserController({username: request.params.id, values: request.body});
      const result = await user.update();

      response.json(result);

    } catch (err) { next(err); }
  });


  router.put('/:id', async (request, response, next) => {
    response.send('put');
  });


  router.delete('/:id', async (request, response, next) => {
    response.send('delete');
  });

  return router;
};