import express from 'express';
import {PORT} from './utils/config.js';
import schoolRoutes from './routes/school.route.js';

const app = express();
const port = PORT || 3000;

//bodyparser middleware
app.use(express.urlencoded({extended: false}));

//Routes
app.use("/api/v1/schools", schoolRoutes);

//Start Server
app.listen(port, () => {
    console.log(`Server Started on ${port}`);
});

