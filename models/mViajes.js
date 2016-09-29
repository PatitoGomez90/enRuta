var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insert: insert,
	getBy_Id: getBy_Id,
	update: update,
	del: del
}

function getAll(cb){
	conn("select viajes.*, DATE_FORMAT(viajes.fecha_generacion, '%d/%m/%Y') as fecha_generacion_f,"+
		"DATE_FORMAT(viajes.fecha_salida, '%d/%m/%Y') as fecha_salida_f, "+
		"DATE_FORMAT(viajes.fecha_llegada, '%d/%m/%Y') as fecha_llegada_f, "+
		"DATE_FORMAT(viajes.fecha_llegada_estimada, '%d/%m/%Y') as fecha_llegada_estimada_f, "+
		"tractores.patente as tractortxt, "+
		"semis.patente as semitxt "+
		"FROM viajes "+
		"LEFT JOIN tractores ON tractores.id = viajes.id_tractor_fk "+
		"LEFT JOIN semis ON semis.id = viajes.id_semi_fk", cb);
}

function insert(nro_comprobante, origen, destino, empresa, producto, tractor, semi, chofer, apodo, toneladas, fecha_gen, fecha_salida, fecha_llegada_aprox, fecha_llegada_real, observaciones, cb){
	conn("INSERT INTO viajes (nro_comprobante, id_origen_fk, id_destino_fk, id_empresa_fk, id_producto_fk, id_tractor_fk, id_semi_fk, "+
		"id_chofer_fk, apodo, toneladas, fecha_generacion, fecha_salida, fecha_llegada_estimada, fecha_llegada, observaciones) "+
		"VALUES ('"+nro_comprobante+"', '"+origen+"', '"+destino+"', '"+empresa+"', '"+producto+"', '"+tractor+"', "+
		"'"+semi+"', '"+chofer+"', '"+apodo+"', "+toneladas+", '"+fecha_gen+"', '"+fecha_salida+"', '"+fecha_llegada_aprox+"', "+
		"'"+fecha_llegada_real+"', '"+observaciones+"')", cb);
}

function getBy_Id(id, cb){
	conn("select viajes.*, DATE_FORMAT(viajes.fecha_generacion, '%d/%m/%Y') as fecha_generacion_f,"+
		"DATE_FORMAT(viajes.fecha_salida, '%d/%m/%Y') as fecha_salida_f, "+
		"DATE_FORMAT(viajes.fecha_llegada, '%d/%m/%Y') as fecha_llegada_f, "+
		"DATE_FORMAT(viajes.fecha_llegada_estimada, '%d/%m/%Y') as fecha_llegada_estimada_f "+
		"FROM viajes WHERE id = "+id, cb);
}

function update(id, nro_comprobante, origen, destino, empresa, producto, tractor, semi, chofer, apodo, toneladas, fecha_gen, fecha_salida, fecha_llegada_aprox, fecha_llegada_real, observaciones, cb){
	conn("UPDATE viajes SET nro_comprobante = '"+nro_comprobante+"' ,"+
		"id_origen_fk = '"+origen+"' ,"+
		"id_destino_fk = '"+destino+"' ,"+
		"id_empresa_fk = '"+empresa+"' ,"+
		"id_producto_fk = '"+producto+"' ,"+
		"id_tractor_fk = '"+tractor+"' ,"+
		"id_semi_fk = '"+semi+"' ,"+
		"id_chofer_fk = '"+chofer+"' ,"+
		"apodo = '"+apodo+"' ,"+
		"toneladas = '"+toneladas+"' ,"+
		"fecha_generacion = '"+fecha_gen+"' ,"+
		"fecha_salida = '"+fecha_salida+"' ,"+
		"fecha_llegada_estimada = '"+fecha_llegada_aprox+"' ,"+
		"fecha_llegada = '"+fecha_llegada_real+"' ,"+
		"observaciones = '"+observaciones+"' "+
		"WHERE id = "+id, cb);
}

function del(id, cb){
	conn("DELETE FROM viajes WHERE id = "+id, cb)
}