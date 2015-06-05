var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	insertKms: insertKms,
	insertHrs: insertHrs,
	insertDias: insertDias,
	getModelom1ById: getModelom1ById,
	updateKms: updateKms,
	updateHrs: updateHrs,
	updateDias: updateDias,
	del: del
}

function getAll(cb){
	conn('select * from modelo_m1', cb);
}

function insertKms(nombre, descripcion, kms, cb){
	conn("insert into modelo_m1(nombre, descripcion, kms) values('"+nombre+"', '"+descripcion+"', "+kms+")", cb);
}

function insertHrs(nombre, descripcion, hrs, cb){
	conn("insert into modelo_m1(nombre, descripcion, hrs) values('"+nombre+"', '"+descripcion+"', "+hrs+")", cb);
}

function insertDias(nombre, descripcion, dias, cb){
	conn("insert into modelo_m1(nombre, descripcion, dias) values('"+nombre+"', '"+descripcion+"', "+dias+")", cb);
}

function getModelom1ById(id, cb){
	conn("select * from modelo_m1 where id ="+id, cb);
}

function updateKms(id, nombre, descripcion, kms, cb){
	conn("UPDATE modelo_m1 SET nombre='"+nombre+"', descripcion='"+descripcion+"', kms="+ kms+" where id="+id, cb);
}

function updateHrs(id, nombre, descripcion, hrs, cb){
	conn("UPDATE modelo_m1 SET nombre='"+nombre+"', descripcion='"+descripcion+"', hrs="+ hrs+" where id="+id, cb);
}

function updateDias(id, nombre, descripcion, dias, cb){
	conn("UPDATE modelo_m1 SET nombre='"+nombre+"', descripcion='"+descripcion+"', dias="+ dias+" where id="+id, cb);
}

function del(id, cb){
	conn("DELETE from modelo_m1 where id="+id , cb);
}