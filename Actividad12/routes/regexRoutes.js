import express from 'express';
const router = express.Router();

router.get(/.*fly$/, (req, res) => {
    res.send('Esta ruta coincide con cualquier término que termine en "fly"');
});

export default router;
