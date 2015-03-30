var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getUltimoCodigo: getUltimoCodigo,
	insert: insert,
	getMaqPorID: getMaqPorID,
	update: update,
	del: del
	}

function getAll(cb){
	conn('select * from maq', cb);
}

function getUltimoCodigo(cb){
	conn("select max(codigo) as codigo from maq", cb);
}

function insert(codigo, dominio, nombre, marca, tipo, modelo, anio, serie, motor, fcompra, control, comb, titular, fbaja, mbaja, datos, linkfab, activa, cb){
	conn("insert into maq(codigo, dominio, nombre, marca, tipo, modelo, anio, serie, motor, fcompra, control, combus, titular, fbaja, mbaja, datos, linkfab, activa) values("+codigo+", '"+dominio+"', '"+nombre+"', '"+marca+"', "+tipo+", '"+modelo+"', "+anio+", '"+serie+"', '"+motor+"', '"+fcompra+"', "+control+", "+comb+", '"+titular+"', "+fbaja+", '"+mbaja+"', '"+datos+"', '"+linkfab+"', "+activa+")", cb);
}
		
function getMaqPorID(id, cb){
	conn("select * from maq where id="+id, cb);
}

function update(id, codigo, dominio, nombre, marca, tipo, modelo, anio, serie, motor, fcompra, control, comb, titular, fbaja, mbaja, datos, linkfab, activa, cb){
	if (fbaja===null)
		conn("update maq set codigo='"+codigo+"', dominio='"+dominio+"', nombre='"+nombre+"', marca='"+marca+"', tipo="+tipo+", modelo='"+modelo+"', anio="+anio+", serie='"+serie+"', motor='"+motor+"', fcompra='"+fcompra+"', control="+control+", combus="+comb+", titular='"+titular+"', fbaja="+fbaja+", mbaja='"+mbaja+"', datos='"+datos+"', linkfab='"+linkfab+"', activa="+activa+" where id ="+id, cb);
	else
		conn("update maq set codigo='"+codigo+"', dominio='"+dominio+"', nombre='"+nombre+"', marca='"+marca+"', tipo="+tipo+", modelo='"+modelo+"', anio="+anio+", serie='"+serie+"', motor='"+motor+"', fcompra='"+fcompra+"', control="+control+", combus="+comb+", titular='"+titular+"', fbaja='"+fbaja+"', mbaja='"+mbaja+"', datos='"+datos+"', linkfab='"+linkfab+"', activa="+activa+" where id ="+id, cb);		
}

function del(id, cb){
	conn("DELETE FROM maq where id="+id, cb);
}