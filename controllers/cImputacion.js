var mImputacion = require('../models/mImputacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getLista(req, res) {
	//req.session.nromenu = 5;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	mImputacion.getAll(function (imputaciones){
		res.render('imputacionlista', {
        	pagename: 'Lista de Items',
        	imputaciones: imputaciones
        	//ayuda: ayuda[0]
      	}); 
	});    
	//});
};

function getAlta(req, res){
	res.render('imputacionalta', {
		pagename: "Alta de Items"
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	numero = params.numero;

	mImputacion.insert(nombre, numero, function (){
		res.redirect('imputacionlista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mImputacion.getById(id, function (imputacion){
		res.render('imputacionmodificar', {
			pagename: "Modificar Items",
			imputacion: imputacion[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	numero = params.numero;
	activa = params.activa;
	if (activa == "on")
		activa = 1;
	else
		activa = 0;
	mImputacion.update(id, nombre, numero, activa, function (){
		res.redirect('imputacionlista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mImputacion.del(id, function(){
		res.redirect('imputacionlista');
	});
}