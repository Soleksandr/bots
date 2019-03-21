require('dotenv').config()
const { Storage } = require('./services/Storage')

Storage.init()

const { app } = require('./app');

const { PORT } = process.env

app.listen(PORT)

console.log(`Server running on port ${PORT}`);