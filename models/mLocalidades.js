var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll
}

function getAll(cb){
	conn("select CONCAT(UCASE(LEFT(ciudad_nombre, 1)), LCASE(SUBSTRING(ciudad_nombre, 2))) as nombretxt from ciudad", cb);
}