var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByCodigo: getByCodigo
}

function getAll(cb){
	conn('select tank.* from tank', cb);
}

function getById(id, cb){
	conn("select * from tank where id = "+id, cb);
}

function insert(codigo, sector, id_grupo, cb){
	conn("insert into tank(codigo, nombre, id_grupo_fk) values('"+codigo+"', '"+nombre+"', "+id_grupo+")", cb);
}

function update(id, codigo, nombre, id_grupo, cb){
	conn("update tank set codigo = '"+codigo+"', nombre = '"+nombre+"', id_grupo_fk="+id_grupo+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from tank where id = "+id, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from tank where codigo='"+codigo+"'", cb);
}
