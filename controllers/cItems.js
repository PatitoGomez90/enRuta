var mItems = require('../models/mItems');
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
		mItems.getAll(function (items){
			res.render('itemslista', {
	        	pagename: 'Lista de Items de Trabajos',
	        	items: items
	        	//ayuda: ayuda[0]
	      	}); 
		});    
	//});
};

function getAlta(req, res){
	res.render('itemsalta',{
		pagename: "Alta de Items de Trabajo"
	});
}

function postAlta(req, res){
	params = req.body;
	numero = params.numero;
	nombre = params.nombre;
	sector = params.sector;
	lugar = params.lugar;
	umed = params.umed;
	horas_standard = params.horas_standard;
	contrato = params.contrato;

	mItems.insert(numero, nombre, sector, lugar, umed, horas_standard, contrato, function(){
		res.redirect('itemslista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;
	mItems.getById(id, function (item){
		res.render('itemsmodificar',{
			pagename: "Modificar Item de Trabajo",
			item: item[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	numero = params.numero;
	nombre = params.nombre;
	activo = params.activa;
	sector = params.sector;
	lugar = params.lugar;
	umed = params.umed;
	horas_standard = params.horas_standard;
	contrato = params.contrato;
	 
	if (activo == "on")
		activo = 1;
	else
		activo = 0;

	mItems.update(id, numero, nombre, sector, lugar, umed, horas_standard, contrato, activo, function(){
		res.redirect('itemslista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mItems.del(id, function(){
		res.redirect('itemslista');
	})
}
