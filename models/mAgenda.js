var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	updateHecho: updateHecho,
	getLast3: getLast3,
	getTodayAgenda: getTodayAgenda
}

function getAll(cb){
	conn("select *, DATE_FORMAT(agenda.fecha, '%d/%m/%Y') as fechaf, DATE_FORMAT(agenda.hora, '%H:%i') as horaf from agenda", cb);
}

function getById(id, cb){
	conn("select *, DATE_FORMAT(agenda.fecha, '%d/%m/%Y') as fechaf, DATE_FORMAT(agenda.hora, '%H:%i') as horaf from agenda where id = "+id, cb);
}

function insert(fecha, hora, descripcion_corta, descripcion_larga, cb){
	conn("insert into agenda(fecha, hora, descripcion_corta, descripcion_larga, hecho) values('"+fecha+"', '"+hora+"', '"+descripcion_corta+"', '"+descripcion_larga+"', '0')", cb);
}

function update(id, fecha, hora, descripcion_corta, descripcion_larga, cb){
	conn("update agenda set fecha = '"+fecha+"', hora = '"+hora+"', descripcion_corta='"+descripcion_corta+"', descripcion_larga='"+descripcion_larga+"' where id = "+id, cb);
}

function del(id, cb){
	conn("delete from agenda where id = "+id, cb);
}

function updateHecho(id, valor, cb){
	conn("update agenda set hecho = "+valor+" where id = "+id, cb);
}

function getLast3(cb){
	conn("select *, DATE_FORMAT(agenda.fecha, '%d/%m/%Y') as fechaf, DATE_FORMAT(agenda.hora, '%H:%i') as horaf from agenda where hecho = '0' order by fecha, hora limit 3", cb);
}

function getTodayAgenda(hoy, cb){
	conn("select *, DATE_FORMAT(agenda.fecha, '%d/%m/%Y') as fechaf, DATE_FORMAT(agenda.hora, '%H:%i') as horaf from agenda where fecha = '"+hoy+"' order by fecha, hora limit 5", cb);
}