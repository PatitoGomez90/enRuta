var mProductos = require('../models/mProductos');
const mTipoProductos = require('../models/mTipoProductos');
const mEmpresas = require('../models/mEmpresas');
const mUmed = require('../models/mUmed');

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
	mTipoProductos.getAll(function (tipos_producto){
		mEmpresas.getAll(function (empresas){
			mUmed.getAll(function (umed){
				res.render("productos_alta", {
					pagename: "Alta de Productos",
					tipos_producto: tipos_producto,
					empresas: empresas,
					umed: umed
				});
			});
		});
	});
	
}

function postAlta(req, res){
	const params = req.body;
	// console.log(params)
	const nombre = params.nombre;
	const empresa = params.empresa;
	var peligroso = params.peligroso;
	const tipo_producto = params.tipo_producto;
	const umed = params.umed;
	if (peligroso == 'on')
		peligroso = '1';
	else
		peligroso = '0';

	mProductos.insert(nombre, empresa, peligroso, tipo_producto, umed, function(){
		res.redirect('/productos/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mProductos.getById(id, function(producto){
		mTipoProductos.getAll(function (tipos_producto){
			mEmpresas.getAll(function (empresas){
				mUmed.getAll(function (umed){
					res.render('productos_modificar', {
						pagename: 'Modificar Informacion de Producto',
						producto: producto[0],
						tipos_producto: tipos_producto,
						empresas: empresas,
						umed: umed
					});
				});
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	// console.log(params);
	const id = params.id;
	const nombre = params.nombre;
	const empresa = params.empresa;
	var peligroso = params.peligroso;
	const tipo_producto = params.tipo_producto;
	const umed = params.umed;
	var activo = params.activo;
	// console.log(activo)
	if (activo == 'on')
		activo = '1';
	else
		activo = '0';

	if (peligroso == 'on')
		peligroso = '1';
	else
		peligroso = '0';

	mProductos.update(id, nombre, empresa, peligroso, tipo_producto, umed, activo, function(){
		res.redirect('/productos/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mProductos.del(id, function(){
		res.redirect('/productos/lista');
	});
}