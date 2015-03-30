var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	insert: insert,
	getUltimo: getUltimo,
	getEmplePorCodigo: getEmplePorCodigo,
	getEmplePorLegajo: getEmplePorLegajo,
	getEmplePorCodigoconJoin: getEmplePorCodigoconJoin,
	getEmplePorLegajoConIdDistinto: getEmplePorLegajoConIdDistinto,
	update: update,
	delEmple: delEmple
}

function getAll(cb){
	conn('select * from emple', cb);
}

function getAllActivos(cb){
	conn('select emple.*, cargos.descripcion from emple left join cargos on cargos.id = emple.cargo where emple.activa=1 order by nombre', cb);
}

function insert(codigo, nombre, falta, fbaja, cargo, activa, legajo, cuil, fnac, domicilio, cp, telefono, cb){
	conn("insert into emple(nombre, falta, fbaja, cargo, activa, legajo, cuil, fecha_nac, domicilio, cp, tel) values('"+nombre+"', '"+falta+"', '"+fbaja+"', '"+cargo+"',"+ activa+", "+legajo+", '"+cuil+"', '"+fnac+"', '"+domicilio+"', "+cp+", '"+telefono+"')", cb)
}
function getUltimo(cb){
	conn("select max(codigo) as max from emple", cb);
}

function getEmplePorCodigo(codigo, cb){
	conn("select * from emple where codigo="+ codigo, cb);
}

function getEmplePorCodigoconJoin(cd, cb){
	conn("select emple.*, cargos.descripcion as cargo_descripcion from emple left join cargos on cargos.id=emple.cargo where emple.codigo="+cd, cb);
}

function getEmplePorLegajoConIdDistinto(id, legajo, cb){
	conn("select * from emple where legajo = "+legajo+" and codigo <> "+id, cb);
}

function getEmplePorLegajo(legajo, cb){
	conn("select * from emple where legajo="+ legajo, cb);
}

function update(codigo, nombre, falta, fbaja, cargo, activa, legajo, cuil, fnac, domicilio, cp, telefono, cb){
	conn("update emple set nombre='"+nombre+"', falta='"+falta+"', fbaja='"+fbaja+"', cargo='"+cargo+"', activa="+activa+", legajo="+legajo+", cuil='"+cuil+"', fecha_nac='"+fnac+"', domicilio='"+domicilio+"', cp="+cp+", tel='"+telefono+"' where codigo="+ codigo, cb);
}

function delEmple(codigo, cb){
	conn("delete from emple where codigo="+codigo, cb);
}