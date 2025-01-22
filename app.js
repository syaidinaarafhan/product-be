const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const productController = require('./src/product/product.controller')

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

const PORT = process.env.PORT

app.use(productController);

app.listen(PORT, () => {
    console.log(`App listening to http://localhost:${PORT}`)
  })
