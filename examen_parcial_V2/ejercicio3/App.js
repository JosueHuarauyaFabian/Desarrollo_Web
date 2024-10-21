import React, { useState, useReducer, useContext, createContext, useCallback, useEffect, useRef } from "react";

// Clase Event para encapsular la estructura de los eventos
class Event {
  constructor(id, title, description, date, location) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.location = location;
  }
}

// Estado inicial para el reducer
const initialState = {
  events: [],
  selectedEvent: null,
  error: null,
};

// Acciones del reducer
const eventReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload], error: null };
    case "EDIT_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
        selectedEvent: null,
        error: null,
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
        error: null,
      };
    case "SET_SELECTED_EVENT":
      return { ...state, selectedEvent: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Creación del contexto global
const EventContext = createContext();

// Proveedor del contexto global
const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);
  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

// Formulario de eventos para crear o editar eventos
const EventForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const inputRef = useRef();

  useEffect(() => {
    if (initialData) inputRef.current.focus();
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !date || !location) {
      onSubmit(null, "Todos los campos son requeridos.");
      return;
    }
    onSubmit(
      new Event(initialData?.id || Date.now(), title, description, date, location),
      null
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Ubicación"
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

// Lista de eventos con opciones para editar y eliminar
const EventList = () => {
  const { state, dispatch } = useContext(EventContext);

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_EVENT", payload: id });
  };

  const handleEdit = (event) => {
    dispatch({ type: "SET_SELECTED_EVENT", payload: event });
  };

  return (
    <ul>
      {state.events.map((event) => (
        <li key={event.id}>
          <p>{`${event.title} - ${event.date} en ${event.location}`}</p>
          <button onClick={() => handleEdit(event)}>Editar</button>
          <button onClick={() => handleDelete(event.id)}>Eliminar</button>
        </li>
      ))}
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </ul>
  );
};

// Componente de tablero de gestión de eventos
const EventDashboard = () => {
  const { state, dispatch } = useContext(EventContext);

  const handleFormSubmit = (event, error) => {
    if (error) {
      dispatch({ type: "SET_ERROR", payload: error });
      return;
    }
    if (state.selectedEvent) {
      dispatch({ type: "EDIT_EVENT", payload: event });
    } else {
      dispatch({ type: "ADD_EVENT", payload: event });
    }
  };

  return (
    <div>
      <EventForm
        onSubmit={handleFormSubmit}
        initialData={state.selectedEvent}
      />
      <EventList />
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  return (
    <EventProvider>
      <h1>Gestión de Eventos</h1>
      <EventDashboard />
    </EventProvider>
  );
};

export default App;
