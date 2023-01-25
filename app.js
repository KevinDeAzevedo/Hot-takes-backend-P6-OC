const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require('./routes/user')

// utilisation des varaibles .env
require("dotenv").config()

const app = express()

// Configurer CORS
app.use(cors())

// recevoir des données JSON
app.use(express.json())

// Endpoint d'authentification
app.use('/api/auth', userRoutes)

// Connexion à la Base de donnée MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xnhlqf7.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app