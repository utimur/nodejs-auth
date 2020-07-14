const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const app = express()
const PORT = 8080

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        app.listen(PORT, () => console.log(`Server has been started on port`, PORT))
    } catch (e) {
        console.log('Server start error',e)
    }
}

start()