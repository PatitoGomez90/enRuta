var mTipoEquipo = require('../models/mTipoEquipo');
var mBorro = require('../models/mBorro');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getAll(req, res) {
  	mTipoEquipo.getAll(function (docs){
  		res.render('tipoequipolista', {
			pagename: 'Lista de Familia de Maquinas / Vehiculos',
			tipoequipos: docs,
		});
  	});
}

function getAlta(req, res){
	res.render('tipoequipoalta', {
		pagename: 'Alta de Familia de Maquinas / Vehiculos',
	});
}


function postAlta(req, res){
	params = req.body;
	descripcion = params.descripcion;

	mTipoEquipo.insert(descripcion, function(){
		res.redirect('tipoequipolista');
	})
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mTipoEquipo.getTipoEquipoPorId(id, function (docs){
		res.render('tipoequipomodificar',{
			pagename: 'Modificar Familia de Maquinas / Vehiculos',
			tipoequipo: docs[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	descripcion = params.descripcion;
	activa = params.activa;
	if (activa=="on")
		activa = 1;
	else
		activa = 0;

	mTipoEquipo.update(id, descripcion, activa, function(){
		res.redirect('tipoequipolista');
	});
}

function getDel(req, res){
  	var params = req.params;
  	var id = params.id;

  	mTipoEquipo.getTipoEquipoPorId(id, function (docs){
  		cargo = docs[0];
		//mBorro.add(req.session.user.usuario,"Cargos", "Borra descripcion: "+ cargo.descripcion + ", id: " + id , function(){
		mTipoEquipo.del(id, function(){
			res.redirect('/tipoequipolista'); 
		});
		//});
  	});  
}