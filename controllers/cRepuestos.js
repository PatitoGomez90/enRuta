//requiriendo modelo mensaje.js:
var mRepuestos = require('../models/mRepuestos');
var mBorro = require('../models/mBorro');
var mRubros = require('../models/mRubros');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	getCantRepuestosEnRubroById: getCantRepuestosEnRubroById
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mRepuestos.getAll(function (repuestos){
  		res.render('repuestoslista', {
			pagename: 'Archivo de Repuestos',
			repuestos: repuestos
		});
  	});
}

function getAlta(req, res){
	mRubros.getAll(function (rubros){
		res.render('repuestosalta', {
			pagename: 'Alta de Repuestos',
			rubros: rubros
		});
	});
}

function postAlta(req, res){
	params = req.body;
	id_rubro = params.rubro;
	codigo = params.codigo;
	nombre = params.nombre;
	stock = params.stock;
	valor = params.valor;
	calle = params.calle;
	modulo = params.modulo;
	estante = params.estante;
	minimo = params.minimo;
	maximo = params.maximo;
	descripcion = params.descripcion;
	marca = params.marca;
	if (marca == 'on')
		marca = 1;
	else
		marca = 0;
	observaciones = params.observaciones;
	puntopedido = params.puntopedido;
	coche = params.coche;

	mRepuestos.insert(codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, coche, id_rubro, function (){
		res.redirect('repuestoslista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mRepuestos.getById(id, function (repuesto){
		res.render("repuestosmodificar", {
			pagename: "Modificar Repuesto",
			repuesto: repuesto[0]
		});
	});
}

function postModificar(req, res){

}

function getDel(req, res){

}

function getCantRepuestosEnRubroById(req, res){
	params = req.params;
	id_rubro = params.id_rubro;

	mRepuestos.getCantRepuestosEnRubroById(id_rubro, function (repuestos){
		res.send(repuestos);
	})
}