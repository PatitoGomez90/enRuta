//requiriendo modelo mensaje.js:
var mRubrosGrupos = require('../models/mRubrosGrupos');
var mBorro = require('../models/mBorro');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mRubrosGrupos.getAll(function (rubros){
  		res.render('rubrosgruposlista', {
			pagename: 'Lista de Grupos de Rubros',
			rubros: rubros
		});
  	});
}

function getAlta(req, res){
	res.render('rubrosgruposalta', {
		pagename: 'Alta de Grupo de Rubros',
	});
}


function postAlta(req, res){
	params = req.body;
	codigo= params.codigo;
	nombre = params.nombre;
	mRubrosGrupos.getByCodigo(codigo, function (grupoderubrosporcodigo){
		if (grupoderubrosporcodigo[0]==null){
			mRubrosGrupos.insert(codigo, nombre, function(){
				res.redirect('rubrosgruposlista');
			});
		}else{
			res.render('error', {
      			error: "Codigo de Grupo de Rubros existente. Intente con otro Codigo."
      		});
      	}
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mRubrosGrupos.getById(id, function (grupoderubro){
		res.render('rubrosgruposmodificar',{
			pagename: 'Modificar Grupo de Rubros',
			rubrogrupo: grupoderubro[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo = params.codigo;
	nombre = params.nombre;

	mRubrosGrupos.update(id, codigo, nombre, function(){
		res.redirect('rubrosgruposlista');
	});
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;
	mRubrosGrupos.getById(id, function (rubro){
	  	rubro = rubro[0];
		mBorro.add(req.session.user.usuario,"RubroGrupo", "Borra. Nombre Grupo de Rubro: "+ rubro.nombre + ", id: " + id ,function(){
	  		mRubrosGrupos.del(id, function(){
	    		res.redirect('/rubrosgruposlista'); 
	  		});
		});
	}); 
}


