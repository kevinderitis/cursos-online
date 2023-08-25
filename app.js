import express from 'express';
import mpRouter from './src/routes/mp.js';
import recordRouter from './src/routes/records.js';
import config from './src/config/config.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api/mp', mpRouter);
app.use('/api/records', recordRouter);

const PORT = config.PORT || 8081
const server = app.listen(PORT, () => console.log(`Server running on port: ${server.address().port}`))