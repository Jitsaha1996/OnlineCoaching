import express from "express";
const cors = require('cors');

var bodyParser = require('body-parser');
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

const dotenv=require('dotenv');
import connectDb from './config/db'
import userRoutes from './routers/userRoutes'
// const workoutRoutes = require('./routes/workoutRoutes');
// const busSeatRoutes = require('./routes/busSeatRoutes');
// const announcementRoutes = require('./routes/announcementRoutes');
// const budgetRoutes = require('./routes/budgetRoutes');
// budgetRoutes
const { notFound, errorHandler } = require('./middleweres/errorHandlingMiddlewere');
dotenv.config();
connectDb();
app.use(express.json());

app.use('/api/usersts', userRoutes);
// app.use('/api/workouts', workoutRoutes);
// app.use('/api/busseatdetals', busSeatRoutes);
// app.use('/api/announcement', announcementRoutes);
// app.use('/api/budget', budgetRoutes);


app.use(notFound);
app.use(errorHandler);
const PORT=process.env.PORT||5000;
app.listen(PORT, () => {
    console.log(`Server is started at the port of ${PORT}`);
  });
  