// src/components/Resources/ResourceList.tsx

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Resource {
  id_recurso: number;
  tipo_recurso: string;
  configuracion: string;
  estado: string;
  fecha_creacion: string;
  id_usuario: number;
}

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get('/resources');
        setResources(response.data.recursos);
      } catch (err: any) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(`Error: ${err.response.data.error}`);
        } else {
          alert('Error al obtener los recursos');
        }
      }
    };

    fetchResources();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este recurso?')) {
      try {
        await api.delete(`/resources/${id}`);
        setResources(resources.filter((resource) => resource.id_recurso !== id));
        alert('Recurso eliminado con éxito');
      } catch (err: any) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(`Error: ${err.response.data.error}`);
        } else {
          alert('Error al eliminar el recurso');
        }
      }
    }
  };

  return (
    <div>
      <h2>Lista de Recursos</h2>
      <Link to="/resources/new">
        <button>Crear Nuevo Recurso</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Configuración</th>
            <th>Estado</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id_recurso}>
              <td>{resource.id_recurso}</td>
              <td>{resource.tipo_recurso}</td>
              <td>{resource.configuracion}</td>
              <td>{resource.estado}</td>
              <td>{new Date(resource.fecha_creacion).toLocaleDateString()}</td>
              <td>
                <Link to={`/resources/edit/${resource.id_recurso}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(resource.id_recurso)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceList;
