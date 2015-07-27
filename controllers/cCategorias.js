var mAyuda = require('../models/mAyuda');
var mCategorias = require('../models/mCategorias');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	del: del
};

function getLista(req, res){
	mCategorias.getAll(function (categorias){
		res.render('categoriaslista',{
			pagename: 'Categorias Lista',
			categorias: categorias
		});
	});
};

function getAlta(req, res){
	res.render('categoriasalta',{
		pagename: 'Categorias Alta'
	});
};

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	activa = params.activa;

	if (activa == "on") {
		activa = 1;
	}else{
		activa = 0;
	};

	mCategorias.insert(nombre, activa, function(){
		res.redirect('categoriaslista');
	});
};

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mCategorias.getById(id, function (categoria){
		res.render('categoriamodificar',{
			pagename: 'Modificar Categorias',
			categoria: categoria[0]
		});
	});
};

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	activa = params.activa;

	if (activa == "on") {
		activa = 1;
	}else{
		activa = 0;
	};

	mCategorias.update(id, nombre, activa, function(){
		res.redirect('categoriaslista');
	});
};

function del(req, res){
	params = req.params;
	id = params.id;

	mCategorias.del(id, function(){
		res.redirect('categoriaslista');
	});
};