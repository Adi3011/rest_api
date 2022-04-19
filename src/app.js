const express  = require("express") // we get express as function
const app = express()
const studentRouter = require("./routers/students") // import router
require("./db/connection");

const port = process.env.PORT || 8000

app.use(express.json());
app.use(studentRouter); //set router to application

app.listen(port , ( ) => {
    console.log(`connection is setup at ${port}`)
})