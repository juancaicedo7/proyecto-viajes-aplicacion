import { Router } from 'express';
import usuarioCrtl from '../controllers/usuarioController.js';

const route = Router();

route.post('/registro', usuarioCrtl.registrarUsuario) 
route.post('/acceso', usuarioCrtl.accesoUsuario)
route.put('/:id', usuarioCrtl.actualizarUsuario)

export default route;