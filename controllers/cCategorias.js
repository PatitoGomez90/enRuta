var mAyuda = require('../models/mAyuda');
var mCategorias = require('../models/mCategorias');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getLista(req, res){
	req.session.nromenu = 12;
	mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
	mCategorias.getAll(function (categorias){
		res.render('categoriaslista',{
			pagename: 'Lista de Categorias',
			categorias: categorias,
			ayuda: ayuda[0]
			});
		});
	});
};

function getAlta(req, res){
	res.render('categoriasalta',{
		pagename: 'Agregar Nueva Categorias'
	});
};

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;

	mCategorias.insert(nombre, function(){
		res.redirect('categoriaslista');
	});
};

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mCategorias.getById(id, function (categoria){
		res.render('categoriasmodificar',{
			pagename: 'Modificar Categoria',
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


function getDel(req, res){
	params = req.params;
	id = params.id;

	mCategorias.del(id, function(){
		res.redirect('categoriaslista');
	});
};