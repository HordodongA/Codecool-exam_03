const express = require("express")
const fs = require("fs")
const cors = require("cors")
const app = express()
const port = 9000

app.use(cors())
app.use(express.json())



app.listen(port, () => {
    console.log(`Server is listening to port ${port}.\nCtrl + C to stop process.`);
})