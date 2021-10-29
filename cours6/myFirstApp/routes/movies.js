var express = require('express');
var router = express.Router();
var _ = require('lodash');



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
	res.status(200).json({
		message: "Movie found !",
		movie
	});
}); 

//put a new movie
router.put('/', (req, res) => {
	//get the data request from resqust
	const { movie} = req.body;
	//create new unique id
	const id = _.uniqueId();
	//insert it in array
	movies.push({movie, id});
	//return this message
	res.json({
		//message: `add this movie`,
		movie: {movie, id}
	});
});



module.exports = router;