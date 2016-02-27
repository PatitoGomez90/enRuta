var conn = require('../config/db').conn;

module.exports = {
	getClienteFromMatep: getClienteFromMatep,
	getClienteFromProduc: getClienteFromProduc,
	getUsuarioFromMovi: getUsuarioFromMovi,
	getUbicaFromRemito: getUbicaFromRemito,
	getMatepFromRemito: getMatepFromRemito,
	getMatepFromReceta: getMatepFromReceta,
	getEnvaseFromRemito: getEnvaseFromRemito,	
	getUmedFromProduc: getUmedFromProduc,
	getUmedFromMatep: getUmedFromMatep
}

function getClienteFromMatep(idcliente, cb){
	conn("select * from matep where cdcliente ="+ idcliente, cb);
}

function getClienteFromProduc(idcliente, cb){
	conn("select * from produc where cdcliente ="+ idcliente, cb);
}

function getUsuarioFromMovi(idusuario, cb){
	conn("select * from movi where usuario="+ idusuario, cb);
}

function getUbicaFromRemito(idubica, cb){
	conn("select * from remitomp where ubicaid="+ idubica, cb);
}

function getMatepFromRemito(idmatep, cb){
	conn("SELECT * from remitomp where matepid="+idmatep, cb);
}

function getEnvaseFromRemito(idenvase, cb){
	conn("SELECT * from remitomp where envaseid="+idenvase, cb);
}

function getMatepFromReceta(idmatep, cb){
	conn("SELECT * FROM receta where matepid="+idmatep, cb);
}

function getUmedFromProduc(codigoumed, cb){
	conn("SELECT * FROM produc where umed='"+codigoumed+"'", cb);
}

function getUmedFromMatep(codigoumed, cb){
	conn("SELECT * from matep where umed='"+codigoumed+"'", cb);
}