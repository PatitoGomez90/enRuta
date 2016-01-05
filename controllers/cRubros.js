//requiriendo modelo mensaje.js:
var mRubros = require('../models/mRubros');
var mBorro = require('../models/mBorro');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');
var mRubrosGrupos = require('../models/mRubrosGrupos');
var mRepuestos = require('../models/mRepuestos');

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
			pagename: 'Archivo de Rubros',
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
	codigo1 = params.codigo1;
	codigo2 = params.codigo2;
	nombre = params.nombre;
	grupo = params.grupo;
	codigo = codigo1+codigo2;

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
			codigo = rubro[0].codigo;
			codigo1 = codigo.substring(0, 1);
			codigo2 = codigo.substring(1, 4);
			res.render('rubrosmodificar',{
				pagename: 'Modificar Rubro',
				rubro: rubro[0],
				grupos: grupos,
				codigo1: codigo1,
				codigo2: codigo2
			});
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	codigo1 = params.codigo1;
	codigo2 = params.codigo2;
	nombre = params.nombre;
	grupo = params.grupo;
	codigo = codigo1+codigo2;

	mRubros.getByCodigo(codigo, function (rubrosporcodigo){
		if (rubrosporcodigo.length == 0){
			mRubros.update(id, codigo, nombre, grupo, function(){
				res.redirect('rubroslista');
			});
		}else{
			if (rubrosporcodigo.length == 1){
				if (rubrosporcodigo[0].id == id){
					mRubros.update(id, codigo, nombre, grupo, function(){
						res.redirect('rubroslista');
					});
				}else{				
					res.render('error', {
		      			error: "Codigo de Rubro existente. Intente con otro Codigo."
		      		});
		      	}
			}else{
				var aparece = false;
				for (var i = 0 ; i < rubrosporcodigo.length ; i++) {
					if (rubrosporcodigo[i].id == id){
						console.log(i+": aca está!")
						aparece = true;
						break;
					}else{
						console.log(i+": aca no está.")
					}
				}
				if (aparece) {
					res.render('error', {
		      			error: "Codigo de Rubro existente. Intente con otro Codigo."
		      		});
				}else{
					res.render('error', {
		      			error: "Codigo de Rubro existente. Intente con otro Codigo.."
		      		});
				}
			}			
      	}
	});	
}

function getDel(req, res){
	var params = req.params;
	var id = params.id;
	mRubros.getById(id, function (rubro){
	  	rubro = rubro[0];
	  	mRepuestos.getRubroEnRepById(id, function (rubroEnRep){
	  		// console.log(rubroEnRep.length)
	  		if (rubroEnRep.length == 0){
	  			mBorro.add(req.session.user.usuario,"Rubro", "Borra. Nombre Rubro: "+ rubro.nombre + ", id: " + id ,function(){
			  		mRubros.del(id, function(){
			    		res.redirect('/rubroslista'); 
			  		});
				});
	  		}else{
	  			res.render('error', {
	      			error: "No se puede eliminar este Rubro. Posee registros en la base de datos 'Repuestos'."
	      		});
	  		}
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
