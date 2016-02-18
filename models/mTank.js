var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByCodigo: getByCodigo,
	getTankEntreFechas: getTankEntreFechas
}

function getAll(cb){
	conn("select tank.*, DATE_FORMAT(tank.fecha, '%d/%m/%Y') as fechaf, secr.usuario as operariotxt, tanques.nombre as tanquetxt from tank left join secr on secr.unica = tank.id_operario_fk left join tanques on tanques.id = tank.id_tanque_fk", cb);
}

function getById(id, cb){
	conn("select *, DATE_FORMAT(tank.fecha, '%d/%m/%Y') as fechaf from tank where id = "+id, cb);
}

function insert(fecha, proveedor, operario, litros, valor_litro, tanque, cb){
	conn("insert into tank(fecha, proveedor, id_operario_fk, litros, valor_litro, id_tanque_fk) values('"+fecha+"', '"+proveedor+"', "+operario+", "+litros+", "+valor_litro+", "+tanque+")", cb);
}

function update(id, fecha, proveedor, operario, litros, valor_litro, tanque, cb){
	conn("update tank set fecha = '"+fecha+"', proveedor = '"+proveedor+"', id_operario_fk = "+operario+", litros="+litros+", valor_litro = "+valor_litro+", id_tanque_fk= "+tanque+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from tank where id = "+id, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from tank where codigo='"+codigo+"'", cb);
}

function getTankEntreFechas(desde, hasta, cb){
	conn("select tank.*, DATE_FORMAT(tank.fecha, '%d/%m/%Y') as fechaf, secr.usuario as operariotxt, tanques.nombre as tanquetxt from tank left join secr on secr.unica = tank.id_operario_fk left join tanques on tanques.id = tank.id_tanque_fk where fecha >= '"+desde+"' AND fecha <= '"+hasta+"'", cb);
}