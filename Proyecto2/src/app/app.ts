import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import userRoutes from "../routes/user.routes"; 
import authRoutes from "../routes/auth.routes"; // Asegúrate de tener esta línea para las rutas de autenticación
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

const app = express();
app.use(express.json());

// Añadir las rutas
app.use("/api", userRoutes);
app.use("/api/auth", authRoutes); 

const userRepository = new UserRepository();
const userService = new UserService(userRepository);  // Registrar el servicio

app.set('userService', userService);  // Esta disponible para las pruebas


// Configuración Swagger
const swaggerSpec = swaggerJSDoc({
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Bienvenido a la API RESTful con Node.js y TypeScript!");
});

export default app;
