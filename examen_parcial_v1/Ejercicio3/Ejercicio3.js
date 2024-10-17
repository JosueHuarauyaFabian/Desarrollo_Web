import React, { useState, useEffect, useReducer } from 'react';

// Clase Event que representa un evento con métodos de actualización
class Event {
  constructor(title, description, date, location) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.date = date;
    this.location = location;
  }

  update(details) {
    Object.assign(this, details);
  }
}

// Simulación de un servicio asíncrono para la gestión de eventos
const eventService = (() => {
  const events = [];

  return {
    addEvent: (title, description, date, location) => {
      return new Promise((resolve) => {
        const event = new Event(title, description, date, location);
        events.push(event);
        resolve(event);
      });
    },

    editEvent: (id, details) => {
      return new Promise((resolve, reject) => {
        const event = events.find((event) => event.id === id);
        if (event) {
          event.update(details);
          resolve(event);
        } else {
          reject(new Error('Evento no encontrado'));
        }
      });
    },

    deleteEvent: (id) => {
      return new Promise((resolve, reject) => {
        const index = events.findIndex((event) => event.id === id);
        if (index !== -1) {
          events.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Evento no encontrado'));
        }
      });
    },

    listEvents: () => {
      return new Promise((resolve) => {
        resolve([...events]);
      });
    }
  };
})();

// Reducer para manejar el estado de los eventos
const eventReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Componente principal de la aplicación que gestiona los eventos
const EventManager = () => {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [state, dispatch] = useReducer(eventReducer, { events: [], error: null });

  // Cargar eventos iniciales
  useEffect(() => {
    eventService.listEvents().then((events) => dispatch({ type: 'SET_EVENTS', payload: events }));
  }, []);

  // Maneja el guardado de un nuevo evento o la edición de uno existente
  const handleSave = (eventDetails) => {
    const saveAction = currentEvent
      ? eventService.editEvent(currentEvent.id, eventDetails)
      : eventService.addEvent(eventDetails.title, eventDetails.description, eventDetails.date, eventDetails.location);
    
    saveAction
      .then(() => eventService.listEvents())
      .then((events) => dispatch({ type: 'SET_EVENTS', payload: events }))
      .catch((error) => dispatch({ type: 'SET_ERROR', payload: error.message }));
  };

  // Maneja la edición de un evento
  const handleEdit = (event) => setCurrentEvent(event);

  // Maneja la eliminación de un evento
  const handleDelete = (id) => {
    eventService.deleteEvent(id)
      .then(() => eventService.listEvents())
      .then((events) => dispatch({ type: 'SET_EVENTS', payload: events }))
      .catch((error) => dispatch({ type: 'SET_ERROR', payload: error.message }));
  };

  return (
    <div>
      {state.error && <p>Error: {state.error}</p>}
      <EventForm onSave={handleSave} currentEvent={currentEvent} />
      <EventList events={state.events} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

// Formulario para crear o editar un evento
const EventForm = ({ onSave, currentEvent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (currentEvent) {
      setTitle(currentEvent.title);
      setDescription(currentEvent.description);
      setDate(currentEvent.date);
      setLocation(currentEvent.location);
    }
  }, [currentEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, date, location });
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ubicación" required />
      <button type="submit">Guardar Evento</button>
    </form>
  );
};

// Lista de eventos con opciones para editar o eliminar cada evento
const EventList = ({ events, onEdit, onDelete }) => (
  <ul>
    {events.map((event) => (
      <li key={event.id}>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <p>{event.date}</p>
        <p>{event.location}</p>
        <button onClick={() => onEdit(event)}>Editar</button>
        <button onClick={() => onDelete(event.id)}>Eliminar</button>
      </li>
    ))}
  </ul>
);

// Componente principal de la aplicación
const App = () => <EventManager />;

export default App;
