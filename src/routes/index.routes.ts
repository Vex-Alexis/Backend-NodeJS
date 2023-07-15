import { Router } from 'express'
const router = Router();

import { indexWelcome } from '../controllers/index.controller';


router.route('/')
    .get(indexWelcome);

router.route('/Api')
    .get(indexWelcome);

export default router;
