require('dotenv').config()
const express = require('express')
const sequelize = require('./database/db') // конфигураторы подключения
const models = require('./models/models')
const cors = require('cors') // возможность для браузера производить GET / POST - запросы
const routes = require('./routes/routes')
const errorHandler = require('./middleware/errorHandlerMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json()) // возможность нашему приложению парсить JSON-формат
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', routes)


/**
 * Данный Middleware ОБЯЗАН БЫТЬ ПОСЛЕДНИМ из списка подключенных Middlewares,
 * так как он работает с ошибками и в случае его работы,
 * работоспособность приложения прекразается.
 */
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message: "WORK"})
})

const start = async () => {
    try {
        await sequelize.authenticate() // подключение к Базе Данных
        await sequelize.sync() // "превращает код в таблицы Базы Данных и т.п."
        app.listen(PORT, () => console.log(`Server starter on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();
