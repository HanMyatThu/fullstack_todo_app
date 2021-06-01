import Express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log(e);
  }
};

dotenv.config();
connectDb();

const app = new Express();

//importing middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use(helmet());
app.use(cors());


//welcome
app.get('/', (req,res) => {
    res.send({
        'message': "Welcome to my api"
    });
})

//import Routes
import { userRoute }  from './src/routes/index.js';

app.use('/api',userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    console.log('localhost is connected to port '+ PORT);
}); 