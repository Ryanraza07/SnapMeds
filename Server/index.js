import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet'
import connectDB from './Config/connectDb.js';
import userRouter from './Routes/user.routes.js';
import categoryRouter from './Routes/Category.routes.js';
import uploadRouter from './Routes/uploadRouter.js';
import subCategoryRouter from './Routes/subCategory.routes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
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
app.use('/api/category',categoryRouter)
app.use('/api/file/',uploadRouter)
app.use('/api/subCategory',subCategoryRouter)

const PORT = process.env.PORT || 8000;
connectDB().then(()=>{
    app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

})
