import Transaction from '../models/transaction';
import { Request, Response } from 'express';
import { detectFraud } from '../utils/fraudDetector';

// Crear una nueva transacción
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      isFraudulent: detectFraud(req.body),
      date: new Date(req.body.date),
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

// Obtener todas las transacciones
export const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

// Obtener una transacción por ID
export const getTransactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ message: 'Transacción no encontrada' });
      return;
    }

    res.status(200).json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

// Eliminar una transacción por ID
export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!deletedTransaction) {
      res.status(404).json({ message: 'Transacción no encontrada' });
      return;
    }

    res.status(200).json({ message: 'Transacción eliminada correctamente' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error desconocido' });
    }
  }
};

// Actualizar una transacción por ID
export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { amount, description, isFraudulent } = req.body;
  
      // Buscar y actualizar la transacción
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { amount, description, isFraudulent },
        { new: true, runValidators: true } // Devuelve el documento actualizado
      );
  
      if (!updatedTransaction) {
        res.status(404).json({ message: 'Transacción no encontrada' });
        return;
      }
  
      res.status(200).json(updatedTransaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Error desconocido' });
      }
    }
};
  