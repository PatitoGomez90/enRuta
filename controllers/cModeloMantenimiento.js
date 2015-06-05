var mModelom1 = require('../models/mModeloMantenimiento');
//var mBorro = require('../models/mBorro');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getLista(req, res) {
  	mModelom1.getAll(function (modelos){
  		res.render('modelomantenimientolista', {
			pagename: 'Lista de Modelos de Mantenimiento',
			modelos: modelos,
		});
  	});
}

function getAlta(req, res){
	res.render('modelomantenimientoalta', {
		pagename: 'Agregar Nuevo Modelo de Mantenimiento',
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	descripcion = params.descripcion;
	kms = params.kms;
	hrs = params.hrs;
	dias = params.dias;

	if (kms != "" && hrs == "" && dias == ""){
		mModelom1.insertKms(nombre, descripcion, kms, function (){
			res.redirect('modelomantenimientolista');
		});
	}
	else if (kms == "" && hrs != "" && dias == ""){
		mModelom1.insertHrs(nombre, descripcion, hrs, function (){
			res.redirect('modelomantenimientolista');
		});
	}
	else if (kms == "" && hrs == "" && dias != ""){
		mModelom1.insertDias(nombre, descripcion, dias, function (){
			res.redirect('modelomantenimientolista');
		});
	}
	else{
		res.render('error', { 
			error: "Solo puede elegir UNO entre Kms, Hrs o Dias."
		});
	}
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mModelom1.getModelom1ById(id, function (modelom1){
		res.render('modelomantenimientomodificar', {
			pagename: "Modificar Modelo de Mantenimiento",
			m: modelom1[0]
		});
	});
}

function postModificar(req, res){
	params = req.body
	id = params.id;
	nombre = params.nombre;
	descripcion = params.descripcion;
	kms = params.kms;
	hrs = params.hrs;
	dias = params.dias;

	console.log(kms + " " + hrs + " "+ dias)

	if (kms != "" && hrs == 0 && dias == 0){
		mModelom1.updateKms(id, nombre, descripcion, kms, function (){
			res.redirect('modelomantenimientolista');
		});
	}
	else if (kms == 0 && hrs != "" && dias == 0){
		mModelom1.updateHrs(id, nombre, descripcion, hrs, function (){
			res.redirect('modelomantenimientolista');
		});
	}
	else if (kms == 0 && hrs == 0 && dias != ""){
		mModelom1.updateDias(id, nombre, descripcion, dias, function (){
			res.redirect('modelomantenimientolista');
		});
	}
	else{
		res.render('error', {
			error: "Solo puede elegir UNO entre Kms, Hrs o Dias."
		});
	}
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mModelom1.del(id, function(){
		res.redirect('modelomantenimientolista');
	});
}