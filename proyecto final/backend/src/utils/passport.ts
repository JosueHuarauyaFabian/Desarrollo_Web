// src/utils/passport.ts

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './database';
import { User } from '../models/User';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const nombre = profile.displayName || 'Usuario sin Nombre';
        const rol = 'Operador'; // Asignamos el rol 'Operador' por defecto

        if (!email) {
          return done(new Error('El correo electrónico es requerido'));
        }

        // Buscar al usuario en la base de datos
        let result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        let usuario = result.rows[0];

        if (!usuario) {
          // Si el usuario no existe, crearlo
          result = await pool.query(
            'INSERT INTO usuarios (nombre, email, rol) VALUES ($1, $2, $3) RETURNING *',
            [nombre, email, rol]
          );
          usuario = result.rows[0];
        }

        done(null, usuario);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Opcional: serializar y deserializar usuarios si usas sesiones
passport.serializeUser((user: any, done) => {
  done(null, user.id_usuario);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
    const usuario = result.rows[0];
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});

export default passport;
