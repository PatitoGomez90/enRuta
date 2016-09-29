const mLocalidades = require('../models/mLocalidades');

module.exports = {
	getAll: getAll
}

function getAll(req, res) {
  	mLocalidades.getAll(function (localidades){
  		// console.log(localidades)
  		res.send(localidades)
  	});
}