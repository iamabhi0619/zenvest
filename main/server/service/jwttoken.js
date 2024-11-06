const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const generateToken = (data) => {
  const paylode = {
    id: data.id,
    name: data.email,
    email: data.email,
    role: data.role,
  };
  return jwt.sign(paylode, process.env.SCRETKEYJWT, { expiresIn: "24hrs" });
};
module.exports = { generateToken };
