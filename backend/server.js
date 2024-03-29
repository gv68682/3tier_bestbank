
//require('dotenv').config()
import {} from 'dotenv/config'
import express from 'express'
const app = express()
import cors from 'cors'
import mongoose  from 'mongoose'
import authMiddleware from './middlewares/authenticateJWT.js'



import authRouter from './routes/auth.js';
import dataRouter from './routes/data.js';


const corsOptions = {
  origin: 'http://localhost:3000',
}

// mongoose
//   .connect(process.env.DB)
//   .then(connect => {
//     console.log(`Connected to Mongo! Database name: ${connect.connections[0].name}`)
//   })
//   .catch(err => console.log(err))

app.use(cors(corsOptions))
app.use(express.json())
//app.use(authMiddleware)
app.use(express.urlencoded({ extended: false }))


app.use('/auth', authRouter);
app.use('/data', authMiddleware, dataRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'index.html'));
});



app.listen(3001, () => console.log('Server listening on port 3001'))
