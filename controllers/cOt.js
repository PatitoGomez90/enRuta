var mOt = require('../models/mOt');
var mAyuda = require('../models/mAyuda');
var mEmpleados = require('../models/mEmple');
var mMaq = require('../models/mMaquinarias');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar
};

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	//req.session.nromenu = 5;
	//mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
		mOt.getAll(function (ots){
			res.render('otlista', {
	        	pagename: 'Lista de Ordenes de Trabajo',
	        	ots: ots
	        	//ayuda: ayuda[0]
	      	}); 
		});    
	//});
};

function getAlta(req, res){
	mEmpleados.getAllActivos(function (emples){
		mMaq.getAll(function (maqs){
			res.render('otalta', {
				pagename: "Formulario de Alta de Orden de Trabajo",
				emples: emples,
				maqs: maqs
			});
		});
	});	
}

function postAlta(req, res){
	params = req.body;
	empleid = params.emple;
	fechaemision = params.fechaemision;
	equipoid = params.equipo;
	tarea = params.tarea;
	repuestos = params.repuestos;
	prioridad = params.prioridad;

	fechaemision = changeDate(fechaemision)

	mOt.insert(fechaemision, empleid, equipoid, tarea, repuestos, prioridad, function(){
		res.redirect('otlista');
	});
}

function getModificar(req, res){
	params = req.params;
	otid = params.id;
	mEmpleados.getAllActivos(function (emples){
		mMaq.getAll(function (maqs){
			mOt.getOtById(otid, function (ot){
				res.render('otmodificar', {
					pagename: "Modificar Orden de Trabajo",
					ot: ot[0],
					emples: emples,
					maqs: maqs
				});
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	otid = params.otid;
	empleid = params.emple;
	fechaemision = params.fechaemision;
	equipoid = params.equipo;
	tarea = params.tarea;
	repuestos = params.repuestos;
	prioridad = params.prioridad;

	fechaemision = changeDate(fechaemision)

	mOt.update(otid, empleid, fechaemision, equipoid, tarea, repuestos, prioridad, function(){
		res.redirect('otlista');
	});
}