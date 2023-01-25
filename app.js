const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require('./routes/user')
const saucesRoutes = require('./routes/sauces')
const path = require('path');

/* utilisation des varaibles .env */
require("dotenv").config()

const app = express()

/* Configurer CORS */
app.use(cors())

/* recevoir des données JSON */
app.use(express.json())

/* Endpoints */
app.use('/api/auth', userRoutes) /* Authentification */
app.use('/api/sauces', saucesRoutes) /* Sauces */
app.use('/images', express.static(path.join(__dirname, 'images'))) /* chemin des images */

/* Connexion à la Base de donnée MongoDB */
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xnhlqf7.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app