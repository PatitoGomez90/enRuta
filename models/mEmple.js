var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getAllActivos: getAllActivos,
	getAllActivos2: getAllActivos2,
	insert: insert,
	getUltimo: getUltimo,
	getEmplePorCodigo: getEmplePorCodigo,
	getEmplePorLegajo: getEmplePorLegajo,
	getEmplePorCodigoconJoin: getEmplePorCodigoconJoin,
	getEmplePorLegajoConIdDistinto: getEmplePorLegajoConIdDistinto,
	update: update,
	delEmple: delEmple,
	getEmpleBySector: getEmpleBySector
}

function getAll(cb){
	conn('select * from emple', cb);
}

function getAllActivos(cb){
	conn('select emple.*, cargos.descripcion, sectores.nombre as sectortxt from emple left join sectores on sectores.id = emple.id_sector_fk left join cargos on cargos.id = emple.cargo where emple.activa=1 order by nombre', cb);
}

function getAllActivos2(cb){
	conn('select emple_backup.*, cargos.descripcion, sectores.nombre as sectortxt from emple_backup left join sectores on sectores.id = emple_backup.id_sector_fk left join cargos on cargos.id = emple_backup.cargo where emple_backup.activa=1 order by nombre', cb);
}

function insert(codigo, nombre, falta, fbaja, cargo, sector, activa, legajo, cuil, fnac, domicilio, cp, telefono, tarjeta, sexo, cb){
	conn("insert into emple(nombre, falta, fbaja, cargo, id_sector_fk, activa, legajo, cuil, fecha_nac, domicilio, cp, tel) values('"+nombre+"', '"+falta+"', '"+fbaja+"', '"+cargo+"',"+sector+", "+ activa+", "+legajo+", '"+cuil+"', '"+fnac+"', '"+domicilio+"', "+cp+", '"+telefono+"')", cb)		+	conn("insert into emple(nombre, falta, fbaja, cargo, id_sector_fk, activa, legajo, cuil, fecha_nac, domicilio, cp, tel, tarjeta, sexo) values('"+nombre+"', '"+falta+"', '"+fbaja+"', '"+cargo+"',"+sector+", "+ activa+", "+legajo+", '"+cuil+"', '"+fnac+"', '"+domicilio+"', "+cp+", '"+telefono+"', "+tarjeta+", "+sexo+")", cb);
}

function getUltimo(cb){
	conn("select max(codigo) as max from emple", cb);
}

function getEmplePorCodigo(codigo, cb){
	conn("select * from emple where codigo="+ codigo, cb);
}

function getEmplePorCodigoconJoin(cd, cb){
	conn("select emple.*, cargos.descripcion as cargo_descripcion, sectores.nombre as sectortxt from emple left join sectores on sectores.id = emple.id_sector_fk left join cargos on cargos.id=emple.cargo where emple.codigo="+cd, cb);
}

function getEmplePorLegajoConIdDistinto(id, legajo, cb){
	conn("select * from emple where legajo = "+legajo+" and codigo <> "+id, cb);
}

function getEmplePorLegajo(legajo, cb){
	conn("select * from emple where legajo="+ legajo, cb);
}

function update(codigo, nombre, falta, fbaja, cargo, sector, activa, legajo, cuil, fnac, domicilio, cp, telefono, tarjeta, sexo, cb){
	conn("update emple set nombre='"+nombre+"', falta='"+falta+"', fbaja='"+fbaja+"', cargo='"+cargo+"', id_sector_fk="+sector+", activa="+activa+", legajo="+legajo+", cuil='"+cuil+"', fecha_nac='"+fnac+"', domicilio='"+domicilio+"', cp="+cp+", tel='"+telefono+"' where codigo="+ codigo, cb);		+	conn("update emple set nombre='"+nombre+"', falta='"+falta+"', fbaja='"+fbaja+"', cargo='"+cargo+"', id_sector_fk="+sector+", activa="+activa+", legajo="+legajo+", cuil='"+cuil+"', fecha_nac='"+fnac+"', domicilio='"+domicilio+"', cp="+cp+", tel='"+telefono+"', tarjeta="+tarjeta+", sexo="+sexo+" where codigo="+ codigo, cb);
}

function delEmple(codigo, cb){
	conn("delete from emple where codigo="+codigo, cb);
}

function getEmpleBySector(sector, cb){
	conn("select * from emple where id_sector_fk ="+sector, cb);
}