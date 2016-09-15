var mTipoSemi = require('../models/mTipoSemi');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mTipoSemi.getAll(function (tiposemi){
  		res.render('tiposemi_lista', {
			pagename: 'Lista de Tipos de Semi',
			tiposemi: tiposemi
		});
  	});
}

function getAlta(req, res){
	res.render("tiposemi_alta", {
		pagename: "Alta de Tipo de Semi"
	});
}

function postAlta(req, res){
	const params = req.body;
	const descripcion = params.descripcion;
	const ejes = params.ejes;
	const capacidad = params.capacidad;

	mTipoSemi.insert(descripcion, ejes, capacidad, function(){
		res.redirect('/tiposemi/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mTipoSemi.getById(id, function(tiposemi){
		res.render('tiposemi_modificar', {
			pagename: 'Modificar Informacion de Tipo de Semi',
			tiposemi: tiposemi[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const descripcion = params.descripcion;
	const ejes = params.ejes;
	const capacidad = params.capacidad;
	var activo = params.activo;
	if (activo == 'on')
		activo = '1';
	else
		activo = '0';
	
	mTipoSemi.update(id, descripcion, ejes, capacidad, activo, function(){
		res.redirect('/tiposemi/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mTipoSemi.del(id, function(){
		res.redirect('/tiposemi/lista');
	});
}