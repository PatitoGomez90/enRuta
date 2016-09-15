//requiriendo modelo mensaje.js:
var mChoferes = require('../models/mChoferes');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
	mChoferes.getChoferes(function (choferes){
		res.render('choferes_lista', {
			pagename: 'Lista de Choferes',
			choferes: choferes
		});
	});
}

function getAlta(req, res){
	res.render("choferes_alta", {
		pagename: "Alta de Choferes"
	});
}

function postAlta(req, res){
	const params = req.body;
	const nombre_completo = params.nombre_completo;
	const dni = params.dni;
	const id_sexo_fk = params.id_sexo_fk;
	const id_tractor_default_fk = params.id_tractor_default_fk;
	const id_semi_default_fk = params.id_semi_default_fk;

	mChoferes.insert(nombre_completo, dni, id_sexo_fk, id_tractor_default_fk, id_semi_default_fk, function(){
		res.redirect('/choferes/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mChoferes.getById(id, function(choferes){
		res.render('choferes_modificar', {
			pagename: 'Modificar Informacion de Choferes',
			choferes: choferes[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const nombre_completo = params.nombre_completo;
	const dni = params.dni;
	const id_sexo_fk = params.id_sexo_fk;
	const id_tractor_default_fk = params.id_tractor_default_fk;
	const id_semi_default_fk = params.id_semi_default_fk;
	var activo = params.activo;

	mChoferes.update(id, nombre_completo, dni, id_sexo_fk, id_tractor_default_fk, id_semi_default_fk, activo, function(){
		res.redirect('choferes/lista');
	});	
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mChoferes.remove(id, function(){
		res.redirect('/choferes/lista');
	});
}