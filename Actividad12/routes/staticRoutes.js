import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Bienvenido a la página principal');
});

router.get('/users', (req, res) => {
    res.send('Lista de usuarios');
});

router.get('/about', (req, res) => {
    res.send('Página de información sobre nosotros');
});

router.get('/error-test', (req, res) => {
    throw new Error('Este es un error intencional para pruebas');
});


export default router;
