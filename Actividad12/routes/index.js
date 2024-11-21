import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/headers', (req, res) => {
    res.set({
        'Content-Type': 'text/html',
        'X-Powered-By': 'Express + Unicornio y arco iris',
    });
    res.send('<h1>Encabezados configurados correctamente</h1>');
});

router.get('/status', (req, res) => {
    res.status(200).send('<h1>Respuesta exitosa con código 200</h1>');
});

router.get('/error', (req, res) => {
    res.status(500).send('<h1>Error interno del servidor</h1>');
});

router.get('/redirect', (req, res) => {
    res.redirect('/about');
});

router.get('/external', (req, res) => {
    res.redirect(301, 'https://example.com');
});

router.get('/send-text', (req, res) => {
    res.send('Este es un mensaje en formato texto.');
});

router.get('/send-json', (req, res) => {
    res.json({ message: 'Este es un mensaje en formato JSON' });
});

router.get('/send-file', (req, res) => {
  const filePath = path.join(process.cwd(), 'public/send-file/sample.txt'); // Usa process.cwd() para la ruta raíz
  res.sendFile(filePath);
});


export default router;
