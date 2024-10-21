// Definición de interfaces y clases base para tareas
interface Task {
    name: string;
    execute(): void;
  }
  
  // Clase abstracta para encapsular lógica común
  abstract class BaseTask implements Task {
    constructor(public name: string) {}
  
    // Método abstracto que se implementará en clases derivadas
    abstract execute(): void;
  
    // Método protegido para registrar la fase en la consola
    protected logPhase(phase: string) {
      console.log(`La tarea "${this.name}" se está ejecutando en la fase: ${phase}`);
    }
  }
  
  // Macrotarea que se ejecutará en el Event Loop
  class MacroTask extends BaseTask {
    execute() {
      // Usamos setTimeout para simular una macrotarea
      setTimeout(() => {
        this.logPhase("Macrotarea (setTimeout)");
      }, 0);
    }
  }
  
  // Microtarea que se ejecutará en la cola de microtareas
  class MicroTask extends BaseTask {
    execute() {
      // Usamos process.nextTick para simular una microtarea
      process.nextTick(() => {
        this.logPhase("Microtarea (process.nextTick)");
      });
    }
  }
  
  // Tarea basada en Promesa para demostrar el uso de promesas
  class PromiseTask extends BaseTask {
    execute() {
      // Resolvemos una promesa para ejecutar una microtarea
      Promise.resolve().then(() => {
        this.logPhase("Promesa (Microtarea)");
      });
    }
  }
  
  // Tarea asíncrona que usa async/await
  class AsyncAwaitTask extends BaseTask {
    async execute() {
      // Usamos setTimeout dentro de una promesa para simular una operación asincrónica
      await new Promise((resolve) => setTimeout(resolve, 0));
      this.logPhase("Async/Await (Macrotarea)");
    }
  }
  
  // Ejemplo de uso de utility types de TypeScript
  type ReadonlyTask = Readonly<Pick<Task, 'name'>>;
  
  // Clase compuesta que demuestra polimorfismo y herencia
  class CompositeTask extends BaseTask {
    private subTasks: Task[] = [];
  
    constructor(name: string, subTasks: Task[]) {
      super(name);
      this.subTasks = subTasks;
    }
  
    // Método que ejecuta todas las sub-tareas
    execute() {
      console.log(`La tarea compuesta "${this.name}" está iniciando...`);
      this.subTasks.forEach((task) => task.execute());
    }
  }
  
  // Función para demostrar el manejo de null y undefined con narrowing
  function executeTask(task: Task | null | undefined) {
    if (task) {
      task.execute();
    } else {
      console.log("La tarea no está definida.");
    }
  }
  
  // Configuración de las tareas para simular el Event Loop
  const tasks: Task[] = [
    new MacroTask("Tarea de Timeout"),
    new MicroTask("Tarea de NextTick"),
    new PromiseTask("Tarea de Promesa"),
    new AsyncAwaitTask("Tarea de Async/Await"),
  ];
  
  // Ejecución de tareas individuales
  tasks.forEach(executeTask);
  
  // Ejemplo de tarea compuesta que demuestra polimorfismo
  const compositeTask = new CompositeTask("Tarea Compuesta", tasks);
  executeTask(compositeTask);
  