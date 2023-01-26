const {Brand} = require("../models/models");
const Functions = require('../functions/secondaryFunctions')
const ErrorHandler = require('../error/errorHandler')

/**
 * Контроллер для Бренда.
 */
class BrandController {

    /**
     * Создание бренда.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async create (req, res, next) {
        const {nameBrand} = req.body // req.body - позволяет получить доступ к параметру со стороны клиента.

        if (!(Functions.isString(nameBrand)) ||
             (Functions.isEmpty(nameBrand))) {
            return next(ErrorHandler.badRequest('Не верный параметр запроса.'))
        }

        const brand = await Brand.create({nameBrand})
        return res.json(brand)
    }

    /**
     * Получение брендов.
     * @param req - запрос.
     * @param res - ответ.
     * @param next - Передача управления следующему в цепочке Middleware.
     * @returns {Promise<void>} - Объект.
     */
    async getAll (req, res, next) {
        const brands = await Brand.findAll()

        if (Functions.isEmptyObject(brands)) {
            return next(ErrorHandler.badRequest('Данный объект является пустым.'))
        }

        return res.json(brands)
    }
}

module.exports = new BrandController()