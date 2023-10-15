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
    type: Date,
    require: true,
  },
  fechaFinal: {
    type: Date,
    require: true,
  },
  horario: {
    type: Array,
  },
  taller: {
    type: String,
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
