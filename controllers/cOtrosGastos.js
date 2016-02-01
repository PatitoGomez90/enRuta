//requiriendo modelo mensaje.js:
var mOtrosGastos = require('../models/mOtrosGastos');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');
var mDestinos = require('../models/mDestinos');
var mVehiculos = require('../models/mVehiculos');
var mUsuarios = require('../models/mUsuarios');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mOtrosGastos.getAll(function (otrosgastos){
  		res.render('otrosgastoslista', {
			pagename: 'Archivo de Otros Gastos',
			otrosgastos: otrosgastos
		});
  	});
}

function getAlta(req, res){
	mDestinos.getAll(function (destinos){
		mVehiculos.getAll(function (vehiculos){
			mUsuarios.getAllUsuarios(function (usuarios){
				res.render("otrosgastosalta", {
					pagename: "Alta de Gasto",
					destinos: destinos,
					coches: vehiculos,
					usuarios: usuarios
				});
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	fecha = params.fecha;
	descripcion = params.descripcion;
	cantidad = params.cantidad;
	destinos = params.destino;
	coche = params.coche;
	total = params.total;
	operario = params.operario;
	memo = params.memo;
	empresa = params.empresa;

	fecha = changeDate(fecha);

	mOtrosGastos.insert(fecha, descripcion, cantidad, destinos, coche, total, operario, memo, empresa, function (){
		res.redirect("otrosgastoslista");
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mOtrosGastos.getById(id, function (otrosgastos){
		mDestinos.getAll(function (destinos){
			mVehiculos.getAll(function (vehiculos){
				mUsuarios.getAllUsuarios(function (usuarios){
					res.render("otrosgastosmodificar", {
						pagename: "Modificar Gasto",
						destinos: destinos,
						coches: vehiculos,
						usuarios: usuarios,
						o: otrosgastos[0]
					});
				});
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	fecha = params.fecha;
	descripcion = params.descripcion;
	cantidad = params.cantidad;
	destinos = params.destino;
	coche = params.coche;
	total = params.total;
	operario = params.operario;
	memo = params.memo;
	empresa = params.empresa;

	fecha = changeDate(fecha);

	mOtrosGastos.update(id, fecha, descripcion, cantidad, destinos, coche, total, operario, memo, empresa, function (){
		res.redirect("otrosgastoslista");
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mOtrosGastos.del(id, function (){
		res.redirect("otrosgastoslista");
	});			
}