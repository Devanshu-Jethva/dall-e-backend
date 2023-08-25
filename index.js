
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './db/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config();

const app = express();
// app.use(cors({
//     origin: 'http://localhost:5173'
// }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})
app.use(express.json());

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!');
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8000, () => {
            console.log(`server has started on port http://localhost:8000`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();