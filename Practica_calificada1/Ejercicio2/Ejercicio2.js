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


