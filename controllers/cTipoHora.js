var mTipoHora = require('../models/mTipoHora');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel
};

function getLista(req, res) {
	//req.session.nromenu = 5;
	//mAyuda.getAyudaTexto(req.session.nromenu, function (ayuda){
		mTipoHora.getAll(function (tipohoras){
			res.render('tipohoralista', {
	        	pagename: 'Lista de Tipos de Hora',
	        	tipohoras: tipohoras
	        	//ayuda: ayuda[0]
	      	}); 
		});    
	//});
};

function getAlta(req, res){
	res.render('tipohoraalta',{
		pagename: "Alta de Tipos de Hora"
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	codigo = params.codigo;

	mTipoHora.insert(nombre, codigo.toUpperCase(), function(){
		res.redirect('tipohoralista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mTipoHora.getTipoHoraById(id, function (tipohora){
		res.render('tipohoramodificar',{
			pagename: "Modificar Tipo de Hora",
			tipohora: tipohora[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	codigo = params.codigo;

	mTipoHora.update(id, nombre, codigo.toUpperCase(), function(){
		res.redirect('tipohoralista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mTipoHora.del(id, function(){
		res.redirect('tipohoralista');
	})
}