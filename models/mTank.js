var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByCodigo: getByCodigo
}

function getAll(cb){
	conn("select tank.*, DATE_FORMAT(tank.fecha, '%d/%m/%Y') as fechaf, secr.usuario as operariotxt from tank left join secr on secr.unica = tank.id_operario_fk", cb);
}

function getById(id, cb){
	conn("select *, DATE_FORMAT(tank.fecha, '%d/%m/%Y') as fechaf from tank where id = "+id, cb);
}

function insert(fecha, proveedor, operario, litros, valor_litro, cb){
	conn("insert into tank(fecha, proveedor, id_operario_fk, litros, valor_litro) values('"+fecha+"', '"+proveedor+"', "+operario+", "+litros+", "+valor_litro+")", cb);
}

function update(id, fecha, proveedor, operario, litros, valor_litro, cb){
	conn("update tank set fecha = '"+fecha+"', proveedor = '"+proveedor+"', id_operario_fk = "+operario+", litros="+litros+", valor_litro = "+valor_litro+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from tank where id = "+id, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from tank where codigo='"+codigo+"'", cb);
}
