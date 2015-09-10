var mPartediario1 = require('../models/mPartediario1');
var mPartediario2 = require('../models/mPartediario2');
var mAyuda = require('../models/mAyuda');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mClasificacion = require('../models/mClasificacion')
var mImputacion = require('../models/mImputacion');
var mContratos = require('../models/mContratos');
var mTurnos = require('../models/mTurnos');
var mEmple = require('../models/mEmple');

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
	mSectores.getAllActivos(function (sectores){
		mClasificacion.getAllActivos(function (clasificaciones){
			mContratos.getAll(function (contratos){
				res.render('partediario1alta', {
					pagename: "Alta de Parte Diario",
					clasificaciones: clasificaciones,
					sectores: sectores,
					contratos: contratos
				});
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	fecha = params.fecha;
	fecha = changeDate(fecha);
	contrato = params.contrato;
	idsector = params.sector;
	idlugar = params.lugar;
	turno = params.turno;
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
	imputacion7 = params.imputacion7;
	imputacion8 = params.imputacion8;
	imputacion9 = params.imputacion9;
	imputacion10 = params.imputacion10;
	imputacion11 = params.imputacion11;
	imputacion12 = params.imputacion12;

	mPartediario1.insert(fecha, contrato, idsector, idlugar, turno, estado, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, imputacion7, imputacion8, imputacion9, imputacion10, imputacion11, imputacion12, function(){
		mPartediario1.getLastId(function (pdultimoid){
			console.log(pdultimoid)
			var ultimoid = pdultimoid[0].id;
			mEmple.getByTurno(turno, function (emplesbyturno){
				console.log(emplesbyturno.length)

				var bandera = false;
				for (var x = 0 ; x < emplesbyturno.length ; x++){
					//acá agregar la columna 'Numero' de empleado en los Partes Diarios
					var y = x+1;
					mPartediario2.insertNewEmpleado(ultimoid, emplesbyturno[x].codigo, y, function (){
						bandera = true;
					});
				}
				if (bandera)
					console.log("Ingresados "+emplesbyturno.length+" empleados.");
				console.log("Redirigiendo a ParteDiario1 Lista..")
				res.redirect('partediario1lista');
			});
		});
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mPartediario1.getById(id, function (partediario1){
		mLugares.getBySectorId(partediario1[0].id_sector_fk, function (lugares){
			mSectores.getAllActivos(function (sectores){
				mClasificacion.getAllActivos(function (clasificaciones){
					mImputacion.getAllActivos(function (imputaciones){
						mTurnos.getByIdSector(partediario1[0].id_sector_fk, function (turnos){
							mContratos.getAll(function (contratos){
								console.log(partediario1[0])
								res.render('partediario1modificar', {
									pagename: "Modificar Parte Diario",
									partediario1: partediario1[0],
									imputaciones: imputaciones,
									clasificaciones: clasificaciones,
									sectores: sectores,
									lugares: lugares,
									turnos: turnos,
									contratos: contratos
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
	fecha = params.fecha;
	fecha = changeDate(fecha);
	turno = params.turno;
	contrato = params.contrato;
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
	imputacion7 = params.imputacion7;
	imputacion8 = params.imputacion8;
	imputacion9 = params.imputacion9;
	imputacion10 = params.imputacion10;
	imputacion11 = params.imputacion11;
	imputacion12 = params.imputacion12;

	mPartediario1.update(id, fecha, contrato, idsector, idlugar, turno, estado, clasificacion1, clasificacion2, clasificacion3, clasificacion4, clasificacion5, clasificacion6, imputacion1, imputacion2, imputacion3, imputacion4, imputacion5, imputacion6, imputacion7, imputacion8, imputacion9, imputacion10, imputacion11, imputacion12, function(){
		res.redirect('partediario1lista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;
	mPartediario2.delByIdpartediario1(id, function (){
		mPartediario1.del(id, function (){		
			res.redirect('partediario1lista');
		});
	});
}

