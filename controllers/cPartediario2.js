var mPartediario1 = require('../models/mPartediario1');
var mPartediario2 = require('../models/mPartediario2');
var mAyuda = require('../models/mAyuda');
var mLugares = require('../models/mLugares');
var mSectores = require('../models/mSectores');
var mClasificacion = require('../models/mClasificacion')
var mImputacion = require('../models/mImputacion');
var mEmple = require('../models/mEmple');
var mTipoHora = require('../models/mTipoHora');

module.exports = {
	getLista: getLista,
	postLista: postLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	postSaveRow: postSaveRow
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
		console.log(partediario1)
		mPartediario2.getAllByPartediario1Id(id, function (partediario2s){
			//console.log(partediario2s)
			mTipoHora.getAllActivos(function (tipohoras){
				//console.log(partediario1)
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

function postLista(req, res){
	params = req.body;
	idpartediario1 = params.idpartediario1;
	idpartediario2 = params.idpartediario2;
	idemple = params.idemple;
	codigohora = params.codigohora;
	entrada = params.entrada;
	salida= params.salida;
	total = params.total;
	tipohora = params.tipohora;
	clasificacion1 = params.clasificacion1;
	if(!clasificacion1) {
        clasificacion1 = [];
    }
	clasificacion2 = params.clasificacion2;
	if(!clasificacion2) {
        clasificacion2 = [];
    }
	clasificacion3 = params.clasificacion3;
	if(!clasificacion3) {
        clasificacion3 = [];
    }
	clasificacion4 = params.clasificacion4;
	if(!clasificacion4) {
        clasificacion4 = [];
    }
	clasificacion5 = params.clasificacion5;
	if(!clasificacion5) {
        clasificacion5 = [];
    }
	clasificacion6 = params.clasificacion6;
	if(!clasificacion6) {
        clasificacion6 = [];
    }
	imputacion1 = params.imputacion1;
	if(!imputacion1) {
        imputacion1 = [];
    }
	imputacion2 = params.imputacion2;
	if(!imputacion2) {
        imputacion2 = [];
    }
	imputacion3 = params.imputacion3;
	if(!imputacion3) {
        imputacion3 = [];
    }
	imputacion4 = params.imputacion4;
	if(!imputacion4) {
        imputacion4 = [];
    }
	imputacion5 = params.imputacion5;
	if(!imputacion5) {
        imputacion5 = [];
    }
	imputacion6 = params.imputacion6;
	if(!imputacion6) {
        imputacion6 = [];
    }

	console.log(idemple.length)
	//console.log(idemple)

	for (i=0; i < idemple.length; i++){
		if (!clasificacion1[i]){
			//console.log("c1 "+i+" cero");
			clasificacion1[i] = 0;
		}else{
			//console.log("c1 "+clasificacion1[i])	
		}
		if (!clasificacion2[i]){
			//console.log("c2 "+i+" cero");
			clasificacion2[i] = 0;
		}else{
			//console.log("c2 "+clasificacion2[i])	
		}
		if (!clasificacion3[i]){
			//console.log("c3 "+i+" cero");
			clasificacion3[i] = 0;
		}else{
			//console.log("c3 "+clasificacion3[i])	
		}
		if (!clasificacion4[i]){
			//console.log("c4 "+i+" cero");
			clasificacion4[i] = 0;
		}else{
			//console.log("c4 "+clasificacion4[i])	
		}
		if (!clasificacion5[i]){
			//console.log("c5 "+i+" cero");
			clasificacion5[i] = 0;
		}else{
			//console.log("c5 "+clasificacion5[i])	
		}
		if (!clasificacion6[i]){
			//console.log("c6 "+i+" cero");
			clasificacion6[i] = 0;
		}else{
			//console.log("c6 "+clasificacion6[i])	
		}
		if (!imputacion1[i]){
			//console.log("i1 "+i+" cero");
			imputacion1[i] = 0;
		}else{
			//console.log("i1 "+imputacion1[i])	
		}
		if (!imputacion2[i]){
			//console.log("i2 "+i+" cero");
			imputacion2[i] = 0;
		}else{
			//console.log("i2 "+imputacion2[i])	
		}
		if (!imputacion3[i]){
			//console.log("i3 "+i+" cero");
			imputacion3[i] = 0;
		}else{
			//console.log("i3 "+imputacion3[i])	
		}
		if (!imputacion4[i]){
			//console.log("i4 "+i+" cero");
			imputacion4[i] = 0;
		}else{
			//console.log("i4 "+imputacion4[i])	
		}
		if (!imputacion5[i]){
			//console.log("i5 "+i+" cero");
			imputacion5[i] = 0;
		}else{
			//console.log("i5 "+imputacion5[i])	
		}
		if (!imputacion6[i]){
			//console.log("i6 "+i+" cero");
			imputacion6[i] = 0;
		}else{
			//console.log("i6 "+imputacion6[i])	
		}
		mPartediario2.updateRow(idpartediario1, idpartediario2[i], idemple[i], codigohora[i], entrada[i], salida[i], total[i], tipohora[i], clasificacion1[i], clasificacion2[i], clasificacion3[i], clasificacion4[i], clasificacion5[i], clasificacion6[i], imputacion1[i], imputacion2[i], imputacion3[i], imputacion4[i], imputacion5[i], imputacion6[i], function (){
			console.log("id emple "+idemple[i]+" guardado")
		});
	}
	res.redirect('partediario1lista');
}

function getAlta(req, res){
	params = req.params;
	id = params.id;

	mEmple.getAllActivos(function (empleados){
		res.render('partediario2alta', {
			pagename: "Alta de Empleado",
			empleados: empleados,
			idpartediario1: id
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idempleado = params.empleado;
	idpartediario1 = params.idpartediario1;
	mPartediario2.insertNewEmpleado(idpartediario1, idempleado, function(){
		res.redirect('partediario2lista/'+idpartediario1);
	});
}

function postSaveRow(req, res){
	params = req.params;
	entrada = params.entrada;
	idp2 = params.idp2;
	txt = params.txt;
	console.log(entrada);
	console.log(txt);
	console.log(idp2);
	mPartediario2.saveRow(idp2, txt, function(){
		res.send(200)
	});
}



//////////////////////////////

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