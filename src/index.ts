import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv';
import {sequelize} from "./db";
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.get('/blog', (req:Request, res:Response) => {
    res.send('hello')
})

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