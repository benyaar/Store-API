import express from 'express'
import * as dotenv from 'dotenv';
import {sequelize} from "./db";
import cors from 'cors';
import {router} from "./routes";
import multer from "multer";
import {fileFilter, fileStorage} from "./middleware/multerMiddleWare";
import path from "path";
import errorHandlerMiddleware from "./middleware/errorHandlingMiddleware";
dotenv.config()

const models = require('./models/models')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single("filedata"));
app.use(express.static(path.resolve(__dirname, '../static')))

app.use(errorHandlerMiddleware);

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