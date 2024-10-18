import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/database';
import dotenv from 'dotenv';
import logger from './utils/logger';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger/config';


const specs = swaggerJsDoc(swaggerOptions);


dotenv.config();
connectDB();

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use(errorHandler);

export default app;
