/**
 * Класс для списка кодов состояния HTTP.
 */
class ErrorHandler extends Error {

    /**
     * Контруктор класса.
     * @param status - статус-код.
     * @param message - сообщение об ошибке.
     */
    constructor(status, message) {
        super();

        this.message = message
        this.status = status
    }

    /**
     * "Не найдено".
     * Сервер не может найти запрашиваемый ресурс.
     * @param message - сообщение.
     * @returns {Error} - Объект с сообщением об ошибки.
     */
    static notFound(message) {
        return new ErrorHandler(404, message)
    }

    /**
     * "Не авторизованно".
     * Для получения запрашиваемого ответа нужна аутентификация.
     * @param message - сообщение.
     * @returns {Error} - Объект с сообщением об ошибки.
     */
    static unauthorized(message) {
        return new ErrorHandler(401, message)
    }

    /**
     * "Запрещено".
     * У клиента нет прав доступа к содержимому,
     * поэтому сервер отказывается дать надлежащий ответ.
     * @param message - сообщение.
     * @returns {Error} - Объект с сообщением об ошибки.
     */
    static forbidden(message) {
        return new ErrorHandler(403, message)
    }

    /**
     * "Плохой запрос".
     * Сервер не понимает запрос из-за неверного синтаксиса.
     * @param message
     * @returns {ErrorHandler}
     */
    static badRequest(message) {
        return new ErrorHandler(400, message)
    }

    /**
     * "Внутренняя ошибка сервера".
     * Сервер столкнулся с ошибкой,
     * которую не знает как обработать.
     * @param message
     */
    static internal(message) {
        return new ErrorHandler(500, message)
    }
}

module.exports = ErrorHandler
