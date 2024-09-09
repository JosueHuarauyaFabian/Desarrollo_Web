import { routeHello, routeAPINames } from "./routes.js";
import express from "express";

const server = express();
const port = 3000;

// Ruta /hello
server.get("/hello", function (req, res) {
  const response = routeHello();
  res.send(response);
});

// Ruta /api/names
server.get("/api/names", async function (req, res) {
  let response;
  try {
    response = await routeAPINames();
  } catch (err) {
    console.log(err);
    response = "Error fetching data";
  }
  res.send(response);
});

// Escuchar en el puerto especificado
server.listen(port, function () {
  console.log("Listening on " + port);
});
