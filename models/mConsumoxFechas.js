var conn = require('../config/db').conn;

module.exports = {
	getConsumoEntreFechas: getConsumoEntreFechas,
	getConsumoEntreFechasTotales: getConsumoEntreFechasTotales
}

function getConsumoEntreFechas(desde, hasta, cb){
	conn("SELECT DATE_FORMAT(fecha, '%d/%m/%Y') as fechaf, CASE WHEN DAYNAME(fecha) = 'Sunday' THEN 'Domingo' WHEN DAYNAME(fecha) = 'Monday' THEN 'Lunes' WHEN DAYNAME(fecha) = 'Tuesday' THEN 'Martes' WHEN DAYNAME(fecha) = 'Wednesday' THEN 'Miercoles' WHEN DAYNAME(fecha) = 'Thursday' THEN 'Jueves' WHEN DAYNAME(fecha) = 'Friday' THEN 'Viernes' WHEN DAYNAME(fecha) = 'Saturday' THEN 'Sabado' ELSE '' END as dia, sum(gas) as gasoil, sum(oil) as aceite, sum(agua) as agua FROM evhsa.comb_planilladiaria where fecha >= '"+desde+"' AND fecha <= '"+hasta+"' group by fecha;", cb);
}

function getConsumoEntreFechasTotales(desde, hasta, cb){
	conn("SELECT fecha, sum(gas) as gasoil, sum(oil) as aceite, sum(agua) as agua FROM evhsa.comb_planilladiaria where fecha >= '"+desde+"' AND fecha <= '"+hasta+"';", cb);
}