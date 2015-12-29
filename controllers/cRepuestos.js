//requiriendo modelo mensaje.js:
var mRepuestos = require('../models/mRepuestos');
var mBorro = require('../models/mBorro');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mRepuestos.getAll(function (repuestos){
  		res.render('repuestoslista', {
			pagename: 'Lista de Repuestos',
			repuestos: repuestos
		});
  	});
}
