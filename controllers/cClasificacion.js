var mClasificaciones = require('../models/mClasificacion');
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
	mClasificaciones.getAll(function (clasificaciones){
		res.render('clasificacionlista', {
        	pagename: 'Lista de Clasificaciones de Horas',
        	clasificaciones: clasificaciones
        	//ayuda: ayuda[0]
      	}); 
	});    
	//});
};

function getAlta(req, res){
	res.render('clasificacionalta', {
		pagename: "Alta de Clasificacion de Horas"
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;

	mClasificaciones.insert(nombre, function (){
		res.redirect('clasificacionlista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mClasificaciones.getById(id, function (clasificacion){
		res.render('clasificacionmodificar', {
			pagename: "Modificar Clasificacion de Horas",
			clasificacion: clasificacion[0]
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
	mClasificaciones.update(id, nombre, activa, function (){
		res.redirect('clasificacionlista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mClasificaciones.del(id, function(){
		res.redirect('clasificacionlista');
	});
}