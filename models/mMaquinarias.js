var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllMaq: getAllMaq,
	getUltimoCodigo: getUltimoCodigo,
	insert: insert,
	insertMaq: insertMaq,
	getMaqPorID: getMaqPorID,
	update: update,
	del: del
	}

function getAll(cb){
	conn('select * from maq', cb);
}

function getAllMaq(cb){
	conn('select * from maq where tipo = 1', cb);
}

function getUltimoCodigo(cb){
	conn("select max(codigo) as codigo from maq", cb);
}

function insert(codigo, dominio, nombre, marca, tipo, modelo, anio, serie, motor, fcompra, control, comb, titular, fbaja, mbaja, datos, linkfab, activa, cb){
	conn("insert into maq(codigo, dominio, nombre, marca, tipo, modelo, anio, serie, motor, fcompra, control, combus, titular, fbaja, mbaja, datos, linkfab, activa) values("+codigo+", '"+dominio+"', '"+nombre+"', '"+marca+"', "+tipo+", '"+modelo+"', "+anio+", '"+serie+"', '"+motor+"', '"+fcompra+"', "+control+", "+comb+", '"+titular+"', "+fbaja+", '"+mbaja+"', '"+datos+"', '"+linkfab+"', "+activa+")", cb);
}

function insertMaq(codigo, nombre, marca, tipo, modelo, serie, fcompra, fbaja, mbaja, datos, linkfab, activa, cb){
	conn("insert into maq(codigo, nombre, marca, tipo, modelo, serie, fcompra, fbaja, mbaja, datos, linkfab, activa) values("+codigo+", '"+nombre+"', '"+marca+"', "+tipo+", '"+modelo+"', '"+serie+"', '"+fcompra+"', "+fbaja+", '"+mbaja+"', '"+datos+"', '"+linkfab+"', "+activa+")", cb);
}
		
function getMaqPorID(id, cb){
	conn("select * from maq where id="+id, cb);
}

function update(id, codigo, nombre, marca, modelo, serie, fcompra, fbaja, mbaja, datos, linkfab, activa, cb){
	if (fbaja===null)
		conn("update maq set codigo='"+codigo+"', nombre='"+nombre+"', marca='"+marca+"', modelo='"+modelo+"', serie='"+serie+"', fcompra='"+fcompra+"', fbaja="+fbaja+", mbaja='"+mbaja+"', datos='"+datos+"', linkfab='"+linkfab+"', activa="+activa+" where id ="+id, cb);
	else
		conn("update maq set codigo='"+codigo+"', nombre='"+nombre+"', marca='"+marca+"', modelo='"+modelo+"', serie='"+serie+"', fcompra='"+fcompra+"', fbaja='"+fbaja+"', mbaja='"+mbaja+"', datos='"+datos+"', linkfab='"+linkfab+"', activa="+activa+" where id ="+id, cb);		
}

function del(id, cb){
	conn("DELETE FROM maq where id="+id, cb);
}