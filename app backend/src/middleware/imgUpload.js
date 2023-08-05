import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

// Crear carpeta donde se va almacenar las imagenes == storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../storage/imgs"),
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});

//upload para guardar la imagen en el backend
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|svg/;
    const mimetypes = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));

    if (mimetypes && extname) {
      return cb(null, true);
    }
    cb("error: el archivo no es valido de ser /jpeg|jpg|png|svg/");
  },
});

