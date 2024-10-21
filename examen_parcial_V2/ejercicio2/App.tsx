import React, { useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef, createContext } from 'react';

// 1. Definición del contexto global y el estado inicial
interface GlobalState {
  data: Array<{ id: number, value: number }>;
  filter: string;
}

const initialState: GlobalState = {
  data: [],
  filter: ''
};

// Definimos acciones para el reducer
type Action = { type: 'SET_DATA', payload: Array<{ id: number, value: number }> } | { type: 'SET_FILTER', payload: string };

const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

// Creación del contexto global
const GlobalStateContext = createContext<{ state: GlobalState; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => undefined
});

// 2. Hook personalizado para simular datos en tiempo real
const useSimulatedData = (interval: number) => {
  const [data, setData] = useState<Array<{ id: number, value: number }>>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, value: Math.floor(Math.random() * 100) }
      ]);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return data;
};

// 3. Proveedor del contexto global
const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return <GlobalStateContext.Provider value={{ state, dispatch }}>{children}</GlobalStateContext.Provider>;
};

// 4. Componente principal Dashboard
const Dashboard: React.FC = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const data = useSimulatedData(2000); // Simulación de datos cada 2 segundos

  // Actualizamos el estado global con los datos simulados
  useEffect(() => {
    dispatch({ type: 'SET_DATA', payload: data });
  }, [data, dispatch]);

  // Función para actualizar el filtro con `useCallback` y evitar recreaciones
  const updateFilter = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_FILTER', payload: e.target.value });
  }, [dispatch]);

  // Uso de `useMemo` para filtrar los datos y evitar cálculos innecesarios
  const filteredData = useMemo(() => {
    return state.data.filter((item) => item.value.toString().includes(state.filter));
  }, [state.data, state.filter]);

  // Referencia para un campo de entrada
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Tablero de Control</h1>
      <input
        ref={inputRef}
        type="text"
        value={state.filter}
        onChange={updateFilter}
        placeholder="Filtrar por valor..."
      />
      <button onClick={() => inputRef.current?.focus()}>Enfocar</button>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>{`ID: ${item.id} - Valor: ${item.value}`}</li>
        ))}
      </ul>
    </div>
  );
};

// 5. Componente de la aplicación principal
const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <Dashboard />
    </GlobalStateProvider>
  );
};

export default App;
