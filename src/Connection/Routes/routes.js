import { Router } from "express";
import {
  AltaCuentaDocente,
  EliminarUsuarioTodo,
  generarToken,
  DocentesMateria,
  encontrarMateriaDocente,
  obtenerRegistros,
  ObtenerInfoDocente,
  IniciarSesion,
  Traer,
  materiaSalon,
  materiaSalonHorario,
  obtenerAlumno,
  enviarCorreo
} from "../Controllers/controlador.js";

const router = Router();

router.get("/", function (req, res) {
  console.log("Conectado")
});

router.post("/Servidor/RegistrarUsuarios", AltaCuentaDocente);

router.post("/Servidor/enviar", enviarCorreo);

router.delete("/Servidor/EliminarUsuarioTodo", EliminarUsuarioTodo);
router.post("/Servidor/IniciarSesion", IniciarSesion);

router.get("/Servidor/VerMateriaDocente", DocentesMateria);

router.get("/Servidor/Materias", encontrarMateriaDocente);

router.get("/Servidor/ObtenerDocente", ObtenerInfoDocente);
router.post("/Servidor/GenerarToken", generarToken);
router.post("/Servidor/MateriaSalon",materiaSalon);

router.post("/Servidor/MateriaHorario",materiaSalonHorario);

router.get("/Servidor/ObtenerAlumno",obtenerAlumno);



export default router;
