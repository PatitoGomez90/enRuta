//requiriendo modelo mensaje.js:
var mAgenda = require('../models/mAgenda');
var mBorro = require('../models/mBorro');
// var mVerificacion = require('../models/mVerificacion');
var mAyuda = require('../models/mAyuda');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getDel: getDel,
	updateHecho: updateHecho
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function getLista(req, res) {
	req.session.nromenu = 3;
  	mAgenda.getAll(function (agenda){
  		res.render('agendalista', {
			pagename: 'Archivo de Agenda',
			agenda: agenda
		});
  	});
}

function getAlta(req, res){
	res.render("agendaalta", {
		pagename: "Alta de Nuevo Item de Agenda"
	});
}

function postAlta(req, res){
	params = req.body;
	fecha = params.fecha;
	hora = params.hora;
	corta = params.corta;
	larga = params.larga;

	fecha = changeDate(fecha);

	mAgenda.insert(fecha, hora, corta, larga, function (){
		res.redirect("agendalista");
	});
}

function getModificar(req, res){
	params = req.params;
	id = params.id;

	mAgenda.getById(id, function (agenda){
		res.render("agendamodificar", {
			pagename: "Modificar Item de Agenda",
			agenda: agenda[0]
		});
	});
}

function postModificar(req, res){
	params = req.body;
	id = params.id;
	fecha = params.fecha;
	hora = params.hora;
	corta = params.corta;
	larga = params.larga;

	fecha = changeDate(fecha);

	mAgenda.update(id, fecha, hora, corta, larga, function (){
		res.redirect("agendalista");
	});
}

function getDel(req, res){
	params = req.params;
	id = params. id;

	mAgenda.del(id, function(){
		res.redirect("agendalista");
	});
}

function updateHecho(req, res){
	params = req.params;
	id = params.id;
	valor = params.valor;

	mAgenda.updateHecho(id, valor, function (){
		res.send("Registro id "+id+" updateado!");
	});
}