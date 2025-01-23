const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const productRoutes = require('./src/routes/product.routes')
const sqlRoutes = require('./src/routes/sql.routes')
const userRoutes = require('./src/routes/user.routes')

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

const PORT = process.env.PORT

app.use(productRoutes);
app.use(sqlRoutes);


app.listen(PORT, () => {
    console.log(`App listening to http://localhost:${PORT}`)
  })
