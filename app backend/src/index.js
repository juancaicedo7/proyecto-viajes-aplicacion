import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDb } from './database.js';
import {dirname} from "path"
import {fileURLToPath} from "url"

import userRoute from './routes/usuarioRoute.js'
import viajeRoute from './routes/viajeRoute.js'

connectDb();

const filename = fileURLToPath(import.meta.url)
const __dirname = dirname(filename)
const app = express();

app.set('Port', 4000);
app.use("/public", express.static(__dirname + "/storage/imgs"));
app.use(morgan('dev'));
app.use(cors ({origin:'*'}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/user", userRoute)
app.use("/viajes", viajeRoute)

app.listen(app.get('Port'), () => {console.log('Servidor escuchando desde el puerto', app.get('Port'))});