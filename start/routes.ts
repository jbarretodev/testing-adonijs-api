/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.group(() => {
    //router's user
    Route.group(() => {
      Route.post('/', 'UsersController.createUser')
      Route.get('/', 'UsersController.getAllUsers').middleware('auth')
      Route.get('/:email', 'UsersController.getUserByEmail')
      Route.get('/:id', 'UsersController.getUserById')
      Route.delete('/:id', 'UsersController.deleteUser')
      Route.put('/:id', 'UsersController.updateUser')
      Route.patch('/:id', 'UsersController.changePassword')
    }).prefix('user')

    //auth's routes
    Route.group(() => {
      Route.post('/login', 'AuthController.authentication')
      Route.get('/logout', 'AuthController.logout').middleware('auth')
    }).prefix('auth')
  }).prefix('v1')
}).prefix('api')
