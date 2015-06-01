var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getTipoEquipoPorId: getTipoEquipoPorId,
	update: update,
	del: del
}

function getAll(cb){
	conn('select * from tipoequipo', cb);
}

function insert(descripcion, cb){
	conn("insert into tipoequipo(descripcion, activa) values('"+descripcion+"', 1)", cb);
}

function getTipoEquipoPorId(id, cb){
	conn("select * from tipoequipo where id ="+id, cb);
}

function update(id, descripcion, activa, cb){
	conn("UPDATE tipoequipo SET descripcion='"+descripcion+"', activa='"+ activa+"' where id="+id, cb);
}

function del(id, cb){
	conn("DELETE from tipoequipo where id="+id , cb);
}