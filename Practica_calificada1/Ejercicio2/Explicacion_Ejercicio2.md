# **Ejercicio 2: Análisis estadístico dinámico usando JavaScript**

```javascript
// @ts-check

/**
 * @typedef {Object} Estadisticas
 * @property {number} media
 * @property {number} mediana
 * @property {number} moda
 * @property {number} desviacionEstandar
 */

/**
 * @typedef {Object} Datos
 * @property {number} valor - Valor numérico.
 * @property {string} categoria - Categoría a la que pertenece el valor.
 * @property {Date} [fecha] - Fecha asociada al valor (opcional).
 */

/**
 * Calcula la media de un conjunto de números.
 * @param {number[]} numeros - Array de números.
 * @returns {number} - La media de los números.
 */
function calcularMedia(numeros) {
    return numeros.reduce((acc, num) => acc + num, 0) / numeros.length;
}

/**
 * Calcula la mediana de un conjunto de números.
 * @param {number[]} numeros - Array de números.
 * @returns {number} - La mediana de los números.
 */
function calcularMediana(numeros) {
    const ordenados = [...numeros].sort((a, b) => a - b);
    const mitad = Math.floor(ordenados.length / 2);
    return ordenados.length % 2 === 0 ? (ordenados[mitad - 1] + ordenados[mitad]) / 2 : ordenados[mitad];
}

/**
 * Calcula la moda de un conjunto de números.
 * @param {number[]} numeros - Array de números.
 * @returns {number} - La moda de los números.
 */
function calcularModa(numeros) {
    const frecuencia = {};
    numeros.forEach(num => frecuencia[num] = (frecuencia[num] || 0) + 1);
    const maxFrecuencia = Math.max(...Object.values(frecuencia));
    return +Object.keys(frecuencia).find(num => frecuencia[num] === maxFrecuencia);
}

/**
 * Calcula la desviación estándar de un conjunto de números.
 * @param {number[]} numeros - Array de números.
 * @returns {number} - La desviación estándar de los números.
 */
function calcularDesviacionEstandar(numeros) {
    const media = calcularMedia(numeros);
    const sumaCuadrados = numeros.reduce((acc, num) => acc + Math.pow(num - media, 2), 0);
    return Math.sqrt(sumaCuadrados / numeros.length);
}

/**
 * Realiza el análisis estadístico completo por categoría.
 * @param {Datos[]} datos - Array de objetos con valor y categoría.
 * @returns {Object} - Estadísticas agrupadas por categoría.
 */
function analizarDatosPorCategoria(datos) {
    const categorias = {};
    
    datos.forEach(({ valor, categoria }) => {
        if (typeof valor !== 'number') throw new Error('Todos los valores deben ser numéricos.');
        categorias[categoria] = categorias[categoria] || [];
        categorias[categoria].push(valor);
    });

    const estadisticas = {};
    
    for (const [categoria, valores] of Object.entries(categorias)) {
        estadisticas[categoria] = {
            media: calcularMedia(valores),
            mediana: calcularMediana(valores),
            moda: calcularModa(valores),
            desviacionEstandar: calcularDesviacionEstandar(valores),
        };
    }
    
    return estadisticas;
}

/**
 * Calcula la diferencia en días entre dos fechas.
 * @param {Date} fecha1 
 * @param {Date} fecha2 
 * @returns {number} - Diferencia en días.
 */
function calcularDiferenciaFechas(fecha1, fecha2) {
    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.floor(Math.abs(fecha1 - fecha2) / msPorDia);
}

// Ejemplo de uso con destructuring y categorías
const datos = [
    { valor: 10, categoria: 'edad', fecha: new Date('2024-01-01') },
    { valor: 20, categoria: 'edad', fecha: new Date('2024-02-01') },
    { valor: 30, categoria: 'ingresos' },
    { valor: 40, categoria: 'ingresos' }
];

const estadisticas = analizarDatosPorCategoria(datos);
console.log('Resultados del análisis estadístico por categoría:', estadisticas);

const diferenciaDias = calcularDiferenciaFechas(new Date('2024-01-01'), new Date('2024-01-10'));
console.log(`Diferencia en días: ${diferenciaDias}`);
```

### Explicación de la Implementación:

1. **Tipos de Datos Definidos**:
   - Se definen dos tipos de datos utilizando **JSDoc**:
     - **Estadisticas**: Un objeto que contiene los resultados del análisis (media, mediana, moda, desviación estándar).
     - **Datos**: Un objeto que representa los datos de entrada, con un valor numérico, una categoría (como edad o ingresos), y una fecha opcional asociada.

2. **Funciones de Cálculo Estadístico**:
   - **calcularMedia**: Suma todos los valores en un array de números y los divide por la cantidad de elementos para obtener la media.
   - **calcularMediana**: Ordena los valores numéricos y calcula la mediana, que es el valor central del conjunto de datos. Si el número de elementos es par, calcula el promedio de los dos valores centrales.
   - **calcularModa**: Calcula la moda, es decir, el valor que aparece con mayor frecuencia en el conjunto de datos.
   - **calcularDesviacionEstandar**: Calcula la desviación estándar, que mide la cantidad de variación o dispersión de un conjunto de datos en relación con la media.

3. **Función Principal de Análisis**:
   - **analizarDatosPorCategoria**: Toma un array de objetos `Datos` y agrupa los valores según la categoría. Luego, calcula las estadísticas (media, mediana, moda y desviación estándar) para cada categoría y devuelve los resultados organizados por categoría.
   - El uso de **destructuring** en la línea `datos.forEach(({ valor, categoria }) => {...})` permite extraer directamente las propiedades `valor` y `categoria` de los objetos del array.

4. **Manejo de Fechas**:
   - **calcularDiferenciaFechas**: Calcula la diferencia en días entre dos fechas. Convierte las fechas a milisegundos y luego calcula el número de días dividiendo la diferencia por la cantidad de milisegundos en un día.

5. **Ejemplo de Uso**:
   - Se crea un array `datos` con objetos que contienen un `valor`, una `categoria` y, opcionalmente, una `fecha`.
   - **analizarDatosPorCategoria**: Procesa los datos por categoría (`edad` e `ingresos`) y devuelve las estadísticas correspondientes.
   - **calcularDiferenciaFechas**: Calcula la diferencia en días entre dos fechas, mostrando cómo se puede trabajar con tiempos.

6. **Resultados Consolidados**:
   - Los resultados del análisis estadístico por categoría se imprimen en la consola, organizados en un formato fácil de leer. Igualmente, la diferencia de días entre dos fechas se imprime claramente.

### Resultado de la ejecucion del codigo:

![alt text](<Captura desde 2024-09-05 12-51-49.png>)


El código calcula la media, mediana, moda y desviación estándar para cada categoría y muestra los resultados. Además, se calcula la diferencia de días entre dos fechas, que en este caso es de 9 días, lo que confirma que el cálculo de tiempos también funciona correctamente.