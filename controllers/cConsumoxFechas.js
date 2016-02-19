//requiriendo modelo mensaje.js:
var mConsumoxFechas = require('../models/mConsumoxFechas');
var mBorro = require('../models/mBorro');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');


module.exports = {
	getIndex: getIndex,
	getConsumoEntreFechas: getConsumoEntreFechas
}

function getIndex(req, res) {
	// req.session.nromenu = 3;
	res.render('consumoxfechas', {
		pagename: 'Consulta Consumo Entre Fechas'
	});
}

function getConsumoEntreFechas(req, res){
	params = req.params;
	desde = params.desde;
	hasta = params.hasta;

	mConsumoxFechas.getConsumoEntreFechas(desde, hasta, function (consumos){
		mConsumoxFechas.getConsumoEntreFechasTotales(desde, hasta, function (totales){
			// console.log(consumos)
			data = [{'consumos': consumos},{'totales': totales}];
			// console.log(data[1].totales)
			res.send(data);
		});		
	});
}
