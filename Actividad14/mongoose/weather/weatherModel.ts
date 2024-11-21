import mongoose, { Schema, Document } from 'mongoose';

export interface IWeather extends Document {
  zip: string;
  weather: string;
  tempC: number;
  tempF: number;
  friends: string[];
}

const WeatherSchema = new Schema<IWeather>({
  zip: { type: String, required: true, unique: true },
  weather: { type: String, required: true },
  tempC: { type: Number, required: true },
  tempF: { type: Number, required: true },
  friends: { type: [String], required: true },
});

export default mongoose.model<IWeather>('Weather', WeatherSchema, 'weather');
