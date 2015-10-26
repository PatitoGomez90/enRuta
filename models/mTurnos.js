var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByIdSector: getByIdSector,
	getAllSinRepetir: getAllSinRepetir
}

function getAll(cb){
	conn('select turnos.*, sectores.nombre as sectortxt from turnos left join sectores on sectores.id = turnos.id_sector_fk', cb);
}

function getById(id, cb){
	conn("select * from turnos where id = "+id, cb);
}

function insert(codigo, sector, turnicidad, cb){
	conn("insert into turnos(codigo, id_sector_fk, turnicidad) values('"+codigo+"', "+sector+", "+turnicidad+")", cb);
}

function update(id, codigo, sector, turnicidad, cb){
	conn("update turnos set codigo ='"+codigo+"', id_sector_fk ="+sector+", turnicidad = "+turnicidad+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from turnos where id = "+id, cb);
}

function getByIdSector(idsector, cb){
	conn("select * from turnos where id_sector_fk="+idsector, cb);
}

function getAllSinRepetir(cb){
	conn("select max(codigo) as codigo from turnos group by codigo", cb)
}