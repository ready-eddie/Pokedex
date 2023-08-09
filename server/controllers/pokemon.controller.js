const Pokemon = require("../models/pokemon.model");

const createNewPokemon = (req, res) => {
  Pokemon.create(req.body)
    .then((newPokemon) => {
      res.json({ newPokemon });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getAllPokemon = (req, res) => {
  Pokemon.find()
    .then((allPokemon) => {
      res.json(allPokemon);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getOnePokemon = (req, res) => {
  Pokemon.findOne({ _id: req.params.id })
    .then((queriedPokemon) => {
      res.json(queriedPokemon);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const updatePokemon = (req, res) => {
  Pokemon.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedPokemon) => {
      res.json({ updatedPokemon });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const deleteExistingPokemon = (req, res) => {
  Pokemon.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  createNewPokemon,
  getOnePokemon,
  getAllPokemon,
  updatePokemon,
  deleteExistingPokemon,
};