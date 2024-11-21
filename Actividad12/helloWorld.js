import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World desde Express!');
});

app.listen(port, () => {
    console.log(`App Hello World escuchando desde el puerto ${port}`);
});
