import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet'
import connectDB from './Config/connectDb.js';
import userRouter from './Routes/user.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
   crossOriginResourcePolicy:false
}))


app.get('/', (req, res) => {
  res.json({ message: "Server is running " });
});

app.use('/api/user',userRouter)

const PORT = process.env.PORT || 8000;
connectDB().then(()=>{
    app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

})
