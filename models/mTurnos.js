var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn('select turnos.*, sectores.nombre as sectortxt from turnos left join sectores on sectores.id = turnos.id_sector_fk', cb);
}

function getById(id, cb){
	conn("select * from turnos where id = "+id, cb);
}

function insert(codigo, sector, cb){
	conn("insert into turnos(codigo, id_sector_fk) values('"+codigo+"', "+sector+")", cb);
}

function update(id, codigo, sector, cb){
	conn("update turnos set codigo ='"+codigo+"', id_sector_fk ="+sector+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from turnos where id = "+id, cb);
}