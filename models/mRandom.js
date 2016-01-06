var conn = require('../config/db').conn;

module.exports = {
	getAllRepuestos: getAllRepuestos,
	getAllRubros: getAllRubros
}	

function getAllRepuestos(cb){
	conn("select * from repuestos", cb);
}


function getAllRubros(cb){
	conn("select * from rubros", cb);
}