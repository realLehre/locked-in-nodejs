import express from "express";
import 'dotenv/config'

import jobRoutes from './job-board/job-board-routes/jobs-routes.js'
import notFound from "./task-manager/taskMiddlewares/task-route-not-found.js";
import './task-manager/taskDb/connection.js'
import connectToDb from "./task-manager/taskDb/connection.js";
import errorHandler from "./utils/error-handler.js";

const app = express()
app.use(express.json());

app.use('/api/v1/jobs', jobRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = 8080;

const start = async () => {
    try{
        await connectToDb(process.env.MONGO_URI).then(() => console.log('connected to db'))
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`)
        })
    } catch {
        console.log('connection error')
    }
}

start();
