import express from 'express';

import UserController from '.';


const router = express.Router();


router.post('/', async (request, response, next) => {
  const user = new UserController(request.body)
  try {
    const result = await user.save();
    response.send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }  
});


router.post('/:id', async (request, response, next) => {
  response.send('test');
});


router.get('/:id', async (request, response, next) => {
  const user = new UserController({username: request.params.id});
  const result = await user.select()
  response.send(result);
});


router.put('/:id', async (request, response, next) => {
  response.send('put');
});


router.delete('/:id', async (request, response, next) => {
  response.send('delete');
});


module.exports = router;