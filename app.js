const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`App listening to http://localhost:${PORT}`)
  })
