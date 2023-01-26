const {Type} = require("../models/models");
const Functions = require('../functions/secondaryFunctions')
const ErrorHandler = require('../error/errorHandler')
/**
 * Контроллер для Типа.
 */
class TypeController {

    /**
     * Создание типа.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async create (req, res, next) {
        const {nameType} = req.body // req.body - позволяет получить доступ к параметру со стороны клиента.

        if (!(Functions.isString(nameType)) ||
            (Functions.isEmpty(nameType))) {
            return next(ErrorHandler.badRequest('Не верный параметр запроса.'))
        }

        const type = await Type.create({nameType})
        return res.json(type)
    }

    /**
     * Получение типа.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async getAll (req, res, next) {
        const types = await Type.findAll()

        if (Functions.isEmptyObject(types)) {
            return next(ErrorHandler.badRequest('Данный объект является пустым.'))
        }

        return res.json(types)
    }
}

module.exports = new TypeController()