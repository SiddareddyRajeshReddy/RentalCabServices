import express from 'express'
import cors from 'cors'
import router from './routers/AuthRouter.js'
import connectDB from './config/db.js';
import driverRouter from './routers/driverRouter.js';
const app = express()
const port = 3000
connectDB()
app.use(cors())
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' })); 
app.use(router)
app.use('/driver', driverRouter)
app.get('/', (req, res)=>{
    res.send('Hello World!')
})

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)  
})