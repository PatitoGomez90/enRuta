//requiriendo modelo mensaje.js:
var mTank = require('../models/mTank');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');
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
  	mTank.getAll(function (tank){
  		res.render('tanklista', {
			pagename: 'Archivo de Cargas de Gas Oil a Tanque/s',
			tank: tank
		});
  	});
}

function getAlta(req, res){
	mUsuarios.getAllUsuarios(function (operarios){
		res.render('tankalta', {
			pagename: 'Alta de Carga de Gas Oil a Tanque/s',
			operarios: operarios
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

	mTank.insert(fecha, proveedor, operario, litros, valor_litro, function(){
		res.redirect('tanklista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mUsuarios.getAllUsuarios(function (operarios){
		mTank.getById(id, function (tank){
			res.render('tankmodificar',{
				pagename: 'Modificar Registro de Carga de Gas Oil a Tanque/s',
				tank: tank[0],
				operarios: operarios
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

	mTank.update(id, fecha, proveedor, operario, litros, valor_litro, function(){
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

