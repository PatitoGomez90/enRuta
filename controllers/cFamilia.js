var mFamilia = require('../models/mFamilia');
var mBorro = require('../models/mBorro');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getAll: getAll,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getAll(req, res) {
	req.session.nromenu = 7;
	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	  	mFamilia.getAll(function (docs){
	  		res.render('familialista', {
				pagename: 'Lista de Familia de Articulos',
				familias: docs,
				ayuda: ayuda[0]
			});
	  	});
	});
}

function getAlta(req, res){
	res.render('familiaalta', {
		pagename: 'Alta de Familia de Articulos',
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	activa = "on";
	if (activa=="on")
		activa = 1;
	else
		activa = 0;

	mFamilia.insert(nombre, activa, function(){
		res.redirect('familialista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mFamilia.getFamiliaPorId(id, function(docs){
		res.render('familiamodificar',{
			pagename: 'Modificar Familia de Articulos',
			familia: docs[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	activa = params.activa;
	if (activa=="on")
		activa = 1;
	else
		activa = 0;

	mFamilia.update(id, nombre, activa, function(){
		res.redirect('familialista');
	});
}

function getDel(req, res){
  	var params = req.params;
  	var id = params.id;

  	mFamilia.getFamiliaPorId(id, function(docs){
  		familia = docs[0];
		mBorro.add(req.session.user.usuario,"Familia", "Borra nombre: "+ familia.nombre + ", id: " + id , function(){
			mFamilia.del(id, function(){
				res.redirect('/familialista'); 
			});
		});
  	});  
}