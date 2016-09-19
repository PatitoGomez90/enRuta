var mProductos = require('../models/mProductos');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mProductos.getAll(function (productos){
  		res.render('productos_lista', {
			pagename: 'Lista de Productos',
			productos: productos
		});
  	});
}

function getAlta(req, res){
	res.render("productos_alta", {
		pagename: "Alta de Productos"
	});
}

function postAlta(req, res){
	const params = req.body;
	// console.log(params)
	const nombre = params.nombre;
	const razon_social = params.razon_social;
	const cuit = params.cuit;
	const domicilio = params.domicilio;
	const telefono = params.telefono;
	const email = params.email;
	const fax = params.fax;
	const contacto = params.contacto;

	mProductos.insert(nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, function(){
		res.redirect('/empresas/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mProductos.getById(id, function(empresa){
		res.render('empresas_modificar', {
			pagename: 'Modificar Informacion de Empresa',
			empresa: empresa[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	// console.log(params);
	const id = params.id;
	const nombre = params.nombre;
	const razon_social = params.razon_social;
	const cuit = params.cuit;
	const domicilio = params.domicilio;
	const telefono = params.telefono;
	const email = params.email;
	const fax = params.fax;
	const contacto = params.contacto;
	var activo = params.activo;
	// console.log(activo)
	if (activo == 'on')
		activo = '1';
	else
		activo = '0';
	
	mProductos.update(id, nombre, razon_social, cuit, domicilio, telefono, email, fax, contacto, activo, function(){
		res.redirect('/empresas/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mProductos.del(id, function(){
		res.redirect('/empresas/lista');
	});
}