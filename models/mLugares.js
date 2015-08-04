var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getSectores: getSectores,
	insert: insert,
	getById: getById,
	update: update,
	del: del,
	getAllActivos: getAllActivos,
	getBySectorId: getBySectorId
}

function getAll(cb){
	//conn('select * from lugares', cb);
	conn('select lugares.*, sectores.nombre as sectortxt from lugares left join sectores on lugares.id_sector_fk = sectores.id', cb);
}

function getSectores(cb){
	conn('select * from sectores', cb);
}

function insert(nombre, sector, cb){
	conn("insert into lugares(nombre, activa, id_sector_fk) values('"+nombre+"', 1, "+sector+")", cb);
}

function getById(id, cb){
	conn("select * from lugares where id = "+id , cb);
}

function update(id, nombre, activa, sector, cb){
	conn("update lugares set nombre='"+nombre+"', activa="+activa+", id_sector_fk="+sector+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from lugares where id="+id, cb);
}

function getAllActivos(cb){
	conn("select * from lugares where activa = 1", cb);
}

function getBySectorId(sectorid, cb){
	conn("select * from lugares where id_sector_fk="+sectorid, cb);
}