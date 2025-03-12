const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  routine: { type: Schema.Types.ObjectId, ref: "Routine" } // Relación 1 a 1 con la rutina
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = model("User", userSchema);
module.exports = User;
