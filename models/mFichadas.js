var SQLconn = require('../config/db').SQLconn;
var conn = require('../config/db').conn;

module.exports = {
	getFichadas: getFichadas,
	getFichada: getFichada,
	getLastFicIdMySql: getLastFicIdMySql,
	getLatestFicSQL: getLatestFicSQL,
	SQLinsert: SQLinsert,
	getAllFromFichadaSQL: getAllFromFichadaSQL,
	MySqlInsert: MySqlInsert,
	getAllFromMySql: getAllFromMySql
}

function getFichadas(fecha, cb){
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
	SQLconn("select * from fichada where fic_id > "+lastficid, cb);
}

function SQLinsert(latestfic, cb){
	SQLconn("INSERT INTO `fichada`(`fic_id`, `leg_legajo`, `fic_tarjeta`, `fic_fecha`, `fic_hora`, `fic_entsal`, `fic_reloj`, `fic_origen`, `fic_novedad`, `fic_equipo`, `fic_notas`) VALUES ("+latestfic[0].fic_id+", "+latestfic[0].leg_legajo+", "+latestfic[0].fic_tarjeta+", '"+latestfic[0].fic_fecha+"', '"+latestfic[0].fic_hora+"', '"+latestfic[0].fic_entsal+"', "+latestfic[0].fic_reloj+", '"+latestfic[0].fic_origen+"', "+latestfic[0].fic_novedad+", '"+latestfic[0].fic_equipo+"', '"+latestfic[0].fic_notas+"')", cb)
}

function MySqlInsert(latestfic, cb){
	conn("INSERT INTO `fichada`(`fic_id`, `leg_legajo`, `fic_tarjeta`, `fic_fecha`, `fic_hora`, `fic_entsal`, `fic_reloj`, `fic_origen`, `fic_novedad`, `fic_equipo`, `fic_notas`) VALUES ("+latestfic[0].fic_id+", "+latestfic[0].leg_legajo+", "+latestfic[0].fic_tarjeta+", '"+latestfic[0].fic_fecha+"', '"+latestfic[0].fic_hora+"', '"+latestfic[0].fic_entsal+"', "+latestfic[0].fic_reloj+", '"+latestfic[0].fic_origen+"', "+latestfic[0].fic_novedad+", '"+latestfic[0].fic_equipo+"', '"+latestfic[0].fic_notas+"')", cb)
}

function SQLifIDexists(newerficid, cb){
	SQLconn("select fic_id from fichada where fic_id = "+newerficid, cb);
}

function getAllFromMySql(cb){
	conn("select * from fichadas", cb);
}
// select MAX(convert(varchar, fic_fecha, 103)) as fecha, fic_reloj as reloj,
// COUNT(DISTINCT FIC_TARJETA) as cant,
// (select COUNT(DISTINCT FIC_TARJETA) from FICHADA where FIC_FECHA='2015-06-03' AND FIC_ENTSAL='E' ) as entraron ,
// (select COUNT(DISTINCT FIC_TARJETA) from FICHADA where FIC_FECHA='2015-06-03' AND FIC_ENTSAL='S' ) as salieron
// from fichada where fic_fecha='2015-06-03' group by fic_reloj