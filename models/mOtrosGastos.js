var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getById: getById,
	update: update,
	del: del
}

function getAll(cb){
	conn("select otrosgastos.*, DATE_FORMAT(otrosgastos.fecha, '%d/%m/%Y') as fechaf, destinos.descripcion as destinotxt, "+
		"vehiculos.marca as marca, vehiculos.dominio as dominio, "+
		"secr.usuario as operador "+
		"from otrosgastos "+
		"left join destinos on destinos.id = otrosgastos.id_destino_fk  "+
		"left join vehiculos on vehiculos.numero = otrosgastos.id_vehiculo_fk "+
		"left join secr on secr.unica = otrosgastos.id_usuario_fk", cb);
}

function insert(fecha, descripcion, cantidad, destinos, coche, total, operario, memo, empresa, cb){
	conn("insert into otrosgastos(fecha, descripcion, cantidad, id_destino_fk, id_vehiculo_fk, total, id_usuario_fk, memo, empresa) "+
		"values('"+fecha+"', '"+descripcion+"', "+cantidad+", "+destinos+", "+coche+", "+total+", "+operario+", '"+memo+"', '"+empresa+"')", cb);
}

function getById(id, cb){
	conn("select otrosgastos.*, DATE_FORMAT(otrosgastos.fecha, '%d/%m/%Y') as fechaf, destinos.descripcion as destinotxt, "+
		"vehiculos.marca as marca, vehiculos.dominio as dominio, "+
		"secr.usuario as operador "+
		"from otrosgastos "+
		"left join destinos on destinos.id = otrosgastos.id_destino_fk  "+
		"left join vehiculos on vehiculos.numero = otrosgastos.id_vehiculo_fk "+
		"left join secr on secr.unica = otrosgastos.id_usuario_fk "+
		"where otrosgastos.id = "+ id, cb);
}

function update(id, fecha, descripcion, cantidad, destinos, coche, total, operario, memo, empresa, cb){
	conn("UPDATE `evhsa`.`otrosgastos` SET `fecha` = '"+fecha+"', `descripcion` = '"+descripcion+"', `cantidad` = "+cantidad+", "+
			"`id_destino_fk` = "+destinos+", `id_vehiculo_fk` = "+coche+", `total` = "+total+", `id_usuario_fk` = "+operario+
			", `memo` = '"+memo+"', `empresa` = '"+empresa+"' WHERE `id` = "+id, cb);
}

function del(id, cb){
	conn("delete from otrosgastos where id = "+id, cb);
}