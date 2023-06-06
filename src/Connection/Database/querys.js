export const querys = {
  EliminarUsuarioTodo: "DELETE FROM Docente",
  InsertarCuentaDocente: "INSERT INTO Cuentas_Docente (numero_personal, contrasena, correo, url_imagen) VALUES ($1, $2, $3, $4 )",
  ObtenerInfoDocentes: "SELECT D.nombres, D.apellidos, D.Numero_Personal, D.facultad, C.URL_Imagen FROM Docentes D INNER JOIN Cuentas_Docente C ON D.Numero_Personal = C.Numero_Personal WHERE D.Numero_Personal = $1",
  VerMateriaDocente: "SELECT nrc FROM docentes_materias WHERE numero_personal = $1;",
  EncontrarMateriaDocente: "SELECT * FROM materias WHERE NRC = $1",
  verificarCuenta: "SELECT numero_personal FROM Cuentas_Docente WHERE correo = $1 AND contrasena = $2 ",
  CuentaExistente: "SELECT COUNT(correo) FROM Cuentas_Docente WHERE correo = $1",
  DocenteExistencia: "SELECT COUNT(numero_personal) FROM Docentes WHERE numero_personal = $1;",
};
