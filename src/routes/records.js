import { Router } from 'express';
import { getAllRecords, getPaidRecords } from '../db/email.js';
const recordRouter = Router();

recordRouter.get('/', async (req, res) => {
    let records;
    let filter = req.query.filter;
    if(filter === 'pagos'){
        records = await getPaidRecords();
    }else{
        records = await getAllRecords();
    }
    
    res.send(records)
})


export default recordRouter;