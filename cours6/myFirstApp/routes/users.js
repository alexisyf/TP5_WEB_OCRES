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
			message: `just added ${id} name${user}`,
			user: {user, id}
	
		});
	});

 
module.exports = router;
