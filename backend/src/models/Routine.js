const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const routineSchema = new Schema({
  name: { type: String, required: true }, 
  exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }], 
  createdAt: { type: Date, default: Date.now },
  user: {
    type: Schema.Types.ObjectId, ref: "User"
  }
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
