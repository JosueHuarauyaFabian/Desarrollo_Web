import { ITransaction } from '../models/transaction';

export const detectFraud = (transaction: ITransaction): boolean => {
  if (transaction.amount > 10000) return true; // Monto mayor a 10,000 es considerado fraude
  if (transaction.description.toLowerCase().includes('fraudulent')) return true; // Descripción contiene "fraudulent"
  return false; // No es fraude
};
