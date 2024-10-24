// Importamos las interfaces y tipos necesarios desde Express
import { Request, Response, NextFunction } from "express";
// Importamos el middleware de autenticación para realizar pruebas unitarias sobre él
import { authMiddleware } from "../src/middlewares/auth.middleware";
// Importamos jsonwebtoken para firmar tokens de prueba
import jwt from "jsonwebtoken";

// Descripción del grupo de pruebas unitarias para el middleware de autenticación
describe("Auth Middleware", () => {

  // Caso de prueba: debería denegar acceso si no se proporciona un token
  it("should deny access if no token is provided", async () => {
    // Simulamos un objeto Request sin token de autorización
    const req = { header: jest.fn().mockReturnValue(null) } as unknown as Request;

    // Simulamos la respuesta con funciones para status y json
    const res = {
      status: jest.fn().mockReturnThis(), // status devuelve el propio objeto res para encadenar métodos
      json: jest.fn() // json para enviar la respuesta en formato JSON
    } as unknown as Response;

    // Simulamos la función next para verificar si se llama o no
    const next = jest.fn() as NextFunction;

    // Ejecutamos el middleware con los objetos simulados
    await authMiddleware(req, res, next);
    
    // Verificamos que se haya llamado a res.status con el código 401 (No autorizado)
    expect(res.status).toHaveBeenCalledWith(401);
    // Verificamos que se haya llamado a res.json con el mensaje de error correcto
    expect(res.json).toHaveBeenCalledWith({ error: "Access denied, no token provided." });
  });

  // Caso de prueba: debería denegar acceso si el token proporcionado es inválido
  it("should deny access if token is invalid", async () => {
    // Simulamos un objeto Request con un token inválido en el header de autorización
    const req = { header: jest.fn().mockReturnValue("Bearer invalid_token") } as unknown as Request;

    // Simulamos la respuesta con funciones para status y json
    const res = {
      status: jest.fn().mockReturnThis(), // status devuelve el propio objeto res para encadenar métodos
      json: jest.fn() // json para enviar la respuesta en formato JSON
    } as unknown as Response;

    // Simulamos la función next para verificar si se llama o no
    const next = jest.fn() as NextFunction;

    // Ejecutamos el middleware con los objetos simulados
    await authMiddleware(req, res, next);
    
    // Verificamos que se haya llamado a res.status con el código 400 (Token inválido)
    expect(res.status).toHaveBeenCalledWith(400);
    // Verificamos que se haya llamado a res.json con el mensaje de error correspondiente
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid token." });
  });
});
