//requiriendo modelo mensaje.js:
var mChoferes = require('../models/mChoferes');

module.exports = {
	getLista: getLista
}

function getLista(req, res) {
	mChoferes.getChoferes(function (choferes){
		res.render('choferesalta', {
			pagename: 'Lista de Choferes',
			choferes: choferes
		})
	})
}