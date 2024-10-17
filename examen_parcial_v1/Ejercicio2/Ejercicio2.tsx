// Importar
import React, {
    useState,
    useEffect,
    useContext,
    useReducer,
    useMemo,
    useCallback,
    useRef,
    createContext,
    ReactNode,
  } from 'react';
  
  // Tipo de datos para los elementos
  interface DataItem {
    id: number;
    value: number;
  }
  
  // Estado global y tipos de acciones
  interface State {
    filter: string;
  }
  
  type Action = { type: 'SET_FILTER'; payload: string };
  
  // Contexto global con un reducer para el manejo de estado global
  const GlobalStateContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);
  
  const initialState: State = { filter: '' };
  
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'SET_FILTER':
        return { ...state, filter: action.payload };
      default:
        return state;
    }
  };
  
  // Proveedor del contexto global
  const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <GlobalStateContext.Provider value={{ state, dispatch }}>{children}</GlobalStateContext.Provider>;
  };
  
  // Hook para acceder al contexto global
  const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) throw new Error("useGlobalState debe ser usado dentro de un GlobalStateProvider");
    return context;
  };
  
  // Hook personalizado para generar y actualizar datos simulados
  const useData = () => {
    const [data, setData] = useState<DataItem[]>(() => generateRandomData());
    const intervalRef = useRef<NodeJS.Timer | null>(null);
  
    const updateData = useCallback(() => {
      setData(generateRandomData());
      console.log('Datos actualizados');
    }, []);
  
    useEffect(() => {
      intervalRef.current = setInterval(updateData, 3000);
      return () => intervalRef.current && clearInterval(intervalRef.current);
    }, [updateData]);
  
    const filteredData = useMemo(() => {
      return data.filter((item) => item.value > 50);
    }, [data]);
  
    return { data: filteredData, updateData };
  };
  
  // Hook personalizado para manejar el filtro
  const useFilter = () => {
    const [filter, setFilter] = useState('');
    const applyFilter = useCallback((filterValue: string) => {
      setFilter(filterValue);
      console.log(`Filtro aplicado: ${filterValue}`);
    }, []);
  
    return { filter, applyFilter };
  };
  
  // Función auxiliar para generar datos aleatorios
  const generateRandomData = () => {
    return Array.from({ length: 10 }, (_, id) => ({
      id,
      value: Math.floor(Math.random() * 100),
    }));
  };
  
  // Componente principal del tablero
  const Dashboard: React.FC = () => {
    const { data, updateData } = useData();
    const { filter, applyFilter } = useFilter();
    const { state, dispatch } = useGlobalState();
  
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_FILTER', payload: e.target.value });
      applyFilter(e.target.value);
    };
  
    return (
      <div>
        <h1>Tablero de Control</h1>
        <input type="text" placeholder="Filtrar datos..." value={state.filter} onChange={handleFilterChange} />
        <button onClick={updateData}>Actualizar Datos</button>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{`ID: ${item.id} - Valor: ${item.value}`}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  // Aplicación principal
  const App: React.FC = () => {
    return (
      <GlobalStateProvider>
        <Dashboard />
      </GlobalStateProvider>
    );
  };
  
  export default App;
  