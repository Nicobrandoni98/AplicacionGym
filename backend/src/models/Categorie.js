const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const categorieSchema = new Schema({
  name: String,
});
categorieSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Categorie = model("Categorie", categorieSchema);

module.exports = Categorie;
