import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import initDatabase from './database.js';
import staticRoutes from './routes/staticRoutes.js';
import dynamicRoutes from './routes/dynamicRoutes.js';
import optionalRoutes from './routes/optionalRoutes.js';
import regexRoutes from './routes/regexRoutes.js';
import additionalRoutes from './routes/index.js';
import errorHandler from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cookieParser());

// Crear la carpeta 'uploads' si no existe
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Configurar middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión con la base de datos
let db;
(async () => {
  db = await initDatabase();
})();

// Rutas de autenticación
app.use('/', authRoutes);

// Ruta para mostrar el formulario de registro
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

// Ruta para manejar el registro de usuarios
app.post('/register', async (req, res) => {
  const { nombre, correo } = req.body;

  // Validar datos del formulario
  if (!nombre || !correo) {
    return res.status(400).send('Faltan datos en el formulario');
  }

  try {
    await db.run('INSERT INTO usuarios (nombre, correo) VALUES (?, ?)', [nombre, correo]);
    res.send('Usuario registrado con éxito');
  } catch (err) {
    // Manejo de errores específicos
    if (err.code === 'SQLITE_CONSTRAINT') {
      res.status(400).send('El correo ya está registrado');
    } else {
      console.error(err);
      res.status(500).send('Error al registrar el usuario');
    }
  }
});

// Configurar multer para manejar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Ruta para mostrar el formulario de carga de archivos
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/upload.html'));
});

// Ruta para manejar la carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ningún archivo' });
  }
  res.json({
    message: 'Archivo subido exitosamente',
    file: {
      name: req.file.originalname,
      path: req.file.path,
    },
  });
});

// Usar las rutas importadas
app.use('/', staticRoutes);
app.use('/', dynamicRoutes);
app.use('/', optionalRoutes);
app.use('/', regexRoutes);
app.use('/', additionalRoutes);

// Middleware para manejar errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
