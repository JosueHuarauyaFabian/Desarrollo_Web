import { Router } from 'express';
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transactionController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/transactions', authenticateToken, createTransaction);
router.get('/transactions', authenticateToken, getTransactions);
router.get('/transactions/:id', authenticateToken, getTransactionById);
router.put('/transactions/:id', authenticateToken, updateTransaction);
router.delete('/transactions/:id', authenticateToken, deleteTransaction);

export default router;
