const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
  nombre: {
    type: String,
    require: true,
  },
  descripcion: {
    type: String,
    require: true,
  },
  fechaInicio: {
    type: String,
    require: true,
  },
  fechaFinal: {
    type: String,
    require: true,
  },
  horaInicio: {
    type: Array,
    require: true,
  },
  horaFinal: {
    type: Array,
    require: true,
  },
  dias: {
    type: Array,
  },
  foto: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Curso", cursoSchema);
