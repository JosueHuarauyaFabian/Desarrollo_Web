// src/components/Resources/ResourceForm.tsx

import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

interface Resource {
  tipo_recurso: string;
  configuracion: string;
  estado: string;
}

const ResourceForm: React.FC = () => {
  const [formData, setFormData] = useState<Resource>({
    tipo_recurso: 'Servidor',
    configuracion: '',
    estado: 'Activo',
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchResource = async () => {
        try {
          const response = await api.get(`/resources/${id}`);
          setFormData(response.data.recurso);
        } catch (err: any) {
          console.error(err);
          alert('Error al obtener el recurso');
        }
      };

      fetchResource();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        await api.put(`/resources/${id}`, formData);
        alert('Recurso actualizado con éxito');
      } else {
        await api.post('/resources', formData);
        alert('Recurso creado con éxito');
      }
      navigate('/');
    } catch (err: any) {
      console.error(err);
      alert('Error al guardar el recurso');
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Recurso' : 'Crear Recurso'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tipo_recurso">Tipo de Recurso:</label>
          <select name="tipo_recurso" id="tipo_recurso" value={formData.tipo_recurso} onChange={handleChange}>
            <option value="Servidor">Servidor</option>
            <option value="Base de Datos">Base de Datos</option>
          </select>
        </div>
        <div>
          <label htmlFor="configuracion">Configuración:</label>
          <textarea
            name="configuracion"
            id="configuracion"
            value={formData.configuracion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="estado">Estado:</label>
          <select name="estado" id="estado" value={formData.estado} onChange={handleChange}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>
        <button type="submit">{id ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default ResourceForm;
