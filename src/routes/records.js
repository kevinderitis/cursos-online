import { Router } from 'express';
import { getAllRecords, getPaidRecords } from '../db/email.js';
import { generateToken, authenticateToken } from '../services/jwt.js';

const recordRouter = Router();

recordRouter.get('/ventas', authenticateToken ,async (req, res) => {
    const page = req.query.page || 1;
    const limit = 10;

    let records;
    let filter = req.query.filter;
    if(filter === 'pagos'){
        records = await getPaidRecords(page, limit);
    }else{
        records = await getAllRecords(page, limit);
    }
    
    res.send(records)
})

recordRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    let token = generateToken(username, password);
    if(!token) return res.send({ status: 'error', msg: 'failed login'});

    res.cookie('authToken', token, {
        httpOnly: true, 
        secure: true, 
        maxAge: 7 * 24 * 60 * 60 * 1000 
    }).send({ status: 'success', msg: 'logged in'})
})


export default recordRouter;