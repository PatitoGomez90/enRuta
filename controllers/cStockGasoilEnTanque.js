//requiriendo modelo mensaje.js:
var mStockGasoilEnTanque = require('../models/mStockGasoilEnTanque');
var mTanques = require('../models/mTanques');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getIndex: getIndex,
	getStock: getStock
}

function getIndex(req, res) {
	mTanques.getAll(function (tanques){
		res.render('stockgasoilentanque', {
			pagename: 'Consulta de Stock de Gasoil en Tanque',
			tanques: tanques
		});
	});	
}

function getStock(req, res){
	params = req.params;
	id_tanque = params.id_tanque;
	fecha = params.fecha;
	// console.log("fecha en contro "+fecha)
	
	mStockGasoilEnTanque.getStock(id_tanque, fecha, function (stock){
		// console.log(stock)
		gasoil_gastado = stock[0].gasoil_gastado;
		gasoil_ensisterna = stock[0].gasoil_ensisterna;
		resta = gasoil_ensisterna - gasoil_gastado;
		var s = {"gasoil_gastado": gasoil_gastado, "gasoil_ensisterna": gasoil_ensisterna, "resta": resta}
		var a = [];
		a.push(s);
		res.send(a);
	});
}