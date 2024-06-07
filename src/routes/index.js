import { Router } from 'express';
import { TYPES } from '../constants/index.js';

const router = Router();

router.get('/', async (req, res) =>
    res.json({
        type: TYPES.SUCCESS,
        message: 'Server started.'
    })
);

export default router;
