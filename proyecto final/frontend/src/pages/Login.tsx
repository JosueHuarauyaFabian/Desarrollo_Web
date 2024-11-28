import React, { useState } from 'react';
  import api from '../services/api';

  const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await api.post('/auth/login', { email, contraseña });
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      } catch (err: any) {
        setError(err.response.data.error || 'Error al iniciar sesión');
      }
    };

    return (
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  };

  export default Login;