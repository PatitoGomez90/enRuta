var conn = require('../config/db').conn;

module.exports = {
	getPosicion: getPosicion,
	getPosicionById: getPosicionById
}

function getPosicion(cb){
	conn('SELECT * FROM posiciones', cb);
}

function getPosicionById(id, cb){
	conn("select * from posiciones where id = "+id, cb);
}