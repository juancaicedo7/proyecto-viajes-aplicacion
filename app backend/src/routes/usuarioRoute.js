import { Router } from 'express';
import usuarioCrtl from '../controllers/usuarioController.js';

const route = Router();

route.post('/registro', usuarioCrtl.registrarUsuario) 
route.post('/acceso', usuarioCrtl.accesoUsuario)

export default route;