var mTipoProductos = require('../models/mTipoProductos');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mTipoProductos.getAll(function (tipoproductos){
  		res.render('tipoproducto_lista', {
			pagename: 'Lista de Tipo de Productos',
			tipoproductos: tipoproductos
		});
  	});
}

function getAlta(req, res){
	res.render("tipoproducto_alta", {
		pagename: "Alta de Tipo de Productos"
	});
}

function postAlta(req, res){
	const params = req.body;
	const descripcion = params.descripcion;

	mTipoProductos.insert(descripcion, function(){
		res.redirect('/tipoproducto/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mTipoProductos.getById(id, function(tipoproductos){
		res.render('tipoproducto_modificar', {
			pagename: 'Modificar Informacion de Tipo de Productos',
			tipoproductos: tipoproductos[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const descripcion = params.descripcion;
	var activo = params.activo;
	if (activo == 'on')
		activo = '1';
	else
		activo = '0';
	
	mTipoProductos.update(id, descripcion, activo, function(){
		res.redirect('/tipoproducto/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mTipoProductos.del(id, function(){
		res.redirect('/tipoproducto/lista');
	});
}