var mSemis = require('../models/mSemis');
const mTipoSemi = require('../models/mTipoSemi');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mSemis.getAll(function (semis){
  		res.render('semis_lista', {
			pagename: 'Lista de Semis',
			semis: semis
		});
  	});
}

function getAlta(req, res){
	mTipoSemi.getAll(function(tipos_semis){
		res.render("semis_alta", {
			pagename: "Alta de Semi",
			tipos_semis: tipos_semis
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	const patente = params.patente;
	const marca = params.marca;
	const modelo = params.modelo;
	const tipo_semi = params.tipo_semi;
	const anio = params.anio;

	mSemis.insert(patente, marca, modelo, tipo_semi, anio, function(){
		res.redirect('/semis/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mSemis.getById(id, function(semi){
		mTipoSemi.getAll(function(tipos_semis){
			res.render('semis_modificar', {
				pagename: 'Modificar Informacion de Semi',
				semi: semi[0],
				tipos_semis: tipos_semis
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	// console.log(params);
	const id = params.id;
	const patente = params.patente;
	const marca = params.marca;
	const modelo = params.modelo;
	const tipo_semi = params.tipo_semi;
	const anio = params.anio;
	var activo = params.activo;
	if (activo == 'on')
		activo = '1';
	else
		activo = '0';
	
	mSemis.update(id, patente, marca, modelo, tipo_semi, anio, activo, function(){
		res.redirect('/semis/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	mSemis.del(id, function(){
		res.redirect('/semis/lista');
	});
}