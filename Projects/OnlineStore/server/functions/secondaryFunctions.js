const jwt = require('jsonwebtoken')
/**
 * Вспомогательные функции.
 */
class SecondaryFunctions {

    /**
     * Проверять, является ли переменная "value" строкой.
     * @param value - параметр для проверки.
     * @returns {boolean} - true - строка / false - не строка.
     */
    static isString(value) {
        return ((typeof (value) === "string") ||
            (value instanceof String))
    }

    /**
     * Проверять, является ли переменная "value" пустой.
     * @param value - параметр для проверки.
     * @returns {boolean} - true - пустая / false - не пустая.
     */
    static isEmpty(value) {
        return value.trim() === ''
    }

    /**
     * Проверить, является ли объект пустым.
     * @param value - параметр для проверки.
     * @returns {boolean} - true - пустой, false - не пустой.
     */
    static isEmptyObject(value) {
        return !Object.keys(value).length
    }

    /**
     * Проверять, является ли переменная "value" числом.
     * @param value - параметр для проверки.
     * @returns {boolean} - true - число / false - не число.
     */
    static isNumber(value) {
        return (!isNaN(value))
    }

    /**
     * Генерация JWT-токена.
     * @param id - Идентификатор.
     * @param name - Имя пользователя.
     * @param email - Почта пользователя.
     * @param role - Роль пользователя.
     * @returns {*} - jwt-токен.
     */
    static generateJwt = (id, name, email, role) => {
        return jwt.sign ( // генерация jwt-токена

            // передача объектов с помощью деструктуризации для создания payload
            // payload - средняя часть jwt-token, где хранится json объект
            // с переданными значениями, в данном случае user.id, userEmail, roleUser
            {id, name, email, role},

            // секретный ключ для signature
            process.env.SECRET_KEY,
            // время жизни jwt-токена
            {
                expiresIn: '24h'
            }
        )
    }

    /**
     * Валидация почты. (a@a.a - не сработает).
     * @param email - почта.
     * @returns {boolean} - true - почта валидна / false - почта не валидна.
     */
    static validateEmail(email) {
        const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
        return regex.test(email)
    }

    /**
     * Валидация пароля.
     * Пароль должен содержать:
     * 1) Как минимум одну строчную букву.
     * 2) Как минимум одну заглавную букву.
     * 3) Как минимум одну цифру.
     * 4) Размер пароля должен быть от 8 до 15 символов.
     * 5) Раскладка исключительно латиницей.
     * @param password
     * @returns {boolean}
     */
    static validatePassword(password) {
        const regex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return regex.test(password)
    }

}

module.exports = SecondaryFunctions