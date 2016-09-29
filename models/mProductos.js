var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del
}

function getAll(cb){
	conn("select productos.*, IF(productos.activo = '1', 'Si', 'No') as activotxt, "+
		"tipo_productos.descripcion as tipoproductotxt, "+
		"IF(productos.peligroso = 1, 'Si', IF(productos.peligroso = 0, 'No', '')) as peligrosotxt, "+
		"empresas.nombre as empresatxt, "+
		"umed.abreviacion as umedtxt "+
		"from productos "+
		"LEFT JOIN tipo_productos ON tipo_productos.id = productos.id_tipo_producto_fk "+
		"LEFT JOIN empresas ON empresas.id = productos.id_empresa_fk "+
		"LEFT JOIN umed ON umed.id = productos.id_umed_fk", cb);
}

function getById(id, cb){
	conn("select * from productos where id = "+id, cb);
}

function insert(nombre, empresa, peligroso, tipo_producto, umed, cb){
	conn("INSERT INTO productos(nombre, id_empresa_fk, peligroso, id_tipo_producto_fk, id_umed_fk, activo) "+
		"VALUES('"+nombre+"', '"+empresa+"', '"+peligroso+"', '"+tipo_producto+"', '"+umed+"', '1')", cb)
}

function update(id, nombre, empresa, peligroso, tipo_producto, umed, activo, cb){
	conn("UPDATE productos SET "+
		"nombre = '"+nombre+"', "+
		"id_empresa_fk = '"+empresa+"', "+
		"peligroso = '"+peligroso+"', "+
		"id_tipo_producto_fk = '"+tipo_producto+"', "+
		"id_umed_fk = '"+umed+"', "+
		"activo = '"+activo+"' "+
		"WHERE id = "+id, cb);
}

function del(id, cb){
	conn("DELETE FROM productos WHERE id = "+id, cb);
}