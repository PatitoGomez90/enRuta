var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByFecha: getByFecha
}

function getAll(cb){
	conn('select comb_planilladiaria.*, secr.usuario as operariotxt from comb_planilladiaria left join secr on secr.unica = comb_planilladiaria.operario', cb);
}

function getById(id, cb){
	conn("select comb_planilladiaria.*, DATE_FORMAT(comb_planilladiaria.fecha, '%d/%m/%Y') as fechaf, secr.usuario as operariotxt, lineas.descripcion as lineatxt, "+
		"DATE_FORMAT(comb_planilladiaria.hora, '%H:%i') as horaf, "+
		"tanques.nombre as tanquetxt, "+
		"comb_planilladiaria.oil*comb_planilladiaria.valoil as val_total_oil, "+
		"comb_planilladiaria.gas*comb_planilladiaria.valgas as val_total_gas, "+
		"((comb_planilladiaria.oil*comb_planilladiaria.valoil) + (comb_planilladiaria.gas*comb_planilladiaria.valgas)) as val_total "+
		"from comb_planilladiaria "+
		"left join secr on secr.unica = comb_planilladiaria.id_usuario_fk "+
		"left join lineas on lineas.id = comb_planilladiaria.id_linea_fk "+
		"left join tanques on tanques.id = comb_planilladiaria.id_tanque_fk "+
		"where comb_planilladiaria.id = "+id, cb);}

function insert(fecha, legajo, articulo, coche, linea, hora, gas, oil, agua, valgas, valoil, tanque, noper, cb){
	conn("INSERT INTO `evhsa`.`comb_planilladiaria` (`fecha`, `id_vehiculo_fk`, `id_usuario_fk`, `oil`, `gas`, `hora`, `id_linea_fk`, "+
		"`agua`, `valgas`, `valoil`, `operario`, `id_repuesto_fk`, `id_tanque_fk`) VALUES ('"+fecha+"', "+coche+", "+legajo+", "+
		oil+", "+gas+", '"+hora+"', "+linea+", "+agua+", "+valgas+", "+valoil+", "+noper+", "+articulo+", "+tanque+");", cb);
}

function update(id, fecha, legajo, articulo, coche, linea, hora, gas, oil, agua, valgas, valoil, tanque, noper, cb){
	conn("UPDATE `evhsa`.`comb_planilladiaria` SET `fecha` = '"+fecha+"', `id_vehiculo_fk` = "+coche+", "+
			"`id_usuario_fk` = "+legajo+", `oil` = "+oil+", `gas` = "+gas+", `hora` = '"+hora+"', "+
			"`id_linea_fk` = "+linea+", `agua` = "+agua+", `valgas` = "+valgas+", `valoil` = "+valoil+", "+
			"`operario` = "+noper+", `id_repuesto_fk` = "+articulo+", `id_tanque_fk` = "+tanque+" "+
			"WHERE `id` = "+id, cb);
}

function del(id, cb){
	conn("delete from comb_planilladiaria where id = "+id, cb);
}

function getByFecha(fecha, cb){
	conn("select comb_planilladiaria.*, secr.usuario as operariotxt, lineas.descripcion as lineatxt, "+
		"DATE_FORMAT(comb_planilladiaria.hora, '%H:%i') as horaf, "+
		"tanques.nombre as tanquetxt, "+
		"comb_planilladiaria.oil*comb_planilladiaria.valoil as val_total_oil, "+
		"comb_planilladiaria.gas*comb_planilladiaria.valgas as val_total_gas, "+
		"((comb_planilladiaria.oil*comb_planilladiaria.valoil) + (comb_planilladiaria.gas*comb_planilladiaria.valgas)) as val_total "+
		"from comb_planilladiaria "+
		"left join secr on secr.unica = comb_planilladiaria.id_usuario_fk "+
		"left join lineas on lineas.id = comb_planilladiaria.id_linea_fk "+
		"left join tanques on tanques.id = comb_planilladiaria.id_tanque_fk "+
		"where fecha = '"+fecha+"'", cb);
}