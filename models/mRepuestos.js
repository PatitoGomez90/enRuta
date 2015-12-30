var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	getCantRepuestosEnRubroById: getCantRepuestosEnRubroById
}

function getAll(cb){
	conn('select * from repuestos', cb);
}

function insert(codigo, nombre, stock, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, observaciones, puntopedido, coche, id_rubro, cb){
	conn("insert into repuestos(codigo, nombre, stock_actual, valor, calle, modulo, estante, minimo, maximo, descripcion, marca, "+
		"observaciones, punto_pedido, coche, id_rubro_fk) values('"+codigo+"', '"+nombre+"', "+stock+", "+valor+", '"+calle+"', "+modulo+", '"+estante+
		"', "+minimo+", "+maximo+", '"+descripcion+"', "+marca+", '"+observaciones+"', "+puntopedido+", "+coche+", "+id_rubro+");", cb);
}

function getById(id, cb){
	conn("select * from repuestos where id = "+id, cb);
}

function getCantRepuestosEnRubroById(id_rubro, cb){
	conn("select count(*) as cant FROM repuestos where id_rubro_fk = "+id_rubro, cb);
}