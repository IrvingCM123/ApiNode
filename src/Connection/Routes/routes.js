import { Router } from "express";
import {
  AltaCuentaDocente,
  enviarCorreo,
  EliminarUsuarioTodo,
  generarToken,
  DocentesMateria,
  encontrarMateriaDocente,
  obtenerRegistros,
  ObtenerInfoDocente
} from "../Controllers/controlador.js";

const router = Router();

router.get("/", function (req, res) {
  console.log("Conectado")
});

router.post("/Servidor/enviar", enviarCorreo);

router.post("/Servidor/RegistrarUsuarios", AltaCuentaDocente);

router.delete("/Servidor/EliminarUsuarioTodo", EliminarUsuarioTodo);

router.post("/Servidor/IniciarSesion", generarToken);

router.get("/Servidor/VerMateriaDocente", DocentesMateria);

router.get("/Servidor/ObtenerDocente", ObtenerInfoDocente);

export default router;
