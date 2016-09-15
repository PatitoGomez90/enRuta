var mTipoTractor = require('../models/mTipoTractor');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mTipoTractor.getAll(function (tipotractores){
  		res.render('tipotractor_lista', {
			pagename: 'Lista de Tipos de Semi',
			tipotractores: tipotractores
		});
  	});
}

function getAlta(req, res){
	res.render("tipotractor_alta", {
		pagename: "Alta de Tipo de Tractor"
	});
}

function postAlta(req, res){
	const params = req.body;
	const descripcion = params.descripcion;
	const ejes = params.ejes;

	mTipoTractor.insert(descripcion, ejes, function(){
		res.redirect('/tipotractor/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mTipoTractor.getById(id, function(tipotractor){
		res.render('tipotractor_modificar', {
			pagename: 'Modificar Informacion de Tipo de Tractor',
			tipotractor: tipotractor[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const descripcion = params.descripcion;
	const ejes = params.ejes;
	var activo = params.activo;
	if (activo == 'on')
		activo = '1';
	else
		activo = '0';
	
	mTipoTractor.update(id, descripcion, ejes, activo, function(){
		res.redirect('/tipotractor/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mTipoTractor.del(id, function(){
		res.redirect('/tipotractor/lista');
	});
}