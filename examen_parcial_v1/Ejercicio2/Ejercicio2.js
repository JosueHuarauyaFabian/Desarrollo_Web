"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
// Importación de módulos y Hooks de React
var react_1 = require("react");
// Función para generar datos aleatorios simulados
var generateRandomData = function () {
    return Array.from({ length: 10 }, function (_, id) { return ({
        id: id,
        value: Math.floor(Math.random() * 100)
    }); });
};
// Creación del contexto para el estado global
var GlobalStateContext = (0, react_1.createContext)(undefined);
// Proveedor del estado global con useReducer
var GlobalStateProvider = function (_a) {
    var children = _a.children;
    var initialState = { filter: '' };
    var reducer = function (state, action) {
        switch (action.type) {
            case 'SET_FILTER':
                return __assign(__assign({}, state), { filter: action.payload });
            default:
                return state;
        }
    };
    var _b = (0, react_1.useReducer)(reducer, initialState), state = _b[0], dispatch = _b[1];
    return value;
    {
        {
            state, dispatch;
        }
    }
     > { children: children } < /GlobalStateContext.Provider>;;
};
// Hook para acceder al estado global
var useGlobalState = function () {
    var context = (0, react_1.useContext)(GlobalStateContext);
    if (!context)
        throw new Error("useGlobalState debe ser usado dentro de un GlobalStateProvider");
    return context;
};
// Hook personalizado para manejar la actualización de datos y filtrado en tiempo real
var useData = function () {
    var _a = (0, react_1.useState)(generateRandomData), data = _a[0], setData = _a[1]; // Estado de los datos
    var intervalRef = (0, react_1.useRef)(null); // Referencia al intervalo de actualización
    // Función para actualizar los datos periódicamente
    var updateData = (0, react_1.useCallback)(function () {
        setData(generateRandomData());
        console.log('Datos actualizados'); // Log para verificar la actualización de datos
    }, []);
    // useEffect para establecer el intervalo y limpiar al desmontar el componente
    (0, react_1.useEffect)(function () {
        intervalRef.current = setInterval(updateData, 3000);
        return function () { return intervalRef.current && clearInterval(intervalRef.current); };
    }, [updateData]);
    // Filtrado de datos utilizando useMemo para optimizar el rendimiento
    var filteredData = (0, react_1.useMemo)(function () {
        return data.filter(function (item) { return item.value > 50; }); // Filtrado basado en valor (puedes modificar el criterio)
    }, [data]);
    return { data: filteredData, updateData: updateData };
};
// Hook personalizado para gestionar el filtrado del usuario
var useFilter = function () {
    var _a = (0, react_1.useState)(''), filter = _a[0], setFilter = _a[1];
    // Función para aplicar el filtro, usando useCallback para evitar renders innecesarios
    var applyFilter = (0, react_1.useCallback)(function (filterValue) {
        setFilter(filterValue);
        console.log("Filtro aplicado: ".concat(filterValue)); // Log para verificar el filtro aplicado
    }, []);
    return { filter: filter, applyFilter: applyFilter };
};
// Componente principal del tablero de control
var Dashboard = function () {
    var _a = useData(), data = _a.data, updateData = _a.updateData; // Hook para manejar los datos
    var _b = useFilter(), filter = _b.filter, applyFilter = _b.applyFilter; // Hook para el filtro
    var _c = useGlobalState(), state = _c.state, dispatch = _c.dispatch; // Estado global para el filtro
    // Manejo del cambio en el filtro del usuario
    var handleFilterChange = function (e) {
        dispatch({ type: 'SET_FILTER', payload: e.target.value });
        applyFilter(e.target.value);
    };
    return Tablero;
    de;
    Control < /h1>
        < input;
    type = "text";
    placeholder = "Filtrar datos...";
    value = { state: state, : .filter };
    onChange = { handleFilterChange: handleFilterChange }
        /  >
        onClick;
    {
        updateData;
    }
     > Actualizar;
    Datos < (/button>);
    {
        data.map(function (item) { return key = { item: item, : .id } > {}(templateObject_1 || (templateObject_1 = __makeTemplateObject(["ID: ", " - Valor: ", ""], ["ID: ", " - Valor: ", ""])), item.id, item.value); });
    }
    /li>;
};
/ul>
    < /div>;
;
;
// Componente de la aplicación principal que incluye el proveedor del estado global
var App = function () {
    return (/>
        < /GlobalStateProvider>);
};
exports["default"] = App;
var templateObject_1;
