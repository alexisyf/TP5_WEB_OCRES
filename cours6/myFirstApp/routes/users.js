const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
var _ = require('lodash');


//create RAW data array
let users = [{
  user: "Arthur",
  id: "0"
},
];

/* GET users listing. */
router.get('/', (req, res) => {
  //Get list of user and return JSON
  res.status(200).json({users});
});

/*GET one user.*/
router.get('/:id', (req, res) => {
	// Get id in params
	const { id } = req.params;
	// Find movie in DB
	const user = _.find(users, ["id", id]);
	// Return user
	res.status(200).json({
		message: "User found !",
		user
	});
});
    
	//PUT new user
	router.put('/', (req, res) => {
		//get the data drom request from request
		const { user } = req.body;
		
		//Create new unique id
		const id = _.uniqueId();
		//Insert it in array
		users.push({ user, id });
		//return message 
		res.json({
			user: {user, id}
		});
	});

	// UPDATE user
	router.post('/:id', (req, res) => {
		//get the :id of the user we want to update from the params of the request
		const { id } = req.params;
		//get the new data of the user we want to update from the body of the request.
		const { user } = req.body;
		//find id BD
		const userToUpdate = _.find(users, ["id", id]);
		//update data with new data js is by address
		userToUpdate.user = user;
		//return message
		res.json({
			message: `Just updatet ${id} with ${user}`
		});
	});

	//DELETE user
	router.delete('/:id', (req,res) =>{
		//get the /id of the user we want to delete from the the params of the request
		const {id}=req.params;
		//remove from BD
		_.remove(users,["id",id]);
		//return message
		res.json({
			message:`Just removed ${id}`
		});
	})





 
module.exports = router;
