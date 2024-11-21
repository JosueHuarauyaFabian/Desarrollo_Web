import express from 'express';
const router = express.Router();

router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Perfil del usuario con ID: ${userId}`);
});

export default router;
