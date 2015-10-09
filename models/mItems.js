var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	insert2: insert2,
	getItemById: getItemById,
	update: update,
	getById: getById,
	del: del,
	getUltimoNumero: getUltimoNumero
}

function getAll(cb){
	conn("select * from items", cb);
}

function getAllActivos(cb){
	conn("select * from items where activa = 1 order by nombre", cb);
}

function insert(numero, nombre, sector, lugar, umed, horas_standard, contrato, cb){
	conn("insert into items(numero, nombre, id_sector_fk, id_lugar_fk, id_umed_fk, horas_standard, id_contrato_fk, activa) values("+numero+", '"+nombre+"', "+sector+", "+lugar+", "+umed+", "+horas_standard+", "+contrato+", 1)", cb)
}

function insert2(numero, nombre, sector, um, cb){
	conn("insert into items(numero, nombre, id_sector_fk, um) values("+numero+", '"+nombre+"', "+sector+", '"+um+"', 1)", cb)
}

function getById(id, cb){
	conn("select * from items where id="+id, cb);
}

function getItemById(id, cb){
	conn("select * from items where id="+id, cb);
}

function update(id, numero, nombre, sector, lugar, umed, horas_standard, contrato, activo, cb){
	conn("update items set numero ="+numero+", nombre='"+nombre+"', id_sector_fk = "+sector+", id_lugar_fk = "+lugar+", id_umed_fk ="+umed+", horas_standard ="+horas_standard+", id_contrato_fk = "+contrato+", activa="+activo+" where id="+id, cb);
}

function del(id, cb){
	conn("delete from items where id="+id, cb);
}

function getUltimoNumero(cb){
	conn("select max(numero) as numero from items", cb);
}

//para el reporte de items
	//function getItemsEntreFechas(fechadesde, fechapara)