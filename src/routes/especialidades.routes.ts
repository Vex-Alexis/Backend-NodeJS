import { Router } from 'express';
const router = Router();

import { 
    getSpecialties,
    getSpecialtyById,
    createSpecialty

} from '../controllers/especialidad.controller'

router.get('/', getSpecialties);

router.get('/:id', getSpecialtyById);

router.post('/', createSpecialty);

router.put('/:id', );

router.delete('/:id', );

export default router;

