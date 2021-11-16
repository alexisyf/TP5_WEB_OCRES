const { json } = require('express');
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');


const API_KEY = '18a8cd59';
const API_URL = 'http://www.omdbapi.com/';

let movies = [{
	id: "0",
	movie: "Avengers",
	yearOfRelease: 2017,
	duration: 180 ,
	actors: ["iRonman", "Hulk", "Tanos"],
	poster: "http://www.google.com", // lien image d'affiche,
	boxOffice: 100000000, // en USD$,
	rottenTomatoesScore: 90
},


];

/*GET movies listing. */
router.get('/', (req, res) => {
	//GEt List of movie and return JSON
  res.status(200).json({movies});
});

/*GET one movie.*/
router.get('/:id', (req, res) => {
	// Get id in params
	const { id } = req.params;
	// Find movie in DB
	const movie = _.find(movies, ["id", id]);
	// Return user
	console.log(movie);
	res.status(200).json({
		message: "Movie not found !",
		movie
	});
}); 
/*
//put a new movie
router.put('/', (req, res) => {
	//get the data request from resqust
	const { movie} = req.body;
	// const { poster } = req.body; TEST POUR PUT 
	//create new unique id
	const id = _.uniqueId();
	//insert it in array
	movies.push({movie, id});
	//return this message
	res.json({
		//message: `add this movie`,aaaaaa
		movie: {movie, id}
	});
});
*/

//put a new movies with axios
router.put('/', async(req, res) => {
	const {movie} = req.body;
	console.log(movie);

	await axios.get(API_URL, {
		params:{
			t:movie,
			apikey:API_KEY,
		}
	})
	.then((response) => {
		data = response.data;
		let info = {

			id: (movies.length).toString(),
			movie: data.Title,
			yearOfRelease: data.Year,
			duration: data.Runtime,
			actors: data.Actors.split(","),
			poster: data.Poster,
			boxOffice: data.BoxOffice,
			rottenTomatoesScore: parseInt(data.Ratings[1].Value),
		}

		movies.push(info);
		res.send(movies)
		})
		.catch(function (error){
			res.send('Film not found');
		});
});

//UPDATE


/*
//UPDATE movie
router.post('/:id', (req, res) => {
	const {id} = req.params;
	const {movie} = req.body;
	//find in database
	const movieToUpdate = _.find(movies, ["id", id]);
	movieToUpdate.movie = movie;
	res.json({
		message: `Juste updated ${id} with ${movie}`
	});
});
*/

//POST movie
router.post('/:id', async(req, res) => {
	const {id} = req.params;
	const {postid} = id;
	const {movie} = req.body;
	const movieToUpdate = _.find(movies, ["id", id]);

	await axios.get(API_URL, {
		params:{
			t:movie,
			apikey:API_KEY,
		}
	})
	.then((response) => {
		//console.log(response);
		data = response.data;
		let info = {
			id: movieToUpdate.id,
			movie: data.Title,
			yearOfRelease: data.Year,
			duration: data.Runtime,
			actors: data.Actors.split(","),
			poster: data.Poster,
			boxOffice: data.BoxOffice,
			rottenTomatoesScore: parseInt(data.Ratings[1].Value),
		}
		console.log(info);
		movieToUpdate.push(info);
		
		res.json({
			message: `Juste updated ${id} with ${movie}`
		});
		res.send(movies)
		})
		.catch(function (error){
			res.send('Film not found');
		});
});



//DELETE MOVIE
router.delete('/:id', (req,res) =>{
	const {id} = req.params;
	_.remove(movie,["id", id]);
	res.json({
		message: `juste removed ${id}`
	});
});


module.exports = router;