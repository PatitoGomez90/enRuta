var conn = require('../config/db').conn;
var SQLconn = require('../config/db').SQLconn;

module.exports = {
	getAll: getAll,
	getLegajosFromSQL: getLegajosFromSQL,
	insertInEmpleMysql: insertInEmpleMysql,
	getAllFromEmpleadosCSV: getAllFromEmpleadosCSV,
	getAllFromEmple: getAllFromEmple,
	getAllFromLegajoSQLenServer: getAllFromLegajoSQLenServer
}

function getAll(cb){
	conn('select * from random', cb);
}

function getLegajosFromSQL(cb){
	SQLconn("select *, convert(char, LEG_FECHING, 103) as fechaingreso from legajo", cb);
}

function insertInEmpleMysql(tarjeta, nombre, falta, fbaja, cargo, sector, activa, legajo, cuil, fnac, domicilio, cp, telefono, sexo, cb){
	conn("insert into emple(nombre, falta, fbaja, cargo, id_sector_fk, activa, legajo, cuil, fecha_nac, domicilio, cp, tel) values('"+nombre+"', '"+falta+"', '"+fbaja+"', '"+cargo+"',"+sector+", "+ activa+", "+legajo+", '"+cuil+"', '"+fnac+"', '"+domicilio+"', "+cp+", '"+telefono+"')", cb)
}

//random3
function getAllFromEmpleadosCSV(cb){
	conn("select * from empleadoscsv", cb);
}

function getAllFromEmple(cb){
	conn("select * from emple_backup", cb);
}

function getAllFromLegajoSQLenServer(cb){
	SQLconn("select * from legajo", cb);
}