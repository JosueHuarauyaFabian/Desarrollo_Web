import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import Transaction from '../models/transaction';

beforeAll(async () => {
  // Conectar a MongoDB antes de ejecutar las pruebas
  await mongoose.connect(process.env.MONGO_URI!);
});

afterAll(async () => {
  // Limpiar la base de datos y desconectar después de las pruebas
  await Transaction.deleteMany({});
  await mongoose.disconnect();
});

describe('Pruebas de API de transacciones', () => {
  test('Debe crear una nueva transacción', async () => {
    const nuevaTransaccion = {
      userId: 'testUser',
      amount: 5000,
      date: '2024-11-20',
      description: 'Compra de prueba',
    };

    const res = await request(app).post('/api/transactions').send(nuevaTransaccion);

    expect(res.status).toBe(201); // Verifica que la respuesta sea 201 (Creado)
    expect(res.body).toHaveProperty('_id'); // Verifica que se haya creado un ID
    expect(res.body.isFraudulent).toBe(false); // Verifica que no sea fraudulenta
  });

  test('Debe listar todas las transacciones', async () => {
    const res = await request(app).get('/api/transactions');

    expect(res.status).toBe(200); // Verifica que la respuesta sea 200 (OK)
    expect(res.body).toBeInstanceOf(Array); // Verifica que sea un arreglo
    expect(res.body.length).toBeGreaterThanOrEqual(1); // Verifica que haya al menos una transacción
  });

  test('Debe obtener una transacción por ID', async () => {
    // Crear una transacción para probar
    const nuevaTransaccion = {
      userId: 'testUser2',
      amount: 3000,
      date: '2024-11-21',
      description: 'Pago de servicio',
    };

    const resPost = await request(app).post('/api/transactions').send(nuevaTransaccion);
    const transactionId = resPost.body._id;

    const resGet = await request(app).get(`/api/transactions/${transactionId}`);

    expect(resGet.status).toBe(200); // Verifica que la respuesta sea 200 (OK)
    expect(resGet.body).toHaveProperty('_id', transactionId); // Verifica que el ID coincida
    expect(resGet.body.userId).toBe('testUser2'); // Verifica el usuario
  });

  test('Debe eliminar una transacción por ID', async () => {
    // Crear una transacción para eliminar
    const nuevaTransaccion = {
      userId: 'testUser3',
      amount: 7000,
      date: '2024-11-22',
      description: 'Pago de alquiler',
    };

    const resPost = await request(app).post('/api/transactions').send(nuevaTransaccion);
    const transactionId = resPost.body._id;

    const resDelete = await request(app).delete(`/api/transactions/${transactionId}`);

    expect(resDelete.status).toBe(200); // Verifica que la respuesta sea 200 (OK)
    expect(resDelete.body).toHaveProperty('message', 'Transacción eliminada correctamente');

    const resGet = await request(app).get(`/api/transactions/${transactionId}`);
    expect(resGet.status).toBe(404); // Verifica que ya no existe
  });
});
