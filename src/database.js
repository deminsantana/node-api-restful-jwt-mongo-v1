const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/faztdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((error) => console.log(error));