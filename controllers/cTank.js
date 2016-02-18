//requiriendo modelo mensaje.js:
var mTank = require('../models/mTank');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');
var mUsuarios = require('../models/mUsuarios');
var mTanques = require('../models/mTanques');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getTankEntreFechas: getTankEntreFechas
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	req.session.nromenu = 3;
	res.render('tanklista', {
		pagename: 'Archivo de Cargas de Gas Oil a Tanque/s'
	});
}

function getAlta(req, res){
	mUsuarios.getAllUsuarios(function (operarios){
		mTanques.getAll(function (tanques){
			res.render('tankalta', {
				pagename: 'Alta de Carga de Gas Oil a Tanque/s',
				operarios: operarios,
				tanques: tanques
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	fecha = params.fecha;
	fecha = changeDate(fecha);
	proveedor = params.proveedor;
	operario = params.operario;
	litros = params.litros;
	valor_litro = params.valor_litro;
	tanque = params.tanque;

	mTank.insert(fecha, proveedor, operario, litros, valor_litro, tanque, function(){
		res.redirect('tanklista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mUsuarios.getAllUsuarios(function (operarios){
		mTank.getById(id, function (tank){
			mTanques.getAll(function (tanques){
				res.render('tankmodificar',{
					pagename: 'Modificar Registro de Carga de Gas Oil a Tanque/s',
					tank: tank[0],
					operarios: operarios,
					tanques: tanques
				});
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	fecha = params.fecha;
	fecha = changeDate(fecha);
	proveedor = params.proveedor;
	operario = params.operario;
	litros = params.litros;
	valor_litro = params.valor_litro;
	tanque = params.tanque;

	mTank.update(id, fecha, proveedor, operario, litros, valor_litro, tanque, function(){
		res.redirect('tanklista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;
	
	mTank.del(id, function(){
		res.redirect('/tanklista'); 
	});
}

function getTankEntreFechas(req, res){
	params = req.params;
	desde = params.desde;
	hasta = params.hasta;

	mTank.getTankEntreFechas(desde, hasta, function (tanks){
		res.send(tanks);
	});
}