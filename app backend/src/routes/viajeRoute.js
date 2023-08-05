import { Router } from 'express';
import viajeCrtl from '../controllers/viajeController.js';
import { upload } from '../middleware/imgUpload.js';

const route = Router();

route.get('/', viajeCrtl.listarTodosViajes) 
route.get('/:id', viajeCrtl.listarViajePorId) 
route.post('/', upload.single("img") ,viajeCrtl.guardarViaje) 
route.put('/:id', upload.single("img") ,viajeCrtl.actualizarViaje) 
route.delete('/:id', viajeCrtl.eliminarViaje) 

export default route;