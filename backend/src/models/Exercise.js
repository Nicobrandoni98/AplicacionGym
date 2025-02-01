const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const exerciseSchema = new Schema({
  name: String,
  repes: Number,
  series: Number,
  categorie: { type: Schema.Types.ObjectId, ref: "Categorie" }, // Referencia al modelo Categorie
});

exerciseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
