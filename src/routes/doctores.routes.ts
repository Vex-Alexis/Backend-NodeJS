import { Router } from 'express';
const router = Router();

import { 
    getDoctors,
    getDoctorByCedula,
    createDoctor,
    updateDoctor,
    deleteDoctor
} from '../controllers/doctor.controller';

router.get('/', getDoctors)

router.get('/:cedula', getDoctorByCedula)

router.post('/', createDoctor)

router.put('/:cedula', updateDoctor)

router.delete('/:cedula', deleteDoctor)



export default router;