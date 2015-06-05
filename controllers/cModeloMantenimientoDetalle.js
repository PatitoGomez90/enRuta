var mModelom1 = require('../models/mModeloMantenimiento');
var mModelom2 = require('../models/mModeloMantenimientoDetalle');
var mTipoTarea = require('../models/mTipoTarea');
var mArt = require('../models/mArticulos');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getVerRepuestos: getVerRepuestos
}

function getLista(req, res) {
	params = req.params;
	id = params.id;
	mModelom1.getModelom1ById(id, function (m1){
		mModelom2.getAll(id, function (m2s){
	  		res.render('modelodetallelista', {
				pagename: 'Detalles del Modelo',
				m1: m1[0],
				m2s: m2s
			});
	  	});
	});  	
}

function getAlta(req, res){
	params = req.params;
	idm1 = params.id;

	mModelom1.getModelom1ById(id, function (m1){
		mTipoTarea.getAll(function (tareas){
			mArt.getAllActivos(function (repuestos){
				res.render('modelodetallealta', {
					pagename: "Agregar Nuevo Detalle",
					m1: m1[0],
					tipotareas: tareas,
					repuestos: repuestos
				});
			});
		});
	});
}

function postAlta(req, res){
	params = req.body;
	idm1 = params.m1id;
	tipotareaid = params.tipotarea;
	descripcion = params.descripcion;
	cambiorevision = params.cambiorevision;
	idrep1 = params.rep1;
	cant1 = params.cant1;
	if (cant1 == null || cant1 == "")
		cant1 = 0;
	idrep2 = params.rep2;
	cant2 = params.cant2;
	if (cant2 == null || cant2 == "")
		cant2 = 0;
	idrep3 = params.rep3;
	cant3 = params.cant3;
	if (cant3 == null || cant3 == "")
		cant3 = 0;
	idrep4 = params.rep4;
	cant4 = params.cant4;
	if (cant4 == null || cant4 == "")
		cant4 = 0;
	idrep5 = params.rep5;
	cant5 = params.cant5;
	if (cant5 == null || cant5 == "")
		cant5 = 0;

	mModelom2.insert(idm1, tipotareaid, descripcion, cambiorevision, idrep1, cant1, idrep2, cant2, idrep3, cant3, idrep4, cant4, idrep5, cant5, function(){
		res.redirect('modelodetallelista/'+idm1);
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mModelom2.getModelom2ById(id, function (m2){
		mTipoTarea.getAll(function (tareas){
			mArt.getAllActivos(function (repuestos){
				res.render('modelodetallemodificar', {
					pagename: "Modificar Detalle de Modelo de Mantenimiento",
					m2: m2[0],
					tipotareas: tareas,
					repuestos: repuestos
				});
			});
		});
	});	
}

function postModificar(req, res){
	params = req.body;
	idm1 = params.idm1;
	idm2 = params.idm2;
	tipotareaid = params.tipotarea;
	descripcion = params.descripcion;
	cambiorevision = params.cambiorevision;
	idrep1 = params.rep1;
	cant1 = params.cant1;
	if (cant1 == null || cant1 == "")
		cant1 = 0;
	idrep2 = params.rep2;
	cant2 = params.cant2;
	if (cant2 == null || cant2 == "")
		cant2 = 0;
	idrep3 = params.rep3;
	cant3 = params.cant3;
	if (cant3 == null || cant3 == "")
		cant3 = 0;
	idrep4 = params.rep4;
	cant4 = params.cant4;
	if (cant4 == null || cant4 == "")
		cant4 = 0;
	idrep5 = params.rep5;
	cant5 = params.cant5;
	if (cant5 == null || cant5 == "")
		cant5 = 0;

	mModelom2.update(idm1, idm2, tipotareaid, descripcion, cambiorevision, idrep1, cant1, idrep2, cant2, idrep3, cant3, idrep4, cant4, idrep5, cant5, function (){
		res.redirect('modelodetallelista/'+idm1);
	});
}

function getDel(req, res){
	params = req.params;
	idm1 = params.idm1;
	idm2 = params.idm2;

	mModelom2.del(idm2, function (){
		res.redirect('modelodetallelista/'+idm1);
	});
}

function getVerRepuestos(req, res){
	params = req.params;
	idm2 = params.id;

	mModelom2.getModelom2ById(idm2, function (m2){
		console.log(m2[0])
		res.render('modelodetallerepuestover', {
			pagename: "Ver Repuestos Asignados a",
			m2: m2[0]
		});
	});
}
