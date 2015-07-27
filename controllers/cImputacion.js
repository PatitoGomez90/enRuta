var mImputacion = require('../models/mImputacion');
var mAyuda = require('../models/mAyuda');
var mSectores = require('../models/mSectores');
var mLugares = require('../models/mLugares');
var mUmed = require('../models/mUmed');
var mContratos = require('../models/mContratos');

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
		mImputacion.getAll(function (items){
			res.render('imputacionlista', {
	        	pagename: 'Lista de Items de Trabajos',
	        	items: items
	        	//ayuda: ayuda[0]
	      	}); 
		});    
	//});
};

function getAlta(req, res){
	mSectores.getAll(function (sectores){
		mLugares.getAll(function (lugares){
			mUmed.getAll(function (umeds){
				mContratos.getAll(function (contratos){
					res.render('imputacionalta',{
						pagename: "Alta de Items de Trabajo",
						sectores: sectores,
						lugares: lugares,
						umeds: umeds,
						contratos: contratos
					});
				});
			});
		});
	});	
}

function postAlta(req, res){
	params = req.body;
	numero = params.numero;
	nombre = params.nombre;
	sector = params.sector;
	lugar = params.lugar;
	umed = params.umed;
	horas_standard = params.horas_standard;
	contrato = params.contrato;

	mImputacion.insert(numero, nombre, sector, lugar, umed, horas_standard, contrato, function(){
		res.redirect('imputacionlista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mSectores.getAll(function (sectores){
		mLugares.getAll(function (lugares){
			mUmed.getAll(function (umeds){
				mContratos.getAll(function (contratos){
					mImputacion.getById(id, function (item){
						res.render('imputacionmodificar',{
							pagename: "Modificar Item de Trabajo",
							item: item[0],
							sectores: sectores,
							lugares: lugares,
							umeds: umeds,
							contratos: contratos
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
	numero = params.numero;
	nombre = params.nombre;
	activo = params.activa;
	sector = params.sector;
	lugar = params.lugar;
	umed = params.umed;
	horas_standard = params.horas_standard;
	contrato = params.contrato;
	 
	if (activo == "on")
		activo = 1;
	else
		activo = 0;

	mImputacion.update(id, numero, nombre, sector, lugar, umed, horas_standard, contrato, activo, function(){
		res.redirect('imputacionlista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mImputacion.del(id, function(){
		res.redirect('imputacionlista');
	})
}