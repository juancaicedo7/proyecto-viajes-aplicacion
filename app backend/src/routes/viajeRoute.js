import { Router } from 'express';
import viajeCrtl from '../controllers/viajeController.js';
import { upload } from '../middleware/imgUpload.js';
import { verifyToken } from '../middleware/auth.js';

const route = Router();

route.get('/', verifyToken,viajeCrtl.listarTodosViajes) 
route.get('/:id',verifyToken, viajeCrtl.listarViajePorId) 
route.get('/usuario/user',verifyToken, viajeCrtl.listarViajeLogin) 
route.post('/',verifyToken, upload.single("img") ,viajeCrtl.guardarViaje) 
route.put('/:id',verifyToken, upload.single("img") ,viajeCrtl.actualizarViaje) 
route.delete('/:id',verifyToken, viajeCrtl.eliminarViaje) 

export default route;