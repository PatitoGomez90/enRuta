var mPartediario1 = require('../models/mPartediario1');
var mPartediario2 = require('../models/mPartediario2');
var mAyuda = require('../models/mAyuda');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mClasificacion = require('../models/mClasificacion')
var mImputacion = require('../models/mImputacion');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	//req.session.nromenu = 5;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	mPartediario1.getAll(function (partediario1s){
		res.render('partediario1lista', {
        	pagename: 'Lista de Partes Diarios',
        	partediario1s: partediario1s
        	//ayuda: ayuda[0]
      	}); 
	});    
	//});
};

function getAlta(req, res){
	mLugares.getAllActivos(function (lugares){
		mSectores.getAllActivos(function (sectores){
			mClasificacion.getAllActivos(function (clasificaciones){
				mImputacion.getAllActivos(function (imputaciones){
					res.render('partediario1alta', {
						pagename: "Alta de Parte Diario",
						imputaciones: imputaciones,
						clasificaciones: clasificaciones,
						sectores: sectores,
						lugares: lugares
					});
				});
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	fecha = params.fecha;
	fecha = changeDate(fecha);
	idsector = params.sector;
	idlugar = params.lugar;
	estado = 1;
	clasificacion1 = params.clasificacion1;
	clasificacion2 = params.clasificacion2;
	clasificacion3 = params.clasificacion3;
	clasificacion4 = params.clasificacion4;
	clasificacion5 = params.clasificacion5;
	clasificacion6 = params.clasificacion6;
	imputacion1 = params.imputacion1;
	imputacion2 = params.imputacion2;
	imputacion3 = params.imputacion3;
	imputacion4 = params.imputacion4;
	imputacion5 = params.imputacion5;
	imputacion6 = params.imputacion6;
	mPartediario1.insert(fecha, idsector, idlugar, estado, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, function(){
		res.redirect('partediario1lista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mPartediario1.getById(id, function (partediario1){
		mLugares.getAllActivos(function (lugares){
			mSectores.getAllActivos(function (sectores){
				mClasificacion.getAllActivos(function (clasificaciones){
					mImputacion.getAllActivos(function (imputaciones){
						console.log(partediario1[0])
						res.render('partediario1modificar', {
							pagename: "Modificar Parte Diario",
							partediario1: partediario1[0],
							imputaciones: imputaciones,
							clasificaciones: clasificaciones,
							sectores: sectores,
							lugares: lugares
						});
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
	fecha = changeDate(fecha);
	idsector = params.sector;
	idlugar = params.lugar;
	estado = 1;
	clasificacion1 = params.clasificacion1;
	clasificacion2 = params.clasificacion2;
	clasificacion3 = params.clasificacion3;
	clasificacion4 = params.clasificacion4;
	clasificacion5 = params.clasificacion5;
	clasificacion6 = params.clasificacion6;
	imputacion1 = params.imputacion1;
	imputacion2 = params.imputacion2;
	imputacion3 = params.imputacion3;
	imputacion4 = params.imputacion4;
	imputacion5 = params.imputacion5;
	imputacion6 = params.imputacion6;
	mPartediario1.update(id, fecha, idsector, idlugar, estado, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, function(){
		res.redirect('partediario1lista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mPartediario1.del(id, function (){
		mPartediario2.delByIdpartediario1(id, function (){
			res.redirect('partediario1lista');
		});
	});
}