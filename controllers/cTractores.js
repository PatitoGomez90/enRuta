var mTractores = require('../models/mTractores');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mTractores.getAll(function (tractores){
  		res.render('tractores_lista', {
			pagename: 'Lista de tractores',
			tractores: tractores
		});
  	});
}

function getAlta(req, res){
	res.render("tractores_alta", {
		pagename: "Alta de Tractor"
	});
}

function postAlta(req, res){
	const params = req.body;
	console.log(params)
	const nombre = params.nombre;
	const razon_social = params.razon_social;
	const cuit = params.cuit;
	const domicilio = params.domicilio;
	const telefono = params.telefono;
	const email = params.email;
	const fax = params.fax;
	const contacto = params.contacto;

	mTractores.insert(nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, function(){
		res.redirect('/tractores/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mTractores.getById(id, function(tractor){
		res.render('tractores_modificar', {
			pagename: 'Modificar Informacion de Tractor',
			tractor: tractor[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params);
	const id = params.id;
	const nombre = params.nombre;
	const razon_social = params.razon_social;
	const cuit = params.cuit;
	const domicilio = params.domicilio;
	const telefono = params.telefono;
	const email = params.email;
	const fax = params.fax;
	const contacto = params.contacto;

	mTractores.update(id, nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, function(){
		res.redirect('/tractores/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mTractores.del(id, function(){
		res.redirect('/tractores/lista');
	});
}