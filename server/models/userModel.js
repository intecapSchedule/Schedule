const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  apellido: {
    type: String,
    require: true,
  },
  correo: {
    type: String,
    require: true,
    unique: true,
  },
  cursos: {
    type: Array,
  },
  rol: {
    type: String,
    require: true,
  },
  username: {
    require: true,
    type: String,
    unique: true,
  },
  contrasenia: {
    type: String,
    require: true,
  },
  foto: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
