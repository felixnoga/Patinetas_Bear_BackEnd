const express = require("express")
const cors = require("cors");
const app = express()
const PORT = 3005

app.use(express.json())
app.use(cors());

app.listen(PORT,
    () => { console.log(`server in port ${PORT}`) })