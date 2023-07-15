import { Router } from 'express';
const router = Router();

import {
    getQuotes,
    createQuote,

} from '../controllers/cita.controller'

router.get('/', getQuotes);

router.get('/:id', );

router.post('/', createQuote);

router.put('/:id', );

router.delete('/:id', );

export default router;
