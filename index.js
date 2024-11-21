import express from 'express';
import db from './db/connection.js';
import {PORT} from './utils/config.js';

const app = express();
const port = PORT || 3000;

//bodyparser middleware
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    db.query('SELECT id, name, address, latitude, longitude FROM schools', (err, resu) => {
        if (err) {
            console.error('Error fetching schools:', err);
            return res.status(500).json({ message: 'Error fetching schools.' });
          }
          return res.status(200).json({msg: resu});
    })
})

app.listen(port, () => {
    console.log(`Server Started on ${port}`);
})

