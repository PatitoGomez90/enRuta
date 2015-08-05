var mPartediario1 = require('../models/mPartediario1');
var mPartediario2 = require('../models/mPartediario2');
var mAyuda = require('../models/mAyuda');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mClasificacion = require('../models/mClasificacion')
var mImputacion = require('../models/mImputacion');
var mEmple = require('../models/mEmple');
var mTipoHora = require('../models/mTipoHora');
var mCodigohora = require('../models/mCodigoHora');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getEmples: getEmples,
	getEmpleInPartediario2: getEmpleInPartediario2
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	params = req.params;
	id = params.id;
	//req.session.nromenu = 5;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	mPartediario1.getById(id, function (partediario1){
		console.log(partediario1[0])
		mPartediario2.getAllByPartediario1Id(id, function (partediario2s){
			mTipoHora.getAllActivos(function (tipohoras){
				res.render('partediario2lista', {
		        	pagename: 'Lista de Empleados',
		        	partediario2s: partediario2s,
		        	partediario1: partediario1[0],
		        	tipohoras: tipohoras
		        	//ayuda: ayuda[0]
		      	}); 
			});		
		}); 	
	});	   
	//});
};


function getAlta(req, res){
	params = req.params;
	id = params.id;
	mSectores.getAll(function (sectores){
		mEmple.getAllActivos(function (empleados){
			res.render('partediario2alta', {
				pagename: "Alta de Empleado",
				empleados: empleados,
				idpartediario1: id,
				sectores: sectores
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idempleado = params.empleado;
	idpartediario1 = params.idpartediario1;

	if( idempleado != 0){
		mPartediario2.insertNewEmpleado(idpartediario1, idempleado, function(){
			res.redirect('partediario2lista/'+idpartediario1);
		});
	}else{
		res.redirect('partediario2lista/'+idpartediario1);
	}
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mPartediario2.getById(id, function (partediario2){
		mPartediario1.getById(partediario2[0].id_partediario1_fk, function (partediario1){
			mLugares.getAllActivos(function (lugares){
				mSectores.getAllActivos(function (sectores){
					mClasificacion.getAllActivos(function (clasificaciones){
						mImputacion.getAllActivos(function (imputaciones){
							mCodigohora.getAll(function (codigoshora){
								mTipoHora.getAll(function (tiposhora){
									//console.log(partediario1[0])
									res.render('partediario2modificar', {
										pagename: "Modificar Parte Diario",
										partediario2: partediario2[0],
										partediario1: partediario1[0],
										imputaciones: imputaciones,
										clasificaciones: clasificaciones,
										sectores: sectores,
										lugares: lugares,
										codigoshora: codigoshora,
										tiposhora: tiposhora
									});
								});
							});
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
	idpartediario1 = params.idpartediario1;
	codigohora = params.codigohora;
	entrada = params.entrada;
	salida = params.salida;
	total = params.total;
	tipohora = params.tipohora;

	clasificacion1 = params.clasificacion1;
	if (!clasificacion1)
		clasificacion1 = 0;
	clasificacion2 = params.clasificacion2;
	if (!clasificacion2)
		clasificacion2 = 0;
	clasificacion3 = params.clasificacion3;
	if (!clasificacion3)
		clasificacion3 = 0;
	clasificacion4 = params.clasificacion4;
	if (!clasificacion4)
		clasificacion4 = 0;
	clasificacion5 = params.clasificacion5;
	if (!clasificacion5)
		clasificacion5 = 0;
	clasificacion6 = params.clasificacion6;
	if (!clasificacion6)
		clasificacion6 = 0;
	imputacion1 = params.imputacion1;
	if (!imputacion1)
		imputacion1 = 0;
	imputacion2 = params.imputacion2;
	if (!imputacion2)
		imputacion2 = 0;
	imputacion3 = params.imputacion3;
	if (!imputacion3)
		imputacion3 = 0;
	imputacion4 = params.imputacion4;
	if (!imputacion4)
		imputacion4 = 0;
	imputacion5 = params.imputacion5;
	if (!imputacion5)
		imputacion5 = 0;
	imputacion6 = params.imputacion6;
	if (!imputacion6)
		imputacion6 = 0;

	mPartediario2.update(id, codigohora, entrada, salida, total, tipohora, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, function(){
		res.redirect('partediario2lista/'+idpartediario1);
	});
}

function getEmples(req, res){
	params = req.params;
	sector = params.id;

	mEmple.getEmpleBySector(sector, function (emples){
		res.send(emples);
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mPartediario2.getById(id, function (p2){
		p2 = p2[0];
		mPartediario2.del(id, function (){
			res.redirect('partediario2lista/'+p2.id_partediario1_fk);
		});
	});
}

function getEmpleInPartediario2(req, res){
	params = req.params;
	idpartediario1 = params.idp1;
	idemple = params.idemple;

	mPartediario2.getEmpleInPartediario2(idpartediario1, idemple, function (resultado){
		res.send(resultado);
	});
}