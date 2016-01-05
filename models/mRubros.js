var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getById: getById,
	insert: insert,
	update: update,
	del: del,
	getByCodigo: getByCodigo,
	getCantRubrosPorGrupo: getCantRubrosPorGrupo
}

function getAll(cb){
	conn('select rubros.*, rubros_grupos.codigo as codigogrupo, rubros_grupos.nombre as grupotxt from rubros left join rubros_grupos on rubros_grupos.id = rubros.id_grupo_fk order by codigo', cb);
}

function getById(id, cb){
	conn("select * from rubros where id = "+id, cb);
}

function insert(codigo, sector, id_grupo, cb){
	conn("insert into rubros(codigo, nombre, id_grupo_fk) values('"+codigo+"', '"+nombre+"', "+id_grupo+")", cb);
}

function update(id, codigo, nombre, id_grupo, cb){
	conn("update rubros set codigo = '"+codigo+"', nombre = '"+nombre+"', id_grupo_fk="+id_grupo+" where id = "+id, cb);
}

function del(id, cb){
	conn("delete from rubros where id = "+id, cb);
}

function getByCodigo(codigo, cb){
	conn("select * from rubros where codigo='"+codigo+"'", cb);
}

function getCantRubrosPorGrupo(id_grupo, cb){
	conn("select * from rubros where id_grupo_fk = "+id_grupo, cb);
}