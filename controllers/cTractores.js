const mTractores = require('../models/mTractores');
const mTipoTractor = require('../models/mTipoTractor');

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
			pagename: 'Lista de Tractores',
			tractores: tractores
		});
  	});
}

function getAlta(req, res){
	mTipoTractor.getAll(function(tipos_tractor){
		res.render("tractores_alta", {
			pagename: "Alta de Tractor",
			tipos_tractor: tipos_tractor
		});
	});	
}

function postAlta(req, res){
	const params = req.body;
	// console.log(params)
	const patente = params.patente;
	const marca = params.marca;
	const modelo = params.modelo;
	const tipo_tractor = params.tipo_tractor;
	const anio = params.anio;

	mTractores.insert(patente, marca, modelo, tipo_tractor, anio, function(){
		res.redirect('/tractores/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mTractores.getById(id, function(tractor){
		mTipoTractor.getAll(function(tipos_tractor){
			res.render('tractores_modificar', {
				pagename: 'Modificar Informacion de Tractor',
				tractor: tractor[0],
				tipos_tractor: tipos_tractor
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params);
	const id = params.id;
	const patente = params.patente;
	const marca = params.marca;
	const modelo = params.modelo;
	const tipo_tractor = params.tipo_tractor;
	const anio = params.anio;
	var activo = params.activo;
	if (activo == 'on')
		activo = '1';
	else
		activo = '0';
	
	mTractores.update(id, patente, marca, modelo, tipo_tractor, anio, activo, function(){
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