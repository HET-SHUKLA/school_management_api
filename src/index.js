import express from 'express';
import db from './db/connection.js';
import {PORT} from './utils/config.js';

const app = express();
const port = PORT || 3000;

//bodyparser middleware
app.use(express.urlencoded({extended: false}));



app.listen(port, () => {
    console.log(`Server Started on ${port}`);
});

