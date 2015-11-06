//abarca planti1 y planti2
var conn = require('../config/db').conn;

module.exports = {
	getAll_planti1: getAll_planti1,
	getAllActivos: getAllActivos,
	insert: insert,
	getById: getById,
	update: update,
	del: del,
	getUltimoCodigo: getUltimoCodigo,
	getAll_planti2: getAll_planti2,
	insertp2: insertp2,
	delp2: delp2
}

function getAll_planti1(cb){
	conn("select planti1.*, sectores.nombre as sectortxt from planti1 left join sectores on sectores.id = planti1.id_sector_fk", cb);
}

function getAllActivos(cb){
	conn("select * from planti1 where activa = 1 order by nombre", cb);
}

function insert(nombre, id_sector, cb){
	conn("insert into planti1(nombre, id_sector_fk, activa) values('"+nombre+"', "+id_sector+", 1)", cb)
}

function getById(id, cb){
	conn("select * from planti1 where id="+id, cb);
}

function update(id, nombre, id_sector, activo, cb){
	conn("update planti1 set nombre='"+nombre+"', id_sector_fk ="+id_sector+", activa="+activo+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from planti1 where id="+id, cb);
}

function getUltimoCodigo(cb){
	conn("select max(codigo) as codigo from p", cb);
}

function getAll_planti2(id_planti1, cb){
	conn("select planti2.*, emple.nombre as empletxt from planti2 left join emple on emple.codigo = planti2.id_emple_fk where id_planti1_fk = "+id_planti1, cb);
}

function insertp2(id_planti1, id_emple, cb){
	conn("insert into planti2(id_planti1_fk, id_emple_fk) values ("+id_planti1+", "+id_emple+");", cb);
}

function delp2(idp2, cb){
	conn("delete from planti2 where id="+idp2, cb);
}