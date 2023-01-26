const Router = require('express')
const routes = new Router()
const authMiddleware = require('../middleware/authMiddleware') // авторизирован ли пользователь?
const UserController = require('../controllers/userController')

routes.post('/registration', UserController.registration)
routes.post('/login', UserController.login)
routes.get('/auth', authMiddleware, UserController.check)

module.exports = routes