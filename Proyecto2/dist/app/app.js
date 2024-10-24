"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes")); // Asegúrate de tener esta línea para las rutas de autenticación
const user_service_1 = require("../services/user.service");
const user_repository_1 = require("../repositories/user.repository");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Añadir las rutas
app.use("/api", user_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
const userRepository = new user_repository_1.UserRepository();
const userService = new user_service_1.UserService(userRepository); // Registrar el servicio
app.set('userService', userService); // Esta disponible para las pruebas
// Configuración Swagger
const swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API RESTful con Node.js y TypeScript",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID del usuario",
                            example: 1
                        },
                        name: {
                            type: "string",
                            description: "Nombre del usuario",
                            example: "John Doe"
                        },
                        email: {
                            type: "string",
                            description: "Correo electrónico del usuario",
                            example: "johndoe@example.com"
                        },
                        password: {
                            type: "string",
                            description: "Contraseña del usuario",
                            example: "1234"
                        }
                    }
                }
                // Agregar otros esquemas aquí, como Producto si es necesario
            }
        },
        security: [{
                bearerAuth: []
            }]
    },
    apis: ["./src/routes/*.ts"],
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get("/", (req, res) => {
    res.send("Bienvenido a la API RESTful con Node.js y TypeScript!");
});
exports.default = app;
