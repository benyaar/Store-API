import express from 'express'
import * as dotenv from 'dotenv';
import {sequelize} from "./db";
import cors from 'cors';
import {router} from "./routes";
import {errorHandlingMiddleware} from "./middleware/errorHandlingMiddleware";
dotenv.config()

const models = require('./models/models')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)


app.use(errorHandlingMiddleware)

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {console.log(`server start on port ${PORT}`)})

    } catch (e) {
        console.log(e)
    }
}
start()