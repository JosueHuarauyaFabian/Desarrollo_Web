// src/types/express.d.ts

// Eliminar o comentar este código
// declare namespace Express {
//   export interface Request {
//     user?: {
//       id_usuario: number;
//       rol: string;
//     };
//   }
// }

// src/types/express.d.ts

declare namespace Express {
    interface User {
      id_usuario: number;
      rol: string;
    }
  }
  