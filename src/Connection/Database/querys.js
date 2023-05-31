export const querys = {
  EliminarUsuarioTodo: "DELETE FROM Docente",
  InsertarCuentaDocente: "INSERT INTO Cuenta_Docente (numero_personal, contrasena, correo, url_imagen) VALUES ($1, $2, $3, $4 )",
  ObtenerInfoDocentes: "SELECT D.Nombre, D.Numero_Personal, D.facultad_asignada, C.URL_Imagen FROM Docente D INNER JOIN Cuenta_Docente C ON D.Numero_Personal = C.Numero_Personal WHERE D.Numero_Personal = $1",
  VerMateriaDocente: "SELECT * FROM Materia_Docente",
  EncontrarMateriaDocente: "SELECT * FROM Materia_Docente WHERE NRC = $1 AND Numero_Personal = $2",
  verificarCuenta: "SELECT numero_personal FROM Cuenta_Docente WHERE correo = $1 AND contrasena = $2 "
};
