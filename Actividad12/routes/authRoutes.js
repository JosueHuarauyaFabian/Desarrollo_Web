import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const router = express.Router();

// Configuración del middleware para cookies y sesiones
router.use(cookieParser());
router.use(
  session({
    secret: 'clave-secreta', // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Cambia a true si usas HTTPS
  })
);

// Ruta para establecer una cookie
router.get('/set-cookie', (req, res) => {
  res.cookie('nombreUsuario', 'Josue Huarauya', { maxAge: 900000 });
  res.send('Cookie establecida');
});

// Ruta para leer una cookie
router.get('/read-cookie', (req, res) => {
  const nombreUsuario = req.cookies.nombreUsuario;
  if (nombreUsuario) {
    res.send(`La cookie contiene: ${nombreUsuario}`);
  } else {
    res.send('No se encontró la cookie');
  }
});

router.get('/set-cookied', (req, res) => {
    res.cookie('cookieDePrueba', 'valorDePrueba', { maxAge: 900000 });
    res.send('Cookie establecida con éxito.');
});


// Ruta para iniciar sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validación ficticia
  if (username === 'admin' && password === 'admin123') {
    req.session.user = { username };
    res.send('Sesión iniciada');
  } else {
    res.status(401).send('Credenciales incorrectas');
  }
});

// Ruta protegida (requiere sesión activa)
router.get('/protected', (req, res) => {
  if (req.session.user) {
    res.send(`Ruta protegida. Bienvenido, ${req.session.user.username}`);
  } else {
    res.status(401).send('No tienes acceso a esta ruta');
  }
});

// Cerrar sesión
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('Sesión cerrada');
});

export default router;
