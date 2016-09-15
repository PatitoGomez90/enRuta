var mEmpresas = require('../models/mEmpresas');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mEmpresas.getAll(function (empresas){
  		res.render('empresas_lista', {
			pagename: 'Lista de Empresas',
			empresas: empresas
		});
  	});
}

function getAlta(req, res){
	res.render("empresas_alta", {
		pagename: "Alta de Empresa"
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

	mEmpresas.insert(nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, function(){
		res.redirect('/empresas/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mEmpresas.getById(id, function(empresa){
		res.render('empresas_modificar', {
			pagename: 'Modificar Informacion de Empresa'
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params);

	mEmpresas.update(id, function(){
		res.redirect('/empresas/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mEmpresas.delete(id, function(){
		res.redirect('/empresas/lista');
	});
}