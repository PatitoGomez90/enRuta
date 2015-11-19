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
	// getReporteEmplesEntreFechas: getReporteEmplesEntreFechas,
	getSP_EmplesEntreFechas: getSP_EmplesEntreFechas
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
	conn("select emple.*, cargos.descripcion as cargotxt, "+
		"sectores.nombre as sectortxt, DATE_FORMAT(emple.fecha_nac, '%d/%m/%Y') as fecha_nacf, "+
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
		"WHERE id_turno_fk ="+turnoid, cb);
}

// Pal reporte 
	function getSP_EmplesEntreFechas(fecha_desde, fecha_hasta, cb){
		conn("call EmplesEntreFechas('"+fecha_desde+"', '"+fecha_hasta+"')", cb);
	}

// function getReporteEmplesEntreFechas(fecha_desde, fecha_hasta, cb){
// 	conn("SELECT a.id, a.legajo, a.empletxt, a.categoriatxt, a.sectortxt, a.Normal as hrs_normales, a.Al50 as hrs_al50, a.Al100 as hrs_al100, "+
// 		"ifnull(b.FerNoTrab, 0) as hrs_feriado_no_trabajado, "+
// 		"ifnull(c.FerTrab, 0) as hrs_feriado_trabajado, "+

// 		"ifnull(d.emergencias, 0) as emergencias, "+

// 		"ifnull(e.Noc_N, 0) as hrs_nocturnas_normales, "+
// 		"ifnull(e.Noc_100, 0) as hrs_nocturnas_100, "+
// 		"ifnull(f.Noc_f, 0) as hrs_nocturnas_feriado, "+

// 		"ifnull(g.Cal_Normal, 0) as calorias_n, "+
// 		"ifnull(g.Cal_50, 0) as calorias_50, "+
// 		"ifnull(g.Cal_100, 0) as calorias_100, "+
// 		"ifnull(gg.Cal_Feriado, 0) as calorias_fer, "+

// 		"ifnull(h.Pel_Normal, 0) as peligrosas_n, "+
// 		"ifnull(h.Pel_50, 0) as peligrosas_50, "+
// 		"ifnull(h.Pel_100, 0) as peligrosas_100, "+
// 		"ifnull(hh.Pel_Feriado, 0) as peligrosas_fer, "+

// 		"ifnull(i.Pol_Normal, 0) as polucion_n, "+
// 		"ifnull(i.Pol_50, 0) as polucion_50, "+
// 		"ifnull(i.Pol_100, 0) as polucion_100, "+
// 		"ifnull(ii.Pol_Feriado, 0) as polucion_fer, "+

// 		"ifnull(j.Termo_Normal, 0) as termo_n, "+
// 		"ifnull(j.Termo_50, 0) as termo_50, "+
// 		"ifnull(j.Termo_100, 0) as termo_100, "+
// 		"ifnull(jj.Termo_Feriado, 0) as termo_fer, "+

// 		"ifnull(k.Insa_Normal, 0) as insalubres_n, "+
// 		"ifnull(k.Insa_50, 0) as insalubres_50, "+
// 		"ifnull(k.Insa_100, 0) as insalubres_100, "+
// 		"ifnull(kk.Insa_Feriado, 0) as insalubres_fer, "+

// 		"ifnull(l.Hrs_Rec_por_Diag, 0) as hrs_reconocimiento, "+
// 		"ifnull(m.turnicidad, 0) as turnicidad "+
// 		"FROM (SELECT id_emple_fk as id, "+
// 			"emple.legajo, "+
// 			"emple.nombre as empletxt, "+
// 			"categorias.nombre as categoriatxt, "+
// 			"sectores.nombre as sectortxt, "+
// 			"sum(ifnull(partediario2.hr_total_n, 0)) Normal, "+
// 			"sum(ifnull(partediario2.hr_total_50, 0)) Al50, "+
// 			"sum(ifnull(partediario2.hr_total_100, 0)) Al100 "+
// 			"FROM `partediario2` "+
// 			"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 			"INNER JOIN sectores ON sectores.id = emple.id_sector_fk "+
// 			"INNER JOIN categorias ON categorias.id = emple.id_categoria_fk "+
// 			"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 			"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 			"GROUP BY partediario2.id_emple_fk) as a "+
// 		"LEFT OUTER JOIN "+ //fer_no_trab
// 			"(select emple.codigo as codigo, "+
// 				"emple.nombre, "+
// 				"partediario2.id, "+
// 				"partediario2.id_emple_fk, "+
// 				"sum(ifnull(partediario2.hr_total_n, 0)) FerNoTrab "+
// 				"FROM `partediario2` "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+ 
// 				"AND codigohora.numero = 17 "+
// 				"AND partediario2.hr_total_n != partediario2.hr_total_100 "+
// 				"AND partediario2.hr_total_100 = 0 "+
// 				"GROUP BY emple.nombre) as b "+
// 			"ON a.id = b.codigo "+
// 		"LEFT OUTER JOIN "+ //fer_trab
// 			"(select emple.codigo as codigoc, emple.nombre as empletxt2, sum(ifnull(partediario2.hr_total_100, 0)) FerTrab "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+ 
// 				"AND codigohora.numero = 17 " +
// 				"AND partediario2.hr_total_n = partediario2.hr_total_100 "+
// 				"GROUP BY empletxt2) as c "+
// 			"ON a.id = c.codigoc "+
// 		"LEFT OUTER JOIN "+ //emergencias
// 			"(select emple.codigo as codigod, "+
// 				"count(partediario2.id_codigohora_fk) as emergencias "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 5 "+
// 				"GROUP BY codigod) as d "+
// 			"ON a.id = d.codigod "+
// 		"LEFT OUTER JOIN "+ //nocturnas norm y 100
// 			"(select emple.codigo as codigoe, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.hr_total_n, 0)) Noc_N, "+
// 				"sum(ifnull(partediario2.hr_total_100, 0)) Noc_100 "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 0 "+
// 				"GROUP BY codigoe) as e "+
// 			"ON a.id = e.codigoe "+
// 		"LEFT OUTER JOIN "+ //nocturnas feriado
// 			"(select emple.codigo as codigof, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.hr_total_100, 0)) Noc_f "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 17 "+
// 				"GROUP BY codigof) as f "+
// 			"ON a.id = f.codigof "+
// 		"LEFT OUTER JOIN "+ //calorias normal, 50 y 100
// 			"(select emple.codigo as codigog, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional1_n, 0)) Cal_Normal, "+
// 				"sum(ifnull(partediario2.adicional1_50, 0)) Cal_50, "+
// 				"sum(ifnull(partediario2.adicional1_100, 0)) Cal_100 "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 0 "+
// 				"AND partediario1.id_clasificacion1_fk = 9 "+
// 				"GROUP BY codigog) as g "+
// 			"ON a.id = g.codigog "+
// 		"LEFT OUTER JOIN "+ //calorias feriado
// 			"(select emple.codigo as codigogg, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional1_100, 0)) Cal_Feriado "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 17 "+
// 				"AND partediario1.id_clasificacion1_fk = 9 "+
// 				"GROUP BY codigogg) as gg "+
// 			"ON a.id = gg.codigogg "+
// 		"LEFT OUTER JOIN "+ //peligrosas normal, 50 y 100
// 			"(select emple.codigo as codigoh, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional2_n, 0)) Pel_Normal, "+
// 				"sum(ifnull(partediario2.adicional2_50, 0)) Pel_50, "+
// 				"sum(ifnull(partediario2.adicional2_100, 0)) Pel_100 "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 0 "+
// 				"AND partediario1.id_clasificacion2_fk = 10 "+
// 				"GROUP BY codigoh) as h "+
// 			"ON a.id = h.codigoh "+
// 		"LEFT OUTER JOIN "+ //peligrosas feriado
// 			"(select emple.codigo as codigohh, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional2_100, 0)) Pel_Feriado "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 17 "+
// 				"AND partediario1.id_clasificacion2_fk = 10 "+
// 				"GROUP BY codigohh) as hh "+
// 			"ON a.id = hh.codigohh "+
// 		"LEFT OUTER JOIN "+ //polucion normal, 50 y 100
// 			"(select emple.codigo as codigoi, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional3_n, 0)) Pol_Normal, "+
// 				"sum(ifnull(partediario2.adicional3_50, 0)) Pol_50, "+
// 				"sum(ifnull(partediario2.adicional3_100, 0)) Pol_100 "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 0 "+
// 				"AND partediario1.id_clasificacion3_fk = 11 "+
// 				"GROUP BY codigoi) as i "+
// 			"ON a.id = i.codigoi "+	
// 		"LEFT OUTER JOIN "+ //polucion feriado
// 			"(select emple.codigo as codigoii, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional3_100, 0)) Pol_Feriado "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 17 "+
// 				"AND partediario1.id_clasificacion3_fk = 11 "+
// 				"GROUP BY codigoii) as ii "+
// 			"ON a.id = ii.codigoii "+	
// 		"LEFT OUTER JOIN "+ //termo normal, 50 y 100
// 			"(select emple.codigo as codigoj, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional4_n, 0)) Termo_Normal, "+
// 				"sum(ifnull(partediario2.adicional4_50, 0)) Termo_50, "+
// 				"sum(ifnull(partediario2.adicional4_100, 0)) Termo_100 "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 0 "+
// 				"AND partediario1.id_clasificacion4_fk = 12 "+
// 				"GROUP BY codigoj) as j "+
// 			"ON a.id = j.codigoj "+
// 		"LEFT OUTER JOIN "+ //termo feriado
// 			"(select emple.codigo as codigojj, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional4_100, 0)) Termo_Feriado "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 0 "+
// 				"AND partediario1.id_clasificacion4_fk = 12 "+
// 				"GROUP BY codigojj) as jj "+
// 			"ON a.id = jj.codigojj "+
// 		"LEFT OUTER JOIN "+ //insa normal, 50 y 100
// 			"(select emple.codigo as codigok, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional5_n, 0)) Insa_Normal, "+
// 				"sum(ifnull(partediario2.adicional5_50, 0)) Insa_50, "+
// 				"sum(ifnull(partediario2.adicional5_100, 0)) Insa_100 "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 0 "+
// 				"AND partediario1.id_clasificacion5_fk = 20 "+
// 				"GROUP BY codigok) as k "+
// 			"ON a.id = k.codigok "+
// 		"LEFT OUTER JOIN "+ //insa feriado
// 			"(select emple.codigo as codigokk, "+
// 				"partediario2.id_codigohora_fk, "+
// 				"sum(ifnull(partediario2.adicional5_100, 0)) Insa_Feriado "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 17 "+
// 				"AND partediario1.id_clasificacion5_fk = 20 "+
// 				"GROUP BY codigokk) as kk "+
// 			"ON a.id = kk.codigokk "+
// 			//popo
// 			//reconocimiento por diagrama
// 		"LEFT OUTER JOIN "+ //insa feriado
// 			"(select emple.codigo as codigol, "+
// 				"sum(ifnull(partediario2.hr_total, 0)) Hrs_Rec_por_Diag "+
// 				"FROM partediario2 "+
// 				"INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"AND codigohora.numero = 22 "+
// 				"GROUP BY codigol) as l "+
// 			"ON a.id = l.codigol "+
// 			//turnicidad
// 		"LEFT OUTER JOIN "+ //insa feriado
// 			"(select emple.codigo as codigom, "+
// 				"turnos.turnicidad as turnicidad "+
// 				"FROM partediario2 "+
// 				// "INNER JOIN codigohora ON codigohora.id = partediario2.id_codigohora_fk "+
// 				"INNER JOIN emple ON emple.codigo = partediario2.id_emple_fk "+
// 				"INNER JOIN turnos ON emple.id_turno_fk = turnos.id "+
// 				"INNER JOIN partediario1 ON partediario1.id = partediario2.id_partediario1_fk "+
// 				"WHERE partediario1.fecha between '"+fecha_desde+"' and '"+fecha_hasta+"' "+
// 				"GROUP BY codigom) as m "+
// 			"ON a.id = m.codigom "+
// 		"GROUP BY a.id", cb);
// 	}


// 	