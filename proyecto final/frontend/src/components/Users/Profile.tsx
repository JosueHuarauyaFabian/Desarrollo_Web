import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  rol: string;
  fecha_registro: Date;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${localStorage.getItem('userId')}`);
        setUser(response.data.usuario);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      {user ? (
        <div>
          <p>Nombre: {user.nombre}</p>
          <p>Email: {user.email}</p>
          <p>Rol: {user.rol}</p>
          <p>Fecha de Registro: {new Date(user.fecha_registro).toLocaleDateString()}</p>
          {/* Implementar funcionalidad para editar perfil si es necesario */}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Profile;
