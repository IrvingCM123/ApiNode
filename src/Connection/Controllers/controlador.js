import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import { pool } from "../Database/connection.js";
import jwt from "jsonwebtoken";
import { querys } from "../Database/querys.js";
import QueryStream from "pg-query-stream";

import dotenv from "dotenv";
dotenv.config();

export const obtenerRegistros = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM docente");
    res.json(result.rows);
    client.release();
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    res.status(500).json({ error: "Error al obtener los registros" });
  }
};

export const enviarCorreo = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.Gmail_Service,
      auth: {
        user: process.env.Gmail_User,
        pass: process.env.Gmail_Password,
      },
    });

    const { numero, nrc } = req.body;

    const message = {
      from: process.env.Gmail_User,
      to: process.env.Gmail_Destiny,
      subject: process.env.Gmail_Subject_Alta_Materia,
      text: `
        Docente: ${numero}
        Materia: ${nrc}
      `,
    };

    transporter.sendMail(message, function (error, info) {
      if (error) {
        console.log(error);
        res.send("Error al enviar el correo electrónico");
      } else {
        console.log("Correo electrónico enviado: " + info.response);
        res.send("Correo electrónico enviado correctamente");
      }
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const EliminarUsuarioTodo = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(querys.EliminarUsuarioTodo);
    res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const AltaCuentaDocente = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [Numero_Personal, Contraseña, Correo, URL_Imagen] = req.body;
    
    const client = await pool.connect();
    await client.query(querys.InsertarCuentaDocente, [
      Numero_Personal,
      Contraseña,
      Correo,
      URL_Imagen,
    ]);
    res.json({ Numero_Personal, Contraseña, Correo, URL_Imagen});
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const ObtenerInfoDocente = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { NumeroPersonal } = decodedToken;

    const client = await pool.connect();
    const result = await client.query(querys.ObtenerInfoDocentes, [
      NumeroPersonal,
    ]);
    const { nombre, numero_personal, facultad_asignada, url_imagen } =
      result.rows[0];
    res.json({ nombre, numero_personal, facultad_asignada, url_imagen });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verMateriaDocente = async (req, res) => {
  try {
    const query = new QueryStream(querys.VerMateriaDocente);
    const stream = pool.query(query);
    stream.pipe(res);
  } catch (error) {
    res.status(500).send("Error retrieving materia docente: " + error.message);
  }
};

export const encontrarMateriaDocente = async (req, res) => {
  const { NRC, NumeroPersonal } = req.params;
  try {
    const result = await pool.query(querys.EncontrarMateriaDocente, [
      NRC,
      NumeroPersonal,
    ]);
    res.send(result.rows[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const generarToken = async (req, res) => {
  try {
    const { Correo, Contraseña } = req.body;

    const result = await pool.query(querys.verificarCuenta, [
      Correo,
      Contraseña,
    ]);

    if (result.rows.length === 1) {
      const { numero_personal } = result.rows[0];
      const token = jwt.sign(
        { NumeroPersonal: numero_personal },
        process.env.JWT_SECRET
      );

      res.json({ token });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};