const ErrorHandler = require('../error/errorHandler')
const jwt = require('jsonwebtoken')

/**
 * Middleware на проверку авторизирован ли пользователь или нет.
 * @param req - запрос.
 * @param res - ответ.
 * @param next - Передача управления следующему в цепочке Middleware.
 */
module.exports = function (req, res, next) {
    if (req.methods === 'OPTIONS') { // так как для OPTIONS authorization не нужно, мы пропускаем его
        next()
    }

    try {

        /*
         * Тут происходит проверка валидности токена.
         * Обычно токены помещают в Header Authorization и хранят его в следующем формате: <тип токена> <токен>
         * Чтобы выцепить именно токен мы делаем split и берем первый элемент массива.
         * Пример: Bearer fnIDFIUndersign378
         * */

        const token = req.headers.authorization.split(' ')[1]
        if (!(token)) {
            return next(ErrorHandler.unauthorized("Данный пользователь не авторизирован."))
        }

        const decoded_token = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded_token // TODO
        next() // TODO

    } catch (e) {
        return next(ErrorHandler.unauthorized("Данный пользователь не авторизирован."))
    }
}