var mLugares = require('../models/mLugares');
var mAyuda = require('../models/mAyuda');
var mSectores = require('../models/mSectores');

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
	mLugares.getAll(function (lugares){
		res.render('lugareslista', {
        	pagename: 'Lista de Lugares',
        	lugares: lugares
        	//ayuda: ayuda[0]
      	});
	});    
	//});
};

function getAlta(req, res){
	mLugares.getSectores(function (sectores){
		res.render('lugaresalta', {
		pagename: "Alta de Lugar",
		sectores: sectores
		});
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	sector = params.sector;

	mLugares.insert(nombre, sector, function (){
		res.redirect('lugareslista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mLugares.getById(id, function (lugar){
		mSectores.getAll(function (sectores){
			res.render('lugaresmodificar', {
				pagename: "Modificar informacion de un Lugar",
				lugar: lugar[0],
				sectores: sectores
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	activa = params.activa;
	sector = params.sector;

	if (activa == "on")
		activa = 1;
	else
		activa = 0;
	mLugares.update(id, nombre, activa, sector, function (){
		res.redirect('lugareslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mLugares.del(id, function(){
		res.redirect('lugareslista');
	});
}