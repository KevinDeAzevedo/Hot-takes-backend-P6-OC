const express = require('express')
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

module.exports = app