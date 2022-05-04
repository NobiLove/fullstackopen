require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

module.exports = {
  MONGODB_URI,
  SECRET,
  PORT
}