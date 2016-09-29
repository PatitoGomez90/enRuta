var mTipoCuenta = require('../models/mTipoCuenta');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mTipoCuenta.getAll(function (tipocuenta){
  		res.render('tipocuenta_lista', {
			pagename: 'Lista de Tipos de Cuenta',
			tipocuenta: tipocuenta
		});
  	});
}

function getAlta(req, res){
	res.render("tipocuenta_alta", {
		pagename: "Alta de Tipo de Cuenta"
	});
}

function postAlta(req, res){
	const params = req.body;
	const nombre = params.nombre;
	const descripcion = params.descripcion;

	mTipoCuenta.insert(nombre, descripcion, function(){
		res.redirect('/tipocuenta/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mTipoCuenta.getById(id, function(tipocuenta){
		res.render('tipocuenta_modificar', {
			pagename: 'Modificar Informacion de Tipo de Cuenta',
			tipocuenta: tipocuenta[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	const id = params.id;
	const nombre = params.nombre;
	const descripcion = params.descripcion;
	var activo = params.activo;
	if (activo == 'on')
		activo = '1';
	else
		activo = '0';
	
	mTipoCuenta.update(id, nombre, descripcion, activo, function(){
		res.redirect('/tipocuenta/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mTipoCuenta.del(id, function(){
		res.redirect('/tipocuenta/lista');
	});
}