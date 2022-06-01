const User = require("../models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET } = process.env;
const Roles = require("../models/Roles");
// const {SECRET} = require('../config')
// import config from "../config"; // de ésta forma se trae correctamente los atributos

const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  // comprobar si el usuario esta enviando una propiedad rol o roles.
  // entonces al crear un usuario y solo envía un rol, este lo buscara y guardará el user con el id correspondiente a ese rol, y así se guardara en esa base de datos esa relación.
  if (roles) {
    // buscamos con find el modelo de datos en cada una de ellas el rol
    // me trae un arreglo con objetos y queremos es un arreglo con id
    const foundRoles = await Roles.find({name: {$in: roles}});
    // recorre otra vez foundRoles para traer solo el id
    newUser.roles = foundRoles.map(roles => roles._id);
  } else {
    // por defecto tendrá el usuario "user" sino se envía un arreglo de roles
    const roles = await Roles.findOne({ name: "user" });
    newUser.roles = [roles._id];
  }

  const savedUser = await newUser.save();

  console.log(savedUser);

  const token = jwt.sign({ id: savedUser }, SECRET, {
    expiresIn: 604800, // 7 days
  });

  res.status(200).json({ token });

  } catch (error) {
    console.log(error);
  }
};

const signIn = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );
    if (!userFound) return res.status(400).json({ message: "User not found" });
  
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );
    if (!matchPassword) return res.status(401).json({ token: null, messaje: "Invalid password" });
    
    const token = jwt.sign({id: userFound._id}, SECRET, {
      expiresIn: 604800, // 7 days
    })
  
    res.status(200).json({ token });

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signUp,
  signIn,
};