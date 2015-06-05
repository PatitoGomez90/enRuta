var mTipoTarea = require('../models/mTipoTarea');
//var mAyuda = require('../models/mAyuda');

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
	//mAyuda.getAyudaTexto(req.session.nromenu, function(ayuda){
	mTipoTarea.getAll(function (alltipotarea){
		res.render('tipotarealista', {
        	pagename: 'Lista de Tipos de Tareas',
        	tipotareas: alltipotarea
      	}); 
	});    
	//});
};

function getAlta(req, res){
	res.render('tipotareaalta', {
		pagename: 'Agregar Nuevo Tipo de Tarea'
	});
}

function postAlta(req, res){
	params = req.body;
	descripcion = params.descripcion;

	mTipoTarea.insert(descripcion, function (){
		res.redirect('tipotarealista');
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mTipoTarea.getTipoTareaById(id, function (tipotarea){
		res.render('tipotareamodificar', {
			pagename: 'Modificar Tipo de Tarea',
			tipotarea: tipotarea[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	descripcion = params.descripcion;
	activa = params.activa;
	if (activa == "on")
		activa = 1;
	else
		activa = 0

	mTipoTarea.update(id, descripcion, activa, function (){
		res.redirect('tipotarealista');
	});
}

function getDel(req, res){
	params = req.params;
	id = params.id;

	mTipoTarea.del(id, function(){
		res.redirect('tipotarealista');
	});
}