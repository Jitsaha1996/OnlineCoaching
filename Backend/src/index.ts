import express from "express";
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

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
import studentsRoutes from "./routers/studentsRoutes";
import teachersRoutes from "./routers/teachersRoutes";
// const workoutRoutes = require('./routes/workoutRoutes');
// const busSeatRoutes = require('./routes/busSeatRoutes');
// const announcementRoutes = require('./routes/announcementRoutes');
// const budgetRoutes = require('./routes/budgetRoutes');
// budgetRoutes
const { notFound, errorHandler } = require('./middleweres/errorHandlingMiddlewere');
dotenv.config();
connectDb();
app.use(express.json());





const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Node.js API with Swagger",
            version: "1.0.0",
            description: "API documentation for student and teacher management",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./src/routers/*.ts"], // Ensure correct relative path
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/students/', studentsRoutes);
app.use('/api/teachers/', teachersRoutes);
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
  