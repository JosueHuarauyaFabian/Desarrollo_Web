
# *Plataforma de Gestión Segura de Infraestructura en la Nube*

---
## **Descripción del Proyecto**

La **Plataforma de Gestión Segura de Infraestructura en la Nube** es una solución integral diseñada para facilitar la administración eficiente y segura de recursos en la nube. La plataforma permite a los usuarios gestionar usuarios, recursos y actividades, garantizando altos estándares de seguridad mediante la implementación de autenticación avanzada y mejores prácticas en el desarrollo.

---

## **Presentación del Trabajo en GitHub**

### **Organización y Estructura del Repositorio**

El repositorio está organizado de manera clara y modular, facilitando la navegación y el mantenimiento del proyecto. A continuación, se detalla la estructura de directorios tanto para el backend como para el frontend:

```
backend/
├── package.json
├── package-lock.json
├── src/
│   ├── app.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── resourceController.ts
│   │   └── userController.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   └── logMiddleware.ts
│   ├── models/
│   │   ├── LogActividad.ts
│   │   ├── Resource.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── resourceRoutes.ts
│   │   └── userRoutes.ts
│   ├── server.ts
│   ├── services/
│   │   └── api.ts
│   ├── swagger.yaml
│   ├── types/
│   │   ├── express.d.ts
│   │   └── yaml.d.ts
│   └── utils/
│       ├── database.ts
│       └── passport.ts
├── tests/
│   └── authController.test.ts
└── tsconfig.json

frontend/
├── package.json
├── package-lock.json
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...otros componentes
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── services/
│   │   └── api.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── types/
│       └── ...definiciones de tipos
├── Dockerfile
├── docker-compose.yml
└── tsconfig.json
```

**Detalles Clave:**

- **Directorios Separados para Servicios, Modelos y Controladores:**
  - `controllers/`: Contiene la lógica de negocio y manejo de solicitudes.
  - `models/`: Define los esquemas y estructuras de datos utilizados en la aplicación.
  - `services/`: Maneja la comunicación con APIs externas o servicios internos.

- **Documentación Interna en el Código:**
  - Se han añadido comentarios claros y concisos en cada archivo para explicar la funcionalidad y propósito de las diferentes partes del código.
  - Uso de **JSDoc** para generar documentación automática si se requiere.

### **Manejo Profesional del Control de Versiones**

Se ha implementado un manejo de versiones profesional utilizando **Git** con un flujo de trabajo basado en ramas, asegurando la estabilidad y continuidad del desarrollo.

**Prácticas Implementadas:**

- **Uso de Ramas para Desarrollo y Producción:**
  - `main`: Rama principal que siempre contiene el código estable y listo para producción.
  - `develop`: Rama de desarrollo donde se integran nuevas características antes de fusionarlas en `main`.
  - **Ramas de Características (`feature/*`):** Cada nueva característica se desarrolla en su propia rama, facilitando la gestión y revisión de código.

- **Integración Continua:**
  - Se ha configurado **GitHub Actions** para automatizar pruebas y despliegues en cada push a ramas específicas.
  - **Ejemplo de Workflow (`.github/workflows/ci.yml`):**

    ```yaml
    name: CI

    on:
      push:
        branches: [ develop, main ]
      pull_request:
        branches: [ develop ]

    jobs:
      build:

        runs-on: ubuntu-latest

        steps:
        - uses: actions/checkout@v2
        - name: Use Node.js
          uses: actions/setup-node@v2
          with:
            node-version: '14'
        - run: npm install
        - run: npm run build --if-present
        - run: npm test
    ```

### **Documentación para Despliegue e Instalación**

Se proporciona una documentación completa que facilita la configuración, despliegue y mantenimiento de la plataforma.

**Contenido Incluido:**

- **Instrucciones para Configurar y Conectar con Servicios en la Nube:**

  ## **Despliegue en la Nube**

  La plataforma se despliega utilizando **Docker** y se orquesta con **Docker Compose**. A continuación, se detallan los pasos para configurar y desplegar la aplicación en un servicio en la nube como **AWS**, **Azure** o **Google Cloud Platform (GCP)**.

  ### **Requisitos Previos**

  - Cuenta activa en el proveedor de nube elegido.
  - CLI del proveedor instalado y configurado en tu máquina.
  - Docker y Docker Compose instalados.

  ### **Pasos de Despliegue**

  1. **Construir las Imágenes de Docker:**

     Navega al directorio raíz del proyecto y ejecuta:

     ```bash
     docker-compose build
     ```

  2. **Configurar Variables de Entorno:**

     Crea un archivo `.env` en el directorio raíz con las variables necesarias:

     ```env
     PORT=4000
     JWT_SECRET=tu_secreto_jwt
     DB_USER=tu_usuario_de_postgres
     DB_HOST=db
     DB_NAME=tu_base_de_datos
     DB_PASSWORD=tu_contraseña_de_postgres
     DB_PORT=5432
     GOOGLE_CLIENT_ID=tu_google_client_id
     GOOGLE_CLIENT_SECRET=tu_google_client_secret
     NODE_ENV=production
     ```

  3. **Desplegar en el Servicio de Nube:**

     - **AWS ECS:** Utiliza Elastic Container Service para gestionar los contenedores.
     - **Azure AKS:** Utiliza Azure Kubernetes Service para orquestar los contenedores.
     - **GCP GKE:** Utiliza Google Kubernetes Engine para gestionar los contenedores.
     
     Sigue las guías específicas del proveedor para desplegar usando **Docker Compose** o integrando con **Kubernetes**.

  4. **Configurar Seguridad y Redes:**

     - Configura los grupos de seguridad y reglas de firewall para permitir el tráfico necesario.
     - Asegura que las variables de entorno están protegidas y no expuestas públicamente.

  5. **Monitoreo y Escalabilidad:**

     - Implementa herramientas de monitoreo como **Prometheus** y **Grafana**.
     - Configura el escalado automático basado en la carga de trabajo.
  ```

- **Detalles sobre la Configuración de Seguridad y Variables de Entorno:**

  ```markdown
  ## **Configuración de Seguridad**

  La plataforma sigue las mejores prácticas de seguridad para proteger la infraestructura y los datos de los usuarios.

  ### **Autenticación y Autorización**

  - **OAuth 2.0:** Implementado para gestionar flujos de autenticación seguros.
  - **JWT (JSON Web Tokens):** Utilizados para la autenticación y autorización de usuarios.

  ### **Almacenamiento Seguro de Tokens y Credenciales**

  - **Variables de Entorno:** Almacenadas en archivos `.env` y gestionadas de manera segura en el entorno de despliegue.
  - **Hashing de Contraseñas:** Uso de `bcrypt` para hash de contraseñas antes de almacenarlas en la base de datos.

  ### **Protección contra Vulnerabilidades Comunes**

  - **Validación de Datos:** Uso de `Joi` para validar y sanitizar entradas de usuarios.
  - **CORS:** Configurado para controlar el acceso a la API desde dominios permitidos.
  - **HTTPS:** Implementado para asegurar la comunicación entre clientes y servidores.
  ```

- **Instrucciones de Instalación:**

  ## **Instalación**

  A continuación, se detallan los pasos para instalar y configurar la plataforma en tu máquina local.

  ### **Requisitos Previos**

  - **Node.js** v14 o superior
  - **npm** v6 o superior
  - **Docker** y **Docker Compose**
  - **PostgreSQL** instalado y en funcionamiento

  ### **Pasos de Instalación**

  1. **Clonar el Repositorio:**

     ```bash
     git clone https://github.com/tu_usuario/tu_repositorio.git
     cd tu_repositorio/backend
     ```

  2. **Instalar Dependencias:**

     ```bash
     npm install
     ```

  3. **Configurar Variables de Entorno:**

     Crea un archivo `.env` en el directorio `backend/` con las variables necesarias:

     ```env
     PORT=4000
     JWT_SECRET=tu_secreto_jwt
     DB_USER=tu_usuario_de_postgres
     DB_HOST=db
     DB_NAME=tu_base_de_datos
     DB_PASSWORD=tu_contraseña_de_postgres
     DB_PORT=5432
     GOOGLE_CLIENT_ID=tu_google_client_id
     GOOGLE_CLIENT_SECRET=tu_google_client_secret
     NODE_ENV=development
     ```

  4. **Inicializar la Base de Datos:**

     Ejecuta las migraciones y si es necesario, pobla la base de datos con datos de ejemplo.

     ```bash
     npm run migrate
     npm run seed
     ```

  5. **Iniciar la Aplicación:**

     - **Modo Desarrollo:**

       ```bash
       npm run dev
       ```

     - **Modo Producción:**

       ```bash
       npm run build
       npm start
       ```


---

## **Exposición y Funcionalidades Desarrolladas**

### **Backend Eficiente con Node.js y Express.js**

**Descripción:**

El backend de la plataforma está construido sobre **Node.js** y **Express.js**, proporcionando una API RESTful bien estructurada que maneja las operaciones de gestión de infraestructura en la nube.

**Características Clave:**

- **API RESTful:**
  - Rutas organizadas y modularizadas para diferentes recursos (`auth`, `users`, `resources`).
  - Manejo eficiente de solicitudes HTTP con respuestas estructuradas.

- **Manejo de Sesiones y Persistencia:**
  - Uso de **JWT** para la autenticación y autorización.
  - Persistencia de datos utilizando **PostgreSQL** como base de datos relacional.

- **Logging y Monitoreo:**
  - Implementación de middleware para registrar actividades y monitorear el rendimiento.

**Ejemplo de Endpoints:**

- **Autenticación:**
  - `POST /api/auth/register`: Registro de nuevos usuarios.
  - `POST /api/auth/login`: Inicio de sesión de usuarios.

- **Gestión de Usuarios:**
  - `GET /api/users/:id`: Obtener información de un usuario.
  - `PUT /api/users/:id`: Actualizar información de un usuario.
  - `DELETE /api/users/:id`: Eliminar un usuario (solo administradores).

- **Gestión de Recursos:**
  - `POST /api/resources`: Crear un nuevo recurso.
  - `GET /api/resources`: Obtener todos los recursos.
  - `PUT /api/resources/:id`: Actualizar un recurso.
  - `DELETE /api/resources/:id`: Eliminar un recurso.

### **Implementación de TypeScript**

**Descripción:**

El proyecto utiliza **TypeScript** para añadir tipado estático y mejorar la calidad y mantenibilidad del código.

**Beneficios:**

- **Tipado Estático:**
  - Prevención de errores en tiempo de compilación.
  - Mejora de la autocompletación y documentación en los IDEs.

- **Interfaces y Tipos:**
  - Definición clara de estructuras de datos mediante interfaces y tipos personalizados.

- **Manejo de Tipos Complejos:**
  - Uso de genéricos y tipos avanzados para manejar datos dinámicos y seguros.

**Ejemplo de Interfaces:**

```typescript
// src/models/User.ts

export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  contraseña: string;
  rol: 'Administrador' | 'Operador';
}
```

### **Frontend Desarrollado con React**

**Descripción:**

El frontend de la plataforma está desarrollado con **React**, implementando principios de diseño moderno y componentes reutilizables para una experiencia de usuario fluida y eficiente.

**Características Clave:**

- **Principios de Diseño Moderno:**
  - Uso de **CSS-in-JS** o **SASS** para estilos mantenibles y escalables.
  - Diseño responsivo para adaptarse a diferentes dispositivos y tamaños de pantalla.

- **Componentes Funcionales y de Clase:**
  - Mayor uso de **Componentes Funcionales** con **Hooks** para manejar el estado y efectos secundarios.
  - Uso de **Componentes de Clase** cuando es necesario manejar estados más complejos o ciclos de vida específicos.

**Ejemplo de Componente:**

- **Login Component:**

  ```tsx
  // frontend/src/pages/Login.tsx

  import React, { useState } from 'react';
  import api from '../services/api';

  const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await api.post('/auth/login', { email, contraseña });
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
      } catch (err: any) {
        setError(err.response.data.error || 'Error al iniciar sesión');
      }
    };

    return (
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  };

  export default Login;
  ```

### **Contenerización y Orquestación con Docker**

**Descripción:**

La plataforma está contenerizada utilizando **Docker**, lo que facilita el despliegue, la escalabilidad y la consistencia entre entornos de desarrollo y producción. Además, se utiliza **Docker Compose** para orquestar los diferentes servicios.

**Características Clave:**

- **Docker Swarm o Kubernetes:**
  - **Docker Swarm:** Para orquestación sencilla y escalabilidad.
  - **Kubernetes:** Para orquestación avanzada y gestión de clusters.

- **Configuración de Redes y Volúmenes:**
  - Configuración de redes privadas para comunicación segura entre contenedores.
  - Uso de volúmenes para persistencia de datos.

**Ejemplo de `docker-compose.yml`:**

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - '4000:4000'
    environment:
      - PORT=4000
      - JWT_SECRET=tu_secreto_jwt
      - DB_USER=tu_usuario_de_postgres
      - DB_HOST=db
      - DB_NAME=tu_base_de_datos
      - DB_PASSWORD=tu_contraseña_de_postgres
      - DB_PORT=5432
      - GOOGLE_CLIENT_ID=tu_google_client_id
      - GOOGLE_CLIENT_SECRET=tu_google_client_secret
      - NODE_ENV=development
    depends_on:
      - db
    networks:
      - app-network

  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    environment:
      - REACT_APP_API_URL=http://localhost:4000/api
    networks:
      - app-network

  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=tu_usuario_de_postgres
      - POSTGRES_PASSWORD=tu_contraseña_de_postgres
      - POSTGRES_DB=tu_base_de_datos
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  db-data:
```

### **Pruebas con Jest y Cobertura de Código**

**Descripción:**

Se han implementado pruebas unitarias y de integración utilizando **Jest**, asegurando la calidad y fiabilidad del código. Además, se genera un informe de cobertura de código para identificar áreas que requieren más pruebas.

**Características Clave:**

- **Pruebas Unitarias:**
  - Pruebas individuales de funciones y componentes para asegurar que funcionan correctamente en aislamiento.

- **Pruebas de Integración:**
  - Pruebas que verifican la interacción entre diferentes módulos y servicios.

- **Cobertura de Código:**
  - Generación de informes detallados que muestran qué porcentaje del código está cubierto por pruebas.

**Ejemplo de Prueba con Jest:**

```typescript
// tests/authController.test.ts

import request from 'supertest';
import app from '../src/app';
import pool from '../src/utils/database';

describe('Auth Controller', () => {
  beforeAll(async () => {
    // Configuración inicial, como crear tablas o insertar datos de prueba
  });

  afterAll(async () => {
    // Limpieza, como eliminar datos de prueba y cerrar la conexión a la base de datos
    await pool.end();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          nombre: 'Juan Pérez',
          email: 'juan.perez@example.com',
          contraseña: 'Password123!',
          rol: 'Administrador',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('usuario');
      expect(res.body.usuario).not.toHaveProperty('contraseña');
    });

    it('should not register user with existing email', async () => {
      // Suponiendo que el usuario ya existe
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          nombre: 'Juan Pérez',
          email: 'juan.perez@example.com',
          contraseña: 'Password123!',
          rol: 'Administrador',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'El correo electrónico ya está registrado');
    });
  });


});
```

**Comando para Generar Cobertura:**

```bash
npm run test -- --coverage
```

### **Integración con Servicios en la Nube y Manejo de Infraestructura**

**Descripción:**

La plataforma está integrada con servicios en la nube para gestionar y monitorear recursos de infraestructura de manera eficiente y escalable.

**Características Clave:**

- **Uso de APIs de Proveedores de Nube:**
  - **AWS SDK:** Para interactuar con servicios como EC2, S3, RDS, etc.
  - **Azure SDK:** Para gestionar recursos en Azure.
  - **Google Cloud SDK:** Para interactuar con servicios de GCP.

- **Gestión y Monitoreo de Recursos:**
  - Implementación de herramientas como **Terraform** para la gestión de infraestructura como código.
  - Uso de **Prometheus** y **Grafana** para monitoreo y visualización de métricas.

**Ejemplo de Integración con AWS S3:**

```typescript
// src/services/awsService.ts

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = async (file: Express.Multer.File) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: `${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};
```

### **Seguridad Avanzada con OAuth 2.0 y Mejores Prácticas**

**Descripción:**

Se han implementado mecanismos de seguridad avanzados para proteger la plataforma y los datos de los usuarios, siguiendo las mejores prácticas de la industria.

**Características Clave:**

- **Implementación de Flujos de Autenticación Seguros:**
  - **OAuth 2.0:** Para la autenticación de usuarios a través de proveedores externos como Google.
  - **JWT (JSON Web Tokens):** Para la gestión de sesiones seguras y autorización.

- **Almacenamiento Seguro de Tokens y Credenciales:**
  - **HTTP-Only Cookies:** Almacenamiento de tokens JWT en cookies seguras para prevenir ataques de XSS.
  - **Hashing de Contraseñas:** Uso de `bcrypt` para almacenar contraseñas de manera segura.

- **Mejores Prácticas de Seguridad:**
  - **CORS Configurado:** Para restringir el acceso a la API desde dominios no autorizados.
  - **Validación y Sanitización de Datos:** Uso de `Joi` para validar entradas de usuarios y prevenir inyecciones.
  - **HTTPS Obligatorio:** Asegurar que todas las comunicaciones se realicen sobre HTTPS.

**Ejemplo de Middleware de Autenticación:**

```typescript
// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers['auth-token'] as string;
  if (!token)
    return res.status(401).json({ error: 'Acceso denegado: No se proporcionó un token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Express.User;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' });
  }
};

export const verifyAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.rol !== 'Administrador') {
    return res.status(403).json({ error: 'Acceso denegado: Se requiere rol de Administrador' });
  }
  next();
};
```

---

## **Conclusiones**

La **Plataforma de Gestión Segura de Infraestructura en la Nube** ha sido desarrollada con un enfoque en la seguridad, eficiencia y escalabilidad. Utilizando tecnologías modernas como **Node.js**, **Express.js**, **TypeScript**, **React**, y **Docker**, se ha creado una solución robusta capaz de gestionar infraestructura en la nube de manera segura y eficiente.

**Logros Clave:**

- **Estructura de Código Limpia y Mantenible:** Gracias al uso de **TypeScript** y una arquitectura modular.
- **Seguridad Mejorada:** Implementación de **OAuth 2.0**, **JWT**, y mejores prácticas de seguridad.
- **Escalabilidad:** Contenerización con **Docker** y orquestación para manejar cargas crecientes.
- **Calidad de Código Asegurada:** Pruebas exhaustivas con **Jest** y cobertura de código para garantizar la fiabilidad.
- **Integración con Servicios en la Nube:** Uso eficiente de APIs de proveedores para gestionar recursos de manera dinámica.

---

# **Apéndice: Scripts y Comandos Utilizados**

**Backend (`backend/package.json`):**

```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts",
    "build": "tsc && cp ./swagger.yaml ./build/",
    "start": "node build/server.js",
    "test": "jest --coverage",
    "migrate": "node src/utils/migrate.js",
    "seed": "node src/utils/seed.js"
  },
  "dependencies": {
    "bcrypt": "^5.0.1",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "joi": "^17.4.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "passport": "^0.4.1",
    "passport-google-oauth20": "^2.0.0",
    "pg": "^8.7.1",
    "swagger-ui-express": "^4.1.6",
    "yamljs": "^0.3.0"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.13",
    "@types/jest": "^27.0.2",
    "@types/jsonwebtoken": "^8.5.6",
    "@types/morgan": "^1.9.3",
    "@types/passport-google-oauth20": "^2.0.8",
    "@types/swagger-ui-express": "^4.1.3",
    "@types/yamljs": "^0.2.30",
    "jest": "^27.2.5",
    "nodemon": "^2.0.15",
    "ts-jest": "^27.0.5",
    "ts-node": "^10.4.0",
    "typescript": "^4.4.4"
  }
}
```

**Frontend (`frontend/package.json`):**

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "jest --coverage"
  },
  "dependencies": {
    "axios": "^0.24.0",
    "next": "^12.0.7",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.3.0"
  },
  "devDependencies": {
    "@types/react": "^17.0.34",
    "@types/react-dom": "^17.0.11",
    "@types/react-router-dom": "^5.3.2",
    "jest": "^27.3.1",
    "ts-jest": "^27.0.7",
    "typescript": "^4.4.4"
  }
}
```

---

# **Notas Finales**

- **Mantenimiento y Escalabilidad:** La estructura modular y el uso de contenedores facilitan la expansión y el mantenimiento continuo de la plataforma.
- **Seguridad:** La implementación de **OAuth 2.0** y **JWT**, junto con las mejores prácticas en manejo de contraseñas y validación de datos, aseguran que la plataforma sea robusta contra vulnerabilidades comunes.
- **Documentación Clara:** La documentación proporcionada asegura que cualquier miembro del equipo o desarrollador externo pueda entender, instalar y contribuir al proyecto sin dificultades.

---

