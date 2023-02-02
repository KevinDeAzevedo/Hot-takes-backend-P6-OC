const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce); /* Parse ? : Le front envoie du JSON en Chaîne de caractère à cause du fichier*/
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({ message: 'Objet enregistré !' });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifySauce = (req, res) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: 'Objet supprimé !' });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.affinitySauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.body.like === 1) {
        sauce.usersLiked.push(req.auth.userId);
        sauce.usersDisliked = sauce.usersDisliked.filter(
          (id) => id != req.auth.userId
        );
      } else if (req.body.like === -1) {
        sauce.usersDisliked.push(req.auth.userId);
        sauce.usersLiked = sauce.usersLiked.filter(
          (id) => id != req.auth.userId
        );
      } else if (req.body.like === 0) {
        sauce.usersDisliked = sauce.usersDisliked.filter(
          (id) => id != req.auth.userId
        );
        sauce.usersLiked = sauce.usersLiked.filter(
          (id) => id != req.auth.userId
        );
      }

      /* Les Likes ou Dislikes sont la somme des personnes qui ont likés ou dislikés */
      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;
      sauce.save();
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
