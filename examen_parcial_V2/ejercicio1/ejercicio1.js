var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Clase abstracta para encapsular lógica común
var BaseTask = /** @class */ (function () {
    function BaseTask(name) {
        this.name = name;
    }
    // Método protegido para registrar la fase en la consola
    BaseTask.prototype.logPhase = function (phase) {
        console.log("La tarea \"".concat(this.name, "\" se est\u00E1 ejecutando en la fase: ").concat(phase));
    };
    return BaseTask;
}());
// Macrotarea que se ejecutará en el Event Loop
var MacroTask = /** @class */ (function (_super) {
    __extends(MacroTask, _super);
    function MacroTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MacroTask.prototype.execute = function () {
        var _this = this;
        // Usamos setTimeout para simular una macrotarea
        setTimeout(function () {
            _this.logPhase("Macrotarea (setTimeout)");
        }, 0);
    };
    return MacroTask;
}(BaseTask));
// Microtarea que se ejecutará en la cola de microtareas
var MicroTask = /** @class */ (function (_super) {
    __extends(MicroTask, _super);
    function MicroTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MicroTask.prototype.execute = function () {
        var _this = this;
        // Usamos process.nextTick para simular una microtarea
        process.nextTick(function () {
            _this.logPhase("Microtarea (process.nextTick)");
        });
    };
    return MicroTask;
}(BaseTask));
// Tarea basada en Promesa para demostrar el uso de promesas
var PromiseTask = /** @class */ (function (_super) {
    __extends(PromiseTask, _super);
    function PromiseTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PromiseTask.prototype.execute = function () {
        var _this = this;
        // Resolvemos una promesa para ejecutar una microtarea
        Promise.resolve().then(function () {
            _this.logPhase("Promesa (Microtarea)");
        });
    };
    return PromiseTask;
}(BaseTask));
// Tarea asíncrona que usa async/await
var AsyncAwaitTask = /** @class */ (function (_super) {
    __extends(AsyncAwaitTask, _super);
    function AsyncAwaitTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncAwaitTask.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Usamos setTimeout dentro de una promesa para simular una operación asincrónica
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 0); })];
                    case 1:
                        // Usamos setTimeout dentro de una promesa para simular una operación asincrónica
                        _a.sent();
                        this.logPhase("Async/Await (Macrotarea)");
                        return [2 /*return*/];
                }
            });
        });
    };
    return AsyncAwaitTask;
}(BaseTask));
// Clase compuesta que demuestra polimorfismo y herencia
var CompositeTask = /** @class */ (function (_super) {
    __extends(CompositeTask, _super);
    function CompositeTask(name, subTasks) {
        var _this = _super.call(this, name) || this;
        _this.subTasks = [];
        _this.subTasks = subTasks;
        return _this;
    }
    // Método que ejecuta todas las sub-tareas
    CompositeTask.prototype.execute = function () {
        console.log("La tarea compuesta \"".concat(this.name, "\" est\u00E1 iniciando..."));
        this.subTasks.forEach(function (task) { return task.execute(); });
    };
    return CompositeTask;
}(BaseTask));
// Función para demostrar el manejo de null y undefined con narrowing
function executeTask(task) {
    if (task) {
        task.execute();
    }
    else {
        console.log("La tarea no está definida.");
    }
}
// Configuración de las tareas para simular el Event Loop
var tasks = [
    new MacroTask("Tarea de Timeout"),
    new MicroTask("Tarea de NextTick"),
    new PromiseTask("Tarea de Promesa"),
    new AsyncAwaitTask("Tarea de Async/Await"),
];
// Ejecución de tareas individuales
tasks.forEach(executeTask);
// Ejemplo de tarea compuesta que demuestra polimorfismo
var compositeTask = new CompositeTask("Tarea Compuesta", tasks);
executeTask(compositeTask);
