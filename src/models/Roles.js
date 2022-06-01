const { Schema, model } = require("mongoose");

const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: String
  },
  {
    versionKey: false, // para que no añada el guíon
  }
);

module.exports =
  model("Roles", roleSchema), {
  ROLES
};