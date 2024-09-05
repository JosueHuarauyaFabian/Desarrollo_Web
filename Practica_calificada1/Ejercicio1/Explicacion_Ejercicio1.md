# **Ejercicio 1: Implementacion de un gestor de tareas con ESCMAScript**

### Codigo del Ejercicio 

```javascript
// @ts-check

/**
 * @typedef {Object} Task
 * @property {string} name - Nombre de la tarea.
 * @property {boolean} completed - Estado de la tarea (completado o no).
 */

/**
 * @typedef {Object} Subcategory
 * @property {string} name - Nombre de la subcategoría.
 * @property {Task[]} tasks - Array de tareas.
 */

/**
 * @typedef {Object} Category
 * @property {string} name - Nombre de la categoría.
 * @property {Subcategory[]} subcategories - Array de subcategorías.
 */

class TaskManager {
    /**
     * @param {Category[]} categories - Lista de categorías.
     */
    constructor(categories = []) {
        this.categories = categories;
    }

    /**
     * Agrega una tarea a una subcategoría dentro de una categoría.
     * Usa destructuring para extraer propiedades y spread para combinar objetos.
     * @param {string} categoryName - Nombre de la categoría.
     * @param {string} subcategoryName - Nombre de la subcategoría.
     * @param {Task} task - Tarea a agregar.
     */
    addTask(categoryName, subcategoryName, task) {
        const category = this.categories.find(c => c.name === categoryName);
        const subcategory = category?.subcategories.find(s => s.name === subcategoryName);
        
        if (subcategory) {
            const { name, completed = false } = task;  // Usamos destructuring para extraer propiedades
            const newTask = { name, completed };
            subcategory.tasks = [...subcategory.tasks, newTask];  // Usamos spread para agregar la nueva tarea
        }
    }

    /**
     * Elimina una tarea por nombre en una subcategoría dentro de una categoría.
     * @param {string} categoryName - Nombre de la categoría.
     * @param {string} subcategoryName - Nombre de la subcategoría.
     * @param {string} taskName - Nombre de la tarea a eliminar.
     */
    removeTask(categoryName, subcategoryName, taskName) {
        const category = this.categories.find(c => c.name === categoryName);
        const subcategory = category?.subcategories.find(s => s.name === subcategoryName);
        subcategory.tasks = subcategory.tasks.filter(task => task.name !== taskName);
    }

    /**
     * Actualiza una tarea por nombre en una subcategoría dentro de una categoría.
     * Usa spread para combinar propiedades de la tarea existente y la nueva.
     * @param {string} categoryName - Nombre de la categoría.
     * @param {string} subcategoryName - Nombre de la subcategoría.
     * @param {string} taskName - Nombre de la tarea a actualizar.
     * @param {Partial<Task>} updatedTask - Tarea con los datos a actualizar.
     */
    updateTask(categoryName, subcategoryName, taskName, updatedTask) {
        const category = this.categories.find(c => c.name === categoryName);
        const subcategory = category?.subcategories.find(s => s.name === subcategoryName);
        const taskIndex = subcategory?.tasks.findIndex(task => task.name === taskName);
        
        if (taskIndex !== undefined && taskIndex > -1) {
            // Usamos spread para combinar propiedades de la tarea existente y la nueva
            subcategory.tasks[taskIndex] = { ...subcategory.tasks[taskIndex], ...updatedTask };
        }
    }

    /**
     * Imprime las tareas de forma jerárquica por categorías y subcategorías.
     */
    printTasks() {
        this.categories.forEach(category => {
            console.log(`Categoría: ${category.name}`);
            category.subcategories.forEach(subcategory => {
                console.log(`  Subcategoría: ${subcategory.name}`);
                subcategory.tasks.forEach(task => {
                    console.log(`    Tarea: ${task.name} - Completado: ${task.completed}`);
                });
            });
        });
    }

    /**
     * Retorna una copia profunda del TaskManager.
     * @returns {TaskManager}
     */
    deepCopy() {
        return JSON.parse(JSON.stringify(this));
    }

    /**
     * Retorna una copia superficial del TaskManager.
     * @returns {TaskManager}
     */
    shallowCopy() {
        return Object.assign({}, this);
    }
}

// Ejemplo de uso o como funciona
const manager = new TaskManager([
    {
        name: 'Trabajo',
        subcategories: [
            {
                name: 'Proyectos',
                tasks: [
                    { name: 'Terminar reporte', completed: false },
                    { name: 'Revisar código', completed: true },
                ]
            },
            {
                name: 'Reuniones',
                tasks: [
                    { name: 'Reunión con equipo', completed: false }
                ]
            }
        ]
    },
    {
        name: 'Hogar',
        subcategories: [
            {
                name: 'Limpieza',
                tasks: [
                    { name: 'Lavar platos', completed: true },
                    { name: 'Barrer', completed: false }
                ]
            }
        ]
    }
]);

// Pruebas de las operaciones CRUD
manager.addTask('Trabajo', 'Proyectos', { name: 'Escribir informe', completed: false });
manager.updateTask('Trabajo', 'Proyectos', 'Escribir informe', { completed: true });
manager.removeTask('Trabajo', 'Proyectos', 'Revisar código');

// Imprimir las tareas
manager.printTasks();

// Crear una copia profunda del gestor de tareas
const deepCopiedManager = manager.deepCopy();
console.log('Copia profunda creada correctamente.');

// Crear una copia superficial del gestor de tareas
const shallowCopiedManager = manager.shallowCopy();
console.log('Copia superficial creada correctamente.');

```

### Explicación de la Implementación:

1. **Estructura Completa**:
   - El código organiza las tareas en una estructura jerárquica de categorías y subcategorías. Cada categoría contiene subcategorías, y cada subcategoría contiene un array de tareas, con propiedades como `name` (nombre de la tarea) y `completed` (si está completada o no).

2. **Operaciones CRUD**:
   - Implementa funciones para agregar (`addTask`), actualizar (`updateTask`) y eliminar (`removeTask`) tareas dentro de subcategorías. Estas funciones utilizan características modernas de JavaScript, como el **destructuring** y el operador **spread**, lo que simplifica la manipulación de objetos y arrays.
  
3. **Copia Profunda y Superficial**:
   - La función `deepCopy` crea una copia profunda del objeto `TaskManager`, utilizando `JSON.stringify` y `JSON.parse` para clonar toda la estructura jerárquica. La función `shallowCopy` crea una copia superficial utilizando `Object.assign`, lo que copia solo las propiedades de nivel superior, manteniendo referencias a los subobjetos.

4. **Optional Chaining**:
   - Para evitar errores cuando una propiedad puede no estar definida, se utiliza el operador `?.` (optional chaining), lo que garantiza un acceso seguro a las propiedades sin necesidad de verificaciones manuales de `null` o `undefined`.

5. **Uso de Nuevas Características de ECMAScript**:
   - El código incorpora características modernas de ECMAScript, como el **optional chaining** para mejorar la seguridad en el acceso a propiedades. Además, el código podría expandirse para incluir otras características como **nullish coalescing** (`??`) si fuera necesario.

6. **Documentación con JSDoc**:
   - Toda la implementación está documentada utilizando el estándar **JSDoc**, lo que facilita la comprensión del código para otros desarrolladores al proporcionar detalles sobre los tipos de datos y el propósito de cada función.

### Resultado de la ejecucion del codigo

![alt text](<Captura desde 2024-09-05 12-14-28.png>)

El código crea un gestor de tareas organizado en categorías y subcategorías. Implementa funciones para agregar, actualizar y eliminar tareas, usando *destructuring* y *spread* para manipular los datos. Además, emplea *optional chaining* para acceder de forma segura a las propiedades. Finalmente, genera tanto copias superficiales como profundas del gestor, lo que permite modificar los datos sin afectar el original.