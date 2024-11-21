import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz para las transacciones
export interface ITransaction extends Document {
  userId: string;
  amount: number;
  date: Date;
  description: string;
  isFraudulent: boolean;
}

// Esquema de Mongoose para las transacciones
const TransactionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  isFraudulent: { type: Boolean, required: true },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
