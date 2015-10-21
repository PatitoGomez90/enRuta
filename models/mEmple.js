	var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllOrderByNombre: getAllOrderByNombre,
	getAllActivos: getAllActivos,
	getAllActivos2: getAllActivos2,
	insert: insert,
	insertFinal: insertFinal,
	getUltimo: getUltimo,
	getEmplePorCodigo: getEmplePorCodigo,
	getEmplePorLegajo: getEmplePorLegajo,
	getEmplePorCodigoconJoin: getEmplePorCodigoconJoin,
	getEmplePorLegajoConIdDistinto: getEmplePorLegajoConIdDistinto,
	update: update,
	delEmple: delEmple,
	getEmpleBySector: getEmpleBySector,
	getFiltrado: getFiltrado,
	getByTurno: getByTurno,
	getReporteEmplesEntreFechas: getReporteEmplesEntreFechas
}

function getAll(cb){
	conn('select * from emple', cb);
}

function getAllOrderByNombre(cb){
	conn("select * from emple order by nombre", cb);
}

function getAllActivos(cb){
	conn("select emple.*, "+
		"cargos.descripcion as cargotxt, "+
		"sectores.nombre as sectortxt, "+
		"DATE_FORMAT(emple.fecha_nac, '%d/%m/%Y') as fecha_nacf, "+
		"DATE_FORMAT(emple.fbaja, '%d/%m/%Y') as fbajaf, "+
		"DATE_FORMAT(emple.falta, '%d/%m/%Y') as faltaf, "+
		"contratos.nombre as contratotxt, "+
		"turnos.codigo as turnotxt,	"+
		"categorias.nombre as categoriatxt, "+
		"condicion.nombre as condiciontxt "+
		"from emple "+
		"left join sectores on sectores.id = emple.id_sector_fk "+
		"left join cargos on cargos.id = emple.cargo "+
		"left join contratos on contratos.id = emple.id_contrato_fk "+
		"left join turnos on turnos.id = emple.id_turno_fk "+
		"left join categorias on categorias.id = emple.id_categoria_fk "+
		"left join condicion on condicion.id = emple.id_condicion_fk "+
		"where emple.activa=1 order by nombre", cb);
}

function getAllActivos2(cb){
	conn('select emple_backup.*, cargos.descripcion, sectores.nombre as sectortxt from emple_backup left join sectores on sectores.id = emple_backup.id_sector_fk left join cargos on cargos.id = emple_backup.cargo where emple_backup.activa=1 order by nombre', cb);
}

function insert(codigo, nombre, falta, fbaja, cargo, sector, activa, legajo, cuil, fnac, domicilio, cp, telefono, tarjeta, sexo, categoria, turno, condicion, contrato, cb){
	conn("insert into emple(nombre, falta, fbaja, cargo, id_sector_fk, activa, legajo, cuil, fecha_nac, domicilio, cp, tel, tarjeta, sexo, id_categoria_fk, id_turno_fk, id_condicion_fk, id_contrato_fk) values('"+nombre+"', '"+falta+"', '"+fbaja+"', '"+cargo+"',"+sector+", "+ activa+", "+legajo+", '"+cuil+"', '"+fnac+"', '"+domicilio+"', "+cp+", '"+telefono+"', "+tarjeta+", "+sexo+", "+categoria+", "+turno+", "+condicion+", "+contrato+")", cb);
}

function insertFinal(codigo, nombre, falta, fbaja, cargo, sector, activa, legajo, cuil, fnac, domicilio, cp, telefono, tarjeta, sexo, categoria, turno, condicion, contrato, cb){
	conn("insert into emplefinal(nombre, falta, fbaja, cargo, id_sector_fk, activa, legajo, cuil, fecha_nac, domicilio, cp, tel, tarjeta, sexo, id_categoria_fk, id_turno_fk, id_condicion_fk, id_contrato_fk) values('"+nombre+"', '"+falta+"', '"+fbaja+"', '"+cargo+"',"+sector+", "+ activa+", "+legajo+", '"+cuil+"', '"+fnac+"', '"+domicilio+"', "+cp+", '"+telefono+"', "+tarjeta+", "+sexo+", "+categoria+", "+turno+", "+condicion+", "+contrato+")", cb);
}

function getUltimo(cb){
	conn("select max(codigo) as max from emple", cb);
}

function getEmplePorCodigo(codigo, cb){
	conn("select emple.*, cargos.descripcion as cargotxt, sectores.nombre as sectortxt, DATE_FORMAT(emple.fecha_nac, '%d/%m/%Y') as fecha_nacf,	DATE_FORMAT(emple.fbaja, '%d/%m/%Y') as fbajaf,	DATE_FORMAT(emple.falta, '%d/%m/%Y') as faltaf,	contratos.nombre as contratotxt, turnos.codigo as turnotxt,	categorias.nombre as categoriatxt, condicion.nombre as condiciontxt from emple left join sectores on sectores.id = emple.id_sector_fk left join cargos on cargos.id = emple.cargo left join contratos on contratos.id = emple.id_contrato_fk left join turnos on turnos.id = emple.id_turno_fk	left join categorias on categorias.id = emple.id_categoria_fk left join condicion on condicion.id = emple.id_condicion_fk where emple.codigo="+ codigo, cb);
}

function getEmplePorCodigoconJoin(cd, cb){
	conn("select emple.*, cargos.descripcion as cargo_descripcion, sectores.nombre as sectortxt, categorias.nombre as categoriatxt, turnos.codigo as turnotxt, condicion.nombre as condiciontxt, contratos.nombre as contratotxt from emple left join sectores on sectores.id = emple.id_sector_fk left join cargos on cargos.id=emple.cargo left join categorias on categorias.id = emple.id_categoria_fk left join turnos on turnos.id = emple.id_turno_fk left join condicion on condicion.id = emple.id_condicion_fk left join contratos on contratos.id = emple.id_contrato_fk where emple.codigo="+cd, cb);
}

function getEmplePorLegajoConIdDistinto(id, legajo, cb){
	conn("select * from emple where legajo = "+legajo+" and codigo <> "+id, cb);
}

function getEmplePorLegajo(legajo, cb){
	conn("select * from emple where legajo="+ legajo, cb);
}

function update(codigo, nombre, falta, fbaja, cargo, sector, activa, legajo, cuil, fnac, domicilio, cp, telefono, tarjeta, sexo, categoria, turno, condicion, contrato, cb){
	conn("update emple set nombre='"+nombre+"', falta='"+falta+"', fbaja='"+fbaja+"', cargo='"+cargo+"', id_sector_fk="+sector+", activa="+activa+", legajo="+legajo+", cuil='"+cuil+"', fecha_nac='"+fnac+"', domicilio='"+domicilio+"', cp="+cp+", tel='"+telefono+"', tarjeta="+tarjeta+", sexo="+sexo+", id_categoria_fk="+categoria+", id_turno_fk="+turno+", id_condicion_fk="+condicion+", id_contrato_fk="+contrato+" where codigo="+ codigo, cb);
}

function delEmple(codigo, cb){
	conn("delete from emple where codigo="+codigo, cb);
}

function getEmpleBySector(sector, cb){
	conn("select * from emple where id_sector_fk ="+sector, cb);
}

function getFiltrado(idsector, idcondicion, codigoturno, nrolegajomenor, nrolegajomayor, cb){
	query = "select emple.*, cargos.descripcion as cargotxt, sectores.nombre as sectortxt, DATE_FORMAT(emple.fecha_nac, '%d/%m/%Y') as fecha_nacf, DATE_FORMAT(emple.fbaja, '%d/%m/%Y') as fbajaf, DATE_FORMAT(emple.falta, '%d/%m/%Y') as faltaf,	contratos.nombre as contratotxt, turnos.codigo as turnotxt,	categorias.nombre as categoriatxt, condicion.nombre as condiciontxt from emple left join sectores on sectores.id = emple.id_sector_fk left join cargos on cargos.id = emple.cargo left join contratos on contratos.id = emple.id_contrato_fk left join turnos on turnos.id = emple.id_turno_fk left join categorias on categorias.id = emple.id_categoria_fk left join condicion on condicion.id = emple.id_condicion_fk where 1=1 and";
	
	if (idsector !=7)
		query = query + " emple.id_sector_fk = "+idsector+" and";

	if (idcondicion != 0)
		query = query + " emple.id_condicion_fk = "+idcondicion+" and";

	if (codigoturno != "0")
	 	query = query + " turnos.codigo = '"+ codigoturno+"' and";

	if (nrolegajomenor != "" && nrolegajomayor != "")
		query = query + " emple.legajo > "+nrolegajomenor + " and emple.legajo < "+nrolegajomayor+" and";
	
	querylength = query.length;
	query = query.substr(0, querylength-3)
	query = query + " order by nombre"
	conn(query, cb);
}
//para el partediario1 alta
function getByTurno(turnoid, cb){
	conn("select emple.*, cargos.descripcion as cargotxt, sectores.nombre as sectortxt, DATE_FORMAT(emple.fecha_nac, '%d/%m/%Y') as fecha_nacf,	DATE_FORMAT(emple.fbaja, '%d/%m/%Y') as fbajaf,	DATE_FORMAT(emple.falta, '%d/%m/%Y') as faltaf,	contratos.nombre as contratotxt, turnos.codigo as turnotxt,	categorias.nombre as categoriatxt, condicion.nombre as condiciontxt from emple left join sectores on sectores.id = emple.id_sector_fk left join cargos on cargos.id = emple.cargo left join contratos on contratos.id = emple.id_contrato_fk left join turnos on turnos.id = emple.id_turno_fk	left join categorias on categorias.id = emple.id_categoria_fk left join condicion on condicion.id = emple.id_condicion_fk WHERE id_turno_fk ="+turnoid, cb);
}

function getReporteEmplesEntreFechas(fecha_desde, fecha_hasta, cb){
	conn("SELECT id_emple_fk, emple.legajo, "+
		"emple.nombre as empletxt, "+
		"categorias.nombre as categoriatxt, "+
		"sectores.nombre as sectortxt, "+ 
		"sum(ifnull(partediario2.hr_total_n, 0)) hrs_n, "+
		"sum(ifnull(partediario2.hr_total_50, 0)) hrs_50, "+
		"sum(ifnull(partediario2.hr_total_100, 0)) hrs_100 "+
		"FROM `partediario2` "+
		"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
		"INNER JOIN sectores ON sectores.id = emple.id_sector_fk "+
		"INNER JOIN categorias ON categorias.id = emple.id_categoria_fk "+
		"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
		"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
		"GROUP BY partediario2.id_emple_fk", cb);
}