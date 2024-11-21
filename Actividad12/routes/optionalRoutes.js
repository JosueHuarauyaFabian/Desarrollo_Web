import express from 'express';
const router = express.Router();

router.get('/invoice/:id?', (req, res) => {
    const invoiceId = req.params.id;
    if (invoiceId) {
        res.send(`Buscando la factura con ID: ${invoiceId}`);
    } else {
        res.send('Buscando todas las facturas');
    }
});

export default router;
