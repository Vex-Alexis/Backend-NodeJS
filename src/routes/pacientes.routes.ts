import { Router } from 'express';
const router = Router();

import { 
    createPatient,
    getPatients,
    getPatientByCedula,
    updatePatient,
    deletePatient
} from '../controllers/paciente.controller'

router.get('/', getPatients);

router.get('/:cedula', getPatientByCedula);

router.post('/', createPatient);

router.put('/:cedula', updatePatient);

router.delete('/:cedula', deletePatient);

export default router;

