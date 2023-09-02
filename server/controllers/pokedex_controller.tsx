// // DEPENDENCIES
// const express = require('express');
// const pokedex = express.Router();
// const db = require('../models');
// const { PokemonStats } = db;
// const { Op } = require('sequelize');

// // ENDPOINTS
// pokedex.get('/', async (req, res) => {
//   try {
//     const pokemons = await PokemonStats.findAll({
//       where: { Name: { [Op.like] : `%${req.query.Name ? req.query.Name : ''}%` } }
//     })
//     res.status(200).json(pokemons);
//   } catch(err) {
//     console.log(err)
//     res.status(500).send('ERROR GETTING ALL POKEMONS')
//   }
// });

// pokedex.get('/:name', async (req, res) => {
//   try {
//     const pokemon = await PokemonStats.findOne({ where: { Name: req.params.name } });
//     res.status(200).json(pokemon);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

// pokedex.post('/', async (req, res) => {
//     try {
//         const newPokemon = await PokemonStats.create(req.body)
//         res.status(200).json({message: "Created a new pokemon!", data: newPokemon})
//     } catch(err) {
//         console.log(err)
//         res.status(500).send('ERROR CREATING POKEMON')
//     }
// })

// pokedex.put('/:id', async (req, res) => {
//     try {
//         const updatedPokemon = await PokemonStats.update(req.body, { where: {id: req.params.id} })
//         res.status(200).json({ message: `Updated pokemon ${req.params.id}!`, data: updatedPokemon})
//     } catch(err) {
//         console.log(err)
//         res.status(500).send('ERROR UPDATING POKEMON')
//     }
// })

// pokedex.delete('/:id', async (req, res) => {
//     try {
//         const deletedPokemon = await PokemonStats.destroy({ where: {id: req.params.id} })
//         res.status(200).json({ message: `Successfully deleted pokemon id ${req.params.id}!`})
//     } catch(err) {
//         console.log(err)
//         res.status(500).send('ERROR DELETING POKEMON')
//     }
// })

// // EXPORT
// module.exports = pokedex;
