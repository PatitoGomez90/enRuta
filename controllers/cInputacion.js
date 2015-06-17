var mInputacion = require('../models/mInputacion');
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
	mInputacion.getAll(function (inputaciones){
		res.render('inputacionlista', {
        	pagename: 'Lista de Tipos de Inputaciones de Horas',
        	inputaciones: inputaciones
        	//ayuda: ayuda[0]
      	}); 
	});    
	//});
};

function getAlta(req, res){
	res.render('inputacionalta', {
		pagename: "Alta de Tipo de Inputacion de Horas"
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;

	mInputacion.insert(nombre, function (){
		res.redirect('inputacionlista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mInputacion.getById(id, function (inputacion){
		res.render('inputacionmodificar', {
			pagename: "Modificar Tipo de Inputacion de Horas",
			inputacion: inputacion[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	activa = params.activa;
	if (activa == "on")
		activa = 1;
	else
		activa = 0;
	mInputacion.update(id, nombre, activa, function (){
		res.redirect('inputacionlista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mInputacion.del(id, function(){
		res.redirect('inputacionlista');
	});
}