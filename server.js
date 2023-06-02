require('dotenv').config()
const express = require('express');
const animeRoutes = require('./routes/routes')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/anime', animeRoutes)
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://kirara-znea.onrender.com");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


