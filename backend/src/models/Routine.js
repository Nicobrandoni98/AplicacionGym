const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const routineSchema = new Schema({
  name: { type: String, required: true }, 
  days: {
    lunes: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    martes: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    miercoles: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    jueves: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    viernes: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    sabado: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
    domingo: [{ type: Schema.Types.ObjectId, ref: "Exercise" }]
  },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true } // Para saber quién es el dueño
});

routineSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Routine = model("Routine", routineSchema);
module.exports = Routine;
