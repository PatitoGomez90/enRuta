var mCodigoHora = require('../models/mCodigoHora');
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
		mCodigoHora.getAll(function (codigohoras){
			res.render('codigohoralista', {
	        	pagename: 'Lista de Tipos de Hora',
	        	codigohoras: codigohoras
	        	//ayuda: ayuda[0]
	      	}); 
		});    
	//});
};

function getAlta(req, res){
	res.render('codigohoraalta',{
		pagename: "Alta de Tipos de Hora"
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	numero = params.numero;

	mCodigoHora.insert(nombre, numero, function(){
		res.redirect('codigohoralista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mCodigoHora.getCodigoHoraById(id, function (codigohora){
		res.render('codigohoramodificar',{
			pagename: "Modificar Tipo de Hora",
			codigohora: codigohora[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	numero = params.numero;

	mCodigoHora.update(id, nombre, numero, function(){
		res.redirect('codigohoralista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mCodigoHora.del(id, function(){
		res.redirect('codigohoralista');
	})
}