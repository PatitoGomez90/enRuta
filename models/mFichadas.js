var SQLconn = require('../config/db').SQLconn;
var conn = require('../config/db').conn;

module.exports = {
	getFichadasFromSQL: getFichadasFromSQL,
	getFichada: getFichada,
	getLastFicIdMySql: getLastFicIdMySql,
	getLatestFicSQL: getLatestFicSQL,
	SQLinsert: SQLinsert,
	getAllFromFichadaSQL: getAllFromFichadaSQL,
	MySqlInsert: MySqlInsert,
	SQLifIDexists: SQLifIDexists,
	getAllFromMySql: getAllFromMySql,
	getAllByDesdeFromMySql: getAllByDesdeFromMySql,
	getAllByHastaFromMySql: getAllByHastaFromMySql,
	getAllByFechaFromMySql: getAllByFechaFromMySql
}

function getFichadasFromSQL(fecha, cb){
	SQLconn("select MAX(convert(varchar, fic_fecha, 103)) as fecha, fic_reloj as reloj, COUNT(DISTINCT FIC_TARJETA) as cant, (select COUNT(DISTINCT FIC_TARJETA) from FICHADA where FIC_FECHA='"+fecha+"' AND FIC_ENTSAL='E' ) as entraron, (select COUNT(DISTINCT FIC_TARJETA) from FICHADA where FIC_FECHA='"+fecha+"' AND FIC_ENTSAL='S' ) as salieron from fichada where fic_fecha='"+fecha+"' group by fic_reloj", cb);
}

function getFichada(reloj, fecha, cb){
	SQLconn("select * from fichada where fic_reloj ="+reloj+" and fic_fecha='"+fecha+"'", cb)
}

function getAllFromFichadaSQL(cb){
	SQLconn("select * from fichada", cb);
}

function getLastFicIdMySql(cb){
	conn("select max(fic_id) as maxfic_id from fichadas", cb);
}

function getLatestFicSQL(lastficid, cb){
	SQLconn("select fichada.*, convert(varchar, fichada.fic_fecha, 111) as fic_fechafmysql from fichada where fic_reloj in (33, 34, 35, 36) and leg_legajo > 0 and fic_id > "+lastficid+" and fic_fecha >= '2015-07-01'", cb);
}

function SQLinsert(latestfic, cb){
	SQLconn("INSERT INTO `fichada`(`fic_id`, `leg_legajo`, `fic_tarjeta`, `fic_fecha`, `fic_hora`, `fic_entsal`, `fic_reloj`, `fic_origen`, `fic_novedad`, `fic_equipo`, `fic_notas`) VALUES ("+latestfic[0].fic_id+", "+latestfic[0].leg_legajo+", "+latestfic[0].fic_tarjeta+", '"+latestfic[0].fic_fecha+"', '"+latestfic[0].fic_hora+"', '"+latestfic[0].fic_entsal+"', "+latestfic[0].fic_reloj+", '"+latestfic[0].fic_origen+"', "+latestfic[0].fic_novedad+", '"+latestfic[0].fic_equipo+"', '"+latestfic[0].fic_notas+"')", cb)
}

function MySqlInsert(latestfic, cb){
	console.log("- - Asi recibo el obj para insertar a mysql:");
	console.log(latestfic)
	conn("INSERT INTO `fichadas`(`fic_id`, `leg_legajo`, `fic_tarjeta`, `fic_fecha`, `fic_hora`, `fic_entsal`, `fic_reloj`, `fic_origen`, `fic_novedad`, `fic_equipo`, `fic_notas`) VALUES ("+latestfic.FIC_ID+", "+latestfic.LEG_LEGAJO+", "+latestfic.FIC_TARJETA+", '"+latestfic.fic_fechafmysql+"', '"+latestfic.FIC_HORA+"', '"+latestfic.FIC_ENTSAL+"', "+latestfic.FIC_RELOJ+", '"+latestfic.FIC_ORIGEN+"', "+latestfic.FIC_NOVEDAD+", '"+latestfic.FIC_EQUIPO+"', '"+latestfic.FIC_NOTAS+"')", cb)
}

function SQLifIDexists(newerficid, cb){
	SQLconn("select fic_id from fichada where fic_id = "+newerficid, cb);
}

function getAllFromMySql(cb){
	conn("select fichadas.*, DATE_FORMAT(fichadas.fic_fecha, '%d/%m/%Y') as fic_fechaf, relojes.descripcion as relojtxt, sectores.nombre as sectortxt, ifnull(emple.nombre, 'No existe legajo') as empletxt from fichadas left join relojes on relojes.numero = fichadas.fic_reloj	left join sectores on sectores.id = relojes.id_sector_fk left join emple on emple.legajo = fichadas.leg_legajo order by fic_fecha desc, fic_hora desc", cb);
}

function getAllByDesdeFromMySql(desde, cb){
	conn("select fichadas.*, DATE_FORMAT(fichadas.fic_fecha, '%d/%m/%Y') as fic_fechaf, relojes.descripcion as relojtxt, sectores.nombre as sectortxt, ifnull(emple.nombre, 'No existe legajo') as empletxt from fichadas left join relojes on relojes.numero = fichadas.fic_reloj	left join sectores on sectores.id = relojes.id_sector_fk left join emple on emple.legajo = fichadas.leg_legajo where fic_fecha >= '"+desde+"' order by fic_fecha desc, fic_hora desc ", cb);
}

function getAllByHastaFromMySql(hasta, cb){
	conn("select fichadas.*, DATE_FORMAT(fichadas.fic_fecha, '%d/%m/%Y') as fic_fechaf, relojes.descripcion as relojtxt, sectores.nombre as sectortxt, ifnull(emple.nombre, 'No existe legajo') as empletxt from fichadas left join relojes on relojes.numero = fichadas.fic_reloj	left join sectores on sectores.id = relojes.id_sector_fk left join emple on emple.legajo = fichadas.leg_legajo where fic_fecha <= '"+hasta+"' order by fic_fecha desc, fic_hora desc ", cb);
}

function getAllByFechaFromMySql(desde, hasta, cb){
	conn("select fichadas.*, DATE_FORMAT(fichadas.fic_fecha, '%d/%m/%Y') as fic_fechaf, relojes.descripcion as relojtxt, sectores.nombre as sectortxt, ifnull(emple.nombre, 'No existe legajo') as empletxt from fichadas left join relojes on relojes.numero = fichadas.fic_reloj	left join sectores on sectores.id = relojes.id_sector_fk left join emple on emple.legajo = fichadas.leg_legajo where fic_fecha >= '"+desde+"' and fic_fecha <= '"+hasta+"' order by fic_fecha desc, fic_hora desc ", cb);
}
// select MAX(convert(varchar, fic_fecha, 103)) as fecha, fic_reloj as reloj,
// COUNT(DISTINCT FIC_TARJETA) as cant,
// (select COUNT(DISTINCT FIC_TARJETA) from FICHADA where FIC_FECHA='2015-06-03' AND FIC_ENTSAL='E' ) as entraron ,
// (select COUNT(DISTINCT FIC_TARJETA) from FICHADA where FIC_FECHA='2015-06-03' AND FIC_ENTSAL='S' ) as salieron
// from fichada where fic_fecha='2015-06-03' group by fic_reloj