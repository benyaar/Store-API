import multer, {FileFilterCallback} from "multer";
import {Request} from "express";
import path from "path";
import {v4 as uuidv4}  from "uuid";

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const fileStorage = multer.diskStorage({
    destination (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ) {
        callback(null, path.resolve(__dirname, '../../static'))
    },

    filename(
        req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
    ) {
        const fileName = uuidv4() + file.originalname
        callback(null, fileName)
    }
})

export const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

export const multerMiddleware = multer({ storage: fileStorage, fileFilter: fileFilter })