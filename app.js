const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()

app.use(cors())

// middleware n°1
app.use((req, res, next) => {
	res.status(201); // On peut changer le code status
	res.json({message: 'Votre requete a bien été reçue.'})
next()
})

// middleware n°2
app.use((req, res) => {
	console.log('Requete bien envoyée !')
})

// Connexion à la Base de donnée MongoDB
try {
	mongoose.connect(
	'mongodb+srv://`${process.env.MONGO_USER}`:`${process.env.MONGO_PASSWORD}`@cluster0.xnhlqf7.mongodb.net/?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("Mongoose est connecté")
);
} catch (e) {
console.log("Mongoose n'arrive pas à se connecter");
}

module.exports = app