const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const routes = require('./src/routes/routes');

const port = process.env.PORT || 3000;

// Middleware для обработки статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Middleware для обработки JSON и URL-кодированных данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключение маршрутов
app.use('/', routes);

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
