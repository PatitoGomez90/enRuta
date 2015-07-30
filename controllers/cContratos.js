var mContratos = require('../models/mContratos');
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
	req.session.nromenu = 18;
	mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	mContratos.getAll(function (contratos){
		res.render('contratoslista', {
        	pagename: 'Lista de Contratos',
        	contratos: contratos,
        	ayuda: ayuda[0]
      		}); 
		});    
	});
};

function getAlta(req, res){
	res.render('contratosalta', {
		pagename: 'Agregar Nuevo Contrato'
	});
}

function postAlta(req, res){
	params = req.body;
	nombre = params.nombre;
	numero = params.numero;

	mContratos.insert(nombre, numero, function (){
		res.redirect('contratoslista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mContratos.getById(id, function (contrato){
		res.render('contratosmodificar', {
			pagename: 'Modificar Contratos',
			contrato: contrato[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	nombre = params.nombre;
	numero = params.numero;
	activa = params.activa;
	if (activa == "on")
		activa = 1;
	else
		activa = 0

	mContratos.update(id, nombre, numero, activa, function (){
		res.redirect('contratoslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mContratos.del(id, function(){
		res.redirect('contratoslista');
	});
}