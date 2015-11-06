//abarca planti1 y planti2
var mPlanti = require('../models/mPlantillas');
var mSectores = require('../models/mSectores');
var mAyuda = require('../models/mAyuda');
var mEmples = require('../models/mEmple');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getListap2: getListap2,
	getAltap2: getAltap2,
	postAltap2: postAltap2,
	getDelp2: getDelp2
};

function getLista(req, res) {
	// req.session.nromenu = 5;
	// mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	mPlanti.getAll_planti1(function (plantillas1){
		res.render('planti1lista', {
        	pagename: 'Lista de Plantillas',
        	plantillas1: plantillas1
        	// ,ayuda: ayuda[0]
      	}); 
	});    
	// });
};

function getAlta(req, res){
	mSectores.getAll(function (sectores){
		res.render('planti1alta', {
			pagename: "Alta de Plantillas",
			sectores: sectores
		});
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	id_sector = params.sector;
	mPlanti.insert(nombre, id_sector, function(){
		res.redirect('planti1lista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id_planti1;
	mPlanti.getById(id, function (planti1){
		mSectores.getAll(function (sectores){
			res.render('planti1modificar',{
				pagename: "Modificar Informacion de Plantilla",
				planti1: planti1[0],
				sectores: sectores
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	id_sector = params.sector;
	activo = params.activa;

	if (activo == "on")
		activo = 1;
	else
		activo = 0;

	mPlanti.update(id, nombre, id_sector, activo, function(){
		res.redirect('planti1lista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mPlanti.del(id, function(){
		res.redirect('planti1lista');
	})
}

function getListap2(req, res){
	params = req.params;
	id_planti1 = params.id_planti1;

	mPlanti.getById(id_planti1, function (plantillas1){
		mPlanti.getAll_planti2(id_planti1, function (plantillas2){
			res.render('planti2lista', {
	        	pagename: 'Contenido de Plantilla',
	        	plantillas1: plantillas1[0],
	        	plantillas2: plantillas2
	        	// ,ayuda: ayuda[0]
	      	}); 
		});
	});
}

function getAltap2(req, res){
	params = req.params;
	id_planti1 = params.id_planti1;

	mPlanti.getById(id_planti1, function (p1){
		mPlanti.getAll_planti2(id_planti1, function (p2){
			mEmples.getAllOrderByNombre(function (emples){
				res.render('planti2alta', {
					pagename: 'Agregar empleado a plantilla',
					p1: p1[0],
					p2: p2,
					emples: emples
				});
			});
		});
	});
}

function postAltap2(req, res){
	params = req.body;
	id_emple = params.emple;
	id_planti1 = params.idp1;

	mPlanti.insertp2(id_planti1, id_emple, function(){
		res.redirect('planti2lista/'+id_planti1);
	});
}

function getDelp2(req, res){
	params = req.params;
	id_p2 = params.id_p2;
	id_p1 = params.id_p1;
	
	mPlanti.delp2(id_p2, function(){
		res.redirect('planti2lista/'+id_p1);
	});
}