import { Router } from 'express';
const router = Router();

import * as apiController from '../controllers/api.controller';

router.route('/test')
    .get(apiController.getApis)
    .post(apiController.postApi)

router.route('/test/:cedula')
    .get(apiController.getApi)
    .delete(apiController.deleteApi)
    .put(apiController.updateApi)

export default router;