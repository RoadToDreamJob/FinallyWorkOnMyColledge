const Router = require('express')
const routes = new Router()
const TypeController = require('../controllers/typeController')

routes.post('/', TypeController.create)
routes.get('/', TypeController.getAll)

module.exports = routes