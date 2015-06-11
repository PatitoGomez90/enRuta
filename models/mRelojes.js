var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	conn("select relojes.*, sectores.nombre as sectortxt from relojes left join sectores on relojes.id_sector_fk = sectores.id ", cb);
}

function insert(numero, sector, descripcion, cb){
	conn("insert into relojes(numero, id_sector_fk, descripcion) values("+numero+", "+sector+", '"+descripcion+"')", cb)
}

function getById(id, cb){
	conn("select * from relojes where id="+id, cb);
}

function update(id, numero, sector, descripcion, cb){
	conn("update relojes set numero="+numero+", id_sector_fk="+sector+", descripcion='"+descripcion+"' where id="+id, cb);
}

function del(id, cb){
	conn("delete from relojes where id="+id, cb);
}