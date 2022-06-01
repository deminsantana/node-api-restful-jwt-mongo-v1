const express = require("express");
const morgan = require("morgan");
const pkg = require("../package.json");
const cors = require('cors')
// require('dotenv').config()
const { createRoles } = require("./libs/initialSetup");
const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const usersRoutes = require('./routes/user.routes');

const app = express();
createRoles(); // ejecuta la inicialización de los roles

app.set("pkg", pkg);

var corsOptions = {
  // origin: "http://localhost:80/js-api-fecht/"
  origin: 'http://localhost:80', // Aqui debemos reemplazar el * por el dominio del cliente
  optionsSuccessStatus: 200 // Es necesario para navegadores antiguos (IE11) o algunos SmartTVs
};

app.use(cors());
app.use(morgan("dev")); // Middleware de express, es una función, se le indica que estará en modo de desarrollo "dev" y por terminal me mostrara el VERBO de petición, la ruta y el status.
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;