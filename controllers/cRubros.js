//requiriendo modelo mensaje.js:
var mRubros = require('../models/mRubros');
var mBorro = require('../models/mBorro');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');
var mRubrosGrupos = require('../models/mRubrosGrupos');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getRubrosPorGrupo: getRubrosPorGrupo
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mRubros.getAll(function (rubros){
  		res.render('rubroslista', {
			pagename: 'Lista de Rubros',
			rubros: rubros
		});
  	});
}

function getAlta(req, res){
	mRubrosGrupos.getAll(function (grupos){
		res.render('rubrosalta', {
			pagename: 'Alta de Rubro',
			grupos: grupos
		});
	});
}


function postAlta(req, res){
	params = req.body;
	codigo= params.codigo;
	nombre = params.nombre;
	grupo = params.grupo;

	mRubros.getByCodigo(codigo, function (rubrosporcodigo){
		if (rubrosporcodigo[0]==null){
			mRubros.insert(codigo, nombre, grupo, function(){
				res.redirect('rubroslista');
			});
		}else{
			res.render('error', {
      			error: "Codigo de Rubro existente. Intente con otro Codigo."
      		});
      	}
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mRubrosGrupos.getAll(function (grupos){
		mRubros.getById(id, function (rubro){
			res.render('rubrosmodificar',{
				pagename: 'Modificar Rubro',
				rubro: rubro[0],
				grupos: grupos
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;
	grupo = params.grupo;

	mRubros.update(id, codigo, nombre, grupo, function(){
		res.redirect('rubroslista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;
	mRubros.getById(id, function (rubro){
	  	rubro = rubro[0];
		mBorro.add(req.session.user.usuario,"Rubro", "Borra. Nombre Rubro: "+ rubro.nombre + ", id: " + id ,function(){
	  		mRubros.del(id, function(){
	    		res.redirect('/rubroslista'); 
	  		});
		});
	}); 
}

function getRubrosPorGrupo(req, res){
	params = req.params;
	id_grupo = params.id_grupo;

	mRubros.getCantRubrosPorGrupo(id_grupo, function (cant){
		console.log(cant)
		res.send(cant);

	});
}
